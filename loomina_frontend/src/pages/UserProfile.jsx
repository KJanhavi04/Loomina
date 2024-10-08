import React, { useEffect, useState } from 'react';

const UserProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/user', {
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