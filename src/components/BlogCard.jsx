import { useState } from "react";
import BlogModal from "./BlogModal";
import { updateBlogViews } from "../utils/localStorageHelper";

const BlogCard = ({ blog, setBlogs }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    updateBlogViews(blog.id);
    setBlogs((prev) =>
      prev.map((b) => (b.id === blog.id ? { ...b, views: b.views + 1 } : b))
    );
    setIsOpen(true);
  };

  return (
    <>
      <div className="bg-white p-4 rounded shadow cursor-pointer" onClick={handleOpen}>
        <img src={blog.imageUrl} alt={blog.title} className="w-full h-40 object-cover rounded mb-2" />
        <h3 className="font-bold">{blog.title}</h3>
        <p className="text-sm text-gray-500">
          {blog.category} • {new Date(blog.publishedAt).toLocaleString()}
        </p>
        <p className="text-sm text-gray-600">👀 {blog.views} Views</p>
      </div>
      {isOpen && <BlogModal blog={blog} setBlogs={setBlogs} closeModal={() => setIsOpen(false)} />}
    </>
  );
};

export default BlogCard;
