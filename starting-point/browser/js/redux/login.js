import axios from 'axios';

/* -----------------    ACTIONS     ------------------ */

const SET_CURRENT_USER = 'SET_CURRENT_USER';
const UNSET_CURRENT_USER = 'UNSET_CURRENT_USER';

/* ------------   ACTION CREATORS     ------------------ */
export const currentUser = (user) => ({ type: SET_CURRENT_USER, user });
export const unsetCurrentUser = (user) => ({ type: UNSET_CURRENT_USER, user: {} });

/* ------------       REDUCERS     ------------------ */
export default function reducer (user = {}, action) {
  console.log('REDUCER LOGIN', action.user);
  switch (action.type) {

    case SET_CURRENT_USER:
      return action.user;

    case UNSET_CURRENT_USER:
      return action.user;
    default:
      return user;
    }

}

/* ------------   THUNK CREATORS     ------------------ */
export const updateCurrentUser = (user) => dispatch => {
  console.log('UPDATE CURRENT USER');
  if (user) {
    axios.post('/api/users/login', {email: user.email, password: user.password})
      .then( (res) => {
        const user = res.data;
        if (res.status === 200) {
          const action = currentUser(user);
          dispatch(action);
        }})
      .catch('LOGIN CLIENT ERROR');
  } else {
    console.log('ABOUT TO LOGOUT');
    axios.post('/api/users/logout')
      .then( () => {
        const action = unsetCurrentUser(user);
        dispatch(action);
      })
      .catch('LOGOUT CLIENT ERROR');
  }
};

