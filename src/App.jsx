import { useState } from "react";
import Home from "./pages/Home";
import BlogForm from "./components/BlogForm";
import { getBlogsFromStorage } from "./utils/localStorageHelper";

function App() {
  const [blogs, setBlogs] = useState(getBlogsFromStorage());

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-4">Blog Master</h1>
      <BlogForm setBlogs={setBlogs} />
      <Home blogs={blogs} setBlogs={setBlogs} />
    </div>
  );
}

export default App;
