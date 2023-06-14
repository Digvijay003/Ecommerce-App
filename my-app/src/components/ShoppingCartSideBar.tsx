import { Offcanvas, Stack } from "react-bootstrap"
import { useShoppingContext } from "../contexts/ShoppingContext"
import { CartItem } from "./CartItem"
import { currencyFormatter } from "../utilities/currecnyFormatter"
import storeItems from '../data/items.json'



type ShoppingCartSideBarProps={
    isopen:boolean
}

export function ShoppingCartSideBar({isopen}:ShoppingCartSideBarProps){
    const {cartClosed,itemsList,getQuantity}=useShoppingContext()

    return(
        <Offcanvas show={isopen}onHide={cartClosed}placement="end">
         <Offcanvas.Header closeButton>
            <Offcanvas.Title>
                My Cart Items
            </Offcanvas.Title>

         </Offcanvas.Header>
         <Offcanvas.Body>
            <Stack gap={4}>
            {itemsList.map(item => (
            <CartItem key={item.id} {...item} />
          ))}
               <div className="ms-auto fw-bold fs-5">
            Total{" "}
            {currencyFormatter(
              storeItems.reduce((total, item) => {
                const items = storeItems.find(i => i.id === item.id)
              
                return total + (items?.price || 0) * getQuantity(item.id)
              }, 0)
            )}
          </div>
            </Stack>
          
         </Offcanvas.Body>
        </Offcanvas>
        
    )

}