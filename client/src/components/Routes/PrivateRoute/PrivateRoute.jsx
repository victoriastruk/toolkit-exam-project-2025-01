import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import Spinner from '../../Spinner/Spinner';

const PrivateRoute = ({roles}) => {
  const { data, isFetching } = useSelector(state => state.userStore);
  
  if (isFetching) {
    return <Spinner />;
  }

  if(!data){
    return <Navigate to='/login' />;
  }

  if(roles && !roles.includes(data.role)) {
    return <Navigate to='/' replace />;
  }

  return  <Outlet />;
};

export default PrivateRoute;
