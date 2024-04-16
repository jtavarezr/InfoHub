import React, { useEffect, useState } from "react";
import supabase from "../utils/clients";
import "bootstrap/dist/css/bootstrap.css";
import RoleSelect from "../utils/RoleSelect";
import CategorySelect from "../utils/CategorySelect";

const CreateCrewmate = () => {
  const initialState = {
    name: "",
    role: "",
    specialty: "",
    experiencelevel: "",
    category: "",
    description: "",
    status: false,
    image: "",
  };

  const [post, setPost] = useState(initialState);
  const [categories, setCategories] = useState([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase.from("category").select();
      if (error) {
        console.error("Error fetching categories:", error.message);
      } else {
        console.log("Fetched Categories: ", data);
        setCategories(data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error.message);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "category") {
      const selectedCategory = categories.find(
        (category) => category.category === value
      );
      setSelectedImage(selectedCategory ? selectedCategory.image : "");
    }
    setPost((prev) => ({ ...prev, [name]: value }));
  };

  const createPost = async (event) => {
    event.preventDefault();

    if (
      !post.name ||
      !post.role ||
      !post.category ||
      !post.experiencelevel ||
      !post.description
    ) {
      alert("Please fill out all required fields");
      return;
    }

    try {
      await supabase.from("crewmates").insert([post]);
      setShowSuccessMessage(true);
      setPost(initialState);
    } catch (error) {
      console.error("Error creating crewmate:", error.message);
    }
  };

  return (
    <>
      <div className="create-crewmate">
        <h1>Create a New Crewmate</h1>
      </div>
      {showSuccessMessage && (
        <div
          className="alert alert-success alert-dismissible fade show"
          role="alert"
        >
          Crewmate created successfully!
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
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Crewmate Attributes</h5>

              <div className="row mb-3 align-items-center">
                <div className="col-sm-6">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={post.name}
                    onChange={handleChange}
                    aria-label="Name"
                    required
                  />
                  <CategorySelect
                    categories={categories}
                    value={post.category}
                    onChange={handleChange}
                  />

                  <RoleSelect value={post.role} onChange={handleChange} />
                </div>
                <div className="col-sm-6 mb-3">
                  <div className="border rounded p-1">
                    <img
                      src={`/${selectedImage}`}
                      alt="Status Image"
                      style={{ height: "200px" }}
                    />
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="mb-3">
                    <label htmlFor="experiencelevel" className="form-label">
                      Experience
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="experiencelevel"
                      name="experiencelevel"
                      value={post.experiencelevel}
                      onChange={handleChange}
                      aria-label="Experience"
                      required
                    />
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="mb-3">
                    <label htmlFor="attack" className="form-label">
                      Attack
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="attack"
                      name="attack"
                      value={post.attack}
                      onChange={handleChange}
                      aria-label="Attack"
                      required
                    />
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="mb-3">
                    <label htmlFor="experiencelevel" className="form-label">
                      Defense
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="defense"
                      name="defense"
                      value={post.defense}
                      onChange={handleChange}
                      aria-label="Defence"
                      required
                    />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="mb-3">
                    <label htmlFor="specialty" className="form-label">
                      Speed
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="speed"
                      name="speed"
                      value={post.speed}
                      onChange={handleChange}
                      aria-label="Speed"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  className="form-control"
                  id="description"
                  name="description"
                  value={post.description}
                  onChange={handleChange}
                  aria-label="With textarea"
                  required
                ></textarea>
              </div>
              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="status"
                  name="status"
                  checked={post.status}
                  onChange={() =>
                    setPost((prev) => ({ ...prev, status: !post.status }))
                  }
                />
                <label className="form-check-label" htmlFor="status">
                  Status
                </label>
              </div>
              <input type="submit" value="Submit" className="btn btn-primary" />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateCrewmate;
