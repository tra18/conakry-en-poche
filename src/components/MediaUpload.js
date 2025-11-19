import React, { useState, useRef } from 'react';

const MediaUpload = ({ onMediaChange, initialMedia = null, accept = "image/*,video/*" }) => {
  const [selectedMedia, setSelectedMedia] = useState(initialMedia);
  const [preview, setPreview] = useState(initialMedia);
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  // Types de fichiers supportés
  const supportedImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  const supportedVideoTypes = ['video/mp4', 'video/webm', 'video/ogg', 'video/avi', 'video/mov'];
  const supportedTypes = [...supportedImageTypes, ...supportedVideoTypes];

  // Fonction pour valider le type de fichier
  const validateFile = (file) => {
    if (!supportedTypes.includes(file.type)) {
      return { valid: false, error: 'Type de fichier non supporté. Utilisez des images (JPEG, PNG, GIF, WebP) ou des vidéos (MP4, WebM, OGG, AVI, MOV).' };
    }

    // Limite de taille : 10MB pour les images, 50MB pour les vidéos
    const maxImageSize = 10 * 1024 * 1024; // 10MB
    const maxVideoSize = 50 * 1024 * 1024; // 50MB

    if (supportedImageTypes.includes(file.type) && file.size > maxImageSize) {
      return { valid: false, error: 'Image trop volumineuse. Taille maximum : 10MB.' };
    }

    if (supportedVideoTypes.includes(file.type) && file.size > maxVideoSize) {
      return { valid: false, error: 'Vidéo trop volumineuse. Taille maximum : 50MB.' };
    }

    return { valid: true };
  };

  // Fonction pour convertir le fichier en base64 (simulation d'upload)
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // Gestionnaire de sélection de fichier
  const handleFileSelect = async (files) => {
    const file = files[0];
    if (!file) return;

    const validation = validateFile(file);
    if (!validation.valid) {
      alert(validation.error);
      return;
    }

    setUploading(true);
    try {
      const base64 = await fileToBase64(file);
      const mediaData = {
        type: file.type,
        name: file.name,
        size: file.size,
        data: base64,
        url: base64 // Pour l'affichage
      };

      setSelectedMedia(mediaData);
      setPreview(base64);
      onMediaChange(mediaData);
    } catch (error) {
      console.error('Erreur lors de l\'upload:', error);
      alert('Erreur lors de l\'upload du fichier');
    } finally {
      setUploading(false);
    }
  };

  // Gestionnaires d'événements
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    handleFileSelect(files);
  };

  const handleFileInputChange = (e) => {
    const files = e.target.files;
    handleFileSelect(files);
  };

  const handleRemoveMedia = () => {
    setSelectedMedia(null);
    setPreview(null);
    onMediaChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClickUpload = () => {
    fileInputRef.current?.click();
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const isVideo = selectedMedia?.type?.startsWith('video/');
  const isImage = selectedMedia?.type?.startsWith('image/');

  return (
    <div style={{ width: '100%' }}>
      {/* Zone de drop */}
      <div
        style={{
          border: `2px dashed ${dragOver ? '#3b82f6' : '#d1d5db'}`,
          borderRadius: '0.75rem',
          padding: '2rem',
          textAlign: 'center',
          backgroundColor: dragOver ? '#f0f9ff' : '#fafafa',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          position: 'relative'
        }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClickUpload}
      >
        {uploading ? (
          <div>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⏳</div>
            <p style={{ color: '#6b7280', margin: 0 }}>Upload en cours...</p>
          </div>
        ) : preview ? (
          <div>
            {isImage && (
              <img
                src={preview}
                alt="Preview"
                style={{
                  maxWidth: '100%',
                  maxHeight: '200px',
                  borderRadius: '0.5rem',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
            )}
            {isVideo && (
              <video
                src={preview}
                controls
                style={{
                  maxWidth: '100%',
                  maxHeight: '200px',
                  borderRadius: '0.5rem',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
            )}
            <div style={{ marginTop: '1rem' }}>
              <p style={{ margin: '0.5rem 0', fontWeight: '600', color: '#374151' }}>
                {selectedMedia.name}
              </p>
              <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280' }}>
                {formatFileSize(selectedMedia.size)} • {isImage ? '🖼️ Image' : '🎥 Vidéo'}
              </p>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveMedia();
              }}
              style={{
                marginTop: '1rem',
                backgroundColor: '#ef4444',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                padding: '0.5rem 1rem',
                fontSize: '0.875rem',
                cursor: 'pointer'
              }}
            >
              🗑️ Supprimer
            </button>
          </div>
        ) : (
          <div>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📁</div>
            <p style={{ fontSize: '1.125rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
              Glissez-déposez votre fichier ici
            </p>
            <p style={{ color: '#6b7280', marginBottom: '1rem' }}>
              ou cliquez pour sélectionner un fichier
            </p>
            <div style={{ fontSize: '0.875rem', color: '#9ca3af' }}>
              <p style={{ margin: '0.25rem 0' }}>📸 Images : JPEG, PNG, GIF, WebP (max 10MB)</p>
              <p style={{ margin: '0.25rem 0' }}>🎥 Vidéos : MP4, WebM, OGG, AVI, MOV (max 50MB)</p>
            </div>
          </div>
        )}

        {/* Input file caché */}
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileInputChange}
          style={{ display: 'none' }}
        />
      </div>

      {/* Informations supplémentaires */}
      {selectedMedia && (
        <div style={{
          marginTop: '1rem',
          padding: '1rem',
          backgroundColor: '#f8fafc',
          borderRadius: '0.5rem',
          border: '1px solid #e2e8f0'
        }}>
          <h4 style={{ fontSize: '0.875rem', fontWeight: '600', color: '#374151', margin: '0 0 0.5rem 0' }}>
            📋 Informations du fichier
          </h4>
          <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
            <p style={{ margin: '0.25rem 0' }}>
              <strong>Nom :</strong> {selectedMedia.name}
            </p>
            <p style={{ margin: '0.25rem 0' }}>
              <strong>Taille :</strong> {formatFileSize(selectedMedia.size)}
            </p>
            <p style={{ margin: '0.25rem 0' }}>
              <strong>Type :</strong> {selectedMedia.type}
            </p>
            <p style={{ margin: '0.25rem 0' }}>
              <strong>Format :</strong> {isImage ? 'Image' : 'Vidéo'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaUpload;
