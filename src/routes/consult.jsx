import { useState, useEffect } from 'react';
import { Card, CardContent, Typography, TextField, Button, Grid, InputAdornment } from '@mui/material';
import useDatabase from '../hooks/userFirebase';

function BalanceDisplay() {
  const [savingBalance, setSavingBalance] = useState(null);
  const [normalBalance, setNormalBalance] = useState(null);
  const [creditCardBalance, setCreditCardBalance] = useState(null);
  const [creditCardSpent, setCreditCardSpent] = useState(null);

  const { getAccounts } = useDatabase();

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const accounts = await getAccounts();
        console.log(accounts)
        if (accounts) {
          setSavingBalance(accounts.checkingAccount.balance);
          setNormalBalance(accounts.savingAccount.balance);
          setCreditCardBalance(accounts.creditCard.balance);
          setCreditCardSpent(accounts.creditCard.spent);
        }
      } catch (error) {
        console.error('Error fetching accounts:', error);
      }
    };

    fetchAccounts();
  }, []);

  const [showSavingBalance, setShowSavingBalance] = useState(true);
  const [showNormalBalance, setShowNormalBalance] = useState(true);
  const [showCreditCardBalance, setShowCreditCardBalance] = useState(true);

  const handleToggleSavingBalance = () => {
    setShowSavingBalance(!showSavingBalance);
  };

  const handleToggleNormalBalance = () => {
    setShowNormalBalance(!showNormalBalance);
  };

  const handleToggleCreditCardBalance = () => {
    setShowCreditCardBalance(!showCreditCardBalance);
  };

  return (
    <Grid container spacing={2} sx={{ justifyContent: "center", gap: "30px"}}>
      <Grid item xs={3} minWidth={300}>
        <Card >
          <CardContent>
            <Typography variant="h5" component="h2" gutterBottom>
              Cuenta Corriente
            </Typography>
            <TextField
              label="Balance"
              variant="outlined"
              fullWidth
              value={showSavingBalance ? savingBalance : '*****'}
              disabled
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
            />
            <Button onClick={handleToggleSavingBalance}>
              {showSavingBalance ? 'Mostrar datos' : 'Ocultar datos'}
            </Button>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={3} minWidth={300}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="h2" gutterBottom>
              Cuenta de Ahorro
            </Typography>
            <TextField
              label="Balance"
              variant="outlined"
              fullWidth
              value={showNormalBalance ? normalBalance : '*****'}
              disabled
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
            />
            <Button onClick={handleToggleNormalBalance}>
              {showNormalBalance ? 'Mostrar datos' : 'Ocultar datos'}
            </Button>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={3}  minWidth={300}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="h2" gutterBottom>
              Tarjeta de Crédito
            </Typography>
            <TextField
              label="Cupo"
              variant="outlined"
              fullWidth
              value={showCreditCardBalance ? creditCardBalance : '*****'}
              disabled
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
            />
            <TextField
              label="Utilizado"
              variant="filled"
              fullWidth
              value={showCreditCardBalance ? creditCardSpent : '*****'}
              disabled
              sx={{ marginTop: "10px"}}
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
            />
            <Button onClick={handleToggleCreditCardBalance}>
              {showCreditCardBalance ? 'Mostrar datos' : 'Ocultar datos'}
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default BalanceDisplay;
