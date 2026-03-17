import { useEffect, useState } from "react";

function Home() {
  const [bgImage, setBgImage] = useState("");

  const images = [
    "https://rh-tools.s3.ap-southeast-2.amazonaws.com/images/mbt-landing-new.jpg",
    "https://media.istockphoto.com/id/1289937464/photo/water-drains-from-the-drain-pipe-into-a-metal-container.jpg",
    "https://media.istockphoto.com/id/1146707351/photo/rain-is-falling-in-a-wooden-barrel-full-of-water-in-the-garden.jpg",
    "https://media.istockphoto.com/id/848786726/photo/rain-flows-down-from-a-roof-down.jpg"
  ];

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * images.length);
    setBgImage(images[randomIndex]);
  }, []);

  return (
    <main
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      <h2>
        Calculate your water usage and rainwater tank balance from month to month
      </h2>

      <div className="idea">
        The rainwater tank balance calculator calculates and charts your predicted
        monthly and annual tank levels based on your usage.
      </div>

      <button>GET STARTED</button>

      <div className="logo">
        <div className="title">JalVrishti</div>
        <div className="team">by BlueHarvesters</div>
      </div>
    </main>
  );
}

export default Home;