import { createBrowserRouter } from "react-router";
import Root from "./layout/Root";
import Dashboard from "./pages/Dashboard";
import VenueListings from "./pages/VenueListings";
import Calendar from "./pages/Calendar";
import Bookings from "./pages/Bookings";
import Staff from "./pages/Staff";
import Equipment from "./pages/Equipment";
import Pricing from "./pages/Pricing";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Dashboard },
      { path: "venues", Component: VenueListings },
      { path: "calendar", Component: Calendar },
      { path: "bookings", Component: Bookings },
      { path: "staff", Component: Staff },
      { path: "equipment", Component: Equipment },
      { path: "pricing", Component: Pricing },
      { path: "analytics", Component: Analytics },
      { path: "settings", Component: Settings },
      { path: "*", Component: NotFound },
    ],
  },
]);
