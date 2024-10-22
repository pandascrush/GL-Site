import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Contactsap.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Contactsap() {
  const [countryCodes, setCountryCodes] = useState([]);
  const [selectedCountryCode, setSelectedCountryCode] = useState("+91");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    whatsappnumber: "",
    companyName: "",
    companyWebsite: "",
    description: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [requestType, setRequestType] = useState(""); // State for request type

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        const data = response.data;
        const codes = data.map((country) => ({
          name: country.name.common,
          code: country.idd?.root
            ? `${country.idd.root}${
                country.idd.suffixes ? country.idd.suffixes[0] : ""
              }`
            : "+1",
        }));
        setCountryCodes(codes);
      })
      .catch((error) => console.error("Error fetching country codes:", error));
  }, []);

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };
  const validateName = (username) => {
    const nameRegex = /^[A-Za-z\s.]{2,}$/;
    return nameRegex.test(username);
  };
  const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^[0-9]{7,15}$/; // Adjusted to ensure the number is between 7 and 15 digits
    return phoneRegex.test(phoneNumber);
  };
  const validateWhatsappNumber = (whatsappnumber) => {
    const phoneRegex = /^[0-9]{7,15}$/; // Adjusted to ensure the number is between 7 and 15 digits
    return phoneRegex.test(whatsappnumber);
  };

  const validateWebsite = (url) => {
    const urlRegex =
      /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;
    return urlRegex.test(url);
  };
  const validateForm = () => {
    const newErrors = {};
    if (!requestType) {
      newErrors.requestType = "Please select a request type."; // Ensure this is set
    }
    if (!formData.email || !validateEmail(formData.email)) {
      newErrors.email = "Invalid email address.";
    }
    if (!formData.username || !validateName(formData.username)) {
      newErrors.username = "Invalid username.";
    }
    if (!formData.phoneNumber || !validatePhoneNumber(formData.phoneNumber)) {
      newErrors.phoneNumber = "Enter Valid Phone Number";
    }
    if (
      !formData.whatsappnumber ||
      !validatePhoneNumber(formData.whatsappnumber)
    ) {
      newErrors.whatsappnumber = "Enter Valid Phone Number";
    }
    if (!formData.companyWebsite || !validateWebsite(formData.companyWebsite)) {
      newErrors.companyWebsite = "Please enter a valid website URL.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validate fields on change
    if (name === "username") {
      if (!validateName(value)) {
        setErrors((prev) => ({ ...prev, username: "Invalid name" }));
      } else {
        setErrors((prev) => ({ ...prev, username: undefined }));
      }
    }
    if (name === "email") {
      if (!validateEmail(value)) {
        setErrors((prev) => ({ ...prev, email: "Invalid email address" }));
      } else {
        setErrors((prev) => ({ ...prev, email: undefined }));
      }
    }

    if (name === "phoneNumber") {
      if (!validatePhoneNumber(value)) {
        setErrors((prev) => ({
          ...prev,
          phoneNumber: "Enter Valid Phone Number",
        }));
      } else {
        setErrors((prev) => ({ ...prev, phoneNumber: undefined }));
      }
    }
    if (name === "whatsappnumber") {
      if (!validateWhatsappNumber(value)) {
        setErrors((prev) => ({
          ...prev,
          whatsappnumber: "Enter Valid Phone Number",
        }));
      } else {
        setErrors((prev) => ({ ...prev, whatsappnumber: undefined }));
      }
    }
    if (name === "companyWebsite") {
      if (!validateWebsite(value)) {
        setErrors((prev) => ({ ...prev, companyWebsite: "Enter valid URL" }));
      } else {
        setErrors((prev) => ({ ...prev, companyWebsite: undefined }));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const fullPhoneNumber = `${selectedCountryCode}${formData.phoneNumber}`;
    const fullwhatsappnumber = `${selectedCountryCode}${formData.whatsappnumber}`;
    const formValues = {
      username: formData.username,
      email: formData.email,
      phno: fullPhoneNumber,
      whatsappnumber: fullwhatsappnumber,
      company_name: formData.companyName,
      company_site: formData.companyWebsite,
      message: formData.description,
      request_type_id: requestType,
    };

    console.log(formValues);

    setLoading(true);
    axios
      .post("http://localhost:5000/submit-form", formValues)
      .then((response) => {
        if (response.data.message === "Form submitted successfully") {
          toast.success("Form submitted successfully");
          resetForm();
        } else if (response.data.message === "Database error") {
          toast.error("Value not inserted, try again");
        } else if (response.data.message === "Email already exists") {
          toast.error("Email already exists");
        }
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
        toast.error("An error occurred. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const resetForm = () => {
    setFormData({
      username: "",
      email: "",
      phoneNumber: "",
      companyName: "",
      companyWebsite: "",
      description: "",
    });
    setSelectedCountryCode("+91");
    setRequestType(""); // Reset request type
    setErrors({});
  };

  return (
    <div className="container-fluid frmcontacts" id="sapcontact">
      <ToastContainer />
      <div className="container">
        <div className="row my-5 py-4">
          <div className="col-sm-12 col-md-6 d-flex align-items-center justify-content-center">
            <div className="textcontact text-light">
              <h1 className="sapcontacthead my-sm-4 my-lg-0">Let's Connect</h1>
              <p className="sapcontentpara">
                <b>
                  Are you looking to optimize, upgrade, or fully leverage your
                  SAP environment?
                </b>
              </p>
              <p>Let’s explore how our expert SAP solutions can help you.</p>
            </div>
          </div>

          <div className="col-sm-12 col-md-6">
            <form
              onSubmit={handleSubmit}
              className="bg-light p-3 rounded-3 mx-sm-0 mx-lg-5"
            >
              <h4 className="contactheadertext mx-3">
                Request a meeting with our experts
              </h4>
              <div className="form-group m-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control form-control1"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
                {errors.username && (
                  <small className="text-danger">{errors.username}</small>
                )}
              </div>
              <div className="form-group m-3">
                <label className="form-label">WhatsApp Number</label>
                <div className="input-group form-control1 rounded-2">
                  <select
                    className="form-select"
                    value={selectedCountryCode}
                    onChange={(e) => setSelectedCountryCode(e.target.value)}
                    style={{ width: "30%" }}
                  >
                    {countryCodes.map((country, index) => (
                      <option key={index} value={country.code}>
                        {country.name} ({country.code})
                      </option>
                    ))}
                  </select>
                  <input
                    type="tel"
                    id="mobilenumber"
                    className="form-control"
                    placeholder="Enter your whatsapp number"
                    name="whatsappnumber"
                    value={formData.whatsappnumber}
                    onChange={handleChange}
                    style={{ width: "70%" }}
                    required
                    pattern="[0-9]*"
                    maxLength="15"
                  />
                </div>
                {errors.whatsappnumber && (
                  <small className="text-danger">{errors.whatsappnumber}</small>
                )}
              </div>

              <div className="form-group m-3">
                <label className="form-label">Mobile Number</label>
                <div className="input-group form-control1 rounded-2">
                  <select
                    className="form-select"
                    value={selectedCountryCode}
                    onChange={(e) => setSelectedCountryCode(e.target.value)}
                    style={{ width: "30%" }}
                  >
                    {countryCodes.map((country, index) => (
                      <option key={index} value={country.code}>
                        {country.name} ({country.code})
                      </option>
                    ))}
                  </select>
                  <input
                    type="tel"
                    id="whatsppnumber"
                    className="form-control"
                    placeholder="Enter your phone number"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    style={{ width: "70%" }}
                    required
                    pattern="[0-9]*"
                    maxLength="15"
                  />
                </div>
                {errors.phoneNumber && (
                  <small className="text-danger">{errors.phoneNumber}</small>
                )}
              </div>

              <div className="form-group m-3 position-relative">
                <InputLabel id="request-type-label" className="contacttext">
                  Request Type
                </InputLabel>
                <FormControl
                  fullWidth
                  error={Boolean(errors.requestType)}
                  variant="outlined"
                >
                  <Select
                    labelId="request-type-label"
                    id="request-type"
                    value={requestType}
                    onChange={(e) => {
                      setRequestType(e.target.value);
                      // Clear the error if a valid option is selected
                      if (e.target.value) {
                        setErrors((prev) => ({
                          ...prev,
                          requestType: undefined,
                        }));
                      }
                    }}
                    required
                    sx={{
                      "& .MuiSelect-select": {
                        color: errors.requestType ? "red" : "#291571", // Text color based on error
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: errors.requestType ? "red" : "#291571", // Border color based on error
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#291571", // Hover border color
                      },
                    }}
                  >
                    <MenuItem value="">
                      <em>Select</em>
                    </MenuItem>
                    <MenuItem value="1">Contact Sales</MenuItem>
                    <MenuItem value="2">General Inquiry</MenuItem>
                    <MenuItem value="3">Partner Inquiry</MenuItem>
                  </Select>
                  {/* Error message should be visible */}
                  {errors.requestType && (
                    <small
                      className="text-danger"
                      style={{
                        position: "absolute",
                        bottom: "-20px",
                        left: "14px",
                      }}
                    >
                      enter data
                    </small>
                  )}
                </FormControl>
              </div>

              <div className="form-group m-3">
                <label className="form-label">Business Email</label>
                <input
                  type="email"
                  id="useremail"
                  placeholder="Business email"
                  className="form-control form-control1"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                {errors.email && (
                  <small className="text-danger">{errors.email}</small>
                )}
              </div>

              <div className="form-group m-3">
                <label className="form-label">Company Name</label>
                <input
                  type="text"
                  className="form-control form-control1"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="Enter your company name"
                  required
                />
                {errors.companyName && (
                  <p className="text-danger">{errors.companyName}</p>
                )}
              </div>

              <div className="form-group m-3">
                <label className="form-label">Company Website</label>
                <input
                  type="url"
                  id="companywebsite"
                  className="form-control form-control1"
                  name="companyWebsite"
                  value={formData.companyWebsite}
                  placeholder="Company website"
                  onChange={handleChange}
                  required
                />
                {errors.companyWebsite && (
                  <small className="text-danger">{errors.companyWebsite}</small>
                )}
              </div>

              <div className="form-group m-3">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control form-control1"
                  name="description"
                  rows="3"
                  value={formData.description}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="d-flex justify-content-center m-3">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </div>
              <p className="mx-4 prvctxt">
                The information you provide in this form will be used to process
                your request and keep you informed about our services, in line
                with KG Genius Lab's{" "}
                <span style={{ color: "red" }}>Privacy Policy</span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contactsap;
