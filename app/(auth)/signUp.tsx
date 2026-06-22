import { Text, StyleSheet, Alert } from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAuth } from '../_layout';
import { Button } from '../components/Button'
import {Colors} from '../theme/theme'
import { Input } from '../components/Input'
import { useState } from 'react';
import axios from 'axios';

export default function SignUpScreen() {
  const auth = useAuth();
  const router = useRouter();
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [errorMessagePassword, setErrorMessagePassword] = useState<string | null>('');
  const [errorMessageEmail, setErrorMessageEmail] = useState<string | null>('');

  const handleSignUp = async (user: string, password: string) => {
    setErrorMessagePassword(null);
    setErrorMessageEmail(null);
    if (!email.includes('@') || (!email.includes('.com') && !email.includes('.edu'))) {
      setErrorMessageEmail('Ingrese un email válido');
      return Alert.alert('Error', errorMessageEmail || 'Email inválido');
    }

    try {
      let response = await axios.post(process.env.EXPO_PUBLIC_API_URL + "/signUp", {user: user, password: password});
      console.log('RESPUESTA COMPLETA DEL BE!!!!!!', response);
      if (response.status === 201) {
        Alert.alert('Éxito', 'Usuario registrado correctamente', [{
          text: 'OK',
          onPress: () => {auth?.login(response.data.responseFirebase.user.email);}
        }]);
        console.log('Usuario registrado: ', response.data.responseFirebase.user.email);
      }
    } catch (error: any) {
      console.error('Error en la respuesta del servidor: ', error.response.data);
      console.error('Algo salio mal ', error);
      if (error.response.data.mensaje) {
        setErrorMessagePassword(error.response.data.mensaje);
      }
    }
  };
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Sign Up to Movies</Text>
        <Input text='Email' value={email} onChangeText={(emailInput) => setEmail(emailInput)}/>
        <Input text='Password' secureTextEntry={true} value={password} onChangeText={(passwordInput) => {
          passwordInput.length < 6 ? setErrorMessagePassword('La contraseña debe tener al menos 6 caracteres'): setErrorMessagePassword(null);
          setPassword(passwordInput)}}/>
        {errorMessagePassword && <Text style={styles.error}>{errorMessagePassword}</Text>}
        <Button text="Sign Up" disabled={(errorMessagePassword||password.length<1)? true:false} onClick={() => {handleSignUp(email,password);}} />
        <Button text="Back" onClick={() => router.push('/(auth)/logIn')} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', backgroundColor: Colors.color.background },
  title: { color:Colors.color.white, fontSize: 24, fontWeight: 'bold', alignSelf: 'center', margin: 5, },
  error: { color: Colors.color.error, fontSize: 16,}
});
