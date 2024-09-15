import React from "react"


function Navbar() {
  return (
  <div className="flex flex-row justify-between p-10 mb-5 rounded-lg" style={{
    backgroundColor: 'rgb(96, 165, 250, 0.50)', 
    boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
    backdropFilter: 'blur( 4px )',
    border: '1px solid rgba( 255, 255, 255, 0.18 )'}}>
    <h1 className="font-bold btn btn-ghost text-5xl">Rocket 🚀</h1>
    <div className="flex flex-row items-center align-middle justify-center place-content-evenly">
        <span className="text-base-content mr-4 text-lg font-bold">Welcome, User!</span>
        <button className="bg-blue-700 px-4 py-2 rounded-full font-bold hover:bg-blue-800 transition ease-in-out duration-300">
        Login
        </button>
    </div>  
  </div>
  );
};

export default Navbar;