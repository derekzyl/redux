const redux = require("redux");
const reduxLogger = require('redux-logger')

const createStore = redux.createStore;
const combined = redux.combineReducers
const logger = reduxLogger.createLogger()
const middleWare = redux.applyMiddleware 

const BUY_CAKE = "BUY_CAKE"; 
const BUY_ICE = 'BUY_ICE'

// action
const buyCake=()=> {
  return {
    type: BUY_CAKE,
    info: "first action",
  };
};
const buyIce = ()=>{
    return {
        type: BUY_ICE,
        info: 'ice cream'
    }
}
// reducer
const cakeInitialState = {
  numberOfCake: 10,

};

const iceInitialState = {

    numOfIce:10
  };
  

const cakeReducer = (state = cakeInitialState, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return {
        ...state,
        numberOfCake: state.numberOfCake - 1,
      };
    
    default:
      return state;
  }
};

const iceReducer = (state = iceInitialState, action) => {
    switch (action.type) {
        case BUY_ICE:
        return {
          ...state,
          numOfIce: state.numOfIce - 1,
        };
      default:
        return state;
    }
  };
  const root= combined({
      cake: cakeReducer,
      ice: iceReducer
  })
const store = createStore(root, middleWare(logger));
console.log("initial state", store.getState());
const unsubscribe = store.subscribe(() =>
  console.log("updated state", store.getState())
);
store.dispatch(buyCake());
store.dispatch(buyIce());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());

unsubscribe();
