import React, { useState, useRef, useEffect } from 'react';
import { Share2, Facebook, Twitter, MessageCircle, Copy, Check, Mail, QrCode, X, Link as LinkIcon } from 'lucide-react';
import toast from 'react-hot-toast';

const EnhancedShareButton = ({ 
  title, 
  text, 
  url, 
  image,
  variant = 'default',
  showQRCode = true
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const menuRef = useRef(null);

  const shareUrl = url || window.location.href;
  const shareTitle = title || 'Conakry en Poche';
  const shareText = text || 'Découvrez cette adresse sur Conakry en Poche';

  // Générer le QR code avec Canvas API (sans dépendance externe)
  useEffect(() => {
    if (showQR && shareUrl) {
      generateQRCode(shareUrl);
    }
  }, [showQR, shareUrl]);

  // Fonction simple pour générer un QR code basique (pattern simplifié)
  const generateQRCode = (url) => {
    // Pour une vraie implémentation, on utiliserait une bibliothèque comme qrcode
    // Pour l'instant, on utilise un service en ligne ou on crée un pattern simple
    const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(url)}`;
    setQrCodeUrl(qrApiUrl);
  };

  // Fermer le menu si clic en dehors
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
        setShowQR(false);
      }
    };

    if (showMenu || showQR) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showMenu, showQR]);

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        const shareData = {
          title: shareTitle,
          text: shareText,
          url: shareUrl
        };
        
        if (image) {
          try {
            const response = await fetch(image);
            const blob = await response.blob();
            const file = new File([blob], 'image.jpg', { type: blob.type });
            shareData.files = [file];
          } catch (error) {
            console.warn('Impossible d\'inclure l\'image:', error);
          }
        }

        await navigator.share(shareData);
        toast.success('Partagé avec succès !');
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Erreur de partage:', error);
          setShowMenu(true);
        }
      }
    } else {
      setShowMenu(true);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success('Lien copié dans le presse-papier !');
      setTimeout(() => {
        setCopied(false);
        setShowMenu(false);
      }, 2000);
    } catch (error) {
      console.error('Erreur de copie:', error);
      toast.error('Impossible de copier le lien');
    }
  };

  const shareToFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(facebookUrl, '_blank', 'width=600,height=400');
    setShowMenu(false);
    toast.success('Ouverture de Facebook...');
  };

  const shareToTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(twitterUrl, '_blank', 'width=600,height=400');
    setShowMenu(false);
    toast.success('Ouverture de Twitter/X...');
  };

  const shareToWhatsApp = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`;
    window.open(whatsappUrl, '_blank');
    setShowMenu(false);
    toast.success('Ouverture de WhatsApp...');
  };

  const shareViaEmail = () => {
    const emailUrl = `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(`${shareText}\n\n${shareUrl}`)}`;
    window.location.href = emailUrl;
    setShowMenu(false);
  };

  const shareToLinkedIn = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    window.open(linkedInUrl, '_blank', 'width=600,height=400');
    setShowMenu(false);
    toast.success('Ouverture de LinkedIn...');
  };

  const shareToTelegram = () => {
    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
    window.open(telegramUrl, '_blank');
    setShowMenu(false);
    toast.success('Ouverture de Telegram...');
  };

  const handleShowQR = () => {
    setShowQR(true);
    setShowMenu(false);
  };

  const downloadQR = () => {
    if (qrCodeUrl) {
      const link = document.createElement('a');
      link.download = `qrcode-${shareTitle.replace(/\s+/g, '-')}.png`;
      link.href = qrCodeUrl;
      link.click();
      toast.success('QR code téléchargé !');
    }
  };

  const shareOptions = [
    { icon: Facebook, label: 'Facebook', action: shareToFacebook, color: '#1877f2' },
    { icon: Twitter, label: 'Twitter/X', action: shareToTwitter, color: '#1da1f2' },
    { icon: MessageCircle, label: 'WhatsApp', action: shareToWhatsApp, color: '#25d366' },
    { icon: Mail, label: 'Email', action: shareViaEmail, color: '#6b7280' },
    { icon: LinkIcon, label: 'LinkedIn', action: shareToLinkedIn, color: '#0077b5' },
    { icon: Share2, label: 'Telegram', action: shareToTelegram, color: '#0088cc' },
    { icon: copied ? Check : Copy, label: copied ? 'Copié !' : 'Copier le lien', action: handleCopy, color: copied ? '#10b981' : '#6b7280' }
  ];

  if (showQRCode) {
    shareOptions.push({
      icon: QrCode,
      label: 'QR Code',
      action: handleShowQR,
      color: '#3b82f6'
    });
  }

  return (
    <>
      <div style={{ position: 'relative' }} ref={menuRef}>
        {variant === 'icon' ? (
          <button
            onClick={handleNativeShare}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#2563eb';
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#3b82f6';
              e.currentTarget.style.transform = 'scale(1)';
            }}
            aria-label="Partager"
          >
            <Share2 size={20} />
          </button>
        ) : (
          <button
            onClick={handleNativeShare}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
          >
            <Share2 size={20} />
            Partager
          </button>
        )}

        {showMenu && (
          <>
            <div
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 998,
                backgroundColor: 'rgba(0, 0, 0, 0.3)'
              }}
              onClick={() => setShowMenu(false)}
            />
            <div
              style={{
                position: 'absolute',
                bottom: variant === 'icon' ? 'calc(100% + 10px)' : 'calc(100% + 10px)',
                left: variant === 'icon' ? '50%' : 0,
                transform: variant === 'icon' ? 'translateX(-50%)' : 'none',
                backgroundColor: 'white',
                borderRadius: '0.75rem',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
                padding: '0.5rem',
                zIndex: 999,
                minWidth: '220px',
                maxWidth: '300px'
              }}
            >
              <div style={{
                padding: '0.5rem 0.75rem',
                borderBottom: '1px solid #e5e7eb',
                marginBottom: '0.5rem',
                fontSize: '0.875rem',
                fontWeight: '600',
                color: '#374151'
              }}>
                Partager sur
              </div>
              {shareOptions.map(({ icon: Icon, label, action, color }) => (
                <button
                  key={label}
                  onClick={action}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: '0.5rem',
                    border: 'none',
                    backgroundColor: 'transparent',
                    color: '#1f2937',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    transition: 'background-color 0.2s',
                    textAlign: 'left'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <Icon size={20} color={color} />
                  {label}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Modal QR Code */}
      {showQR && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10000,
            padding: '1rem'
          }}
          onClick={() => setShowQR(false)}
        >
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '1rem',
              padding: '2rem',
              maxWidth: '400px',
              width: '100%',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1.5rem'
            }}>
              <h3 style={{
                margin: 0,
                fontSize: '1.25rem',
                fontWeight: '700',
                color: '#1f2937'
              }}>
                QR Code
              </h3>
              <button
                onClick={() => setShowQR(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '0.5rem',
                  borderRadius: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  color: '#6b7280'
                }}
              >
                <X size={24} />
              </button>
            </div>

            {qrCodeUrl ? (
              <>
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginBottom: '1.5rem',
                  padding: '1rem',
                  backgroundColor: '#f9fafb',
                  borderRadius: '0.75rem'
                }}>
                  <img
                    src={qrCodeUrl}
                    alt="QR Code"
                    style={{
                      maxWidth: '100%',
                      height: 'auto',
                      borderRadius: '0.5rem'
                    }}
                  />
                </div>
                <p style={{
                  margin: '0 0 1rem 0',
                  fontSize: '0.875rem',
                  color: '#6b7280',
                  textAlign: 'center'
                }}>
                  Scannez ce code QR pour accéder rapidement
                </p>
                <div style={{
                  display: 'flex',
                  gap: '0.75rem'
                }}>
                  <button
                    onClick={downloadQR}
                    style={{
                      flex: 1,
                      padding: '0.75rem',
                      backgroundColor: '#3b82f6',
                      color: 'white',
                      border: 'none',
                      borderRadius: '0.5rem',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
                  >
                    Télécharger
                  </button>
                  <button
                    onClick={handleCopy}
                    style={{
                      flex: 1,
                      padding: '0.75rem',
                      backgroundColor: '#f3f4f6',
                      color: '#374151',
                      border: 'none',
                      borderRadius: '0.5rem',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e5e7eb'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                  >
                    Copier le lien
                  </button>
                </div>
              </>
            ) : (
              <div style={{
                textAlign: 'center',
                padding: '2rem',
                color: '#6b7280'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  border: '3px solid #e5e7eb',
                  borderTop: '3px solid #3b82f6',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                  margin: '0 auto 1rem'
                }} />
                Génération du QR code...
              </div>
            )}
          </div>
        </div>
      )}

      {/* Style pour l'animation spin */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
};

export default EnhancedShareButton;
