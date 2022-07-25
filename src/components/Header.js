import React from 'react'
import { Link } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalContext';
import { formatToBrl } from '../helpers/format-numbers';
import Print from '../pages/Print';
import Cart from './Cart';
import SearchInput from './SearchInput';

export default function Header({ onSearch, showSearchButton = true }) {
    const context = React.useContext(GlobalContext);

    const [showModalPrint, setShowModalPrint] = React.useState();
    const [searchTerm, setSearchTerm] = React.useState("");


    const onSearchInner = () => {
        onSearch(searchTerm);
    };

    const removeItem = (item) => {
        context.removeItemFromCart(item.id)
    }

    const onFinalizeBuy = () => {
        setShowModalPrint(true)
    }

    return (
        <div className=''>
            <Print show={showModalPrint} onClose={() => setShowModalPrint(false)} />
            <div className='bg-green-600 flex justify-between items-center align-center py-2' >
                <Link to={"/home"}>
                    <h2 className='text-xl font-bold text-white p-2'>Horti Fruti</h2>
                </Link>
                {
                    showSearchButton &&
                    <SearchInput
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onSearch={onSearchInner}
                        className='flex justify-center w-full max-w-md hidden md:flex float-right' />
                }
                <div className="px-5 flex items-center ">
                    <Cart
                        items={context.cartItems}
                        sumOfItems={formatToBrl(context.sumOfAllItems())}
                        onRemoveItem={removeItem}
                        onFinalize={onFinalizeBuy}
                    />

                    <h1 className='text-white text-sm'>Bem-vindo, Cliente</h1>
                </div>
            </div>
            <div className='flex justify-center bg-white '>
                {
                    showSearchButton &&
                    <SearchInput
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onSearch={onSearchInner}
                        className='w-full max-w-sm mt-5 px-4 md:hidden  float-right' />
                }
            </div>
        </div>
    )
}
