# backend/main.py

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import numpy as np
import uvicorn

# === Imports for Yield Prediction (scikit-learn) ===
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.linear_model import LinearRegression

# === Imports for Crop Recommendation (PyTorch) ===
import torch
import torch.nn as nn
import torch.optim as optim
from sklearn.preprocessing import LabelEncoder, StandardScaler

############################################################
#               Crop Yield Prediction Section              #
############################################################

# Pydantic model for yield prediction input
class CropData(BaseModel):
    district: str
    crop: str
    soil: str
    area: float
    season: str = None  # Optional

# Functions for loading, preprocessing, and splitting yield data
def load_data(file_path):
    data = pd.read_csv(file_path)
    return data

def preprocess_data(data):
    numeric_cols = data.select_dtypes(include=['number']).columns
    data[numeric_cols] = data[numeric_cols].fillna(data[numeric_cols].mean())
    data = pd.get_dummies(data, drop_first=True)
    return data

def split_data(data, target_column):
    X = data.drop(columns=[target_column, 'Crop_Year'], errors='ignore')
    y = data[target_column]
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )
    return X_train, X_test, y_train, y_test

# Load and preprocess yield data; train yield prediction models
yield_data = load_data("Crop_data.csv")
yield_data = preprocess_data(yield_data)
X_train, X_test, y_train, y_test = split_data(yield_data, target_column="Yield")

rf_model = RandomForestRegressor(n_estimators=100, random_state=42)
rf_model.fit(X_train, y_train)

lr_model = LinearRegression()
lr_model.fit(X_train, y_train)

def predict_yield_api(user_input, rf_model, lr_model, X_train):
    # Convert user input to DataFrame and one-hot encode
    user_input_df = pd.DataFrame([user_input])
    user_input_df = pd.get_dummies(user_input_df, drop_first=True)
    
    # Ensure all expected columns are present
    missing_cols = set(X_train.columns) - set(user_input_df.columns)
    for col in missing_cols:
        user_input_df[col] = 0
    user_input_df = user_input_df[X_train.columns]
    
    # Convert area from acres to hectares and predict yield per hectare
    area_in_acres = user_input['area']
    area_in_hectares = area_in_acres * 0.4047
    rf_pred_per_hectare = rf_model.predict(user_input_df)[0]
    lr_pred_per_hectare = lr_model.predict(user_input_df)[0]
    
    # Calculate total yield based on area
    total_rf_yield = rf_pred_per_hectare * area_in_hectares  #1 hectare = 2.47 acres 
    total_lr_yield = lr_pred_per_hectare * area_in_hectares
    return total_rf_yield, total_lr_yield

############################################################
#            Crop Recommendation Section (PyTorch)         #
############################################################

# Define the PyTorch DNN model for recommendation
class CropRecommendationModel(nn.Module):
    def __init__(self, input_dim, output_dim):
        super(CropRecommendationModel, self).__init__()
        self.fc1 = nn.Linear(input_dim, 64) #takes input features and sends them to 64 neurons.
        self.fc2 = nn.Linear(64, 128)
        self.fc3 = nn.Linear(128, 64)
        self.output = nn.Linear(64, output_dim)
        self.activation = nn.SELU() # helps the model learn complex pattern
        self.softmax = nn.Softmax(dim=1) #probability score 
    
    def forward(self, x):
        x = self.activation(self.fc1(x))
        x = self.activation(self.fc2(x))
        x = self.activation(self.fc3(x))
        x = self.softmax(self.output(x))
        return x

# Load crop recommendation dataset
rec_df = pd.read_csv('Crop_recommendation.csv')
X_rec = rec_df[['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall']]
y_rec = rec_df['label']

#Convert crop names to numbers
label_encoder = LabelEncoder()
y_rec_encoded = label_encoder.fit_transform(y_rec)

#Scale input data
scaler_rec = StandardScaler()
X_rec_scaled = scaler_rec.fit_transform(X_rec)

# Train the crop recommendation model on all data
X_rec_tensor = torch.tensor(X_rec_scaled, dtype=torch.float32)
input_dim_rec = X_rec.shape[1]  # should be 7 (input)
output_dim_rec = len(label_encoder.classes_) # number of possivle ops
rec_model = CropRecommendationModel(input_dim_rec, output_dim_rec) #create a model

criterion_rec = nn.CrossEntropyLoss() #calculate error
optimizer_rec = optim.Adam(rec_model.parameters(), lr=0.001) #Adam optimizer adjusts model weights to reduce error.

