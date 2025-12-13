import React, {useEffect,useRef} from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';

const PrivateRoute = () => {

    const isAuth = sessionStorage.getItem('name');
    const toastRef = useRef(false);

    if(!isAuth){
        if(!toastRef.current){
            toast.error("Please login to access this page!");
            toastRef.current = true;
        }
        return <Navigate to='/login' replace/>
    }

    return <Outlet />;
}

export default PrivateRoute;
