const redux = require('redux')
const createStore = redux.createStore
const middleWare = redux.applyMiddleware
const thunk = require('redux-thunk').default
const axios = require('axios')


const initialState = {
    loading:false,
    users: [],
    error: ''
}

const FETCH_USERS_REQUEST ='FETCH_USERS_REQUEST'
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS'
const FETCH_USERS_FAIL = 'FETCH_USERS_FAIL'

const userRequest = ()=>{
    return{
        type: FETCH_USERS_REQUEST
    }
}
const userSuccess = users=>{
    return {
type:FETCH_USERS_SUCCESS,
payload: users
    }
}
const userFail = error=>{
    return{
        type:FETCH_USERS_FAIL,
        payload: error
    }
}

const reducer=(state= initialState, action )=>{
switch (action.type) {
    case FETCH_USERS_REQUEST:
    return{
        ...state,
        loading : true
    }
    case FETCH_USERS_SUCCESS:
    return{
        ...state,
        loading : false,
         users: action.payload,
         error: ''
    }
    case FETCH_USERS_FAIL:
        return{
            ...state,
            loading : false,
             users: [],
             error: action.payload
        }
    default: return state
}
}


 const fetchUsers= ()=> {
//      return (dispatch)=>{
//          dispatch(userRequest())
//  axios.get('https://jsonplaceholder.typicode.com/users').then(response=>{
//      const users = response.data.map(user=> user.name)
//       dispatch(userSuccess(users))
//  }).catch(
//      error=>{

//  dispatch(userFail(error.message))
//      }
//  )

     return async (dispatch) => {

         dispatch(userRequest())
         const axo = await axios.get('https://jsonplaceholder.typicode.com/users')
         try{
    
         if (axo){
            
             const users = axo.data.map(e=>e.name)
             dispatch(userSuccess(users))
         }

          }
          catch(error){
              dispatch(userFail(error.message))
          }
     }
 }
const store = createStore(reducer, middleWare(thunk))
store.subscribe(()=>{console.log(store.getState())})
store.dispatch(fetchUsers())
