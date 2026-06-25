import { Link } from 'react-router-dom';
import MultiStepForm from './MultiStepForm';


function Hero({ showForm, onGetStarted, onCloseForm }) {


    const features = [
        {
            title:"Accurate Estimation",
            text:"Uses rainfall data and roof details to estimate yearly water collection."
        },
        {
            title:"Personalized Results",
            text:"Calculates water demand based on your location and household size."
        },
        {
            title:"Smart Recommendations",
            text:"Suggests storage tanks, recharge pits or trenches."
        },
        {
            title:"Sustainable Impact",
            text:"Understand savings and reduce dependency on external water."
        }
    ];


    return (

        <section
        className="hero"
        style={{
            backgroundImage:`url("/images/heroImage.png")`
        }}
        >

        <div className="hero__overlay"></div>


        <div className="hero__content">


            <div className="hero__text">


                <p className="hero__tag">
                    Smart Rainwater Harvesting System
                </p>


                <h1>
                    Every Drop Counts.
                    <br/>

                    <span>
                    Harvest Today,
                    </span>

                    <br/>

                    Secure Tomorrow.
                </h1>



                <p>
                    JalVrishti helps you analyze rooftop rainfall,
                    calculate harvesting potential and find the
                    most suitable water conservation solution.
                </p>



                <div className="hero__actions">

                    <button onClick={onGetStarted}>
                        Get Started
                    </button>


                    <Link
                    to="/learn"
                    className="ghost"
                    >
                        How it Works
                    </Link>

                </div>




                <div className="hero__features">


                {
                    features.map((item,index)=>(

                    <div
                    className="feature-card"
                    key={index}
                    >

                    <h3>
                    {item.title}
                    </h3>


                    <p>
                    {item.text}
                    </p>


                    </div>

                    ))
                }


                </div>



            </div>


        </div>



        {
            showForm &&
            <MultiStepForm onClose={onCloseForm}/>
        }


        </section>

    )

}


export default Hero;