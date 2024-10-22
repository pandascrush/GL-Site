import React, { useEffect, useState } from "react";
import "./Sapblogview.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import spim1 from "../Asset/sapblog.jpg";
import spim2 from "../Asset/textsap.png";
import spim3 from "../Asset/hana.jpeg";
import Menubar from "../../Landingpage/Menubar/Menubar";
import Footer from "../../Landingpage/Footer/Footer";
import Footercard from "../../Landingpage/Footercard/Footercard";
import axios from "axios";

function Sapblogview() {
  const navigate = useNavigate();

  const { id } = useParams();
  const decodedId = atob(id);
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [categoryId, setCategoryId] = useState();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/blogs/${decodedId}`)
      .then((res) => {
        setBlog(res.data);
        setCategoryId(res.data.category_id);
      })
      .catch((error) => {
        console.error("Error fetching blog data:", error);
      });
  }, [decodedId]);

  useEffect(() => {
    // Fetch related blogs based on category_id and exclude the current blog
    if (categoryId) {
      axios
        .get(`http://localhost:5000/relatedBlogs/${categoryId}/${decodedId}`)
        .then((res) => {
          setRelatedBlogs(res.data);
        })
        .catch((error) => {
          console.error("Error fetching related blogs:", error);
        });
    }
  }, [categoryId, decodedId]);

  const handleClick = () => {
    navigate("/Sap_blog1");
  };
  return (
    <div className="container-fluid blogpartcontent p-0 m-0">
     
      <div className="row my-3 mx-3">
        <div className="col-sm-12 col-lg-7">
          {blog ? (
            <>
              <h4 className="py-3">
                <b>{blog.title}</b>
              </h4>
              <div className="d-flex justify-content-center">
                <img
                  src={blog.blog_image.replace("\\", "/")}
                  alt={blog.title}
                  className="imsp py-3"
                />
              </div>
              <div dangerouslySetInnerHTML={{ __html: blog.content }} />
              <h5 className="text-dark fw-bold">Conclusion</h5>
              <p className="text-dark">{blog.conclusion}</p>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
<div className="col-sm-0 col-lg-1"></div>
        <div className="col-sm-12 col-lg-4">
          <div className="latestupdate">
            <h2 className="my-4">
              <b>Latest Updates</b>
         
            </h2>
            {relatedBlogs.map((relatedBlog) => (
              <Link
                to={`/Sap_blog/${btoa(relatedBlog.id)}`}
                key={relatedBlog.id}
                style={{ textDecoration: "none" }}
              >
                <div className="card shadowcard my-2">
                  <img
                    src={relatedBlog.blog_image.replace("\\", "/")}
                    alt={relatedBlog.title}
                    className="card-img-top"
                    
                  />
                  <div className="card-body">
                    <h5 className="card-title">
                      <b>{relatedBlog.title}</b>
                    </h5>
                    <p className="card-text">
                      {relatedBlog.content
                        .replace(/<[^>]+>/g, "")
                        .substring(0, 100)}
                      ...
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
     
    </div>
  );
}

export default Sapblogview;
