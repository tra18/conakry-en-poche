import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Eye, 
  Phone, 
  MapPin, 
  Star, 
  Calendar,
  Download,
  Filter
} from 'lucide-react';

const BusinessAnalytics = ({ businessId }) => {
  const [analytics, setAnalytics] = useState(null);
  const [timeRange, setTimeRange] = useState('7d');
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, [businessId, timeRange]);

  const fetchAnalytics = async () => {
    setIsLoading(true);
    
    // Mock analytics data
    setTimeout(() => {
      const mockData = {
        overview: {
          totalViews: 1247,
          totalCalls: 89,
          totalBookings: 23,
          averageRating: 4.6,
          totalReviews: 45
        },
        views: {
          today: 23,
          yesterday: 45,
          thisWeek: 156,
          lastWeek: 134,
          thisMonth: 567,
          lastMonth: 489
        },
        calls: {
          today: 2,
          yesterday: 5,
          thisWeek: 12,
          lastWeek: 8,
          thisMonth: 34,
          lastMonth: 28
        },
        bookings: {
          today: 1,
          yesterday: 2,
          thisWeek: 5,
          lastWeek: 3,
          thisMonth: 12,
          lastMonth: 9
        },
        reviews: [
          {
            id: 1,
            rating: 5,
            comment: "Excellent service, je recommande !",
            date: "2024-01-15",
            customer: "A*** M***"
          },
          {
            id: 2,
            rating: 4,
            comment: "Très bon, juste un peu cher",
            date: "2024-01-14",
            customer: "K*** D***"
          }
        ],
        popularHours: [
          { hour: "09:00", views: 45 },
          { hour: "10:00", views: 67 },
          { hour: "11:00", views: 89 },
          { hour: "12:00", views: 123 },
          { hour: "13:00", views: 98 },
          { hour: "14:00", views: 76 },
          { hour: "15:00", views: 54 },
          { hour: "16:00", views: 43 },
          { hour: "17:00", views: 38 },
          { hour: "18:00", views: 29 }
        ],
        demographics: {
          ageGroups: [
            { group: "18-25", percentage: 25 },
            { group: "26-35", percentage: 40 },
            { group: "36-45", percentage: 20 },
            { group: "46-55", percentage: 10 },
            { group: "55+", percentage: 5 }
          ],
          gender: {
            male: 55,
            female: 45
          }
        }
      };
      
      setAnalytics(mockData);
      setIsLoading(false);
    }, 1000);
  };

  const getTimeRangeLabel = (range) => {
    const labels = {
      '1d': 'Aujourd\'hui',
      '7d': '7 derniers jours',
      '30d': '30 derniers jours',
      '90d': '3 derniers mois'
    };
    return labels[range] || range;
  };

  const getPercentageChange = (current, previous) => {
    if (previous === 0) return 100;
    return ((current - previous) / previous * 100).toFixed(1);
  };

  const exportData = () => {
    // Mock export functionality
    const dataStr = JSON.stringify(analytics, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `analytics-${businessId}-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-white/30 border-t-white"></div>
        <span className="ml-3 text-white/70">Chargement des analytics...</span>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="text-center py-12">
        <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <p className="text-white/70">Aucune donnée disponible</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white flex items-center">
          <BarChart3 className="w-8 h-8 mr-3 text-blue-400" />
          Analytics
        </h2>
        <div className="flex items-center space-x-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-blue-500"
          >
            <option value="1d">Aujourd'hui</option>
            <option value="7d">7 jours</option>
            <option value="30d">30 jours</option>
            <option value="90d">3 mois</option>
          </select>
          <button
            onClick={exportData}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-xl text-blue-400 hover:bg-blue-500/30 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Exporter</span>
          </button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <Eye className="w-8 h-8 text-blue-400" />
            <TrendingUp className="w-5 h-5 text-green-400" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">
            {analytics.overview.totalViews.toLocaleString()}
          </h3>
          <p className="text-white/70 text-sm">Vues totales</p>
          <p className="text-green-400 text-xs mt-2">
            +{getPercentageChange(analytics.views.thisWeek, analytics.views.lastWeek)}% cette semaine
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <Phone className="w-8 h-8 text-green-400" />
            <TrendingUp className="w-5 h-5 text-green-400" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">
            {analytics.overview.totalCalls}
          </h3>
          <p className="text-white/70 text-sm">Appels</p>
          <p className="text-green-400 text-xs mt-2">
            +{getPercentageChange(analytics.calls.thisWeek, analytics.calls.lastWeek)}% cette semaine
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <Calendar className="w-8 h-8 text-purple-400" />
            <TrendingUp className="w-5 h-5 text-green-400" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">
            {analytics.overview.totalBookings}
          </h3>
          <p className="text-white/70 text-sm">Réservations</p>
          <p className="text-green-400 text-xs mt-2">
            +{getPercentageChange(analytics.bookings.thisWeek, analytics.bookings.lastWeek)}% cette semaine
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <Star className="w-8 h-8 text-yellow-400" />
            <TrendingUp className="w-5 h-5 text-green-400" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">
            {analytics.overview.averageRating}
          </h3>
          <p className="text-white/70 text-sm">Note moyenne</p>
          <p className="text-white/60 text-xs mt-2">
            {analytics.overview.totalReviews} avis
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <Users className="w-8 h-8 text-pink-400" />
            <TrendingUp className="w-5 h-5 text-green-400" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">
            {((analytics.overview.totalCalls / analytics.overview.totalViews) * 100).toFixed(1)}%
          </h3>
          <p className="text-white/70 text-sm">Taux de conversion</p>
          <p className="text-green-400 text-xs mt-2">
            Vues vers appels
          </p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Popular Hours Chart */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
          <h3 className="text-lg font-semibold text-white mb-4">Heures populaires</h3>
          <div className="space-y-3">
            {analytics.popularHours.map((item, index) => (
              <div key={index} className="flex items-center space-x-3">
                <span className="text-white/70 text-sm w-12">{item.hour}</span>
                <div className="flex-1 bg-white/10 rounded-full h-2">
                  <div
                    className="bg-blue-400 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(item.views / 123) * 100}%` }}
                  ></div>
                </div>
                <span className="text-white/70 text-sm w-12 text-right">{item.views}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Demographics */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
          <h3 className="text-lg font-semibold text-white mb-4">Démographie</h3>
          <div className="space-y-4">
            <div>
              <h4 className="text-white/80 text-sm mb-2">Groupes d'âge</h4>
              {analytics.demographics.ageGroups.map((group, index) => (
                <div key={index} className="flex items-center space-x-3 mb-2">
                  <span className="text-white/70 text-sm w-16">{group.group}</span>
                  <div className="flex-1 bg-white/10 rounded-full h-2">
                    <div
                      className="bg-green-400 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${group.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-white/70 text-sm w-12 text-right">{group.percentage}%</span>
                </div>
              ))}
            </div>
            
            <div>
              <h4 className="text-white/80 text-sm mb-2">Genre</h4>
              <div className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                  <span className="text-white/70 text-sm">Homme: {analytics.demographics.gender.male}%</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-pink-400 rounded-full"></div>
                  <span className="text-white/70 text-sm">Femme: {analytics.demographics.gender.female}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Reviews */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
        <h3 className="text-lg font-semibold text-white mb-4">Avis récents</h3>
        <div className="space-y-4">
          {analytics.reviews.map((review) => (
            <div key={review.id} className="bg-white/5 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-400'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-white/70 text-sm">{review.customer}</span>
                </div>
                <span className="text-white/60 text-xs">{review.date}</span>
              </div>
              <p className="text-white/80 text-sm">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BusinessAnalytics;
