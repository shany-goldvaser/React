import { FormEvent, useContext, useEffect, useRef, useState } from "react"
import { reducerLoginContext, style, UserContext } from "./HomePage";
import { Modal, Box, TextField, Button } from "@mui/material";
import axios from "axios";

const update = ({ setUpdate }: { setUpdate: Function }) => {
    const userFunc = useContext(reducerLoginContext);
    const firstNameRef = useRef<HTMLInputElement>(null)
    const lastNameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const addressRef = useRef<HTMLInputElement>(null)
    const phoneRef = useRef<HTMLInputElement>(null)
    const [open, setOpen] = useState(true)
    const { user, setUser } = useContext(UserContext);
    console.log('userId:!!!!!!!!!!!!!!!', user.Id);

    const url = 'http://localhost:3000/api/user/'
    const handleSubmit = async (e: FormEvent) => {

        e.preventDefault()
        try {
            const res = await axios.put(
                url,
                {
                    firstName: firstNameRef.current?.value,
                    lastName: lastNameRef.current?.value,
                    email: emailRef.current?.value ? emailRef.current?.value : user.Email,
                    address: addressRef.current?.value ? addressRef.current?.value : user.Adress,
                    phone: phoneRef.current?.value ? phoneRef.current?.value : user.Phone,
                },
                { headers: { 'user-id': user.Id + '' } } //only in update
            )
            setUser(prevUser => ({

                FirstName: firstNameRef.current?.value,
                LastName: lastNameRef.current?.value,
                Email: emailRef.current?.value ? emailRef.current?.value : prevUser.Email,
                Address: addressRef.current?.value ? addressRef.current?.value : prevUser.Adress,
                Phone: phoneRef.current?.value ? phoneRef.current?.value : prevUser.Phone,
                Id: prevUser.Id,
                PassWord: prevUser.PassWord

            }));


            userFunc({
                type: 'UPDATE',
                data: {
                    Id: user.Id,
                    FirstName: firstNameRef.current?.value,
                    LastName: lastNameRef.current?.value,
                    Password: passwordRef.current?.value ? passwordRef.current?.value : user.PassWord,
                    Email: emailRef.current?.value ? emailRef.current?.value : user.Email,
                    Address: addressRef.current?.value ? addressRef.current?.value : user.Adress,
                    Phone: phoneRef.current?.value ? phoneRef.current?.value : user.Phone,
                }
            }
            )


            setOpen(false)
            setUpdate(false)
        }
        catch (e) {
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
    useEffect(() => {
        console.log('after setuser', user);
    }, [user]);

    return (<>
        <Modal open={open}>
            <Box sx={style}>
                <form onSubmit={handleSubmit}>
                    <TextField label='firstName' inputRef={firstNameRef} required value={user.FirstName}/>
                    <TextField label='lastName' inputRef={lastNameRef} required value={user.LastName}/>
                    {/* <TextField label='password' inputRef={passwordRef} type='password' /> */}
                    <TextField label='email' inputRef={emailRef} type="email" value={user.Email}/>
                    <TextField label='address' inputRef={addressRef} value={user.Adress} />
                    <TextField label='phone' inputRef={phoneRef} type="tel" value={user.Phone}/>
                    <Button type="submit" color="secondary" variant="contained">update</Button>
                </form>
            </Box>
        </Modal></>)
}
export default update