import React from 'react'
import { ShoppingBasket } from '@mui/icons-material';
import { Badge, Button, Divider, IconButton, Popover } from '@mui/material'
import PopupState, { bindPopover, bindTrigger } from 'material-ui-popup-state';
import { formatToBrl } from '../helpers/format-numbers';
import { Link } from 'react-router-dom';

export default function Cart({ items, sumOfItems, onRemoveItem, onFinalize }) {
    return (
        <PopupState variant="popover" popupId="demo-popup-popover">
            {(popupState) => (
                <div>
                    <IconButton {...bindTrigger(popupState)} sx={{
                        marginRight: 5
                    }}>
                        <Badge badgeContent={Object.keys(items).length} color="warning">
                            <ShoppingBasket sx={{
                                fontSize: 30
                            }} />
                        </Badge>
                    </IconButton>

                    <Popover
                        {...bindPopover(popupState)}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'start',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                    >

                        <div className="w-72">
                            <h1 className='text-center font-bold mt-3'>Seus itens</h1>
                            <div>
                                {
                                    Object.entries(items).map((item, index) => {
                                        return (
                                            <div className='flex mx-2 my-3' key={index}>
                                                <img style={{
                                                    width: "auto",
                                                    height: 80
                                                }} className="rounded-md mr-2" src={item[1].image} alt="Produto" />
                                                <div className='flex flex-col justify-between'>
                                                    <span>{item[1].name}({item[1].quantity})</span>
                                                    <span className='text-green-700 -my-1'>
                                                        R${formatToBrl(item[1].price)}
                                                        <span style={{
                                                            fontSize: 10
                                                        }}>
                                                            (R${formatToBrl(item[1].price * item[1].quantity)})
                                                        </span>
                                                    </span>
                                                    <button className='bg-red-300 w-20 rounded-md px-1 mt-1 text-sm' onClick={() => onRemoveItem(item[1])}>Remover</button>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            {
                                Object.keys(items).length === 0 &&
                                <div className='text-gray-400 text-center py-5'>
                                    Ainda não existem items em seu carrinho 😔<br />
                                </div>
                            }
                            {
                                Object.keys(items).length > 0 &&
                                <>
                                    <Divider />
                                    <div className='flex justify-center flex-col items-center mb-2'>
                                        <span className="my-2">Total: <span className='text-green-800'>R${sumOfItems}</span></span>
                                        <Button onClick={onFinalize}>Finalizar compra</Button>
                                        <Link to="/cart">
                                            <Button >Ver carrinho</Button>
                                        </Link>
                                    </div>
                                </>
                            }
                        </div>
                    </Popover>
                </div>
            )}
        </PopupState>
    )
}
