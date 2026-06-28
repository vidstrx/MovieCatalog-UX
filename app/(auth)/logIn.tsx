import { useState } from 'react';
import axios from 'axios';
import { Text, StyleSheet, Alert } from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAuth } from '../_layout';
import { Button } from '../components/Button'
import {Colors} from '../theme/theme'
import { Input } from '../components/Input'

export default function LoginScreen() {
  const auth = useAuth();
  const router = useRouter();
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [errorMessageEmail, setErrorMessageEmail] = useState<string | null>('');

  const handleLogin = async (user: string, password: string) => {
    setErrorMessageEmail(null);
    if (!email.includes('@')) {
      setErrorMessageEmail('Ingrese un email válido');
      return;
    }

    try {
      let response = await axios.post(process.env.EXPO_PUBLIC_API_URL + "/logIn", {email: user, password: password});
      if(response.status === 200) {
        Alert.alert('Exito', response.data.mensaje, [{
          text: 'OK',
          onPress: () => {auth?.login(response.data.userId);}
        }]);
        console.log('Usuario logueado: ', response.data.userId);
      }
    } catch (error: any) {
      console.log('Error en la respuesta del servidor: ', error);
      let errorMessage = 'Ocurrió un error desconocido';
      if (error.status === 401 || error.status === 400) {
        errorMessage = error.response.data.mensaje;
      } else {
        console.error('Error desconocido: ', error);
      }
      Alert.alert('Error', errorMessage);
    }
  }
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Login to Movies</Text>
        <Input text='Email' value={email} onChangeText={(emailInput) => setEmail(emailInput)}/>
        {errorMessageEmail && <Text style={styles.error}>{errorMessageEmail}</Text>}
        <Input text='Password' secureTextEntry={true} value={password} onChangeText={(passwordInput) => setPassword(passwordInput)}/>
        <Button text="Log In" disabled={!password||!email? true: false} onClick={() => {handleLogin(email,password)}} />
        <Button text="Sign Up" onClick={() => router.push('/(auth)/signUp')} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', backgroundColor: Colors.color.background },
  title: { color:Colors.color.white, fontSize: 24, fontWeight: 'bold', alignSelf: 'center' },
  error: { color: Colors.color.error, fontSize: 16, marginLeft: 15,}
});
