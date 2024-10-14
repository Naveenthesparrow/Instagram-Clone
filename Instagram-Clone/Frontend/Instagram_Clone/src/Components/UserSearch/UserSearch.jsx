import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { debounce } from "lodash";
import { AlertCircle } from "lucide-react";

export default function UserSearch() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsers = async (searchTerm) => {
    if (!searchTerm) {
      setResults([]);
      setShowResults(false);
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${API_URL}/api/users/search?query=${encodeURIComponent(searchTerm)}`
      );
      if (!response.ok) {
        throw new Error("Network Response is not Ok");
      }
      const data = await response.json();
      setResults(data.users || []);
      setShowResults(true);
    } catch (err) {
      console.error(err);
      setError("An error occurred while searching for users. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetchUsers = useCallback(
    debounce((searchTerm) => fetchUsers(searchTerm), 300),
    []
  );

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    debouncedFetchUsers(value);
  };

  return (
    <div className="relative max-w-md mx-auto search-container">
      <label htmlFor="user-search" className="sr-only">
        Search users by username
      </label>
      <input
        id="user-search"
        type="text"
        placeholder="Search users by username"
        value={query}
        onChange={handleInputChange}
        className="w-full p-2 text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-autocomplete="list"
        aria-controls="search-results"
        aria-expanded={showResults}
      />

      {showResults && (
        <div
          id="search-results"
          className="absolute z-50 bg-white mt-1 shadow-lg rounded-lg max-h-60 overflow-y-auto w-full"
          role="listbox"
        >
          {loading ? (
            <p className="p-4 text-center text-gray-500">Loading...</p>
          ) : error ? (
              <AlertCircle className="h-4 w-4" />
          ) : results.length > 0 ? (
            results.map((user) => (
              <Link
                key={user.id}
                to={`/profile/${user.username}`}
                className="block"
                role="option"
              >
                <div className="flex items-center px-4 py-3 cursor-pointer hover:bg-gray-100">
                  <img
                    src={user.profilePhoto || "/api/placeholder/150/150"}
                    alt=""
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="ml-4">
                    <p className="font-semibold">{user.username}</p>
                    <p className="text-sm text-gray-500">{user.fullname}</p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="p-4 text-center text-gray-500">
              No user found. Try a different search term.
            </p>
          )}
        </div>
      )}
    </div>
  );
}