import React from 'react';
import '../styles/HealthInfo.css';

const HealthInfo = () => {
    const healthTips = [
        {
            category: "🏃‍♂️ Physical Activity",
            title: "Stay Active Daily",
            description: "Aim for at least 150 minutes of moderate-intensity exercise per week.",
            tips: [
                "Take a 30-minute brisk walk daily",
                "Use stairs instead of elevators",
                "Try strength training exercises twice a week",
                "Join a sports club or fitness class"
            ]
        },
        {
            category: "🥗 Nutrition",
            title: "Eat a Balanced Diet",
            description: "Include a variety of fruits, vegetables, whole grains, and lean proteins.",
            tips: [
                "Fill half your plate with fruits and vegetables",
                "Choose whole grains over refined grains",
                "Include lean proteins like fish, poultry, and legumes",
                "Limit processed foods and added sugars"
            ]
        },
        {
            category: "💧 Hydration",
            title: "Stay Hydrated",
            description: "Drink adequate water throughout the day for optimal body function.",
            tips: [
                "Aim for 8-10 glasses of water daily",
                "Start your day with a glass of water",
                "Keep a water bottle with you",
                "Eat water-rich foods like cucumbers and watermelon"
            ]
        },
        {
            category: "😴 Sleep",
            title: "Get Quality Sleep",
            description: "Adults need 7-9 hours of quality sleep per night for optimal health.",
            tips: [
                "Maintain a consistent sleep schedule",
                "Create a relaxing bedtime routine",
                "Keep your bedroom cool, dark, and quiet",
                "Avoid screens 1 hour before bedtime"
            ]
        },
        {
            category: "🧘‍♀️ Mental Health",
            title: "Manage Stress",
            description: "Practice stress management techniques for better mental well-being.",
            tips: [
                "Practice meditation or deep breathing",
                "Exercise regularly to reduce stress",
                "Connect with friends and family",
                "Consider counseling or therapy when needed"
            ]
        },
        {
            category: "🩺 Preventive Care",
            title: "Regular Health Checkups",
            description: "Stay proactive about your health with regular medical screenings.",
            tips: [
                "Schedule annual physical exams",
                "Keep up with recommended vaccinations",
                "Get regular dental and eye checkups",
                "Know your family medical history"
            ]
        }
    ];

    const emergencyTips = [
        {
            title: "Heart Attack Signs",
            symptoms: ["Chest pain or discomfort", "Shortness of breath", "Pain in arms, back, neck, jaw", "Nausea or lightheadedness"],
            action: "Call emergency services immediately (911)"
        },
        {
            title: "Stroke Signs (F.A.S.T.)",
            symptoms: ["Face drooping", "Arm weakness", "Speech difficulty", "Time to call emergency"],
            action: "Seek immediate medical attention"
        },
        {
            title: "Severe Allergic Reaction",
            symptoms: ["Difficulty breathing", "Swelling of face/throat", "Rapid pulse", "Severe whole-body reaction"],
            action: "Use epinephrine if available and call 911"
        }
    ];

    return (
        <div className="health-info-container">
            <div className="health-info-wrapper">
                {/* Header */}
                <div className="health-info-header">
                    <h1 className="main-title">
                        General Health Information
                    </h1>
                    <p className="subtitle">
                        Your comprehensive guide to maintaining a healthy lifestyle and making informed health decisions
                    </p>
                </div>

                {/* Health Tips Grid */}
                <div className="health-tips-grid">
                    {healthTips.map((tip, index) => (
                        <div key={index} className="health-tip-card">
                            <div className="tip-header">
                                <h3 className="tip-category">{tip.category}</h3>
                                <h4 className="tip-title">{tip.title}</h4>
                                <p className="tip-description">{tip.description}</p>
                            </div>
                            <ul className="tip-list">
                                {tip.tips.map((item, tipIndex) => (
                                    <li key={tipIndex} className="tip-item">
                                        <span className="tip-checkmark">✓</span>
                                        <span className="tip-text">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Emergency Information */}
                <div className="emergency-section">
                    <h2 className="emergency-title">
                        🚨 Emergency Health Information
                    </h2>
                    <div className="emergency-grid">
                        {emergencyTips.map((emergency, index) => (
                            <div key={index} className="emergency-card">
                                <h3 className="emergency-card-title">{emergency.title}</h3>
                                <div>
                                    <p className="symptoms-label">Warning Signs:</p>
                                    <ul className="symptoms-list">
                                        {emergency.symptoms.map((symptom, symptomIndex) => (
                                            <li key={symptomIndex} className="symptom-item">
                                                <span className="symptom-bullet">•</span>
                                                {symptom}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="action-alert">
                                    <p className="action-text">Action: {emergency.action}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Healthy Lifestyle Metrics */}
                <div className="metrics-section">
                    <h2 className="metrics-title">
                        📊 Healthy Lifestyle Metrics
                    </h2>
                    <div className="metrics-grid">
                        <div className="metric-card">
                            <div className="metric-icon">🚶‍♂️</div>
                            <h3 className="metric-label">Daily Steps</h3>
                            <p className="metric-value">10,000+</p>
                            <p className="metric-unit">steps per day</p>
                        </div>
                        <div className="metric-card">
                            <div className="metric-icon">💧</div>
                            <h3 className="metric-label">Water Intake</h3>
                            <p className="metric-value">8-10</p>
                            <p className="metric-unit">glasses per day</p>
                        </div>
                        <div className="metric-card">
                            <div className="metric-icon">😴</div>
                            <h3 className="metric-label">Sleep</h3>
                            <p className="metric-value">7-9</p>
                            <p className="metric-unit">hours per night</p>
                        </div>
                        <div className="metric-card">
                            <div className="metric-icon">🥗</div>
                            <h3 className="metric-label">Fruits & Veggies</h3>
                            <p className="metric-value">5+</p>
                            <p className="metric-unit">servings per day</p>
                        </div>
                    </div>
                </div>

                {/* Health Resources */}
                <div className="resources-section">
                    <h2 className="resources-title">
                        🔗 Helpful Health Resources
                    </h2>
                    <div className="resources-grid">
                        <div className="resource-card">
                            <h3 className="resource-title">WHO - World Health Organization</h3>
                            <p className="resource-description">Global health information and guidelines</p>
                        </div>
                        <div className="resource-card">
                            <h3 className="resource-title">CDC - Centers for Disease Control</h3>
                            <p className="resource-description">Disease prevention and health promotion</p>
                        </div>
                        <div className="resource-card">
                            <h3 className="resource-title">NIH - National Institutes of Health</h3>
                            <p className="resource-description">Medical research and health information</p>
                        </div>
                        <div className="resource-card">
                            <h3 className="resource-title">American Heart Association</h3>
                            <p className="resource-description">Heart health and cardiovascular wellness</p>
                        </div>
                        <div className="resource-card">
                            <h3 className="resource-title">Mental Health America</h3>
                            <p className="resource-description">Mental health resources and support</p>
                        </div>
                        <div className="resource-card">
                            <h3 className="resource-title">Nutrition.gov</h3>
                            <p className="resource-description">Evidence-based nutrition information</p>
                        </div>
                    </div>
                </div>

                {/* Disclaimer */}
                <div className="disclaimer-section">
                    <div className="disclaimer-content">
                        <span className="disclaimer-icon">⚠️</span>
                        <div className="disclaimer-text">
                            <h3 className="disclaimer-title">Important Disclaimer</h3>
                            <p className="disclaimer-description">
                                This information is for educational purposes only and should not replace professional medical advice. 
                                Always consult with healthcare professionals for personalized medical guidance and treatment decisions.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HealthInfo;