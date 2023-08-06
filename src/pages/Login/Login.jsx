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
// import { useNavigate } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"
import axios from "axios"
import { Links } from "../../Link"
import Verify from '../Verification/Verify';
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


const defaultTheme = createTheme();

export default function SignUp() {
  // const navigation = useNavigate()
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  const [lname, setLname] = React.useState("")
  const [fname, setFname] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [pass, setPass] = React.useState("")
  const [show, setShow] = React.useState(false)
  const [showVerify, setVerify] = React.useState(false)

  const Register = async () => {
    if (fname === "") {
      return Toastify({
        text: "Enter First Name",
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
    } else if (lname === "") {
      return Toastify({
        text: "Enter Last Name",
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
    } else if (pass === "") {
      return Toastify({
        text: "Enter Password",
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
    } else if (email === "") {
      return Toastify({
        text: "Enter Email",
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
    } else if (fname.length < 2) {
      return Toastify({
        text: "Enter Your Name Properly",
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
    } else if (lname.length < 2) {
      return Toastify({
        text: "Enter Your Lastname Properly",
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
    } else if (pass.length < 6) {
      return Toastify({
        text: "Password length must be of 6 words",
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
    } else {

      try {
        setShow(true)
        await axios.post(`${Links}/register`, {
          email, fname, lname, pass
        }).then((res) => {
          if (res.data.mess === "sent") {
            setShow(false)
            setVerify(true)
          } else if (res.data.mess === "Email is in Used") {
            Toastify({
              text: "Email already exist",
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
        })
      } catch {
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
      {
        !showVerify ?
          <>
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
                    Sign up
                  </Typography>
                  <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          autoComplete="given-name"
                          name="firstName"
                          value={fname}
                          onChange={(e) => setFname(e.target.value)}
                          required
                          fullWidth
                          id="firstName"
                          label="First Name"
                          autoFocus
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          fullWidth
                          id="lastName"
                          value={lname}
                          onChange={(e) => setLname(e.target.value)}
                          label="Last Name"
                          name="lastName"
                          autoComplete="family-name"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          label="Email Address"
                          name="email"
                          autoComplete="email"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          name="password"
                          value={pass}
                          onChange={(e) => setPass(e.target.value)}
                          label="Password"
                          type="password"
                          id="password"
                          autoComplete="new-password"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormControlLabel
                          control={<Checkbox value="allowExtraEmails" color="primary" />}
                          label="I want to receive inspiration, marketing promotions and updates via email."
                        />
                      </Grid>
                    </Grid>

                    <Backdrop
                      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                      open={show}

                    >
                      <CircularProgress color="inherit" />
                    </Backdrop>

                    <Button
                      type="submit"
                      fullWidth
                      onClick={() => Register()}
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Sign Up
                    </Button>

                    <Grid container justifyContent="flex-end">
                      <Grid item>
                        <Link href="/" variant="body2">
                          Already have an account? Sign in
                        </Link>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
              </Container>
            </ThemeProvider>
          </> : <>
            <Verify lname={lname} fname={fname} email={email} pass={pass} />
          </>
      }</>
  );
}