import {
    ADD_CUSTOMER_SUCCESS,
    QUERY_CUSTOMER_SUCCESS,
    DELETE_CUSTOMER_SUCCESS,
    EDIT_CUSTOMER_SUCCESS
} from '../constants/customers/ActionTypes'

const initialState = []

export default function todos(state = initialState, action) {
    switch (action.type) {
        case ADD_CUSTOMER_SUCCESS:
            return [
                action.todo,
                ...state
            ]

        case DELETE_CUSTOMER_SUCCESS:
            return state.filter(todo =>
                todo.id !== action.id
            )

        case EDIT_CUSTOMER_SUCCESS:
            return state.map(todo =>
                todo.id === action.todo.id ?
                    action.todo :
                    todo
            )

        default:
            return state
    }
}
