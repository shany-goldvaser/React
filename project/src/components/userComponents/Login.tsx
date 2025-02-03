import Box from "@mui/material/Box/Box"
import TextField from "@mui/material/TextField/TextField"
import { reducerLoginContext, style } from "../HomePage"
import { FormEvent, useContext, useRef, useState } from "react"
import Button from "@mui/material/Button/Button"
import { Modal } from "@mui/material"
import axios, { } from "axios"
const Login = ({ setLogged, IsRegister }: { setLogged: Function, IsRegister: boolean }) => {
    const passwordRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const [, userFunc] = useContext(reducerLoginContext);
    const [open, setOpen] = useState(true);
    const url = 'http://localhost:3000/api/user'
    const handleSubmit = async (e: FormEvent) => {
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
                        userFunc({
                            type: 'CREATE', data: {
                                Email: emailRef.current?.value,
                                PassWord: passwordRef.current?.value,
                                Id: r.data.userId,
                            }
                        });
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
                        userFunc({
                            type: 'CREATE', data: {
                                Email: emailRef.current?.value,
                                PassWord: passwordRef.current?.value,
                                Id: r.data.user.id,
                                FirstName: r.data.user.firstName,
                                LastName: r.data.user.lastName,
                                Address: r.data.user.address,
                                Phone: r.data.user.phone,
                            }
                        });
                    }
                });
            }
            setLogged(true)
            setOpen(false)
        }
        catch (e) {
            setLogged(false)
            if (axios.isAxiosError(e)) {
                if (e.response && e.response.status === 400) {
                    alert('User already exists try Again');
                }
                else if (e.response && e.response.status === 401) {
                    alert('Invalid credentials try Again')
                }
            } else {
                alert('try Again')
                console.log('An unexpected error occurred:', e);
            }
        }
        finally {
            emailRef.current!.value = ''
            passwordRef.current!.value = ''
        }
    }
    return (
        <Modal open={open}>
            <Box sx={style}>
                <form onSubmit={handleSubmit}>
                    <TextField
                        color="secondary" id="Email" label="Email" variant="outlined" inputRef={emailRef} required type="email" fullWidth margin="normal" />
                    <TextField
                        color="secondary" id="Password" label="Password" variant="outlined" inputRef={passwordRef} type="password" required fullWidth margin="normal" />
                    <Button type="submit" color="secondary" variant="contained" fullWidth style={{ marginTop: '16px' }}> Submit </Button>
                </form>
            </Box>
        </Modal>
    );
}
export default Login
