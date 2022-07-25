const formatToBrl = (number) => {
    return new Intl.NumberFormat('pt-BR', { currency: "BRL", minimumFractionDigits: 2 }).format(number);
}

export {
    formatToBrl
}