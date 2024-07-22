import { useState, useEffect } from 'react';
import { Snackbar, Card, CardContent, Typography, TextField, InputAdornment, Button, FormControl, InputLabel, Select, MenuItem, RadioGroup, Radio, FormControlLabel, Box } from '@mui/material';
import useDatabase from '../hooks/userFirebase';

function Transfer() {
  const [fromAccount, setFromAccount] = useState('');
  const [toInternalAccount, setToInternalAccount] = useState('');
  const [toName, setToName] = useState('');
  const [toRut, setToRut] = useState('');
  const [bank, setBank] = useState('');
  const [accountType, setAccountType] = useState('');
  const [amount, setAmount] = useState('');
  const [amountInternal, setAmountInternal] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarmessage] = useState('');
  const [checkingBalance, setCheckingBalance] = useState('');
  const [savingBalance, setSavingBalance] = useState('');
  const { getAccounts, transferToAccount } = useDatabase();

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const accounts = await getAccounts();
        setCheckingBalance(accounts.checkingAccount.balance);
        setSavingBalance(accounts.savingAccount.balance);
      } catch (error) {
        console.error('Error obteniendo cuentas:', error);
      }
    };

    fetchAccounts();
  }, [getAccounts]);


  const handleTransfer = async () => {
    try {
      if (toInternalAccount) {
        // Logica para produtos internos acá por hacer
      } else {
        // Transferencia a tercero
        await transferToAccount(toRut, accountType, amount);
  
        setFromAccount('');
        setToInternalAccount('');
        setToName('');
        setToRut('');
        setBank('');
        setSnackbarOpen(true);
        setSnackbarmessage('Transferencia exitosa!')
        setAccountType('');
        setAmount('');
        setAmountInternal('');
      }
    } catch (error) {
      setSnackbarOpen(true);
      setSnackbarmessage(`Error al realizar transferencia: ${error}`);
      console.error("Error transferring:", error);
    }
  };
  
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box display="flex" gap="20px" justifyContent="center" p={10}>
    <Box width="50%">
      <Box md={6} marginBottom={5}>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Transferir desde
            </Typography>
            <RadioGroup value={fromAccount} onChange={(e) => setFromAccount(e.target.value)}>
              <FormControlLabel value="checkingAccount" control={<Radio />} label={`Cuenta Corriente - Balance: $${checkingBalance}`} />
              <FormControlLabel value="savingAccount" control={<Radio />} label={`Cuenta de Ahorro - Balance: $${savingBalance}`} />
            </RadioGroup>
          </CardContent>
        </Card>
      </Box>
      <Box md={6}>
        <Card>
          <CardContent sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <Typography variant="h5" gutterBottom>
              Transferir a tercero
            </Typography>
            <TextField
              label="Nombre del Destinatario"
              variant="outlined"
              fullWidth
              value={toName}
              onChange={(e) => setToName(e.target.value)}
            />
            <TextField
              type="number"
              label="RUT de destinatario"
              variant="outlined"
              fullWidth
              value={toRut}
              onChange={(e) => setToRut(e.target.value)}
            />
            <FormControl fullWidth>
              <InputLabel id="bank-select-label">Banco</InputLabel>
              <Select
                labelId="bank-select-label"
                id="bank-select"
                value={bank}
                label="Bank"
                onChange={(e) => setBank(e.target.value)}
              >
                <MenuItem value="bank1">Banco Santander</MenuItem>
                <MenuItem value="bank2">Banco de Chile</MenuItem>
                <MenuItem value="bank2">Banco Falabella</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="account-type-select-label">Tipo de cuenta</InputLabel>
              <Select
                labelId="account-type-select-label"
                id="account-type-select"
                value={accountType}
                label="Tipo de cuenta"
                onChange={(e) => setAccountType(e.target.value)}
              >
                <MenuItem value="checkingAccount">Cuenta Corriente</MenuItem>
                <MenuItem value="savingAccount">Cuenta de Ahorro</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Monto"
              variant="outlined"
              fullWidth
              type="number"
              value={amount}
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
              onChange={(e) => setAmount(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleTransfer}
              disabled={!fromAccount || !toRut || !bank || !accountType || !amount}
              sx={{ marginTop: 2 }}
            >
              Realizar transferencia
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Box>
    <Card width="50%">
      <CardContent sx={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
        <Box>
          <Typography variant="h5" gutterBottom>
            Transferir a mis productos
          </Typography>
          <RadioGroup onChange={(e) => setToInternalAccount(e.target.value)}>
            <FormControlLabel value="checkingAccount" control={<Radio />} label="Cuenta Corriente" />
            <FormControlLabel value="savingAccount" control={<Radio />} label="Cuenta de Ahorro" />
          </RadioGroup>
        </Box>
        <Box marginBottom={5}> 
          <TextField
            label="Monto"
            variant="outlined"
            fullWidth
            type="number"
            value={amountInternal}
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
            onChange={(e) => setAmountInternal(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleTransfer}
            disabled={!amountInternal || !toInternalAccount}
            sx={{ marginTop: 2 }}
            >
            Transferir
          </Button>
        </Box>
      </CardContent>
    </Card>
    <Snackbar
      open={snackbarOpen}
      autoHideDuration={6000}
      onClose={handleSnackbarClose}
      message={snackbarMessage}
    />
  </Box>
  );
}

export default Transfer;
