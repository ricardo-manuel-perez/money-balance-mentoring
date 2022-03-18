import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { ReactComponent as LockOutlinedIcon } from '../../assets/svg/money-icon.svg';
import Typography from '@mui/material/Typography';
import Banner from '../../assets/images/login-banner.png';
import { loginWithGoogle } from '../../utils/Auth/google-authentication';
export default function Login() {

  const history = useHistory();

  const onLoginSuccess = (data) => {
    history.push('/home');
  }

  const handleLogin = (e) => {
    e.preventDefault();
    loginWithGoogle(onLoginSuccess)
  }

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url(${Banner})`,
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 2, bgcolor: 'white', border: '1px solid black' }}>
            <LockOutlinedIcon width={30} />
          </Avatar>
          <Typography component="h1" variant="h2">
            Money Balance
          </Typography>
          <Box sx={{ mt: 1 }}>
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleLogin}
            >
              Sign in with google
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}