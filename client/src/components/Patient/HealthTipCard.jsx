const HealthTipCard = ({ healthTip }) => {
    const getCategoryIcon = (category) => {
        const icons = {
            nutrition: '🥗',
            exercise: '🏃',
            'mental-health': '🧠',
            sleep: '😴',
            general: '💡',
            'covid-19': '🦠',
            seasonal: '🍂',
        };
        return icons[category] || '💡';
    };

    const getCategoryColor = (category) => {
        const colors = {
            nutrition: 'from-green-500 to-emerald-500',
            exercise: 'from-orange-500 to-red-500',
            'mental-health': 'from-purple-500 to-indigo-500',
            sleep: 'from-blue-500 to-cyan-500',
            general: 'from-yellow-500 to-orange-500',
            'covid-19': 'from-red-500 to-pink-500',
            seasonal: 'from-amber-500 to-orange-500',
        };
        return colors[category] || 'from-primary-500 to-primary-600';
    };

    if (!healthTip) {
        return (
            <div className="card animate-in">
                <h2 className="card-header">Health Tip of the Day</h2>
                <div className="text-center py-8">
                    <div className="text-6xl mb-4">💡</div>
                    <p className="text-gray-600">No health tip available</p>
                </div>
            </div>
        );
    }

    return (
        <div className="card animate-in bg-gradient-to-br from-primary-50 to-white border-2 border-primary-100">
            <div className="flex items-center space-x-3 mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${getCategoryColor(healthTip.category)} rounded-lg flex items-center justify-center text-2xl`}>
                    {getCategoryIcon(healthTip.category)}
                </div>
                <div>
                    <h2 className="text-lg font-semibold text-gray-800">Health Tip of the Day</h2>
                    <p className="text-xs text-gray-500 capitalize">{healthTip.category.replace('-', ' ')}</p>
                </div>
            </div>

            <h3 className="font-semibold text-gray-900 mb-2">{healthTip.title}</h3>
            <p className="text-gray-700 leading-relaxed">{healthTip.content}</p>

            <div className="mt-4 pt-4 border-t border-primary-100">
                <p className="text-xs text-gray-500 italic">
                    💡 Tip: Consistency is key to achieving your health goals!
                </p>
            </div>
        </div>
    );
};

export default HealthTipCard;
