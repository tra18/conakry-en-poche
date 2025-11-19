import React, { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotification } from '../contexts/NotificationContext';
import { useBusiness } from '../contexts/BusinessContext';
import { useAdvertisement } from '../contexts/AdvertisementContext';
import { usePartner } from '../contexts/PartnerContext';
import { useAuth } from '../contexts/AuthContext';
import { usePushNotification } from '../contexts/PushNotificationContext';
import { useRoadReport } from '../contexts/RoadReportContext';
import BusinessCard from '../components/BusinessCard';
import AdvertisementManager from '../components/AdvertisementManager';
import ActivityManager from '../components/ActivityManager';
import {
  LayoutDashboard,
  Building2,
  FileText,
  Users,
  Settings,
  CheckCircle,
  XCircle,
  MoreVertical,
  Search,
  Filter,
  Download,
  Upload,
  Trash2,
  Edit,
  Eye,
  TrendingUp,
  Clock,
  AlertCircle,
  Bell,
  BarChart3,
  Shield,
  LogOut,
  Menu,
  X,
  Plus,
  RefreshCw,
  Save,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Activity,
  ChevronRight
} from 'lucide-react';

const AdminPanel = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isMobile, setIsMobile] = useState(false);
  
  const [partnerForm, setPartnerForm] = useState({ id: null, name: '', url: '', logo: '' });
  const [logoPreview, setLogoPreview] = useState('');
  const [partnerSearchTerm, setPartnerSearchTerm] = useState('');
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);

  const { showSuccess, showError, showInfo } = useNotification();
  const { currentUser, logout, loading: authLoading } = useAuth();
  const { 
    pendingBusinesses = [], 
    validatedBusinesses = [], 
    approveBusiness, 
    rejectBusiness, 
    toggleBusinessStatus 
  } = useBusiness();
  const { notifyNewBusiness } = usePushNotification();
  const { advertisements = [] } = useAdvertisement();
  const {
    partners = [],
    createPartner,
    updatePartner,
    deletePartner,
    togglePartnerActive,
    getActivePartners
  } = usePartner();
  const { 
    pendingReports = [], 
    approveReport, 
    rejectReport 
  } = useRoadReport();

  // Afficher un loader pendant le chargement de l'authentification
  if (authLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f8fafc'
      }}>
        <div style={{
          textAlign: 'center'
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            border: '4px solid #e5e7eb',
            borderTop: '4px solid #3b82f6',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1rem'
          }} />
          <p style={{ color: '#6b7280' }}>Chargement...</p>
        </div>
      </div>
    );
  }

  // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // Vérifier la taille de l'écran
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth <= 768) {
        setSidebarOpen(false);
      }
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Statistiques
  const stats = {
    total: pendingBusinesses.length + validatedBusinesses.length,
    pending: pendingBusinesses.length,
    validated: validatedBusinesses.length,
    inactive: validatedBusinesses.filter(b => !b.isActive).length,
    active: validatedBusinesses.filter(b => b.isActive).length,
    ads: advertisements?.length || 0,
    roadReports: pendingReports.length,
    partners: partners.length,
    activePartners: getActivePartners().length
  };

  // Filtres
  const filteredPending = pendingBusinesses.filter(business => {
    const matchesSearch = business.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         business.address?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const filteredValidated = validatedBusinesses.filter(business => {
    const matchesSearch = business.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         business.address?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || 
                         (filterStatus === 'active' && business.isActive) ||
                         (filterStatus === 'inactive' && !business.isActive);
    return matchesSearch && matchesFilter;
  });

  const filteredPartners = partners.filter((partner) =>
    partner.name?.toLowerCase().includes(partnerSearchTerm.toLowerCase())
  );

  // Handlers
  const handleApproveBusiness = (id) => {
    const business = pendingBusinesses.find(b => b.id === id);
    if (business) {
      approveBusiness(id);
      showSuccess(`✅ "${business.name}" approuvée avec succès !`);
      
      // Notifier tous les utilisateurs de la nouvelle entreprise
      const approvedBusiness = {
        ...business,
        status: 'approved',
        isActive: true,
        approvedAt: new Date().toISOString()
      };
      notifyNewBusiness(approvedBusiness);
    }
  };

  const handleRejectBusiness = (id) => {
    const business = pendingBusinesses.find(b => b.id === id);
    if (business) {
      rejectBusiness(id);
      showError(`❌ "${business.name}" rejetée.`);
    }
  };

  const handleToggleStatus = (id) => {
    toggleBusinessStatus(id);
    const business = validatedBusinesses.find(b => b.id === id);
    showSuccess(`Statut de "${business?.name}" modifié.`);
  };

  const handleExport = () => {
    showInfo('Export en cours...');
    const data = JSON.stringify([...pendingBusinesses, ...validatedBusinesses], null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `entreprises_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setTimeout(() => showSuccess('Export terminé !'), 1000);
  };

  const resetPartnerForm = () => {
    setPartnerForm({ id: null, name: '', url: '', logo: '' });
    setLogoPreview('');
    setIsUploadingLogo(false);
  };

  const handlePartnerSubmit = async (event) => {
    event.preventDefault();

    if (!partnerForm.name?.trim()) {
      showError('Le nom du partenaire est obligatoire.');
      return;
    }

    try {
      if (partnerForm.id) {
        await updatePartner(partnerForm.id, {
          name: partnerForm.name.trim(),
          url: partnerForm.url?.trim() || '',
          logo: partnerForm.logo || ''
        });
        showSuccess('Partenaire mis à jour avec succès.');
      } else {
        const created = await createPartner({
          name: partnerForm.name.trim(),
          url: partnerForm.url?.trim() || '',
          logo: partnerForm.logo || ''
        });
        if (!created) {
          return;
        }
        showSuccess('Partenaire ajouté avec succès.');
      }
      resetPartnerForm();
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement du partenaire:', error);
      showError('Impossible d\'enregistrer le partenaire.');
    }
  };

  const handlePartnerLogoChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showError('Veuillez sélectionner un fichier image.');
      event.target.value = '';
      return;
    }

    setIsUploadingLogo(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result?.toString() || '';
      setPartnerForm((prev) => ({ ...prev, logo: result }));
      setLogoPreview(result);
      setIsUploadingLogo(false);
    };
    reader.onerror = () => {
      console.error('Erreur lors du chargement du logo partenaire');
      showError('Impossible de charger le logo.');
      setIsUploadingLogo(false);
    };
    reader.readAsDataURL(file);
    event.target.value = '';
  };

  const handleEditPartner = (partner) => {
    setPartnerForm({
      id: partner.id,
      name: partner.name || '',
      url: partner.url || '',
      logo: partner.logo || ''
    });
    setLogoPreview(partner.logo || '');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeletePartner = (partnerId) => {
    if (window.confirm('Supprimer ce partenaire ?')) {
      deletePartner(partnerId);
      if (partnerForm.id === partnerId) {
        resetPartnerForm();
      }
    }
  };

  const handleTogglePartner = (partnerId) => {
    togglePartnerActive(partnerId);
  };

  // Menu items
  const menuItems = [
    { id: 'dashboard', label: 'Tableau de bord', icon: LayoutDashboard, color: '#3b82f6' },
    { id: 'pending', label: 'En attente', icon: Clock, color: '#f59e0b', badge: stats.pending },
    { id: 'validated', label: 'Validées', icon: CheckCircle, color: '#10b981', badge: stats.validated },
    { id: 'roadReports', label: 'Signalements routiers', icon: AlertCircle, color: '#f97316', badge: stats.roadReports },
    { id: 'advertisements', label: 'Publicités', icon: FileText, color: '#8b5cf6' },
    { id: 'partners', label: 'Partenaires', icon: Users, color: '#2563eb', badge: stats.partners },
    { id: 'activities', label: 'Activités', icon: Activity, color: '#ef4444' },
    { id: 'settings', label: 'Paramètres', icon: Settings, color: '#6b7280' }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      display: 'flex',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Sidebar */}
      <AnimatePresence>
        {(sidebarOpen || !isMobile) && (
          <motion.aside
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              width: isMobile ? '280px' : '280px',
              backgroundColor: 'white',
              boxShadow: '2px 0 10px rgba(0, 0, 0, 0.05)',
              position: isMobile ? 'fixed' : 'relative',
              zIndex: 1000,
              height: '100vh',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* Header */}
            <div style={{
              padding: '1.5rem',
              borderBottom: '1px solid #e5e7eb',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '0.75rem',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '1.25rem',
                  fontWeight: 'bold'
                }}>
                  🏛️
                </div>
                <div>
                  <h2 style={{ margin: 0, fontSize: '1rem', fontWeight: '700', color: '#1f2937' }}>
                    Administration
                  </h2>
                  <p style={{ margin: 0, fontSize: '0.75rem', color: '#6b7280' }}>
                    Conakry en Poche
                  </p>
                </div>
              </div>
              {isMobile && (
                <button
                  onClick={() => setSidebarOpen(false)}
                  style={{
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                    padding: '0.5rem',
                    borderRadius: '0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <X size={20} color="#6b7280" />
                </button>
              )}
            </div>

            {/* User Info */}
            <div style={{
              padding: '1.5rem',
              borderBottom: '1px solid #e5e7eb',
              backgroundColor: '#f9fafb'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '1.125rem'
                }}>
                  {currentUser?.email?.[0]?.toUpperCase() || 'A'}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontSize: '0.875rem', fontWeight: '600', color: '#1f2937' }}>
                    {currentUser?.email || 'Admin'}
                  </p>
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    padding: '0.125rem 0.5rem',
                    backgroundColor: '#dbeafe',
                    color: '#1e40af',
                    borderRadius: '0.375rem',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    marginTop: '0.25rem'
                  }}>
                    <Shield size={12} />
                    Administrateur
                  </div>
                </div>
              </div>
            </div>

            {/* Menu */}
            <nav style={{ flex: 1, padding: '1rem 0' }}>
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      if (isMobile) setSidebarOpen(false);
                    }}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.75rem 1.5rem',
                      border: 'none',
                      background: isActive ? '#eff6ff' : 'transparent',
                      color: isActive ? item.color : '#6b7280',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      fontWeight: isActive ? '600' : '500',
                      transition: 'all 0.2s',
                      borderLeft: isActive ? `3px solid ${item.color}` : '3px solid transparent',
                      position: 'relative'
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = '#f9fafb';
                        e.currentTarget.style.color = '#374151';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = '#6b7280';
                      }
                    }}
                  >
                    <Icon size={20} />
                    <span style={{ flex: 1, textAlign: 'left' }}>{item.label}</span>
                    {item.badge && item.badge > 0 && (
                      <span style={{
                        backgroundColor: item.color,
                        color: 'white',
                        borderRadius: '9999px',
                        padding: '0.125rem 0.5rem',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        minWidth: '1.5rem',
                        textAlign: 'center'
                      }}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Logout */}
            <div style={{
              padding: '1rem 1.5rem',
              borderTop: '1px solid #e5e7eb'
            }}>
              <button
                onClick={async () => {
                  try {
                    await logout();
                    navigate('/');
                  } catch (error) {
                    console.error('Erreur de déconnexion:', error);
                  }
                }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem',
                  border: 'none',
                  background: '#fee2e2',
                  color: '#dc2626',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#fecaca';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#fee2e2';
                }}
              >
                <LogOut size={18} />
                Déconnexion
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Overlay pour mobile */}
      {isMobile && sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 999
          }}
        />
      )}

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Top Bar */}
        <header style={{
          backgroundColor: 'white',
          borderBottom: '1px solid #e5e7eb',
          padding: '1rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
            {isMobile && (
              <button
                onClick={() => setSidebarOpen(true)}
                style={{
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                  padding: '0.5rem',
                  borderRadius: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Menu size={24} color="#374151" />
              </button>
            )}
            <h1 style={{
              margin: 0,
              fontSize: '1.5rem',
              fontWeight: '700',
              color: '#1f2937'
            }}>
              {menuItems.find(m => m.id === activeTab)?.label || 'Administration'}
            </h1>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* Search */}
            {(activeTab === 'pending' || activeTab === 'validated') && (
              <div style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center'
              }}>
                <Search size={18} color="#6b7280" style={{ position: 'absolute', left: '0.75rem' }} />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    padding: '0.5rem 0.75rem 0.5rem 2.5rem',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.5rem',
                    fontSize: '0.875rem',
                    outline: 'none',
                    width: '200px',
                    transition: 'all 0.2s'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#3b82f6';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = '#e5e7eb';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>
            )}

            {/* Export Button */}
            {activeTab === 'validated' && (
              <button
                onClick={handleExport}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 1rem',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#2563eb';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#3b82f6';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <Download size={18} />
                Exporter
              </button>
            )}
          </div>
        </header>

        {/* Content */}
        <main style={{
          flex: 1,
          overflowY: 'auto',
          padding: '1.5rem'
        }}>
          <AnimatePresence mode="wait">
            {/* Dashboard */}
            {activeTab === 'dashboard' && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                variants={containerVariants}
              >
                {/* Stats Cards */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(250px, 1fr))',
                  gap: '1.5rem',
                  marginBottom: '2rem'
                }}>
                  {[
                    { label: 'Total Entreprises', value: stats.total, icon: Building2, color: '#3b82f6', trend: '+12%' },
                    { label: 'En Attente', value: stats.pending, icon: Clock, color: '#f59e0b', trend: stats.pending > 0 ? `${stats.pending} nouvelles` : 'Aucune' },
                    { label: 'Validées', value: stats.validated, icon: CheckCircle, color: '#10b981', trend: `${stats.active} actives` },
                    { label: 'Inactives', value: stats.inactive, icon: AlertCircle, color: '#ef4444', trend: `${stats.inactive} entreprises` },
                    { label: 'Partenaires', value: stats.partners, icon: Users, color: '#2563eb', trend: `${stats.activePartners} actifs` }
                  ].map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                      <motion.div
                        key={index}
                        variants={itemVariants}
                        style={{
                          backgroundColor: 'white',
                          borderRadius: '1rem',
                          padding: '1.5rem',
                          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                          border: '1px solid #e5e7eb',
                          transition: 'all 0.3s'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-4px)';
                          e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                          <div style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '0.75rem',
                            backgroundColor: `${stat.color}15`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            <Icon size={24} color={stat.color} />
                          </div>
                          <span style={{
                            fontSize: '0.75rem',
                            color: '#6b7280',
                            fontWeight: '600'
                          }}>
                            {stat.trend}
                          </span>
                        </div>
                        <div>
                          <h3 style={{
                            margin: 0,
                            fontSize: '2rem',
                            fontWeight: '800',
                            color: '#1f2937',
                            marginBottom: '0.25rem'
                          }}>
                            {stat.value}
                          </h3>
                          <p style={{
                            margin: 0,
                            fontSize: '0.875rem',
                            color: '#6b7280'
                          }}>
                            {stat.label}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Quick Actions */}
                <div style={{
                  backgroundColor: 'white',
                  borderRadius: '1rem',
                  padding: '1.5rem',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                  border: '1px solid #e5e7eb',
                  marginBottom: '2rem'
                }}>
                  <h2 style={{
                    margin: 0,
                    marginBottom: '1.5rem',
                    fontSize: '1.25rem',
                    fontWeight: '700',
                    color: '#1f2937'
                  }}>
                    Actions Rapides
                  </h2>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '1rem'
                  }}>
                    {[
                      { label: 'Entreprises en attente', count: stats.pending, action: () => setActiveTab('pending'), color: '#f59e0b' },
                      { label: 'Entreprises validées', count: stats.validated, action: () => setActiveTab('validated'), color: '#10b981' },
                      { label: 'Gérer les publicités', count: stats.ads, action: () => setActiveTab('advertisements'), color: '#8b5cf6' },
                      { label: 'Gestion des partenaires', count: stats.partners, action: () => setActiveTab('partners'), color: '#2563eb' }
                    ].map((action, index) => (
                      <button
                        key={index}
                        onClick={action.action}
                        style={{
                          padding: '1rem',
                          border: `2px solid ${action.color}`,
                          backgroundColor: `${action.color}10`,
                          borderRadius: '0.75rem',
                          cursor: 'pointer',
                          textAlign: 'left',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = `${action.color}20`;
                          e.currentTarget.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = `${action.color}10`;
                          e.currentTarget.style.transform = 'translateY(0)';
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                          <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#374151' }}>
                            {action.label}
                          </span>
                          <span style={{
                            backgroundColor: action.color,
                            color: 'white',
                            borderRadius: '9999px',
                            padding: '0.25rem 0.5rem',
                            fontSize: '0.75rem',
                            fontWeight: '700',
                            minWidth: '1.5rem',
                            textAlign: 'center'
                          }}>
                            {action.count}
                          </span>
                        </div>
                        <ChevronRight size={16} color={action.color} />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Recent Activity */}
                <div style={{
                  backgroundColor: 'white',
                  borderRadius: '1rem',
                  padding: '1.5rem',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                  border: '1px solid #e5e7eb'
                }}>
                  <h2 style={{
                    margin: 0,
                    marginBottom: '1.5rem',
                    fontSize: '1.25rem',
                    fontWeight: '700',
                    color: '#1f2937'
                  }}>
                    Activité Récente
                  </h2>
                  {stats.pending > 0 ? (
                    <div style={{
                      padding: '1rem',
                      backgroundColor: '#fffbeb',
                      border: '1px solid #fcd34d',
                      borderRadius: '0.75rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem'
                    }}>
                      <Clock size={24} color="#f59e0b" />
                      <div style={{ flex: 1 }}>
                        <p style={{ margin: 0, fontWeight: '600', color: '#92400e' }}>
                          {stats.pending} entreprise{stats.pending > 1 ? 's' : ''} en attente de validation
                        </p>
                        <p style={{ margin: 0, fontSize: '0.875rem', color: '#a16207', marginTop: '0.25rem' }}>
                          Vérifiez et approuvez les nouvelles soumissions
                        </p>
                      </div>
                      <button
                        onClick={() => setActiveTab('pending')}
                        style={{
                          padding: '0.5rem 1rem',
                          backgroundColor: '#f59e0b',
                          color: 'white',
                          border: 'none',
                          borderRadius: '0.5rem',
                          fontSize: '0.875rem',
                          fontWeight: '600',
                          cursor: 'pointer'
                        }}
                      >
                        Voir
                      </button>
                    </div>
                  ) : (
                    <p style={{ color: '#6b7280', textAlign: 'center', padding: '2rem' }}>
                      Aucune activité récente
                    </p>
                  )}
                </div>
              </motion.div>
            )}

            {/* Pending Businesses */}
            {activeTab === 'pending' && (
              <motion.div
                key="pending"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                {filteredPending.length === 0 ? (
                  <div style={{
                    backgroundColor: 'white',
                    borderRadius: '1rem',
                    padding: '3rem',
                    textAlign: 'center',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                    border: '1px solid #e5e7eb'
                  }}>
                    <CheckCircle size={64} color="#10b981" style={{ margin: '0 auto 1rem' }} />
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1f2937', marginBottom: '0.5rem' }}>
                      Aucune entreprise en attente
                    </h3>
                    <p style={{ color: '#6b7280' }}>
                      Toutes les entreprises ont été traitées.
                    </p>
                  </div>
                ) : (
                  <div style={{
                    display: 'grid',
                    gap: '1.5rem'
                  }}>
                    {filteredPending.map((business, index) => (
                      <motion.div
                        key={business.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        style={{
                          backgroundColor: 'white',
                          borderRadius: '1rem',
                          padding: '1.5rem',
                          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                          border: '1px solid #e5e7eb'
                        }}
                      >
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          marginBottom: '1rem'
                        }}>
                          <div style={{ flex: 1 }}>
                            <h3 style={{
                              margin: 0,
                              fontSize: '1.25rem',
                              fontWeight: '700',
                              color: '#1f2937',
                              marginBottom: '0.5rem'
                            }}>
                              {business.name}
                            </h3>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '0.5rem' }}>
                              {business.address && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.875rem', color: '#6b7280' }}>
                                  <MapPin size={16} />
                                  {business.address}
                                </div>
                              )}
                              {business.phone && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.875rem', color: '#6b7280' }}>
                                  <Phone size={16} />
                                  {business.phone}
                                </div>
                              )}
                              {business.email && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.875rem', color: '#6b7280' }}>
                                  <Mail size={16} />
                                  {business.email}
                                </div>
                              )}
                            </div>
                            {business.description && (
                              <p style={{
                                margin: 0,
                                fontSize: '0.875rem',
                                color: '#6b7280',
                                lineHeight: 1.6
                              }}>
                                {business.description}
                              </p>
                            )}
                          </div>
                        </div>
                        <div style={{
                          display: 'flex',
                          gap: '0.75rem',
                          justifyContent: 'flex-end',
                          paddingTop: '1rem',
                          borderTop: '1px solid #e5e7eb'
                        }}>
                          <button
                            onClick={() => handleRejectBusiness(business.id)}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.5rem',
                              padding: '0.5rem 1rem',
                              backgroundColor: '#fee2e2',
                              color: '#dc2626',
                              border: 'none',
                              borderRadius: '0.5rem',
                              fontSize: '0.875rem',
                              fontWeight: '600',
                              cursor: 'pointer',
                              transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = '#fecaca';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = '#fee2e2';
                            }}
                          >
                            <XCircle size={18} />
                            Rejeter
                          </button>
                          <button
                            onClick={() => handleApproveBusiness(business.id)}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.5rem',
                              padding: '0.5rem 1rem',
                              backgroundColor: '#10b981',
                              color: 'white',
                              border: 'none',
                              borderRadius: '0.5rem',
                              fontSize: '0.875rem',
                              fontWeight: '600',
                              cursor: 'pointer',
                              transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = '#059669';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = '#10b981';
                            }}
                          >
                            <CheckCircle size={18} />
                            Approuver
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* Validated Businesses */}
            {activeTab === 'validated' && (
              <motion.div
                key="validated"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                {/* Filter */}
                <div style={{
                  display: 'flex',
                  gap: '0.75rem',
                  marginBottom: '1.5rem',
                  flexWrap: 'wrap'
                }}>
                  {['all', 'active', 'inactive'].map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setFilterStatus(filter)}
                      style={{
                        padding: '0.5rem 1rem',
                        border: `2px solid ${filterStatus === filter ? '#3b82f6' : '#e5e7eb'}`,
                        backgroundColor: filterStatus === filter ? '#eff6ff' : 'white',
                        color: filterStatus === filter ? '#3b82f6' : '#6b7280',
                        borderRadius: '0.5rem',
                        fontSize: '0.875rem',
                        fontWeight: filterStatus === filter ? '600' : '500',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        textTransform: 'capitalize'
                      }}
                    >
                      {filter === 'all' ? 'Toutes' : filter === 'active' ? 'Actives' : 'Inactives'}
                    </button>
                  ))}
                </div>

                {filteredValidated.length === 0 ? (
                  <div style={{
                    backgroundColor: 'white',
                    borderRadius: '1rem',
                    padding: '3rem',
                    textAlign: 'center',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                    border: '1px solid #e5e7eb'
                  }}>
                    <Building2 size={64} color="#6b7280" style={{ margin: '0 auto 1rem' }} />
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1f2937', marginBottom: '0.5rem' }}>
                      Aucune entreprise
                    </h3>
                    <p style={{ color: '#6b7280' }}>
                      {searchQuery ? 'Aucun résultat pour votre recherche.' : 'Aucune entreprise validée pour le moment.'}
                    </p>
                  </div>
                ) : (
                  <div style={{
                    display: 'grid',
                    gap: '1.5rem'
                  }}>
                    {filteredValidated.map((business, index) => (
                      <motion.div
                        key={business.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        style={{
                          backgroundColor: 'white',
                          borderRadius: '1rem',
                          padding: '1.5rem',
                          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                          border: '1px solid #e5e7eb',
                          borderLeft: `4px solid ${business.isActive ? '#10b981' : '#ef4444'}`
                        }}
                      >
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          marginBottom: '1rem'
                        }}>
                          <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                              <h3 style={{
                                margin: 0,
                                fontSize: '1.25rem',
                                fontWeight: '700',
                                color: '#1f2937'
                              }}>
                                {business.name}
                              </h3>
                              <span style={{
                                padding: '0.25rem 0.75rem',
                                borderRadius: '9999px',
                                fontSize: '0.75rem',
                                fontWeight: '600',
                                backgroundColor: business.isActive ? '#d1fae5' : '#fee2e2',
                                color: business.isActive ? '#065f46' : '#991b1b'
                              }}>
                                {business.isActive ? 'Active' : 'Inactive'}
                              </span>
                            </div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '0.5rem' }}>
                              {business.address && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.875rem', color: '#6b7280' }}>
                                  <MapPin size={16} />
                                  {business.address}
                                </div>
                              )}
                              {business.phone && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.875rem', color: '#6b7280' }}>
                                  <Phone size={16} />
                                  {business.phone}
                                </div>
                              )}
                            </div>
                            {business.description && (
                              <p style={{
                                margin: 0,
                                fontSize: '0.875rem',
                                color: '#6b7280',
                                lineHeight: 1.6
                              }}>
                                {business.description}
                              </p>
                            )}
                          </div>
                        </div>
                        <div style={{
                          display: 'flex',
                          gap: '0.75rem',
                          justifyContent: 'flex-end',
                          paddingTop: '1rem',
                          borderTop: '1px solid #e5e7eb'
                        }}>
                          <button
                            onClick={() => handleToggleStatus(business.id)}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.5rem',
                              padding: '0.5rem 1rem',
                              backgroundColor: business.isActive ? '#fee2e2' : '#d1fae5',
                              color: business.isActive ? '#dc2626' : '#059669',
                              border: 'none',
                              borderRadius: '0.5rem',
                              fontSize: '0.875rem',
                              fontWeight: '600',
                              cursor: 'pointer',
                              transition: 'all 0.2s'
                            }}
                          >
                            {business.isActive ? (
                              <>
                                <XCircle size={18} />
                                Désactiver
                              </>
                            ) : (
                              <>
                                <CheckCircle size={18} />
                                Activer
                              </>
                            )}
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* Advertisements */}
            {activeTab === 'advertisements' && (
              <motion.div
                key="advertisements"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <AdvertisementManager />
              </motion.div>
            )}

            {activeTab === 'partners' && (
              <section style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div style={{
                  backgroundColor: 'white',
                  borderRadius: '1rem',
                  padding: isMobile ? '1.5rem' : '2rem',
                  boxShadow: '0 20px 45px rgba(15, 23, 42, 0.1)',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(circle at top left, rgba(37, 99, 235, 0.1), transparent 60%)'
                  }} />
                  <div style={{ position: 'relative' }}>
                    <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700, color: '#1f2937' }}>
                      Logos des partenaires
                    </h2>
                    <p style={{ marginTop: '0.5rem', marginBottom: '1.5rem', color: '#6b7280' }}>
                      Ajoutez, modifiez ou désactivez les logos qui s\'affichent sur la page d\'accueil.
                    </p>

                    <form onSubmit={handlePartnerSubmit} style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, minmax(0, 1fr))' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontWeight: 600, color: '#1f2937' }}>Nom du partenaire *</label>
                        <input
                          type="text"
                          value={partnerForm.name}
                          onChange={(e) => setPartnerForm((prev) => ({ ...prev, name: e.target.value }))}
                          placeholder="Ex: Orange Guinée"
                          style={{
                            padding: '0.75rem 1rem',
                            borderRadius: '0.75rem',
                            border: '1px solid #d1d5db',
                            fontSize: '0.95rem'
                          }}
                        />
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontWeight: 600, color: '#1f2937' }}>Lien (facultatif)</label>
                        <input
                          type="url"
                          value={partnerForm.url}
                          onChange={(e) => setPartnerForm((prev) => ({ ...prev, url: e.target.value }))}
                          placeholder="https://..."
                          style={{
                            padding: '0.75rem 1rem',
                            borderRadius: '0.75rem',
                            border: '1px solid #d1d5db',
                            fontSize: '0.95rem'
                          }}
                        />
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', gridColumn: isMobile ? 'auto' : 'span 2' }}>
                        <label style={{ fontWeight: 600, color: '#1f2937' }}>Logo</label>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                          <div style={{
                            width: '96px',
                            height: '96px',
                            borderRadius: '9999px',
                            backgroundColor: '#eff6ff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden',
                            boxShadow: '0 10px 30px rgba(59, 130, 246, 0.2)'
                          }}>
                            {logoPreview ? (
                              <img src={logoPreview} alt="Logo partenaire" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : partnerForm.logo ? (
                              <span style={{ fontSize: '2.5rem' }}>{partnerForm.logo}</span>
                            ) : (
                              <span style={{ fontSize: '2rem', color: '#3b82f6' }}>+</span>
                            )}
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handlePartnerLogoChange}
                              style={{
                                padding: '0.65rem 1rem',
                                border: '1px dashed #93c5fd',
                                borderRadius: '0.75rem',
                                backgroundColor: '#eff6ff',
                                color: '#1d4ed8'
                              }}
                            />
                            <small style={{ color: '#6b7280' }}>Formats recommandés : PNG ou SVG, 400x400px.</small>
                            {isUploadingLogo && <small style={{ color: '#2563eb' }}>Téléchargement du logo...</small>}
                          </div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', gridColumn: isMobile ? 'auto' : 'span 2' }}>
                        <button
                          type="submit"
                          style={{
                            padding: '0.75rem 1.75rem',
                            borderRadius: '0.75rem',
                            border: 'none',
                            background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                            color: 'white',
                            fontWeight: 600,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            cursor: 'pointer'
                          }}
                        >
                          {partnerForm.id ? <><Save size={18} /> Mettre à jour</> : <><Plus size={18} /> Ajouter le partenaire</>}
                        </button>
                        {partnerForm.id && (
                          <button
                            type="button"
                            onClick={resetPartnerForm}
                            style={{
                              padding: '0.75rem 1.5rem',
                              borderRadius: '0.75rem',
                              border: '1px solid #d1d5db',
                              backgroundColor: 'white',
                              color: '#374151',
                              fontWeight: 600,
                              cursor: 'pointer'
                            }}
                          >
                            Annuler
                          </button>
                        )}
                      </div>
                    </form>
                  </div>
                </div>

                <div style={{
                  backgroundColor: 'white',
                  borderRadius: '1rem',
                  padding: isMobile ? '1.5rem' : '2rem',
                  boxShadow: '0 12px 32px rgba(15, 23, 42, 0.08)'
                }}>
                  <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '1rem', justifyContent: 'space-between', alignItems: isMobile ? 'stretch' : 'center', marginBottom: '1.5rem' }}>
                    <div>
                      <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700, color: '#1f2937' }}>Liste des partenaires</h3>
                      <p style={{ margin: 0, marginTop: '0.25rem', color: '#6b7280' }}>
                        {filteredPartners.length} partenaire(s) affiché(s) — {stats.activePartners} actif(s)
                      </p>
                    </div>
                    <input
                      type="text"
                      placeholder="Rechercher un partenaire..."
                      value={partnerSearchTerm}
                      onChange={(e) => setPartnerSearchTerm(e.target.value)}
                      style={{
                        padding: '0.65rem 1rem',
                        borderRadius: '0.75rem',
                        border: '1px solid #d1d5db',
                        width: isMobile ? '100%' : '260px'
                      }}
                    />
                  </div>

                  {filteredPartners.length === 0 ? (
                    <div style={{
                      padding: '2rem',
                      border: '1px dashed #d1d5db',
                      borderRadius: '1rem',
                      textAlign: 'center',
                      color: '#6b7280'
                    }}>
                      Aucun partenaire pour l'instant. Ajoutez-en un via le formulaire ci-dessus.
                    </div>
                  ) : (
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                      gap: '1.5rem'
                    }}>
                      {filteredPartners.map((partner) => (
                        <div
                          key={partner.id}
                          style={{
                            border: '1px solid #e5e7eb',
                            borderRadius: '1rem',
                            padding: '1.25rem',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem',
                            backgroundColor: 'white',
                            boxShadow: '0 8px 24px rgba(15, 23, 42, 0.06)'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{
                              width: '64px',
                              height: '64px',
                              borderRadius: '9999px',
                              backgroundColor: '#eff6ff',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              overflow: 'hidden'
                            }}>
                              {partner.logo ? (
                                typeof partner.logo === 'string' && partner.logo.startsWith('data:') ? (
                                  <img src={partner.logo} alt={partner.name || 'Partenaire'} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : typeof partner.logo === 'string' && partner.logo.startsWith('http') ? (
                                  <img src={partner.logo} alt={partner.name || 'Partenaire'} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : (
                                  <span style={{ fontSize: '2rem' }}>{partner.logo}</span>
                                )
                              ) : (
                                <span style={{ fontSize: '1.5rem', color: '#1f2937', fontWeight: 700 }}>
                                  {(partner.name || '?').slice(0, 2).toUpperCase()}
                                </span>
                              )}
                            </div>
                            <div style={{ flex: 1 }}>
                              <p style={{ margin: 0, fontWeight: 600, fontSize: '1rem', color: '#1f2937' }}>{partner.name}</p>
                              {partner.url && (
                                <a
                                  href={partner.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  style={{ color: '#2563eb', fontSize: '0.875rem' }}
                                >
                                  {partner.url}
                                </a>
                              )}
                              <div style={{
                                marginTop: '0.5rem',
                                padding: '0.25rem 0.75rem',
                                borderRadius: '9999px',
                                backgroundColor: partner.isActive ? '#dcfce7' : '#fee2e2',
                                color: partner.isActive ? '#15803d' : '#b91c1c',
                                fontWeight: 600,
                                fontSize: '0.75rem',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.35rem'
                              }}>
                                <span style={{ width: '6px', height: '6px', borderRadius: '9999px', backgroundColor: partner.isActive ? '#15803d' : '#b91c1c' }} />
                                {partner.isActive ? 'Actif' : 'Inactif'}
                              </div>
                            </div>
                          </div>

                          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                            <button
                              type="button"
                              onClick={() => handleEditPartner(partner)}
                              style={{
                                flex: '1 1 auto',
                                padding: '0.6rem 0.75rem',
                                borderRadius: '0.75rem',
                                border: '1px solid #d1d5db',
                                backgroundColor: 'white',
                                color: '#1f2937',
                                fontWeight: 600,
                                cursor: 'pointer'
                              }}
                            >
                              Modifier
                            </button>
                            <button
                              type="button"
                              onClick={() => handleTogglePartner(partner.id)}
                              style={{
                                flex: '1 1 auto',
                                padding: '0.6rem 0.75rem',
                                borderRadius: '0.75rem',
                                border: 'none',
                                backgroundColor: partner.isActive ? '#f97316' : '#10b981',
                                color: 'white',
                                fontWeight: 600,
                                cursor: 'pointer'
                              }}
                            >
                              {partner.isActive ? 'Désactiver' : 'Activer'}
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeletePartner(partner.id)}
                              style={{
                                flex: '1 1 auto',
                                padding: '0.6rem 0.75rem',
                                borderRadius: '0.75rem',
                                border: '1px solid #fecaca',
                                backgroundColor: '#fee2e2',
                                color: '#b91c1c',
                                fontWeight: 600,
                                cursor: 'pointer'
                              }}
                            >
                              Supprimer
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* Activities */}
            {activeTab === 'activities' && (
              <motion.div
                key="activities"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <ActivityManager />
              </motion.div>
            )}

            {/* Road Reports */}
            {activeTab === 'roadReports' && (
              <motion.div
                key="roadReports"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                {pendingReports.length === 0 ? (
                  <div style={{
                    backgroundColor: 'white',
                    borderRadius: '1rem',
                    padding: '3rem',
                    textAlign: 'center',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                    border: '1px solid #e5e7eb'
                  }}>
                    <CheckCircle size={64} color="#10b981" style={{ margin: '0 auto 1rem' }} />
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1f2937', marginBottom: '0.5rem' }}>
                      Aucun signalement en attente
                    </h3>
                    <p style={{ color: '#6b7280' }}>
                      Tous les signalements ont été traités.
                    </p>
                  </div>
                ) : (
                  <div style={{
                    display: 'grid',
                    gap: '1.5rem'
                  }}>
                    {pendingReports.map((report, index) => {
                      const reportType = report.type === 'roadwork' ? { icon: '🚧', name: 'Travaux routiers', color: '#f59e0b' } :
                                       report.type === 'accident' ? { icon: '🚨', name: 'Accident', color: '#ef4444' } :
                                       { icon: '🚗', name: 'Embouteillage', color: '#3b82f6' };
                      
                      const formatDate = (timestamp) => {
                        if (!timestamp) return 'Date inconnue';
                        let date;
                        if (timestamp.toDate) {
                          date = timestamp.toDate();
                        } else if (timestamp instanceof Date) {
                          date = timestamp;
                        } else {
                          date = new Date(timestamp);
                        }
                        return date.toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        });
                      };

                      return (
                        <motion.div
                          key={report.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          style={{
                            backgroundColor: 'white',
                            borderRadius: '1rem',
                            padding: '1.5rem',
                            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                            border: '1px solid #e5e7eb',
                            borderLeft: `4px solid ${reportType.color}`
                          }}
                        >
                          <div style={{
                            display: 'flex',
                            gap: '1rem',
                            marginBottom: '1rem'
                          }}>
                            {/* Image */}
                            {report.imageUrl && (
                              <div style={{
                                width: '150px',
                                height: '150px',
                                borderRadius: '0.75rem',
                                overflow: 'hidden',
                                flexShrink: 0,
                                backgroundColor: '#f3f4f6'
                              }}>
                                <img
                                  src={report.imageUrl}
                                  alt={report.title}
                                  style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover'
                                  }}
                                />
                              </div>
                            )}

                            {/* Contenu */}
                            <div style={{ flex: 1 }}>
                              <div style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                justifyContent: 'space-between',
                                marginBottom: '0.75rem',
                                gap: '1rem'
                              }}>
                                <div style={{ flex: 1 }}>
                                  <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    marginBottom: '0.5rem'
                                  }}>
                                    <span style={{ fontSize: '1.5rem' }}>{reportType.icon}</span>
                                    <h3 style={{
                                      margin: 0,
                                      fontSize: '1.125rem',
                                      fontWeight: '700',
                                      color: '#1f2937'
                                    }}>
                                      {report.title}
                                    </h3>
                                  </div>
                                  <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    fontSize: '0.875rem',
                                    color: '#6b7280',
                                    marginBottom: '0.5rem'
                                  }}>
                                    <MapPin size={16} />
                                    <span>{report.location}</span>
                                  </div>
                                  {report.description && (
                                    <p style={{
                                      margin: 0,
                                      fontSize: '0.875rem',
                                      color: '#6b7280',
                                      lineHeight: 1.6
                                    }}>
                                      {report.description}
                                    </p>
                                  )}
                                  <div style={{
                                    marginTop: '0.75rem',
                                    fontSize: '0.75rem',
                                    color: '#9ca3af',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    flexWrap: 'wrap'
                                  }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                      <Calendar size={14} />
                                      <span>Signalé le {formatDate(report.createdAt)}</span>
                                    </div>
                                    {report.isAnonymous && (
                                      <div style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '0.25rem',
                                        padding: '0.25rem 0.5rem',
                                        backgroundColor: '#fef3c7',
                                        color: '#92400e',
                                        borderRadius: '0.375rem',
                                        fontSize: '0.7rem',
                                        fontWeight: '600'
                                      }}>
                                        👤 Anonyme
                                      </div>
                                    )}
                                    {report.userName && (
                                      <div style={{ fontSize: '0.7rem', color: '#6b7280' }}>
                                        Par: {report.userName}
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <div style={{
                                  padding: '0.5rem 0.75rem',
                                  backgroundColor: `${reportType.color}15`,
                                  color: reportType.color,
                                  borderRadius: '0.5rem',
                                  fontSize: '0.75rem',
                                  fontWeight: '600',
                                  whiteSpace: 'nowrap'
                                }}>
                                  {reportType.name}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Actions */}
                          <div style={{
                            display: 'flex',
                            gap: '0.75rem',
                            justifyContent: 'flex-end',
                            paddingTop: '1rem',
                            borderTop: '1px solid #e5e7eb'
                          }}>
                            <button
                              onClick={async () => {
                                const success = await rejectReport(report.id);
                                if (success) {
                                  showError(`Signalement "${report.title}" rejeté.`);
                                }
                              }}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                padding: '0.5rem 1rem',
                                backgroundColor: '#fee2e2',
                                color: '#dc2626',
                                border: 'none',
                                borderRadius: '0.5rem',
                                fontSize: '0.875rem',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#fecaca';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = '#fee2e2';
                              }}
                            >
                              <XCircle size={18} />
                              Rejeter
                            </button>
                            <button
                              onClick={async () => {
                                const success = await approveReport(report.id);
                                if (success) {
                                  showSuccess(`Signalement "${report.title}" approuvé !`);
                                }
                              }}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                padding: '0.5rem 1rem',
                                backgroundColor: '#10b981',
                                color: 'white',
                                border: 'none',
                                borderRadius: '0.5rem',
                                fontSize: '0.875rem',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#059669';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = '#10b981';
                              }}
                            >
                              <CheckCircle size={18} />
                              Approuver
                            </button>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            )}

            {/* Settings */}
            {activeTab === 'settings' && (
              <motion.div
                key="settings"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div style={{
                  backgroundColor: 'white',
                  borderRadius: '1rem',
                  padding: '2rem',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                  border: '1px solid #e5e7eb'
                }}>
                  <h2 style={{
                    margin: 0,
                    marginBottom: '1.5rem',
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    color: '#1f2937'
                  }}>
                    Paramètres
                  </h2>
                  <p style={{ color: '#6b7280' }}>
                    Les paramètres seront disponibles prochainement.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;