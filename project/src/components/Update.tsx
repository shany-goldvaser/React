import { useContext, useRef, useState } from "react"
import { reducerLoginContext, style, userContext } from "./HomePage";
import { Modal, Box, TextField, Button } from "@mui/material";

const update = () => {
    const user = useContext(userContext);
    const userFunc = useContext(reducerLoginContext);
    const firstNameRef = useRef<HTMLInputElement>(null)
    const lastNameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const addressRef = useRef<HTMLInputElement>(null)
    const phoneRef = useRef<HTMLInputElement>(null)
    const [open, setOpen] = useState(true)

    return (<>
        <Modal open={open}>
            <Box sx={style}>
                <form onSubmit={(e) => {
                    e.preventDefault()
                    userFunc({
                        type: 'UPDATE',
                        data: {
                            FirstName: firstNameRef.current?.value || '',
                            LastName: lastNameRef.current?.value || '',
                            Password: passwordRef.current?.value || '',
                            Email: emailRef.current?.value || '',
                            Address: addressRef.current?.value || '',
                            Permissionshone: phoneRef.current?.value || '',
                        }
                    }
                    )
                    setOpen(false)
                }}>
                    <TextField label='firstName' inputRef={firstNameRef} value={user.FirstName} required />
                    <TextField label='lastName' inputRef={lastNameRef} value={user.LastName} required />
                    <TextField label='password' inputRef={passwordRef} value={user.PassWord} />
                    <TextField label='email' inputRef={emailRef} type="email" />
                    <TextField label='address' inputRef={addressRef} />
                    <TextField label='phone' inputRef={phoneRef} type="tel" />
                    <Button type="submit" color="primary" variant="contained">submit</Button>
                </form>
            </Box>
        </Modal></>)
}
export default update