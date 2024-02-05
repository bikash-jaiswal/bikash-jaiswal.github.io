// ConsultationPage.js
import React from 'react';

const ServiceCard = ({ title, hours, price, description }) => {
    const isGrowthPlan = title.toLowerCase() === 'growth';
    return (
        <div className={`p-4 md:p-6 rounded-lg shadow-md mt-4 md:mt-0 ${isGrowthPlan ? 'bg-gray-800 border-2 border-green-500' : ''}`}>
            <h3 className="text-lg md:text-2xl font-semibold mb-2 text-green-600">{title}</h3>
            <p className="text-sm md:text-base text-gray-600 mb-2">{hours} hours per month</p>
            <p className="text-green-600 font-semibold text-sm md:text-base mb-4">{price} per month</p>
            <button className="bg-green-500 text-white py-2 px-4 md:px-6 rounded-full text-sm md:text-base hover:bg-green-600 focus:outline-none focus:shadow-outline-green">
                Subscribe
            </button>
            <div className="mt-3 md:mt-4">
                <p className="font-semibold text-sm md:text-base mb-2">This plan includes:</p>
                <ul className="list-disc pl-4 md:pl-6 text-sm md:text-base">
                    {description.map((item, index) => (
                        <li key={index} className="text-gray-600">{item}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};


const ConsultationPage = () => {
    const monthlyPlans = [
        {
            title: 'Starter',
            hours: '1',
            price: '$200',
            description: [
                'Up to 1 hour per month',
                'Project discussion',
                'Video calls',
                'Mentoring',
                'Async Q&A',
                'Code review',
            ],
        },
        {
            title: 'Growth',
            hours: '5',
            price: '$875',
            description: [
                'Up to 5 hours per month',
                'Project discussion',
                'Video calls',
                'Mentoring',
                'Async Q&A',
                'Code review',
            ],
        },
        {
            title: 'Professional',
            hours: '10',
            price: '$1,500',
            description: [
                'Up to 10 hours per month',
                'Project discussion',
                'Video calls',
                'Mentoring',
                'Async Q&A',
                'Code review',
            ],
        },
    ];

    return (
        <div >
            <div className="py-4 text-center">
            <h2 className="text-2xl font-bold mb-4 mt-4">Project or Coding Consultation</h2>
                <h1 className="text-base md:text-xl mb-4 p-4">
                Whether you want my team to build your next project, or you&apos;re looking for some guidance in your coding journey, you can schedule some time with me on a monthly basis or for a one-time consultation.</h1>
                <p className="mb-4">
                    Additionally, I provide valuable insights on passive income investing in both the Canadian and US markets. Explore opportunities to grow your wealth while mastering your coding craft.
                </p>
            </div>


            <div className="max-w-4xl mx-auto my-8 p-4 md:p-8 rounded ">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-4 text-text-xl md:text-2xl font-bold mb-4 text-center">Monthly Plans</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
                        {monthlyPlans.map((plan, index) => (
                            <ServiceCard key={index} {...plan} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConsultationPage;
