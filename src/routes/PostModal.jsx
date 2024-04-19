import React, { useEffect, useState } from "react";
import { updateCount, fetchComments } from "../utils/utils";
import supabase from "../clients";

/**
 * PostModal Component.
 * @param {Object} props - Component props.
 * @param {boolean} props.isOpen - Indicates whether the modal is open or closed.
 * @param {function} props.setIsOpen - Function to set the modal open/close state.
 * @param {string} props.id - Post ID.
 * @param {string} props.content - Post content.
 * @param {string} props.image_url - URL of the post image.
 * @param {number} props.upvotes - Number of upvotes for the post.
 * @param {number} props.commentCount - Number of comments for the post.
 * @returns {JSX.Element} - Modal component to display a post.
 */
function PostModal({
  isOpen,
  setIsOpen,
  id,
  content,
  image_url,
  upvotes,
  commentCount,
  title,
  source_url,
}) {
  // Initial state of a comment
  const initialCommentState = {
    comment: "",
    content_id: id,
    user_id: id,
  };

  // State to store a new comment and existing comments
  const [newComment, setNewComment] = useState(initialCommentState);
  const [comments, setComments] = useState([]);

  // Effect to load post comments when the modal opens
  useEffect(() => {
    const fetchCommentsData = async () => {
      if (id !== undefined) {
        try {
          const response = await fetchComments(id);
          if (response) {
            setComments(response);
          } else {
            console.error("No comments found for this item.");
          }
        } catch (error) {
          console.error("Error fetching comments: " + error.message);
        }
      }
    };

    fetchCommentsData();
  }, [id]);

  // Function to close the modal
  const closeModal = () => {
    setIsOpen(false);
  };

  // Function to handle updating the upvote count
  const handleUpdateCount = async () => {
    await updateCount(id, upvotes, setUpvotes);
  };

  // Function to create a new comment
  const createNewComment = async (event) => {
    event.preventDefault();

    try {
      await supabase.from("comments").insert([newComment]);
      setNewComment(initialCommentState);
    } catch (error) {
      console.error("Error creating comment:", error.message);
    }
  };

  return (
    <div
      className={`modal fade ${isOpen ? "show" : ""} bg-secondary`}
      tabIndex="-1"
      style={{ display: isOpen ? "block" : "none" }}
    >
      {/* Modal Section */}
      <section>
        {/* Modal Content */}
        <div
          className="card modal-body modal-xl "
          style={{
            maxWidth: "70%",
            marginLeft: "15%",
            marginTop: "5%",
            marginBottom: "5%",
            backgroundColor: "#adb5bd",
          }}
        >
          {/* Card Body */}
          <div className="row">
            <div className="col-sm-8">
              <div className="card-body text-white bg-dark ">
                {/* Author Info */}
                <div className="d-flex mb-3 ">
                  <a href="#">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/new/avatars/18.webp"
                      className="border rounded-circle me-2"
                      alt="Avatar"
                      style={{ height: "40px" }}
                    />
                  </a>
                  <div>
                    <a href="#" className="text-white mb-0">
                      <strong>Anna Doe</strong>
                    </a>
                    <a
                      href="#"
                      className="text-white d-block"
                      style={{ marginTop: "-6px" }}
                    >
                      <small>10h</small>
                    </a>
                  </div>
                  <div className="text-center">
                    <h3 className="ms-5">
                      {title.length > 35
                        ? title.substring(0, 35) + "..."
                        : title}
                    </h3>
                  </div>
                </div>
                {/* Close Button */}
                <button
                  type="button"
                  className="bi fs-8 position-absolute btn-close top-0 end-0"
                  onClick={closeModal}
                >
                  {" "}
                  <span aria-hidden="true">&times;</span>
                </button>
                {/* Post Content */}
                <div
                  className="overflow-auto p-3 "
                  style={{ maxWidth: "100%", maxHeight: "100px" }}
                >
                  <p>{content}</p>
                </div>
                {/* Image */}
                <div className="bg-image overflow ripple rounded-0">
                  <img src={image_url} className="w-50" alt="Media" />
                  <a href="#!">
                    <div
                      className="mask"
                      style={{ backgroundColor: "rgba(251, 251, 251, 0.2)" }}
                    ></div>
                  </a>
                </div>
                {/* Post Footer */}
                <div className="card-body">
                  {/* Like and Comment Count */}
                  <div className="d-flex justify-content-between mb-3">
                    <div>
                      <a href="">
                        <i className="fas fa-thumbs-up text-primary"></i>
                        <i className="fas fa-heart text-danger"></i>
                        <span>{upvotes ? upvotes : 0}</span>
                      </a>
                    </div>
                    <div>
                      <a href="" className="text-muted">
                        {commentCount ? commentCount : 0} comments
                      </a>
                    </div>
                  </div>
                  {/* Like, Comment, Share Buttons */}
                  <div className="d-flex justify-content-between text-center border-top border-bottom mb-4">
                    <button
                      type="button"
                      className="btn btn-link btn-lg"
                      onClick={handleUpdateCount}
                    >
                      <i className="fas fa-thumbs-up me-2"></i>Like
                    </button>
                    <button type="button" className="btn btn-link btn-lg">
                      <i className="fas fa-comment-alt me-2"></i>Comment
                    </button>
                    <button type="button" className="btn btn-link btn-lg">
                      <i className="fas fa-share me-2"></i>Share
                    </button>
                  </div>
                  {/* Comment Form */}
                  <form onSubmit={createNewComment}>
                    <div className="d-flex mb-3">
                      <a href="#">
                        <img
                          src="https://mdbcdn.b-cdn.net/img/new/avatars/18.webp"
                          className="border rounded-circle me-2"
                          alt="Avatar"
                          style={{ height: "40px" }}
                        />
                      </a>
                      <div data-mdb-input-init className="form-outline w-100">
                        <textarea
                          className="form-control"
                          id="textAreaExample"
                          rows="2"
                          value={newComment.comment}
                          placeholder="Comment ..."
                          onChange={(e) =>
                            setNewComment({
                              ...newComment,
                              comment: e.target.value,
                            })
                          }
                        ></textarea>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between">
                      <label className="form-label" htmlFor="textAreaExample">
                        Write a comment
                      </label>
                      <button type="submit" className="btn btn-primary">
                        Send
                      </button>
                    </div>
                  </form>
                  {/* Comments Section */}
                  <div className="mb-3 ">
                    {/* Display Comments */}
                    {comments &&
                      comments.map((comment, index) => (
                        <div key={index} className="d-flex">
                          <div className="d-flex mb-3">
                            <a href="#">
                              <img
                                src="https://mdbcdn.b-cdn.net/img/new/avatars/5.webp"
                                className="border rounded-circle me-2"
                                alt="Avatar"
                                style={{ height: "40px" }}
                              />
                            </a>
                            <div className="text-white bg-ligth">
                              <div className="bg-light rounded-3 px-3 py-1">
                                <a href="#" className="text-dark mb-0">
                                  <strong>John Doe Comment</strong>
                                </a>
                                <a href="#" className="text-muted d-block">
                                  <small>{comment.comment}</small>
                                </a>
                              </div>
                              <a
                                href="#"
                                className="text-white small ms-3 me-2"
                              >
                                <strong>Like</strong>
                              </a>
                              <a href="#" className="text-white small me-2">
                                <strong>Reply</strong>
                              </a>
                            </div>
                            <hr className="hr " style={{ color: "white" }} />
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="col border-left-0 text-white bg-dark">
              <hr className="hr" />
              <button
                className="btn btn-white text-white border bi bi-arrow-up-right"
                onClick={() => window.open(source_url, "_blank").focus()}
              >
                Read Post{" "}
              </button>
              <hr className="hr hr-blurry" />

              <div className="card sb-3 bg-black">
                <div className="card-body text-white bg-dark">
                  Subscribe....{" "}
                </div>
              </div>
              <hr className="hr hr-blurry" />
              <div className="card text-white border bg-dark ">
                <div className="card-body">
                  <h5 className="card-title">Recommend</h5>
                  <hr className="hr hr-blurry" />
                  <div className="card-text">
                    <i
                      className="bi bi-copy"
                      onClick={() => {
                        navigator.clipboard.writeText(window.location.href);
                      }}
                    >
                      {" "}
                      Copy{" "}
                    </i>
                    <hr className="hr hr-blurry" />
                    <i
                      className="bi bi-whatsapp"
                      onClick={() =>
                        window
                          .open("https://web.whatsapp.com/", "_blank")
                          .focus()
                      }
                    >
                      {" "}
                      WhatsApp{" "}
                    </i>
                    <hr className="hr hr-blurry" />
                    <i
                      className="bi bi-facebook"
                      onClick={() =>
                        window
                          .open("https://www.facebook.com/", "_blank")
                          .focus()
                      }
                    >
                      {" "}
                      Facebook
                    </i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PostModal;
