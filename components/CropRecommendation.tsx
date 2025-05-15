"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { IoLeaf, IoWater, IoThermometer, IoColorFilter, IoAnalytics, IoEarth } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa";

interface RecommendationData {
  predicted_crop: string;
  top_crops: string[];
}

interface FormData {
  N: string;
  P: string;
  K: string;
  temperature: string;
  humidity: string;
  ph: string;
  rainfall: string;
}

interface RainfallHelperData {
  state: string;
  district: string;
  month: string;
}


const stateOptions = [
  "ANDAMAN AND NICOBAR ISLANDS",
  "ANDHRA PRADESH",
  "ARUNACHAL PRADESH",
  "ASSAM",
  "BIHAR",
  "CHANDIGARH",
  "CHHATTISGARH",
  "DADRA AND NAGAR HAVELI AND DAMAN AND DIU",
  "DELHI",
  "GOA",
  "GUJARAT",
  "HARYANA",
  "HIMACHAL PRADESH",
  "JHARKHAND",
  "KARNATAKA",
  "KERALA",
  "MADHYA PRADESH",
  "MAHARASHTRA",
  "MANIPUR",
  "MEGHALAYA",
  "MIZORAM",
  "NAGALAND",
  "ODISHA",
  "PUDUCHERRY",
  "PUNJAB",
  "RAJASTHAN",
  "SIKKIM",
  "TAMIL NADU",
  "TELANGANA",
  "UTTARAKHAND",
  "UTTAR PRADESH",
  "WEST BENGAL",
];

