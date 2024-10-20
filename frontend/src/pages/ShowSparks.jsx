//no brabnching

// import React, { useEffect, useState } from 'react';
// import SparkStruct from '../components/sparks/spark_struct';

// const ThreadSparks = () => {
//     const threadId = "67137e7b63e6e5e5fb33fb5c"; // Replace with dynamic threadId if needed
//     const [threadTitle, setThreadTitle] = useState('');
//     const [sparks, setSparks] = useState([]);
//     const [loading, setLoading] = useState(true); // Loading state    

//     // Function to fetch username based on userId
//     const fetchUsername = async (userId) => {
//         try {
//             console.log(userId);
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

//                 // Set the thread title and list of sparks
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
//             } catch (error) {
//                 console.error(error);
//             } finally {
//                 setLoading(false); // End loading
//             }
//         };

//         fetchSparks();
//     }, [threadId]); // Runs only when threadId changes

//     return (
//         <div>
//             <h1>{threadTitle}</h1>
//             {/* Loading indicator */}
//             {loading ? (
//                 <p>Loading sparks...</p>
//             ) : (
//                 <>
//                     {/* Display the sparks if they exist */}
//                     {sparks.length > 0 ? (
//                         <div>
//                             {sparks.map(spark => (
//                                 <SparkStruct
//                                     key={spark.sparkId} // Ensure a unique key for each spark
//                                     profilePic="https://via.placeholder.com/150" // Placeholder profile picture
//                                     title={spark.username} // Display username
//                                     content={spark.sparkText}
//                                     likes={spark.noOfLikes}
//                                     comments={spark.noOfComments}
//                                     bookmarks={0} // Set bookmarks appropriately if available
//                                 />
//                             ))}
//                         </div>
//                     ) : (
//                         <p>No sparks available for this thread.</p>
//                     )}
//                 </>
//             )}
//         </div>
//     );
// };

// export default ThreadSparks;



// this code gives proper output but s1 is lost
// import React, { useEffect, useState } from 'react';
// import SparkStructShow from '../components/sparks/spark_show_struct';

// const ThreadSparks = () => {
//     const threadId = "67137e7b63e6e5e5fb33fb5c"; // Replace with dynamic threadId if needed
//     const [threadTitle, setThreadTitle] = useState('');
//     const [sparks, setSparks] = useState([]);
//     const [loading, setLoading] = useState(true); // Loading state    
//     const [currentSparkId, setCurrentSparkId] = useState(null); // Track the current spark being viewed

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

//     // Handle spark click to show replies
//     const handleSparkClick = (sparkId) => {
//         setCurrentSparkId(sparkId);
//     };

//     // Get sparks to display based on currentSparkId
//     const sparksToDisplay = currentSparkId
//         ? groupedSparks[currentSparkId] || []
//         : groupedSparks['start'] || []; // Default to start spark if no current spark is selected

//     return (
//         <div>
//             <h1>{threadTitle}</h1>
//             {/* Loading indicator */}
//             {loading ? (
//                 <p>Loading sparks...</p>
//             ) : (
//                 <>
//                     {/* Display the sparks if they exist */}
//                     {sparksToDisplay.length > 0 ? (
//                         <div>
//                             {sparksToDisplay.map(spark => (
//                                 <SparkStructShow
//                                     key={spark.sparkId} // Ensure a unique key for each spark
//                                     profilePic="https://via.placeholder.com/150" // Placeholder profile picture
//                                     title={spark.username} // Display username
//                                     content={spark.sparkText}
//                                     likes={spark.noOfLikes}
//                                     comments={spark.noOfComments}
//                                     bookmarks={0} // Set bookmarks appropriately if available
//                                     onClick={() => {
//                                         console.log('Spark clicked:', spark.sparkId);
//                                         handleSparkClick(spark.sparkId);
//                                     }}
                                    
//                                 />
//                             ))}
//                         </div>
//                     ) : (
//                         <p>No sparks available for this thread.</p>
//                     )}
//                 </>
//             )}
//         </div>
//     );
// };

// export default ThreadSparks;


// this gives good result with siblings beside each other but grand parent is lost
// import React, { useEffect, useState } from 'react';
// import SparkStructShow from '../components/sparks/spark_show_struct';

// const ThreadSparks = () => {
//     const threadId = "67137e7b63e6e5e5fb33fb5c"; // Replace with dynamic threadId if needed
//     const [threadTitle, setThreadTitle] = useState('');
//     const [sparks, setSparks] = useState([]);
//     const [loading, setLoading] = useState(true); // Loading state
//     const [clickedSparks, setClickedSparks] = useState([]); // Keep track of clicked sparks

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

