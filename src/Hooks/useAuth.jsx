import React, { use } from 'react';
import AuthProvider from '../../AuthProvider';
import { AuthContext } from '../../AuthContext';

const useAuth = () => {
    let authInfos = use(AuthContext)
    return authInfos
};

export default useAuth;