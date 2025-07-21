import React from 'react';
import useAuth from '../Hooks/useAuth';
import { Navigate, useLocation } from 'react-router';
import useUserRole from '../Hooks/useUserRole';
import Loading from '../Components/Loading/Loading';

const PrivateAdminRoute = ({children}) => {
   
        let { user, loading } = useAuth()
        let {role, isLoading}= useUserRole()
    let location = useLocation()
    // console.log(location);
    // console.log(role);
    if (isLoading) {
        return <Loading></Loading>
    }
    
  if (!user || role !=="admin") {
    
    return <Navigate to={"/forbiden"} state={location.pathname} ></Navigate>;
  }
  return children;
   
};

export default PrivateAdminRoute;