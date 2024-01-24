import {ADD_FAVORITE, REMOVE_FAVORITE} from '../action/utenteActions'

const initialState = {
    list: []
}


const utenteReducers = (state = initialState, action) => {
    switch (action.type) {
        case ADD_FAVORITE:
            return {
                ...state,
                list: [...state.list, action.payload]
            }
            case REMOVE_FAVORITE:
                return {
                    ...state,
                    list: state.list.filter((fav) => fav !== action.payload)
                }
                default:
                return state
    }
}

export default utenteReducers

//in questo caso unico reducer del progetto. tiene traccia di ogni cambiamento di stato legato all'aggiunta o alla rimozione di un annuncio nella lista dei preferiti da parte dell'utente