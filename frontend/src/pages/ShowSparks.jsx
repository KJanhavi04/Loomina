// everything is somewhat good but first spark disappears
// import React, { useEffect, useState } from 'react';
// import SparkStructShow from '../components/sparks/spark_show_struct';

// const ThreadSparks = () => {
//     const threadId = "67137e7b63e6e5e5fb33fb5c"; // Replace with dynamic threadId if needed
//     const [threadTitle, setThreadTitle] = useState('');
//     const [sparks, setSparks] = useState([]);
//     const [loading, setLoading] = useState(true);    
//     const [displayedSparks, setDisplayedSparks] = useState([]); // Track sparks to display

//     // Function to fetch username based on userId
//     const fetchUsername = async (userId) => {
//         try {
//             const response = await fetch(`http://localhost:5000/user/user/${userId}`);
//             if (!response.ok) {
//                 throw new Error('Error fetching username');
//             }
//             const data = await response.json();
//             return data.username; // Return the username
//         } catch (error) {
//             console.error(error);
//             return null; // Return null if there's an error
//         }
//     };

//     // Fetch the thread title and sparks when the component mounts
//     useEffect(() => {
//         const fetchSparks = async () => {
//             setLoading(true); // Start loading
//             try {
//                 const response = await fetch(`http://localhost:5000/thread/threads/${threadId}/sparks`);
//                 if (!response.ok) {
//                     throw new Error('Error fetching sparks');
//                 }
//                 const data = await response.json();

//                 // Set the thread title
//                 setThreadTitle(data.threadTitle);

//                 // Map over sparks and fetch usernames
//                 const sparksWithUsernames = await Promise.all(
//                     data.sparks.map(async (spark) => {
//                         const userIdString = spark.userId["$oid"]; // Convert ObjectId to string
//                         const username = await fetchUsername(userIdString); // Fetch username
//                         return { ...spark, username }; // Add username to the spark object
//                     })
//                 );

//                 setSparks(sparksWithUsernames); // Update sparks with usernames

//                 // Initially, show the starting spark(s) only
//                 const initialSparks = sparksWithUsernames.filter(spark => spark.isStart === "True");
//                 setDisplayedSparks([{ sparks: initialSparks, parentSparkId: null }]); // Display the start sparks initially
//             } catch (error) {
//                 console.error(error);
//             } finally {
//                 setLoading(false); // End loading
//             }
//         };

//         fetchSparks();
//     }, [threadId]); // Runs only when threadId changes

//     // Group sparks by prevSparkId
//     const groupedSparks = {};
//     sparks.forEach(spark => {
//         const prevId = spark.prevSparkId || 'start'; // Use 'start' for initial sparks
//         if (!groupedSparks[prevId]) {
//             groupedSparks[prevId] = [];
//         }
//         groupedSparks[prevId].push(spark);
//     });

//     // Handle spark click to show next sparks and hide siblings
//     const handleSparkClick = (sparkId, prevSparkId) => {
//         const nextSparks = groupedSparks[sparkId] || []; // Get the sparks with the current spark as their prevSparkId

//         // Replace the current sparks with the clicked spark and its children
//         setDisplayedSparks(prevSparks => {
//             const newDisplayedSparks = [...prevSparks];

//             // Find the index of the current level based on prevSparkId
//             const currentLevelIndex = newDisplayedSparks.findIndex(group => group.parentSparkId === prevSparkId);

//             if (currentLevelIndex !== -1) {
//                 // Replace the current level with only the clicked spark
//                 newDisplayedSparks[currentLevelIndex] = { sparks: newDisplayedSparks[currentLevelIndex].sparks.filter(s => s.sparkId === sparkId), parentSparkId: prevSparkId };
//             }

//             // Add the next sparks (children of the clicked spark)
//             newDisplayedSparks.splice(currentLevelIndex + 1, newDisplayedSparks.length - currentLevelIndex - 1, { sparks: nextSparks, parentSparkId: sparkId });

//             return newDisplayedSparks;
//         });
//     };

