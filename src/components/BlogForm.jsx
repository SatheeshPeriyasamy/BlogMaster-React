import { useState } from "react";
import { saveBlogToStorage } from "../utils/localStorageHelper";

const BlogForm = ({ setBlogs }) => {
  const [blog, setBlog] = useState({
    title: "",
    content: "",
    imageUrl: "",
    category: "Tech",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBlog = { ...blog, id: Date.now(), views: 0, publishedAt: new Date() };
    setBlogs((prev) => [newBlog, ...prev]);
    saveBlogToStorage(newBlog);
    setBlog({ title: "", content: "", imageUrl: "", category: "Tech" });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
      <input type="text" placeholder="Title" value={blog.title} onChange={(e) => setBlog({ ...blog, title: e.target.value })} required className="w-full p-2 border rounded mb-2" />
      <textarea placeholder="Content" value={blog.content} onChange={(e) => setBlog({ ...blog, content: e.target.value })} required className="w-full p-2 border rounded mb-2" />
      <input type="url" placeholder="Image URL" value={blog.imageUrl} onChange={(e) => setBlog({ ...blog, imageUrl: e.target.value })} className="w-full p-2 border rounded mb-2" />
      <select value={blog.category} onChange={(e) => setBlog({ ...blog, category: e.target.value })} className="w-full p-2 border rounded mb-2">
        <option>Tech</option>
        <option>Sports</option>
        <option>Politics</option>
        <option>History</option>
      </select>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Post</button>
    </form>
  );
};

export default BlogForm;
