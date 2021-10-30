export default (state={isLoggedIn:false}, action)=>{
    switch(action.type){
        case "TRUE":
            return { isLoggedIn: true }
        case "FALSE":
            return { isLoggedIn: false }
        default:
            return state
    }
}