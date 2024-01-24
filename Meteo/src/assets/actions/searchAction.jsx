export const SET_CITY = "SET_CITY";

export const setCity = (newCity) => {
  return {
    type: SET_CITY,
    payload: newCity,
  };
};

//definizione delle action necessarie, in questo caso solo una cioè la città digitata dall'utente
