import Link from "next/link";
import Image from "next/image";

const CoursesPage = () => (
  <div>
    <h1 className="text-2xl text-center font-bold mb-4">Courses</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="rounded-md shadow-md p-2 bg-gray-250">
        <Link href="/courses/blind-75">
        <Image
          src="/images/blind-75.jpg" 
          alt="blind 75 leetcode problem" 
          className="rounded-md"
          width={500} 
          height={500} 
        />
        </Link>
         <Link href="/courses/system-design">
        <Image
          src="/images/blind-75.jpg" 
          alt="System Design" 
          className="rounded-md"
          width={500} 
          height={500} 
        />
        </Link>
      </div>
    </div>
  </div>
);

export default CoursesPage;
