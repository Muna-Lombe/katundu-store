import { useDispatch, useSelector } from 'react-redux';
import {Navigate, useLocation } from 'react-router-dom';
import { authenticatedUsers, authenticatedUsersV2, isAuthedUser, isAuthedUserV2 } from '../orm/selectors';
import types from '../orm/actions/actionTypes';
import { useLogoutUserMutation } from '../js/middleware/queryHandler';
import { useEffect } from 'react';

const PrivateRoute =({ component: Component}) =>{
  const authSessions = useSelector(authenticatedUsersV2) 
  // const authedUsers = useSelector(authenticatedUsersV2)
  // console.log("as", authSessions)
  const userAuthed = authSessions[0]?.authStatus === types.AUTH_VALID //useSelector(isAuthedUserV2(authSessions[0]?.uuid))
  const location = useLocation()
  // const dispatch = useDispatch()
  const [logoutUser] = useLogoutUserMutation()

  useEffect(()=>{
    const timeSinceLastAuth = new Date() - authSessions[0]?.timeCreated
    // 30 minutes
    if(timeSinceLastAuth > 1000*60*30){
      logoutUser()
    }
    return () => {
      // clearTimeout(timeout)
    }
  }, [])

  
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
