import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View , Platform, PermissionsAndroid, Alert } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import AppNavigator from './navigation/AppNavigator';
import Footer from './components/Footer';
import { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';

enableScreens();

export default function App() {
  // Permiso POST_NOTIFICATIONS en Android 13+
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

  // Escuchar mensajes en primer plano
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('Nuevo mensaje FCM', JSON.stringify(remoteMessage.notification));
    });

    return unsubscribe;
  }, []);

  // Obtener y mostrar el token FCM
  useEffect(() => {
    const getFCMToken = async () => {
      try {
        const authorizationStatus = await messaging().requestPermission();

        if (
          authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL
        ) {
          const fcmToken = await messaging().getToken();
          console.log('FCM Token:', fcmToken);
          // Aquí puedes enviar el token a tu backend si lo necesitas
        } else {
          console.log('Permisos de notificación no concedidos');
        }
      } catch (error) {
        console.error('Error obteniendo token FCM:', error);
      }
    };

    getFCMToken();
  }, []);

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <StatusBar style="light" />
        <AppNavigator />
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
    width: 60,
    backgroundColor: '#C02A2D',
    zIndex: -1,
  },
});
