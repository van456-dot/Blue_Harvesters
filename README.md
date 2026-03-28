# 🌧️ Rooftop Rainwater Harvesting & Artificial Recharge Assessment Tool

A web application for **on-spot assessment of Rooftop Rainwater Harvesting (RTRWH)** and **Artificial Recharge (AR)** potential. This tool enables users to evaluate feasibility, estimate runoff, and get recommendations for sustainable groundwater management.

---

## 📌 Overview

Groundwater depletion is a major concern in many regions. While rooftop rainwater harvesting offers a practical solution, there is no simple platform for individuals to assess its feasibility.

This project aims to bridge that gap by providing a **user-friendly application** that:

* Estimates rainwater harvesting potential
* Suggests suitable recharge structures
* Provides cost and benefit analysis
* Encourages sustainable water practices

---

## 🚀 Features

* ✅ Feasibility analysis for rooftop rainwater harvesting
* 🌧️ Rainfall data integration (location-based)
* 🌍 GIS-based groundwater insights (aquifer, depth, etc.)
* 📊 Runoff calculation and water demand estimation
* 🏗️ Structure recommendation (pit, trench, shaft, storage tank)
* 📐 Dimension calculation for recharge structures
* 💰 Cost estimation and cost-benefit analysis
* 📍 Auto location detection
  
---

## 🧠 Core Calculation Logic

### Runoff Estimation

Runoff is calculated using:

```
Runoff = Rainfall × Roof Area × Runoff Coefficient
```

* Rainfall → Annual rainfall (mm)
* Roof Area → in square meters
* Coefficient → depends on roof type

---

### Water Demand Estimation

```
Demand = Number of People × 135 L/day
```

---

### Structure Recommendation

Rule-based logic:

* Small roof → Recharge Pit
* Large area → Recharge Trench
* Deep groundwater → Recharge Shaft
* High runoff → Storage Tank

---

## 🏗️ Tech Stack

### Frontend

* React.js

### Backend

* Node.js + Express

### Database

* MongoDB

### GIS & Mapping

* Leaflet.js

### APIs & Data Sources

* Rainfall: IMD / NASA POWER API
* Maps: OpenStreetMap / Google Maps
* Groundwater: CGWB datasets

---

## ⚙️ System Architecture

```
Frontend (UI)
     ↓
Backend API
     ↓
Calculation Engine
     ↓
Database + GIS Data
     ↓
Response (Results + Recommendations)
```

---

## 📦 Installation & Setup

### 1. Clone Repository

```bash
git clone https://github.com/van456-dot/Blue_Harvesters.git
cd BlueHarvesters
```

### 2. Backend Setup

#### Node.js

```bash
cd server
npm install
npm start
```

---

### 3. Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

## 🔌 API Example

### POST `/calculate`

#### Request

```json
{
  "location": "Meerut",
  "roof_area": 100,
  "people": 5
}
```

#### Response

```json
{
  "runoff": 65000,
  "feasible": true,
  "structure": "Recharge Pit",
  "dimensions": "2m x 2m x 2m",
  "cost": "₹25,000"
}
```

---

## 🧪 MVP Scope

* Input form
* Basic runoff calculator
* Simple recommendation engine
* Static rainfall dataset
* Results dashboard

---

## 🔮 Future Enhancements

* 🔹 Real-time GIS integration
* 🔹 Machine learning-based recommendations
* 🔹 Soil type & permeability analysis
* 🔹 IoT integration (rain sensors, water levels)
* 🔹 Mobile app deployment
* 🔹 PDF report generation
* 🔹 Regional language support

---

## 🤝 Contribution

Contributions are welcome!
Feel free to fork the repo, create a branch, and submit a PR.

---

## 📜 License

This project is licensed under the MIT License.

---

## 🙌 Acknowledgements

* Central Ground Water Board (CGWB)
* Indian Meteorological Department (IMD)
* OpenStreetMap

---

## 💡 Impact

This tool aims to:

* Promote groundwater conservation
* Increase public awareness
* Enable data-driven decision making
* Support sustainable water management

---

**🌱 "Every drop counts – harvest rain, recharge groundwater."**

