import { useState } from "react";
import CommentSection from "./CommentSection";
import { deleteBlogFromStorage, updateBlogInStorage } from "../utils/localStorageHelper";

const BlogModal = ({ blog, setBlogs, closeModal }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedBlog, setEditedBlog] = useState({ ...blog });

  const handleDelete = () => {
    deleteBlogFromStorage(blog.id);
    setBlogs((prev) => prev.filter((b) => b.id !== blog.id));
    closeModal();
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    updateBlogInStorage(editedBlog);
    setBlogs((prev) => prev.map((b) => (b.id === editedBlog.id ? editedBlog : b)));
    setIsEditing(false);
  };

  const shareBlog = (platform) => {
    const url = window.location.href;
    const text = `Check out this blog: ${blog.title} - ${url}`;
    if (platform === "email") {
      window.location.href = `mailto:?subject=${blog.title}&body=${text}`;
    } else if (platform === "whatsapp") {
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, "_blank");
    } else if (platform === "print") {
      window.print();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded shadow w-3/4 md:w-1/2 max-h-[90vh] overflow-y-auto">
        {/* Close button at the top */}
        <button className="text-red-500 float-right" onClick={closeModal}>✖</button>

        {isEditing ? (
          <form onSubmit={handleEditSubmit}>
            <input type="text" value={editedBlog.title} onChange={(e) => setEditedBlog({ ...editedBlog, title: e.target.value })} required className="w-full p-2 border rounded mb-2" />
            <textarea value={editedBlog.content} onChange={(e) => setEditedBlog({ ...editedBlog, content: e.target.value })} required className="w-full p-2 border rounded mb-2" />
            <input type="url" value={editedBlog.imageUrl} onChange={(e) => setEditedBlog({ ...editedBlog, imageUrl: e.target.value })} className="w-full p-2 border rounded mb-2" />
            <button type="submit" className="bg-green-500 text-white px-3 py-1 rounded mr-2">✅ Save</button>
            <button type="button" onClick={() => setIsEditing(false)} className="bg-gray-500 text-white px-3 py-1 rounded">❌ Cancel</button>
          </form>
        ) : (
          <>
            <h2 className="text-xl font-bold">{blog.title}</h2>
            <img src={blog.imageUrl} alt={blog.title} className="w-full h-60 object-cover rounded my-2" />
            <p>{blog.content}</p>
            <p className="text-sm text-gray-600 mt-2">👀 {blog.views} Views</p>

            {/* Edit and Delete Options */}
            <div className="mt-4 flex gap-4">
              <button onClick={() => setIsEditing(true)} className="bg-yellow-500 text-white px-3 py-1 rounded">✏️ Edit</button>
              <button onClick={handleDelete} className="bg-red-500 text-white px-3 py-1 rounded">🗑️ Delete</button>
            </div>

            {/* Sharing Options */}
            <div className="mt-4 flex gap-4">
              <button onClick={() => shareBlog("email")} className="bg-blue-500 text-white px-3 py-1 rounded">📧 Email</button>
              <button onClick={() => shareBlog("whatsapp")} className="bg-green-500 text-white px-3 py-1 rounded">📱 WhatsApp</button>
              <button onClick={() => shareBlog("print")} className="bg-gray-700 text-white px-3 py-1 rounded">🖨️ Print</button>
            </div>

            {/* Comments Section */}
            <CommentSection blogId={blog.id} />

            {/* Close button at the bottom */}
            <div className="text-center mt-4">
              <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={closeModal}>❌ Close</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BlogModal;
