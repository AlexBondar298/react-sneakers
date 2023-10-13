import React from "react";
import styles from "./Info.module.scss";

const Info = ({title, message, button, onClose, imageUrl}) =>{
    return(
        <div className={styles.cartEmpty} style={{display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", flex:"1"}}>
                <img width={120} src={imageUrl} alt="empty-cart" />
                <h2>{title}</h2>
                <p style={{opacity:"0.3"}}> {message}</p>
                <button className={styles.greenButton} onClick={onClose}> 
                    <img src="img/arrow.svg" alt="arrow"/> {button}
                </button>
            </div> 
    )

}

export default Info
