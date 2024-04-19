/**
 * Card Component
 *
 * This component represents a card displaying information about a post.
 * It includes the post title, image, content, like count, comment count, and a button to open a modal for detailed view.
 *
 * Props:
 *  - id: Unique identifier for the post.
 *  - title: Title of the post.
 *  - image_url: URL of the image associated with the post.
 *  - upvotes: Number of upvotes for the post.
 *  - content: Content of the post.
 *  - created_at: Date and time when the post was created.
 *  - comments: Array of comments associated with the post.
 *  - comment_count: Number of comments for the post.
 *
 * State:
 *  - likeCount: State variable to track the number of likes for the post.
 *  - modalOpen: State variable to control the visibility of the modal for detailed view.
 *
 * Functions:
 *  - handleUpdateCount: Function to handle updating the like count of the post.
 *  - timeAgo: Function to calculate the time elapsed since the post was created.
 *  - getDefaultImage: Function to return a default image URL if no image is provided.
 *
 * @param {object} props - The props passed to the component.
 * @returns {JSX.Element} - Returns the JSX for the Card component.
 */

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { updateCount } from "../utils/utils";
import PostModal from "./PostModal";

function Card({
  id,
  title,
  image_url,
  upvotes,
  content,
  created_at,
  comments,
  comment_count,
  source_url,
}) {
  const [likeCount, setLikeCount] = useState(upvotes);
  const [modalOpen, setModalOpen] = useState(false);

  /**
   * Function to handle updating the like count of the post.
   */
  const handleUpdateCount = async () => {
    await updateCount(id, likeCount, setLikeCount);
  };

  /**
   * Function to calculate the time elapsed since the post was created.
   *
   * @param {string} createdAt - The date and time when the post was created.
   * @returns {string} - Returns a string representing the time elapsed.
   */
  const timeAgo = (createdAt) => {
    // Calculate the difference in milliseconds between the current time and the creation time
    const differenceMs = new Date() - new Date(createdAt);
    const minutesAgo = Math.floor(differenceMs / (1000 * 60));

    // Calculate the time elapsed in days, hours, and minutes
    // Display appropriate units based on the elapsed time
    if (minutesAgo < 1) {
      return "1 min";
    }

    const daysAgo = Math.floor(minutesAgo / 1440);
    const hoursAgo = Math.floor((minutesAgo % 1440) / 60);
    const minsAgo = minutesAgo % 60;

    if (daysAgo > 0) {
      return `${daysAgo} day${daysAgo > 1 ? "s" : ""}`;
    } else if (hoursAgo > 0) {
      return `${hoursAgo} hour${hoursAgo > 1 ? "s" : ""}`;
    } else {
      return `${minsAgo} min${minsAgo > 1 ? "s" : ""}`;
    }
  };

  /**
   * Function to return a default image URL if no image is provided.
   *
   * @returns {string} - Returns the URL of the default image.
   */
  const getDefaultImage = () => {
    return "https://picsum.photos/640/360";
  };

  // Truncate content if it exceeds 150 characters
  const truncatedContent =
    content.length > 150 ? content.substring(0, 150) + "..." : content;

  // Render the Card component
  return (
    <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
      <div className="card h-100">
        <div className="card-header d-flex justify-content-between align-items-center">
          {/* Author avatar */}
          <a href="#">
            <img
              src="https://mdbcdn.b-cdn.net/img/new/avatars/18.webp"
              className="border rounded-circle me-2"
              alt="Avatar"
              style={{ height: "40px" }}
            />
          </a>
          {/* Link to update post */}
          <Link to={`/update/${id}`}>
            <i className="bi bi-three-dots-vertical"></i>
          </Link>
        </div>
        <div className="card-body">
          {/* Post title */}
          <h5 className="card-title">{title}</h5>
          {/* Last updated time */}
          <small className="text-muted">
            Last updated {timeAgo(created_at)} ago
          </small>{" "}
          {/* Post image */}
          <img
            src={image_url ? image_url : getDefaultImage()}
            className="card-img-top"
            alt="Skyscrapers"
            style={{
              cursor: "pointer",
            }}
            onClick={() => setModalOpen(true)}
          />
          {/* Post content */}
          <p
            className="card-text mt-3"
            style={{ cursor: "pointer" }}
            onClick={() => setModalOpen(true)}
          >
            {truncatedContent}
          </p>
        </div>
        <div className="card-footer text-muted d-flex justify-content-between align-items-center">
          {/* Like count */}
          <div>
            <p
              onClick={handleUpdateCount}
              className="like fs-3 mb-0"
              style={{ cursor: "pointer" }}
            >
              👍 {likeCount ? likeCount : 0}
            </p>
          </div>
          {/* Comment count */}
          <div>
            <span className="position-relative">
              <span className="position-absolute translate-middle badge rounded-pill bg-secondary">
                {comment_count > 0 ? `+${comment_count}` : "0"}{" "}
                <span className="visually-hidden">unread messages</span>
              </span>
              <i
                className="bi bi-chat-text fs-3"
                style={{ cursor: "pointer" }}
              ></i>
            </span>
          </div>
        </div>
        {/* Post modal for detailed view */}
        <PostModal
          isOpen={modalOpen}
          setIsOpen={setModalOpen}
          content={content}
          image_url={image_url}
          upvotes={upvotes}
          count_comment={comment_count}
          id={id}
          title={title}
          source_url={source_url}
        />
      </div>
    </div>
  );
}

export default Card;
