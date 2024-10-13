import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from './Firebase'; // Import Firebase auth and Firestore
import { doc, getDoc, updateDoc } from 'firebase/firestore'; // Firestore methods
import NavigationBar from './NavigationBar';

function Profile() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // For toggling edit mode
  const [editData, setEditData] = useState({ name: '', email: '', role: '', department: '', profilePicture: '' }); // For form data
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = auth.currentUser; // Get logged-in user from Firebase Authentication

    if (!currentUser) {
      alert('Please log in to view your profile.');
      navigate('/login');
    } else {
      fetchUserData(currentUser.uid); // Fetch user data from Firestore
    }
  }, [navigate]);

  // Fetch user data from Firestore based on user UID
  const fetchUserData = async (userId) => {
    try {
      const userRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        // Merge Firebase data with profile picture from localStorage
        const storedProfilePicture = localStorage.getItem('profilePicture') || '';
        setUser({ ...userData, profilePicture: storedProfilePicture });
        setEditData({ ...userData, profilePicture: storedProfilePicture });
      } else {
        console.log('No such user found in Firestore.');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  // Handle profile updates
  const handleUpdateProfile = async () => {
    try {
      const userRef = doc(db, 'users', auth.currentUser.uid);
      // Update only Firestore fields (name, role, department)
      await updateDoc(userRef, {
        name: editData.name,
        role: editData.role,
        department: editData.department,
      });

      // Update profile picture in localStorage
      localStorage.setItem('profilePicture', editData.profilePicture);

      setUser(editData);
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile.');
    }
  };

  // Handle profile picture upload
  const handleProfilePictureUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const compressedBase64 = await compressImage(file);
        setEditData({ ...editData, profilePicture: compressedBase64 });
      } catch (error) {
        console.error('Failed to upload the image.', error);
      }
    }
  };

  // Compress image function
  const compressImage = (file, maxWidth = 150, maxHeight = 150) => {
    return new Promise((resolve, reject) => {
      const img = document.createElement('img');
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        img.src = e.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          let width = img.width;
          let height = img.height;
          if (width > height) {
            if (width > maxWidth) {
              height *= maxWidth / width;
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width *= maxHeight / height;
              height = maxHeight;
            }
          }
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);
          canvas.toBlob((blob) => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
              resolve(reader.result); // Compressed base64 string
            };
          }, 'image/jpeg', 0.7); // Compress to JPEG format with quality 0.7
        };
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const goToQuiz = () => {
    navigate('/quiz-home', { state: { user } }); // Pass the user to the quiz page
  };

  

  return (
    <div>
      <NavigationBar/>
    <div style={pageStyle}>
        

      <div style={profileContainerStyle}>
        <h2 style={titleStyle}>User Profile</h2>
        {user ? (
          isEditing ? (
            <div style={editProfileStyle}>
              <input
                type="text"
                value={editData.name}
                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                placeholder="Name"
                style={inputStyle}
              />
              <input
                type="email"
                value={editData.email}
                disabled // Prevent email change
                placeholder="Email"
                style={inputStyle}
              />
              <input
                type="text"
                value={editData.role}
                onChange={(e) => setEditData({ ...editData, role: e.target.value })}
                placeholder="Role"
                style={inputStyle}
              />
              <input
                type="text"
                value={editData.department}
                onChange={(e) => setEditData({ ...editData, department: e.target.value })}
                placeholder="Department"
                style={inputStyle}
              />
              <input type="file" onChange={handleProfilePictureUpload} style={fileInputStyle} />
              <div style={buttonGroupStyle}>
                <button onClick={handleUpdateProfile} style={saveButtonStyle}>Save Changes</button>
                <button onClick={() => setIsEditing(false)} style={cancelButtonStyle}>Cancel</button>
              </div>
            </div>
          ) : (
            <div style={profileDetailsStyle}>
              {/* Profile Picture */}
              <div style={profilePictureContainerStyle}>
                {user.profilePicture ? (
                  <img src={user.profilePicture} alt="Profile" style={profilePictureStyle} />
                ) : (
                  <p>No profile picture uploaded</p>
                )}
              </div>
              <p style={detailStyle}><strong>Name:</strong> {user.name}</p>
              <p style={detailStyle}><strong>Email:</strong> {user.email}</p>
              <p style={detailStyle}><strong>Role:</strong> {user.role || 'Not provided'}</p>
              <p style={detailStyle}><strong>Department:</strong> {user.department || 'Not provided'}</p>
              <div style={buttonGroupStyle}>
                <button onClick={() => setIsEditing(true)} style={editButtonStyle}>Edit Profile</button>
                <button onClick={goToQuiz} style={quizButtonStyle} >Go to Quiz</button>
              </div>
            </div>
          )
        ) : (
          <p style={loadingStyle}>Loading...</p>
        )}

      </div>
    </div>
    </div>
  );
}

// CSS Styles
const pageStyle = {
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'linear-gradient(135deg, #f7f9fc, #dfe7ec)',
  padding: '20px',
  fontFamily: 'Arial, sans-serif'
};

const profileContainerStyle = {
  background: '#FFFFFF',
  border: '1px solid #E1E1E1',
  borderRadius: '12px',
  padding: '30px',
  width: '400px',
  boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.1)',
  textAlign: 'center',
};

const titleStyle = {
  color: '#333',
  marginBottom: '20px',
  fontSize: '24px',
  fontWeight: '600',
};

const profileDetailsStyle = {
  textAlign: 'left',
};

const profilePictureContainerStyle = {
  textAlign: 'center',
  marginBottom: '20px',
};

const profilePictureStyle = {
  width: '150px',
  height: '150px',
  borderRadius: '50%',
  objectFit: 'cover',
};

const fileInputStyle = {
  marginBottom: '15px',
};

const detailStyle = {
  marginBottom: '15px',
  fontSize: '16px',
  color: '#333',
};

const editProfileStyle = {
  textAlign: 'left',
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  marginBottom: '15px',
  fontSize: '16px',
  borderRadius: '6px',
  border: '1px solid #DDD',
};

const buttonGroupStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '20px',
};

const editButtonStyle = {
  padding: '10px 20px',
  backgroundColor: '#4A90E2',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
};

const saveButtonStyle = {
  padding: '10px 20px',
  backgroundColor: '#2ECC71',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
};

const cancelButtonStyle = {
  padding: '10px 20px',
  backgroundColor: '#FF6B6B',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
};

const loadingStyle = {
  fontSize: '18px',
  color: '#555',
};

const quizButtonStyle = {
  marginTop: '20px',
  padding: '10px 20px',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
};


export default Profile;
