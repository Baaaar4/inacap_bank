import { Card, CardContent, Typography, Box, Grid, Button } from '@mui/material';
import { AccountBalance, AttachMoney, CreditCard, LocalAtm } from '@mui/icons-material';

function HomePage() {
  return (
    <Box p={5}>
      <Typography variant="h3" gutterBottom align="center">
        Bienvenido a Inacap Bank
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" justifyContent="center" mb={2}>
                <AccountBalance fontSize="large" />
              </Box>
              <Typography variant="h5" component="h2" align="center" gutterBottom>
                Cuentas
              </Typography>
              <Typography variant="body1" align="center">
                Administra tus cuentas bancarias de forma segura.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" justifyContent="center" mb={2}>
                <AttachMoney fontSize="large" />
              </Box>
              <Typography variant="h5" component="h2" align="center" gutterBottom>
                Préstamos
              </Typography>
              <Typography variant="body1" align="center">
                Descubre nuestras opciones de préstamos y créditos.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" justifyContent="center" mb={2}>
                <CreditCard fontSize="large" />
              </Box>
              <Typography variant="h5" component="h2" align="center" gutterBottom>
                Tarjetas
              </Typography>
              <Typography variant="body1" align="center">
                Conoce nuestros servicios de tarjetas de crédito y débito.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" justifyContent="center" mb={2}>
                <LocalAtm fontSize="large" />
              </Box>
              <Typography variant="h5" component="h2" align="center" gutterBottom>
                Cajeros automáticos
              </Typography>
              <Typography variant="body1" align="center">
                Encuentra nuestros cajeros automáticos más cercanos.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Box mt={3} display="flex" justifyContent="center">
        <Button variant="contained" color="primary" href="/consults">
          Ver todas las cuentas
        </Button>
      </Box>
    </Box>
  );
}

export default HomePage;
