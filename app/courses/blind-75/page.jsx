import React from 'react';
import Link from 'next/link';
import { FaYoutube } from "react-icons/fa";


const LeetCodeQuestions = () => {
  const questions = [
    // Week 1 Questions
    { id: 1, name: 'Two Sum', difficulty: 'Easy', youtubeLink: 'https://www.youtube.com/watch?v=jeZdKBrF-a0', notes: 'Use a hashmap to store complements of each element.' },
  { id: 2, name: 'Valid Parentheses', difficulty: 'Easy', youtubeLink: 'https://www.youtube.com/watch?v=CCyEXcNamC4', notes: 'Use a stack to keep track of open parentheses.' },
  { id: 3, name: 'Merge Two Sorted Lists', difficulty: 'Easy', youtubeLink: 'https://www.youtube.com/watch?v=K63Mjf-H0B0', notes: 'Merge lists recursively or iteratively.' },
  { id: 4, name: 'Best Time to Buy and Sell Stock', difficulty: 'Easy', youtubeLink: 'https://www.youtube.com/watch?v=8pVhUpF1INw', notes: 'Keep track of minimum price and maximum profit.' },
  { id: 5, name: 'Valid Palindrome', difficulty: 'Easy', youtubeLink: 'https://www.youtube.com/watch?v=siVWAEoe8RM', notes: 'Use two pointers approach.' },
  { id: 6, name: 'Invert Binary Tree', difficulty: 'Easy', youtubeLink: 'https://www.youtube.com/watch?v=FcScLYJI42E', notes: 'Swap left and right child recursively.' },
  { id: 7, name: 'Valid Anagram', difficulty: 'Easy', youtubeLink: 'https://www.youtube.com/watch?v=cJz0YOXhPhQ', notes: 'Count characters or sort and compare strings.' },
  { id: 8, name: 'Binary Search', difficulty: 'Easy', youtubeLink: 'https://www.youtube.com/watch?v=KcTttsXtwbI', notes: 'Implement binary search algorithm.' },
  { id: 9, name: 'Flood Fill', difficulty: 'Easy', youtubeLink: 'https://www.youtube.com/watch?v=KcTttsXtwbI', notes: 'Use depth-first search or breadth-first search.' },
  { id: 10, name: 'Lowest Common Ancestor of a Binary Search Tree', difficulty: 'Easy', youtubeLink: 'https://www.youtube.com/watch?v=pxEVxnYU8nk', notes: 'Traverse the tree recursively or iteratively.' },
  { id: 11, name: 'Balanced Binary Tree', difficulty: 'Easy', youtubeLink: 'https://www.youtube.com/watch?v=SH3uTKDQ-rw', notes: 'Check the height difference of left and right subtrees.' },
  { id: 12, name: 'Linked List Cycle', difficulty: 'Easy', youtubeLink: 'https://www.youtube.com/watch?v=-YiQZi3mLq0', notes: 'Use two pointers approach.' },
  { id: 13, name: 'Implement Queue using Stacks', difficulty: 'Easy', youtubeLink: 'https://www.youtube.com/watch?v=xSa0sD-RqMg', notes: 'Implement enqueue and dequeue using two stacks.' },


    // Add other Week 1 questions here...
    
    // Week 2 Questions
    // Week 2 Questions
  { id: 14, name: 'First Bad Version', difficulty: 'Easy', youtubeLink: 'https://www.youtube.com/watch?v=VNaIeX3ydLk', notes: 'Use binary search to find the first bad version.' },
  { id: 15, name: 'Ransom Note', difficulty: 'Easy', youtubeLink: 'https://www.youtube.com/watch?v=SIIXe_0H4_w', notes: 'Use a hashmap to store characters in the magazine.' },
  { id: 16, name: 'Climbing Stairs', difficulty: 'Easy', youtubeLink: 'https://www.youtube.com/watch?v=NFJ3m9a1oJQ', notes: 'Use dynamic programming to solve.' },
  { id: 17, name: 'Longest Palindrome', difficulty: 'Easy', youtubeLink: 'https://www.youtube.com/watch?v=qmTtAbOTqcg', notes: 'Count characters to form a palindrome.' },
  { id: 18, name: 'Reverse Linked List', difficulty: 'Easy', youtubeLink: 'https://www.youtube.com/watch?v=XDO6I8jxHtA', notes: 'Iteratively reverse the linked list.' },
  { id: 19, name: 'Majority Element', difficulty: 'Easy', youtubeLink: 'https://www.youtube.com/watch?v=3mW3bBEBLFE', notes: 'Use Boyer-Moore Voting Algorithm.' },
  { id: 20, name: 'Add Binary', difficulty: 'Easy', youtubeLink: 'https://www.youtube.com/watch?v=Vsyuj1-q0LU', notes: 'Use bitwise operations.' },
  { id: 21, name: 'Diameter of Binary Tree', difficulty: 'Easy', youtubeLink: 'https://www.youtube.com/watch?v=ey7DYc9OANo', notes: 'Calculate the height of the left and right subtrees.' },
  { id: 22, name: 'Middle of the Linked List', difficulty: 'Easy', youtubeLink: 'https://www.youtube.com/watch?v=E3PJ0M7hjEA', notes: 'Use two pointers approach.' },
  { id: 23, name: 'Maximum Depth of Binary Tree', difficulty: 'Easy', youtubeLink: 'https://www.youtube.com/watch?v=2Pvxoo3YOY4', notes: 'Use depth-first search.' },
  { id: 24, name: 'Contains Duplicate', difficulty: 'Easy', youtubeLink: 'https://www.youtube.com/watch?v=0Igsgr4LrEc', notes: 'Use a hashmap to check duplicates.' },
  { id: 25, name: 'Maximum Subarray', difficulty: 'Medium', youtubeLink: 'https://www.youtube.com/watch?v=86CQq3pKSUw', notes: 'Use Kadane’s Algorithm.' },

  // Week 3 Questions
  { id: 26, name: 'Insert Interval', difficulty: 'Medium', youtubeLink: '', notes: 'Merge intervals using sorting or traversal.' },
  { id: 27, name: '01 Matrix', difficulty: 'Medium', youtubeLink: '', notes: 'Use breadth-first search or dynamic programming.' },
  { id: 28, name: 'K Closest Points to Origin', difficulty: 'Medium', youtubeLink: '', notes: 'Use a priority queue or quickselect algorithm.' },
  { id: 29, name: 'Longest Substring Without Repeating Characters', difficulty: 'Medium', youtubeLink: '', notes: 'Use a sliding window approach.' },
  { id: 30, name: '3Sum', difficulty: 'Medium', youtubeLink: '', notes: 'Use two pointers or hashing.' },
  { id: 31, name: 'Binary Tree Level Order Traversal', difficulty: 'Medium', youtubeLink: '', notes: 'Use breadth-first search or depth-first search.' },
  { id: 32, name: 'Clone Graph', difficulty: 'Medium', youtubeLink: '', notes: 'Use depth-first search or breadth-first search.' },
  { id: 33, name: 'Evaluate Reverse Polish Notation', difficulty: 'Medium', youtubeLink: '', notes: 'Use a stack to evaluate the expression.' },

  // Week 4 Questions
  { id: 34, name: 'Course Schedule', difficulty: 'Medium', youtubeLink: '', notes: 'Use topological sorting or depth-first search.' },
  { id: 35, name: 'Implement Trie (Prefix Tree)', difficulty: 'Medium', youtubeLink: '', notes: 'Implement trie data structure.' },
  { id: 36, name: 'Coin Change', difficulty: 'Medium', youtubeLink: '', notes: 'Use dynamic programming or recursion with memoization.' },
  { id: 37, name: 'Product of Array Except Self', difficulty: 'Medium', youtubeLink: '', notes: 'Use prefix and suffix products.' },
  { id: 38, name: 'Min Stack', difficulty: 'Medium', youtubeLink: '', notes: 'Use an additional stack to keep track of minimum element.' },
  { id: 39, name: 'Validate Binary Search Tree', difficulty: 'Medium', youtubeLink: '', notes: 'Use recursive or iterative inorder traversal.' },
  { id: 40, name: 'Number of Islands', difficulty: 'Medium', youtubeLink: '', notes: 'Use depth-first search or breadth-first search.' },
  { id: 41, name: 'Rotting Oranges', difficulty: 'Medium', youtubeLink: '', notes: 'Use breadth-first search.' },

  // Week 5 Questions
  { id: 42, name: 'Search in Rotated Sorted Array', difficulty: 'Medium', youtubeLink: '', notes: 'Use binary search with modified conditions.' },
  { id: 43, name: 'Combination Sum', difficulty: 'Medium', youtubeLink: '', notes: 'Use backtracking or dynamic programming.' },
  { id: 44, name: 'Permutations', difficulty: 'Medium', youtubeLink: '', notes: 'Use backtracking to generate permutations.' },
  { id: 45, name: 'Merge Intervals', difficulty: 'Medium', youtubeLink: '', notes: 'Merge overlapping intervals.' },
  { id: 46, name: 'Lowest Common Ancestor of a Binary Tree', difficulty: 'Medium', youtubeLink: '', notes: 'Use recursive traversal or parent pointers.' },
  { id: 47, name: 'Time-Based Key-Value Store', difficulty: 'Medium', youtubeLink: '', notes: 'Implement with a hashmap and binary search.' },
  { id: 48, name: 'Accounts Merge', difficulty: 'Medium', youtubeLink: '', notes: 'Use union-find or depth-first search.' },
  { id: 49, name: 'Sort Colors', difficulty: 'Medium', youtubeLink: '', notes: 'Use Dutch National Flag algorithm.' },

  // Week 6 Questions
  { id: 50, name: 'Word Break', difficulty: 'Medium', youtubeLink: '', notes: 'Use dynamic programming or backtracking with memoization.' },
  { id: 51, name: 'Partition Equal Subset Sum', difficulty: 'Medium', youtubeLink: '', notes: 'Use dynamic programming or backtracking with memoization.' },
  { id: 52, name: 'String to Integer (atoi)', difficulty: 'Medium', youtubeLink: '', notes: 'Handle edge cases and convert string to integer.' },
  { id: 53, name: 'Spiral Matrix', difficulty: 'Medium', youtubeLink: '', notes: 'Simulate spiral traversal.' },
  { id: 54, name: 'Subsets', difficulty: 'Medium', youtubeLink: '', notes: 'Generate all possible subsets using backtracking.' },
  { id: 55, name: 'Binary Tree Right Side View', difficulty: 'Medium', youtubeLink: '', notes: 'Use depth-first search or breadth-first search.' },
  { id: 56, name: 'Longest Palindromic Substring', difficulty: 'Medium', youtubeLink: '', notes: 'Use dynamic programming or expand around center approach.' },
  { id: 57, name: 'Unique Paths', difficulty: 'Medium', youtubeLink: '', notes: 'Use dynamic programming to calculate unique paths.' },
  { id: 58, name: 'Construct Binary Tree from Preorder and Inorder Traversal', difficulty: 'Medium', youtubeLink: '', notes: 'Build tree recursively from preorder and inorder traversal.' },

  // Week 7 Questions
  { id: 59, name: 'Container With Most Water', difficulty: 'Medium', youtubeLink: '', notes: 'Use two pointers to find the maximum area.' },
  { id: 60, name: 'Letter Combinations of a Phone Number', difficulty: 'Medium', youtubeLink: '', notes: 'Generate letter combinations using backtracking.' },
  { id: 61, name: 'Word Search', difficulty: 'Medium', youtubeLink: '', notes: 'Use depth-first search with backtracking.' },
  { id: 62, name: 'Find All Anagrams in a String', difficulty: 'Medium', youtubeLink: '', notes: 'Use sliding window with hashmap.' },
  { id: 63, name: 'Minimum Height Trees', difficulty: 'Medium', youtubeLink: '', notes: 'Find the center of the graph using iterative removal.' },
  { id: 64, name: 'Task Scheduler', difficulty: 'Medium', youtubeLink: '', notes: 'Schedule tasks to minimize idle time.' },
  { id: 65, name: 'LRU Cache', difficulty: 'Medium', youtubeLink: '', notes: 'Implement a data structure using hashmap and doubly linked list.' },

  // Week 8 Questions
  { id: 66, name: 'Kth Smallest Element in a BST', difficulty: 'Medium', youtubeLink: '', notes: 'Use inorder traversal or iterative approach.' },
  { id: 67, name: 'Minimum Window Substring', difficulty: 'Hard', youtubeLink: '', notes: 'Use sliding window with hashmap.' },
  { id: 68, name: 'Serialize and Deserialize Binary Tree', difficulty: 'Hard', youtubeLink: '', notes: 'Implement using preorder traversal.' },
  { id: 69, name: 'Trapping Rain Water', difficulty: 'Hard', youtubeLink: '', notes: 'Use two pointers or stack.' },
  { id: 70, name: 'Find Median from Data Stream', difficulty: 'Hard', youtubeLink: '', notes: 'Use two heaps or balanced binary search tree.' },
  { id: 71, name: 'Word Ladder', difficulty: 'Hard', youtubeLink: '', notes: 'Use breadth-first search with backtracking.' },
  { id: 72, name: 'Basic Calculator', difficulty: 'Hard', youtubeLink: '', notes: 'Use stack to evaluate expressions.' },
  { id: 73, name: 'Maximum Profit in Job Scheduling', difficulty: 'Hard', youtubeLink: '', notes: 'Use dynamic programming with binary search.' },
  { id: 74, name: 'Merge k Sorted Lists', difficulty: 'Hard', youtubeLink: '', notes: 'Use heap or divide and conquer approach.' },
  { id: 75, name: 'Largest Rectangle in Histogram', difficulty: 'Hard', youtubeLink: '', notes: 'Use stack to find the maximum area.' }





  ];

  const renderTable = (questions, title) => (
    <div className="mb-8 bg-dark">
      <h2 className="text-xl text-center font-bold mb-4">{title}</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Question</th>
              <th className="px-4 py-2">Difficulty</th>
              <th className="px-4 py-2">Youtube</th>
              <th className="px-4 py-2">Notes</th>
            </tr>
          </thead>
          <tbody>
            {questions.map(question => (
              <tr key={question.id}>
                <td className="border px-4 py-2">{question.id}</td>
                <td className="border px-4 py-2">{question.name}</td>
                <td className="border px-4 py-2">{question.difficulty}</td>
                <td className="border px-4 py-2"><Link href={question.youtubeLink}><FaYoutube />
</Link></td>
                <td className="border px-4 py-2">{question.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4">

      {renderTable(questions.slice(0, 13), 'Week 1')}
      {renderTable(questions.slice(13, 25), 'Week 2: Transition from Easy to Medium')}
      {renderTable(questions.slice(26, 33), 'Week 3:  Medium')}
      {renderTable(questions.slice(34, 41), 'Week 4:  Medium To Hard')}
      {renderTable(questions.slice(42, 49), 'Week 5:  Half Way')}
      {renderTable(questions.slice(50, 58), 'Week 6:  Medium')}
      {renderTable(questions.slice(59, 65), 'Week 7:  Medium')}
      {renderTable(questions.slice(66, 75), 'Week 7:  Hard')}
      
    </div>
  );
};


const Blind75 = () => (
  <div>
    <h1 className="text-2xl text-center font-bold mb-4">Blind 75 Leetcode Problem to crack DSA Interview. 
    </h1>
    Preparing for an interview and need to brush up on Data Structures and Algorithms (DSA) quickly? 

    I&apos;ve got you covered with an efficient strategy: Blind 75.
    
    Here&apos;s how it works:
    <li>Practice with Purpose: Solve 75 carefully selected LeetCode problems, ranging in difficulty, over a few weeks.</li>
    <li>Daily Commitment: Spend some time each day tackling these problems, gradually building your skills.</li>
    <li>Comprehensive Coverage: The chosen problems cover a wide range of DSA concepts, helping you understand them better.</li>
    It&apos;s that simple. With Blind 75, you&apos;ll be well-prepared for any DSA interview challenge. Ready to dive in and excel?


    <LeetCodeQuestions/>
    
  </div>

);

export default Blind75;

