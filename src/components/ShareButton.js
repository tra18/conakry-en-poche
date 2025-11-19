import React, { useState } from 'react';
import { Share2, Facebook, Twitter, WhatsApp, Copy, Check, Mail } from 'lucide-react';
import toast from 'react-hot-toast';

const ShareButton = ({ 
  title, 
  text, 
  url, 
  variant = 'default' // 'default', 'icon', 'full'
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareUrl = url || window.location.href;
  const shareTitle = title || 'Conakry en Poche';
  const shareText = text || 'Découvrez cette adresse sur Conakry en Poche';

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl
        });
        toast.success('Partagé avec succès !');
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Erreur de partage:', error);
        }
      }
    } else {
      setShowMenu(!showMenu);
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
    toast.success('Ouverture de Twitter...');
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

  if (variant === 'icon') {
    return (
      <div style={{ position: 'relative' }}>
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

        {showMenu && (
          <>
            <div
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 998
              }}
              onClick={() => setShowMenu(false)}
            />
            <div
              style={{
                position: 'absolute',
                bottom: 'calc(100% + 10px)',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: 'white',
                borderRadius: '0.75rem',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
                padding: '0.5rem',
                zIndex: 999,
                minWidth: '200px'
              }}
            >
              {[
                { icon: Facebook, label: 'Facebook', action: shareToFacebook, color: '#1877f2' },
                { icon: Twitter, label: 'Twitter', action: shareToTwitter, color: '#1da1f2' },
                { icon: WhatsApp, label: 'WhatsApp', action: shareToWhatsApp, color: '#25d366' },
                { icon: Mail, label: 'Email', action: shareViaEmail, color: '#6b7280' },
                { icon: copied ? Check : Copy, label: copied ? 'Copié !' : 'Copier le lien', action: handleCopy, color: copied ? '#10b981' : '#6b7280' }
              ].map(({ icon: Icon, label, action, color }) => (
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
    );
  }

  return (
    <div style={{ position: 'relative' }}>
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

      {showMenu && (
        <>
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 998
            }}
            onClick={() => setShowMenu(false)}
          />
          <div
            style={{
              position: 'absolute',
              top: 'calc(100% + 10px)',
              left: 0,
              backgroundColor: 'white',
              borderRadius: '0.75rem',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
              padding: '0.5rem',
              zIndex: 999,
              minWidth: '200px'
            }}
          >
            {[
              { icon: Facebook, label: 'Facebook', action: shareToFacebook, color: '#1877f2' },
              { icon: Twitter, label: 'Twitter', action: shareToTwitter, color: '#1da1f2' },
              { icon: WhatsApp, label: 'WhatsApp', action: shareToWhatsApp, color: '#25d366' },
              { icon: Mail, label: 'Email', action: shareViaEmail, color: '#6b7280' },
              { icon: copied ? Check : Copy, label: copied ? 'Copié !' : 'Copier le lien', action: handleCopy, color: copied ? '#10b981' : '#6b7280' }
            ].map(({ icon: Icon, label, action, color }) => (
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
  );
};

export default ShareButton;







