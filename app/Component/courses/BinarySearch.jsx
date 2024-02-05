import React from 'react'

const PROBLEMS = [
    {
        "id": 1,
        "name": "Insert Position",
        "description": "Description for Insert Position problem.",
        "url": "https://leetcode.com/problems/insert-position/"
    },
    {
        "id": 2,
        "name": "First Element Equals its Index",
        "description": "Description for First Element Equals its Index problem.",
        "url": "https://leetcode.com/problems/first-element-equals-its-index/"
    },
    {
        "id": 3,
        "name": "Square Root of Integer",
        "description": "Description for Square Root of Integer problem.",
        "url": "https://leetcode.com/problems/square-root-of-integer/"
    },
    {
        "id": 4,
        "name": "Bitonic Point in Bitonic Array",
        "description": "Description for Bitonic Point in Bitonic Array problem.",
        "url": "https://leetcode.com/problems/bitonic-point-in-bitonic-array/"
    },
    {
        "id": 5,
        "name": "Element in Bitonic Array",
        "description": "Description for Element in Bitonic Array problem.",
        "url": "https://leetcode.com/problems/element-in-bitonic-array/"
    },
    {
        "id": 6,
        "name": "Element Occurrence",
        "description": "Description for Element Occurrence problem.",
        "url": "https://leetcode.com/problems/element-occurrence/"
    },
    {
        "id": 7,
        "name": "Minimum in Rotated Sorted Array",
        "description": "Description for Minimum in Rotated Sorted Array problem.",
        "url": "https://leetcode.com/problems/minimum-in-rotated-sorted-array/"
    },
    {
        "id": 8,
        "name": "Element in Rotated Sorted Array",
        "description": "Description for Element in Rotated Sorted Array problem.",
        "url": "https://leetcode.com/problems/element-in-rotated-sorted-array/"
    },
    {
        "id": 9,
        "name": "Single Element in a Sorted Array",
        "description": "Description for Single Element in a Sorted Array problem.",
        "url": "https://leetcode.com/problems/single-element-in-a-sorted-array/"
    }
]

const BinarySearch = () => {
    return (
        <div>
            <div>Binary search is a search algorithm used to find the position of a target value within a sorted array or list. It follows a divide-and-conquer strategy to efficiently locate the target by repeatedly dividing the search space in half.
            </div>
            <ol className='list-disc ml-6 m-3'>
                <li>A solid foundation for binary search problems typically revolves around these five key points:
                    <ol className='list-disc ml-6'>
                        <li>The <i>left</i> index initially points to the 0 index.</li>
                        <li>The <i>right</i> index initially points to the size of the array.</li>
                        <li>The while loop condition is <code>left + 1 &lt; right</code>.</li>
                        <li>Within the loop, calculate the midpoint index: <code>mid = (left + right) / 2</code>.</li>
                        <li>Move the <i>left</i> or <i>right</i> index based on the comparison logic:
                            <ol className='list-disc ml-6'>
                                <li>If the element at the mid index is less than the target, update <code>left = mid</code>.</li>
                                <li>If the element at the mid index is greater than the target, update <code>right = mid</code>.</li>
                            </ol>
                        </li>
                        <li>Outside of the loop, check the element at the left index. This step is taken after the loop terminates.</li>
                    </ol>
                </li>
            </ol>
            <div>
                The space complexity for binary search in terms of Big O notation = O(1)
            </div>
            <div>
                The time complexity for binary search in terms of Big O notation = O(logn)
            </div>

            <h1 className="text-2xl font-bold m-4">LeetCode Problems Checklist</h1>

            <ul className="list-none p-0">
                {PROBLEMS.map((problem) => (
                <li key={problem.id} className="flex items-center mb-2">
                    <input type="checkbox" className="mr-2" id={problem.name} />
                    <label htmlFor={problem.name}>
                    <a href={problem.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">{problem.name}</a>
                    </label>
                </li>
                ))}
            </ul>


        </div>
    )
}

export default BinarySearch