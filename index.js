//import redux from 'redux' -- in reactjs
const redux = require('redux')
const createStore = redux.legacy_createStore
const combineReducers = redux.combineReducers
// middleware are used to extend functionality of redux.
const applyMiddleware = redux.applyMiddleware

const reduxLogger = require('redux-logger')
const logger = reduxLogger.createLogger()
//console.log("From Index.js")
const BUY_CAKE ="BUY_CAKE" // it indicates type of action
const BUY_ICECREAM ="BUY_ICECREAM" 

function buyCake(){
    return {
        type: BUY_CAKE,
        info: 'First redux option'
    }
}
function buyIceCream(){
    return {
        type: BUY_ICECREAM,
        info: 'First redux option'
    }
}

//(previousState, action) => newState

// const initialState = {
//     numberOfCakes : 10,
//     numberOfIceCreams :50
// }
const numberOfCakesState = {
    numberOfCakes : 10
}
const numberOfIceCreamsState = {
    numberOfIceCreams : 50
}

// const reducer = (state = initialState, action) => {
//     switch(action.type) {
//        case  BUY_CAKE : return {
//         ...state,
//          numberOfCakes : state.numberOfCakes-1
//        }
//        case  BUY_ICECREAM : return {
//         ...state,
//          numberOfIceCreams : state.numberOfIceCreams-1
//        }

//        default : return state
//     }


const CakeReducer = (state = numberOfCakesState, action) => {
    switch(action.type) {
       case  BUY_CAKE : return {
        ...state,
         numberOfCakes : state.numberOfCakes-1
       }
       
       default : return state
    }
}
const IceCreamReducer = (state = numberOfIceCreamsState, action) => {
    switch(action.type) {
       case  BUY_ICECREAM : return {
        ...state,
         numberOfIceCreams : state.numberOfIceCreams-1
       }

       default : return state
    }
}
const rootReducer = combineReducers({
    cake : CakeReducer,
    iceCream : IceCreamReducer
}) // we are combining two reducers in one reducer becoz the create store method accepts only one parameter as reducer


/*
createStore() - takes reducer as a paramter
store.subscribe() always returns a unsubscribe method
store.dispath() takes action as a parameter
const reducer = (state = initialState, action) => {}
*/

const store =  createStore(rootReducer, applyMiddleware(logger))
    console.log('initialState',store.getState())


   const unsubscribe =  store.subscribe(() => {})
    store.dispatch(buyCake())
    store.dispatch(buyCake())
    store.dispatch(buyCake())
    store.dispatch(buyIceCream())
    store.dispatch(buyIceCream())
unsubscribe();
/*
store: - that holds the state of your application
action: that describes the changes in the state of the application
reducer: which actually carries out the state transition depending on the action

3 principles of redux:

1)the state of your whole application is stored in an object tree within a single store.
2)the only way to change the state is to emit an action, an object describing what happened.
3)to specify how the state tree is transformed by actions,you write pure reducers.
*/