//     // Handle spark click to show the next sparks
//     const handleSparkClick = (sparkId) => {
//         const nextSparks = groupedSparks[sparkId] || []; // Get the sparks with the current spark as their prevSparkId
//         setClickedSparks((prevClickedSparks) => [...prevClickedSparks, { sparkId, nextSparks }]); // Add the clicked spark to the list
//     };

//     // Handle clicking on a sibling spark (e.g., s3 or s4) by removing the current siblings and showing the new set
//     const handleSiblingClick = (sparkId) => {
//         const nextSparks = groupedSparks[sparkId] || [];
//         // Replace the last set of sparks with the clicked spark and its next ones
//         setClickedSparks((prevClickedSparks) => [
//             ...prevClickedSparks.slice(0, -1),
//             { sparkId, nextSparks }
//         ]);
//     };

//     return (
//         <div>
//             <h1>{threadTitle}</h1>
//             {/* Loading indicator */}
//             {loading ? (
//                 <p>Loading sparks...</p>
//             ) : (
//                 <div>
//                     {/* Display clicked sparks and their next set of sparks */}
//                     {clickedSparks.map((sparkInfo, index) => (
//                         <div key={sparkInfo.sparkId}>
//                             {/* Render the clicked spark */}
//                             {sparks
//                                 .filter(spark => spark.sparkId === sparkInfo.sparkId)
//                                 .map(spark => (
//                                     <SparkStructShow
//                                         key={spark.sparkId}
//                                         profilePic="https://via.placeholder.com/150"
//                                         title={spark.username}
//                                         content={spark.sparkText}
//                                         likes={spark.noOfLikes}
//                                         comments={spark.noOfComments}
//                                         bookmarks={0}
//                                         onClick={() => handleSparkClick(spark.sparkId)}
//                                     />
//                                 ))}

//                             {/* Render the next sparks for the clicked spark */}
//                             <div style={{ display: 'flex', gap: '10px' }}>
//                                 {sparkInfo.nextSparks.map(spark => (
//                                     <SparkStructShow
//                                         key={spark.sparkId}
//                                         profilePic="https://via.placeholder.com/150"
//                                         title={spark.username}
//                                         content={spark.sparkText}
//                                         likes={spark.noOfLikes}
//                                         comments={spark.noOfComments}
//                                         bookmarks={0}
//                                         onClick={() => handleSiblingClick(spark.sparkId)}
//                                     />
//                                 ))}
//                             </div>
//                         </div>
//                     ))}

//                     {/* Display the initial spark(s) if no sparks are clicked yet */}
//                     {clickedSparks.length === 0 && (
//                         <div style={{ display: 'flex', gap: '10px' }}>
//                             {groupedSparks['start'] &&
//                                 groupedSparks['start'].map(spark => (
//                                     <SparkStructShow
//                                         key={spark.sparkId}
//                                         profilePic="https://via.placeholder.com/150"
//                                         title={spark.username}
//                                         content={spark.sparkText}
//                                         likes={spark.noOfLikes}
//                                         comments={spark.noOfComments}
//                                         bookmarks={0}
//                                         onClick={() => handleSparkClick(spark.sparkId)}
//                                     />
//                                 ))}
//                         </div>
//                     )}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ThreadSparks;



// siblings dont disappear after click
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
//                 setDisplayedSparks([{ sparks: initialSparks }]); // Display the start sparks initially
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

//     // Handle spark click to show next sparks
//     const handleSparkClick = (sparkId) => {
//         const nextSparks = groupedSparks[sparkId] || []; // Get the sparks with the current spark as their prevSparkId
//         if (nextSparks.length > 0) {
//             setDisplayedSparks(prevSparks => [...prevSparks, { sparks: nextSparks }]); // Append next sparks to the displayed list
//         }
//     };

//     return (
//         <div>
//             <h1>{threadTitle}</h1>
//             {/* Loading indicator */}
//             {loading ? (
//                 <p>Loading sparks...</p>
//             ) : (
//                 <div>
//                     {/* Display the clicked sparks in order */}
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
//                                         onClick={() => handleSparkClick(spark.sparkId)} // Load the next sparks when clicked
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


// everything is somewhat good but first spark disappears
import React, { useEffect, useState } from 'react';
import SparkStructShow from '../components/sparks/spark_show_struct';