// Mapping of states to districts (all keys should be uppercase)
const stateDistrictMapping: { [key: string]: string[] } = {
  "ANDAMAN AND NICOBAR ISLANDS": [
    "NICOBAR",
    "NORTH AND MIDDLE ANDAMAN",
    "SOUTH ANDAMAN",
  ],
  "ANDHRA PRADESH": [
    "ANAKAPALLI",
    "ANANTAPUR",
    "ANNAMAYYA",
    "BAPATLA",
    "CHITTOOR",
    "EAST GODAVARI",
    "ELURU",
    "GUNTUR",
    "KAKINADA",
    "KRISHNA",
    "KURNOOL",
    "NANDYAL",
    "NTR",
    "PALNADU",
    "PRAKASAM",
    "SRI POTTI SRIRAMULU NELLORE",
    "SRI SATHYA SAI",
    "SRIKAKULAM",
    "TIRUPATI",
    "VISAKHAPATNAM",
    "VIZIANAGARAM",
    "WEST GODAVARI",
    "YSR",
  ],
  "ARUNACHAL PRADESH": [
    "ANJAW",
    "CHANGLANG",
    "DIBANG VALLEY",
    "EAST KAMENG",
    "EAST SIANG",
    "KAMLE",
    "KRA DAADI",
    "KURUNG KUMEY",
    "LEPA RADA",
    "LOHIT",
    "LONGDING",
    "LOWER DIBANG VALLEY",
    "LOWER SIANG",
    "LOWER SUBANSIRI",
    "NAMSAI",
    "PAKKE KESSANG",
    "PAPUM PARE",
    "SHI YOMI",
    "SIANG",
    "TAWANG",
    "TIRAP",
    "UPPER SIANG",
    "UPPER SUBANSIRI",
    "WEST KAMENG",
    "WEST SIANG",
  ],
  "ASSAM": [
    "BAKSA",
    "BARPETA",
    "BISWANATH",
    "BONGAIGAON",
    "CACHAR",
    "CHARAIDEO",
    "CHIRANG",
    "DARRANG",
    "DHEMAJI",
    "DHUBRI",
    "DIBRUGARH",
    "DIMA HASAO",
    "GOALPARA",
    "GOLAGHAT",
    "HAILAKANDI",
    "HOJAI",
    "JORHAT",
    "KAMRUP",
    "KAMRUP METROPOLITAN",
    "KARBI ANGLONG",
    "KARIMGANJ",
    "KOKRAJHAR",
    "LAKHIMPUR",
    "MAJULI",
    "MORIGAON",
    "NAGAON",
    "NALBARI",
    "SIVASAGAR",
    "SONITPUR",
    "TINSUKIA",
    "UDALGURI",
    "WEST KARBI ANGLONG",
  ],
  "BIHAR": [
    "ARARIA",
    "ARWAL",
    "AURANGABAD",
    "BANKA",
    "BEGUSARAI",
    "BHAGALPUR",
    "BHOJPUR",
    "BUXAR",
    "DARBHANGA",
    "EAST CHAMPARAN",
    "GAYA",
    "GOPALGANJ",
    "JAMUI",
    "JEHANABAD",
    "KAIMUR",
    "KATIHAR",
    "KHAGARIA",
    "KISHANGANJ",
    "LAKHISARAI",
    "MADHEPURA",
    "MADHUBANI",
    "MUNGER",
    "MUZAFFARPUR",
    "NALANDA",
    "NAWADA",
    "PATNA",
    "PURNIA",
    "ROHTAS",
    "SAHARSA",
    "SAMASTIPUR",
    "SARAN",
    "SHEIKHPURA",
    "SHEOHAR",
    "SITAMARHI",
    "SIWAN",
    "SUPAUL",
    "VAISHALI",
    "WEST CHAMPARAN",
  ],
  "CHANDIGARH": ["CHANDIGARH"],
  "CHHATTISGARH": [
    "BALOD",
    "BALODA BAZAR",
    "BALRAMPUR",
    "BASTAR",
    "BEMETARA",
    "BIJAPUR",
    "BILASPUR",
    "DANTEWADA",
    "DHAMTARI",
    "DURG",
    "GARIABAND",
    "GAURELA-PENDRA-MARWAHI",
    "JANJGIR-CHAMPA",
    "JASHPUR",
    "KABIRDHAM",
    "KANKER",
    "KONDAGAON",
    "KORBA",
    "KORIYA",
    "MAHASAMUND",
    "MUNGELI",
    "NARAYANPUR",
    "RAIGARH",
    "RAIPUR",
    "RAJNANDGAON",
    "SUKMA",
    "SURAJPUR",
    "SURGUJA",
  ],
  "DADRA AND NAGAR HAVELI AND DAMAN AND DIU": [
    "DADRA AND NAGAR HAVELI",
    "DAMAN",
    "DIU",
  ],
  "DELHI": [
    "CENTRAL DELHI",
    "EAST DELHI",
    "NEW DELHI",
    "NORTH DELHI",
    "NORTH EAST DELHI",
    "NORTH WEST DELHI",
    "SHAHDARA",
    "SOUTH DELHI",
    "SOUTH EAST DELHI",
    "SOUTH WEST DELHI",
    "WEST DELHI",
  ],
  "GOA": ["NORTH GOA", "SOUTH GOA"],
  "GUJARAT": [
    "AHMEDABAD",
    "AMRELI",
    "ANAND",
    "ARAVALLI",
    "BANASKANTHA",
    "BHARUCH",
    "BHAVNAGAR",
    "BOTAD",
    "CHHOTA UDAIPUR",
    "DAHOD",
    "DANG",
    "DEVBHOOMI DWARKA",
    "GANDHINAGAR",
    "GIR SOMNATH",
    "JAMNAGAR",
    "JUNAGADH",
    "KHEDA",
    "KUTCH",
    "MAHISAGAR",
    "MEHSANA",
    "MORBI",
    "NARMADA",
    "NAVSARI",
    "PANCHMAHAL",
    "PATAN",
    "PORBANDAR",
    "RAJKOT",
    "SABARKANTHA",
    "SURAT",
    "SURENDRANAGAR",
    "TAPI",
    "VADODARA",
    "VALSAD",
  ],
  "HARYANA": [
    "AMBALA",
    "BHIWANI",
    "CHARKHI DADRI",
    "FARIDABAD",
    "FATEHABAD",
    "GURUGRAM",
    "HISAR",
    "JHAJJAR",
    "JIND",
    "KAITHAL",
    "KARNAL",
    "KURUKSHETRA",
    "MAHENDRAGARH",
    "NUH",
    "PALWAL",
    "PANCHKULA",
    "PANIPAT",
    "REWARI",
    "ROHTAK",
    "SIRSA",
    "SONIPAT",
    "YAMUNANAGAR",
  ],
  "HIMACHAL PRADESH": [
    "BILASPUR",
    "CHAMBA",
    "HAMIRPUR",
    "KANGRA",
    "KINNAUR",
    "KULLU",
    "LAHAUL AND SPITI",
    "MANDI",
    "SHIMLA",
    "SIRMAUR",
    "SOLAN",
    "UNA",
  ],
  "JHARKHAND": [
    "BOKARO",
    "CHATRA",
    "DEOGHAR",
    "DHANBAD",
    "DUMKA",
    "EAST SINGHBHUM",
    "GARHWA",
    "GIRIDIH",
    "GODDA",
    "GUMLA",
    "HAZARIBAG",
    "JAMTARA",
    "KHUNTI",
    "KODERMA",
    "LATEHAR",
    "LOHARDAGA",
    "PAKUR",
    "PALAMU",
    "RAMGARH",
    "RANCHI",
    "SAHEBGANJ",
    "SERAIKELA KHARSWAAN",
    "SIMDEGA",
    "WEST SINGHBHUM",
  ],
  "KARNATAKA": [
    "BAGALKOT",
    "BALLARI",
    "BELAGAVI",
    "BENGALURU RURAL",
    "BENGALURU URBAN",
    "BIDAR",
    "CHAMARAJANAGAR",
    "CHIKKABALLAPUR",
    "CHIKKAMAGALURU",
    "CHITRADURGA",
    "DAKSHINA KANNADA",
    "DAVANAGERE",
    "DHARWAD",
    "GADAG",
    "HAVERI",
    "KALABURAGI",
    "KODAGU",
    "KOLAR",
    "KOPPAL",
    "MANDYA",
    "MYSURU",
    "RAICHUR",
    "RAMANAGARA",
    "SHIVAMOGGA",
    "TUMKUR",
    "UDUPI",
    "UTTARA KANNADA",
    "VIJAYAPURA",
    "YADGIR",
  ],
  "KERALA": [
    "ALAPPUZHA",
    "ERNAKULAM",
    "IDUKKI",
    "KANNUR",
    "KASARAGOD",
    "KOLLAM",
    "KOTTAYAM",
    "KOZHIKODE",
    "MALAPPURAM",
    "PALAKKAD",
    "PATHANAMTHITTA",
    "THIRUVANANTHAPURAM",
    "THRISSUR",
    "WAYANAD",
  ],
  "MADHYA PRADESH": [
    "AGAR MALWA",
    "ALIRAJPUR",
    "ANUPPUR",
    "ASHOKNAGAR",
  ],
  "MAHARASHTRA": [
    "AHMEDNAGAR",
    "AKOLA",
    "AMRAVATI",
    "AURANGABAD",
    "BEED",
    "BHANDARA",
    "BULDHANA",
    "CHANDRAPUR",
    "DHULE",
    "GADCHIROLI",
    "GONDIA",
    "HINGOLI",
    "JALGAON",
    "JALNA",
    "KOLHAPUR",
    "LATUR",
    "MUMBAI CITY",
    "MUMBAI SUBURBAN",
    "NAGPUR",
    "NANDED",
    "NANDURBAR",
    "NASHIK",
    "OSMANABAD",
    "PALGHAR",
    "PARBHANI",
    "PUNE",
    "RAIGAD",
    "RATNAGIRI",
    "SANGLI",
    "SATARA",
    "SINDHUDURG",
    "SOLAPUR",
    "THANE",
    "WARDHA",
    "WASHIM",
    "YAVATAMAL",
  ],
  "MANIPUR": [
    "BISHNUPUR",
    "CHANDEL",
    "CHURACHANDPUR",
    "IMPHAL EAST",
    "IMPHAL WEST",
    "JIRIBAM",
    "KAKCHING",
    "KAMJONG",
    "KANGPOKPI",
    "NONEY",
    "PHERZAWL",
    "SENAPATI",
    "TAMENGLONG",
    "TENGNOUPAL",
    "THOUBAL",
    "UKHRUL",
  ],
  "MEGHALAYA": [
    "EAST GARO HILLS",
    "EAST JAINTIA HILLS",
    "EAST KHASI HILLS",
    "NORTH GARO HILLS",
    "RI BHOI",
    "SOUTH GARO HILLS",
    "SOUTH WEST GARO HILLS",
    "SOUTH WEST KHASI HILLS",
    "WEST GARO HILLS",
    "WEST JAINTIA HILLS",
    "WEST KHASI HILLS",
  ],
  "MIZORAM": [
    "AIZAWL",
    "CHAMPHAI",
    "HNATHIAL",
    "KOLASIB",
    "LAWNGTLAI",
    "LUNGLEI",
    "MAMIT",
    "SAIHA",
    "SAITUAL",
    "SERCHHIP",
  ],
  "NAGALAND": [
    "CHÜMOUKEDIMA",
    "DIMAPUR",
    "KIPHIRE",
    "KOHIMA",
    "LONGLENG",
    "MOKOKCHUNG",
    "MON",
    "NOKLAK",
    "PEREN",
    "PHEK",
    "TUENSANG",
    "WOKHA",
    "ZÜNHEBOTO",
  ],
  "ODISHA": [
    "ANGUL",
    "BALASORE",
    "BALANGIR",
    "BARGARH",
    "BHADRAK",
    "BOUDH",
    "CUTTACK",
    "DEOGARH",
    "DHENKANAL",
    "GAJAPATI",
    "GANJAM",
    "JAGATSINGHPUR",
    "JAJPUR",
    "JHARSUGUDA",
    "KALAHANDI",
    "KANDHAMAL",
    "KENDRAPARA",
    "KENDUJHAR",
    "KHORDHA",
  ],
  "PUDUCHERRY": ["KARAIKAL", "MAHE", "PUDUCHERRY", "YANAM"],
  "PUNJAB": [
    "AMRITSAR",
    "BARNALA",
    "BATHINDA",
    "FEROZPUR",
    "GURDASPUR",
    "HOSHIARPUR",
    "JALANDHAR",
    "KAPURTHALA",
    "LUDHIANA",
    "PATIALA",
    "RUPNAGAR",
    "SANGRUR",
    "FATEHGARH SAH",
    "MUKTSAR",
    "MANSA",
    "SAS NAGAR (MGA)",
    "TARN TARAN",
  ],
  "RAJASTHAN": [
    "AJMER",
    "ALWAR",
    "BANSWARA",
    "BARAN",
    "BARMER",
    "BHILWARA",
    "BIKANER",
    "BUNDI",
    "CHITTORGARH",
    "CHURU",
    "DAUSA",
    "DHOLPUR",
    "DUNGARPUR",
    "HANUMANGARH",
    "JAIPUR",
    "JAISALMER",
    "JALORE",
    "JODHPUR",
    "KARAULI",
    "KOTA",
    "NAGAUR",
    "PALI",
    "PRATAPGARH",
    "RAJSAMAND",
    "SAWAI MADHOPUR",
    "SIKAR",
    "SIROHI",
    "TONK",
    "UDAIPUR",
  ],
  "SIKKIM": ["EAST SIKKIM", "NORTH SIKKIM", "SOUTH SIKKIM", "WEST SIKKIM"],
  "TAMIL NADU": [
    "ARIYALUR",
    "CHENGALPATTU",
    "CHENNAI",
    "COIMBATORE",
    "CUDDALORE",
    "DHARMAPURI",
    "DINDIGUL",
    "ERODE",
    "KALLAKURICHI",
    "KANCHIPURAM",
    "KANYAKUMARI",
    "KARUR",
    "KRISHNAGIRI",
    "MADURAI",
    "NAGAPATTINAM",
    "NAMAKKAL",
    "NILGIRIS",
    "PERAMBALUR",
    "PUDUKKOTTAI",
    "TIRUVALLUR",
    "THANJAVUR",
    "TIRUCHIRAPPALLI",
    "TIRUNELVELI",
    "TIRUPUR",
    "VELLORE",
    "VILUPPURAM",
    "VIRUDHUNAGAR",
  ],
  "TELANGANA": [
    "ADILABAD",
    "BHADRADRI KOTHAGUDEM",
    "HYDERABAD",
    "JAGTIAL",
    "JANGAON",
    "JAYASHANKAR BHUPALPALLY",
    "JOGULAMBA GADWAL",
    "KAMAREDDY",
    "KARIMNAGAR",
  ],
  "UTTARAKHAND": [
    "ALMORA",
    "BAGESHWAR",
    "CHAMOLI",
    "CHAMPAWAT",
    "DEHRADUN",
    "HARIDWAR",
    "NAINITAL",
    "PAURI GARHWAL",
    "PITHORAGARH",
    "RUDRAPRAYAG",
    "TEHRI GARHWAL",
    "UDHAM SINGH NAGAR",
    "UTTARKASHI",
  ],
  "UTTAR PRADESH": [
    "AGRA",
    "ALIGARH",
    "AMBEDKAR NAGAR",
    "AMETHI",
    "AMROHA",
    "AURAIYA",
    "AZAMGARH",
    "BAGHPAT",
    "BAHRAICH",
    "BALLIA",
    "BALRAMPUR",
    "BANDA",
    "BARABANKI",
    "BASTI",
    "DEORIA",
    "ETAH",
    "ETAWAH",
    "FAIZABAD",
    "FARRUKHABAD",
    "FATEHPUR",
    "FIROZABAD",
    "GHAZIPUR",
    "GONDA",
    "GORAKHPUR",
    "HARDOI",
    "HAPUR",
    "HATHRAS",
    "JALAUN",
    "JAUNPUR",
    "JHANSI",
    "KANNAUJ",
    "KANPUR DEHAT",
    "KANPUR NAGAR",
    "KUSHINAGAR",
    "LAKHIMPUR KHERI",
    "LALITPUR",
    "LUCKNOW",
    "MAHARAJGANJ",
    "MAHOBA",
    "MAINPURI",
    "MATHURA",
    "MEERUT",
    "MIRZAPUR",
    "MORADABAD",
    "MUZAFFARNAGAR",
    "PILIBHIT",
    "PRATAPGARH",
    "RAE BARELI",
    "RAMPUR",
    "SAHARANPUR",
    "SANT KABIR NAGAR",
    "SHAHJAHANPUR",
    "SHAMLI",
    "SHRAVASTI",
    "SIDDHARTHNAGAR",
    "SITAPUR",
    "SONBHADRA",
    "SULTANPUR",
    "UNNAO",
    "VARANASI",
  ],
  "WEST BENGAL": [
    "ALIPURDUAR",
    "BANKURA",
    "BIRBHUM",
    "COOCH BEHAR",
    "DAKSIN DINAJPUR",
    "DARJEELING",
    "HOOGHLY",
    "HOWRAH",
    "JALPAIGURI",
    "JHARGRAM",
    "KALIMPONG",
    "KOLKATA",
    "MALDA",
    "MURSHIDABAD",
    "NADIA",
    "NORTH 24 PARGANAS",
    "PASCHIM BARDHAMAN",
    "PASCHIM MEDINIPUR",
    "PURBA BARDHAMAN",
    "PURBA MEDINIPUR",
    "PURULIA",
    "SOUTH 24 PARGANAS",
    "UTTAR DINAJPUR",
  ],
};

