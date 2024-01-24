export const ADD_FAVORITE = 'ADD_FAVORITE'
export const REMOVE_FAVORITE = 'REMOVE_FAVORITE'

export const addFavorite = (title) => {
    return {
        type: ADD_FAVORITE,
        payload: title
    }
}

export const removeFavorite = (title) => {
    return {
        type: REMOVE_FAVORITE,
        payload: title
    }
}



// definizione delle actions necessarie. in questo caso aggiunta e rimozione di annunci dalla lista dei preferiti

//vorihjorihroroh

