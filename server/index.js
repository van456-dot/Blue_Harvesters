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

        const monthly = rainRes.data.properties.parameter.PRECTOTCORR;// Monthly average precipitation in mm/day
        const annualRainfall = monthly.ANN * 365; // Convert from mm/day to mm/year

        console.log("Annual Rainfall:", annualRainfall); //annual rainfall in mm/year

        // Calculation logic
        const coefficients = {
            concrete: 0.8,
            metal: 0.9,
            tiles: 0.75,
            mud: 0.6
        };
        const coeff = coefficients[roofType] || 0.8;

        const runoff = annualRainfall * Number(roofArea) * coeff; // runoff in liters/year
        const demand = Number(people) * 135 * 365; // demand in liters/year (135 liters per person per day)

        // Recommendation logic
        let structure = "Recharge Pit";

        if (roofArea > 200) {
            structure = "Recharge Trench";
        }

        if (runoff > 100000) {
            structure = "Storage Tank";
        }

        //Cost estimation (simplified)
        const baseCost = { // estimation in INR
            "Recharge Pit": 15000,
            "Recharge Trench": 30000,
            "Storage Tank": 50000
        };

        const countryFactor = { // Cost multiplier based on country
            india: 1,
            united_states: 3.5,
            australia: 3,
            united_kingdom: 3.2,
            south_africa: 1.8,
            default: 2
        };

        const base = baseCost[structure];
        const multiplier = countryFactor[country] || countryFactor.default;

        const estimatedCost = base * multiplier;

        const currencySymbol = {
            india: "₹",
            united_states: "$",
            australia: "A$",
            united_kingdom: "£",
            south_africa: "R"
        };
        const symbol = currencySymbol[country] || "₹";

        const waterRateByCountry = {
            india: 50,
            united_states: 150,
            australia: 120,
            default: 80
        };


        //cost benefit analysis
        const rate = waterRateByCountry[country] || waterRateByCountry.default;

        const annualSavings = (runoff / 1000) * rate;

        const paybackYears = estimatedCost / annualSavings;

        return res.status(200).json({
            location: {
                latitude: lat,
                longitude: lng
            },
            rainwaterCollected: runoff,
            waterDemand: demand,
            feasible: runoff >= demand,
            recommendedStructure: structure,

            cost: `${symbol}${estimatedCost}`,
            annualSavings: `${symbol}${annualSavings.toFixed(0)}`,
            paybackPeriod: `${paybackYears.toFixed(1)} years`
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