// Month options for autocomplete
const monthOptions = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function CropRecommender() {
  const [formData, setFormData] = useState<FormData>({
    N: "",
    P: "",
    K: "",
    temperature: "",
    humidity: "",
    ph: "",
    rainfall: "",
  });
  const [recommendation, setRecommendation] = useState<RecommendationData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // State for toggling rainfall helper mode
  const [rainfallHelperMode, setRainfallHelperMode] = useState<boolean>(false);
  const [rainfallHelperData, setRainfallHelperData] = useState<RainfallHelperData>({
    state: "",
    district: "",
    month: "",
  });
  const [rainfallLoading, setRainfallLoading] = useState<boolean>(false);
  const [rainfallError, setRainfallError] = useState<string | null>(null);

  // Handle input changes for main form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle input changes for rainfall helper
  const handleRainfallHelperChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRainfallHelperData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle submission of main recommendation form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setRecommendation(null);

    if (!formData.temperature || !formData.humidity || !formData.rainfall) {
      setError("Please fill out all required fields (Temperature, Humidity, Rainfall).");
      return;
    }

    const payload = {
      N: formData.N ? parseFloat(formData.N) : null,
      P: formData.P ? parseFloat(formData.P) : null,
      K: formData.K ? parseFloat(formData.K) : null,
      temperature: parseFloat(formData.temperature),
      humidity: parseFloat(formData.humidity),
      ph: formData.ph ? parseFloat(formData.ph) : null,
      rainfall: parseFloat(formData.rainfall),
    };

    try {
      setLoading(true);
      const response = await fetch("http://localhost:8000/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server error: ${errorText}`);
      }
      const data: RecommendationData = await response.json();
      setRecommendation(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to get recommendation");
    } finally {
      setLoading(false);
    }
  };

  // Compute filtered district options based on selected state
  const filteredDistrictOptions =
    rainfallHelperData.state &&
    stateDistrictMapping[rainfallHelperData.state.toUpperCase()]
      ? stateDistrictMapping[rainfallHelperData.state.toUpperCase()]
      : [];

  // Handle submission of rainfall helper
  const submitRainfallHelper = async () => {
    setRainfallError(null);

    if (!rainfallHelperData.state || !rainfallHelperData.district || !rainfallHelperData.month) {
      setRainfallError("Please fill out all fields (State, District, Month).");
      return;
    }

    try {
      setRainfallLoading(true);
      const response = await fetch("http://localhost:8000/rainfall", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(rainfallHelperData),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server error: ${errorText}`);
      }
      const data = await response.json();
      const predictedRainfall = data.rainfall.toString();
      setFormData((prev) => ({ ...prev, rainfall: predictedRainfall }));
      // Clear the rainfall helper data after prediction
      setRainfallHelperData({ state: "", district: "", month: "" });
      setRainfallHelperMode(false);
    } catch (err) {
      setRainfallError(err instanceof Error ? err.message : "Failed to get rainfall prediction");
    } finally {
      setRainfallLoading(false);
    }
  };

  const cancelRainfallHelper = () => {
    setRainfallHelperMode(false);
  };

  const resetForm = () => {
    setRecommendation(null);
    setError(null);
    setFormData({
      N: "",
      P: "",
      K: "",
      temperature: "",
      humidity: "",
      ph: "",
      rainfall: "",
    });
  };

  return (
    <div
      className="min-h-screen bg-gray-50 overflow-auto"
      style={{
        backgroundImage: "url('/images/bg3.png')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <main className="container mx-auto pt-16 p-4 flex items-start justify-start">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-2xl bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-6 mb-8 mt-10 border-b-4 border-green-500"
        >
          <motion.h1
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
            className="text-2xl font-bold text-green-700 mb-6 text-center flex items-center justify-center"
          >
            <IoLeaf className="text-green-600 mr-2 text-3xl" />
            Crop Yield Recommender
          </motion.h1>

          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="bg-red-100 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded mb-4 flex items-center"
            >
              <IoColorFilter className="text-red-500 mr-2" /> {error}
            </motion.div>
          )}

          {recommendation ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <motion.div
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-6 p-6 bg-green-50 rounded-lg text-black border-l-4 border-green-600"
              >
                <h2 className="text-xl font-semibold mb-4 flex items-center text-green-800">
                  <IoAnalytics className="mr-2 text-2xl text-green-600" /> 
                  Recommendation Results
                </h2>
                <div className="space-y-3">
                  <p className="flex items-center">
                    <IoLeaf className="text-green-700 mr-2 text-xl" />
                    <strong>Predicted Crop:</strong>
                    <span className="ml-2 font-medium text-green-700">
                      {recommendation.predicted_crop}
                    </span>
                  </p>
                  <p className="flex items-start">
                    <IoEarth className="text-green-700 mr-2 text-xl mt-1" />
                    <strong>Top Crops:</strong>
                    <span className="ml-2">
                      {recommendation.top_crops.join(", ")}
                    </span>
                  </p>
                </div>
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  className="w-full bg-gray-600 hover:bg-gray-700 text-white flex items-center justify-center group transition-all duration-300"
                  onClick={resetForm}
                >
                  <FaArrowLeft className="mr-2 group-hover:mr-3 transition-all duration-300" />
                  Back to Recommendation Form
                </Button>
              </motion.div>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, staggerChildren: 0.1 }}
              onSubmit={handleSubmit}
              className="grid grid-cols-2 gap-x-4 gap-y-6"
            >
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col"
              >
                <label className="text-sm font-medium text-gray-800 flex items-center mb-1">
                  <IoLeaf className="mr-2 text-green-600" />
                  Nitrogen (optional):
                </label>
                <Input
                  name="N"
                  type="number"
                  placeholder="Enter nitrogen content"
                  value={formData.N}
                  onChange={handleChange}
                  className="text-black placeholder:text-gray-500 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
                />
              </motion.div>

              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="flex flex-col"
              >
                <label className="text-sm font-medium text-gray-800 flex items-center mb-1">
                  <IoLeaf className="mr-2 text-indigo-600" />
                  Phosphorus (optional):
                </label>
                <Input
                  name="P"
                  type="number"
                  placeholder="Enter phosphorus content"
                  value={formData.P}
                  onChange={handleChange}
                  className="text-black placeholder:text-gray-500 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                />
              </motion.div>

              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="flex flex-col"
              >
                <label className="text-sm font-medium text-gray-800 flex items-center mb-1">
                  <IoLeaf className="mr-2 text-purple-600" />
                  Potassium (optional):
                </label>
                <Input
                  name="K"
                  type="number"
                  placeholder="Enter potassium content"
                  value={formData.K}
                  onChange={handleChange}
                  className="text-black placeholder:text-gray-500 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
                />
              </motion.div>

              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="flex flex-col"
              >
                <label className="text-sm font-medium text-gray-800 flex items-center mb-1">
                  <IoThermometer className="mr-2 text-red-500" />
                  Temperature:
                </label>
                <Input
                  name="temperature"
                  type="number"
                  placeholder="Enter temperature"
                  value={formData.temperature}
                  onChange={handleChange}
                  required
                  className="text-black placeholder:text-gray-500 focus:ring-red-500 focus:border-red-500 transition-all duration-300"
                />
              </motion.div>

              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="flex flex-col"
              >
                <label className="text-sm font-medium text-gray-800 flex items-center mb-1">
                  <IoWater className="mr-2 text-blue-500" />
                  Humidity:
                </label>
                <Input
                  name="humidity"
                  type="number"
                  placeholder="Enter humidity"
                  value={formData.humidity}
                  onChange={handleChange}
                  required
                  className="text-black placeholder:text-gray-500 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                />
              </motion.div>

              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.5 }}
                className="flex flex-col"
              >
                <label className="text-sm font-medium text-gray-800 flex items-center mb-1">
                  <IoEarth className="mr-2 text-amber-600" />
                  pH (optional):
                </label>
                <Input
                  name="ph"
                  type="number"
                  placeholder="Enter pH level"
                  value={formData.ph}
                  onChange={handleChange}
                  className="text-black placeholder:text-gray-500 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300"
                />
              </motion.div>

              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.6 }}
                className="flex flex-col col-span-2"
              >
                <label className="text-sm font-medium text-gray-800 flex items-center mb-1">
                  <IoEarth className="mr-2 text-teal-600" />
                  Rainfall (in mm):
                </label>
                {rainfallHelperMode ? (
                  <div className="space-y-2">
                    <Input
                      name="state"
                      type="text"
                      placeholder="Enter state/UT"
                      list="state-options"
                      value={rainfallHelperData.state}
                      onChange={handleRainfallHelperChange}
                      className="text-black placeholder:text-gray-500 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300"
                    />
                    <datalist id="state-options">
                      {stateOptions.map((option) => (
                        <option key={option} value={option} />
                      ))}
                    </datalist>

                    <Input
                      name="district"
                      type="text"
                      placeholder="Enter district"
                      list="district-options"
                      value={rainfallHelperData.district}
                      onChange={handleRainfallHelperChange}
                      className="text-black placeholder:text-gray-500 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300"
                    />
                    <datalist id="district-options">
                      {filteredDistrictOptions.map((option) => (
                        <option key={option} value={option} />
                      ))}
                    </datalist>

                    <Input
                      name="month"
                      type="text"
                      placeholder="Enter month (e.g., January, February, July)"
                      list="month-options"
                      value={rainfallHelperData.month}
                      onChange={handleRainfallHelperChange}
                      className="text-black placeholder:text-gray-500 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300"
                    />
                    <datalist id="month-options">
                      {monthOptions.map((option) => (
                        <option key={option} value={option} />
                      ))}
                    </datalist>

                    {rainfallError && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-red-600 text-sm flex items-center"
                      >
                        <IoColorFilter className="text-red-500 mr-1" /> {rainfallError}
                      </motion.div>
                    )}
                    <div className="flex gap-2">
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          type="button"
                          onClick={submitRainfallHelper}
                          disabled={rainfallLoading}
                          className="bg-teal-600 hover:bg-teal-700 text-white transition-all duration-300"
                        >
                          {rainfallLoading ? (
                            <span className="flex items-center">
                              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Predicting...
                            </span>
                          ) : "Predict Rainfall"}
                        </Button>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          type="button"
                          onClick={cancelRainfallHelper}
                          className="bg-gray-500 hover:bg-gray-600 text-white transition-all duration-300"
                        >
                          Cancel
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                ) : (
                  <>
                    <Input
                      name="rainfall"
                      type="number"
                      placeholder="Enter rainfall"
                      value={formData.rainfall}
                      onChange={handleChange}
                      required
                      className="text-black placeholder:text-gray-500 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300"
                    />
                    <motion.button
                      whileHover={{ x: 3 }}
                      type="button"
                      className="text-blue-600 text-sm mt-1 underline flex items-center w-fit hover:text-blue-700 transition-colors duration-300"
                      onClick={() => setRainfallHelperMode(true)}
                    >
                      <IoWater className="mr-1 text-blue-500" />
                      Need help finding rainfall of your area?
                    </motion.button>
                  </>
                )}
              </motion.div>

              <div className="col-span-2">
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.7 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    className="w-full bg-green-600 hover:bg-green-700 text-white mt-4 transition-all duration-300 flex items-center justify-center"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Recommending..." : "Recommend"}
                  </Button>
                </motion.div>
              </div>
            </motion.form>
          )}
        </motion.div>
      </main>
    </div>
  );
}
