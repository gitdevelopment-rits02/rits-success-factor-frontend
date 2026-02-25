import React from 'react';
// Using your specified path
import notFoundImage from "../../../assets/not-found/image.png";

const NotFoundPage = () => {
  return (
    <div style={styles.container}>
      {/* Header Logo Area */}
      <div style={styles.header}>
        <span style={styles.hrmsText}>HRMS</span>
        <span style={styles.heartIcon}></span>
        <span style={styles.sfText}>SuccessFactors</span>
      </div>

      {/* The 404 Image - Ensured to stay horizontal */}
      <div style={styles.imageWrapper}>
        <img 
          src={notFoundImage} 
          alt="404 Page Not Found" 
          style={styles.image} 
        />
      </div>

      {/* Text Content */}
      <h1 style={styles.title}>Page Not Found</h1>
      <p style={styles.subtitle}>The page you’re looking for doesn’t exist.</p>
      
      <hr style={styles.divider} />

      <a href="/" style={styles.link}>
        <span style={{ marginRight: '8px' }}>→</span>
        Please go back to the homepage.
      </a>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    color: '#003d73', // SuccessFactors Navy Blue
    backgroundColor: '#d5f1fb',
    padding: '20px',
  },
  header: {
    marginBottom: '20px',
    fontSize: '24px',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
  },
  hrmsText: { color: '#0070d2' },
  heartIcon: { margin: '0 5px', fontSize: '18px' },
  sfText: { color: '#444' },
  imageWrapper: {
    width: '100%',
    maxWidth: '500px', // Prevents it from getting too huge
    display: 'flex',
    justifyContent: 'center',
  },
  image: {
    width: '100%',      // Keeps it responsive
    height: 'auto',     // Maintains aspect ratio (keeps it horizontal)
    display: 'block',
  },
  title: {
    fontSize: '32px',
    margin: '20px 0 10px 0',
    fontWeight: '700',
  },
  subtitle: {
    fontSize: '18px',
    color: '#666',
    margin: '0 0 20px 0',
  },
  divider: {
    width: '400px',
    border: 'none',
    borderTop: '1px solid #e0e0e0',
    marginBottom: '20px',
  },
  link: {
    color: '#0070d2',
    textDecoration: 'none',
    fontSize: '18px',
    fontWeight: '600',
  }
};

export default NotFoundPage;