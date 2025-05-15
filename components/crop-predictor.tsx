"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { MapPin, Sprout, Maximize, Layers, Sun, AlertCircle } from "lucide-react";


// Sample autocomplete options
const districtOptions = [
  // Andaman and Nicobar Islands:
  "Nicobar",
  "North and Middle Andaman",
  "South Andaman",
  // Andhra Pradesh:
  "Anakapalli",
  "Anantapur",
  "Annamayya",
  "Bapatla",
  "Chittoor",
  "East Godavari",
  "Eluru",
  "Guntur",
  "Kakinada",
  "Krishna",
  "Kurnool",
  "Nandyal",
  "NTR",
  "Palnadu",
  "Prakasam",
  "Sri Potti Sriramulu Nellore",
  "Sri Sathya Sai",
  "Srikakulam",
  "Tirupati",
  "Visakhapatnam",
  "Vizianagaram",
  "West Godavari",
  "YSR",
  // Arunachal Pradesh:
  "Anjaw",
  "Changlang",
  "Dibang Valley",
  "East Kameng",
  "East Siang",
  "Kamle",
  "Kra Daadi",
  "Kurung Kumey",
  "Lepa Rada",
  "Lohit",
  "Longding",
  "Lower Dibang Valley",
  "Lower Siang",
  "Lower Subansiri",
  "Namsai",
  "Pakke Kessang",
  "Papum Pare",
  "Shi Yomi",
  "Siang",
  "Tawang",
  "Tirap",
  "Upper Siang",
  "Upper Subansiri",
  "West Kameng",
  "West Siang",
  // Assam:
  "Baksa",
  "Barpeta",
  "Biswanath",
  "Bongaigaon",
  "Cachar",
  "Charaideo",
  "Chirang",
  "Darrang",
  "Dhemaji",
  "Dhubri",
  "Dibrugarh",
  "Dima Hasao",
  "Goalpara",
  "Golaghat",
  "Hailakandi",
  "Hojai",
  "Jorhat",
  "Kamrup",
  "Kamrup Metropolitan",
  "Karbi Anglong",
  "Karimganj",
  "Kokrajhar",
  "Lakhimpur",
  "Majuli",
  "Morigaon",
  "Nagaon",
  "Nalbari",
  "Sivasagar",
  "Sonitpur",
  "South Salmara-Mankachar",
  "Tinsukia",
  "Udalguri",
  "West Karbi Anglong",
  // Bihar:
  "Araria",
  "Arwal",
  "Aurangabad",
  "Banka",
  "Begusarai",
  "Bhagalpur",
  "Bhojpur",
  "Buxar",
  "Darbhanga",
  "East Champaran",
  "Gaya",
  "Gopalganj",
  "Jamui",
  "Jehanabad",
  "Kaimur",
  "Katihar",
  "Khagaria",
  "Kishanganj",
  "Lakhisarai",
  "Madhepura",
  "Madhubani",
  "Munger",
  "Muzaffarpur",
  "Nalanda",
  "Nawada",
  "Patna",
  "Purnia",
  "Rohtas",
  "Saharsa",
  "Samastipur",
  "Saran",
  "Sheikhpura",
  "Sheohar",
  "Sitamarhi",
  "Siwan",
  "Supaul",
  "Vaishali",
  "West Champaran",
  // Chandigarh:
  "Chandigarh",
  // Chhattisgarh:
  "Balod",
  "Baloda Bazar",
  "Balrampur",
  "Bastar",
  "Bemetara",
  "Bijapur",
  "Dantewada",
  "Dhamtari",
  "Durg",
  "Gariaband",
  "Gaurela-Pendra-Marwahi",
  "Janjgir-Champa",
  "Jashpur",
  "Kabirdham",
  "Kanker",
  "Kondagaon",
  "Korba",
  "Koriya",
  "Mahasamund",
  "Mungeli",
  "Narayanpur",
  "Raigarh",
  "Raipur",
  "Rajnandgaon",
  "Sukma",
  "Surajpur",
  "Surguja",
  // Dadra and Nagar Haveli and Daman and Diu:
  "Dadra and Nagar Haveli",
  "Daman",
  "Diu",
  // Delhi:
  "Central Delhi",
  "East Delhi",
  "New Delhi",
  "North Delhi",
  "North East Delhi",
  "North West Delhi",
  "Shahdara",
  "South Delhi",
  "South East Delhi",
  "South West Delhi",
  "West Delhi",
  // Goa:
  "North Goa",
  "South Goa",
  // Gujarat:
  "Ahmedabad",
  "Amreli",
  "Anand",
  "Aravalli",
  "Banaskantha",
  "Bharuch",
  "Bhavnagar",
  "Botad",
  "Chhota Udaipur",
  "Dahod",
  "Dang",
  "Devbhoomi Dwarka",
  "Gandhinagar",
  "Gir Somnath",
  "Jamnagar",
  "Junagadh",
  "Kheda",
  "Kutch",
  "Mahisagar",
  "Mehsana",
  "Morbi",
  "Narmada",
  "Navsari",
  "Panchmahal",
  "Patan",
  "Porbandar",
  "Rajkot",
  "Sabarkantha",
  "Surat",
  "Surendranagar",
  "Tapi",
  "Vadodara",
  "Valsad",
  // Haryana:
  "Ambala",
  "Bhiwani",
  "Charkhi Dadri",
  "Faridabad",
  "Fatehabad",
  "Gurugram",
  "Hisar",
  "Jhajjar",
  "Jind",
  "Kaithal",
  "Karnal",
  "Kurukshetra",
  "Mahendragarh",
  "Nuh",
  "Palwal",
  "Panchkula",
  "Panipat",
  "Rewari",
  "Rohtak",
  "Sirsa",
  "Sonipat",
  "Yamunanagar",
  // Himachal Pradesh:
  "Bilaspur",
  "Chamba",
  "Hamirpur",
  "Kangra",
  "Kinnaur",
  "Kullu",
  "Lahaul and Spiti",
  "Mandi",
  "Shimla",
  "Sirmaur",
  "Solan",
  "Una",
  // Jharkhand:
  "Bokaro",
  "Chatra",
  "Deoghar",
  "Dhanbad",
  "Dumka",
  "East Singhbhum",
  "Garhwa",
  "Giridih",
  "Godda",
  "Gumla",
  "Hazaribagh",
  "Jamtara",
  "Khunti",
  "Koderma",
  "Latehar",
  "Lohardaga",
  "Pakur",
  "Palamu",
  "Ramgarh",
  "Ranchi",
  "Sahebganj",
  "Seraikela Kharsawan",
  "Simdega",
  "West Singhbhum",
  // Karnataka:
  "Bagalkot",
  "Ballari",
  "Belagavi",
  "Bengaluru Rural",
  "Bengaluru Urban",
  "Bidar",
  "Chamarajanagar",
  "Chikkaballapur",
  "Chikkamagaluru",
  "Chitradurga",
  "Dakshina Kannada",
  "Davanagere",
  "Dharwad",
  "Gadag",
  "Hassan",
  "Haveri",
  "Kalaburagi",
  "Kodagu",
  "Kolar",
  "Koppal",
  "Mandya",
  "Mysuru",
  "Raichur",
  "Ramanagara",
  "Shivamogga",
  "Tumakuru",
  "Udupi",
  "Uttara Kannada",
  "Vijayapura",
  "Yadgir",
  // Kerala:
  "Alappuzha",
  "Ernakulam",
  "Idukki",
  "Kannur",
  "Kasaragod",
  "Kollam",
  "Kottayam",
  "Kozhikode",
  "Malappuram",
  "Palakkad",
  "Pathanamthitta",
  "Thiruvananthapuram",
  "Thrissur",
  "Wayanad",
  // Madhya Pradesh:
  "Agar Malwa",
  "Alirajpur",
  "Anuppur",
  "Ashoknagar", 
  // Maharashtra:
  "Ahmednagar",
  "Akola",
  "Amravati",
  
  "Beed",
  "Bhandara",
  "Buldhana",
  "Chandrapur",
  "Dhule",
  "Gadchiroli",
  "Gondia",
  "Hingoli",
  "Jalgaon",
  "Jalna",
  "Kolhapur",
  "Latur",
  "Mumbai City",
  "Mumbai Suburban",
  "Nagpur",
  "Nanded",
  "Nandurbar",
  "Nashik",
  "Osmanabad",
  "Palghar",
  "Parbhani",
  "Pune",
  "Raigad",
  "Ratnagiri",
  "Sangli",
  "Satara",
  "Sindhudurg",
  "Solapur",
  "Thane",
  "Wardha",
  "Washim",
  "Yavatmal",
  // Manipur:
  "Bishnupur",
  "Chandel",
  "Churachandpur",
  "Imphal East",
  "Imphal West",
  "Jiribam",
  "Kakching",
  "Kamjong",
  "Kangpokpi",
  "Noney",
  "Pherzawl",
  "Senapati",
  "Tamenglong",
  "Tengnoupal",
  "Thoubal",
  "Ukhrul",
  // Meghalaya:
  "East Garo Hills",
  "East Jaintia Hills",
  "East Khasi Hills",
  "North Garo Hills",
  "Ri Bhoi",
  "South Garo Hills",
  "South West Garo Hills",
  "South West Khasi Hills",
  "West Garo Hills",
  "West Jaintia Hills",
  "West Khasi Hills",
  // Mizoram:
  "Aizawl",
  "Champhai",
  "Hnahthial",
  "Khawzawl",
  "Kolasib",
  "Lawngtlai",
  "Lunglei",
  "Mamit",
  "Saiha",
  "Saitual",
  "Serchhip",
  // Nagaland:
  "Chümoukedima",
  "Dimapur",
  "Kiphire",
  "Kohima",
  "Longleng",
  "Mokokchung",
  "Mon",
  "Noklak",
  "Peren",
  "Phek",
  "Tuensang",
  "Wokha",
  "Zünheboto",
  // Odisha:
  "Angul",
  "Balangir",
  "Balasore",
  "Bargarh",
  "Bhadrak",
  "Boudh",
  "Cuttack",
  "Deogarh",
  "Dhenkanal",
  "Gajapati",
  "Ganjam",
  "Jagatsinghpur",
  "Jajpur",
  "Jharsuguda",
  "Kalahandi",
  "Kandhamal",
  "Kendrapara",
  "Kendujhar",
  "Khordha",
  // Puducherry:
  "Karaikal",
  "Mahe",
  "Puducherry",
  "Yanam",
  // Punjab:
  "Amritsar",
  "Barnala",
  "Bathinda",
  "Faridkot",
  "Fatehgarh Sahib",
  "Firozpur",
  "Gurdaspur",
  "Hoshiarpur",
  "Jalandhar",
  "Kapurthala",
  "Ludhiana",
  "Mansa",
  "Moga",
  "Muktsar",
  "Nawanshahr",
  "Patiala",
  "Rupnagar",
  "S.A.S. Nagar",
  "Sangrur",
  "Tarn Taran",
  // Rajasthan:
  "Ajmer",
  "Alwar",
  "Banswara",
  "Baran",
  "Barmer",
  "Bhilwara",
  "Bikaner",
  "Bundi",
  "Chittorgarh",
  "Churu",
  "Dausa",
  "Dholpur",
  "Dungarpur",
  "Hanumangarh",
  "Jaipur",
  "Jaisalmer",
  "Jalore",
  "Jodhpur",
  "Jhalawar",
  "Jhunjhunu",
  "Kota",
  "Nagaur",
  "Pali",
  "Pratapgarh",
  "Rajsamand",
  "Sawai Madhopur",
  "Sikar",
  "Sirohi",
  "Sri Ganganagar",
  "Tonk",
  "Udaipur",
  // Sikkim:
  "East Sikkim",
  "North Sikkim",
  "South Sikkim",
  "West Sikkim",
  // Tamil Nadu:
  "Ariyalur",
  "Chengalpattu",
  "Chennai",
  "Coimbatore",
  "Cuddalore",
  "Dharmapuri",
  "Dindigul",
  "Erode",
  "Kallakurichi",
  "Kanchipuram",
  "Kanyakumari",
  "Karur",
  "Krishnagiri",
  "Madurai",
  "Nagapattinam",
  "Namakkal",
  "Nilgiris",
  "Perambalur",
  "Pudukkottai",
  "Ramanathapuram",
  "Salem",
  "Sivaganga",
  "Tenkasi",
  "Thanjavur",
  "The Nilgiris",
  "Theni",
  "Tiruvallur",
  "Tiruvannamalai",
  "Tiruvarur",
  "Tirupathur",
  "Tirunelveli",
  "Tiruppur",
  "Vellore",
  "Viluppuram",
  "Virudhunagar",
  // Telangana:
  "Adilabad",
  "Bhadradri Kothagudem",
  "Hyderabad",
  "Jagtial",
  "Jangaon",
  "Jayashankar Bhupalpally",
  "Jogulamba Gadwal",
  "Kamareddy",
  "Karimnagar",
  // Uttarakhand:
  "Almora",
  "Bageshwar",
  "Chamoli",
  "Champawat",
  "Dehradun",
  "Haridwar",
  "Nainital",
  "Pauri Garhwal",
  "Pithoragarh",
  "Rudraprayag",
  "Tehri Garhwal",
  "Udham Singh Nagar",
  "Uttarkashi",
  // Uttar Pradesh:
  "Agra",
  "Aligarh",
  "Ambedkar Nagar",
  "Amethi",
  "Amroha",
  "Auraiya",
  "Azamgarh",
  "Baghpat",
  "Bahraich",
  "Ballia",
  
  "Banda",
  "Barabanki",
  "Bareilly",
  "Basti",
  "Bijnor",
  "Budaun",
  "Bulandshahr",
  "Chandauli",
  "Chitrakoot",
  "Deoria",
  "Etah",
  "Etawah",
  "Faizabad",
  "Farrukhabad",
  "Fatehpur",
  "Firozabad",
  "Gautam Buddha Nagar",
  "Ghaziabad",
  "Gonda",
  "Gorakhpur",
  
  "Hapur",
  "Hardoi",
  "Hathras",
  "Jalaun",
  "Jaunpur",
  "Jhansi",
  "Kannauj",
  "Kanpur Dehat",
  "Kanpur Nagar",
  "Kushinagar",
  "Lakhimpur Kheri",
  "Lalitpur",
  "Lucknow",
  "Maharajganj",
  "Mahoba",
  "Mainpuri",
  "Mathura",
  "Meerut",
  "Mirzapur",
  "Moradabad",
  "Muzaffarnagar",
  "Pilibhit",
  
  "Rae Bareli",
  "Rampur",
  "Saharanpur",
  "Sant Kabir Nagar",
  "Shahjahanpur",
  "Shamli",
  "Shravasti",
  "Siddharthnagar",
  "Sitapur",
  "Sonbhadra",
  "Sultanpur",
  "Unnao",
  "Varanasi",
  // West Bengal:
  "Alipurduar",
  "Bankura",
  "Birbhum",
  "Cooch Behar",
  "Dakshin Dinajpur",
  "Darjeeling",
  "Hooghly",
  "Howrah",
  "Jalpaiguri",
  "Jhargram",
  "Kalimpong",
  "Kolkata",
  "Malda",
  "Murshidabad",
  "Nadia",
  "North 24 Parganas",
  "Paschim Bardhaman",
  "Paschim Medinipur",
  "Purba Bardhaman",
  "Purba Medinipur",
  "Purulia",
  "South 24 Parganas",
  "Uttar Dinajpur",
];



