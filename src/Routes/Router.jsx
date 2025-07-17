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
import Welcome from "../Components/DashBoardRoutes/Welcome";
import MyReviews from "../Components/DashBoardRoutes/User/MyReviews";
import MakeOffer from "../Components/DashBoardRoutes/User/MakeOffer";
import PropertyBought from "../Components/DashBoardRoutes/User/PropertyBought";
import RequestedProperties from "../Components/DashBoardRoutes/Agent/RequestedProperties";
import ManageUsers from "../Components/DashBoardRoutes/Admin/ManageUsers";
import PrivateAdminRoute from "./PrivateAdminRoute";
import Forbidden from "../Components/Forbidden";
import PrivateAgentRoute from "./PrivateAgentRoute";
import PrivateUserRoute from "./PrivateUserRoute";
import ManageReviews from "../Components/DashBoardRoutes/Admin/ManageReviews";
import Payment from "../Components/DashBoardRoutes/User/Payment";
import Profile from "../Components/DashBoardRoutes/Profile";

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
        element: (
          <PrivateRoute>
            <PropertyDetails></PropertyDetails>
          </PrivateRoute>
        ),
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
          { index: true, element: <Welcome></Welcome> },
          // user routes
          {
            path: "my-profile",
            element: (
              
                <Profile></Profile>
              
            ),
          },
         
          {
            path: "wishlist",
            element: (
              <PrivateUserRoute>
                <WishList></WishList>
              </PrivateUserRoute>
            ),
          },
          {
            path: "make-offer/:id",
            element: (
              <PrivateUserRoute>
                <MakeOffer></MakeOffer>
              </PrivateUserRoute>
            ),
          },
          {
            path: "payment/:id",
            element: (
              <PrivateUserRoute>
                <Payment></Payment>
              </PrivateUserRoute>
            ),
          },
          {
            path: "bought",
            element: (
              <PrivateUserRoute>
                {" "}
                <PropertyBought></PropertyBought>
              </PrivateUserRoute>
            ),
          },
          {
            path: "reviews",
            element: (
              <PrivateUserRoute>
                <MyReviews></MyReviews>
              </PrivateUserRoute>
            ),
          },

          // agent routes
         
         
          {
            path: "add-property",
            element: (
              <PrivateAgentRoute>
                <AddProperty></AddProperty>
              </PrivateAgentRoute>
            ),

            // element: ,
          },
          {
            path: "my-properties",
            element: (
              <PrivateAgentRoute>
                <MyAddedProperties></MyAddedProperties>
              </PrivateAgentRoute>
            ),
          },
           {
            path: "sold-properties",
            element: (
              <PrivateAgentRoute>
                <MySoldProperties></MySoldProperties>
              </PrivateAgentRoute>
            ),
          },
          {
            path: "update-property/:id",
            element: (
              <PrivateAgentRoute>
                <UpdateProperty></UpdateProperty>
              </PrivateAgentRoute>
            ),

            // element: ,
          },
          {
            path: "offers",
            element: (
              <PrivateAgentRoute>
                <RequestedProperties></RequestedProperties>
              </PrivateAgentRoute>
            ),
          },

        

          // admin routes
         
          {
            path: "manage-properties",
            element: (
              <PrivateAdminRoute>
                <ManageProperties></ManageProperties>
              </PrivateAdminRoute>
            ),
          },
          {
            path: "manage-users",
            element: (
              <PrivateAdminRoute>
                <ManageUsers></ManageUsers>
              </PrivateAdminRoute>
            ),
          },
          {
            path: "manage-reviews",
            element: (
              <PrivateAdminRoute>
                <ManageReviews></ManageReviews>
              </PrivateAdminRoute>
            ),
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage></ErrorPage>,
  },
  {
    path: "/forbiden",
    element: <Forbidden></Forbidden>,
  },
]);
