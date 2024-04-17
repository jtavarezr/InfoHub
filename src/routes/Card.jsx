import React, { useState, useEffect } from "react";
import supabase from "../clients";
import { Link } from "react-router-dom";





function Card({
  id,
  title,
  image_url,
  upvotes,
  content,
  created_at,
  comments,
  count_comment
}) {
  const [count, setCount] = useState(upvotes);
  const [unreadComments, setUnreadComments] = useState(0);


  const updateCount = async () => {
    try {
      const { data, error } = await supabase
        .from("post")
        .update({ upvotes: count + 1 })
        .eq("id", id)
        .select();

      if (error) {
        console.error("Error updating likes count:", error.message);
      } else {
        setCount((count) => count + 1);
      }
    } catch (error) {
      console.error("Error updating likes count:", error.message);
    }
  };

const time = (created_at) => {
  const differenceMs = new Date() - new Date(created_at);
  const minutesAgo = Math.floor(differenceMs / (1000 * 60));

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

const getpicture =() => {
  return "https://picsum.photos/640/360";
}
  const truncatedContent =
    content.length > 150 ? content.substring(0, 150) + "..." : content;

  return (
    <>
      <div className="col">
        <div className="card">
          <Link to={`/update/${id}`}>
            <div className="card-header d-flex justify-content-between align-items-center">
              <i className="bi bi-github fs-3"></i>
              <i className="bi bi-three-dots-vertical"></i>
            </div>
            <h5 className="card-title">{title}</h5>
            <small className="text-muted">
              Last updated {time(created_at)} ago
            </small>{" "}
          </Link>
          <img
            src={image_url ? image_url : getpicture()}
            className="card-img-top"
            alt="Skyscrapers"
            style={{ width: "100%", height: "200px", objectFit: "cover" }}
          />
          <div className="card-body">
            <p className="card-text">{truncatedContent}</p>
          </div>
          <div className="card-footer text-muted d-flex justify-content-between align-items-center">
            <div>
              <p onClick={updateCount} className="like  fs-3">
                👍 {count ? count : 0}
              </p>
            </div>
            <div>
              <span className="position-absolute  translate-middle badge rounded-pill bg-secondary">
                {count_comment > 0 ? `+${unreadComments}` : "0"}{" "}
                <span className="visually-hidden">unread messages</span>
              </span>
              <i className="bi bi-chat-text  fs-3"></i>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
