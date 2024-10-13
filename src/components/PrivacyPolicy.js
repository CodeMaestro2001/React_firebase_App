import React from 'react';

function PrivacyPolicy() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Privacy Policy for CyberAware App</h1>
      <p style={styles.effectiveDate}><strong>Effective Date</strong>: 09/10/2024</p>

      <h2 style={styles.sectionTitle}>1. Introduction</h2>
      <p style={styles.text}>
        Welcome to the <strong>CyberAware: Employee Security Awareness App</strong>. This privacy policy outlines how we collect, use, and protect the personal information of our users. By using the App, you agree to the collection and use of information in accordance with this policy.
      </p>

      <h2 style={styles.sectionTitle}>2. Information We Collect</h2>
      <p style={styles.text}>
        - <strong>Personal Information</strong>: We collect information that you provide when registering for the App, such as your name, email address, and contact details.
        <br />
        - <strong>Usage Data</strong>: The App may collect information on how the service is accessed and used, including device type, app interactions, and pages visited.
        <br />
        - <strong>Compliance Data</strong>: Information related to your engagement with security training modules, policy acknowledgment, and assessments.
      </p>

      <h2 style={styles.sectionTitle}>3. How We Use Your Information</h2>
      <p style={styles.text}>
        - To manage your account and provide you with access to the App's features.
        <br />
        - To monitor compliance with security policies and track completion of training.
        <br />
        - To enhance the security and functionality of the App through updates and improvements.
        <br />
        - To notify you of any changes in policies or App features.
      </p>

      <h2 style={styles.sectionTitle}>4. Data Security</h2>
      <p style={styles.text}>
        Your personal information is stored securely, and access is limited to authorized personnel. We use encryption and secure authentication measures to protect your data. However, no method of transmission over the internet is entirely secure, and we cannot guarantee absolute security.
      </p>

      <h2 style={styles.sectionTitle}>5. Data Sharing</h2>
      <p style={styles.text}>
        We do not share your personal information with third parties, except:
        <br />
        - To comply with legal obligations.
        <br />
        - To protect the rights and safety of VIIT and its users.
        <br />
        - With service providers who support the operation of the App, bound by confidentiality agreements.
      </p>

      <h2 style={styles.sectionTitle}>6. Data Retention</h2>
      <p style={styles.text}>
        We retain personal data only as long as necessary to fulfill the purposes for which it was collected, or as required by law.
      </p>

      <h2 style={styles.sectionTitle}>7. Your Rights</h2>
      <p style={styles.text}>
        You have the right to:
        <br />
        - Access and update your personal information.
        <br />
        - Request the deletion of your data.
        <br />
        - Withdraw consent for data collection and processing at any time.
      </p>

      <h2 style={styles.sectionTitle}>8. Amendments</h2>
      <p style={styles.text}>
        We may update this privacy policy periodically. Users will be notified of any significant changes, and continued use of the App constitutes acceptance of the updated policy.
      </p>

      <h2 style={styles.sectionTitle}>9. Contact Information</h2>
      <p style={styles.text}>
        For questions or concerns about this privacy policy, please contact us at:
        <br />
        [Insert Contact Information]
      </p>
    </div>
  );
}

// Styles for the Privacy Policy page
const styles = {
  container: {
    padding: '20px',
    maxWidth: '900px',
    margin: 'auto',
    backgroundColor: '#f9f9f9',
    fontFamily: 'Arial, sans-serif',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    lineHeight: '1.6',
  },
  title: {
    fontSize: '32px',
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333',
  },
  effectiveDate: {
    fontSize: '14px',
    textAlign: 'center',
    color: '#666',
    marginBottom: '30px',
  },
  sectionTitle: {
    fontSize: '24px',
    color: '#007bff',
    marginTop: '20px',
    marginBottom: '10px',
    borderBottom: '2px solid #007bff',
    paddingBottom: '5px',
  },
  text: {
    fontSize: '16px',
    color: '#333',
    marginBottom: '20px',
    lineHeight: '1.8',
  },
};

export default PrivacyPolicy;
