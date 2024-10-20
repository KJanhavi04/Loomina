import React, { useEffect, useState } from "react";
import "../../css/main/user.css"; // Import the CSS file
import MasterPage from "../../components/master/Master";

const UserProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:5000/user/user", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          setUser(data);
        } else {
          console.log("Failed to fetch user details:", data.message);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUser();
  }, []);

  if (!user) {
    return <div className="loading-message">Loading...</div>;
  }

  return (
    <MasterPage>
      <div className="user-profile-container">
        <h2 className="profile-heading">User Profile</h2>
        <div className="user-details">
          <p>
            <strong>Username:</strong> {user.username}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
        </div>
        <h3 className="sub-heading">Reading List:</h3>
        {user.readingList && user.readingList.length > 0 ? (
          <ul className="reading-list">
            {user.readingList.map((item, index) => (
              <li key={index} className="reading-list-item">
                <p>
                  <strong>Thread ID:</strong> {item.threadId}
                </p>
                <p>
                  <strong>Current Spark:</strong> {item.currentSpark}
                </p>
                <p>
                  <strong>Last Access Time:</strong>{" "}
                  {new Date(item.lastAccessTime).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-items">No items in the reading list.</p>
        )}
      </div>
    </MasterPage>
  );
};

export default UserProfile;
