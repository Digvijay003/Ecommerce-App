import { Button, Card } from "react-bootstrap"
import { currencyFormatter } from "../utilities/currecnyFormatter"
import { useShoppingContext } from "../contexts/ShoppingContext"

type storeItems={
    id:number,
    name:string,
    imgUrl:string,
    price:number

}



export function StoreItems({id,name,imgUrl,price}:storeItems){
    const {getQuantity,increasedQuantity,decreasedQuantity,removeFromCart}= useShoppingContext()
    const quantity=getQuantity(id)
    return (
        <Card className="h-100 shadow-md">
      <Card.Img
        variant="top"
        src={imgUrl}
        height="200px"
        style={{ objectFit: "cover" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-2">{name}</span>
          <span className="ms-2 text-muted">{currencyFormatter(price)}</span>
        
        </Card.Title>
        
        <div className="mt-auto">
        {quantity===0 ? ( <Button className="w-100"onClick={()=>increasedQuantity(id)} >
              + Add To Cart
            </Button>):<div
              className="d-flex align-items-center flex-column"
              style={{ gap: ".5rem" }}
            >
              <div
                className="d-flex align-items-center justify-content-center"
                style={{ gap: ".5rem" }}
              >
                <Button onClick={()=>decreasedQuantity(id)}>-</Button>
                <div>
                  <span className="fs-3">{quantity}</span> in cart
                </div>
              
                <Button onClick={()=>increasedQuantity(id)}>+</Button>
              </div>
              <Button
              onClick={()=>removeFromCart(id)}
              
                variant="danger"
                size="sm"
              >
                Remove
              </Button>
            </div>}
           
           
      
            
       
        </div>
      </Card.Body>
    </Card>
    ) 
}
