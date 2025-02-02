import Avatar from "@mui/material/Avatar/Avatar";
import { useContext, useState } from "react";
import Update from "../userComponents/Update"
import { Button } from "@mui/material";
import { reducerLoginContext } from "../HomePage";
const stringToColor = (string: string) => {
    let hash = 0;
    let i;
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
}
const stringAvatar = (name: string) => {
    console.log(name);
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}

const logged = () => {
    const [user ,] = useContext(reducerLoginContext);
    const [IsUpdate, setIsUpdate] = useState(false);
    console.log(user);
    return (<>
        {(user.FirstName !== undefined) &&
            <>
                <Avatar {...stringAvatar(user.FirstName + ' ' + user.LastName)} />
                <h4>hello to {user.FirstName + ' ' + user.LastName}</h4>
            </>}
        <Button color="secondary" variant="contained" onClick={() => { setIsUpdate(true) }}>Update</Button>
        {IsUpdate && <Update setUpdate={setIsUpdate} />}
    </>)
}
export default logged
