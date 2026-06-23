import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

function ContactForm() {

    const form = useRef();
    const [sending, setSending] = useState(false);

    const [snackbarText, setSnackbarText] = useState("");
    const [snackbarType, setSnackbarType] = useState("info");
    const [showSnackbar, setShowSnackbar] = useState(false);

    const showNotification = (message, type = "info") => {
        setSnackbarText(message);
        setSnackbarType(type);
        setShowSnackbar(true);
        window.setTimeout(() => setShowSnackbar(false), 3000);
    };

    const makeInvalid = (element) => {
        if (!element) return;
        element.classList.add("input-invalid");
        element.addEventListener(
            "animationend",
            () => element.classList.remove("input-invalid"),
            { once: true }
        );
    };

    const validateForm = () => {
        const name = form.current["user_name"];
        const email = form.current["user_email"];
        const message = form.current["message"];

        if (!name.value.trim()) {
            makeInvalid(name);
            showNotification("Please enter your name.", "error");
            return false;
        }

        if (!email.value.trim()) {
            makeInvalid(email);
            showNotification("Please enter your email.", "error");
            return false;
        }

        const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!validEmail.test(email.value)) {
            makeInvalid(email);
            showNotification("Please enter a valid email address.", "error");
            return false;
        }

        if (!message.value.trim()) {
            makeInvalid(message);
            showNotification("Please enter your message.", "error");
            return false;
        }

        return true;
    };

    const sendEmail = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setSending(true);
        try {
            await emailjs.sendForm(
                "service_qojawyh",
                "template_v1osbbs",
                form.current,
                "0ONt4KTHckn8IigtL"
            );

            showNotification("Message sent successfully!", "success");
            form.current.reset();
        } catch (error) {
            showNotification("Failed to send message. Please try again later.", "error");
        } finally {
            setSending(false);
        }
    };

    return (
        <section className="cont-section">

            <h1>Contact <span>Us</span></h1>
            <p>Have questions, suggestions, or feedback about JalVrishti? I would love to hear from you. Whether it is about the project, improvements, collaboration, or technology discussion, feel free to reach out.</p>
            <div className="content">
                <ul>
                    <li><a href="mailto:vansh27319@gmail.com" rel="noreferrer"><img src="./src/assets/icn-email.png" alt="" />Email</a></li>
                    <li><a href="https://www.linkedin.com/in/vansh-goel-743329307" target="_blank" rel="noreferrer"><img src="./src/assets/icn-linkedin.png" alt="" />LinkedIn</a></li>
                    <li><a href="https://www.github.com/van456-dot" target="_blank" rel="noreferrer"><img src="./src/assets/icn-github.png" alt="" />Github</a></li>
                </ul>

                <form ref={form} onSubmit={sendEmail} noValidate>
                    <input type="text" name="user_name" placeholder="Your Name" required />
                    <input type="email" name="user_email" placeholder="Your Email" required />
                    <input type="text" name="subject" placeholder="Subject" />
                    <textarea name="message" placeholder="Your Message" required></textarea>
                    <button type="submit" disabled={sending}>{sending ? "Sending..." : "Send Message"}</button>
                </form>
            </div>
            <div id="snackbar" className={showSnackbar ? "show" : ""} data-type={snackbarType}>
                {snackbarText}
            </div>
        </section>
    );
}
export default ContactForm;