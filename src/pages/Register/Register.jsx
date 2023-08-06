import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import axios from "axios"
import { Links } from '../../Link';
import { useNavigate } from 'react-router-dom';
// import { Context } from '../../Context/Context';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignIn() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };
  const [email,setEmail] = React.useState("")
  const[pass,setPass] = React.useState("")
  const [show, setShow] = React.useState(false)
  const navigation = useNavigate()
  // const {personalData,setPersonalData} = React.useContext(Context)


  const SignIn = async()=>{
    if(email===""){
     return Toastify({
        text: "Enter Email I'd",
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
    }else if(pass===""){
      return Toastify({
        text: "Enter Your Password",
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
        await axios.post(`${Links}/login`,{email,pass})
        .then((res)=>{
          if(res.data.mess === "Create Account"){
            setShow(false)
            Toastify({
              text: "Account not Found",
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
          }else if(res.data.mess === "Wronge Password"){
            setShow(false)
            Toastify({
              text: "Incorrect Password",
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
          }else if(res.data.mess === "Success"){
            setShow(false)
            
            localStorage.setItem("code",res.data.token)
            navigation("/home")
          }
        })
      }catch{
        return Toastify({
          text: "Server Error",
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
      }
    }
  }


  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            {/* <LockOutlinedIcon /> */}
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              value={pass}
              onChange={(e)=>setPass(e.target.value)}
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              onClick={()=>SignIn()}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              {/* <Grid item xs>
                <Link href="/auth" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
      <Backdrop
                      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                      open={show}

                    >
                      <CircularProgress color="inherit" />
                    </Backdrop>
    </ThemeProvider>
    
  );
}