epochs = 100
for epoch in range(epochs):
    optimizer_rec.zero_grad() #Clears previous gradient values
    outputs = rec_model(X_rec_tensor) 
    loss = criterion_rec(outputs, torch.tensor(y_rec_encoded, dtype=torch.long)) #compares
    loss.backward() #Calculates how to change weights to reduce the error
    optimizer_rec.step() #adjust weight
    if (epoch + 1) % 10 == 0:
        print(f"Rec Model Epoch [{epoch+1}/{epochs}], Loss: {loss.item():.4f}")

# Default values for optional recommendation inputs
default_values = {
    "N": 100,         # Default or mean nitrogen
    "P": 60,          # Default or mean phosphorus
    "K": 50,          # Default or mean potassium
    "temperature": 25,  # Default temperature
    "humidity": 60,     # Default humidity
    "ph": 6.5,         # Default pH
    "rainfall": 100    # Default rainfall
}

# Pydantic model for recommendation input
class RecommendationInput(BaseModel):
    N: float = None
    P: float = None
    K: float = None
    temperature: float
    humidity: float
    ph: float = None
    rainfall: float

def predict_recommendation(input_data: RecommendationInput):
    user_input = [
        input_data.N if input_data.N is not None else default_values["N"],
        input_data.P if input_data.P is not None else default_values["P"],
        input_data.K if input_data.K is not None else default_values["K"],
        input_data.temperature,
        input_data.humidity,
        input_data.ph if input_data.ph is not None else default_values["ph"],
        input_data.rainfall
    ]
    user_input_scaled = scaler_rec.transform([user_input])
    user_tensor = torch.tensor(user_input_scaled, dtype=torch.float32) #Converted to a PyTorch tensor so it can be given to the model.

 
    with torch.no_grad():
        prediction_probs = rec_model(user_tensor)
    predicted_index = torch.argmax(prediction_probs).item()
    predicted_crop = label_encoder.classes_[predicted_index] #finds crops with highest prob
    
    # Get top 5 predictions based on probabilities
    probs = prediction_probs.squeeze().detach().numpy()
    top_n = 5
    top_indices = np.argsort(probs)[::-1][:top_n]
    top_crops = [label_encoder.classes_[i] for i in top_indices]
    
    return predicted_crop, top_crops

############################################################
#               Rainfall Prediction Section                #
############################################################

import difflib

# Load and prepare the rainfall dataset
rainfall_df = pd.read_csv('Rainfall.csv')  # Update with your actual file path
rainfall_df['STATE/UT'] = rainfall_df['STATE/UT'].str.upper()
rainfall_df['DISTRICT'] = rainfall_df['DISTRICT'].str.upper()

# Mapping for month names/abbreviations
month_mapping = {
    "JANUARY": "JAN",
    "JAN": "JAN",
    "FEBRUARY": "FEB",
    "FEB": "FEB",
    "MARCH": "MAR",
    "MAR": "MAR",
    "APRIL": "APR",
    "APR": "APR",
    "MAY": "MAY",
    "JUNE": "JUN",
    "JUN": "JUN",
    "JULY": "JUL",
    "JUL": "JUL",
    "AUGUST": "AUG",
    "AUG": "AUG",
    "SEPTEMBER": "SEP",
    "SEP": "SEP",
    "OCTOBER": "OCT",
    "OCT": "OCT",
    "NOVEMBER": "NOV",
    "NOV": "NOV",
    "DECEMBER": "DEC",
    "DEC": "DEC",
    "ANNUAL": "ANNUAL",
    "JAN+FEB": "JAN+FEB",
    "MAM": "MAM",
    "JJAS": "JJAS",
    "OND": "OND"
}

def auto_correct(input_str, valid_list, cutoff=0.6):
    matches = difflib.get_close_matches(input_str, valid_list, n=1, cutoff=cutoff)
    if matches:
        return matches[0]
    return input_str

