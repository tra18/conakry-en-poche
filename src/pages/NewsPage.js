import React, { useState } from 'react';
import { useNews } from '../contexts/NewsContext';
import { motion } from 'framer-motion';
import { Calendar, User, Search, Filter, ArrowRight } from 'lucide-react';

const NewsPage = () => {
  const { news, loading, searchNews, getNewsByCategory } = useNews();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredNews, setFilteredNews] = useState(news);

  const categories = [
    { id: 'all', name: 'Toutes les actualités' },
    { id: 'politique', name: 'Politique' },
    { id: 'economie', name: 'Économie' },
    { id: 'sport', name: 'Sport' },
    { id: 'culture', name: 'Culture' },
    { id: 'sante', name: 'Santé' },
    { id: 'education', name: 'Éducation' },
    { id: 'transport', name: 'Transport' },
    { id: 'urbanisme', name: 'Urbanisme' }
  ];

  React.useEffect(() => {
    let filtered = news;

    // Filtrage par catégorie
    if (selectedCategory !== 'all') {
      filtered = getNewsByCategory(selectedCategory);
    }

    // Recherche
    if (searchTerm) {
      filtered = searchNews(searchTerm).filter(article => 
        selectedCategory === 'all' || article.category === selectedCategory
      );
    }

    setFilteredNews(filtered);
  }, [news, selectedCategory, searchTerm, getNewsByCategory, searchNews]);

  const formatDate = (date) => {
    return new Date(date.seconds ? date.seconds * 1000 : date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-yellow-500 text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Calendar className="h-10 w-10" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Actualités de Conakry
            </h1>
            <p className="text-xl text-gray-100 max-w-2xl mx-auto">
              Restez informé des dernières nouvelles et événements de la capitale guinéenne
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filtres et recherche */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Recherche */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher dans les actualités..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            {/* Filtres par catégorie */}
            <div className="flex items-center space-x-4">
              <Filter className="h-5 w-5 text-gray-500" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Résultats */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-800">
              {filteredNews.length} {filteredNews.length === 1 ? 'article trouvé' : 'articles trouvés'}
            </h2>
          </div>

          {filteredNews.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                Aucun article trouvé
              </h3>
              <p className="text-gray-500 mb-6">
                {searchTerm 
                  ? `Aucun article ne correspond à "${searchTerm}" dans cette catégorie.`
                  : 'Aucun article n\'est disponible dans cette catégorie pour le moment.'
                }
              </p>
              {(searchTerm || selectedCategory !== 'all') && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                  }}
                  className="btn btn-outline"
                >
                  Effacer les filtres
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Articles principaux */}
              <div className="lg:col-span-2 space-y-8">
                {filteredNews.slice(0, 6).map((article, index) => (
                  <motion.article
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="card group cursor-pointer hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex flex-col md:flex-row">
                      {article.imageUrl && (
                        <div className="md:w-1/3 h-48 md:h-auto overflow-hidden">
                          <img
                            src={article.imageUrl}
                            alt={article.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      
                      <div className={`p-6 ${article.imageUrl ? 'md:w-2/3' : 'w-full'}`}>
                        <div className="mb-3">
                          <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium">
                            {article.category}
                          </span>
                        </div>
                        
                        <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-red-600 transition-colors line-clamp-2">
                          {article.title}
                        </h3>
                        
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                          {article.content}
                        </p>
                        
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              <span>{formatDate(article.publishedAt)}</span>
                            </div>
                            {article.author && (
                              <div className="flex items-center">
                                <User className="h-4 w-4 mr-1" />
                                <span>{article.author}</span>
                              </div>
                            )}
                          </div>
                          <div className="flex items-center text-red-600 group-hover:text-red-700">
                            <span className="mr-1">Lire l'article</span>
                            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Articles populaires */}
                <div className="card">
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      Articles Populaires
                    </h3>
                    <div className="space-y-4">
                      {filteredNews
                        .sort((a, b) => (b.views || 0) - (a.views || 0))
                        .slice(0, 5)
                        .map((article, index) => (
                        <div key={article.id} className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                            {index + 1}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-gray-800 line-clamp-2 hover:text-red-600 transition-colors cursor-pointer">
                              {article.title}
                            </h4>
                            <p className="text-xs text-gray-500 mt-1">
                              {formatDate(article.publishedAt)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Catégories */}
                <div className="card">
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      Catégories
                    </h3>
                    <div className="space-y-2">
                      {categories.slice(1).map((category) => (
                        <button
                          key={category.id}
                          onClick={() => setSelectedCategory(category.id)}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                            selectedCategory === category.id
                              ? 'bg-red-100 text-red-600'
                              : 'text-gray-600 hover:bg-gray-100'
                          }`}
                        >
                          {category.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Newsletter */}
                <div className="card bg-gradient-to-r from-red-600 to-yellow-500 text-white">
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-2">
                      Restez informé
                    </h3>
                    <p className="text-sm opacity-90 mb-4">
                      Recevez les dernières actualités de Conakry directement dans votre boîte mail.
                    </p>
                    <div className="space-y-3">
                      <input
                        type="email"
                        placeholder="Votre email"
                        className="w-full px-3 py-2 rounded-lg text-gray-800 placeholder-gray-500"
                      />
                      <button className="w-full bg-white text-red-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                        S'abonner
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default NewsPage;


