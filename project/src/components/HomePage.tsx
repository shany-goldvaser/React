import { createContext, useReducer, useState } from "react"
import { User } from "../types/User"
import UserReducer from "../custom-hook/UserReducer";
import Login from "./Login";
import Button from "@mui/material/Button/Button";
import Logged from "./logged";
import { Box, Grid2 } from "@mui/material";
const user: User = {}
export const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};
export const userContext = createContext<User>(user);
export const reducerLoginContext = createContext<Function>(() => { });
const HomePage = () => {
    const [IsLogin, setIsLogin] = useState(false);
    const [IsLogged, setIsLogged] = useState(false);
    const [user, userDispatch] = useReducer(UserReducer, {} as User)
    return (<>

        <Box sx={{ flexGrow: 1 }}>
            <Grid2 container spacing={2}>
            <Grid2 size={4} sx={{ padding: '16px' }} >
                    <userContext.Provider value={user}>
                        <reducerLoginContext.Provider value={userDispatch}>
                            {!IsLogin ?
                                (<><Button color="primary" onClick={() => { setIsLogin(true) }}>Login</Button></>)
                                : <Login setLogged={setIsLogged} />}
                            {IsLogged && <Logged />}
                        </reducerLoginContext.Provider>
                    </userContext.Provider>

                </Grid2>
                <Grid2 size={8} sx={{textAlign:"center"}}><h1>HomePage</h1></Grid2>
            </Grid2>
        </Box>




    </>)
}
export default HomePage