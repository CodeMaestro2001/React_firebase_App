import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { db } from './Firebase'; // Import Firebase Firestore instance
import { collection, addDoc, query, where, getDocs, updateDoc } from 'firebase/firestore';

// Existing categories (cyberSecurity, socialMedia, general)
const cyberSecurityQuestions = [
  { id: 1, question: 'Which of the following is a characteristic of a strong password?', options: ['8 characters long', 'Contains only letters', 'Contains a mix of letters, numbers, and special characters'], answer: 'Contains a mix of letters, numbers, and special characters' },
  { id: 2, question: 'What should you avoid when creating a password?', options: ['Including your name or birthdate', 'Using special characters', 'Using both uppercase and lowercase letters'], answer: 'Including your name or birthdate' },
  { id: 3, question: 'What is the main benefit of Multi-Factor Authentication (MFA)?', options: ['It allows you to recover forgotten passwords', 'It provides an additional layer of security beyond just a password', 'It makes your password longer'], answer: 'It provides an additional layer of security beyond just a password' }
];

const socialMediaQuestions = [
  { id: 1, question: 'Which of the following is a sign of a phishing email?', options: ['Spelling mistakes and suspicious attachments', 'The email contains your name', 'It is from your manager'], answer: 'Spelling mistakes and suspicious attachments' },
  { id: 2, question: 'Phishing via SMS is called:', options: ['Spear phishing', 'Smishing', 'Vishing'], answer: 'Smishing' },
  { id: 3, question: 'If you suspect a phishing email, what should you do first?', options: ['Click the link to verify if it’s legitimate', 'Report it to your IT department', 'Reply asking for more information'], answer: 'Report it to your IT department' }
];

const generalQuestions = [
  { id: 1, question: 'What should you look for to ensure a website is secure?', options: ['HTTP in the URL', 'HTTPS in the URL', 'Any website will do'], answer: 'HTTPS in the URL' },
  { id: 2, question: 'What should you do before opening an email attachment from an unknown sender?', options: ['Open it immediately', 'Verify the sender first', 'Ignore the email'], answer: 'Verify the sender first' },
  { id: 3, question: 'Which of the following is the safest way to browse the internet on public Wi-Fi?', options: ['Avoid public Wi-Fi altogether', 'Use a VPN to encrypt your data', 'Connect to the network without any precautions'], answer: 'Use a VPN to encrypt your data' }
];

// New categories (dataprivacy, devicenetwork)
const dataPrivacyQuestions = [
  { id: 1, question: 'Which of the following is a good practice for protecting personal data?', options: ['Sharing sensitive data on social media', 'Encrypting sensitive information', 'Giving everyone access to all data'], answer: 'Encrypting sensitive information' },
  { id: 2, question: 'Which regulation governs data protection in Europe?', options: ['GDPR', 'DMCA', 'HIPAA'], answer: 'GDPR' },
  { id: 3, question: 'What is one way to protect company data?', options: ['Store all data on unencrypted USB drives', 'Limit access to data based on job roles', 'Share passwords among colleagues'], answer: 'Limit access to data based on job roles' }
];

const deviceNetworkQuestions = [
  { id: 1, question: 'Which of the following should be done to keep your devices secure?', options: ['Disable antivirus software', 'Keep software and firmware updated', 'Use outdated versions of software'], answer: 'Keep software and firmware updated' },
  { id: 2, question: 'What is the safest type of Wi-Fi connection to use?', options: ['Open public Wi-Fi', 'Secure password-protected Wi-Fi', 'Any connection with strong signals'], answer: 'Secure password-protected Wi-Fi' },
  { id: 3, question: 'What should you do if you detect unusual network behavior?', options: ['Ignore it', 'Report it immediately', 'Investigate it yourself'], answer: 'Report it immediately' }
];

// Utility function to shuffle an array (Fisher-Yates algorithm)
const shuffleArray = (array) => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

function Quiz() {
  const [score, setScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [quizFinished, setQuizFinished] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();

  const user = state?.user;
  const category = state?.category;

  // If user or category is not present, redirect to login
  useEffect(() => {
    if (!user || !category) {
      alert('User or category not found. Please log in.');
      navigate('/login');
      return;
    }

    // Set questions based on selected category, shuffle and limit to 10
    let questions = [];
    if (category === 'cyberSecurity') {
      questions = shuffleArray(cyberSecurityQuestions).slice(0, 10);
    } else if (category === 'socialMedia') {
      questions = shuffleArray(socialMediaQuestions).slice(0, 10);
    } else if (category === 'general') {
      questions = shuffleArray(generalQuestions).slice(0, 10);
    } else if (category === 'dataprivacy') {
      questions = shuffleArray(dataPrivacyQuestions).slice(0, 10);
    } else if (category === 'devicenetwork') {
      questions = shuffleArray(deviceNetworkQuestions).slice(0, 10);
    }
    setSelectedQuestions(questions); // Set shuffled and limited questions

  }, [user, category, navigate]);

  const handleAnswer = (option) => {
    if (option === selectedQuestions[currentQuestionIndex].answer) {
      setScore(prevScore => prevScore + 1);
    }

    // Move to next question or finish the quiz
    if (currentQuestionIndex < selectedQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = async () => {
    setQuizFinished(true);

    try {
      // Check if the user already has a score for this category
      const q = query(collection(db, `${category}Leaderboard`), where('email', '==', user.email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // User has an existing entry, overwrite it with the latest score
        const docRef = querySnapshot.docs[0].ref;
        await updateDoc(docRef, { score: score, timestamp: new Date() });
      } else {
        // Add new entry to Firestore
        await addDoc(collection(db, `${category}Leaderboard`), {
          email: user.email,
          score: score,
          timestamp: new Date()
        });
      }

      // Redirect to leaderboard after a delay
      setTimeout(() => {
        navigate('/leaderboard', { state: { user, category } });
      }, 2000); // Delay so user can see their final score

    } catch (error) {
      console.error("Error saving the leaderboard entry: ", error);
    }
  };

  return (
    <div className="quiz-container">
      {!quizFinished ? (
        selectedQuestions.length > 0 ? (
          <>
            <h2>{selectedQuestions[currentQuestionIndex].question}</h2>
            <ul>
              {selectedQuestions[currentQuestionIndex].options.map((option, index) => (
                <li key={index} onClick={() => handleAnswer(option)}>
                  {option}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p>Loading questions...</p>
        )
      ) : (
        <h2>Quiz finished! Your score: {score}</h2>
      )}
    </div>
  );
}

export default Quiz;
