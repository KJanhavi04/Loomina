import React, { useState, useEffect } from "react";
import "../../css/main/dashboard.css";
import image from "../../assets/image.jpg";
import image1 from "../../assets/dark-forest.jpg";
import ThreadStruct from "../../components/sparks/thread_struct";
import SparkStruct from "../../components/sparks/spark_struct";
import Trending from "../../components/sparks/trending"; // Import Trending component

const Dashboard = () => {
  const [images, setImages] = useState(["https://st4.depositphotos.com/20363444/28588/i/450/depositphotos_285881038-stock-photo-bottom-view-trees-green-fresh.jpg", "https://i0.wp.com/picjumbo.com/wp-content/uploads/beautiful-spring-summer-day-in-green-nature-mountains-free-image.jpg?w=600&quality=80", image]);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(interval);
  }, [images.length]);

  const trendingItems = [
    {
      authorPic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzOFaaYy7ZgMH3DY7Aq8_BKaUAH5khUl-ubA&s",
      authorName: "Namita Warang",
      summary: "In a dystopian future where the totalitarian regime of Big Brother watches every move, Winston Smith works at the Ministry of Truth, altering historical records to fit the party's narrative. As he secretly yearns for rebellion and truth, he embarks on a forbidden love affair, discovering the perilous cost of individuality in a world where freedom is an illusion.",
    },
    {
      authorPic: "https://images.inc.com/uploaded_files/image/1920x1080/getty_516137066_2000179720009280633_314131.jpg",
      authorName: "Shruti Patil",
      summary: "Set in the Roaring Twenties, this novel chronicles the life of the mysterious Jay Gatsby and his obsessive love for the beautiful Daisy Buchanan. Through the eyes of narrator Nick Carraway, we explore themes of wealth, love, and the elusive American Dream as Gatsby's extravagant parties mask a deeper longing for connection and acceptance.",
    },
  ];

  // Updated thread data with valid story titles
  const threads = [
    {
      title: "Solo Leveling",
      profilePic: "https://qph.cf2.quoracdn.net/main-qimg-02d720cffa41ca9ede198aa8a2e603ba-lq",
      sparks: [
        "In a world plagued by monstrous creatures and the enigmatic dungeons they emerge from, hunters are humanity’s last line of defense. Jinwoo Sung, once known as the 'world's weakest hunter,' barely survives each harrowing encounter.",
        "His life takes a dramatic turn when he stumbles into a double dungeon—a perilous realm where danger lurks at every corner. After a near-fatal battle, he is given a chance to become something greater through a mysterious system that allows him to level up his abilities in ways no one else can.",
        ],
    },
    {
      title: "Tower of God ",
      profilePic: "https://i0.wp.com/grehlakshmi.com/wp-content/uploads/2022/08/resize-1656478623332995750wildanimalcartooncharacterintheforestscenefreevector.webp?fit=1200%2C675&ssl=1",
      sparks: [
        "In the mesmerizing universe of the Tower of God, the tower itself is a labyrinth of peril and wonder, where every floor holds unimaginable challenges and potential rewards. Bam, a boy raised in isolation, finds himself drawn into this towering structure in search of his dear friend, Rachel, who dreams of seeing the stars.",
        "As he ascends the tower, Bam encounters a diverse array of characters, each with their own ambitions and secrets. He learns that the path to the top is fraught with treachery and conflict, where allies can quickly become foes. Alongside his companions, Bam must navigate complex trials that test not only his strength but also his morality.",
        ],
    },
    {
      title: "The Beginning After the End",
      profilePic: "https://cdn.firstcry.com/education/2022/08/12021320/The-Greedy-Dog-Story-With-Moral-For-Kids-696x476.jpg",
      sparks: [
        "After leading a life filled with battles and political intrigue, King Grey meets his demise, only to find himself reborn as Arthur Leywin in a fantastical realm brimming with magic and opportunity. This new life offers him a chance to start afresh, but the shadows of his past linger.",
        "With the memories of his former self guiding him, Arthur embraces his new identity while striving to hone his innate magical abilities. As he grows stronger, he forms bonds with various companions, each bringing unique skills and perspectives that enrich his journey. However, as he delves deeper into the complexities of his new world, he discovers dark forces at play, threatening the peace he seeks.",
         ],
    },
    
  ];

  return (
    <div className="dashboard">
      {/* Top Section */}
      <div className="top-section">
        {/* Full Image Carousel */}
        <div className="image-carousel">
          <img
            src={images[currentImage]}
            alt="Slideshow"
            className="full-image"
          />
          <div className="dots">
            {images.map((_, index) => (
              <span
                key={index}
                className={`dot ${currentImage === index ? "active" : ""}`}
              ></span>
            ))}
          </div>
        </div>
        {/* Trending Section */}
        <Trending items={trendingItems} /> {/* Use Trending component here */}
      </div>

      {/* Middle Section (Sparks for you) */}
      <div className="middle-section">
        <div className="sparks-heading">
          <h3>Sparks for you</h3>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bottom-section">
        <SparkStruct
          profilePic="https://www.otonity.com/uploads/large/24171aad4a34bdd71bae236c609ca213.jpg"
          title="Omniscient Reader's Viewpoint"
          content="In a world governed by a mysterious narrative, Kim Dok-ja, an ordinary office worker, finds himself thrust into a survival game that resembles the web novel he has been reading for years. As the only person who possesses knowledge of the story's events and characters, he realizes that he has the unique ability to manipulate the narrative to his advantage. However, he quickly discovers that the stakes are higher than he ever imagined, and the line between fiction and reality begins to blur. Navigating through perilous situations, he forms alliances with fellow characters, each with their own agendas and secrets. With each chapter, Dok-ja must confront formidable foes and make life-or-death decisions that could alter the course of the world. As he grapples with the moral implications of his actions, ORV delves into themes of agency, destiny, and the consequences of knowing one's fate, creating a gripping narrative that keeps readers on the edge of their seats."
          likes={120}
          comments={45}
          bookmarks={20}
        />
        <SparkStruct
          profilePic="https://i.pinimg.com/564x/fe/37/26/fe3726460ac255f83c01af115b657266.jpg"
          title="Trash of the Count's Family"
          content="Cale Henituse, an ordinary young man from a noble family, finds his life turned upside down when he is suddenly transported into a fantasy world reminiscent of a novel he read in his previous life. In this new reality, he discovers that he has been given the identity of a character often dismissed as a 'trash' by others. Instead of succumbing to his fate, Cale embraces his role and cleverly manipulates the circumstances around him to avoid the dire prophecies laid out in the story. As he navigates the intricacies of noble society and encounters powerful figures, he uses his cunning and resourcefulness to forge alliances and outsmart his enemies. With a witty sense of humor and an engaging cast of characters, TCF explores the themes of self-discovery, resilience, and the importance of choosing one's own path, as Cale learns that he can redefine his destiny while also protecting those he cares about in a world filled with danger and intrigue."
          likes={10}
          comments={5}
          bookmarks={2}
        />
      </div>

      {/* Middle Section (Threads For You) */}
      <div className="middle-section">
        <div className="sparks-heading">
          <h3>Threads For You</h3>
        </div>
      </div>
      <div className="bottom-section">
        {threads.map((thread, index) => (
          <ThreadStruct
            key={index}
            title={thread.title}
            profilePic={thread.profilePic}
            sparks={thread.sparks}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
