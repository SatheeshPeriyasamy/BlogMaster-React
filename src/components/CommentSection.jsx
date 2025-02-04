import { useState, useEffect } from "react";
import { getComments, saveComment } from "../utils/localStorageHelper";

const CommentSection = ({ blogId }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(getComments(blogId));

  useEffect(() => {
    setComments(getComments(blogId));
  }, [blogId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.trim() === "") return;
    
    const newComment = { text: comment, date: new Date().toLocaleString() };
    saveComment(blogId, newComment);
    setComments([...comments, newComment]);
    setComment("");
  };

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold">Comments</h3>
      <form onSubmit={handleSubmit} className="mt-2 flex">
        <input type="text" value={comment} onChange={(e) => setComment(e.target.value)}
          className="flex-1 border p-2 rounded-l"
          placeholder="Write a comment..." required />
        <button type="submit" className="bg-blue-500 text-white px-4 rounded-r">Post</button>
      </form>
      <ul className="mt-2">
        {comments.map((c, index) => (
          <li key={index} className="border-b p-2">
            <p>{c.text}</p>
            <span className="text-xs text-gray-500">{c.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentSection;
