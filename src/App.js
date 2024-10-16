
import './App.css';
import React,{lazy} from 'react';
import {Routes, Route, BrowserRouter } from "react-router-dom";
import AppWrapper from './components/AppWrapper';
import { Login, ResetPassword } from './components';
import { PrivateRoute } from './pages';
import Signup from './components/forms/Signup';

// BrowserRouter

function App() {

  //components
  const Main = lazy(() => import("./pages/Main"))
  const Search = lazy(() => import("./pages/Search"))
  const NoRoute = lazy(() => import("./pages/404"))
  const Basket = lazy(() => import("./pages/Basket"))
  const Checkout = lazy(() => import("./pages/Checkout"))
  const History = lazy(() => import("./pages/History"))
  const Dashboard = lazy(() => import("./pages/UserDashboard"))
  // const Dashboard = lazy(() => import("./pages/UserDashboard/UserDashboard"))
  const ShowProduct = lazy(() => import("./pages/ShowProduct"))
  const Categories = lazy(() => import("./pages/Categories"))

  // const PrivateRoute = lazy(()=> import("./pages/PrivateRoute"))
  
  // if(connectionRetries > 2){

  // }
  return (
    <AppWrapper>
      <Routes>
        <Route path="/" exact element={<Main/>} />
        <Route path="/products/:id" exact element={<ShowProduct />} />
        <Route path="/search" exact element={<Search />} />
        <Route path="/categories" exact element={<Categories />} />
        <Route path="/cart" exact element={
          <PrivateRoute component={Basket} />
        } />
        <Route path="/checkout" exact element={
          <PrivateRoute component={Checkout} />
        } />
        <Route path="/history" exact element={
          <PrivateRoute component={History} />
        } />
        <Route path="/me" exact element={
          <PrivateRoute component={Dashboard} />
        } />
        <Route path="/signup" exact element={<Signup /> } /> 
        <Route path="/signin" exact element={<Login /> } /> 
        <Route path="/reset-password" exact element={<ResetPassword />}/>
        
        <Route
          path="*"
          element={<NoRoute/>}
        />
      {/* <p className="p-4 cursor-pointer text-xl font-sans font-bold underline" onClick={()=>handleTest()}> 
                test data
              </p> */}
      </Routes>
    </AppWrapper> 
  );
}

export default App;
