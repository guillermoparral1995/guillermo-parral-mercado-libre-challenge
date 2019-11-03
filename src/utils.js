const addSeparators = (price) => price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

export const formatPrice = (price) => {
    return `${price.currency === 'ARS' ? '$ ' : 'U$S '}${addSeparators(price.amount)}`
};