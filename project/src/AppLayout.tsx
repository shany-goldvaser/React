import { Outlet } from "react-router"
import NavBar from "./components/NavBar"
import HomePage, { ReducerLoginContext } from "./components/HomePage"
import { CssBaseline } from "@mui/material"
import { Provider } from "react-redux"
import Store from "./components/recipeComponents/Store"
import { useReducer } from "react"
import UserReducer from "./custom-hook/UserReducer"
import { User } from "./types/User"
const AppLayout = () => {
    const [user, userDispatch] = useReducer(UserReducer, {} as User);
    return (
        <>
            <ReducerLoginContext value={[user, userDispatch]}>
                <Provider store={Store}>
                    <CssBaseline />
                    <HomePage />
                    <NavBar />
                    <Outlet />
                </Provider>
            </ReducerLoginContext>
        </>
    )
}
export default AppLayout