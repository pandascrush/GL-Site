import React, { useEffect, useState } from "react";
import "./Sapblog.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Sapblog() {
  const [blogs, setBlogs] = useState([]); // State to hold the fetched blog data
  const navigate = useNavigate();

  const handleReadMoreClick = (id) => {
    navigate(`/Sap_blog/${btoa(id)}`); // Navigate to the blog details page with the blog id
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/blogs/category/1`)
      .then((res) => {
        console.log(res.data);
        setBlogs(res.data); // Store the fetched data in state
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="container-fluid" id="blogs">
      <div className="row my-5 pb-5 insightspart">
        <h1 className="text-center evolheading mb-5">
          <b>Additional Insights</b>
        </h1>
        {blogs.map((blog) => (
          <div key={blog.id} className="col-sm-12 col-lg-4">
            <div className="card colourcard text-light my-3">
              <img
                src={blog.blog_image} // Use the full blog image URL from the API
                title={blog.title}
                alt={blog.title}
                className="card-img-top"
              />
              <div className="card-body">
                <h5 className="card-title">{blog.title}</h5>
                <button
                  className="readbtn rounded-3 p-2"
                  onClick={() => handleReadMoreClick(blog.id)}
                >
                  Read More
                </button>
                <div className="py-3"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sapblog;
