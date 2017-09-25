import * as types from '../constants/customers/ActionTypes'

export const addCustomer= text => ({ type: types.ADD_CUSTOMER, text })
export const deleteCustomer = id => ({ type: types.DELETE_CUSTOMER, id })
export const editCustomer = (id, text) => ({ type: types.EDIT_CUSTOMER, id, text })