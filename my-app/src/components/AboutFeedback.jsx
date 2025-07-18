import React from "react";

const AboutFeedback = () => {
    return (
        <section className="about-feedback">
            <div className="about-section">
                <h2>About Us</h2>
                <p>
                At 'Gardening solutions', we believe that a beautiful, thriving garden starts with the right care, tools, and expertise. Whether you're a seasoned gardener or just beginning your green journey, we provide innovative gardening solutions to help you cultivate the perfect outdoor space.

           Our passion for gardening goes beyond just plants—we aim to create sustainable, eco-friendly, and aesthetically pleasing green spaces for homes, offices, and communities. From expert tips and high-quality gardening tools to landscaping services and organic solutions, we have everything you need to nurture nature
                </p>
                <br />
                <p>Would you like me to tailor it further for a specific audience or service type (e.g., urban gardening, landscaping, organic farming)? 😊</p>
            </div>
            <div className="feedback-section">
                <h2>Feedback</h2>
                <form>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" placeholder="Your Name" required />
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" placeholder="Your Email" required />
                    <label htmlFor="message">Message:</label>
                    <textarea id="message" placeholder="Your feedback..." required></textarea>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </section>
    );
};

export default AboutFeedback;