const cropOptions = [
  "Rice",
  "Wheat",
  "Maize",
  "Bajra",
  "Jowar",
  "Lentils",
  "Chickpeas",
  "Sugarcane",
  "Tobacco",
  "Cotton",
  "Jute",
  "Mustard",
  "Groundnut",
  "Tea",
  "Coffee",
  "Rubber",
  "Coconut",
  "Mango",
  "Banana",
  "Apple",
  "Grapes",
  "Orange",
  "Potato",
  "Tomato",
  "Onion",
  "Brinjal",
  "Okra",
  "Pepper",
  "Cardamom",
  "Turmeric",
  "Ginger",
  "Rose",
  "Marigold",
  "Chrysanthemum",
  "Neem",
  "Tulsi",
  "Lemongrass",
  // ... add more crops as needed
];

const soilOptions = [
  "Loam Soil",
  "Chalk Soil",
  "Peat Soil",
  "Silt Soil",
  "Clay Soil",
  "Sandy Soil",
  "Alluvial Soil",
  "Black Soil (Regur Soil)",
  "Red Soil",
  "Laterite Soil",
  "Arid (Desert) Soil",
  "Forest and Mountainous Soil",
  "Marsh Soil",
  "Saline and Alkaline Soil",
  "Peaty and Marshy Soil",
];

