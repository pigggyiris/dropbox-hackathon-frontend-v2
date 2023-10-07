import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import axios from "axios";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [search, setSearch] = useState("");
  const handleClick = () => setNav(!nav);
  const handleClose = () => setNav(!nav);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        `http://18.218.149.183:3000/v1/petitions/?text=${search}`
      );

      if (
        response.data &&
        Array.isArray(response.data) &&
        response.data.length
      ) {
        console.log("Search results:", response.data);
        navigate("/SearchResult", { state: { results: response.data } });
      } else {
        console.log("No related petitions found.");
      }
    } catch (error) {
      console.error("Error while searching:", error);
    }
  };

  return (
    <div className="w-screen h-[80px] z-10 bg-teal-50 fixed drop-shadow-lg">
      <div className="px-2 flex justify-between items-center w-full h-full">
        <div className="flex items-center">
          <h1 className="text-3xl font-bold mr-4 sm:text-4xl text-teal-950">
            VOXPETI.
          </h1>
          <ul className="hidden md:flex">
            <li>
              <Link to="/" className="text-teal-950">
                Home
              </Link>
            </li>
            <li>
              <Link to="/StartPetition" className="text-teal-950">
                Start Petition
              </Link>
            </li>
            <li>
              <Link to="/BrowsePetitions" className="text-teal-950">
                Browse Petitions
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex items-center">
          <form onSubmit={handleSearch} className="hidden md:flex mr-4">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border p-2 rounded-l-md"
              placeholder="Search..."
            />
            <button
              type="submit"
              className="px-4 py-2 bg-amber-400 text-teal-950 rounded-r-md"
            >
              Search
            </button>
          </form>
        </div>
        <div className="md:hidden mr-4" onClick={handleClick}>
          {!nav ? <MenuIcon className="w-5" /> : <XIcon className="w-5" />}
        </div>
      </div>
      <ul className={!nav ? "hidden" : "absolute bg-teal-50 w-full px-8"}>
        <li className="border-b-2 border-zinc-50 w-full">
          <Link onClick={handleClose} to="/">
            Home
          </Link>
        </li>
        <li className="border-b-2 border-zinc-50 w-full">
          <Link onClick={handleClose} to="/StartPetition">
            Start Petition
          </Link>
        </li>
        <li className="border-b-2 border-zinc-50 w-full">
          <Link onClick={handleClose} to="/BrowsePetitions">
            Browse Petitions
          </Link>
        </li>
        <form onSubmit={handleSearch} className="flex my-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 flex-grow border-t border-l border-b rounded-l-md"
            placeholder="Search..."
          />
          <button
            type="submit"
            className="px-4 py-2 bg-amber-400 text-teal-950 border-t border-r border-b rounded-r-md"
          >
            Search
          </button>
        </form>
      </ul>
    </div>
  );
};

export default Navbar;