const ThreadSparks = () => {
    const threadId = "67137e7b63e6e5e5fb33fb5c"; // Replace with dynamic threadId if needed
    const [threadTitle, setThreadTitle] = useState('');
    const [sparks, setSparks] = useState([]);
    const [loading, setLoading] = useState(true);    
    const [displayedSparks, setDisplayedSparks] = useState([]); // Track sparks to display

    // Function to fetch username based on userId
    const fetchUsername = async (userId) => {
        try {
            const response = await fetch(`http://localhost:5000/user/user/${userId}`);
            if (!response.ok) {
                throw new Error('Error fetching username');
            }
            const data = await response.json();
            return data.username; // Return the username
        } catch (error) {
            console.error(error);
            return null; // Return null if there's an error
        }
    };

    // Fetch the thread title and sparks when the component mounts
    useEffect(() => {
        const fetchSparks = async () => {
            setLoading(true); // Start loading
            try {
                const response = await fetch(`http://localhost:5000/thread/threads/${threadId}/sparks`);
                if (!response.ok) {
                    throw new Error('Error fetching sparks');
                }
                const data = await response.json();

                // Set the thread title
                setThreadTitle(data.threadTitle);

                // Map over sparks and fetch usernames
                const sparksWithUsernames = await Promise.all(
                    data.sparks.map(async (spark) => {
                        const userIdString = spark.userId["$oid"]; // Convert ObjectId to string
                        const username = await fetchUsername(userIdString); // Fetch username
                        return { ...spark, username }; // Add username to the spark object
                    })
                );

                setSparks(sparksWithUsernames); // Update sparks with usernames

                // Initially, show the starting spark(s) only
                const initialSparks = sparksWithUsernames.filter(spark => spark.isStart === "True");
                setDisplayedSparks([{ sparks: initialSparks, parentSparkId: null }]); // Display the start sparks initially
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false); // End loading
            }
        };

        fetchSparks();
    }, [threadId]); // Runs only when threadId changes

    // Group sparks by prevSparkId
    const groupedSparks = {};
    sparks.forEach(spark => {
        const prevId = spark.prevSparkId || 'start'; // Use 'start' for initial sparks
        if (!groupedSparks[prevId]) {
            groupedSparks[prevId] = [];
        }
        groupedSparks[prevId].push(spark);
    });

    // Handle spark click to show next sparks and hide siblings
    const handleSparkClick = (sparkId, prevSparkId) => {
        const nextSparks = groupedSparks[sparkId] || []; // Get the sparks with the current spark as their prevSparkId

        // Replace the current sparks with the clicked spark and its children
        setDisplayedSparks(prevSparks => {
            const newDisplayedSparks = [...prevSparks];

            // Find the index of the current level based on prevSparkId
            const currentLevelIndex = newDisplayedSparks.findIndex(group => group.parentSparkId === prevSparkId);

            if (currentLevelIndex !== -1) {
                // Replace the current level with only the clicked spark
                newDisplayedSparks[currentLevelIndex] = { sparks: newDisplayedSparks[currentLevelIndex].sparks.filter(s => s.sparkId === sparkId), parentSparkId: prevSparkId };
            }

            // Add the next sparks (children of the clicked spark)
            newDisplayedSparks.splice(currentLevelIndex + 1, newDisplayedSparks.length - currentLevelIndex - 1, { sparks: nextSparks, parentSparkId: sparkId });

            return newDisplayedSparks;
        });
    };

    return (
        <div>
            <h1>{threadTitle}</h1>
            {/* Loading indicator */}
            {loading ? (
                <p>Loading sparks...</p>
            ) : (
                <div>
                    {/* Display the sparks in order, grouped by levels */}
                    {displayedSparks.map((sparkGroup, index) => (
                        <div key={index} style={{ display: 'flex', flexDirection: 'row', marginTop: '10px' }}>
                            {sparkGroup.sparks.map(spark => (
                                <div key={spark.sparkId} style={{ marginRight: '10px' }}>
                                    <SparkStructShow
                                        profilePic="https://via.placeholder.com/150"
                                        title={spark.username}
                                        content={spark.sparkText}
                                        likes={spark.noOfLikes}
                                        comments={spark.noOfComments}
                                        bookmarks={0}
                                        onClick={() => handleSparkClick(spark.sparkId, spark.prevSparkId)} // Load the next sparks and hide siblings
                                    />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ThreadSparks;
