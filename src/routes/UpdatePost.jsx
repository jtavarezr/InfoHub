import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import supabase from "../clients";

const UpdatePost = ({ postId }) => {
  const initialState = {
    title: "",
    content: "",
    image_url: "",
    source_url: "",
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

    const deleteCrewmate = async () => {
  if (confirm(`You want Delete! ${id}`) == false) {
    return
  } 
      try {
        await supabase.from("post").delete().eq("id", id);
        setShowSuccessMessage(true);
        <Link to={"/"} />;
      } catch (error) {
        console.error("Error deleting post:", error.message);
      }
    };
  return (
    <>
      <div className="container">
        <h1>Updating Post {post.id}</h1>
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
        <form onSubmit={updatePost}>
          <div className="row w-75 mx-auto">
            <div className="col-md-12">
              <div className="form-group">
                <label htmlFor="title">Title</label>
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
              <div className="form-group">
                <label htmlFor="content">Content</label>
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
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="image_url">Image address</label>
                <input
                  className="form-control"
                  type="url"
                  id="image_url"
                  name="image_url"
                  value={post.image_url}
                  onChange={handleChange}
                  aria-label="image_url"
                  placeholder="Optional"
                ></input>
              </div>
              <div className="form-group">
                <label htmlFor="source_url">URL</label>
                <input
                  className="form-control"
                  type="url"
                  id="source_url"
                  name="source_url"
                  value={post.source_url}
                  onChange={handleChange}
                  aria-label="source_url"
                  placeholder="Optional"
                ></input>
              </div>
            </div>

            <div className="col-md-6">
              {/* Image */}
              <div className="bg-image overflow ripple rounded-0">
                <img
                  src={
                    post.image_url
                      ? post.image_url
                      : "http://via.placeholder.com/640x360"
                  }
                  className="w-50"
                  alt="Insert your image address"
                />
                <a href="#!">
                  <div
                    className="mask"
                    style={{ backgroundColor: "rgba(251, 251, 251, 0.2)" }}
                  ></div>
                </a>
              </div>
            </div>
            <hr className="hr hr-blurry" />
          </div>
          <div className="container form-group col-md-4">
       

            <button type="submit" className="btn btn-primary">
              Update Post
            </button>
            <div
              type="button"
              className="btn btn-danger"
              onClick={deleteCrewmate}
            >
              <Link to="/all">Delete</Link>
            </div>
            <div type="button" className="btn btn-secondary">
              <Link to="/all">Cancel</Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdatePost;
