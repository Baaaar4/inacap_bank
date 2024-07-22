import { useContext } from "react";
import { AuthContext } from "../authProdiver";
import { getDatabase, ref, get, child, push, update, remove, onValue } from "firebase/database";

const useDatabase = () => {
  const { user } = useContext(AuthContext);

  const readUser = async () => {
    if (!user) return null;

    try {
      const db = getDatabase();
      const userRef = ref(db, `users/${user.uid}`);
      const snapshot = await get(child(userRef, '/'));
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error obteniendo data de usuario:", error);
      throw error;
    }
  };

  const editUser = async (userData) => {
    if (!user) return;

    try {
      const db = getDatabase();
      const userRef = ref(db, `users/${user.uid}`);
      await update(userRef, userData);
      console.log("Data de usuario actualizada correctamente!");
    } catch (error) {
      console.error("Error actualizando data de usuario:", error);
      throw error;
    }
  };

  const addService = async (name, amount) => {
    if (!user) return;
  
    try {
      const db = getDatabase();
      const servicesRef = ref(db, `services/${user.uid}`);
      const newServiceRef = push(servicesRef);
      const newServiceId = newServiceRef.key;
      await update(newServiceRef, { id: newServiceId, name, amount });
      console.log("Servicio añadido correctamente!");
    } catch (error) {
      console.error("Error añadiendo servicio:", error);
      throw error;
    }
  };

  const getServices = () => {
    return new Promise((resolve, reject) => {
      if (!user) {
        reject(new Error("Usuario no autenticado"));
        return;
      }

      try {
        const db = getDatabase();
        const servicesRef = ref(db, `services/${user.uid}`);
        onValue(servicesRef, (snapshot) => {
          const services = [];
          snapshot.forEach((childSnapshot) => {
            const service = childSnapshot.val();
            services.push(service);
          });
          console.log("Services:", services);
          resolve(services);
        });
      } catch (error) {
        console.error("Error obteniendo servicios:", error);
        reject(error);
      }
    });
  };

  const payService = async (serviceId) => {
    if (!user) return;

    try {
      const db = getDatabase();
      const serviceRef = ref(db, `services/${user.uid}/${serviceId}`);
      await update(serviceRef, { amount: 0 });
      console.log("Service pagado exitosamente!");
    } catch (error) {
      console.error("Error pagando servicio:", error);
      throw error;
    }
  };

  const deleteService = async (serviceId) => {
    if (!user) return;

    try {
      const db = getDatabase();
      const serviceRef = ref(db, `services/${user.uid}/${serviceId}`);
      await remove(serviceRef);
      console.log("Service eliminado correctamente!");
    } catch (error) {
      console.error("Error eliminando servicio:", error);
      throw error;
    }
  };

  const createAccounts = async () => {
    if (!user) return;

    try {
      const db = getDatabase();
      const accountsRef = ref(db, `accounts/${user.uid}`);
      await update(accountsRef, {
        checkingAccount: { balance: 0 },
        savingAccount: { balance: 0 },
        creditCard: { balance: 5000000, spent: 230000 }
      });
      console.log("Cuentas creadas correctamente!");
    } catch (error) {
      console.error("Error creando cuentas:", error);
      throw error;
    }
  };
  
  const getAccounts = async () => {
    if (!user) return null;

    try {
      const db = getDatabase();
      const accountsRef = ref(db, `accounts/${user.uid}`);
      const snapshot = await get(accountsRef);
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error obteniendo cuentas:", error);
      throw error;
    }
  };

  const transferToAccount = async (rut, accountType, amount) => {
    if (!user) return;
  
    try {
      const db = getDatabase();
      const rutRef = ref(db, `ruts/${rut}`);
      const rutSnapshot = await get(rutRef);
      if (!rutSnapshot.exists()) {
        throw new Error("RUT no encontrado");
      }
      const userId = rutSnapshot.val();
  
      const accountRef = ref(db, `accounts/${userId}/${accountType}`);
      const accountSnapshot = await get(accountRef);
      if (!accountSnapshot.exists()) {
        throw new Error(`Cuenta de tipo '${accountType}' no encontrada`);
      }
  
      const currentBalance = accountSnapshot.val().balance;
      const newBalance = currentBalance + parseInt(amount);
  
      await update(accountRef, { balance: newBalance });
  
      console.log(`Transferencia exitosa.`);
    } catch (error) {
      console.error("Ha ocurrido un error realizando la transferencia:", error);
      throw error;
    }
  };
  
  

  return { readUser, editUser, addService, getServices, payService, deleteService, createAccounts, getAccounts, transferToAccount };
};

export default useDatabase;
