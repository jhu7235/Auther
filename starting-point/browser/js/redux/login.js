import axios from 'axios';

/* -----------------    ACTIONS     ------------------ */

const SET_CURRENT_USER = 'SET_CURRENT_USER';

/* ------------   ACTION CREATORS     ------------------ */

const currentUser = (user) => ({ type: SET_CURRENT_USER, user });

/* ------------       REDUCERS     ------------------ */

export default function reducer (user = {}, action) {
  console.log('REDUCER LOGIN');
  switch (action.type) {

    case SET_CURRENT_USER:

      return action.user;
    default:
      return user;
    }

}

/* ------------   THUNK CREATORS     ------------------ */

export const updateCurrentUser = (user) => dispatch => {
  axios.post('/api/users/login', {email: user.email, password: user.password})
    .then( (res) => {
      const user = res.data;
      if (res.status === 200) {
        const action = currentUser(user);
        dispatch(action);
      }
    })
    .catch('LOGIN CLIENT ERROR');
};

