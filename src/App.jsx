import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import NotFound from "./pages/NotFound/NotFound";
import Layout from "./components/Layout/Layout";
import AdminLayout from "./components/AdminLayout/AdminLayout";
import Team from "./pages/Team/Team";
import Events from "./pages/Events/Events";
import Contact from "./pages/Contact/Contact";
import Admin from "./pages/Admin/Admin";
import EventModify from "./pages/EditEvents/EventOptions";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/team",
        element: <Team />,
      },
      {
        path: "/events",
        element: <Events />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/admin",
        element: <Admin />, // Admin page
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />, // Use AdminLayout for admin routes
    children: [
      {
        path: "events",
        element: <EventModify />, // EditEvents page
      },
      // {
      //   path: "team",
      //   element: <EditTeam />, // EditEvents page
      // },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
