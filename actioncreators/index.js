import api from '../lib/api'

function receiveCoffees(coffees) {
  return { type: 'RECEIVE_COFFEES', payload: coffees }
}

export function fetchCoffees() {
  return (dispatch) => {
    api.service('coffees')
      .find()
      .then((result) => {
        const coffees = result.data.map((coffee) => (
          {...coffee, coffee_id: coffee.id}
        ))
        dispatch(receiveCoffees(coffees))
      })
  }
}

export function findOrder(phone) {
  console.log('hitting the function')
  return (dispatch) => {
    api.service('orders')
      .find({query: {phone}})
      .then((result) => {
        console.log('find orders by phone result: ', result);
        dispatch(receiveOrderHistory(result))
      })
  }
  return { type: 'FIND_ORDER_BY_PHONE', payload: { phone }}
}

export function receiveOrderHistory(orderHistory) {
  return {type: 'RECEIVE_ORDER_HISTORY', payload: orderHistory}
}
export function updatePlaceholderText (route) {
  return (dispatch) => {
    dispatch({type: 'SEND_ROUTE_TO_SEARCHBAR', payload: { route }})
  }
}

export function updateSearchWord(word) {
  return { type: 'UPDATE_SEARCHWORD', payload: word }
}

export function addCoffeeToCart(coffee_id, type) {
  return { type: 'ADD_COFFEE_TO_CART', payload: {
    coffee_id,
    type,
    quantity: 1,
    milk: '',
    sugar: 0
  } }
}

export function deleteCoffeeFromCart(coffee_id) {
  return {
    type: 'DELETE_COFFEE_FROM_CART',
    payload: { coffee_id }
  }
}

export function changeCoffeeOptions(id, changeType, changePayload) {
  return { type: 'CHANGE_COFFEE_OPTIONS', payload: { id, changeType, changePayload } }
}

export function createOrder(order, userCoords) {
  return (dispatch) => {
    dispatch(saveCustomerDetails(order.details))
    api.service('orders')
      .create(order)
      .then(function (result) {
        console.log('Result: ', result);
        dispatch({type: 'RECEIVE_SHOPS', payload: { shops: result, userCoords } })
      })
  }
}
export function saveCustomerDetails(customerDetails) {
  return {type: 'SAVE_CUSTOMER_DETAIL', payload: {...customerDetails}}
}
export function updateOrder(shop) {
  return (dispatch) => {
    dispatch({ type: 'UPDATE_ORDER', payload: shop })
    dispatch(showNotification())
  }
}

export function showNotification() {
  return { type: 'NOTIFICATION', payload: true }
}

export function hideNotification() {
  return { type: 'NOTIFICATION', payload: false }
}

export function confirmOrder(order_id, shop_id) {
  return (dispatch) => {
    api.service('orders')
      .patch(order_id, {
        shop_id,
        status: 'received'
      })
      .then(function (result) {
        console.log('Order submitted: ', result)
        dispatch({ type: 'UPDATE_ORDER_STATUS', payload: { status: 'In process', order_id } })
      })
  }
}

export function cancelOrder(order_id) {
  return (dispatch) => {
    dispatch({ type: 'UPDATE_ORDER_STATUS', payload: { status: 'Cancelled', order_id } })
    dispatch(hideNotification())
  }
}

export function updateOrderStatus() {
  return (dispatch) => {
    api.service('orders')
      .on('patched', (orderData) => {
        dispatch({ type: 'UPDATE_ORDER_STATUS', payload: {
          status: (orderData.order)[0].status,
          order_id: (orderData.order)[0].order_id
        } })
      })
  }
}
