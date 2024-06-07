import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import OffersPage from "./pages/OffersPage";
import ChallengesPage from "./pages/ChallengesPage";
import LeaderboardPage from "./pages/LeaderboardPage";
import ChallengesDevPage from "./pages/ChallengesDevPage";
import DevProfilePage from "./pages/DevProfilePage";

import ProtectedRoute from "./ProtectedRoute";

export default function App() {
  return (
    <Routes>
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/*" element={<HomePage />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/offers" element={<OffersPage />} />
        <Route path="/challenges" element={<ChallengesPage />} />
        <Route
          path="/challenges-dev/:challengeId"
          element={<ChallengesDevPage />}
        />
        <Route path="/dev-profile/:userId" element={<DevProfilePage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
      </Route>
    </Routes>
  );
}
