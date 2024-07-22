# inacap_bank
Evaluación del ramo Aseguramiento de Calidad


# Bank App - Inacap Barbara
## Caracteristicas
- Consultar Saldo: Cuenta corriente, cuenta ahorro, tarjeta de crédito.
- Transferencias de Fondos: Transferir fondos entre sus propias cuentas o a cuentas de terceros dentro y fuera del banco.
- Pago de facturas: Pagar facturas de servicios públicos, tarjetas de crédito, 
- Administración de cuenta: Modificar datos del usuario.
- Login y Registro de usuarios por correo y contraseña
- Verificación de correos actualmente registrados en la App
- Manejo de errores
- Manejo de rutas y rutas protegida/privadas

## Tech
- Frontend - ReactJS con componentes MUISe utilizo React a través de Vite que es el bundler que organiza e instala todo para iniciar la app en ReactSe usaron componentes de la librería MUI React para facilitar el diseño de frontend
- Backend en Firebase
- Seguridad - Cifrar datos. a traves de auth de FirebaseInstalar e Iniciar App: correr en el directorio de la app.

## Instalar e Iniciar 
Correr en consola en directorio raíz. Necesario tener Node/NPM instalado.
- npm install
- npm run dev

## Pruebas Unitarias

-src/components/Button.test.js

Este archivo prueba el componente Button. Las pruebas verifican que el botón se renderiza correctamente y que se llama al manejador de clics cuando se hace clic en el botón.

-src/components/AppBar.test.jsx
Este archivo prueba el componente AppBar. Las pruebas incluyen la verificación de la renderización de los elementos de la barra de aplicaciones, la apertura y cierre de menús, y la navegación a diferentes rutas.

-src/AuthProvider.test.jsx
Este archivo prueba el componente AuthProvider. Las pruebas incluyen la creación de usuarios, inicio de sesión y cierre de sesión utilizando Firebase Authentication.

## Ejecutar todas las pruebas

npm test

## Cobertura de Pruebas
npm test -- --coverage

## Pruebas Específicas
npm test -- <test-file>



