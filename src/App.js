
import './App.css';
import React,{lazy} from 'react';
import {Routes, Route } from "react-router-dom";
import AppWrapper from './components/AppWrapper';
import { Login } from './components';
import { PrivateRoute } from './pages';



function App() {

  //components
  const Main = lazy(() => import("./pages/Main"))
  const Search = lazy(() => import("./pages/Search"))
  const Basket = lazy(() => import("./pages/Basket"))
  const Checkout = lazy(() => import("./pages/Checkout"))
  const History = lazy(() => import("./pages/History"))
  const ShowProduct = lazy(() => import("./pages/ShowProduct"))
  // const PrivateRoute = lazy(()=> import("./pages/PrivateRoute"))
  
  
  return (
    <AppWrapper>
      <Routes>
        <Route path="/" exact element={<Main/>} />
        <Route path="/product/:id" exact element={<ShowProduct />} />
        <Route path="/search" exact element={<Search />} />
        <Route path="/cart" exact element={
          <PrivateRoute redirect={"/cart"} component={Basket} />
        } />
        <Route path="/checkout" exact element={
          <PrivateRoute redirect={"/checkout"} component={Checkout} />
        } />
        <Route path="/history" exact element={
          <PrivateRoute redirect={"/history"} component={History} />
        } />
        <Route path="/signin" exact element={<Login /> } /> 
        
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      {/* <p className="p-4 cursor-pointer text-xl font-sans font-bold underline" onClick={()=>handleTest()}> 
                test data
              </p> */}
      </Routes>
    </AppWrapper> 
  );
}

export default App;
