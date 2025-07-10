import { createBrowserRouter } from "react-router";
import HomePage from "../Pages/HomePage/HomePage";
import MainPage from "../Pages/MainPage/MainPage";
import AllProperties from "../Pages/AllProperties/AllProperties";
import DashBoard from "../Pages/DashBoard/DashBoard";
import Login from "../Authentication/Login";
import Register from "../Authentication/Register";
import PrivateRoute from "./PrivateRoute";
import ErrorPage from "../Pages/ErrorPage/Errorpage";
import UserProfile from "../Components/DashBoardRoutes/User/UserProfile";
import AgentProfile from "../Components/DashBoardRoutes/Agent/AgentProfile";
import AdminProfile from "../Components/DashBoardRoutes/Admin/AdminProfile";
import AddProperty from "../Components/DashBoardRoutes/Agent/AddProperty";
import MyAddedProperties from "../Components/DashBoardRoutes/Agent/MyAddedProperties";
import UpdateProperty from "../Components/DashBoardRoutes/Agent/UpdateProperty";
import MySoldProperties from "../Components/DashBoardRoutes/Agent/MySoldProperties";
import ManageProperties from "../Components/DashBoardRoutes/Admin/ManageProperties";
import PropertyDetails from "../Pages/PropertyDetals/PropertyDetails";
import WishList from "../Components/DashBoardRoutes/User/WishList";

export let router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage></MainPage>,
    children: [
      {
        index: true,
        element: <HomePage></HomePage>,
      },
      {
        path: "properties",
        element: <AllProperties></AllProperties>,
      },
      {
        path: "property/:id",
        element: <PrivateRoute><PropertyDetails></PropertyDetails></PrivateRoute>,
      },

      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
      {
        path: "dashboard",
        // element: <DashBoard></DashBoard>,
        element: (
          <PrivateRoute>
            <DashBoard></DashBoard>
          </PrivateRoute>
        ),
        children: [
          { index: true, element: <>hello</> },
          // user routes
          {
            path: "profile",
            element:<UserProfile></UserProfile>,
          },
          {
            path: "wishlist",
            element: <WishList></WishList>,
          },

          // agent routes
          {
            path: "agent-profile",
            element:<AgentProfile></AgentProfile>,
          },
          {
            path: "add-property",
            element:<AddProperty></AddProperty>,
          },
          {
            path: "my-properties",
            element:<MyAddedProperties></MyAddedProperties>,
          },
          {
            path: "update-property/:id",
            element:<UpdateProperty></UpdateProperty>,
          },
          // {
          //   path: "sold-properties",
          //   element:<MySoldProperties></MySoldProperties>,
          // },



          // admin routes
          {
            path: "admin-profile",
            element:<AdminProfile></AdminProfile>,
          },
          {
            path: "manage-properties",
            element:<ManageProperties></ManageProperties>,
          },
          
        ],
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage></ErrorPage>,
  },
]);
