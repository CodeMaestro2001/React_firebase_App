import React from 'react';

function TermsAndConditions() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Terms and Conditions</h1>
      <p style={styles.effectiveDate}>Effective Date: 09/10/2024</p>

      <h2 style={styles.sectionTitle}>1. Introduction</h2>
      <p style={styles.text}>
        These terms and conditions govern the use of the <strong>CyberAware: Employee Security Awareness App</strong> (referred to as "the App"). By accessing or using the App, you agree to comply with these terms.
      </p>

      <h2 style={styles.sectionTitle}>2. User Responsibilities</h2>
      <p style={styles.text}>
        - Users must provide accurate and up-to-date information during registration.
        <br />
        - Access to the App is for <strong>authorized users only</strong>. Sharing login credentials is strictly prohibited.
        <br />
        - Users are required to regularly review and acknowledge security policies through the App.
      </p>

      <h2 style={styles.sectionTitle}>3. Acceptable Use</h2>
      <p style={styles.text}>
        The App is intended for enhancing security awareness and managing policy compliance within VIIT. Unauthorized use, including attempts to bypass security controls or use the App for personal gain, is prohibited.
      </p>

      <h2 style={styles.sectionTitle}>4. User Data</h2>
      <p style={styles.text}>
        By using the App, you agree to the collection and processing of personal and usage data as described in the <strong>Privacy Policy</strong>. You are responsible for ensuring the security of your account credentials.
      </p>

      <h2 style={styles.sectionTitle}>5. Compliance and Training</h2>
      <p style={styles.text}>
        Users are required to complete assigned training modules and assessments within the provided deadlines. The App will monitor compliance, and users will be notified of non-compliance issues.
      </p>

      <h2 style={styles.sectionTitle}>6. Intellectual Property</h2>
      <p style={styles.text}>
        All content within the App, including training materials, policies, and assessments, is the intellectual property of <strong>Vision Institute of Information Technology (VIIT)</strong>. You may not copy, distribute, or use the content for any purpose other than its intended use within the App.
      </p>

      <h2 style={styles.sectionTitle}>7. Limitation of Liability</h2>
      <p style={styles.text}>
        VIIT is not liable for any damages arising from the use of the App, including, but not limited to, data loss, unauthorized access, or technical failures.
      </p>

      <h2 style={styles.sectionTitle}>8. Termination</h2>
      <p style={styles.text}>
        VIIT reserves the right to suspend or terminate access to the App for users found in violation of these terms. This includes non-compliance with security policies, misuse of the App, or any other breach of the terms.
      </p>

      <h2 style={styles.sectionTitle}>9. Amendments</h2>
      <p style={styles.text}>
        These terms may be updated periodically. Users will be notified of any changes, and continued use of the App after updates will constitute acceptance of the new terms.
      </p>

      <h2 style={styles.sectionTitle}>10. Contact Information</h2>
      <p style={styles.text}>
        For any questions or concerns regarding these terms and conditions, please contact:
        <br />
        [Insert Contact Information]
      </p>
    </div>
  );
}

// Styles for the Terms and Conditions page
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
  },
  text: {
    fontSize: '16px',
    color: '#333',
    marginBottom: '20px',
    lineHeight: '1.8',
  },
};

export default TermsAndConditions;
