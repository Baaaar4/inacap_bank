import { useState, useEffect } from 'react';
import { Alert, Button, TextField, Typography, Box, Grid, Snackbar } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import useFirebase from '../hooks/userFirebase';


function AccountConfig() {
  const { readUser, editUser } = useFirebase();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [rut, setRut] = useState('');
  const [isDataSaved, setIsDataSaved] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await readUser();
        if (userData) {
          console.log(userData)
          setName(prevName => userData.name || prevName);
          setAddress(prevAddress => userData.address || prevAddress);
          setRut(prevRut => userData.rut || prevRut);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setName(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleConfirm = async () => {
    try {
      await editUser({ name, address });
      setIsDataSaved(true);
    } catch (error) {
      console.error('Error saving user data:', error);
      setIsDataSaved(false);
    }
  };

  const handleAlertClose = () => {
    setIsDataSaved(false);
  };

  return (
    <Box 
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100%"
    >
      <Box>
        <Box 
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <AccountCircleIcon color='primary' sx={{ fontSize: '60px'}}/>
          <Typography variant="h5" align="center" gutterBottom>
            Administrar cuenta
          </Typography>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Nombre"
              variant="outlined"
              fullWidth
              value={name}
              onChange={(e) => handleNameChange(e)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="RUT"
              variant="outlined"
              fullWidth
              value={rut}
              disabled={true}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Dirección"
              variant="outlined"
              fullWidth
              value={address}
              onChange={(e) => handleAddressChange(e)}
            />
          </Grid>
          <Grid item xs={12} align="center">
            <Button
              variant="contained"
              color="primary"
              onClick={handleConfirm}
              disabled={!name || !address}
            >
              Guardar cambios
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Snackbar
        open={isDataSaved}
        autoHideDuration={4000}
        severity="success"
        onClose={handleAlertClose}
        message="Datos guardados exitosamente"
      >
        <Alert
          onClose={handleAlertClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Datos guardados exitosamente
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default AccountConfig;
