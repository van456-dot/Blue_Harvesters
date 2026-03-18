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
          <h2>Rainwater calculator (coming soon)</h2>
          <p>
            This section will let you input your roof size, rainfall, and water
            usage to see how much water you can store.
          </p>
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
