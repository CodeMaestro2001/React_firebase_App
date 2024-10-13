import React from 'react';

function Source() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Cybersecurity Educational Resources</h1>

      {/* Password Security */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Password Security</h2>
        <ul style={styles.linkList}>
          <li><a href="https://www.youtube.com/watch?v=BoyeFozmAXk" style={styles.link}>Video 1: Password Security Basics</a></li>
          <li><a href="https://www.youtube.com/watch?v=Pz86km2cHXY" style={styles.link}>Video 2: How to Create Strong Passwords</a></li>
        </ul>
      </div>

      {/* Phishing Awareness */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Phishing Awareness</h2>
        <ul style={styles.linkList}>
          <li><a href="https://www.youtube.com/watch?v=GZc-CpV5Z1k" style={styles.link}>Video 1: Understanding Phishing</a></li>
          <li><a href="https://www.youtube.com/watch?v=6EmD3k3Pb8Y" style={styles.link}>Video 2: Protecting Yourself from Phishing</a></li>
          <li><a href="https://www.youtube.com/watch?v=XBkzBrXlle0" style={styles.link}>Video 3: Real-life Phishing Examples</a></li>
        </ul>
      </div>

      {/* Safe Internet & Email Usage */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Safe Internet & Email Usage</h2>
        <ul style={styles.linkList}>
          <li><a href="https://www.youtube.com/watch?v=aO858HyFbKI" style={styles.link}>Video 1: Internet Safety Tips</a></li>
          <li><a href="https://www.youtube.com/watch?v=HxySrSbSY7o" style={styles.link}>Video 2: Email Safety Best Practices</a></li>
        </ul>
      </div>

      {/* Data Privacy and Protection */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Data Privacy and Protection</h2>
        <ul style={styles.linkList}>
          <li><a href="https://www.youtube.com/watch?v=6vNxslcf9AE" style={styles.link}>Video 1: Protecting Your Personal Data</a></li>
          <li><a href="https://www.youtube.com/watch?v=ZNEPaGFApX4" style={styles.link}>Video 2: Data Privacy Regulations</a></li>
          <li><a href="https://www.youtube.com/watch?v=acijNEErf-c" style={styles.link}>Video 3: Privacy in the Digital Age</a></li>
        </ul>
      </div>

      {/* Device and Network Protection */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Device and Network Protection</h2>
        <ul style={styles.linkList}>
          <li><a href="https://www.youtube.com/watch?v=9GZlVOafYTg&t=151s" style={styles.link}>Video 1: Securing Your Devices</a></li>
          <li><a href="https://www.youtube.com/watch?v=7zWVxrjjIpE" style={styles.link}>Video 2: Network Protection Techniques</a></li>
          <li><a href="https://www.youtube.com/watch?v=t7IK-2Cace8" style={styles.link}>Video 3: Best Practices for Network Security</a></li>
        </ul>
      </div>
    </div>
  );
}

// Internal CSS styles
const styles = {
  container: {
    padding: '20px',
    fontFamily: '"Arial", sans-serif',
    backgroundColor: '#ADD8E6',
  },
  title: {
    textAlign: 'center',
    color: '#333',
    fontSize: '36px',
    marginBottom: '30px',
    textTransform: 'uppercase',
    letterSpacing: '1.2px',
  },
  section: {
    marginBottom: '40px',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  sectionTitle: {
    color: '#007bff',
    fontSize: '28px',
    marginBottom: '15px',
    borderBottom: '2px solid #007bff',
    paddingBottom: '10px',
  },
  linkList: {
    listStyleType: 'none',
    paddingLeft: '0',
  },
  link: {
    display: 'block',
    color: '#ADD8E6',
    fontSize: '18px',
    marginBottom: '10px',
    textDecoration: 'none',
    transition: 'color 0.3s ease',
  },

  
};

export default Source;
