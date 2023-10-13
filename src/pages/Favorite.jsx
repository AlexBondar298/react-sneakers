import Card from "../components/Card"
import Info from "../components/info"

function Favorite(props){
  const rezult = props.favoriteItems.map((elem, index) => <Card 
    key={index}
    id={elem.id}
    parentId={elem.parentId}
    title={elem.title} 
    price={elem.price} 
    imageUrl={elem.imageUrl} 
  />)
  
  return(
    <>
      {props.favoriteItems.length > 0 ?
        <>
          <div className="content">
            <div style={{display:"flex", alignItems:"center", marginBottom:40, justifyContent:"space-between"}}>
              <h1>Симпатяги</h1>
            </div>
            <div style={{display:"flex", margin:30, flexWrap:"wrap"}}>
              {rezult}
            </div>
          </div>
        </>
        :
        <div style={{display:"flex", alignItems:"center", height:"70vh"}}>
          <Info 
            title="Улюбленці відсутні"
            message="Вам нічого не сподобалося"
            button="Повернутися додому"
            imageUrl={"img/empty-cart.jpg"}
            onClose={() => alert("not")}
          />
        </div>
      }
  </>  
  )
}

export default Favorite