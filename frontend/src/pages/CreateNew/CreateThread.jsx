import React, { useState } from "react";
import "../../css/create/newThread.css";
import MasterPage from "../../components/master/Master";

const CreateThread = () => {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState([]);
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
      tags,
      selectedGenres,
    });
    // Logic for creating the threads
  };

  const filteredGenres = genres.filter((g) =>
    g.toLowerCase().startsWith(genreInput.toLowerCase())
  );

  return (
    <MasterPage>
      <div className="create-thread">
        <form onSubmit={handleSubmit}>
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

          <button type="submit" className="create-button-thread">
            Create Thread
          </button>
        </form>
      </div>
    </MasterPage>
  );
};

export default CreateThread;
