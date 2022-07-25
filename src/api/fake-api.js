

export default function useHttp() {

    const masterItems = [
        {
            id: 1,
            name: "banana",
            displayName: "Banana",
            price: 8.99,
            image: "https://ceagesp.gov.br/wp-content/uploads/2015/07/banana.nanica-412x322.jpg"
        },
        {
            id: 2,
            name: "maca",
            displayName: "Maça",
            price: 10.80,
            image: "https://conteudo.imguol.com.br/c/entretenimento/32/2018/01/18/maca-1516308281068_v2_4x3.jpg"
        },
        {
            id: 3,
            name: "manga",
            displayName: "Manga",
            price: 7.22,
            image: "https://s2.glbimg.com/QeQ9cqGo-kE-TyD1crH7jpUiDE4=/620x455/e.glbimg.com/og/ed/f/original/2020/01/21/gettyimages-463651383.jpg"
        },
        {
            id: 4,
            name: "pera",
            displayName: "Pêra",
            price: 58.45,
            image: "https://conteudo.imguol.com.br/c/entretenimento/4e/2020/03/23/pera-1584989626321_v2_4x3.jpg"
        },
        {
            id: 5,
            name: "abacaxi",
            displayName: "Abacaxi",
            price: 58.45,
            image: "https://conteudo.imguol.com.br/c/entretenimento/04/2017/12/11/abacaxi-1513012505452_v2_4x3.jpg"
        }
    ];

    const endPoints = {
        "/login": (fields) => {
            if (fields.email === "cliente@cliente.com.br" && fields.password === "123") {
                return {
                    error: false,
                    message: "logado com sucesso"
                }
            }
            return {
                error: true,
                message: "Credenciais inválidas"
            }
        },
        "/input-search": () => {
            return masterItems;
        },
        "/search": (termToSearch) => {
            let items = [];
            if (termToSearch) {
                items = masterItems.filter(el => el.displayName.toLowerCase().includes(termToSearch.toLowerCase()))
            }
            return !!termToSearch ? items : masterItems;
        },
    };

    function get(url) {
        return endPoints[url]()
    }

    function post(url, fields) {
        return endPoints[url](fields)
    }

    return { get, post };
}