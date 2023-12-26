import React from "react";
import Image from 'next/image';


const IntroWithImage = () => {
  return (
    <div className="flex flex-col md:flex-row gap-8 items-center justify-between py-8 px-4">
      {/* Text Section */}
      <div className="flex-1">
        <h2 className="text-2xl font-bold mb-4">Hey, I'm Bikash</h2>
        <p className="text">
          Welcome to my Digital Realm. I'm a Software developer, Entrepreneur,
          author, and content creator living in Canada. And here, I share what
          I've been working on recently and things I learned along the way.
        </p>
      </div>

      {/* Image Section (on the right for small screens, on the bottom for medium and larger screens) */}
      <div className="flex-1 order-first lg:order-last">
        <Image
          src="/my_photo.jpg" 
          alt="Your Image"
          className="rounded-md"
          width={250} 
          height={500} 
        />
      </div>
    </div>
  );
};

export default IntroWithImage;
