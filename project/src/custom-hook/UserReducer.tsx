import { Action } from "../types/Action"
import { User } from "../types/User"
const UserReducer = (state: User, action: Action):User => {
    switch (action.type) {
        case 'CREATE':
            {
                return {
                    ...state,
                    FirstName: action.data.FirstName || state.FirstName,
                    LastName: action.data.LastName || state.LastName,
                    PassWord: action.data.PassWord || state.PassWord,
                };
            }
        case 'UPDATE':
            {
                return  {...state,...action.data}   
            }
        case 'DELETE':
            state.FirstName='';
            state.LastName='';
            state.PassWord='';
            return state;

        default:
            return state
    }
}
export default UserReducer
