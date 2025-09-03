import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams, Navigate } from 'react-router-dom';
import CONSTANTS from '../../constants';
import CustomerDashboard from '../../components/CustomerDashboard/CustomerDashboard';
import CreatorDashboard from '../../components/CreatorDashboard/CreatorDashboard';

const Dashboard = props => {
  const navigate = useNavigate();
  const params = useParams();

  const { role } = useSelector(state => state.userStore.data);

  switch(role){
    case CONSTANTS.CUSTOMER:
      return <CustomerDashboard navigate={navigate} params={params} />;
    case CONSTANTS.CREATOR:
      return <CreatorDashboard navigate={navigate} params={params} />;
    case CONSTANTS.MODERATOR:
      return <Navigate to='/*' replace />;
    default:
      return <div>Unknown user</div>
  }
};

export default Dashboard;
