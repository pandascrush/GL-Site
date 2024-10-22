// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// // import "./Blogviewed.css";
// import axios from "axios";

// function Blogviewed() {
//   const [blogs, setBlogs] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [categoryId, setCategoryId] = useState(null);

//   useEffect(() => {
//     setBlogs([]);
//     if (selectedCategory === "All") {
//       axios
//         .get(`http://localhost:5000/blogs?t=${Date.now()}`)
//         .then((res) => {
//           setBlogs(res.data);
//         })
//         .catch((err) => console.error("Error fetching blogs:", err));
//     } else if (categoryId) {
//       axios
//         .get(
//           `http://localhost:5000/blogs/category/${categoryId}?t=${Date.now()}`
//         )
//         .then((res) => {
//           setBlogs(res.data);
//         })
//         .catch((err) => console.error("Error fetching category blogs:", err));
//     }
//   }, [selectedCategory, categoryId]);

//   const handleCategoryClick = (category) => {
//     setSelectedCategory(category);
//     switch (category) {
//       case "SAP":
//         setCategoryId(1);
//         break;
//       case "IT":
//         setCategoryId(2);
//         break;
//       case "DM":
//         setCategoryId(3);
//         break;
//       default:
//         setCategoryId(null);
//         break;
//     }
//   };

//   // Determine path based on category_id
//   const getPath = (category_id, blogId) => {
//     switch (category_id) {
//       case 1:
//         return `/Sap_blog/${btoa(blogId)}`;
//       case 2:
//         return `/IT_Blog/${btoa(blogId)}`;
//       case 3:
//         return `/Digital_Marketing_Blog/${btoa(blogId)}`;
//       default:
//         return "/";
//     }
//   };

//   return (
//     <div className="container-fluid">
//       <h1 className="text-center headblog mb-5">
//         <b>Additional Insights</b>
//       </h1>
//       <div className="row m-4">
//         <div className="col d-flex flex-column flex-md-row justify-content-md-evenly border-bottom text-start">
//           {["All", "SAP", "IT", "DM","ADD BLOG"].map((category) => (
//             <Link
//               key={category}
//               className={`lnkfnt ${
//                 selectedCategory === category ? "active" : ""
//               } col-12 col-md-auto text-start mb-2 mb-md-0`}
//               onClick={() => handleCategoryClick(category)}
//             >
//               {category === "IT" ? "IT Services" : category}
//             </Link>
//           ))}
//         </div>
//       </div>

//       <div className="row">
//         {blogs.map((blog, index) => (
//           <div
//             key={blog.id}
//             className="col-sm-12 col-lg-4"
//           >
//             <Link
//               style={{ textDecoration: "none" }}
//               to={getPath(blog.category_id, blog.id)}
//             >
//               <div className="card shadowcard my-4">
//                 <img
//                   src={blog.blog_image}
//                   alt={blog.title}
//                   className="card-img-top cm1"
//                 />
//                 <div className="card-body">
//                   <h5 className="card-title">
//                     <b>{blog.title}</b>
//                   </h5>
//                   <div className="d-flex justify-content-around">
//                     <button className="btn btn-outline-info">View</button>
//                     <button className="btn btn-outline-info">Update</button>
//                     <button className="btn btn-outline-info">Delete</button>
//                   </div>
//                 </div>
//               </div>
//             </Link>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Blogviewed;

import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import BlogUpdate from "../BlogDisplay/BlogUpdate";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";

