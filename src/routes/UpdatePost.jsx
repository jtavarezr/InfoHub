import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import supabase from "../clients";

const UpdatePost = ({ postId }) => {
  const initialState = {
    title: "",
    content: "",
    image_url: "",
  };

  const [post, setPost] = useState(initialState);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
const { id } = useParams();


  useEffect(() => {
    fetchPost();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPost((prev) => ({ ...prev, [name]: value }));
  };

  const fetchPost = async () => {
    try {
      const { data, error } = await supabase
        .from("post")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching post:", error.message);
      } else {
        setPost(data);
      }
    } catch (error) {
      console.error("Error fetching post:", error.message);
    }
  };

  const updatePost = async (event) => {
    event.preventDefault();

    if (!post.title || !post.content) {
      alert("Please fill out all required fields");
      return;
    }

    try {
      await supabase.from("post").update(post).eq("id", id);
      setShowSuccessMessage(true);
    } catch (error) {
      console.error("Error updating post:", error.message);
    }
  };

  return (
    <>
      <div className="update-post">
        <h1>Update Post</h1>
      </div>
      {showSuccessMessage && (
        <div
          className="alert alert-success alert-dismissible fade show"
          role="alert"
        >
          Post updated successfully!
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
            onClick={() => setShowSuccessMessage(false)}
          ></button>
        </div>
      )}
      <div>
        <form onSubmit={updatePost}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={post.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="content" className="form-label">
              Content
            </label>
            <textarea
              className="form-control"
              id="content"
              name="content"
              rows="5"
              value={post.content}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="image_url" className="form-label">
              Image URL
            </label>
            <input
              type="url"
              className="form-control"
              id="image_url"
              name="image_url"
              value={post.image_url}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Update Post
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdatePost;
