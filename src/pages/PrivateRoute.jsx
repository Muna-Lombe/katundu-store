import { useSelector } from 'react-redux';
import {Navigate, useLocation } from 'react-router-dom';
import { authenticatedUsers, isAuthedUser } from '../orm/selectors';
import types from '../orm/actions/actionTypes';

const PrivateRoute =({ component: Component}) =>{
  const authSessions = useSelector(authenticatedUsers)
  const userAuthed = useSelector(isAuthedUser(authSessions[0]?.id))
  const location = useLocation()

  return (
    <>
    {
        (!authSessions.length || authSessions?.some(as=>as.authStatus === types.AUTH_EXPIRED|| !userAuthed)) 
          ?<Navigate state={{...location}}   to={'/signin' } />
          :<Component  />
    }
    </>
  );
}

export default PrivateRoute ;
