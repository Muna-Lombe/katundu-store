import { useDispatch, useSelector } from 'react-redux';
import {Navigate, useLocation } from 'react-router-dom';
import { authenticatedUsersV2, isAuthedUserV2 } from '../orm/selectors';
import types from '../orm/actions/actionTypes';

const PrivateRoute =({ component: Component}) =>{
  const authSessions = useSelector(authenticatedUsersV2) 
  // console.log("as", authSessions)
  const userAuthed = useSelector(isAuthedUserV2(authSessions[0]?.uuid))
  const location = useLocation()
  const dispatch = useDispatch()
  

  
  return (
    <>
    {
        (!authSessions.length || authSessions?.some(as=>as.authStatus === types.AUTH_EXPIRED|| !userAuthed)) 
          ? <Navigate 
              state={
                { 
                  ...location,  
                }
              }   
              to={'/signin' } />
          :<Component  />
    }
    </>
  );
}

export default PrivateRoute ;
