import React,{useState, useEffect}from 'react';


// cart context
const CartContext = React.createContext({
  items: [],
  cartItemInfo:0,
  addItem:(item) => {},
  removeItem: (id) => {},
  clearCart: () => {}
});
// 

// const defaultCartState =  {
//  items:[],
//  cartItemInfo:0 
// }



// cart provider
export const CartContextProvider = (props) => {
 
  const localData = localStorage.getItem('cartState');
  const json_data = JSON.parse(localData);

// useStatehook ()
  const [itemsState, setItemsState] = useState(localData !== null ? json_data :[]);
  const [cartItemQuantityAndSubtotal, setCartItemQuantityAndSubtotal] = useState({total_price:0, total_quantity:0});


  useEffect(() => {
   
    localStorage.setItem('cartState', JSON.stringify(itemsState))

    const itemPriceAndQuantity = [];

    for (let i = 0; i < itemsState.length; i++) {
      const priceQuantity = {
        price: itemsState[i].item.discountedPrice,
        quantity: itemsState[i].quantity,
      };
      itemPriceAndQuantity.push(priceQuantity);
    }

    let totalItemInCart = 0;
    let totalPrice = 0;

    //calculating total price and total item in cart
    itemPriceAndQuantity.map((e) => {
      totalItemInCart += e.quantity;
      totalPrice += e.quantity * e.price;
      return 0;
    });
     

    //setting cart informaiton to useEffect() hook
    setCartItemQuantityAndSubtotal({ total_price: totalPrice, quantity: totalItemInCart });







  },[itemsState]);
  
  const itemAddHandler = (item) => {
    for(let i in itemsState){
      if(item.item.id === itemsState[i].item.id){
        if( (item.quantity !== itemsState[i].quantity)){
          itemsState[i].quantity = item.quantity;
          return;
        }
        return;
      }
    }
        if(itemsState.length >= 1){
          setItemsState([...itemsState, item])
               
    }
    else{
      setItemsState([item])
    }
  }

  const itemRemoveHandler = (id) => {
      let updatedItems;
      const removeItemId = parseInt(id)
      updatedItems = itemsState.filter(item => item.item.id !== removeItemId)
      setItemsState(updatedItems)
    
  }
  
   const contextValue = {
      items:itemsState,
      cartItemInfo:cartItemQuantityAndSubtotal,
      addItem:itemAddHandler,
      removeItem: itemRemoveHandler,
      clearCart: () => {}
    };
  
  
    return (
      <CartContext.Provider value={contextValue}>
        {props.children}
      </CartContext.Provider>
    );
  };


export default CartContext;