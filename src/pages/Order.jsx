import Card from "../components/Card"
import Info from "../components/info"
import {nanoid} from 'nanoid'

function Order({orderItems}){

  const orderKey = nanoid(5)
  const rezult = 
    Object.entries(orderItems)
      .map(([key, value]) => Object.entries(value).map(([key, value]) => {
        return(
          <div key={orderKey}> 
            <h3>Замовлення номер: {key}</h3>
            <div style={{display:"flex", flexWrap:"wrap"}}> 
              {value.map((elem, index) => <Card 
                key={index}
                parentId={elem.parentId}
                title={elem.title} 
                price={elem.price} 
                imageUrl={elem.imageUrl} 
              />)}
            </div> 
          </div>
        ) 
      }))
  
  return(
    <>
      {orderItems.length > 0 ?
        <>
          <div className="content">
            <div style={{display:"flex", alignItems:"center", marginBottom:40, justifyContent:"space-between"}}>
              <h1>Ваші замовлення</h1>
            </div>
            <div style={{display:"flex", margin:30, flexWrap:"wrap"}}>
              {rezult}
            </div>
          </div>
        </>
        :
        <div style={{display:"flex", alignItems:"center", height:"70vh"}}>
          <Info 
            title="Замовлення відсутніі"
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

export default Order