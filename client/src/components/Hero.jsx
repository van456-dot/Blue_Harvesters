import { useState } from 'react';
import { Link } from 'react-router-dom';
import heroImage from '../assets/heroImage.webp';
import MultiStepForm from './MultiStepForm';

function Hero({ showForm, onGetStarted, onCloseForm }) {
    return (
        <section
            id="hero"
            className="hero"
            style={{
                backgroundImage: `url(${heroImage})`,
            }}
        >
            <div className="hero__overlay" />
            <div className="hero__content">
                <h1>Calculate your water usage and rainwater tank balance from month to month</h1>
                <p>
                    The rainwater tank balance calculator calculates and charts your predicted monthly and annual tank levels based on your usage, collection area, and rainfall patterns. Use it to select a new tank size, troubleshoot your existing system, or adjust your water usage habits.
                </p>
                <div className="hero__actions">
                    <button onClick={onGetStarted}>
                        Get started
                    </button>
                    <Link
                        to="/how-it-works"
                        className="ghost"
                    >
                        How it works
                    </Link>
                </div>
            </div>

            {
                showForm && (
                    <MultiStepForm onClose={onCloseForm} />
                )
            }
        </section>
    );
}
export default Hero;