function Blogviewed() {
  const [blogs, setBlogs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categoryId, setCategoryId] = useState(null);
  const navigate = useNavigate();

  const {id} = useParams()

  useEffect(() => {
    setBlogs([]);
    if (selectedCategory === "All") {
      axios
        .get(`http://localhost:5000/content/blogs?t=${Date.now()}`)
        .then((res) => {
          console.log(res.data);

          setBlogs(res.data);
        })
        .catch((err) => console.error("Error fetching blogs:", err));
    } else if (categoryId) {
      axios
        .get(
          `http://localhost:5000/blogs/content/category/${categoryId}?t=${Date.now()}`
        )
        .then((res) => {
          console.log(res.data);
          setBlogs(res.data);
        })
        .catch((err) => console.error("Error fetching category blogs:", err));
    }
  }, [selectedCategory, categoryId]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    switch (category) {
      case "SAP":
        setCategoryId(1);
        break;
      case "IT":
        setCategoryId(2);
        break;
      case "DM":
        setCategoryId(3);
        break;
      default:
        setCategoryId(null);
        break;
    }
  };

  const handleAddBlogClick = () => {
    navigate("/Dynamic_blog");
  };

  const handleupdate = (a) => {
    navigate(`/UpdateBlog/${btoa(a)}/${id}`);
  };

  const getPath = (category_id, blogId) => {
    switch (category_id) {
      case 1:
        return `/Sap_blog/${btoa(blogId)}`;
      case 2:
        return `/IT_Blog/${btoa(blogId)}`;
      case 3:
        return `/Digital_Marketing_Blog/${btoa(blogId)}`;
      default:
        return "/";
    }
  };

  const deleteBlog = (blogId) => {
    axios
      .delete(`http://localhost:5000/blogs/delete/${blogId}`)
      .then((res) => {
        if (res.data.message === "Blog deleted successfully") {
          alert("Blog deleted successfully!");
          setBlogs(blogs.filter((blog) => blog.id !== blogId));
        } else {
          alert(res.data.error || "Error deleting the blog.");
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Error deleting the blog.");
      });
  };

  const togglePublish = (blogId, currentStatus) => {
    axios
      .put(`http://localhost:5000/blogs/togglePublish/${blogId}`)
      .then((res) => {
        if (res.data.success) {
          setBlogs((prevBlogs) =>
            prevBlogs.map((blog) =>
              blog.id === blogId ? { ...blog, publish: !currentStatus } : blog
            )
          );
        } else {
          alert("Failed to toggle publish status.");
        }
      })
      .catch((err) => {
        console.error("Error toggling publish status:", err);
        alert("Error toggling publish status.");
      });
  };

  return (
    <div className="container-fluid">
      <h1 className="text-center headblog mb-5 text-center">
        <b>Additional Insights</b>
      </h1>

      <div className="row m-4">
        <div className="col d-flex flex-column flex-md-row justify-content-md-evenly border-bottom text-start">
          {["All", "SAP", "IT", "DM"].map((category) => (
            <Link
              key={category}
              className={`lnkfnt ${
                selectedCategory === category ? "active" : ""
              } col-12 col-md-auto text-start mb-2 mb-md-0`}
              onClick={() => handleCategoryClick(category)}
            >
              {category === "IT" ? "IT Services" : category}
            </Link>
          ))}
          <button
            className="btn btn-primary col-12 col-md-auto mb-2 mb-md-0"
            onClick={handleAddBlogClick}
          >
            ADD BLOG
          </button>

          <button
            className="btn btn-danger col-12 col-md-auto mb-2 mb-md-0"
            onClick={() => {
              navigate("/");
              //   window.location.assign("/");
            }}
          >
            Logout
          </button>
        </div>
      </div>

      <div className="row">
        {blogs.map((blog) => (
          <div key={blog.id} className="col-sm-12 col-lg-4">
            <div className="card shadowcard my-4 position-relative">
              <img
                src={blog.blog_image}
                alt={blog.title}
                className="card-img-top cm1"
              />
              <div className="card-body">
                <h5 className="card-title">
                  <b>{blog.title}</b>
                </h5>
                <div className="d-flex justify-content-around">
                  <Link
                    style={{ textDecoration: "none" }}
                    to={getPath(blog.category_id, blog.id)}
                    className="btn btn-outline-info"
                  >
                    View
                  </Link>
                  <button
                    className="btn btn-outline-info"
                    onClick={() => handleupdate(blog.id)}
                  >
                    Update
                  </button>
                  <button
                    onClick={() => deleteBlog(blog.id)}
                    className="btn btn-outline-info"
                  >
                    Delete
                  </button>
                </div>
              </div>
              {/* Toggle Publish Button */}
              <button
                className={`position-absolute top-0 end-0 btn ${
                  blog.publish ? "btn-success" : "btn-secondary"
                }`}
                style={{ margin: "10px" }}
                onClick={() => togglePublish(blog.id, blog.publish)}
              >
                {blog.publish ? "Published" : "Unpublished"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Blogviewed;
