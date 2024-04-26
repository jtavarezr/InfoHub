import React, { useEffect, useState } from "react";
import supabase from "../clients";
import "bootstrap/dist/css/bootstrap.css";
import {
  CFormLabel,
  CInputGroup,
  CInputGroupText,
  CFormInput,
  CRow,
  CCol,
  CFormSelect,
} from "@coreui/react";

const CreatePost = () => {
  const initialState = {
    title: "",
    content: "",
    image_url: "",
    source_url: "",
    category: "",
  };

  const [post, setPost] = useState(initialState);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPost((prev) => ({ ...prev, [name]: value }));
  };

  const [categories, setCategory] = useState([]);

  useEffect(() => {
    getCountries();
  }, []);

  async function getCountries() {
    const { data } = await supabase.from("tags_category").select();
    setCategory(data);
  }

    const handleChangeCategory = (event) => {
      const { value } = event.target;
      setPost((prevPost) => ({
        ...prevPost,
        category: value,
      }));
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
      <div className="container">
        <h1>Create Post</h1>
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
        <form onSubmit={createPost}>
          <div className="row w-75 mx-auto">
            <div className="col-md-12">
              <CRow xs={{ gutter: 2 }}>
                <CCol md>
                  <CFormInput
                    floatingLabel="Post Title"
                    placeholder="title"
                    id="title"
                    name="title"
                    value={post.title}
                    onChange={handleChange}
                    aria-label="Title"
                    required
                    type="text"
                  />
                </CCol>
                <CCol md>
                  <CFormSelect
                    id="category"
                    floatingLabel="Category"
                    aria-label="Works with selects"
                    value={post.category}
                    onChange={handleChangeCategory}
                  >
                    <option value="">Choose Categories...</option>;
                    {categories.map((category) => (
                      <option key={category.id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </CFormSelect>
                </CCol>
              </CRow>

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
              <CFormLabel htmlFor="basic-url">Image URL</CFormLabel>
              <CInputGroup className="mb-3">
                <CInputGroupText id="basic-addon3">
                  https://example.com/users/
                </CInputGroupText>
                <CFormInput
                  id="image_url"
                  name="image_url"
                  value={post.image_url}
                  onChange={handleChange}
                  aria-label="image_url"
                  placeholder="Optional"
                  aria-describedby="basic-addon3"
                />
              </CInputGroup>
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

            <button type="submit" className="btn btn-primary w-100">
              Submit
            </button>
          </div>
          <div className="form-group col-md-4"></div>
        </form>
      </div>
    </>
  );
};

export default CreatePost;
