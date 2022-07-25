import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';

import { Add, HorizontalRule } from '@mui/icons-material';
import { Button } from '@mui/material';
import { formatToBrl } from '../helpers/format-numbers';


export default function CardComponent({
    id,
    image,
    name,
    price,
    onAddClick
}) {
    const [quantity, setQuantity] = React.useState(1)

    const clearQuantity = () => {
        setQuantity(1)
    }

    const increment = () => {
        setQuantity(quantity + 1)
    }

    const decrement = () => {
        quantity > 1 && setQuantity(quantity - 1)
    }

    return (
        <Card sx={{ maxWidth: 200 }} className="my-2 drop-shadow-xl">
            <CardMedia
                component="img"
                height="194"
                image={image}
            />
            <CardContent className="flex justify-between">
                <Typography variant="body" color="text.secondary">
                    {name}
                </Typography>
                <Typography variant="body" color="text.secondary" fontWeight={"bold"}>
                    <div className='text-green-700'>
                        R$ {formatToBrl(price)}
                        <span style={{ fontSize: 8 }}>(kg)</span>
                    </div>
                </Typography>
            </CardContent>
            <CardActions className='flex justify-center flex-col items-center align-center w-full bg-red-40'>
                <div className='flex'>
                    <Button onClick={decrement} style={{
                        maxWidth: 10
                    }} size="small">
                        <HorizontalRule />
                    </Button>
                    <h2 className='m-0 p-0 font-bold'>{quantity}</h2>
                    <Button onClick={increment} className="bg-red-300" style={{
                        maxWidth: 30
                    }} size="small" >
                        <Add />
                    </Button>


                </div>
                <div className='mt-2 flex w-full justify-center'>
                    <Button onClick={() => {
                        onAddClick({
                            id,
                            name,
                            price,
                            quantity,
                            image
                        })
                        clearQuantity()
                    }} className="bg-red-300" style={{
                        maxWidth: 100
                    }} size="small" variant='contained'>
                        Adicionar
                    </Button>
                </div>
            </CardActions>
        </Card>
    );
}
