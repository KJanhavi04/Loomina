import React, { useState } from "react";
import "../../css/create/newSolo.css";
import { useNavigate } from "react-router-dom";
import MasterPage from "../../components/master/Master";


const NewSoloStory = () => {
  const [title, setTitle] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [tags, setTags] = useState([]);
  const [coverImage, setCoverImage] = useState(null);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genreInput, setGenreInput] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();


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

  const handleGenreChange = (genre) => {
    if (genres.includes(genre) && !selectedGenres.includes(genre)) {
      setSelectedGenres([...selectedGenres, genre]);
      setGenreInput("");
    }
    setShowDropdown(false);
  };

  const removeGenre = (genre) => {
    setSelectedGenres(selectedGenres.filter((g) => g !== genre));
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log({
  //     title,
  //     synopsis,
  //     tags,
  //     coverImage,
  //     selectedGenres,
  //   });
  // };

//image stuff
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImage(file);
      setCoverImagePreview(URL.createObjectURL(file)); // Create a preview of the image
    }
  };

  //saving story
  const handleSave = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("synopsis", synopsis);
    formData.append("tags", tags.join(",")); // Convert tags array to comma-separated string
    formData.append("selectedGenres", selectedGenres.join(",")); // Convert genres array to comma-separated string

    if (coverImage) {
      formData.append("coverImage", coverImage); // Append the image file here
    }

    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:5000/story/create-story", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData, // Send the form data including the image file
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Story created successfully: ", result);
        navigate("/story-preview", { state: { storyId: result.storyId } });
      } else {
        console.error("Error creating story: ", result.message);
      }
    } catch (error) {
      console.error("Error: ", error);
    }

    console.log("Story Data:", { title, synopsis, tags, selectedGenres });
  };

  const filteredGenres = genres.filter((g) =>
    g.toLowerCase().startsWith(genreInput.toLowerCase())
  );

  return (
    <MasterPage>
      <div className="new-solo-story">
        <form onSubmit={handleSave}>
          <div className="form-container-story">
            <div className="form-left-story">
              <div className="cover-image-group-story">
                {coverImage ? (
                  <img
                    src={URL.createObjectURL(coverImage)}
                    alt="Cover"
                    onChange={handleImageUpload}
                    className="image-preview-story"
                  />
                ) : (
                  <div className="image-placeholder-story">Cover Preview</div>
                )}
                <button
                  type="button"
                  className="cover-image-button-story"
                  onClick={() => document.getElementById("coverImage").click()}
                >
                  Choose Cover Image
                </button>
                <input
                  type="file"
                  id="coverImage"
                  onChange={(e) => setCoverImage(e.target.files[0])}
                  accept="image/*"
                  style={{ display: "none" }}
                />
              </div>
            </div>

            <div className="form-right-story">
              <div className="form-group-story">
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  placeholder="Title"
                />
              </div>

              <div className="form-group-story">
                <textarea
                  id="synopsis"
                  value={synopsis}
                  onChange={(e) => setSynopsis(e.target.value)}
                  placeholder="Synopsis"
                  required
                />
              </div>

              <div className="form-group-story">
                <input
                  type="text"
                  id="tags"
                  placeholder="Tags"
                  value={tags.join(", ")}
                  onChange={(e) =>
                    setTags(e.target.value.split(",").map((tag) => tag.trim()))
                  }
                  required
                />
              </div>

              <div className="form-group-story genre-group-story">
                <input
                  type="text"
                  placeholder="Enter genres"
                  value={genreInput}
                  onChange={(e) => {
                    setGenreInput(e.target.value);
                    setShowDropdown(true);
                  }}
                />
                {/* <span className="down-arrow">▼</span> Down arrow icon */}
                {showDropdown && (
                  <div className="genre-dropdown">
                    {filteredGenres.map((genre) => (
                      <option
                        key={genre}
                        onClick={() => handleGenreChange(genre)}
                      >
                        {genre}
                      </option>
                    ))}
                  </div>
                )}
              </div>

              <div className="selected-genres">
                {selectedGenres.map((genre) => (
                  <div key={genre} className="selected-genre-story">
                    <button
                      type="button"
                      className="remove-genre-story"
                      onClick={() => removeGenre(genre)}
                    >
                      &times;
                    </button>
                    {genre}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button type="submit" className="create-button-story">
            Create Story
          </button>
        </form>
      </div>
    </MasterPage>
  );
};

export default NewSoloStory;
