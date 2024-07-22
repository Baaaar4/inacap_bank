import { useState, useContext, useEffect} from 'react';
import { AuthContext } from "../authProdiver.jsx"
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { Alert, Button, TextField, Typography, Box, Link, CircularProgress, Snackbar} from '@mui/material';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loginUser, loading, user, error } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [navigate, user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(email, password)
      .then((result) => {
        console.log(result);
        navigate('/');
      })
      .catch((error) => console.log(error.message));
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <Box
      p={10}
      display="flex"
      justifyContent="center"
      alignItems="start"
      flexDirection="column"
    >
      {
        loading ?
            ( 
            <Box sx={{ display: 'flex' }}>
              <Typography
                variant="h5"
                noWrap
                sx={{
                  mr: 2,
                  display: { xs: 'flex'},
                  flexGrow: 1,
                  fontFamily: 'monospace',
                  color: '#1976d2',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  textDecoration: 'none',
                }}
              >
                Cargando
              </Typography>
              <CircularProgress />
            </Box>
            ) :
        <form onSubmit={handleSubmit}>
          <Typography
            variant="h5"
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'flex'},
              flexGrow: 1,
              fontFamily: 'monospace',
              color: '#1976d2',
              fontWeight: 700,
              letterSpacing: '.3rem',
              textDecoration: 'none',
            }}
          >
            INACAP BANK
          </Typography>
          <Typography variant='caption'>Ingresa tus datos para iniciar sesión</Typography>
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={handleEmailChange}
          />
          <TextField
            label="Contraseña"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={handlePasswordChange}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            disabled={!email || !password}
            style={{ marginTop: '20px', width: "200px", minWidth: "200px" }}
          >
            Entrar
          </Button>
          <Box mt={2}>
            <Typography variant="body2">
              ¿No tienes una cuenta?{" "}
              <Link component={RouterLink} to="/signup">
                Crear una cuenta aquí
              </Link>
            </Typography>
          </Box>
        </form>
      }
      {error && (
        <Snackbar
        open={true}
        autoHideDuration={5000}
        message="Note archived"
      >
        <Alert
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          <Typography>
            Ha ocurrido un error al momento de iniciar sesión
          </Typography>
          {/* {error}  DESCOMENTAR PARA MANEJO DE ERRORES PARA MOSTRAR ERRORES UTILES AL USUARIO*/ }
        </Alert>
      </Snackbar>
      )}
    </Box>
  );
}

export default Login;
