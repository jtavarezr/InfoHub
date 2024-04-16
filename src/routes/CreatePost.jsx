import React, { useEffect, useState } from "react";
import supabase from "../clients";
import "bootstrap/dist/css/bootstrap.css";

const CreatePost = () => {
  const initialState = {
    title: "",
    content: "",
    image_url: "",
  };

  const [post, setPost] = useState(initialState);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPost((prev) => ({ ...prev, [name]: value }));
  };

  const createPost = async (event) => {
    event.preventDefault();

    if (!post.title || !post.content) {
      alert("Please fill out all required fields");
      return;
    }

    try {
      await supabase.from("post").insert([post]);
      setShowSuccessMessage(true);
      setPost(initialState);
    } catch (error) {
      console.error("Error creating post:", error.message);
    }
  };

  return (
    <>
      <div className="create-post">
        <h1>Create Post</h1>
      </div>
      {showSuccessMessage && (
        <div
          className="alert alert-success alert-dismissible fade show"
          role="alert"
        >
          Post created successfully!
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
        <form onSubmit={createPost}>
          <div className="card" style={{ width: "50%", display: "flex" }}>
            <div className="card-body">
              <h5 className="card-title">Post Attributes</h5>

              <div>
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
                  aria-label="Title"
                  required
                />
              </div>

              <div>
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
                  aria-label="Content"
                  required
                ></textarea>
              </div>
              <div>
                <label htmlFor="image_url" className="form-label">
                  Image
                </label>
                <input
                  className="form-control"
                  type="url"
                  id="image_url"
                  name="image_url"
                  value={post.image_url}
                  onChange={handleChange}
                  aria-label="image_url"
                  required
                  placeholder="Optional"
                ></input>
              </div>

              <input type="submit" value="Submit" className="btn btn-primary" />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreatePost;
