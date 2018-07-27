// actions - whenever we want to change the state of app, we dispatch an action
const addTodo = {
    type: 'ADD_TODO',
    todo: {
        id: 0,
        name: 'Learn Redux',
        complete: false,
    }
}

const removeTodo = {
    type: 'REMOVE_TODO',
    id: 0,
}

const toggleTodo = {
    type: 'TOGGGLE_TODO',  
    id: 0,
}

const addGoal = {
    type: 'ADD_GOAL',
    goal: {
        id: 0,
        name: 'Run a Marathon', 
    }
}

const removeGoal = {
    type: 'REMOVE_GOAL',
    id: 0,
}

// reducers
    // has to be pure functions 
    /* Characteristics of a Pure Function 
        1. They always return the same result if the same arguments are passed in.
        2. They depend only on the arguments passed into them. 
        3. Never produce any side effects. 
    */
function todos (state = [], action) {
    if (action.type === 'ADD_TODO') {
        return state.concat([action.todo])
    } else if (action.type === 'REMOVE_TODO') {
        return state.filter((todo) => todo.id !== action.id)
    } else if (action.type === 'TOGGLE_TODO') {
        return state.map((todo) => todo.id !== action.id ? todo : 
        {...todo, complete: [!todo.complete]})
    } else {
        return state
    }
}

// store
function createStore (reducer) {
    // The store should have four parts 
    // 1. The state 
    // 2. Get the state. 
    // 3. Listen to changes on the state. 
    // 4. Update the state

    let state
    let listeners = []

    const getState = () => state 

    const subscribe = (listener) => {
        listeners.push(listener)
        return () => {
            listeners = listeners.filter((l) => l !== listener)
        }
    }

    const dispatch = (action) => {
        // call todos (reducer)
        state = reducer(state, action)
        // loop over listeners and invoke them 
        listeners.forEach((listener) => listener())
    }

    return { 
        getState,
        subscribe,
        dispatch,
    }
}