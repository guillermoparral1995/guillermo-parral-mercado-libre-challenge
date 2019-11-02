export const formatPrice = (price) => {
    return `${price.currency === 'ARS' ? '$' : 'U$S'}${price.amount}`
};