import React from 'react'
import { toast, ToastContainer } from 'react-toastify'
const GlobalContext = React.createContext()

export default function GlobalContextProvider({ children }) {

    const [cartItems, setCartItems] = React.useState({});
    const [auth, setAuth] = React.useState({});

    const addItemToCart = (item, quantity) => {
        toast.success("Item adicionado ao carrinho", {
            position: "bottom-right"
        })
        let tempState = { ...cartItems };
        if (!cartItems[item.id]) {
            tempState[item.id] = {
                ...item
            };

            setCartItems(tempState);
            return;
        }

        tempState[item.id] = {
            ...item,
            quantity: tempState[item.id].quantity + item.quantity
        };

        setCartItems(tempState);
    }

    const removeItemFromCart = (id) => {
        let tempState = { ...cartItems };

        delete tempState[id];

        setCartItems(tempState);
    }

    const incrementItem = (id) => {
        let tempState = { ...cartItems };
        tempState[id].quantity += 1;
        setCartItems(tempState);
    }

    const decrementItem = (id) => {
        let tempState = { ...cartItems };
        tempState[id].quantity -= 1;
        setCartItems(tempState);
    }

    const sumOfAllItems = () => {
        return Object.entries(cartItems)
            .reduce((previousValue, currentValue) => previousValue + (currentValue[1].price * currentValue[1].quantity), 0)
    }
    const clearItems = () => {
        setCartItems({})
    }

    React.useEffect(() => {
        if (window.location.pathname !== "/login" && !Object.keys(auth).length) {
            window.location.href = "/login"
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [window.location.pathname]);

    return (
        <GlobalContext.Provider value={{
            cartItems,
            addItemToCart,
            sumOfAllItems,
            removeItemFromCart,
            setAuth,
            incrementItem,
            clearItems,
            decrementItem,
            auth
        }}>

            <ToastContainer />
            {children}
        </GlobalContext.Provider>
    )
}
export { GlobalContext }