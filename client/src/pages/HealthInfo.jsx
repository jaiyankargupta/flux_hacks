import React from 'react';

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
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-800 via-green-700 to-teal-600 bg-clip-text text-transparent mb-4">
                        General Health Information
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Your comprehensive guide to maintaining a healthy lifestyle and making informed health decisions
                    </p>
                </div>

                {/* Health Tips Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {healthTips.map((tip, index) => (
                        <div key={index} className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300">
                            <div className="mb-4">
                                <h3 className="text-lg font-bold text-gray-800 mb-2">{tip.category}</h3>
                                <h4 className="text-xl font-semibold text-blue-700 mb-3">{tip.title}</h4>
                                <p className="text-gray-600 mb-4">{tip.description}</p>
                            </div>
                            <ul className="space-y-2">
                                {tip.tips.map((item, tipIndex) => (
                                    <li key={tipIndex} className="flex items-start gap-2">
                                        <span className="text-green-500 mt-1">✓</span>
                                        <span className="text-gray-700 text-sm">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Emergency Information */}
                <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-8 mb-12 border border-red-200">
                    <h2 className="text-3xl font-bold text-red-800 mb-6 text-center">
                        🚨 Emergency Health Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {emergencyTips.map((emergency, index) => (
                            <div key={index} className="bg-white rounded-lg p-6 shadow-md">
                                <h3 className="text-lg font-bold text-red-700 mb-3">{emergency.title}</h3>
                                <div className="mb-4">
                                    <p className="text-sm font-medium text-gray-700 mb-2">Warning Signs:</p>
                                    <ul className="space-y-1">
                                        {emergency.symptoms.map((symptom, symptomIndex) => (
                                            <li key={symptomIndex} className="text-sm text-gray-600 flex items-center gap-2">
                                                <span className="text-red-500">•</span>
                                                {symptom}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="bg-red-100 p-3 rounded-lg">
                                    <p className="text-sm font-bold text-red-800">Action: {emergency.action}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Healthy Lifestyle Metrics */}
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8 mb-12">
                    <h2 className="text-3xl font-bold text-green-800 mb-8 text-center">
                        📊 Healthy Lifestyle Metrics
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white rounded-lg p-6 text-center shadow-md">
                            <div className="text-3xl mb-3">🚶‍♂️</div>
                            <h3 className="font-bold text-gray-800 mb-2">Daily Steps</h3>
                            <p className="text-2xl font-bold text-blue-600">10,000+</p>
                            <p className="text-sm text-gray-600">steps per day</p>
                        </div>
                        <div className="bg-white rounded-lg p-6 text-center shadow-md">
                            <div className="text-3xl mb-3">💧</div>
                            <h3 className="font-bold text-gray-800 mb-2">Water Intake</h3>
                            <p className="text-2xl font-bold text-cyan-600">8-10</p>
                            <p className="text-sm text-gray-600">glasses per day</p>
                        </div>
                        <div className="bg-white rounded-lg p-6 text-center shadow-md">
                            <div className="text-3xl mb-3">😴</div>
                            <h3 className="font-bold text-gray-800 mb-2">Sleep</h3>
                            <p className="text-2xl font-bold text-purple-600">7-9</p>
                            <p className="text-sm text-gray-600">hours per night</p>
                        </div>
                        <div className="bg-white rounded-lg p-6 text-center shadow-md">
                            <div className="text-3xl mb-3">🥗</div>
                            <h3 className="font-bold text-gray-800 mb-2">Fruits & Veggies</h3>
                            <p className="text-2xl font-bold text-green-600">5+</p>
                            <p className="text-sm text-gray-600">servings per day</p>
                        </div>
                    </div>
                </div>

                {/* Health Resources */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-white/50">
                    <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                        🔗 Helpful Health Resources
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                            <h3 className="font-bold text-blue-700 mb-2">WHO - World Health Organization</h3>
                            <p className="text-sm text-gray-600">Global health information and guidelines</p>
                        </div>
                        <div className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                            <h3 className="font-bold text-blue-700 mb-2">CDC - Centers for Disease Control</h3>
                            <p className="text-sm text-gray-600">Disease prevention and health promotion</p>
                        </div>
                        <div className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                            <h3 className="font-bold text-blue-700 mb-2">NIH - National Institutes of Health</h3>
                            <p className="text-sm text-gray-600">Medical research and health information</p>
                        </div>
                        <div className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                            <h3 className="font-bold text-blue-700 mb-2">American Heart Association</h3>
                            <p className="text-sm text-gray-600">Heart health and cardiovascular wellness</p>
                        </div>
                        <div className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                            <h3 className="font-bold text-blue-700 mb-2">Mental Health America</h3>
                            <p className="text-sm text-gray-600">Mental health resources and support</p>
                        </div>
                        <div className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                            <h3 className="font-bold text-blue-700 mb-2">Nutrition.gov</h3>
                            <p className="text-sm text-gray-600">Evidence-based nutrition information</p>
                        </div>
                    </div>
                </div>

                {/* Disclaimer */}
                <div className="mt-12 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                    <div className="flex items-start gap-3">
                        <span className="text-yellow-600 text-xl">⚠️</span>
                        <div>
                            <h3 className="font-bold text-yellow-800 mb-2">Important Disclaimer</h3>
                            <p className="text-sm text-yellow-700">
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