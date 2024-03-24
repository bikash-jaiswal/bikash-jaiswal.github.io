import React, { ReactNode } from 'react';
import TwoPointer from '../../Component/courses/TwoPointer';
import BinarySearch from '../../Component/courses/BinarySearch'

const faqData = [
    {
      question: "Two Pointers Patterns",
      answer: <TwoPointer />,
    },
    {
      question: "Binary Search Patterns",
      answer: <BinarySearch />,
    },
    {
        question: "Linked List, Stacks, Queue, Matrices",
        answer: "Yes, code paper agrees to deliver your project within a predetermined due date."
    },
    {
        question: "Sorting and Searching:",
        answer: "Our designers are committed to delivering good quality code. We have formal procedures to keep quality under tight control. Every project goes through the hands of appropriate QA/Testing experts, underserve test plans including black-box testing, white-box testing, test regression, usage analysis etc."
    },
    {
        question: "Trees, DFS and BFS",
        answer: "Yes, that developer will work full-time (8Hours a day, 6 days a week) dedicating it only to you."
    },
    {
        question: "Sliding windows",
        answer: "Yes, we provide technical and maintenance services on request."
    },
    {
        question: "Hashmap, Heaps",
        answer: "Yes, we provide technical and maintenance services on request."
    },
    {
        question: "Merge Interval Patterns",
        answer: "Yes, we will positively replace your developer if we see that there is a deficiency on the developer’s end."
    },
    {
        question: "Subsets and Backtracking",
        answer: "Yes, all our developers are speaking English fluently."
    },
    {
        question: "Dynamic Programming pattern",
        answer: "Sure, "
    },
     {
        question: "Graph, Trie and Custom Data Structures",
        answer: "Sure, "
    },
     {
        question: "Bit manipulation, Union Find",
        answer: "Sure, "
    }
    
  ];


const FAQPage = () => {
  return (
    <div className="w-full space-y-4 ">
        <div className="flex items-center justify-center h-40 my-10 rounded-lg shadow-md shadow-white text-white">
            <div className='text-3xl font-bold mb-4 text-center'> Blind 75 DSA Problems</div>
        </div>
        {faqData.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
        </div>
  );
};

const FAQItem = ({ question, answer }) => {
  return (
    <details className="group group mx-4">
      <summary className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg text-white p-4 shadow-md shadow-white">
        <h2 className="font-medium">{question}</h2>
        <svg
          className="h-5 w-5 shrink-0 transition duration-300 group-open:-rotate-180"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </summary>

      <div className="mt-4 px-4 leading-relaxed text-white">{answer}</div>
    </details>
  );
};

export default FAQPage;