import { useContext } from "react";
import { UserContext } from "./HomePage";
import useTypingEffect from "../custom-hook/useTypingEffect";
import { Grid2 } from "@mui/material";

export default () => {
    const { user, setUser } = useContext(UserContext);
    console.log(user);
    
    return (<>
       <Grid2 size={6}>

        {user.FirstName && (useTypingEffect(`hello to ${user.FirstName} we are happy to meet you!`, 1000, 5)) 
        // <p>you dont sign in or sign up</p>
        }        
        </Grid2> 
    </>)
}