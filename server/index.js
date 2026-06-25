const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());


// Health check
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Server is running"
    });
});


// Calculation route
app.post("/api/calculate", async (req, res) => {

    try {

        const {
            postcode,
            country,
            roofArea,
            people,
            roofType
        } = req.body;


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



        // -------------------
        // Country normalize
        // -------------------

        const normalizedCountry = country
            .toLowerCase()
            .trim();


        const countryMap = {

            "united states of america":
                "united states",

            "usa":
                "united states",

            "us":
                "united states",

            "uk":
                "united kingdom"

        };


        const finalCountry =
            countryMap[normalizedCountry] ||
            normalizedCountry;




        // -------------------
        // Geocoding
        // -------------------

        const query =
            `${postcode}, ${country}`;


        const geoUrl =
            `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(query)}&key=${apiKey}`;


        const geoRes =
            await axios.get(geoUrl);



        if (!geoRes.data.results?.length) {

            return res.status(400).json({
                error: "Invalid location provided"
            });

        }



        const {
            lat,
            lng
        } =
            geoRes.data.results[0].geometry;



        // -------------------
        // NASA rainfall
        // -------------------

        const rainUrl =
            `https://power.larc.nasa.gov/api/temporal/climatology/point?parameters=PRECTOTCORR&community=RE&longitude=${lng}&latitude=${lat}&format=JSON`;


        const rainRes =
            await axios.get(rainUrl);



        const monthly =
            rainRes.data.properties.parameter.PRECTOTCORR;


        const annualRainfall =
            monthly.ANN * 365;



        // -------------------
        // Water calculation
        // -------------------


        const coefficients = {

            concrete: 0.8,
            metal: 0.9,
            tiles: 0.75,
            mud: 0.6

        };


        const coeff =
            coefficients[roofType] || 0.8;



        const runoff =
            annualRainfall *
            Number(roofArea) *
            coeff;



        const demand =
            Number(people) *
            135 *
            365;



        const coverage =
            (runoff / demand) * 100;



        const surplus =
            runoff - demand;




        // -------------------
        // Structure
        // -------------------


        let structure;


        if (coverage < 30) {

            structure =
                "Recharge Pit";

        }


        else if (coverage < 100) {


            if (Number(roofArea) < 150) {

                structure =
                    "Recharge Pit";

            }
            else {

                structure =
                    "Recharge Trench";

            }

        }


        else {


            if (runoff < 200000) {

                structure =
                    "Storage Tank";

            }
            else {

                structure =
                    "Storage Tank + Recharge Trench";

            }

        }




        // -------------------
        // Cost
        // -------------------


        const baseCost = {

            "Recharge Pit": 15000,

            "Recharge Trench": 30000,

            "Storage Tank": 50000,

            "Storage Tank + Recharge Trench": 80000

        };



        const countryFactor = {


            india: 1,

            "united states": 3.5,

            australia: 3,

            "united kingdom": 3.2,

            "south africa": 1.8,


            default: 2

        };



        const base =
            baseCost[structure] || 50000;


        const multiplier =
            countryFactor[finalCountry] ||
            countryFactor.default;



        const costINR =
            base * multiplier;





        // -------------------
        // Currency
        // -------------------


        const currency = {


            india: {
                symbol: "₹",
                conversion: 1
            },


            "united states": {
                symbol: "$",
                conversion: 0.012
            },


            australia: {
                symbol: "A$",
                conversion: 0.018
            },


            "united kingdom": {
                symbol: "£",
                conversion: 0.0095
            },


            "south africa": {
                symbol: "R",
                conversion: 0.22
            },


            default: {
                symbol: "$",
                conversion: 0.012
            }


        };



        const selectedCurrency =
            currency[finalCountry] ||
            currency.default;




        const finalCost =
            costINR *
            selectedCurrency.conversion;



        // -------------------
        // Savings
        // -------------------


        const waterRate = {


            india: 50,

            "united states": 150,

            australia: 120,

            "united kingdom": 140,

            "south africa": 80,


            default: 80

        };



        const rate =
            waterRate[finalCountry] ||
            waterRate.default;



        const annualSavings =
            (runoff / 1000) *
            rate *
            selectedCurrency.conversion;



        const paybackYears =
            annualSavings > 0
                ?
                finalCost / annualSavings
                :
                null;




        const feasible =
            coverage >= 50;




        return res.status(200).json({


            location: {

                latitude: lat,
                longitude: lng

            },


            rainfall:
                Number(annualRainfall.toFixed(2)),


            rainwaterCollected:
                Number(runoff.toFixed(0)),


            waterDemand:
                Number(demand.toFixed(0)),


            surplus:
                Number(surplus.toFixed(0)),


            coverage:
                Number(coverage.toFixed(1)),


            feasible,


            recommendedStructure:
                structure,


            cost:
                `${selectedCurrency.symbol}${finalCost.toFixed(0)}`,


            annualSavings:
                `${selectedCurrency.symbol}${annualSavings.toFixed(0)}`,


            paybackPeriod:

                paybackYears
                    ?
                    `${paybackYears.toFixed(1)} years`
                    :
                    "Not recoverable"


        });



    }

    catch (error) {
    console.error("FULL ERROR:", error);

    return res.status(500).json({
        error: error.message
    });
}

});



app.listen(PORT, () => {

    console.log(
        `Server running on port ${PORT}`
    );

});