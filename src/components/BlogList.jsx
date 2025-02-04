import BlogCard from "./BlogCard";

const BlogList = ({ blogs, setBlogs, filter }) => {
  const filteredBlogs = filter === "All" ? blogs : blogs.filter((blog) => blog.category === filter);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredBlogs.map((blog) => (
        <BlogCard key={blog.id} blog={blog} setBlogs={setBlogs} />
      ))}
    </div>
  );
};

export default BlogList;
