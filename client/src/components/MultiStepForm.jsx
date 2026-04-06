import { useState } from "react";
import Hero from "./Hero";

function MultiStepForm({ onClose }) {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        country: 'india',
        postcode: '',
        roofArea: '',
        people: '',
        tankVol: ''
    });

    const [invalidField, setInvalidField] = useState('');
    const [isFading, setIsFading] = useState(false);

    const handleChange = (field) => (event) => {
        setFormData((prev) => ({ ...prev, [field]: event.target.value }));
        if (invalidField === field) setInvalidField('');
    };

    const validateStep = () => {
        if (step === 1) {
            if (!formData.country.trim()) {
                setInvalidField('country');
                return false;
            }
            if (!formData.postcode.trim()) {
                setInvalidField('postcode');
                return false;
            }
        }
        if (step === 2) {
            if (!formData.roofArea.trim() || Number(formData.roofArea) <= 0) {
                setInvalidField('roofArea');
                return false;
            }
        }
        if (step === 3) {
            if (!formData.people.trim() || Number(formData.people) <= 0) {
                setInvalidField('people');
                return false;
            }
        }
        if (step === 4) {
            if (!formData.tankVol.trim() || Number(formData.tankVol) <= 0) {
                setInvalidField('tankVol');
                return false;
            }
        }

        setInvalidField('');
        return true;
    };

    const handleNext = () => {
        if (!validateStep()) return;

        setIsFading(true);
        setTimeout(() => {
            if (step < 4) {
                setStep(step + 1);
            } else {
                alert('Submit logic here');
            }
            setIsFading(false);
        }, 500);
    };

    const handleIDontKnow = () => {
        setIsFading(true);
        setTimeout(() => {
            setFormData((prev) => ({ ...prev, roofArea: '' }));
            setInvalidField('');
            setStep(3);
            setIsFading(false);
        }, 500);
    };

    return (
        <div className="form-overlay">
            <div className="form-box">
                <button onClick={onClose} className="close">
                    X
                </button>

                {step === 1 &&
                    <div className={`step fade-transition ${isFading ? 'fade-out' : 'fade-in'}`}>
                        Please select your country and enter your postcode
                        <form className="form" onSubmit={(e) => e.preventDefault()}>

                            <div className="Country">
                                <select
                                    className={invalidField === 'country' ? 'input-invalid' : ''}
                                    value={formData.country}
                                    onChange={handleChange('country')}
                                    name="country"
                                    id="Country"
                                >
                                    <option value="india">India</option>
                                    <option value="australia">Australia</option>
                                    <option value="new zealand">New Zealand</option>
                                    <option value="united states">United States</option>
                                    <option value="south africa">South Africa</option>
                                </select>
                            </div>

                            <div className="Postcode">
                                <input
                                    className={invalidField === 'postcode' ? 'input-invalid' : ''}
                                    value={formData.postcode}
                                    onChange={handleChange('postcode')}
                                    type="text"
                                    name="postcode"
                                    placeholder="Enter Postcode"
                                />
                            </div>

                        </form>
                    </div>
                }

                {step === 2 &&
                    <div className={`step fade-transition ${isFading ? 'fade-out' : 'fade-in'}`}>
                        <div>
                            What's your roof area?(m<sup>2</sup>)
                            <form className="form" onSubmit={(e) => e.preventDefault()}>
                                <div className="roof-area">
                                    <input
                                        className={invalidField === 'roofArea' ? 'input-invalid' : ''}
                                        type="number"
                                        name="roof-area"
                                        min="1"
                                        value={formData.roofArea}
                                        onChange={handleChange('roofArea')}
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                }

                {step === 3 &&
                    <div className={`step fade-transition ${isFading ? 'fade-out' : 'fade-in'}`}>
                        How many people live in your household?
                        <form className="form" onSubmit={(e) => e.preventDefault()}>
                            <div className="people">
                                <input
                                    className={invalidField === 'people' ? 'input-invalid' : ''}
                                    required
                                    type="number"
                                    name="people"
                                    min={1}
                                    value={formData.people}
                                    onChange={handleChange('people')}
                                />
                            </div>
                        </form>
                    </div>
                }


                {step === 4 &&
                    <div className={`step fade-transition ${isFading ? 'fade-out' : 'fade-in'}`}>
                        What is the total volume of your tank?
                        <form className="form" onSubmit={(e) => e.preventDefault()}>
                            <div className="tank-vol">
                                <input
                                    className={invalidField === 'tankVol' ? 'input-invalid' : ''}
                                    required
                                    type="number"
                                    name="tank-vol"
                                    min="1"
                                    value={formData.tankVol}
                                    onChange={handleChange('tankVol')}
                                />
                            </div>
                        </form>
                    </div>
                }

                <div className={`form-actions fade-transition ${isFading ? 'fade-out' : 'fade-in'}`} style={{ position: 'absolute', bottom: '1.75em', left: '50%', transform: 'translateX(-50%)' }}>
                    <div className="steps">

                        {step > 1 && (
                            <button onClick={() => setStep(step - 1)}>
                                Back
                            </button>
                        )}

                        {step < 4 ? (
                            <button type="button" onClick={handleNext}>
                                Next
                            </button>
                        ) : (
                            <button type="button" onClick={handleNext}>
                                Submit
                            </button>
                        )}
                    </div>

                    {step === 2 && (
                        <button className="btn idontknow-btn" onClick={handleIDontKnow}>
                            I don't know
                        </button>
                    )}

                </div>

            </div>

        </div >
    );
}
export default MultiStepForm;