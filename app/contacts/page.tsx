"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { FormData } from "../types/contact";

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // Here you can add your logic to handle form submission (e.g., send email, save data)
    // For demo purposes, we'll just simulate a submission delay
    setFormSubmitted(true);

    // Simulating async submission with a delay
    setTimeout(() => {
      // Reset the form after submission
      setFormData({
        name: "",
        email: "",
        message: "",
      });
      setFormSubmitted(false); // Reset the form submission state
    }, 5000); // Adjust the delay as needed
  };

  return (
    <div className="flex flex-col justify-center items-center my-10 text-white p-4">
      <h1 className="text-5xl font-bold mb-4 text-center">
        Let&apos;s talk about your project
      </h1>
      <h3 className="text-sm mb-4 text-center">
        Achieve all your goals and get long-term value for your business with our
        professional services
      </h3>
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
              className="mt-1 p-2 w-full bg-gray-800 rounded border border-gray-700 focus:border-violet-500 focus:outline-none"
              placeholder="Your name"
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
              className="mt-1 p-2 w-full bg-gray-800 rounded border border-gray-700 focus:border-violet-500 focus:outline-none"
              placeholder="your.email@example.com"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-sm font-medium">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              className="mt-1 p-2 w-full bg-gray-800 rounded border border-gray-700 focus:border-violet-500 focus:outline-none"
              placeholder="Your message..."
            />
          </div>
          <button
            type="submit"
            disabled={formSubmitted}
            className={`w-full p-2 rounded ${
              formSubmitted
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-violet-600 hover:bg-violet-700"
            }`}
          >
            {formSubmitted ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
