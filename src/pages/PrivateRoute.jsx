import { useSelector } from 'react-redux';
import {Navigate } from 'react-router-dom';
import { authenticatedUsers, isAuthedUser } from '../orm/selectors';
import types from '../orm/actions/actionTypes';

const PrivateRoute =({ component: Component, redirect}) =>{
  const authSessions = useSelector(authenticatedUsers)
  const userAuthed = useSelector(isAuthedUser(authSessions[0]?.id))
  return (
    <>
    {
        (!authSessions.length || authSessions?.some(as=>as.authStatus === types.AUTH_EXPIRED|| !userAuthed)) 
          ?<Navigate state={{redirect:redirect}}   to={'/signin' } />
          :<Component  />
    }
    </>
  );
}

export default PrivateRoute ;
