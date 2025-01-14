import Box from "@mui/material/Box/Box"
import TextField from "@mui/material/TextField/TextField"
import { reducerLoginContext, style, UserContext } from "./HomePage"
import { FormEvent, useContext, useRef, useState } from "react"
import Button from "@mui/material/Button/Button"
import { Modal } from "@mui/material"
import axios, {  } from "axios"
const Login = ({ setLogged, IsRegister }: { setLogged: Function, IsRegister: boolean }) => {


    const passwordRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const userFunc = useContext(reducerLoginContext);
    const { user, setUser } = useContext(UserContext);
    const [open, setOpen] = useState(true);
    const url = 'http://localhost:3000/api/user'
    const handleSubmit = async (e: FormEvent) => {
        console.log('User Context:', { user, setUser });
        e.preventDefault();

        try {
            let res;
            if (IsRegister) {
                res = await axios.post(
                    url + '/register',
                    {

                        email: emailRef.current?.value,
                        password: passwordRef.current?.value
                    },
                ).then(r => {
                    if (r.data) {
                        setUser({
                            Id: r.data.userId,
                            Email: emailRef.current?.value,
                            PassWord: passwordRef.current?.value
                        })
                    }

                })
            }
            else {
                res = await axios.post(
                    url + '/login',
                    {
                        email: emailRef.current?.value,
                        password: passwordRef.current?.value
                    },
                ).then(r => {
                    if (r.data.user) {
                        setUser({
                            Id: r.data.user.id,
                            FirstName: r.data.user.firstName,
                            LastName: r.data.user.lastName, 
                            Adress: r.data.user.address, 
                            Phone: r.data.user.phone, 
                            Email: emailRef.current?.value,
                            PassWord: passwordRef.current?.value
                        });
                    }
                });
            }
            setOpen(false)
            setLogged(true)
        }
        catch (e) {
            if (axios.isAxiosError(e)) {
                console.log(e);
                if (e.response && e.response.status === 422) {
                    alert('user is alerady logged in');
                }
                else if (e.response && e.response.status === 401) {
                    alert('user is not logged in')
                }
            } else {
                console.error('An unexpected error occurred:', e);
            }
        }
        finally {
            emailRef.current!.value = ''
            passwordRef.current!.value = ''

            userFunc({
                type: 'CREATE', data: {
                    Email: emailRef.current?.value,
                    Password: passwordRef.current?.value
                }
            });


        }

    }
    return (

        <Modal open={open}>
            <Box sx={style}>
                <form onSubmit={handleSubmit}>
                    <TextField id="Email" label="Email" variant="standard" inputRef={emailRef} required type="email" />
                    <TextField id="Password" label="Password" variant="standard" inputRef={passwordRef} type="password" required />
                    <Button type="submit" color="secondary" variant="contained">Submit</Button>
                </form>
            </Box>
        </Modal>
    );
}
export default Login
