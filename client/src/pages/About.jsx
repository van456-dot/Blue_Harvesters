function About() {
    return (
        <section className="abt-section">
            <h1>About <span>JalVrishti</span></h1>
            <p>Our mission is to make every rooftop a source of water.</p>

            <div className="top">
                <div className="content">
                    <p>JalVrishti is a smart rainwater harvesting calculator that helps homes, communities and organizations estimate their rainfall potential, understand water demand and choose the right harvesting solution.</p>
                    <p>We combine satellite rainfall data, scientific calculations and practical insights to promote sustainable water conservation.</p>
                </div>
                <div className="image">
                    <img src="/images/heroImage.png" alt="about" />
                </div>
            </div>

            <div className="grid">
                <div className="grid-item">
                    <img src="/images/calculator-outline.svg" alt="calc"/>
                    <h5>Smart Calculations</h5>
                    <p>Automate analysis based on real climate data</p>
                </div>
                <div className="grid-item">
                    <img src="/images/shield-check.svg" alt="shield"/>
                    <h5>Practical Solutions</h5>
                    <p>Recommendations that are simple and effective</p>
                </div>
                <div className="grid-item">
                    <img src="/images/leaf.svg" alt="leaf"/>
                    <h5>Sustainable Future</h5>
                    <p>Helping communities save water for generations</p>
                </div>
                <div className="grid-item">
                    <img src="/images/person-team.svg" alt="team"/>
                    <h5>Built for Everyone</h5>
                    <p>Useful for homes, schools, offices and communities</p>
                </div>
            </div>
        </section>
    );
}

export default About;
