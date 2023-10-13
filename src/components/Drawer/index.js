import styles from "./Drawer.module.scss";
import Info from "../info"
import axios from "axios";
import { useState } from "react";

function Drawer({onClose, onAddToCart, cartItems = [], setCartItems, setOrderItems}){
    
    const summa = cartItems.reduce((a,b) => a+Number(b.price),0)
    const [isOrderComplete, setIsOrderComplete] = useState(false)

    const[numOrder, setNumOrder] = useState()

    const onClickOrder = () => {
        async function getId(){
            const delCart = await axios.get("https://64f89d2c824680fd217fd692.mockapi.io/cart").then(res => res.data);
            const num = Math.floor(Math.random() * (100 - 0 + 1)) + 0 + "";

            for(let i = 0; i < delCart.length; i++){
              const deleteID = delCart[i].id
              await axios.delete(`https://64f89d2c824680fd217fd692.mockapi.io/cart/${deleteID}`);
            }
            setOrderItems(prev => [...prev, {[num]:cartItems}])
            setCartItems([])
            setNumOrder(num)
        }
        getId()
        setIsOrderComplete(true)
    }
    
    return(
        <div className={styles.overlay}>
            <div className={styles.drawer}>
            <h2 style={{marginBottom:"30px"}}>Корзина
                <img className={styles.removeBtn} src="/img/btn-remove.svg" alt="btn-remove" onClick={onClose}/>
            </h2>

            {
            cartItems.length > 0 ?
                  
            <> 
                <div className={styles.items} style={{flex:1, overflow:"auto", marginBottom:"40px"}}>

                    {cartItems.map((elem, index) => (
                        <div key={index} className={styles.cartItem} style={{display:"flex", alignItems:"center", marginBottom:"20px"}}>
                            <div className={styles.cartItemImg} style={{backgroundImage: `url(${elem.imageUrl})`}} alt="Sneakers"></div>
                            <div style={{marginRight:"20px", display:"flex", flexDirection:"column"}}>
                            <p style={{marginBottom:"5px"}}>{elem.title}</p>
                            <b>{elem.price} грн.</b>              
                            </div>
                                <img 
                                onClick={() => onAddToCart(elem)}
                                className={styles.removeBtn} 
                                src={"/img/btn-remove.svg"} 
                                alt="btn-remove" />
                            </div>
                    ))}
                </div>

                <div className={styles.cartTotalBlock}>
                     <ul>
                     <li> 
                         <span>Итого:</span>
                         <div></div>
                         <b>{summa.toFixed(2)} грн.</b>
                     </li>
                     <li> 
                         <span>НДС 5%:</span>
                         <div></div>
                         <b>{(summa * 0.2).toFixed(2)} грн.</b>
                    </li>
                    </ul>
                    <button className={styles.greenButton} onClick={onClickOrder}>Оформити замовлення 
                    <img src="/img/arrow.svg" alt="arrow" />
                    </button>
                </div>

            </>
            : 
            <Info 
                onClose={onClose}
                title={isOrderComplete ? "Замовлення оформлене": "Корзина порожня"}
                message={isOrderComplete ? `Замовлення № ${numOrder}`: "Купи собі колеса"}
                button="Повернутися додому"
                imageUrl={isOrderComplete ? "/img/complete-order.jpg" : "/img/empty-cart.jpg"}
                />
            }
           
            </div>
        </div>
    )
}

export default Drawer;