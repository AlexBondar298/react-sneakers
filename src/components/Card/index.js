import React, {useContext} from "react";
import styles from "./Card.module.scss";
import ContentLoader from "react-content-loader";
import { AppContext } from "../../App";

function Card({id, parentId, title, price, imageUrl}){
  const {onAddToCart, favoriteAdded, onAddFavorite, isLoading, cartAdded} = useContext(AppContext)

  const onClickPlus = () => {
    onAddToCart({id, parentId, title, price, imageUrl})
  }

  const onFavoritePlus = () => {
    onAddFavorite({id, parentId, title, price, imageUrl})
  }
    return(
        <div className={styles.card}>

          { isLoading
          ? 
          <ContentLoader 
            speed={2}
            width={155}
            height={250}
            viewBox="0 0 155 265"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb">
              <rect x="1" y="0" rx="10" ry="10" width="155" height="155" />
              <rect x="0" y="167" rx="5" ry="5" width="155" height="15" />
              <rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
              <rect x="1" y="234" rx="5" ry="5" width="80" height="25" />
              <rect x="124" y="230" rx="10" ry="10" width="32" height="32" />
          </ContentLoader>
            :
          <>
            <div className={styles.favorite} onClick={onFavoritePlus}>
              {id && <img src={favoriteAdded(parentId) ? "img/heart-liked.svg" : "img/heart-unliked.svg"} alt="Unliked"/>}
            </div>
            <img width={"100%"} height={135} src={imageUrl} alt="Sneakers"/> 
            <h5>{title}</h5>
            <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
              <div style={{display:"flex", flexDirection:"column"}}>
                <p style={{margin:0}}> Цена: </p>
                <b> {price} грн.</b>
              </div>

              <div> 
                {id && <img src={cartAdded(parentId) ? "img/btn-checked.svg" : "img/btn-plus.svg"} onClick={onClickPlus} alt="Plus" />}
              </div>
            </div>
          </>
            
          }

      </div>  
    )

}

export default Card