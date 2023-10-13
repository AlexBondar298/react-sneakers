import React, { useState, useEffect, createContext } from "react";
import {Routes, Route} from "react-router-dom";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import axios from 'axios';

import Home from "./pages/Home";
import Favorite from "./pages/Favorite";
import Order from "./pages/Order";

export const AppContext = createContext();

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favoriteItems, setFavoriteItems] = useState([]);              
  const [favoriteOpened, setFavoriteOpened] = useState(false);         
  const [searchValue, setSearchValue] = useState("")
  const [cartOpened, setCartOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [orderItems, setOrderItems] = useState([]); 

  useEffect(() => {
    async function fetchData(){
      try {
        setIsLoading(true)

        const cartResponse = await axios.get('https://64f89d2c824680fd217fd692.mockapi.io/cart') 
        const itemsResponse = await axios.get('https://64f89d2c824680fd217fd692.mockapi.io/items');

        setIsLoading(false)
      
        setCartItems(cartResponse.data.filter(elem => elem.cart === true));
        setFavoriteItems(cartResponse.data.filter(elem => elem.favorite === true));
        setItems(itemsResponse.data);
        
      } catch (error) {
        alert("ошибка при запросе данных")
      }
    }
    
    fetchData()
  }, [])

  const onAddToCart = (data) => {
    if (cartItems.find(elem => Number(elem.parentId) === Number(data.parentId))){
      setCartItems(prev => prev.filter(elem => Number(elem.parentId) !== Number(data.parentId)))

      async function getId(){
        try {
          const cartItems = await axios.get("https://64f89d2c824680fd217fd692.mockapi.io/cart").then(res => res.data);
          const deleteID = await cartItems.filter(elem => elem.parentId === data.parentId && elem.cart === true)[0].id
          axios.delete(`https://64f89d2c824680fd217fd692.mockapi.io/cart/${deleteID}`);
        } catch (error) {
          alert("Произошла ошибка, товар не удален из корзины")
          console.log(error)
        }
      }
      getId()
    } else {
      setCartItems(prev => [...prev, data])
      try {
        axios.post("https://64f89d2c824680fd217fd692.mockapi.io/cart", {...data, "cart": true});
      } catch (error) {
        alert("Произошла ошибка, товар не добавлен в корзину")
        console.log(error)
      }
    }
  }
  
  const onAddFavorite = (boot) => {
    if (favoriteItems.find(elem => Number(elem.parentId) === Number(boot.parentId))){
      setFavoriteItems(prev => prev.filter(elem => Number(elem.parentId) !== Number(boot.parentId)))

      async function getId(){
        const favoriteItems = await axios.get("https://64f89d2c824680fd217fd692.mockapi.io/cart").then(res => res.data);
        const deleteID = await favoriteItems.filter(elem => elem.parentId === boot.parentId && elem.favorite === true)[0].id
        axios.delete(`https://64f89d2c824680fd217fd692.mockapi.io/cart/${deleteID}`);
      }
      getId()
    
    } else {
      setFavoriteItems(prev => [...prev, boot]);

      axios.post("https://64f89d2c824680fd217fd692.mockapi.io/cart", {...boot, "favorite": true})
    }
  }

  const onRemoveFavorite = (parentId) => {
    setFavoriteItems(prev => prev.filter(a => a.parentId !== parentId))
  }

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value)
  }

  const cartAdded = (parentId) => {
    return cartItems.some(obj => Number(obj.parentId) === Number(parentId))
  }
  const favoriteAdded = (parentId) => {
    return favoriteItems.some(obj => obj.parentId === parentId)
  }
   
  return (
    <AppContext.Provider value={{
      isLoading,
      onAddToCart,
      cartAdded,
      onAddFavorite,
      onRemoveFavorite,
      favoriteAdded
      }}>
      <div className="wrapper clear">

        {cartOpened ? 
          <Drawer 
            cartItems={cartItems}
            setOrderItems={setOrderItems} 
            onAddToCart={(obj) => onAddToCart(obj)} 
            onClose={() => setCartOpened(!cartOpened)}
            setCartItems={setCartItems}
          /> 
          : null}
        <Header cartItems={cartItems} onClose={() => setCartOpened(!cartOpened)} favoriteDesk={() => setFavoriteOpened(!favoriteOpened)}/>

        <Routes>
        
          <Route  path="" element={<Home 
            items = {items}
            cartItems = {cartItems}
            searchValue = {searchValue}
            onChangeSearchInput = {onChangeSearchInput}
            setSearchValue = {setSearchValue}
            loading={isLoading}
          />}/>      
          
          <Route  path="favorite" element={<Favorite
            favoriteItems = {favoriteItems}
          />}/>

          <Route  path="order" element={<Order
            orderItems = {orderItems}
          />}/>
          
        </Routes>

      </div>
      
    </AppContext.Provider>
  );
}

export default App;