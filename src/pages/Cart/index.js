import { Add, HorizontalRule } from '@mui/icons-material';
import { Button } from '@mui/material'
import React from 'react'
import Header from '../../components/Header'
import { GlobalContext } from '../../context/GlobalContext';
import { formatToBrl } from '../../helpers/format-numbers';
import Print from '../Print';

export default function Cart() {
    let context = React.useContext(GlobalContext);

    const [showModalPrint, setShowModalPrint] = React.useState();

    const onFinalizeBuy = () => {
        setShowModalPrint(true)
    }

    return (
        <div style={{
            background: "white",
            width: "100%",
            height: "100vh",
        }}>
            <Header onSearch={() => { }} showSearchButton={false} />
            <div className='p-5 '>
                <h3 className='text-2xl font-bold py-5'>Seu carrinho (R${formatToBrl(context.sumOfAllItems())})</h3>
                <div>
                    {
                        Object.entries(context.cartItems).map(item =>
                            <div className='flex shadow'>
                                <img className='w-40 rounded' alt="Produto" src={item[1].image} />
                                <div className='ml-3'>
                                    <h2 className='text-xl'>{item[1].name} ({item[1].quantity})</h2>
                                    <h2 className='text-lg text-green-700'>R$ {formatToBrl(item[1].price)}</h2>
                                    <div className='flex'>
                                        <Button onClick={() => { context.decrementItem(item[0]) }} style={{
                                            maxWidth: 5,
                                            width: 5
                                        }} size="small">
                                            <HorizontalRule />
                                        </Button>
                                        <h2 className='m-0 p-0 font-bold'>{item[1].quantity}</h2>
                                        <Button onClick={() => { context.incrementItem(item[0]) }} className="bg-red-300" style={{
                                            maxWidth: 30
                                        }} size="small" >
                                            <Add />
                                        </Button>

                                    </div>
                                    <button className='bg-red-300 w-20 rounded-md px-1 mt-1 text-sm' onClick={() => { context.removeItemFromCart(item[0]) }}>Remover</button>
                                </div>
                            </div>)
                    }
                    {
                        Object.keys(context.cartItems).length === 0 &&
                        <div className='text-gray-400 text-center py-5'>
                            Ainda não existem items em seu carrinho 😔<br />
                        </div>
                    }
                </div>

                {
                    Object.keys(context.cartItems).length > 0 &&
                    <div className='flex justify-end'>
                        <Button onClick={onFinalizeBuy}>Finalizar compra</Button>
                    </div>
                }

                <Print show={showModalPrint} onClose={() => setShowModalPrint(false)} />
            </div>
        </div>
    )
}