def get_rainfall(month: str, state: str, district: str):
    # Convert inputs to uppercase
    month = month.upper()
    state = state.upper()
    district = district.upper()
    
    # Map full month names (or other variants) to abbreviations
    month = month_mapping.get(month, month)
    
    # Auto-correct state/UT if necessary
    valid_states = list(rainfall_df['STATE/UT'].unique())
    if state not in valid_states:
        corrected_state = auto_correct(state, valid_states)
        state = corrected_state

    # Filter for the (possibly corrected) state
    state_df = rainfall_df[rainfall_df['STATE/UT'] == state]
    if state_df.empty:
        raise Exception(f"No data found for state/UT '{state}'.")

    # Auto-correct district if necessary
    valid_districts = list(state_df['DISTRICT'].unique())
    if district not in valid_districts:
        corrected_district = auto_correct(district, valid_districts)
        district = corrected_district

    # Filter for the district
    filtered = state_df[state_df['DISTRICT'] == district]
    if filtered.empty:
        raise Exception(f"No data found for district '{district}' in state/UT '{state}'.")

    # Ensure the month/category exists in the dataset
    if month not in rainfall_df.columns:
        raise Exception(f"'{month}' is not a valid month/category in the dataset.")
    
    # Retrieve the rainfall value
    rainfall_value = filtered.iloc[0][month]
    return rainfall_value

# Pydantic model for rainfall input
class RainfallInput(BaseModel):
    state: str
    district: str
    month: str

############################################################
#               FastAPI Initialization                     #
############################################################

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Endpoint for crop yield prediction
@app.post("/predict")
async def predict(crop_data: CropData):
    # Build user input dictionary (note: using lowercase "area")
    user_input = {
        "area": crop_data.area,
        crop_data.soil: 1,
        crop_data.district: 1,
        crop_data.crop: 1,
    }
    if crop_data.season:
        user_input[crop_data.season] = 1

    try:
        total_rf_yield, total_lr_yield = predict_yield_api(user_input, rf_model, lr_model, X_train)
        return {"rf_yield": total_rf_yield, "lr_yield": total_lr_yield}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Endpoint for crop recommendation
@app.post("/recommend")
async def recommend(input_data: RecommendationInput):
    try:
        predicted_crop, top_crops = predict_recommendation(input_data)
        return {"predicted_crop": predicted_crop, "top_crops": top_crops}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Endpoint for rainfall prediction
@app.post("/rainfall")
async def predict_rainfall(rainfall_input: RainfallInput):
    try:
        predicted_rainfall = get_rainfall(rainfall_input.month, rainfall_input.state, rainfall_input.district)
        return {"rainfall": predicted_rainfall}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Add to imports
from typing import Optional

# Add new Pydantic model
class FertilizerInput(BaseModel):
    crop_name: str
    nitrogen: float
    phosphorus: float
    potassium: float
    ph: float

# Add fertilizer recommendation functionality
fertilizer_df = pd.read_csv("Fertilizer_Cleaned.csv")

def fertilizer_recommendation(input_data: FertilizerInput):
    crop_name = input_data.crop_name.lower()
    soil_n = input_data.nitrogen
    soil_p = input_data.phosphorus
    soil_k = input_data.potassium
    soil_ph = input_data.ph
    
    crop_data = fertilizer_df[fertilizer_df['Crop'].str.lower() == crop_name]
    
    if crop_data.empty:
        return {"error": "Crop not found in database"}
    
    crop_info = crop_data.iloc[0]
    
    n_needed = max(0, crop_info['N'] - soil_n)
    p_needed = max(0, crop_info['P'] - soil_p)
    k_needed = max(0, crop_info['K'] - soil_k)
    
    ph_diff = crop_info['pH'] - soil_ph
    ph_adj = ""
    if abs(ph_diff) > 0.5:
        if soil_ph < crop_info['pH']:
            ph_adj = f"Current pH {soil_ph:.1f} is low. Consider liming to raise pH closer to {crop_info['pH']:.1f}."
        else:
            ph_adj = f"Current pH {soil_ph:.1f} is high. Consider adding sulfur to lower pH closer to {crop_info['pH']:.1f}."
    else:
        ph_adj = f"pH Level: Current pH {soil_ph:.1f} is suitable for this crop."
    
    return {
        "nitrogen_needed": round(n_needed, 1),
        "phosphorus_needed": round(p_needed, 1),
        "potassium_needed": round(k_needed, 1),
        "ph_adjustment": ph_adj,
        "recommended_crop_ph": float(crop_info['pH'])
    }

# Add new endpoint
@app.post("/fertilizer")
async def get_fertilizer_recommendation(input_data: FertilizerInput):
    try:
        recommendation = fertilizer_recommendation(input_data)
        if "error" in recommendation:
            raise HTTPException(status_code=400, detail=recommendation["error"])
        return recommendation
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
