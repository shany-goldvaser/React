import Avatar from "@mui/material/Avatar/Avatar";
import { useContext, useState } from "react";
import { userContext } from "./HomePage";
import Update from "./Update";
import { Button } from "@mui/material";
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
    const user = useContext(userContext);
    const [IsUpdate, setIsUpdate] = useState(false);
    return (<>
        <Avatar {...stringAvatar(user.FirstName + ' ' + user.LastName)} />
        <h3>hello to {user.FirstName + ' ' + user.LastName}</h3>
        <Button onClick={() => { setIsUpdate(true) }}>Update</Button>
        {IsUpdate && <Update/>}
    </>)
}
export default logged
