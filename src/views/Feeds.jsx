import React, { useState, useEffect } from "react";
import supabase from "../clients";
import Card from "../routes/Card";
import { CCol, CFormSelect, CRow, CFormInput } from "@coreui/react";

/**
 * ReadFeeds Component
 * Fetches posts from a database and displays them using the Card component.
 * Also includes a modal component named ComponentWithModal.
 */
const ReadFeeds = () => {
  // State
  const [posts, setPosts] = useState([]); // Array of post objects fetched from the database
  const [loading, setLoading] = useState(true); // Loading state indicator
  const [error, setError] = useState(null); // Error message if fetching fails
  const [showModal, setShowModal] = useState(false); // Modal open/close state
  const [filterOption, setFilterOption] = useState("date");
const [searchInput, setSearchInput] = useState("");

  // Fetch posts on component mount
  useEffect(() => {
    fetchPosts();
  }, []);

  /**
   * Fetches posts from the database using Supabase client.
   */
  const fetchPosts = async () => {
    try {
      const { data } = await supabase
        .from("vs_postandcomments")
        .select()
        .order("created_at", { ascending: false });

      setPosts(data);
      setLoading(false);
    } catch (error) {
      setError("Error fetching crewmates");
      console.error("Error fetching crewmates:", error.message);
      setLoading(false);
    }
  };

  // Función para manejar los cambios en el select de filtro
  const handleFilterChange = (event) => {
    setFilterOption(event.target.value);

    let sortedPosts = [...posts];
    if (event.target.value === "date") {
      sortedPosts.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
    } else if (event.target.value === "upvotes") {
      sortedPosts.sort((a, b) => b.upvotes - a.upvotes);
    }

    setPosts(sortedPosts);
  };

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchValue !== "") {
      const filteredData = posts.filter((post) =>
        post.title.toLowerCase().includes(searchValue.toLowerCase())
      );
      setPosts(filteredData);
    } else {
      fetchPosts(); // Si el campo de búsqueda está vacío, vuelve a cargar todos los posts
    }
  };


  return (
    <>
      <div className="container">
        <br />
        <h1>Latest News</h1>
        <div>
          <CRow>
            <CCol md>
              
            <CFormInput 
              type="text"
              placeholder="Search..."
              onChange={(inputString) => searchItems(inputString.target.value)}
              />
              </CCol>
            <CCol md>
              <CFormSelect
                id="category"
                floatingLabel="Order By"
                aria-label="Works with selects"
                value={filterOption}
                onChange={handleFilterChange}
              >
                <option value="date">Date</option>
                <option value="upvotes">Likes</option>
              </CFormSelect>
            </CCol>
          </CRow>
          {loading ? (
            <h2>Loading...</h2>
          ) : error ? (
            <h2>{error}</h2>
          ) : posts && posts.length > 0 ? (
            // Grid layout for displaying posts
            <div className="row row-cols-1 row-cols-md-4 g-4 p-4">
              {posts.map((post) => (
                <Card
                  key={post.id}
                  id={post.id}
                  title={post.title}
                  image_url={post.image_url}
                  upvotes={post.upvotes}
                  content={post.content}
                  created_at={post.created_at}
                  comments={post.comments}
                  comment_count={post.count_comment}
                  source_url={post.source_url}
                />
              ))}
            </div>
          ) : (
            <h2>{"There's No Posts Yet 😞"}</h2>
          )}
        </div>
      </div>
    </>
  );
};

export default ReadFeeds;
