import React, { useState } from "react";
import '../css/CreateStory.css';
import { Navigate } from "react-router-dom";

const CreateStory = () => {
  // States for form fields
  const [title, setTitle] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [tags, setTags] = useState([]);
  const [coverImage, setCoverImage] = useState(null);
  const [selectedGenres, setSelectedGenres] = useState([]);

  // Predefined genre list
  const genres = [
    "Fantasy",
    "Science Fiction",
    "Mystery",
    "Romance",
    "Thriller",
    "Horror",
    "Historical",
    "Drama",
    "Adventure",
  ];

  // Handle cover image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImage(URL.createObjectURL(file));
    }
  };

  // Handle tags input change
  const handleTagsChange = (e) => {
    const inputTags = e.target.value.split(",").map(tag => tag.trim());
    setTags(inputTags);
  };

  // Handle genre checkbox change
  const handleGenreChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedGenres((prevGenres) => [...prevGenres, value]);
    } else {
      setSelectedGenres((prevGenres) => prevGenres.filter((genre) => genre !== value));
    }
  };

  // Handle form submit
  // const handleSave = async (e) => {
  //   e.preventDefault();

  //   // Validate form inputs
  //   if (!title || !synopsis || selectedGenres.length === 0) {
  //     alert("Please fill in all required fields.");
  //     return;
  //   }

  //   // Prepare form data
  //   const storyData = {
  //     title,
  //     synopsis,
  //     tags,
  //     genres: selectedGenres,
  //     coverImage,
  //   };

  //   const token = localStorage.getItem('token');
  //   try{
  //       const response = await fetch('http://localhost:5000/story/create-story', {
  //           method: 'POST',
  //           headers: {
  //               'Content-Type': 'application/json',
  //               'Authorization': 'Bearer ${token}',
  //           },
  //           body: JSON.stringify({
  //               title: storyData['title'],
  //               synopsis: storyData['synopsis'],
  //               genre: storyData['genres'],
  //               tag: storyData['tags'],
  //               coverImage: storyData['coverImage']
  //           }),
  //       });

  //       const result = await response.json();

  //       if(response.ok) {
  //         console.log('Story created successfully: ', result);
  //         Navigate('/add-chapter');
  //       } else{
  //         console.error('Error creating story: ', result.message);
  //       }
  //   } catch(error){
  //     console.error('Error: ', error);
  //   }

  //   // Send this data to your backend here
  //   console.log("Story Data:", storyData);

  // };

  // Handle form submit
  const handleSave = async (e) => {
    e.preventDefault();

    // Validate form inputs
    if (!title || !synopsis || selectedGenres.length === 0) {
      alert("Please fill in all required fields.");
      return;
    }

    // Prepare FormData
    const formData = new FormData();
    formData.append('title', title);
    formData.append('synopsis', synopsis);
    formData.append('tags', JSON.stringify(tags));  // Send tags as JSON string
    formData.append('genres', JSON.stringify(selectedGenres));  // Send genres as JSON string
    if (coverImage) {
      formData.append('coverImage', coverImage);  // Append actual file instead of blob URL
    }

    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:5000/story/create-story', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,  // Send FormData instead of JSON
      });

      const result = await response.json();

      if (response.ok) {
        console.log('Story created successfully: ', result);
        Navigate('/add-chapter');
      } else {
        console.error('Error creating story: ', result.message);
      }
    } catch (error) {
      console.error('Error: ', error);
    }

    // Debugging log
    console.log("Story Data:", {
      title,
      synopsis,
      tags,
      genres: selectedGenres,
      coverImage,
    });
  };


  // Handle cancel action
  const handleCancel = () => {
    setTitle("");
    setSynopsis("");
    setTags([]);
    setCoverImage(null);
    setSelectedGenres([]);
  };

  return (
    <div className="create-story-container">
      <h2>Create or Edit Your Story</h2>
      <form onSubmit={handleSave}>
        {/* Title Input */}
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter story title"
            required
          />
        </div>

        {/* Synopsis Input */}
        <div className="form-group">
          <label htmlFor="synopsis">Synopsis</label>
          <textarea
            id="synopsis"
            value={synopsis}
            onChange={(e) => setSynopsis(e.target.value)}
            placeholder="Enter story synopsis"
            rows={5}
            required
          />
        </div>

        {/* Tags Input */}
        <div className="form-group">
          <label htmlFor="tags">Tags (comma-separated)</label>
          <input
            type="text"
            id="tags"
            value={tags.join(", ")}
            onChange={handleTagsChange}
            placeholder="Enter tags, separated by commas"
          />
        </div>

        {/* Cover Image Upload */}
        <div className="form-group">
          <label htmlFor="coverImage">Cover Image</label>
          <input
            type="file"
            id="coverImage"
            accept="image/*"
            onChange={handleImageUpload}
          />
          {coverImage && (
            <div className="image-preview">
              <img src={coverImage} alt="Cover Preview" width={100} />
            </div>
          )}
        </div>

        {/* Genre Selection (Multiple Checkboxes) */}
        <div className="form-group">
          <label>Genre(s)</label>
          <div className="genres-checkbox-group">
            {genres.map((g) => (
              <div key={g}>
                <label>
                  <input
                    type="checkbox"
                    value={g}
                    checked={selectedGenres.includes(g)}
                    onChange={handleGenreChange}
                  />
                  {g}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            Save
          </button>
          <button type="button" className="btn btn-secondary" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateStory;
