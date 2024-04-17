import React, { useState, useEffect } from "react";
import supabase from "../clients";
import Card from "./Card";
import "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.min.js";


const ReadFeeds = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

    const openModal = () => {
      setShowModal(true);
    };

    const closeModal = () => {
      setShowModal(false);
    };
    
  useEffect(() => {
    fetchPosts();
  }, []);

  /*
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

  return (
    <>
      {console.log(posts)}
      <div>
        <br />
        <h1>Latest News</h1>
        <div>
          {loading ? (
            <h2>Loading...</h2>
          ) : error ? (
            <h2>{error}</h2>
          ) : posts && posts.length > 0 ? (
            <div className="row row-cols-1 row-cols-md-4 g-4 p-4">
              {" "}
              {/* Mueve el div con la clase row aquí */}
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
                  count_comment={post.count_comment}
                />
              ))}
            </div>
          ) : (
            <h2>{"There's No Posts Yet 😞"}</h2>
          )}
        </div>
      </div>

      <button
        type="button"
        className="btn btn-primary"
        data-toggle="modal"
        data-target=".bd-example-modal-xl"
      >
        Extra large modal
      </button>

      <div
        className="modal fade bd-example-modal-xl"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="myExtraLargeModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content">...</div>
        </div>
      </div>

      <button
        type="button"
        className="btn btn-primary"
        data-toggle="modal"
        data-target=".bd-example-modal-lg"
      >
        Large modal
      </button>

      <div
        className="modal fade bd-example-modal-lg"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="myLargeModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">...</div>
        </div>
      </div>
    </>
  );
};

export default ReadFeeds;
