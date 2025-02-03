import { FormEvent, useContext, useRef, useState } from "react"
import { reducerLoginContext, style } from "../HomePage";
import { Modal, Box, TextField, Button } from "@mui/material";
import axios from "axios";

const update = ({ setUpdate }: { setUpdate: Function }) => {
    const [user, userFunc] = useContext(reducerLoginContext);
    const firstNameRef = useRef<HTMLInputElement>(null)
    const lastNameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const addressRef = useRef<HTMLInputElement>(null)
    const phoneRef = useRef<HTMLInputElement>(null)
    const [open, setOpen] = useState(true)
    const url = 'http://localhost:3000/api/user/'
    const handleSubmit = async (e: FormEvent) => {

        e.preventDefault()
        try {
            await axios.put(
                url,
                {
                    firstName: firstNameRef.current?.value,
                    lastName: lastNameRef.current?.value,
                    email: emailRef.current?.value ? emailRef.current?.value : user.Email,
                    address: addressRef.current?.value ? addressRef.current?.value : user.Address,
                    phone: phoneRef.current?.value ? phoneRef.current?.value : user.Phone,
                },
                { headers: { 'user-id': user.Id + '' } } //only in update
            )

            userFunc({
                type: 'UPDATE',
                data: {
                    Id: user.Id,
                    FirstName: firstNameRef.current?.value,
                    LastName: lastNameRef.current?.value,
                    PassWord: passwordRef.current?.value ? passwordRef.current?.value : user.PassWord,
                    Email: emailRef.current?.value ? emailRef.current?.value : user.Email,
                    Address: addressRef.current?.value ? addressRef.current?.value : user.Address,
                    Phone: phoneRef.current?.value ? phoneRef.current?.value : user.Phone,
                }
            }
            )


            setOpen(false)
            setUpdate(false)
        }
        catch (e) {
            alert("user not found!")
            console.log(e);

        }
        finally {

            firstNameRef.current!.value = '',
                lastNameRef.current!.value = '',
                emailRef.current!.value = '',
                addressRef.current!.value = '',
                phoneRef.current!.value = '';
        }
    }
    return (<>
        <Modal open={open}>
            <Box sx={style}>
                <form onSubmit={handleSubmit}>
                    <TextField color="secondary" label='First Name' inputRef={firstNameRef} required value={user.FirstName} variant="outlined" fullWidth margin="normal" />
                    <TextField color="secondary" label='Last Name' inputRef={lastNameRef} required value={user.LastName} variant="outlined" fullWidth margin="normal" />
                    <TextField color="secondary" label='Email' inputRef={emailRef} type="email" value={user.Email} variant="outlined" fullWidth margin="normal" />
                    <TextField color="secondary" label='Address' inputRef={addressRef} value={user.Address} variant="outlined" fullWidth margin="normal" />
                    <TextField color="secondary" label='Phone' inputRef={phoneRef} type="tel" value={user.Phone} variant="outlined" fullWidth margin="normal" />
                    <Button color="secondary" type="submit" variant="contained" fullWidth style={{ marginTop: '16px' }}>Update</Button>
                </form>
            </Box>
        </Modal></>)
}
export default update