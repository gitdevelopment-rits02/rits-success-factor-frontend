import LandingPage from "../../features/Auth/Pages/LandingPage";
import LandingRedirect from "../guards/LandingRedirect"

export const landingRoutes = [
  { path: "/", element: <LandingPage /> },
  { path: "/get-started", element: <LandingRedirect /> },
];
