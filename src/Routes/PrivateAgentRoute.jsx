import React from 'react';
import useAuth from '../Hooks/useAuth';
import { Navigate, useLocation } from 'react-router';
import useUserRole from '../Hooks/useUserRole';
import Loading from '../Components/Loading/Loading';

const PrivateAgentRoute = ({children}) => {
   
        let { user, loading } = useAuth()
        let {role, isLoading}= useUserRole()
    let location = useLocation()
    // console.log(location);
    // console.log(role);
    if (isLoading ) {
        return <Loading></Loading>
    }


    if (!user || (role !== "agent" && role !== "fraud")) {  // bracket e 2 ta sorto leka lagbe , nahole alada alada define korbe
    return <Navigate to="/forbiden" state={location.pathname} />;
  }
    

  return children;
   
};

export default PrivateAgentRoute;