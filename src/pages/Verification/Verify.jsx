import React from 'react'
// import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import axios from "axios"
import {Links} from "../../Link"
import {useNavigate} from "react-router-dom"
const defaultTheme = createTheme();

const Verify = ({fname,lname,email,pass}) => {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };
    const [code,setCode] = React.useState("")
    const [show, setShow] = React.useState(false)
    const navigation = useNavigate()
    const Verify = async()=>{
        if(code === ""){
            return Toastify({
                text: "Enter Code",
                duration: 2000,
                newWindow: true,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "center", // `left`, `center` or `right`
                stopOnFocus: false, // Prevents dismissing of toast on hover
                style: {
                  background: "linear-gradient(to right, #00b09b, #96c93d)",
                },
              }).showToast();
        }else if(code.length < 4){
            return Toastify({
                text: "No less than 4 digits",
                duration: 2000,
                newWindow: true,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "center", // `left`, `center` or `right`
                stopOnFocus: false, // Prevents dismissing of toast on hover
                style: {
                  background: "linear-gradient(to right, #00b09b, #96c93d)",
                },
              }).showToast();
        }else if(code.length > 4){
            return Toastify({
                text: "Not more than 4 digits",
                duration: 2000,
                newWindow: true,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "center", // `left`, `center` or `right`
                stopOnFocus: false, // Prevents dismissing of toast on hover
                style: {
                  background: "linear-gradient(to right, #00b09b, #96c93d)",
                },
              }).showToast();
        }else{
            try{
                setShow(true)
                await axios.post(`${Links}/verification`,{
                    fname,lname,email,pass,code
                }).then((res)=>{
                    if(res.data.mess === "incorrect code"){
                        Toastify({
                            text: "incorrect code",
                            duration: 2000,
                            newWindow: true,
                            close: true,
                            gravity: "top", // `top` or `bottom`
                            position: "center", // `left`, `center` or `right`
                            stopOnFocus: false, // Prevents dismissing of toast on hover
                            style: {
                              background: "linear-gradient(to right, #00b09b, #96c93d)",
                            },
                          }).showToast();
                          setShow(false)
                    }else if(res.data.mess === "account created"){
                        Toastify({
                            text: "account created",
                            duration: 2000,
                            newWindow: true,
                            close: true,
                            gravity: "top", // `top` or `bottom`
                            position: "center", // `left`, `center` or `right`
                            stopOnFocus: false, // Prevents dismissing of toast on hover
                            style: {
                              background: "linear-gradient(to right, #00b09b, #96c93d)",
                            },
                          }).showToast();
                          setShow(false)
                          navigation('/')
                    }
                })
            }catch{
                Toastify({
                    text: "Server error",
                    duration: 2000,
                    newWindow: true,
                    close: true,
                    gravity: "top", // `top` or `bottom`
                    position: "center", // `left`, `center` or `right`
                    stopOnFocus: false, // Prevents dismissing of toast on hover
                    style: {
                      background: "linear-gradient(to right, #00b09b, #96c93d)",
                    },
                  }).showToast();
                  setShow(false)
            }
        }
        
    }


    return (
        <>
            <ThemeProvider theme={defaultTheme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <VerifiedUserIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Verify Your Email
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                value={code}
                                onChange={(e)=>setCode(e.target.value)}
                                fullWidth
                                id="Code"
                                label="Code"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />


                            <Button
                                type="submit"
                                fullWidth
                                onClick={()=>Verify()}
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Verify
                            </Button>

                        </Box>
                    </Box>

                </Container>
            </ThemeProvider>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={show}

            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    )
}

export default Verify