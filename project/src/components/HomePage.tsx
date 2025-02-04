import { createContext, Dispatch, useState } from "react"
import { User } from "../types/User"
import Login from "./userComponents/Login";
import Button from "@mui/material/Button/Button";
import Logged from "./userComponents/logged";
import { Box, Grid2 } from "@mui/material";
import { Action } from "../types/Action";
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
export const ReducerLoginContext = createContext<[User, Dispatch<Action>]>([{} as User, () => { }]);
const HomePage = () => {
    const [IsEnter, setIsEnter] = useState(false);
    const [IsRegister, setRegister] = useState(false);
    return (
                <Box sx={{ flexGrow: 1 }}>
                    <Grid2 container spacing={2}>
                        <Grid2 size={4} sx={{ padding: '16px' }} >
                            {!IsEnter ? (
                                <>
                                    <Button color="secondary" variant="contained" sx={{ margin: '1px' }} onClick={() => setIsEnter(true)}>Sign In</Button>
                                    <Button color="secondary" variant="contained" sx={{ margin: '1px' }} onClick={() => { setIsEnter(true); setRegister(true); }}>Sign Up</Button>
                                </>
                            ) : <Login setLogged={setIsEnter} IsRegister={IsRegister} />}
                            {IsEnter && <Logged />}
                        </Grid2>
                    </Grid2>     
                </Box>
    );
};
export default HomePage;