function Working() {
    return (
        <section className="learn-section">
            <h1 >How <span>It Works?</span></h1>
            <p>We use data, smart calculations and proven methods to help you make the best water conservation decision</p>
            <div className="grid1">
                <div className="grid-item">
                    <h4 className="sr">1</h4>
                    <img src="./src/assets/map-pin.png" alt="map" />
                    <h5>Enter Location</h5>
                    <p>Select your country and enter your postcode. We fetch your location using advanced geocoding.</p>
                </div>
                <div className="grid-item">
                    <h4 className="sr">2</h4>
                    <img src="./src/assets/person-team.svg" alt="person" />
                    <h5>Analyze Rainfall</h5>
                    <p>We analyze historical rainfall data from NASA to calculate annual rainfall for your location.</p>
                </div>
                <div className="grid-item">
                    <h4 className="sr">3</h4>
                    <img src="./src/assets/home.png" alt="home" />
                    <h5>Roof Details</h5>
                    <p>Provide your roof area and material type. We estimate the amount of rainwater your roof can collect and compare it with your water demand.</p>
                </div>
                <div className="grid-item">
                    <h4 className="sr">4</h4>
                    <img src="./src/assets/calculator-outline.svg" alt="calc" />
                    <h5>Calculate & Analyze</h5>
                    <p>We analyze rainfall data and calculate your potential according to the roofarea and water demand.</p>
                </div>
                <div className="grid-item">
                    <h4 className="sr">5</h4>
                    <img src="./src/assets/tank.png" alt="tank" />
                    <h5>Get Recommendation</h5>
                    <p>We suggest the most suitable rainwater harvesting solution for your home with cost and savings.</p>
                </div>
            </div>
            <h3 >Why Rainwater Harvesting?</h3>
            <div className="grid2">
                <div className="grid2-item">
                    <div className="title"><img src="./src/assets/water-droplet.png" alt="drop" /><h5>Save Water</h5></div>
                    <p>Reduce dependence on municipal water supplies</p>
                </div>
                <div className="grid2-item">
                    <div className="title"><img src="./src/assets/banknotes.svg" alt="" srcset="" /><h5>Save Money</h5></div>
                    <p>Lower your water bills and maintenance costs</p>
                </div>
                <div className="grid2-item">
                    <div className="title"><img src="./src/assets/aquifer.png" alt="" srcset="" /><h5>Recharge Groundwater</h5></div>
                    <p>Improve groundwater levels and prevent water scarcity</p>
                </div>
                <div className="grid2-item">
                    <div className="title"><img src="./src/assets/flooded-house.png" alt="" srcset="" /><h5>Reduce Flooding</h5></div>
                    <p>Capture rainwater and reduce surface runoff and flooding</p>
                </div>
                <div className="grid2-item">
                    <div className="title"><img src="./src/assets/leaf.svg" alt="" srcset="" /><h5>Better Environment</h5></div>
                    <p>Consume water today for a cleaner and greener tomorrow</p>
                </div>
            </div>
            <h1 >Steps of <span>Rainwater Harvesting</span></h1>
            <p>A simple process that creates a big impact.</p>

            <div className="stp-pg">

                <div className="timeline">
                    <ul>
                        <li>
                            <h4 className="sr">1</h4>
                            <img src="./src/assets/cloudRain.webp" alt="" />
                            <div className="content">
                                <h5>Rainfall</h5>
                                <p>Rain falls on the rooftop and surrounding areas</p>
                            </div>
                        </li>
                        <li>
                            <h4 className="sr">2</h4>
                            <img src="./src/assets/pipes.png" alt="" />
                            <div className="content">
                                <h5>Collection</h5>
                                <p>Rainwater is collected from the roof using gutters and pipes</p>
                            </div>
                        </li>
                        <li>
                            <h4 className="sr">3</h4>
                            <img src="./src/assets/filter.png" alt="" />
                            <div className="content">
                                <h5>Filteration</h5>
                                <p>Water passes through filters to remove leaves, dust and impurities</p>
                            </div>
                        </li>
                        <li>
                            <h4 className="sr">4</h4>
                            <img src="./src/assets/tank.png" alt="" />
                            <div className="content">
                                <h5>Storage / Recharge</h5>
                                <p>Filtered water is stored in tanks or recharged into the ground through pits or trenches</p>
                            </div>
                        </li>
                        <li>
                            <h4 className="sr">5</h4>
                            <img src="./src/assets/icn-tip-drop.png" alt="" />
                            <div className="content">
                                <h5>Reuse</h5>
                                <p>Stored water can be used for cleaning, gardening, flushing and other non-potable uses</p>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="right">

                    <div className="box">
                        <h4>Why Collect Rainwater?</h4>
                        <ul>
                            <li><img src="./src/assets/check.png" alt="" />Conserves freshwater resources</li>
                            <li><img src="./src/assets/check.png" alt="" />Reduces water bills</li>
                            <li><img src="./src/assets/check.png" alt="" />Improves groundwater levels</li>
                            <li><img src="./src/assets/check.png" alt="" />Reduces flooding and soil erosion</li>
                            <li><img src="./src/assets/check.png" alt="" />Supports a sustainable future</li>
                        </ul>
                    </div>
                    <img src="./src/assets/houseImg.png" alt="house" />
                </div>
            </div>

        </section>
    );
}

export default Working;
