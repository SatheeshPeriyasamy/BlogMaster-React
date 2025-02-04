export const getBlogsFromStorage = () => JSON.parse(localStorage.getItem("blogs")) || [];

export const saveBlogToStorage = (blog) => {
  const blogs = getBlogsFromStorage();
  blogs.unshift(blog);
  localStorage.setItem("blogs", JSON.stringify(blogs));
};

export const updateBlogViews = (blogId) => {
  const blogs = getBlogsFromStorage();
  const updatedBlogs = blogs.map((blog) =>
    blog.id === blogId ? { ...blog, views: (blog.views || 0) + 1 } : blog
  );
  localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
};

export const deleteBlogFromStorage = (blogId) => {
  const blogs = getBlogsFromStorage().filter(blog => blog.id !== blogId);
  localStorage.setItem("blogs", JSON.stringify(blogs));
};

export const updateBlogInStorage = (updatedBlog) => {
  const blogs = getBlogsFromStorage().map(blog =>
    blog.id === updatedBlog.id ? updatedBlog : blog
  );
  localStorage.setItem("blogs", JSON.stringify(blogs));
};

export const getComments = (blogId) => JSON.parse(localStorage.getItem(`comments-${blogId}`)) || [];

export const saveComment = (blogId, comment) => {
  const comments = getComments(blogId);
  comments.push(comment);
  localStorage.setItem(`comments-${blogId}`, JSON.stringify(comments));
};


