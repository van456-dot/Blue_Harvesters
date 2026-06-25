# 🌧️ JalVrishti
## Rooftop Rainwater Harvesting Assessment Tool

A web application for **on-spot assessment of Rooftop Rainwater Harvesting (RTRWH)**. This tool enables users to evaluate feasibility, estimate runoff, and get recommendations for sustainable groundwater management.

## 🌐 Live Demo

Frontend:
https://your-vercel-url.vercel.app

Backend API:
https://your-render-url.onrender.com
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
* 📊 Runoff calculation and water demand estimation
* 🏗️ Structure recommendation (pit, trench, shaft, storage tank)
* 📐 Dimension calculation for recharge structures
* 💰 Cost estimation and cost-benefit analysis
  
---

## 📸 Screenshots

### Home Page
<img width="1906" height="902" alt="Screenshot 2026-06-25 161518" src="https://github.com/user-attachments/assets/fabb286e-34f8-48c5-9907-7caea62e4cd1" />

### Assessment Form
<img width="1893" height="906" alt="Screenshot 2026-06-25 161533" src="https://github.com/user-attachments/assets/46e9bc48-9aa8-4069-b5e2-efce124ca7a2" />

### Results
<img width="1918" height="911" alt="Screenshot 2026-06-25 161736" src="https://github.com/user-attachments/assets/ef22cce2-6500-4562-96e0-65ecd1d444d0" />

### Contact
<img width="1902" height="905" alt="Screenshot 2026-06-25 161617" src="https://github.com/user-attachments/assets/fd2e965f-c6a9-4513-bc98-3a1246bf9385" />


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

### Water Demand Estimation (Annual)

```
Demand = Number of People × 135 x 365
```
### Coverage:
```
Coverage = (Collected Water / Demand) × 100
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

- React.js
- React Router
- CSS3
- Vite

### Backend

- Node.js
- Express.js
- Axios

### APIs
- NASA POWER API
- OpenCage Geocoding API

### Deployment
- Vercel (Frontend)
- Render (Backend)

---

## ⚙️ System Architecture

```
React Frontend
        |
        |
Express REST API
        |
        |
Calculation Engine
        |
        |
External APIs
(OpenCage + NASA POWER)
        |
        |
Result Dashboard
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

## 🔐 Environment Variables

Create `.env` inside server:

OPENCAGE_API_KEY=your_api_key
PORT=8080

## 🔌 API Example

### POST `/api/calculate`

#### Request

```json
{
   "postcode":"250001",
  "country":"india",
  "roofArea":120,
  "people":5,
  "roofType":"concrete"
}
```

#### Response

```json
{
  "rainwaterCollected": 58000,
 "waterDemand": 246375,
 "coverage":23.5,
 "feasible":false,
 "recommendedStructure":"Recharge Pit",
 "cost":"₹15000"
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
---

## 💡 Impact

This tool aims to:

* Promote groundwater conservation
* Increase public awareness
* Enable data-driven decision making
* Support sustainable water management

---
## 👨‍💻 Author

Vansh Goel

GitHub: github.com/van456-dot
LinkedIn: linkedin.com/in/vansh-goel-743329307

---

**🌱 "Every drop counts – harvest rain, recharge groundwater."**

