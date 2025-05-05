import { registerRootComponent } from 'expo';
import messaging from '@react-native-firebase/messaging';
import App from './App';

// Registrar manejador para mensajes en segundo plano
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Mensaje recibido en segundo plano:', remoteMessage);
});

// Esto registra el componente raíz y asegura compatibilidad con Expo Go o builds nativas
registerRootComponent(App);
