import { createContext, useReducer, useState } from "react"
import { User } from "../types/User"
import UserReducer from "../custom-hook/UserReducer";
import Login from "./Login";
import Button from "@mui/material/Button/Button";
import Logged from "./logged";
import { Box, Grid2 } from "@mui/material";
import { RouterProvider } from "react-router";
import { router } from "../router";
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
const us: User = {
    Id: 0,
    FirstName: '',
    LastName: '',
    Email: '',
    PassWord: '',
    Phone: '',
    Adress: ''
}
export const UserContext = createContext<{
    user: User;
    setUser: React.Dispatch<React.SetStateAction<User>>;
}>
    ({
        user: us,
        setUser: () => { }
    });
export const reducerLoginContext = createContext<Function>(() => { });
const HomePage = () => {
    const [IsEnter, setIsEnter] = useState(false);
    const [IsLoggedOrRegistered, setIsLoggedRegistered] = useState(false);
    const [IsRegister, setRegister] = useState(false);
    const [, userDispatch] = useReducer(UserReducer, {} as User)
    const [user, setUser] = useState<User>(us);
    return (<>
        <Box sx={{ flexGrow: 1 }}>
            <Grid2 container spacing={2}>
                <Grid2 size={4} sx={{ padding: '16px' }} >
                    <UserContext.Provider value={{ user, setUser }}>
                        <reducerLoginContext.Provider value={userDispatch}>
                            {!IsEnter ?
                                (
                                    <><Button color="secondary" variant="contained" sx={{ margin: '1px' }} onClick={() => { setIsEnter(true) }}>Login</Button>
                                        <Button color="secondary" variant="contained" sx={{ margin: '1px' }} onClick={() => { setIsEnter(true), setRegister(true) }}>Register</Button></>
                                )
                                : <Login setLogged={setIsLoggedRegistered} IsRegister={IsRegister} />}

                            {IsLoggedOrRegistered && <Logged />}
                        </reducerLoginContext.Provider>
                    </UserContext.Provider>

                </Grid2>

                    <RouterProvider router={router} />

            </Grid2>
        </Box>




    </>)
}
export default HomePage