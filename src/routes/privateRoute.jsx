import { useContext } from "react";
import { AuthContext } from "../authProdiver";
import { Box, Typography, CircularProgress, Alert } from "@mui/material";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import ErrorIcon from "@mui/icons-material/Error";

const PrivateRoute = ({ children }) => {
  const { loading, user, error } = useContext(AuthContext);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', flexDirection: "column", justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Typography variant="h5" sx={{ marginBottom: "20px" }}>
          Cargando
        </Typography>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', flexDirection: "column", justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Alert severity="error" icon={<ErrorIcon fontSize="large" />} sx={{ maxWidth: 400 }}>
          <Typography variant="h6">Ha ocurrido un error en el sistema</Typography>
          {error}
        </Alert>
      </Box>
    );
  }

  if (user) {
    return children;
  }
  
  if (!user && !loading) {
    return <Navigate to="/login" />;
  }
};

PrivateRoute.propTypes = {
  children: PropTypes.node,
};

export default PrivateRoute;
