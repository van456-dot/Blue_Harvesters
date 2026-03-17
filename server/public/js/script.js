function toggleMenu() {
    document.querySelector(".navlist").classList.toggle("active");
} //navlist active karne ke liye nahi aa raha tha chatgpt se paste kiya!!

const images = ["https://rh-tools.s3.ap-southeast-2.amazonaws.com/images/mbt-landing-new.jpg","https://media.istockphoto.com/id/1289937464/photo/water-drains-from-the-drain-pipe-into-a-metal-container.jpg?s=612x612&w=0&k=20&c=cBglBWKzscjeMm3j2WmPZXzwWfy6vy3sHIEWxOs802U=", "https://media.istockphoto.com/id/1146707351/photo/rain-is-falling-in-a-wooden-barrel-full-of-water-in-the-garden.jpg?s=612x612&w=0&k=20&c=EB8EPzlMfjHWLRqo-khYlz2YVp-nRKMqI_tm-SmCw7s=", "https://media.istockphoto.com/id/848786726/photo/rain-flows-down-from-a-roof-down.jpg?s=612x612&w=0&k=20&c=BbcJ-e8GeB5DcLYrsZvQymxVnTpernCPiHhSL8KGrvg="]

function setRandomBackground() {
  const main = document.querySelector('body main');
  if (main) {
    const randomIndex = Math.floor(Math.random() * images.length);
    main.style.backgroundImage = `url('${images[randomIndex]}')`;
    main.style.backgroundSize = 'cover';
    main.style.backgroundPosition = 'center';
  }
}

setRandomBackground();

//mujhe ye accha laga ki images alag alag show honi chahiye har reload par!!
