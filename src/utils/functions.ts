import { MAX_CHARACTER_DESCRIPTION_LENGTH } from "./constants";

export const getFormattedDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

export const getFormattedPrice = (price: string) => {
  const dollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0
  })
  return dollar.format(+price);
}

export const getShortDescription = (description: string) => {
  return `${description.slice(0, MAX_CHARACTER_DESCRIPTION_LENGTH)}${description.length > MAX_CHARACTER_DESCRIPTION_LENGTH ? '...' : ''} `
}