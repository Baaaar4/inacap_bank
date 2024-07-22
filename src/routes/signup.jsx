import { useState, useContext, useEffect} from 'react';
import { AuthContext } from "../authProdiver.jsx"
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { Alert, Button, TextField, Typography, Box, Link, CircularProgress, Snackbar} from '@mui/material';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [rut, setRut] = useState('');
  const { loginUser, createUser, loading, user, error } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUser(email, password, { name, address, rut });
      await loginUser(email, password);
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [navigate, user]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleRutChanges = (event) => {
    const inputValue = event.target.value;
    if (inputValue.length <= 9) {
      setRut(inputValue);
    }
  };

  return (
    <Box
      p={10}
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      {
        loading ?
            ( 
            <Box sx={{ 
              display: 'flex',
              justifyContent: "center",
              alignItems: "center",
              flexDirection:"column",
              gap: "20px"
            }}>
              <Typography
                variant="h5"
                noWrap
                sx={{
                  display: { xs: 'flex'},
                  flexGrow: 1,
                  fontFamily: 'monospace',
                  color: '#1976d2',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  textDecoration: 'none',
                }}
              >
                Registrando usuario
              </Typography>
              <Typography
                variant="h6"
                noWrap
                sx={{
                  display: { xs: 'flex'},
                  flexGrow: 1,
                  color: '#1976d2',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  textDecoration: 'none',
                }}
              >
                Creando cuentas
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
          <Typography variant='body2'>Ingresa tus datos para crear una cuenta</Typography>
          <Typography variant="body2" color="secondary.dark">
            Al registrarte, estás aceptando la creación de servicios en el banco, incluídos cuenta corriente, ahorro y tarjeta de crédito.
          </Typography>
          <TextField
            label="Nombre completo"
            type="text"
            variant="outlined"
            fullWidth
            margin="normal"
            value={name}
            onChange={handleNameChange}
          />
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
          <TextField
            label="Dirección"
            type="text"
            variant="outlined"
            fullWidth
            margin="normal"
            value={address}
            onChange={handleAddressChange}
          />
          <TextField
            label="Rut"
            type="number"
            variant="outlined"
            fullWidth
            margin="normal"
            value={rut}
            InputProps={{ inputProps: { min: 0} }}
            onChange={handleRutChanges}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            disabled={!name || !email || !password || !address || !rut}
            style={{ marginTop: '20px', width: "200px", minWidth: "200px" }}
          >
            Registrarse
          </Button>
          <Box mt={2}>
            <Typography variant="body2">
              ¿Ya tienes una cuenta?{" "}
              <Link component={RouterLink} to="/login">
                Iniciar sesión aquí
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
              Ha ocurrido un error al momento de crear la cuenta: 
              { error }
            </Typography>
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
}

export default Signup;
