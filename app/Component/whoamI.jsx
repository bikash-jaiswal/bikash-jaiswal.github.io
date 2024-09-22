import React from "react";
import Image from 'next/image';


const IntroWithImage = () => {
  return (
    <div>
       <div className="flex flex-col md:flex-row  gap-8 items-center justify-around py-8 px-4 ">
      {/* Text Section */}
      <div className="flex-1">
        <h2 className="text-2xl mb-4">Hey, I&apos;m Bikash</h2>
        <p className="text-md sm:text-sm md:text-xl">
          Welcome to my Digital Realm. I&apos;m a Software developer, Entrepreneur, Investor, author, and content creator living in Canada. And here, I share what
          I&apos;ve been working on recently and things I learned along the way.
        </p>
      </div>
      
      {/* Image Section (on the right for small screens, on the bottom for medium and larger screens) */}
      <div className="flex justify-center">
        <Image
          src="/my-photo.jpeg" 
          alt="My Image"
          className="rounded-md"
          width={250} 
          height={500} 
        />
      </div>
    </div>
    </div>
   
  );
};

export default IntroWithImage;
