import { Box, Typography, Alert } from "@mui/material";
import { ErrorOutline } from "@mui/icons-material";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <Box
      id="error-page"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <ErrorOutline sx={{ fontSize: 64, color: "error.main" }} />
      <Typography variant="h4" align="center" mt={2} mb={4}>
        Oops!
      </Typography>
      <Alert severity="error" sx={{ maxWidth: 400 }}>
        Lo lamentamos, la página que deseas visitar no se ha encontrado
        <Typography variant="body2" mt={1}>
          <i>{error.statusText || error.message}</i>
        </Typography>
      </Alert>
    </Box>
  );
}
