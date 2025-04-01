import React from 'react';

const AboutUs = () => {
  return (
    <div className='px-8 py-4 bg-gray-100 text-gray-800'>
      <h1 className='text-3xl font-bold text-center mb-4'>About Us</h1>
      <p className='text-lg text-center mb-6'>
        Welcome to <span className='font-semibold text-blue-600'>Bookstore</span>, your go-to destination for discovering new books and immersing yourself in the world of reading. Whether you're a passionate reader, a book collector, or just starting your literary journey, we have something for everyone.
      </p>
      <div className='text-lg'>
        <h2 className='text-2xl font-semibold mb-3'>Our Mission</h2>
        <p>
          At Bookstore, our mission is simple – to inspire and foster a love for reading in people of all ages. We believe in the power of books to enrich minds, spark creativity, and connect people. Our carefully curated collection features a wide range of genres, from fiction and non-fiction to mystery, romance, and science fiction.
        </p>
      </div>
      <div className='text-lg mt-6'>
        <h2 className='text-2xl font-semibold mb-3'>Why Choose Us?</h2>
        <ul className='list-disc pl-6'>
          <li>Wide selection of books for all interests and age groups.</li>
          <li>Personalized recommendations to help you discover your next great read.</li>
          <li>Convenient online ordering and fast delivery options.</li>
          <li>Regular events, book clubs, and author signings to engage with the literary community.</li>
        </ul>
      </div>
    </div>
  );
};

export default AboutUs;

