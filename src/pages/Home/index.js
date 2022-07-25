import { Paper } from '@mui/material'
import React from 'react'
import useHttp from '../../api/fake-api'
import CardComponent from '../../components/CardComponent'
import Header from '../../components/Header'
import { GlobalContext } from '../../context/GlobalContext'
import Print from '../Print'

export default function Home() {

    const context = React.useContext(GlobalContext);
    const { get, post } = useHttp();
    const [results, setResults] = React.useState([]);

    const search = () => {
        setResults(get("/search"))
    }

    React.useEffect(() => {
        search()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const addItems = (itemToAdd) => {
        context.addItemToCart(itemToAdd, itemToAdd.quantity)
    }

    const handleSeach = (termToSearch) => {
        setResults(post("/search", termToSearch))
    }

    return (
        <div style={{
            background: "#f5f5f5",
            width: "100%",
            height: "100vh",
        }}>
            <Header onSearch={handleSeach} />
            <Print />
            <Paper className='h-full'>

                <div className='p-5 flex flex-wrap gap-4 justify-center'>
                    {
                        results.map(item =>
                            <CardComponent
                                key={item.id}
                                id={item.id}
                                price={item.price}
                                name={item.displayName}
                                image={item.image}
                                onAddClick={addItems}
                            />)
                    }
                    {
                        !results.length &&
                        <div className='text-gray-400 text-center py-5'>
                            O item que você procura não está disponível 😔<br />
                        </div>
                    }
                </div>
            </Paper>

        </div>
    )
}
