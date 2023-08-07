import React from "react";

const Navbar = () => {
  return (
        <nav style={{width: '100%'}}>
            <ul className="collapse navbar-collapse" id="navbarNav" style={{display: "flex", justifyContent: "space-around", listStyle: 'none'}}>
                <li>Home</li>
                <li>About</li>
                <li>Services</li>
                <li>Contact</li>
                <li>Help</li>
            </ul>
        </nav>
  );
};

export default Navbar;
