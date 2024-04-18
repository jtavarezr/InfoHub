import React, { useState, useEffect } from "react";
import supabase from "../clients";
import Card from "./Card";
import "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.min.js";

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

  /**
   * Opens the modal.
   */
  const openModal = () => {
    setShowModal(true);
  };

  /**
   * Closes the modal.
   */
  const closeModal = () => {
    setShowModal(false);
  };

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
        .from("vs_post_comments")
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

  // JSX
  return (
    <>
      <div className="container">
        <br />
        <h1>Latest News</h1>
        <div>
          {/* Conditional rendering based on loading and error states */}
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
