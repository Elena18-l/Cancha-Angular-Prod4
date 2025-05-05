import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View , Platform, PermissionsAndroid, Alert} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import AppNavigator from './navigation/AppNavigator';
import Footer from './components/Footer';
import { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';


enableScreens();

export default function App() {
 


  // useEffect  para pedir permios de notificaciones A-13 o superior.
  useEffect(() => {
    const requestNotificationPermission = async () => {
      if (Platform.OS === 'android' && Platform.Version >= 33) {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
          );
          console.log('Permiso POST_NOTIFICATIONS:', granted);
        } catch (err) {
          console.warn('Error solicitando permiso:', err);
        }
      }
    };
 
    requestNotificationPermission();
  }, []);

  // Escuahr mensajes si la tienes abierta.

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('Nuevo mensaje FCM', JSON.stringify(remoteMessage.notification));
    });

    return unsubscribe; // Limpieza al desmontar
  }, []);

  return (
    <SafeAreaProvider>
      <View style={{ flex: 1 }}>
        <AppNavigator />
        <Footer />
        <StatusBar style="auto" />
      </View>
    </SafeAreaProvider>
  );
}

//escuchar mensajes si tienes la app cerrada o en segundo plano. Esto está en index.js




  return (


    <SafeAreaProvider>
      <View style={styles.container}>




        <StatusBar style="light" />
        <AppNavigator />

        {/* Franja vertical roja */}
        <View style={styles.redStripe} />

        <Footer />
      </View>

    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative',
  },
  redStripe: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 16,
    width: 60, // o el ancho que veas bien visualmente
    backgroundColor: '#C02A2D',
    zIndex: -1,
  },
});
