import {Link} from "react-router-dom"

function Header(props){
  return (
      <header style={{textDecoration:"none"}}>
        <Link to="/">
      <div className="headerLeft" title="На главную">
          <img src="img/logo.svg" alt="logo" />

        <div className="headerInfo">
          <h3>REACT SNEAKERS</h3>
          <p style={{opacity:0.5}}>Магазин лучших кроссовок</p>
        </div>
      </div>
        </Link>
      <ul className="headerRight">
        <li style={{marginRight:30}}>
          <img width={18} height={18} src="/img/cart.svg" alt="Cart" onClick={props.onClose} title="Корзина"/>
          <span>{(props.cartItems.reduce((a,b) => a+Number(b.price),0)).toFixed(2)} грн.</span>
        </li>
        <li>
          <Link to="order">
            <img width={18} height={18} src="img/user.svg" alt="" />
          </Link>
        </li>
        <li>
          <Link to="favorite">
            <img width={18} height={18} style={{marginLeft:"30px"}} src="img/heart.svg" alt="" onClick={props.favoriteDesk}/>
          </Link>
        </li>
      </ul>
    </header>
  )
}
export default Header