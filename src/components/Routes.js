import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/Home";
import HistoryPage from "../pages/History";
import NewPetitionPage from "../pages/NewPetition";
import OpenPetitionsPage from "../pages/OpenPetitions";

function MyRoutes() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={HomePage} />
          <Route path="/NewPetition" Component={NewPetitionPage} />
          <Route path="/OpenPetitions" Component={OpenPetitionsPage} />
          <Route path="/History" Component={HistoryPage} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default MyRoutes;
