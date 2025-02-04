import BlogList from "../components/BlogList";
import FilterBar from "../components/FilterBar";
import { useState } from "react";

const Home = ({ blogs, setBlogs }) => {
  const [filter, setFilter] = useState("All");

  return (
    <div>
      <FilterBar setFilter={setFilter} />
      <BlogList blogs={blogs} setBlogs={setBlogs} filter={filter} />
    </div>
  );
};

export default Home;
    