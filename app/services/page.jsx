"use client"
import React, { useState } from "react";

const ServiceCard = ({ title, hours, price, description, onSelect, isSelected }) => {
  const [isHovered, setIsHovered] = useState(false);

  const isGrowthPlan = title.toLowerCase() === "growth";

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClick = () => {
    onSelect(title); // Pass the title of the plan when selected
  };

  return (
    <div
      className={`rounded-lg shadow-md ${isSelected ? "border-4 border-green-500" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="border rounded-lg p-2 shadow-md bg-white max-w-sm mx-auto">
        <h3 className="text-2xl font-bold mb-2 text-gray-900">{title}</h3>
        <p className="text-lg mb-2 text-green-600">{hours} hours/month</p>
        <p className="text-xl font-semibold mb-4 text-gray-900">{price}</p>
        <ul className="mb-4 text-gray-700">
          {description.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <button
          className={`block w-full py-2 px-4 rounded focus:outline-none ${
            isSelected ? "bg-green-500 text-white" : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
          onClick={handleClick}
        >
          {isSelected ? "Selected" : "Choose Plan"}
        </button>
      </div>
    </div>
  );
};

const ConsultationPage = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const monthlyPlans = [
    {
      title: "Starter",
      hours: "1",
      price: "$200",
      description: [
        "Up to 1 hour per month",
        "Project discussion",
        "Video calls",
        "Mentoring",
        "Async Q&A",
        "Code review",
      ],
    },
    {
      title: "Growth",
      hours: "5",
      price: "$875",
      description: [
        "Up to 5 hours per month",
        "Project discussion",
        "Video calls",
        "Mentoring",
        "Async Q&A",
        "Code review",
      ],
    },
    {
      title: "Professional",
      hours: "10",
      price: "$1,500",
      description: [
        "Up to 10 hours per month",
        "Project discussion",
        "Video calls",
        "Mentoring",
        "Async Q&A",
        "Code review",
      ],
    },
  ];

  const handleSelectPlan = (title) => {
    if (title === selectedPlan) {
      setSelectedPlan(null); // Unselect if clicking the same plan again
    } else {
      setSelectedPlan(title); // Select the plan
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="text-center mb-12 px-4 sm:px-0">
        <h2 className="text-4xl font-bold mb-4 text-gray-100">
          Project or Coding Consultation
        </h2>
        <p className="text-lg text-gray-300 mb-4">
          Whether you want my team to build your next project or you&apos;re
          seeking guidance on your coding journey, you can schedule time with me
          either on a monthly basis or for a one-time consultation. I bring
          extensive experience and a commitment to helping you achieve your
          goals efficiently and effectively.
        </p>
        <p className="text-lg text-gray-500 mb-4">
          Additionally, I provide valuable insights on passive income investing
          in both the Canadian and US markets. Explore opportunities to grow
          your wealth while mastering your coding craft. Learn how to diversify
          your investments and achieve financial independence with expert advice
          tailored to your unique needs and aspirations. Let&apos;s work
          together to build your future, both in tech and finance.
        </p>
      </div>

      <div className="max-w-7xl mx-auto p-4">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-100 text-center mb-8">
            Monthly Plans
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {monthlyPlans.map((plan, index) => (
              <ServiceCard
                key={index}
                {...plan}
                onSelect={handleSelectPlan}
                isSelected={plan.title === selectedPlan}
              />
            ))}
          </div>
        </div>
        {selectedPlan && (
          <div className="text-center">
            <p className="text-xl text-green-500 mb-4">
              Selected Plan: {selectedPlan}
            </p>
            {/* Additional UI or actions based on selected plan can be added here */}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConsultationPage;
