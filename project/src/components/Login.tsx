import Box from "@mui/material/Box/Box"
import TextField from "@mui/material/TextField/TextField"
import { reducerLoginContext, style } from "./HomePage"
import { useContext, useRef, useState } from "react"
import Button from "@mui/material/Button/Button"
import { Modal } from "@mui/material"

const login = ({setLogged}:{setLogged:Function}) => {
    const firstNameRef = useRef<HTMLInputElement>(null)
    const lastNameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const userFunc = useContext(reducerLoginContext);
    const [open, setOpen] = useState(true);
    return (

        <Modal open={open}>
            <Box sx={style}>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    userFunc({
                        type: 'CREATE', data: {
                            FirstName: firstNameRef.current?.value?firstNameRef.current?.value:'',
                            LastName: lastNameRef.current?.value?lastNameRef.current?.value:'',
                            Password: passwordRef.current?.value?passwordRef.current?.value:''
                        }
                    })
                    setOpen(false)
                    setLogged(true)
                }}>
                    <TextField id="FirstName" label="FirstName" variant="standard" inputRef={firstNameRef} required/>
                    <TextField id="LastName" label="LastName" variant="standard" inputRef={lastNameRef} required/>
                    <TextField id="Password" label="Password" variant="standard" inputRef={passwordRef} type="password" required/>
                    <Button type="submit" color="primary" variant="contained">submit</Button>
                </form>
            </Box>
        </Modal>
    );
}
export default login
