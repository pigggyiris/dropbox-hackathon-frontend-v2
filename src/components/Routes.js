import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/Home";
import ProfilePage from "../pages/Profile";
import StartPetitionPage from "../pages/StartPetition";
import BrowsePetitionsPage from "../pages/BrowsePetitions";
import SinglePetitionPage from "../pages/SinglePetition";
import SearchResultPage from "../pages/SearchResult";
import LoginPage from "../pages/Login";
import StartPetitionNextPage from "../pages/StartPetitionNext";
import Navbar from "./Navbar";



function MyRoutes() {
    return (
      <BrowserRouter>
        <Navbar />
        <div style={{ paddingTop: '80px' }}>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/Profile" element={<ProfilePage />} />
            <Route path="/StartPetition" element={<StartPetitionPage />} />
            <Route path="/BrowsePetitions" element={<BrowsePetitionsPage />} />
            <Route path="/Petitions/:fileID" element={<SinglePetitionPage />} />
            <Route path="/SearchResult" element={<SearchResultPage />} />
            <Route path="/Login" element={<LoginPage />} />
            <Route path="/StartPetitionNext" element={<StartPetitionNextPage />} />
        </Routes>
        </div>
      </BrowserRouter>
    );
  }

export default MyRoutes;