//     return (
//         <div>
//             <h1>{threadTitle}</h1>
//             {/* Loading indicator */}
//             {loading ? (
//                 <p>Loading sparks...</p>
//             ) : (
//                 <div>
//                     {/* Display the sparks in order, grouped by levels */}
//                     {displayedSparks.map((sparkGroup, index) => (
//                         <div key={index} style={{ display: 'flex', flexDirection: 'row', marginTop: '10px' }}>
//                             {sparkGroup.sparks.map(spark => (
//                                 <div key={spark.sparkId} style={{ marginRight: '10px' }}>
//                                     <SparkStructShow
//                                         profilePic="https://via.placeholder.com/150"
//                                         title={spark.username}
//                                         content={spark.sparkText}
//                                         likes={spark.noOfLikes}
//                                         comments={spark.noOfComments}
//                                         bookmarks={0}
//                                         onClick={() => handleSparkClick(spark.sparkId, spark.prevSparkId)} // Load the next sparks and hide siblings
//                                     />
//                                 </div>
//                             ))}
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ThreadSparks;




// this code final
import React, { useState, useEffect } from 'react';
import SparkStructShow from '../components/sparks/spark_show_struct';

const ThreadSparks = () => {
    const threadId = "67137e7b63e6e5e5fb33fb5c";
    const [threadTitle, setThreadTitle] = useState(''); 
    const [sparks, setSparks] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch username for each spark
    const fetchUsername = async (userId) => {
        try {
            const response = await fetch(`http://localhost:5000/user/user/${userId}`);
            if (!response.ok) {
                throw new Error('Error fetching username');
            }

            const data = await response.json();
            return data.username || 'Unknown User'; // Return username or fallback
        } catch (error) {
            console.error(error);
            return 'Unknown User'; // Fallback if there's an error
        }
    };

    // Fetch thread data on component mount
    useEffect(() => {
        const fetchThread = async () => {
            try {
                const response = await fetch(`http://localhost:5000/thread/threads/${threadId}/sparks`);
                if (!response.ok) {
                    throw new Error('Error fetching sparks');
                }

                const data = await response.json();

                setThreadTitle(data.threadTitle || 'Untitled Thread'); // Fallback for thread title
                console.log(data.threadTitle);

                // Map sparks with usernames
                const sparksWithUsernames = await Promise.all(
                    data.sparks.map(async (spark) => {
                        const userIdString = spark.userId["$oid"] || spark.userId; // Fallback to string
                        const username = await fetchUsername(userIdString);
                        return { ...spark, username };
                    })
                );

                setSparks(sparksWithUsernames);
                console.log(sparksWithUsernames);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };

        fetchThread();
    }, [threadId]);

    // group sparks based on their prev spark id
    // JANHAVI ATTENTION
    // use this grouped sparks for ui
    // now it is up to you how you want to use them.
    const groupedSparks = {};
    sparks.forEach(spark => {
        const prevId = spark.prevSparkId || 'start';
        if(!groupedSparks[prevId]){
            groupedSparks[prevId] = [];
        }
        groupedSparks[prevId].push(spark);
    });

    Object.entries(groupedSparks).forEach(([prevId, group]) => {
        console.log(`PrevSparkId: ${prevId}`);
        console.log(group); // Array of sparks belonging to this prevSparkId
    });
    

    return (
        <div>
            <h1>{loading ? 'Loading...' : threadTitle}</h1>
            <div>
                {sparks.length > 0 ? (
                    sparks.map((spark, index) => (
                        <SparkStructShow
                        key={spark.sparkId}
                        profilePic="https://pbs.twimg.com/profile_images/1411568165524586496/hbOX6kOJ_400x400.jpg"
                        title={spark.username}
                        content={spark.sparkText}
                        likes={spark.noOfLikes}
                        comments={spark.noOfComments}
                        bookmarks={0}
                        />
                    ))
                ) : (
                    <p>{loading ? 'Fetching sparks...' : 'No sparks to display yet.'}</p>
                )}
            </div>
        </div>
    );
};

export default ThreadSparks;
