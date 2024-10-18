import React, { useState } from "react";
import "../../css/create/newSolo.css";
import MasterPage from "../../components/master/Master";

const NewSoloStory = () => {
  const [title, setTitle] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [tags, setTags] = useState([]);
  const [coverImage, setCoverImage] = useState(null);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genreInput, setGenreInput] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      title,
      synopsis,
      tags,
      coverImage,
      selectedGenres,
    });
  };

  const filteredGenres = genres.filter((g) =>
    g.toLowerCase().startsWith(genreInput.toLowerCase())
  );

  return (
    <MasterPage>
      <div className="new-solo-story">
        <form onSubmit={handleSubmit}>
          <div className="form-container-story">
            <div className="form-left-story">
              <div className="cover-image-group-story">
                {coverImage ? (
                  <img
                    src={URL.createObjectURL(coverImage)}
                    alt="Cover"
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
                {/* <label htmlFor="title" className={title ? "filled" : ""}>
                  Title
                </label> */}
              </div>

              <div className="form-group-story">
                <textarea
                  id="synopsis"
                  value={synopsis}
                  onChange={(e) => setSynopsis(e.target.value)}
                  placeholder="Synopsis"
                  required
                />
                {/* <label htmlFor="synopsis" className={synopsis ? "filled" : ""}>
                  Synopsis
                </label> */}
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
                {/* <label htmlFor="tags" className={tags.length ? "filled" : ""}>
                  Tags
                </label> */}
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
