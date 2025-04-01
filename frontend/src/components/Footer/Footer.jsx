import React from 'react';
import { Mail, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <div className='h-screen bg-zinc-800 text-white px-8 py-4'>
      <h1 className='text-xl font-semibold text-center'>
        &copy; 2025, "Where every page turns into a new adventure. Happy reading!"
      </h1>

      {/* Admin Contact */}
      <div className='text-center mt-4 flex justify-center items-center gap-2'>
        <Mail className='text-blue-400' size={20} />
        <a href="mailto:admin@bookstore.com" className='text-blue-400 hover:underline'>
          admin@bookstore.com
        </a>
      </div>

      {/* Social Media Links */}
      <div className='text-center mt-4 flex justify-center items-center gap-6'>
        <a href="https://instagram.com/yourprofile" target="_blank" rel="noopener noreferrer">
          <Instagram className='text-pink-400 hover:text-pink-500' size={24} />
        </a>
        <a href="https://facebook.com/yourprofile" target="_blank" rel="noopener noreferrer">
          <Facebook className='text-blue-500 hover:text-blue-600' size={24} />
        </a>
        <a href="https://twitter.com/yourprofile" target="_blank" rel="noopener noreferrer">
          <Twitter className='text-blue-400 hover:text-blue-500' size={24} />
        </a>
      </div>
    </div>
  );
};

export default Footer;
