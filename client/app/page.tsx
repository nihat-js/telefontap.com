"use client"; // Ensure this is a client-side component

import { useEffect, useState } from "react";
import Navbar from "./components/navbar"; // Adjust the path as per your project structure
import './assets/css/reset.css'

export default function Home() {
  const [isPC, setIsPC] = useState(false);
  const [isMounted, setIsMounted] = useState(false); // To check if component has mounted

  useEffect(() => {
    const checkScreenSize = () => {
      setIsPC(window.innerWidth >= 1024);
    };

    setIsMounted(true); // Mark component as mounted
    checkScreenSize(); // Initial check on component mount

    window.addEventListener('resize', checkScreenSize); // Listen for window resize events

    return () => {
      window.removeEventListener('resize', checkScreenSize); // Clean up listener on unmount
    };
  }, []);

  if (!isMounted) {
    // Prevent rendering during SSR or before the component has mounted on the client
    return null;
  }

  return (
    <div>
      {isPC && <Navbar />} {/* Conditionally render Navbar if isPC is true */}
    </div>
  );
}
