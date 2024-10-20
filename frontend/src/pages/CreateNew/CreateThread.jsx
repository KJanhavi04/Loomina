import React, { useState } from "react";
import "../../css/create/newThread.css";
import MasterPage from "../../components/master/Master";
import { useNavigate } from "react-router-dom";

const CreateThread = () => {
  const [title, setTitle] = useState("");
  const [prompt, setPrompt] = useState("");
  const [tags, setTags] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genreInput, setGenreInput] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [error, setError] = useState(""); // Error state
  const navigate = useNavigate();
  const [coverImage, setCoverImage] = useState(null);

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

  // const handleCreateSpark = async (e) => {
  //   e.preventDefault(); // Prevent default form submission
  //   if (selectedGenres.length === 0) {
  //     setError("At least one genre is required."); // Set error message if no genre is selected
  //     return;
  //   }

  //   console.log(coverImage);

  //   const formData = new FormData();
  //   formData.append("title", title);
  //   formData.append("tags", tags.join(",")); // Convert tags array to comma-separated string
  //   formData.append("selectedGenres", selectedGenres.join(",")); // Convert genres array to comma-separated string
  //   formData.append("timestamp", new Date().toISOString());
  //   formData.append("prompt", title);

  //   if (coverImage) {
  //     formData.append("coverImage", coverImage); // Append the image file here
  //   }

  //   for (let pair of formData.entries()) {
  //     console.log(pair[0] + ': ' + pair[1]);
  //   }

  //   const token = localStorage.getItem("token");
  //   try {
  //     const response = await fetch(
  //       "http://localhost:5000/thread/create-thread",
  //       {
  //         method: "POST",
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //         body: formData,
  //       }
  //     );

  //     const result = await response.json();
  //     if (response.ok) {
  //       console.log("Thread created successfully:", result);
  //       navigate("/create-spark", { state: { threadId: result.threadId } });
  //       // Clear form fields on success
  //       setTitle("");
  //       setPrompt("");
  //       setTags([]);
  //       setSelectedGenres([]);
  //       setGenreInput("");
  //     } else {
  //       console.error("Error creating thread:", result.message);
  //       setError(result.message); // Show error message from backend
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //     setError("An unexpected error occurred."); // Show generic error message
  //   }
  // };

  const handleCreateSpark = async (e) => {
    e.preventDefault(); // Prevent default form submission
    if (selectedGenres.length === 0) {
      setError("At least one genre is required."); // Set error message if no genre is selected
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("tags", tags.join(",")); // Convert tags array to comma-separated string
    formData.append("selectedGenres", selectedGenres.join(",")); // Convert genres array to comma-separated string
    formData.append("timestamp", new Date().toISOString());
    formData.append("prompt", prompt); // Changed to use the prompt state

    if (coverImage) {
      formData.append("coverImage", coverImage); // Append the image file here
    }

    // Log FormData for debugging
    for (let pair of formData.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }

    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        "http://localhost:5000/thread/create-thread",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const result = await response.json();
      if (response.ok) {
        console.log("Thread created successfully:", result);
        navigate("/create-spark", { state: { threadId: result.threadId } });
        // Clear form fields on success
        setTitle("");
        setPrompt("");
        setTags([]);
        setSelectedGenres([]);
        setGenreInput("");
        setCoverImage(null); // Clear cover image state
        setError(""); // Clear error message
      } else {
        console.error("Error creating thread:", result.message);
        setError(result.message); // Show error message from backend
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An unexpected error occurred."); // Show generic error message
    }
  };



  const filteredGenres = genres.filter((g) =>
    g.toLowerCase().startsWith(genreInput.toLowerCase())
  );

  //image stuff
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImage(file);
      setCoverImagePreview(URL.createObjectURL(file)); // Create a preview of the image
    }
  };

  return (
    <MasterPage>
      <div className="create-thread">
        <div className="form-left-spark">
          <div className="cover-image-group-spark">
            {coverImage ? (
              <img
                src={URL.createObjectURL(coverImage)}
                alt="Cover"
                onChange={handleImageUpload}
                className="image-preview-spark"
              />
            ) : (
              <div className="image-placeholder-story">Cover Preview</div>
            )}
            <button
              type="button"
              className="cover-image-button-spark"
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
        {/* //normal */}
        <form onSubmit={handleCreateSpark}>
          <div className="form-container-thread">
            <div className="form-right-thread">
              <div className="form-group-thread">
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  placeholder="Title"
                />
              </div>
              <div className="form-group-thread">
                <input
                  type="text"
                  id="prompt"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  required
                  placeholder="Enter your prompt"
                />
              </div>
              <div className="form-group-thread">
                <input
                  type="text"
                  id="tags"
                  placeholder="Tags (Optional)"
                  value={tags.join(", ")}
                  onChange={(e) =>
                    setTags(e.target.value.split(",").map((tag) => tag.trim()))
                  }
                />
              </div>
              <div className="form-group-thread genre-group-thread">
                <input
                  type="text"
                  placeholder="Enter genres"
                  value={genreInput}
                  onChange={(e) => {
                    setGenreInput(e.target.value);
                    setShowDropdown(true);
                  }}
                />
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
                  <div key={genre} className="selected-genre-thread">
                    <button
                      type="button"
                      className="remove-genre-thread"
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
          {error && <div className="error-message">{error}</div>}{" "}
          {/* Display error message */}
          <button type="submit" className="create-button-thread">
            Create Thread
          </button>
        </form>
      </div>
    </MasterPage>
  );
};

export default CreateThread;
