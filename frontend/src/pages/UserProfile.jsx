import React, { useEffect, useState } from 'react';

const UserProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
<<<<<<< HEAD:loomina_frontend/src/pages/UserProfile.jsx
      try {
        const token = localStorage.getItem('token');
=======
      console.log("HELLO!");
      try {
        const token = localStorage.getItem('token');
        console.log(token);
>>>>>>> d676b9dce2375893b371baf7852e7dbab49b2412:frontend/src/pages/UserProfile.jsx
        const response = await fetch('http://localhost:5000/user/user', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          },
        });

        const data = await response.json();

        if (response.ok) {
          setUser(data);
        } else {
          console.log('Failed to fetch user details:', data.message);
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
<<<<<<< HEAD:loomina_frontend/src/pages/UserProfile.jsx
=======

>>>>>>> d676b9dce2375893b371baf7852e7dbab49b2412:frontend/src/pages/UserProfile.jsx
      }
    };

    fetchUser();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-profile">
      <h2>User Profile</h2>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <h3>Reading List:</h3>
      {user.readingList && user.readingList.length > 0 ? (
        <ul>
          {user.readingList.map((item, index) => (
            <li key={index}>
              <p><strong>Thread ID:</strong> {item.threadId}</p>
              <p><strong>Current Spark:</strong> {item.currentSpark}</p>
              <p><strong>Last Access Time:</strong> {new Date(item.lastAccessTime).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No items in the reading list.</p>
      )}
    </div>
  );
  
};

export default UserProfile;