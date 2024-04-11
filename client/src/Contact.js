import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import Contact from "./Image/contact.jpg";
import "./Contact.css";

const ContactPage = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/contact",
        values
      );
      console.log("Response:", response.data);
      setFormSubmitted(true);
      resetForm(); // Clear the form
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="contact-page">
      <h1 className="Heading">Contact Us</h1>
      <div className="contact-content">
        <div className="left-side">
          <img src={Contact} alt="Contact" className="Contact" />
        </div>
        <div className="right-side">
          <Formik
            initialValues={{
              name: "",
              email: "",
              phone: "",
              message: "",
            }}
            validate={(values) => {
              const errors = {};
              if (!values.name) {
                errors.name = "Required";
              }
              if (!values.email) {
                errors.email = "Required";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "Invalid email address";
              }
              if (!values.message) {
                errors.message = "Required";
              }
              return errors;
            }}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <Field type="text" id="name" name="name" />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="error-message"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Field type="email" id="email" name="email" />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="error-message"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <Field type="tel" id="phone" name="phone" />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="error-message"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <Field as="textarea" id="message" name="message" />
                  <ErrorMessage
                    name="message"
                    component="div"
                    className="error-message"
                  />
                </div>
                <button type="submit" disabled={isSubmitting}>
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      {formSubmitted && (
        <p className="success-message">Thank you for contacting us!</p>
      )}
    </div>
  );
};

export default ContactPage;
