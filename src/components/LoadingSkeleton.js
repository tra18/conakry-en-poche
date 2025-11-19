import React from 'react';

const Skeleton = ({ width, height, borderRadius = '0.5rem', className = '' }) => (
  <div
    className={className}
    style={{
      width: width || '100%',
      height: height || '1rem',
      borderRadius,
      backgroundColor: '#e5e7eb',
      animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      '@keyframes pulse': {
        '0%, 100%': { opacity: 1 },
        '50%': { opacity: 0.5 }
      }
    }}
  />
);

export const BusinessCardSkeleton = () => (
  <div style={{
    backgroundColor: 'white',
    borderRadius: '1rem',
    padding: '1.5rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    marginBottom: '1.5rem'
  }}>
    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
      <Skeleton width="80px" height="80px" borderRadius="0.75rem" />
      <div style={{ flex: 1 }}>
        <Skeleton width="60%" height="1.5rem" style={{ marginBottom: '0.5rem' }} />
        <Skeleton width="40%" height="1rem" />
      </div>
    </div>
    <Skeleton width="100%" height="1rem" style={{ marginBottom: '0.5rem' }} />
    <Skeleton width="80%" height="1rem" />
  </div>
);

export const CategoryCardSkeleton = () => (
  <div style={{
    backgroundColor: 'white',
    borderRadius: '1.25rem',
    padding: '2rem',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
    minHeight: '200px'
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
      <Skeleton width="3rem" height="3rem" borderRadius="0.5rem" />
      <div style={{ flex: 1 }}>
        <Skeleton width="70%" height="1.5rem" style={{ marginBottom: '0.5rem' }} />
        <Skeleton width="50%" height="1rem" />
      </div>
    </div>
    <Skeleton width="100%" height="1rem" style={{ marginBottom: '0.5rem' }} />
    <Skeleton width="80%" height="1rem" />
  </div>
);

export const NewsCardSkeleton = () => (
  <div style={{
    backgroundColor: 'white',
    borderRadius: '1rem',
    overflow: 'hidden',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
  }}>
    <Skeleton width="100%" height="200px" borderRadius="0" />
    <div style={{ padding: '1.5rem' }}>
      <Skeleton width="40%" height="1rem" style={{ marginBottom: '0.75rem' }} />
      <Skeleton width="90%" height="1.5rem" style={{ marginBottom: '0.5rem' }} />
      <Skeleton width="100%" height="1rem" style={{ marginBottom: '0.5rem' }} />
      <Skeleton width="80%" height="1rem" />
    </div>
  </div>
);

export const PageSkeleton = () => (
  <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
    <Skeleton width="40%" height="2.5rem" style={{ marginBottom: '2rem' }} />
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
      {[...Array(6)].map((_, i) => (
        <BusinessCardSkeleton key={i} />
      ))}
    </div>
  </div>
);

export default Skeleton;







