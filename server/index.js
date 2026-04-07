const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// Health check route
app.get("/", (req, res) => {
    res.status(200).json({ message: "Server is running" });
});

// Main calculation route
app.post("/api/calculate", async (req, res) => {
    try {
        const { postcode, country, roofArea, people, roofType } = req.body;

        // Input validation
        if (!postcode || !country || !roofArea || !people) {
            return res.status(400).json({
                error: "Missing required fields"
            });
        }

        const apiKey = process.env.OPENCAGE_API_KEY;

        if (!apiKey) {
            return res.status(500).json({
                error: "Server configuration error"
            });
        }

        // Geocoding request
        const query = `${postcode}, ${country}`;
        const geoUrl = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(query)}&key=${apiKey}`;

        const geoRes = await axios.get(geoUrl);

        if (!geoRes.data.results?.length) {
            return res.status(400).json({
                error: "Invalid location provided"
            });
        }

        const { lat, lng } = geoRes.data.results[0].geometry;
        console.log("Geocoded Location:", lat, lng);

        // NASA power request

        const rainUrl = `https://power.larc.nasa.gov/api/temporal/climatology/point?parameters=PRECTOTCORR&community=RE&longitude=${lng}&latitude=${lat}&format=JSON`;
        
        const rainRes = await axios.get(rainUrl);
        
        const monthly = rainRes.data.properties.parameter.PRECTOTCORR;
        
        let annualRainfall = 0;
        
        for (let m in monthly) {
            annualRainfall += monthly[m];
        }
        
        console.log("Annual Rainfall:", annualRainfall);
        
        
        
        // Calculation logic
        const coefficients = {
            concrete: 0.8,
            metal: 0.9,
            tiles: 0.75,
            mud: 0.6
        };
        const coeff = coefficients[roofType] || 0.8;

        const runoff = annualRainfall * Number(roofArea) * coeff;
        const demand = Number(people) * 135 * 365;

        // Recommendation logic
        let structure = "Recharge Pit";

        if (roofArea > 200) {
            structure = "Recharge Trench";
        }

        if (runoff > 100000) {
            structure = "Storage Tank";
        }

        return res.status(200).json({
            location: {
                latitude: lat,
                longitude: lng
            },
            runoff,
            demand,
            feasible: runoff >= demand,
            recommendedStructure: structure
        });

    } catch (error) {
        return res.status(500).json({
            error: "Internal server error"
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});