const seasonOptions = [
 "Kharif",
  "Rabi",
  "Zaid",
  "Pre-Kharif",
  "Post-Kharif",
];

interface PredictionData {
  rf_yield: number;
}

interface FormData {
  district: string;
  crop: string;
  area: string;
  soil: string;
  season: string;
}

export default function CropPredictor() {
  const [isMounted, setIsMounted] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    district: "",
    crop: "",
    area: "",
    soil: "",
    season: "",
  });
  const [prediction, setPrediction] = useState<PredictionData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setPrediction(null);

    if (!formData.district || !formData.crop || !formData.soil || !formData.area) {
      setError("Please fill out all required fields.");
      return;
    }

    const parsedArea = parseFloat(formData.area);
    if (isNaN(parsedArea)) {
      setError("Area must be a valid number.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("http://localhost:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          district: formData.district,
          crop: formData.crop,
          soil: formData.soil,
          area: parsedArea,
          season: formData.season,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server error: ${errorText}`);
      }

      const data: PredictionData = await response.json();
      setPrediction(data);
      setShowForm(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to get prediction");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setShowForm(true);
    setPrediction(null);
    setError(null);
  };

  if (!isMounted) return null;

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const stagger = {
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.3 },
    },
  };

  return (
    <div
      className="min-h-screen bg-gray-50 overflow-hidden"
      style={{
        backgroundImage: "url('/images/bg3.png')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <main className="container mx-auto p-4">
        <motion.div
          className="max-w-md bg-white/90 backdrop-blur-sm rounded-lg shadow-xl p-6 mt-24 ml-8 border border-green-200"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {showForm ? (
            <>
              <motion.div
                className="text-center mb-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <h1 className="text-2xl font-bold text-green-700 mb-2">
                  Crop Yield Predictor
                </h1>
                <p className="text-gray-600 text-sm">
                  Enter your field details for an accurate prediction
                </p>
              </motion.div>

              {error && (
                <motion.div
                  className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 flex items-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}

              <motion.form
                onSubmit={handleSubmit}
                className="space-y-4"
                variants={stagger}
                initial="hidden"
                animate="visible"
              >
                {/* District Input with autocomplete */}
                <motion.div variants={item}>
                  <label className="text-sm font-medium text-gray-800 block mb-1">
                    District:
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      name="district"
                      type="text"
                      placeholder="Enter district"
                      value={formData.district}
                      onChange={handleChange}
                      list="district-options"
                      className="pl-10 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500 placeholder-gray-500 text-black hover:border-green-400 transition-colors duration-200"
                    />
                    <datalist id="district-options">
                      {districtOptions.map((option) => (
                        <option key={option} value={option} />
                      ))}
                    </datalist>
                  </div>
                </motion.div>

                {/* Crop Input with autocomplete */}
                <motion.div variants={item}>
                  <label className="text-sm font-medium text-gray-800 block mb-1">
                    Crop:
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Sprout className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      name="crop"
                      type="text"
                      placeholder="Enter crop type"
                      value={formData.crop}
                      onChange={handleChange}
                      list="crop-options"
                      className="pl-10 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500 placeholder-gray-500 text-black hover:border-green-400 transition-colors duration-200"
                    />
                    <datalist id="crop-options">
                      {cropOptions.map((option) => (
                        <option key={option} value={option} />
                      ))}
                    </datalist>
                  </div>
                </motion.div>

                {/* Area Input */}
                <motion.div variants={item}>
                  <label className="text-sm font-medium text-gray-800 block mb-1">
                    Area (acres):
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Maximize className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      name="area"
                      type="number"
                      placeholder="Enter area"
                      value={formData.area}
                      onChange={handleChange}
                      className="pl-10 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500 placeholder-gray-500 text-black hover:border-green-400 transition-colors duration-200"
                    />
                  </div>
                </motion.div>

                {/* Soil Type Input with autocomplete */}
                <motion.div variants={item}>
                  <label className="text-sm font-medium text-gray-800 block mb-1">
                    Soil Type:
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Layers className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      name="soil"
                      type="text"
                      placeholder="Enter soil type"
                      value={formData.soil}
                      onChange={handleChange}
                      list="soil-options"
                      className="pl-10 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500 placeholder-gray-500 text-black hover:border-green-400 transition-colors duration-200"
                    />
                    <datalist id="soil-options">
                      {soilOptions.map((option) => (
                        <option key={option} value={option} />
                      ))}
                    </datalist>
                  </div>
                </motion.div>

                {/* Season Input with autocomplete */}
                <motion.div variants={item}>
                  <label className="text-sm font-medium text-gray-800 block mb-1">
                    Season (optional):
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Sun className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      name="season"
                      type="text"
                      placeholder="Enter growing season"
                      value={formData.season}
                      onChange={handleChange}
                      list="season-options"
                      className="pl-10 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500 placeholder-gray-500 text-black hover:border-green-400 transition-colors duration-200"
                    />
                    <datalist id="season-options">
                      {seasonOptions.map((option) => (
                        <option key={option} value={option} />
                      ))}
                    </datalist>
                  </div>
                </motion.div>

                <motion.div variants={item} className="pt-2">
                  <Button
                    className="w-full bg-green-600 hover:bg-green-700 text-white transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Predicting...
                      </div>
                    ) : (
                      <>
                        <span>Get Prediction</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </>
                    )}
                  </Button>
                </motion.div>
              </motion.form>
            </>
          ) : (
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.h2
                className="text-xl font-semibold mb-2 text-green-800 text-center"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                Prediction Result
              </motion.h2>
              {prediction && (
                <motion.div
                  className="mt-6 p-4 bg-green-50 rounded-lg text-black border border-green-200 shadow-inner"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <motion.div
                    className="space-y-2"
                    initial="hidden"
                    animate="visible"
                    variants={stagger}
                  >
                    <motion.p variants={item} className="flex items-center justify-center">
                      <span className="w-8 h-8 flex items-center justify-center bg-green-200 rounded-full mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 text-green-700">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </span>
                      <span className="font-semibold text-green-700 ml-1">
                        {prediction.rf_yield.toFixed(2)} kg/ha
                      </span>
                    </motion.p>
                  </motion.div>
                </motion.div>
              )}

              <motion.div
                variants={item}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Button
                  className="w-full bg-gray-600 hover:bg-gray-700 text-white transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg"
                  onClick={resetForm}
                >
                  Back to Predict Form
                </Button>
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </main>
    </div>
  );
}
