import React, { useState } from "react";
// import '../css/CreateStory.css';
import { useNavigate } from "react-router-dom";

const CreateStory = () => {
  // States for form fields
  const [title, setTitle] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [tags, setTags] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  const [coverImage, setCoverImage] = useState(null);
  const [coverImagePreview, setCoverImagePreview] = useState(null);

  const navigate = useNavigate();

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

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImage(file);
      setCoverImagePreview(URL.createObjectURL(file));  // Create a preview of the image
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


  const handleSave = async (e) => {
    e.preventDefault();
//
    const formData = new FormData();
    formData.append('title', title);
    formData.append('synopsis', synopsis);
    formData.append('tags', tags.join(','));  // Convert tags array to comma-separated string
    formData.append('genres', selectedGenres.join(','));  // Convert genres array to comma-separated string

    if (coverImage) {
      formData.append('coverImage', coverImage);  // Append the image file here
    }

    const token = localStorage.getItem('token');

    try {
      const response = await fetch('http://localhost:5000/story/create-story', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,  // Send the form data including the image file
      });

      const result = await response.json();

      if (response.ok) {
        console.log('Story created successfully: ', result);
        navigate('/story-preview', { state: { storyId: result.storyId} });
      } else {
        console.error('Error creating story: ', result.message);
      }
    } catch (error) {
      console.error('Error: ', error);
    }

    console.log("Story Data:", { title, synopsis, tags, selectedGenres });
  };


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
          {coverImagePreview && (
            <div className="image-preview">
              <img src={coverImagePreview} alt="Cover Preview" width={100} />
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
