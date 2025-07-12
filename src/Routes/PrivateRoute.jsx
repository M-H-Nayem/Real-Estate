import { Navigate, useLocation } from 'react-router';
import useAuth from '../Hooks/useAuth';
import Loading from '../Components/Loading/Loading';

const PrivateRoute = ({ children }) => {
    let { user, loading } = useAuth()
    let location = useLocation()
    // console.log(location);
    
    if (loading) {
        return <Loading></Loading>
    }
    
  if (!user && !user?.email) {
    
    return <Navigate to={"/login"} state={location.pathname} ></Navigate>;
  }
  return children;

};

export default PrivateRoute;