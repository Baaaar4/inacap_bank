import { useState, useEffect } from 'react';
import { Card, CardContent, Typography, TextField, Button, IconButton, Box, Snackbar, Alert, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import ReceiptIcon from '@mui/icons-material/Receipt';
import useDatabase from '../hooks/userFirebase';

function PayServices() {
  const [services, setServices] = useState([]);
  const [currentService, setCurrentService] = useState('');
  const [currentAmount, setCurrentAmount] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState(null);
  const { addService, getServices, deleteService, payService } = useDatabase();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const servicesData = await getServices();
        setServices(servicesData || []);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);

  const handleServiceChange = (event) => {
    setCurrentService(event.target.value);
  };

  const handleAmountChange = (event) => {
    setCurrentAmount(event.target.value);
  };

  const handleAddService = async () => {
    try {
      await addService(currentService, parseInt(currentAmount));
      setOpenSnackbar(true);
      setSnackbarMessage('Cuenta añadida correctamente!');
      setCurrentAmount('');
      setCurrentService('');

      const updatedServices = await getServices();
      setServices(updatedServices || []);
    } catch (error) {
      setOpenSnackbar(true);
      setSnackbarMessage('Ha ocurrido un error al cargar cuenta');
    }
  };

  const handleDeleteService = async () => {
    try {
      await deleteService(serviceToDelete);
      setOpenSnackbar(true);
      setSnackbarMessage('Servicio eliminado correctamente!');
      
      const updatedServices = await getServices();
      setServices(updatedServices || []);
    } catch (error) {
      setOpenSnackbar(true);
      setSnackbarMessage('Ha ocurrido un error al eliminar el servicio');
    } finally {
      setOpenDialog(false);
    }
  };

  const handlePayService = async (serviceId) => {
    try {
      await payService(serviceId);
      setOpenSnackbar(true);
      setSnackbarMessage('Servicio pagado correctamente');
      const updatedServices = await getServices();
      setServices(updatedServices || []);
    } catch (error) {
      console.error('Error paying service:', error);
      setOpenSnackbar(true);
      setSnackbarMessage('Ha ocurrido un error al pagar el servicio');
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
    setSnackbarMessage('');
  };

  const handleOpenDialog = (serviceId) => {
    setServiceToDelete(serviceId);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setServiceToDelete(null);
    setOpenDialog(false);
  };

  return (
    <Box height="80vh" p={10}>
      <Box marginLeft={4}>
        <Typography variant="caption" component="h2" gutterBottom>
          Agregar nuevo servicio
        </Typography>
        <Card style={{ height: '200px', width: '200px', padding: "8px"}}>
          <CardContent>
            <TextField
              label="Servicio"
              variant="outlined"
              fullWidth
              value={currentService}
              onChange={handleServiceChange}
              sx={{ marginBottom: "8px"}}
              InputProps={{
                style: { textAlign: 'center' },
              }}
            />
            <TextField
              label="Monto"
              variant="outlined"
              fullWidth
              type='number'
              InputProps={{ style: { textAlign: 'center' }, inputProps: { min: 0 } }}
              value={currentAmount}
              onChange={handleAmountChange}
            />
            <Button
              variant="contained"
              color="success"
              fullWidth
              sx={{ marginTop: "6px" }}
              disabled={!currentAmount || !currentService}
              onClick={handleAddService}
            >
              Agregar
            </Button>
          </CardContent>
        </Card>
      </Box>
      <Box display="flex" flexWrap="wrap" overflow="scroll" height="80%" marginTop={5}>
        {services.map((service, index) => (
          <Box p={2} m={2} key={index}>
            <Card style={{ height: 'auto', width: '200px', padding: "8px"}}>
              <CardContent>
                <IconButton disabled>
                  <ReceiptIcon />
                </IconButton>
                <Typography variant="overline" component="h2" gutterBottom>
                  {service.name}
                </Typography>
                <TextField
                  label="Deuda"
                  variant="outlined"
                  fullWidth
                  value={`$${service.amount}`}
                  disabled
                  InputProps={{
                    style: { textAlign: 'center' },
                  }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ marginTop: "6px" }}
                  onClick={() => handlePayService(service.id)}
                >
                  Pagar
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  fullWidth
                  sx={{ marginTop: "6px" }}
                  onClick={() => handleOpenDialog(service.id)}
                >
                  Eliminar
                </Button>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            ¿Está seguro de que desea eliminar este servicio?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleDeleteService} autoFocus>Eliminar</Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity='info'>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default PayServices;
