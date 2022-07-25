import { Button, Dialog, DialogContent, DialogTitle } from '@mui/material'
import React from 'react'
import ReactToPrint from "react-to-print";
import TableComponent from '../../components/Table';
import { GlobalContext } from '../../context/GlobalContext';


export default function Print({ show, onClose }) {
    const ref = React.useRef();

    const context = React.useContext(GlobalContext);

    const FinalResult = () =>
        <div ref={ref} className=" flex flex-col w-full justify-center align-center items-center">
            <TableComponent columns={["Nome", "Preço", "Quantidade", "Total"]} rows={Object.entries(context.cartItems).map(item => ({
                name: item[1].name,
                price: item[1].price,
                quantity: item[1].quantity,
                sum: item[1].price * item[1].quantity
            }))} />
        </div>

    return (
        <Dialog open={!!show} onClose={() => {
            context.clearItems()
            onClose()
        }}>
            <DialogTitle>Imprimindo</DialogTitle>
            <DialogContent>
                <ReactToPrint
                    trigger={() => <div className='flex justify-center'><Button >Imprimir</Button></div>}
                    content={() => ref.current}
                />
                <FinalResult />
            </DialogContent>
        </Dialog>
    )
}
