import { Action } from "../types/Action"
import { User } from "../types/User"
const UserReducer = (state: User, action: Action): User => {
    switch (action.type) {
        case 'CREATE':
            {
                return {
                    ...state,
                    Email: action.data.Email,
                    PassWord: action.data.PassWord,
                };
            }
        case 'UPDATE':
            {
                return {...action.data }
            }
        case 'DELETE':
            state.FirstName = '';
            state.LastName = '';
            state.PassWord = '';
            return state;

        default:
            return state
    }
}
export default UserReducer
