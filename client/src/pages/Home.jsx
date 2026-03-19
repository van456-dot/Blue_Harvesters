import { useMemo } from "react";

function Home() {
  const scrollTo = (id) => {
    const target = document.getElementById(id);
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth" });
  };

  const features = useMemo(
    () => [
      {
        title: "Collect rainwater",
        description:
          "Use your roof and gutters to capture rain, then store it safely in a tank.",
      },
      {
        title: "Estimate usage",
        description:
          "Enter your monthly water use to see if your tank will meet demand.",
      },
      {
        title: "Plan for the seasons",
        description:
          "See how your tank changes month-to-month based on rainfall patterns.",
      },
    ],
    []
  );

  return (
    <main>
      <section
        id="hero"
        className="hero"
        style={{
          backgroundImage: `url(https://rh-tools.s3.ap-southeast-2.amazonaws.com/images/mbt-landing-new.jpg)`,
        }}
      >
        <div className="hero__overlay" />
        <div className="hero__content">
          <h1>Rainwater tank calculator</h1>
          <p>
            Estimate how much rainwater your rooftop can collect and how long your
            tank will last.
          </p>
          <div className="hero__actions">
            <button type="button" onClick={() => scrollTo("calculator")}>
              Get started
            </button>
            <button
              type="button"
              className="ghost"
              onClick={() => scrollTo("how-it-works")}
            >
              How it works
            </button>
          </div>
        </div>
      </section>

      <section className="section" id="how-it-works">
        <div className="section__inner">
          <h2>How it works</h2>
          <p>
            Enter your roof area, water usage, and preferred tank size to get a
            month-by-month estimate of your tank level.
          </p>

          <div className="cards">
            {features.map((feature) => (
              <div key={feature.title} className="card">
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="calculator">
        <div className="section__inner">
          <h2>Rainwater calculator</h2>
          <form action="http://localhost:8080/rainwater/calc" method="POST">
            <label for="city">City:</label>
            <input type="text" id="city" name="city" /><br />
            <label for="rftoparea">RoofTopArea(m<sup>2</sup>):</label>
            <input type="text" name="rftoparea" id="rftoparea" /><br />
            <label for="runoffcoeff">Container Material Type:</label>
            <select name="runoffcoeff" id="runoffcoeff">
              <option value="">select</option>
              <option value="metal-steel">Steel</option>\
              <option value="concrete">Concrete</option>
            </select><br />
            <button>Calculate</button>
          </form>
        </div>
      </section>

      <section className="section" id="result">
        <div className="section__inner">
          <h2>Result:</h2>
        </div>
      </section>

      <section className="section" id="about">
        <div className="section__inner">
          <h2>About Blue Harvesters</h2>
          <p>
            We build tools to help homes and communities conserve water by making
            rainwater harvesting easy to understand and plan for.
          </p>
        </div>
      </section>
    </main>
  );
}

export default Home;
