import React, { useEffect, useRef, useState } from "react";
import { Button } from "@chakra-ui/react";
import Login from "./Login";
// import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    // Add event listener to handle click outside of the menu
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    // <header className="sticky top-0 bg-blue-200 w-full z-50">
    //   <div className="flex justify-between items-center p-4">
    //     <Button colorScheme="blue" size="sm" className="md:hidden">
    //       Connect
    //     </Button>

    //     {/* <Button
    //       onClick={() => setIsMenuOpen(!isMenuOpen)}
    //       className="md:hidden text-gray-700"
    //     >
    //       {isMenuOpen ? "close" : "open"}
    //     </Button> */}
    //   </div>

    //   <div
    //     ref={menuRef}
    //     className={`fixed md:relative flex flex-col md:flex-row md:items-center bg-white md:bg-transparent w-full md:w-auto transition-transform duration-300 ${
    //       isMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
    //     }`}
    //   >
    //     <Button
    //       colorScheme="blue"
    //       size="sm"
    //       className="hidden md:inline-block md:ml-4 mb-4 md:mb-0"
    //     >
    //       Connect
    //     </Button>
    //   </div>
    // </header>

    <header className="sticky top-0 w-full z-50">
    <div className="flex justify-between items-center px-4 py-2">
      <div></div> {/* Placeholder to push the button to the right */}
     <Login />
    </div>
  </header>
  );
};

export default Navbar;
