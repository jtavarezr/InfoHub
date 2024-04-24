import React, { useState, useEffect } from "react";
import {
  Box,
  CssBaseline,
  Dialog,
  DialogContent,
  DialogTitle,
  List,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  Avatar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  updateCount,
  fetchComments,
  createComment,
} from "../utils/utils";

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
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const [comments, setComments] = useState([]);

  const initialCommentState = {
    comment: "",
    content_id: id,
    user_id: id,
    profileId: "",
  };
  // State to store a new comment and existing comments
  const [newComment, setNewComment] = useState(initialCommentState);

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
    onClose(false);
  };
  // Function to handle updating the upvote count
  const handleUpdateCount = async () => {
    await updateCount(id, upvotes, setUpvotes);
  };

  const handleSubmitComment = async (event) => {
    event.preventDefault();

    try {
      await createComment(newComment);
      setNewComment(initialCommentState);
    } catch (error) {
      console.error("Error creating comment:", error.message);
    }
  };

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
          <a href="#">
            <img
              src="https://mdbcdn.b-cdn.net/img/new/avatars/18.webp"
              className="border rounded-circle me-2"
              alt="Avatar"
              style={{ height: "40px" }}
            />
          </a>
          <div>
            <a href="#" className="text-black mb-0">
              <strong>Anna Doe</strong>
            </a>
            <a
              href="#"
              className="text-black d-block"
              style={{ marginTop: "-6px" }}
            >
              <small>10h</small>
            </a>
          </div>
          <h3 className="position-absolute  top-0 start-50">
            {" "}
            {title.length > 35 ? title.substring(0, 35) + "..." : title}{" "}
          </h3>
        </div>
        <CancelIcon
          className="fs-4 position-absolute  top-0 end-0"
          onClick={closeModal}
        />
      </DialogTitle>
      <DialogContent>
        {/* Card Body */}
        <div className="row">
          <div className="col-sm-8">
            <div className="card-body text-black bg-white ">
              {/* Author Info */}

              {/* Close Button */}
              <div
                className="bi bi-x-circle fs-4 position-absolute  top-0 end-0"
                onClick={closeModal}
              >
                {" "}
              </div>
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
                      {count_comment ? count_comment : 0} comments
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
                <form onSubmit={handleSubmitComment}>
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

                <Box>
                  <CssBaseline />
                  <List>
                    {messageExamples.map(({ primary, secondary, person }, index) => (
                      <ListItemButton key={index + person}>
                        <ListItemAvatar>
                          <Avatar alt="Profile Picture" src={person} />
                        </ListItemAvatar>
                        <ListItemText primary={primary} secondary={secondary} />
                      </ListItemButton>
                    ))}
                  </List>
                </Box>
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
                                <strong>{comment.user_id}</strong>
                              </a>
                              <a href="#" className="text-muted d-block">
                                <small>{comment.comment}</small>
                              </a>
                            </div>
                            <a href="#" className="text-white small ms-3 me-2">
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



const messageExamples = [
  {
    primary: "Brunch this week?",
    secondary:
      "I'll be in the neighbourhood this week. Let's grab a bite to eat",
    person: "/static/images/avatar/5.jpg",
  },
  {
    primary: "Birthday Gift",
    secondary: `Do you have a suggestion for a good present for John on his work
      anniversary. I am really confused & would love your thoughts on it.`,
    person: "/static/images/avatar/1.jpg",
  },
  {
    primary: "Recipe to try",
    secondary:
      "I am try out this new BBQ recipe, I think this might be amazing",
    person: "/static/images/avatar/2.jpg",
  },
  {
    primary: "Yes!",
    secondary: "I have the tickets to the ReactConf for this year.",
    person: "/static/images/avatar/3.jpg",
  },
  {
    primary: "Doctor's Appointment",
    secondary:
      "My appointment for the doctor was rescheduled for next Saturday.",
    person: "/static/images/avatar/4.jpg",
  },
  {
    primary: "Discussion",
    secondary: `Menus that are generated by the bottom app bar (such as a bottom
      navigation drawer or overflow menu) open as bottom sheets at a higher elevation
      than the bar.`,
    person: "/static/images/avatar/5.jpg",
  },
  {
    primary: "Summer BBQ",
    secondary: `Who wants to have a cookout this weekend? I just got some furniture
      for my backyard and would love to fire up the grill.`,
    person: "/static/images/avatar/1.jpg",
  },
];