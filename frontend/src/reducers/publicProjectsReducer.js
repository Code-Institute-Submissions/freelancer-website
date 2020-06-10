import {
    PUBLIC_PROJECT_LOADING,
    PUBLIC_PROJECT_LOADED,
    PUBLIC_PROJECT_ERROR
} from '../actions/types';


export default (state = [], action) => {



    switch (action.type) {
        case PUBLIC_PROJECT_LOADING:
            return state

        case PUBLIC_PROJECT_LOADED:


            return [...action.payload]

        case PUBLIC_PROJECT_ERROR:
            return init
        default:
            return state
    }
}





