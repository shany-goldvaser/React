import Avatar from "@mui/material/Avatar/Avatar";
import { useContext, useState } from "react";
import Update from "../userComponents/Update"
import { Button, Typography } from "@mui/material";
import { ReducerLoginContext } from "../HomePage";
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
        sx: {  bgcolor: stringToColor(name),},
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}
const logged = () => {
    const [user,] = useContext(ReducerLoginContext);
    const [IsUpdate, setIsUpdate] = useState(false);

    return (
        <>
            {user.FirstName && (
                <>
                    <Avatar {...stringAvatar(`${user.FirstName} ${user.LastName}`)} />
                    <Typography variant="h6" component="h4" style={{ margin: '10px 0' }}>
                        Hello, {`${user.FirstName} ${user.LastName}`}
                    </Typography> </>
            )}
            <Button color="secondary" variant="contained" onClick={() => setIsUpdate(true)}>
                Update
            </Button>
            {IsUpdate && <Update setUpdate={setIsUpdate} />}
        </>
    );
}
export default logged
