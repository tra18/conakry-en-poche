import React, { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import ErrorBoundary from './components/ErrorBoundary';
import ModernHeader from './components/ModernHeader';
import ResponsiveFooter from './components/ResponsiveFooter';
import AIAssistant from './components/AIAssistant';
import ModernBottomNav from './components/ModernBottomNav';
import BackToTopButton from './components/BackToTopButton';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { BusinessProvider } from './contexts/BusinessContext';
import { AdvertisementProvider } from './contexts/AdvertisementContext';
import { PartnerProvider } from './contexts/PartnerContext';
import { ActivityProvider } from './contexts/ActivityContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { ReviewProvider } from './contexts/ReviewContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { PushNotificationProvider } from './contexts/PushNotificationContext';
import { BookingProvider } from './contexts/BookingContext';
import { EventProvider } from './contexts/EventContext';
import { RoadReportProvider } from './contexts/RoadReportContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { applySafariNavigationFix } from './utils/safariNavigationFix';
import './styles/theme.css';
import './styles/responsive.css';
import './styles/animations.css';

// Lazy loading des pages pour améliorer les performances
const ModernHomePageNew = lazy(() => import('./pages/ModernHomePageNew'));
const ProfessionalHomePage = lazy(() => import('./pages/ProfessionalHomePage'));
const AllCategoriesPageModern = lazy(() => import('./pages/AllCategoriesPageModern'));
const AdminPanel = lazy(() => import('./pages/AdminPanel'));
const BusinessRegistrationPage = lazy(() => import('./pages/BusinessRegistrationPage'));
const CategoryPageModern = lazy(() => import('./pages/CategoryPageModern'));
const TrafficPage = lazy(() => import('./pages/TrafficPage'));
const TrafficMapPage = lazy(() => import('./pages/TrafficMapPage'));
const VivreEnGuineePageModern = lazy(() => import('./pages/VivreEnGuineePageModern'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const AdminSetupPage = lazy(() => import('./pages/AdminSetupPage'));
const AdminRoleFixPage = lazy(() => import('./pages/AdminRoleFixPage'));
const BookingsPage = lazy(() => import('./pages/BookingsPage'));
const EventsPage = lazy(() => import('./pages/EventsPage'));
const ReportRoadIssuePage = lazy(() => import('./pages/ReportRoadIssuePage'));
const RoadReportsPage = lazy(() => import('./pages/RoadReportsPage'));
const SearchPage = lazy(() => import('./pages/SearchPage'));
const NewsPage = lazy(() => import('./pages/NewsPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

// Composant interne pour utiliser useLocation
function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Pas de correctif global - laisser React Router gérer naturellement
  // Les composants utilisent SafariLink si nécessaire pour Safari
  
  // Forcer le scroll vers le haut et le re-render à chaque changement de route
  useEffect(() => {
    // Scroll vers le haut immédiatement
    window.scrollTo(0, 0);
    // Forcer un re-render en déclenchant un événement personnalisé
    window.dispatchEvent(new Event('resize'));
    // Forcer le reflow pour Safari
    document.body.offsetHeight;
    
    // Forcer la mise à jour de tous les composants après navigation
    // Utiliser requestAnimationFrame pour s'assurer que le DOM est mis à jour
    requestAnimationFrame(() => {
      // Déclencher un événement personnalisé pour notifier les composants
      window.dispatchEvent(new CustomEvent('routechange', { 
        detail: { pathname: location.pathname } 
      }));
    });
  }, [location.pathname]);
  
  return (
    <div className="App" key={location.pathname}>
                    <ModernHeader />
                    <main style={{ paddingBottom: '80px', minHeight: 'calc(100vh - 70px)' }}>
                      <ErrorBoundary>
                        <Suspense
                          fallback={
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              minHeight: '60vh'
                            }}>
                              <div className="app-loader">Chargement...</div>
                            </div>
                          }
                        >
                          <Routes key={location.pathname}>
              <Route path="/" element={<ModernHomePageNew key="home" />} />
              <Route path="/all-categories" element={<AllCategoriesPageModern key="all-categories" />} />
              <Route path="/category/:categorySlug" element={<CategoryPageModern key={`category-${location.pathname}`} />} />
              <Route path="/traffic" element={<TrafficPage key="traffic" />} />
              <Route path="/traffic-map" element={<TrafficMapPage key="traffic-map" />} />
              <Route path="/vivre-en-guinee" element={<VivreEnGuineePageModern key="vivre-en-guinee" />} />
              <Route path="/news" element={<NewsPage key="news" />} />
              <Route path="/allo" element={<div key="allo" style={{padding: '2rem', textAlign: 'center'}}><h1>ALLO Taxi</h1><p>Page en construction</p></div>} />
              <Route path="/login" element={<LoginPage key="login" />} />
              <Route path="/admin-setup" element={<AdminSetupPage key="admin-setup" />} />
              <Route path="/admin-fix" element={<AdminRoleFixPage key="admin-fix" />} />
                            <Route 
                              path="/admin" 
                              element={
                  <ProtectedRoute key="admin" adminOnly={true}>
                                  <AdminPanel />
                                </ProtectedRoute>
                              } 
                            />
              <Route path="/register-business" element={<BusinessRegistrationPage key="register-business" />} />
              <Route path="/bookings" element={<BookingsPage key="bookings" />} />
              <Route path="/events" element={<EventsPage key="events" />} />
              <Route path="/report-road-issue" element={<ReportRoadIssuePage key="report-road-issue" />} />
              <Route path="/road-reports" element={<RoadReportsPage key="road-reports" />} />
              <Route path="/search" element={<SearchPage key="search" />} />
              <Route path="/contact" element={<ContactPage key="contact" />} />
                          </Routes>
                        </Suspense>
                      </ErrorBoundary>
                    </main>
                    <ResponsiveFooter />
                    <ModernBottomNav />
                    <BackToTopButton />
                    <AIAssistant />
                    <Toaster 
                      position="top-right"
                      toastOptions={{
                        duration: 4000,
                        style: {
                          background: '#363636',
                          color: '#fff',
                        },
                        success: {
                          duration: 3000,
                          style: {
                            background: '#10b981',
                          },
                        },
                        error: {
                          duration: 5000,
                          style: {
                            background: '#ef4444',
                          },
                        },
                      }}
                    />
                  </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <AuthProvider>
          <ThemeProvider>
            <NotificationProvider>
              <BusinessProvider>
                <ReviewProvider>
                  <FavoritesProvider>
                    <PushNotificationProvider>
                      <BookingProvider>
                        <EventProvider>
                          <AdvertisementProvider>
                            <PartnerProvider>
                              <ActivityProvider>
                                <RoadReportProvider>
                                  <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                                    <AppContent />
                                  </Router>
                                </RoadReportProvider>
                            </ActivityProvider>
                            </PartnerProvider>
                          </AdvertisementProvider>
                        </EventProvider>
                      </BookingProvider>
                    </PushNotificationProvider>
                  </FavoritesProvider>
                </ReviewProvider>
              </BusinessProvider>
            </NotificationProvider>
          </ThemeProvider>
        </AuthProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}

export default App;
