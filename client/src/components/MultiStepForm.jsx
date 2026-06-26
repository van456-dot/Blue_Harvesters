import { useState } from "react";
import { useNavigate } from "react-router-dom";
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>

function MultiStepForm({ onClose }) {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        country: 'india',
        postcode: '',
        roofArea: '',
        people: '',
        tankVol: '',
        roofType: ''
    });

    const [invalidField, setInvalidField] = useState('');
    const [isFading, setIsFading] = useState(false);

    const steps = [
        {
            label: 'Location',
            title: 'Find your rainwater potential',
            subtitle: 'Enter your country and postcode so we can estimate local rainfall for your home.'
        },
        {
            label: 'Roof Details',
            title: 'Roof area',
            subtitle: 'Tell us the size of your rooftop in square meters.'
        },
        {
            label: 'Household',
            title: 'Household size',
            subtitle: 'How many people live in your home today?'
        },
        {
            label: 'Storage',
            title: 'Tank capacity',
            subtitle: 'What is the total volume of your storage tank in liters?'
        },
        {
            label: 'Roof Type',
            title: 'Roof material',
            subtitle: 'Choose the roof type that matches your house.'
        }
    ];

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
        if (step === 5) {
            if (!formData.roofType.trim() || String(formData.roofType).length === 0) {
                setInvalidField('roofType');
                return false;
            }
        }

        setInvalidField('');
        return true;
    };
    const navigate = useNavigate();

    const submitForm = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/calculate`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...formData,
                    country: formData.country.toLowerCase()
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Request failed");
            }

            console.log("Result:", data);

            if (response.ok) {
                navigate("/result", {
                    state: data
                });
            }
            onClose();

        } catch (error) {
            console.error("Error:", error.message);
            alert(error.message || "Server not reachable");
        }
    };

    const handleNext = () => {
        if (!validateStep()) return;

        setIsFading(true);
        setTimeout(() => {
            if (step < 5) {
                setStep(step + 1);
            } else {
                // Submit form data to Express backend
                submitForm();
            }
            setIsFading(false);
        }, 500);
    };

    return (
        <div className="form-overlay">
            <div className="form-box">
                <button onClick={onClose} className="close">
                    X
                </button>

                <div className="step-header">
                    <p className="step-label">{steps[step - 1].label}</p>
                    <h2>{steps[step - 1].title}</h2>
                    <p className="step-subtitle">{steps[step - 1].subtitle}</p>
                </div>

                {step === 1 &&
                    <div className={`step fade-transition ${isFading ? 'fade-out' : 'fade-in'}`}>
                        <form className="form" onSubmit={(e) => e.preventDefault()}>
                            <div className="form-field">
                                <label htmlFor="Country">Country</label>
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

                            <div className="form-field">
                                <label htmlFor="postcode">Postcode</label>
                                <input
                                    className={invalidField === 'postcode' ? 'input-invalid' : ''}
                                    value={formData.postcode}
                                    onChange={handleChange('postcode')}
                                    type="text"
                                    name="postcode"
                                    id="postcode"
                                    placeholder="Enter your postcode"
                                />
                            </div>
                        </form>
                    </div>
                }

                {step === 2 &&
                    <div className={`step fade-transition ${isFading ? 'fade-out' : 'fade-in'}`}>
                        <form className="form" onSubmit={(e) => e.preventDefault()}>
                            <div className="form-field">
                                <label htmlFor="roof-area">Roof area (m²)</label>
                                <input
                                    className={invalidField === 'roofArea' ? 'input-invalid' : ''}
                                    type="number"
                                    name="roof-area"
                                    id="roof-area"
                                    min="1"
                                    value={formData.roofArea}
                                    onChange={handleChange('roofArea')}
                                    placeholder="Enter roof area"
                                />
                            </div>
                        </form>
                    </div>
                }

                {step === 3 &&
                    <div className={`step fade-transition ${isFading ? 'fade-out' : 'fade-in'}`}>
                        <form className="form" onSubmit={(e) => e.preventDefault()}>
                            <div className="form-field">
                                <label htmlFor="people">Household members</label>
                                <input
                                    className={invalidField === 'people' ? 'input-invalid' : ''}
                                    required
                                    type="number"
                                    name="people"
                                    id="people"
                                    min={1}
                                    value={formData.people}
                                    onChange={handleChange('people')}
                                    placeholder="Enter number of people"
                                />
                            </div>
                        </form>
                    </div>
                }

                {step === 4 &&
                    <div className={`step fade-transition ${isFading ? 'fade-out' : 'fade-in'}`}>
                        <form className="form" onSubmit={(e) => e.preventDefault()}>
                            <div className="form-field">
                                <label htmlFor="tank-vol">Tank volume (L)</label>
                                <input
                                    className={invalidField === 'tankVol' ? 'input-invalid' : ''}
                                    required
                                    type="number"
                                    name="tank-vol"
                                    id="tank-vol"
                                    min="1"
                                    value={formData.tankVol}
                                    onChange={handleChange('tankVol')}
                                    placeholder="Enter tank capacity"
                                />
                            </div>
                        </form>
                    </div>
                }

                {step === 5 &&
                    <div className={`step fade-transition ${isFading ? 'fade-out' : 'fade-in'}`}>
                        <div className="roofTypeForm">

                            <div className="roofType">
                                <label htmlFor="Concrete">Concrete</label>
                                <input
                                    type="radio"
                                    id="Concrete"
                                    name="roofType"
                                    value="concrete"
                                    checked={formData.roofType === 'concrete'}
                                    onChange={handleChange('roofType')}
                                />
                            </div>

                            <div className="roofType">
                                <label htmlFor="metal">Metal Sheet</label>
                                <input
                                    type="radio"
                                    id="metal"
                                    name="roofType"
                                    value="metal"
                                    checked={formData.roofType === 'metal'}
                                    onChange={handleChange('roofType')}
                                />
                            </div>

                            <div className="roofType">
                                <label htmlFor="tiles">Tile</label>
                                <input
                                    type="radio"
                                    id="tiles"
                                    name="roofType"
                                    value="tiles"
                                    checked={formData.roofType === 'tiles'}
                                    onChange={handleChange('roofType')}
                                />
                            </div>

                            <div className="roofType">
                                <label htmlFor="Mud">Mud</label>
                                <input
                                    type="radio"
                                    id="Mud"
                                    name="roofType"
                                    value="mud"
                                    checked={formData.roofType === 'mud'}
                                    onChange={handleChange('roofType')}
                                />
                            </div>
                        </div>
                    </div>
                }

                <div className={`form-actions fade-transition ${isFading ? 'fade-out' : 'fade-in'}`} style={{ position: 'absolute', bottom: '1.75em', left: '50%', transform: 'translateX(-50%)' }}>
                    <div className="steps">

                        {step > 1 && (
                            <button onClick={() => setStep(step - 1)}>
                                Back
                            </button>
                        )}

                        {step < 5 ? (
                            <button type="button" onClick={handleNext}>
                                Next
                            </button>
                        ) : (
                            <button type="button" className="buttonload" onClick={handleNext}>
                                <i className="fa fa-spinner fa-spin"></i>
                                Submit
                            </button>
                        )}
                    </div>

                </div>

            </div>

        </div >
    );
}
export default MultiStepForm;