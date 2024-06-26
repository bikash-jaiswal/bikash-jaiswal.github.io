"use client"
import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
     // Here you can add your logic to handle form submission (e.g., send email, save data)
    // For demo purposes, we'll just simulate a submission delay
    setFormSubmitted(true);

    // Simulating async submission with a delay
    setTimeout(() => {
      // Reset the form after submission (optional)
      setFormData({
        name: '',
        email: '',
        message: ''
      });
      setFormSubmitted(false); // Reset the form submission state
    }, 5000); // Adjust the delay as needed

  };

  return (
    <div className="flex flex-col justify-center items-center my-10 text-white p-4">
      <h1 className="text-5xl font-bold mb-4 text-center">Let&apos;s talk about your project</h1>
      <h3 className="text-sm mb-4 text-center">Achieve all your goals and get long-term value for your business with our professional services</h3>
      <div className="max-w-md w-full p-4 bg-gray-900 rounded shadow-lg">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 p-2 w-full border rounded-md bg-gray-700 text-white focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 p-2 w-full border rounded-md bg-gray-700 text-white focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="message" className="block text-sm font-medium">
              Message (about project or problem)
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="mt-1 p-2 w-full border rounded-md bg-gray-700 text-white focus:outline-none focus:ring focus:border-blue-300"
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:border-blue-300"
            disabled={formSubmitted} // Disable button while form is submitting
          >
            {formSubmitted ? 'Email sent' : "Let's Talk"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
