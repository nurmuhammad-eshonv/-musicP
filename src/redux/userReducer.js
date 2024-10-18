const initialState = {
    users: [],
  };
  
  export function userReducer(state = initialState, action) {
    switch (action.type) {
      case "ADD":
        return { ...state, users: [...state.users, action.payload] };
  
      case "DELETE":
        return {
          ...state,
          users: state.users.filter((_, index) => index !== action.payload)
        };
    case "UPDATE":
        return {
        };
      case "SEARCH":

  
      default:
        return state;
    }
  }