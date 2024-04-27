import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  useTheme,
  Button,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { updateCount, fetchComments, createComment } from "../utils/utils";
import supabase from "../clients"; // Importar el cliente Supabase
import { Badge } from "react-bootstrap";

function ResponsiveDialog({
  open,
  onClose,
  id,
  content,
  image_url,
  upvotes,
  count_comment,
  title,
  source_url,
}) {
  const [comments, setComments] = useState([]);
  const [username, setUsername] = useState("");
  const [newComment, setNewComment] = useState({
    comment: "",
    content_id: id,
    user_id: id,
    profileId: "",
  });

  useEffect(() => {
    fetchCommentsData();
    fetchUserData();
  }, [id]);

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

  const fetchUserData = async () => {
    try {
      const { data: userData, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user data:", error.message);
      } else {
        setUsername(userData.user.user_metadata?.first_name || "");
      }
    } catch (error) {
      console.error("Error fetching user data:", error.message);
    }
  };

  const closeModal = () => {
    onClose(false);
  };

  const handleUpdateCount = async () => {
    await updateCount(id, upvotes, setUpvotes);
  };

  const handleSubmitComment = async (event) => {
    event.preventDefault();

    if (username) {
      const commentWithUsername = {
        ...newComment,
        profileId: username,
      };

      try {
        await createComment(commentWithUsername);
        // Update comments when a new one is created
        fetchCommentsData();
        setNewComment({
          ...newComment,
          comment: "",
        });
      } catch (error) {
        console.error("Error creating comment:", error.message);
      }
    } else {
      console.error("Username is not available.");
    }
  };

  const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("lg"));


  return (
    <Dialog
      fullScreen={fullScreen}
      fullWidth={true}
      maxWidth={"lg"}
      open={open}
      onClose={closeModal}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        <div className="d-flex mb-3 ">
          <img
            src="https://mdbcdn.b-cdn.net/img/new/avatars/18.webp"
            className="border rounded-circle me-2"
            alt="Avatar"
            style={{ height: "40px" }}
          />
          <div>
            <strong>Anna Doe</strong>
            <small className="text-muted d-block">10h</small>
          </div>
          <h3 className="position-absolute top-0 start-50">
            {title.length > 35 ? title.substring(0, 35) + "..." : title}
          </h3>
        </div>
        <Button
          color="secondary"
          variant="ghost"
          className="fs-4 position-absolute top-0 end-0"
          onClick={closeModal}
        >
          <i className="bi bi-x-circle"></i>
        </Button>
      </DialogTitle>
      <DialogContent>
        <div className="row">
          <div className="col-sm-8">
            <div className="card">
              <div className="card-body">
                <div
                  className="bi bi-x-circle fs-4 position-absolute top-0 end-0"
                  onClick={closeModal}
                ></div>
                <div
                  className="overflow-auto p-3"
                  style={{ maxWidth: "100%", maxHeight: "100px" }}
                >
                  <p>{content}</p>
                </div>
                <div className="bg-image overflow ripple rounded-0">
                  <img src={image_url} className="w-50" alt="Media" />
                </div>
                <div className="card-body">
                  <div className="d-flex justify-content-between mb-3">
                    <div>
                      <a href="#">
                        <i className="fas fa-thumbs-up text-primary"></i>
                        <i className="fas fa-heart text-danger"></i>
                        <span>{upvotes ? upvotes : 0}</span>
                      </a>
                    </div>
                    <div>
                      <a href="" className="text-back">
                        <Badge color="secondary">
                          {count_comment ? count_comment : 0}
                        </Badge>{" "}
                        comments
                      </a>
                    </div>
                  </div>
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
                  <form onSubmit={handleSubmitComment}>
                    <div className="d-flex mb-3">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/new/avatars/18.webp"
                        className="border rounded-circle me-2"
                        alt="Avatar"
                        style={{ height: "40px" }}
                      />
                      <div data-mdb-input-init className="form-outline w-100">
                        <textarea
                          className="form-control"
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
                  <div className="mb-3">
                    {comments &&
                      comments.map((comment, index) => (
                        <div key={index} className="d-flex">
                          <img
                            src="https://mdbcdn.b-cdn.net/img/new/avatars/5.webp"
                            className="border rounded-circle me-2"
                            alt="Avatar"
                            style={{ height: "40px" }}
                          />
                          <div className="text-black bg-ligth">
                            <div className="bg-light rounded-3 px-3 py-1">
                              <div>
                                <strong>{comment.profileId}</strong>
                              </div>

                              <small>{comment.comment}</small>
                            </div>
                            <a href="#" className="text-white small ms-3 me-2">
                              <strong>Like</strong>
                            </a>
                            <a href="#" className="text-white small me-2">
                              <strong>Reply</strong>
                            </a>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col border-left-0 text-white bg-light">
            <hr className="hr" />
            <button
              className="btn btn-primary text-white border bi bi-arrow-up-right"
              onClick={() => window.open(source_url, "_blank").focus()}
            >
              Read Post{" "}
            </button>
            <hr className="hr hr-blurry" />
            <div className="card sb-3 bg-black">
              <div className="card-body text-white bg-dark">Subscribe.... </div>
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
                      window.open("https://web.whatsapp.com/", "_blank").focus()
                    }
                  >
                    {" "}
                    WhatsApp{" "}
                  </i>
                  <hr className="hr hr-blurry" />
                  <i
                    className="bi bi-facebook"
                    onClick={() =>
                      window.open("https://www.facebook.com/", "_blank").focus()
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
      </DialogContent>
    </Dialog>
  );
}

export default ResponsiveDialog;
