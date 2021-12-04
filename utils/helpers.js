import { createCheckout, updateCheckout } from '@/lib/shopify'
import {createCheckout as createCheckoutBackend}  from '../services/productService'

export function saveLocalData(cart, checkoutId, checkoutUrl) {
  localStorage.setItem("cart", JSON.stringify([cart, checkoutId, checkoutUrl]))
}

function getLocalData() {
  return JSON.parse(localStorage.getItem(''))
}

export function setLocalData(setCart, setCheckoutId, setCheckoutUrl) {
  const localData = getLocalData()
  if (localData) {
    if (Array.isArray(localData[0])) {
      setCart([...localData[0]])
    }
    else {
      setCart([localData[0]])
    }
    setCheckoutId(localData[1])
    setCheckoutUrl(localData[2])
  }
}

export async function createShopifyCheckout(newItem) {
  const data = await createCheckout( newItem['id'], newItem['quantity'])
  return data
}

export async function updateShopifyCheckout(updatedCart, checkoutId) {
  const lineItems = updatedCart.map(item => {
    return {
      id: item['id'],
      quantity: item['quantity']
    }
  })
  await updateCheckout(checkoutId, lineItems)
}

export function getCartSubTotal(cart) {
  if (cart.length === 0) {
    return 0
  }
  else {
    let totalPrice = 0
    cart.forEach(item => totalPrice += parseInt(item.quantity) * parseFloat(item.price))
    return Math.round(totalPrice * 100) / 100
  }
}