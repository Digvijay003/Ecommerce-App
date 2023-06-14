import { ReactNode, createContext, useContext, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { ShoppingCartSideBar } from "../components/ShoppingCartSideBar";
type ShoppingContextProviderProps={
    children:ReactNode
}
type CartItem={
    id:number
    quantity:number
}
type myShoppingContext={
    increasedQuantity:(id:number)=>void
    decreasedQuantity:(id:number)=>void
    removeFromCart:(id:number)=>void
    getQuantity:(id:number)=>number
    cartOpen:()=>void
    cartClosed:()=>void
    cartQuantity:number
    itemsList:CartItem[]

    
}


const myShoppingContext=createContext({} as myShoppingContext )


export function useShoppingContext(){
    return useContext(myShoppingContext)
}



export function ShoppingContextProvider({children}:ShoppingContextProviderProps){
    const [itemsList,setItemsList]=useLocalStorage<CartItem[]>("shopping-cart",[])
    const [isopen,setIsopen]=useState(false)

    const cartOpen=()=>setIsopen(true)
    const cartClosed=()=>setIsopen(false)

    const cartQuantity=itemsList.reduce( (quantity, item) => item.quantity + quantity,
    0)

    function increasedQuantity(id:number){
        setItemsList(currItems => {
            if (currItems.find(item => item.id === id) == null) {
              return [...currItems, { id, quantity: 1 }]
            } else {
              return currItems.map(item => {
                if (item.id === id) {
                  return { ...item, quantity: item.quantity + 1 }
                } else {
                  return item
                }
              })
            }
          })


    }
    function decreasedQuantity(id:number){
        setItemsList(currItems => {
            if (currItems.find(item => item.id === id)?.quantity === 1) {
              return currItems.filter(item => item.id !== id)
            } else {
              return currItems.map(item => {
                if (item.id === id) {
                  return { ...item, quantity: item.quantity - 1 }
                } else {
                  return item
                }
              })
            }
          })
    
    }
    function removeFromCart(id:number){
        setItemsList(cuurItem=>{
            return cuurItem.filter(item=>item.id!==id)
        })
    
    }
    function getQuantity(id:number){
        return itemsList?.find(item=>item.id===id)?.quantity||0
    
    }
    return <myShoppingContext.Provider 
    value={{
        getQuantity,
        increasedQuantity,
    decreasedQuantity,
    removeFromCart,
    cartOpen,
    cartClosed,
    cartQuantity,
    itemsList

    }}>
        {children}
        <ShoppingCartSideBar isopen={isopen}/>
    </myShoppingContext.Provider>
}