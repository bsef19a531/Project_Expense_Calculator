import React from 'react';
import './AboutUs.css';

const AboutPage = () => {
    return (
        <div className="about-page">
            <header className="about-header">
                <h1>About Project Expense Calculator</h1>
                <p>Your ultimate tool for tracking project expenses efficiently and accurately.</p>
            </header>

            <h2>Features</h2>
            <section className="features-section">
                <div className="features-grid">
                    <div className="feature-card">
                        <h3>Track Expenses</h3>
                        <p>Easily track all your project expenses in one place.</p>
                    </div>
                    <div className="feature-card">
                        <h3>Categorize Expenses</h3>
                        <p>Organize expenses by category or Payees for better management.</p>
                    </div>
                    <div className="feature-card">
                        <h3>Generate Reports</h3>
                        <p>Generate detailed reports to analyze your expenses.</p>
                    </div>
                    <div className="feature-card">
                        <h3>Multi-Project Support</h3>
                        <p>Manage expenses across multiple projects seamlessly.</p>
                    </div>
                </div>
            </section>

            <h2>How It Works</h2>
            <section className="how-it-works-section">
                <ol>
                    <li>Add your project details.</li>
                    <li>Start adding Payees and categorgies for expenses.</li>
                    <li>Add expenses for your project.</li>
                    <li>Review stats to keep track of your spending.</li>
                    <li>Export your reports in csv and pdf format.</li>
                </ol>
            </section>

            <h2>Screenshots</h2>
            <section className="screenshots-section">
                <div className="screenshots-grid">
                    {/* Add screenshot images here */}
                    <img src="screenshot1.png" alt="Screenshot 1" />
                    <img src="screenshot2.png" alt="Screenshot 2" />
                    <img src="screenshot3.png" alt="Screenshot 3" />
                </div>
            </section>

            <h2>About the Team</h2>
            <section className="team-section">
                <div className="team-grid">
                    <div className="team-card">
                        <img src="" alt="Team Member 1" />
                        <h3>Mohammad Abdullah Abid</h3>
                        <p>Lead Developer</p>
                    </div>
                </div>
            </section>

            <h2>Contact Us</h2>
            <section className="contact-section">
                <p>If you have any questions or need support, feel free to contact us at <a href="mailto:abdullahabid1113@gmail.com">abdullahabid1113@gmail.com</a>.</p>
            </section>

            <section className="testimonials-section">
                <h2>User Testimonials</h2>
                <div className="testimonial">
                    <p>"This app has significantly simplified our expense tracking process!"</p>
                    <h4>- Alex Johnson</h4>
                </div>
            </section>

            <h2>FAQs</h2>
            <section className="faqs-section">

                <div className="faq">
                    <h3>How do I add a new expense?</h3>
                    <p>You can add a new expense by clicking on the 'Add Expense' button on the dashboard.</p>
                </div>
                <div className="faq">
                    <h3>Can I track multiple projects?</h3>
                    <p>Yes, you can manage multiple projects within the app.</p>
                </div>
                <div className="faq">
                    <h3>Is this application free to use?</h3>
                    <p>Yes this application is 100% free to use.</p>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
