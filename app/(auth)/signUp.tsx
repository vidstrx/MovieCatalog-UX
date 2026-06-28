import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../_layout';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Colors } from '../theme/theme';

export default function SignUpScreen() {
  const auth = useAuth();
  const router = useRouter();
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [errorMessagePassword, setErrorMessagePassword] = useState<string | null>('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = async (user: string, password: string) => {
    setErrorMessagePassword(null);
    if (!email.includes('@')) {
      return Alert.alert('Error','Ingrese un Email valido ');
    }

    try {
      let response = await axios.post(process.env.EXPO_PUBLIC_API_URL + "/signUp", {email: user, password: password});
      //console.log('RESPUESTA COMPLETA DEL BE!!!!!!', response);
      if (response.status === 201) {
        Alert.alert('Éxito', response.data.mensaje, [{
          text: 'OK',
          onPress: () => {auth?.login(response.data.userId);}
        }]);
        console.log('Usuario registrado: ', response.data.userId);
      }
    } catch (error: any) {
      // console.error('Error en la respuesta del servidor: ', error.response.data);
      // console.error('Algo salio mal ', error);
      console.log('Error en la respuesta del servidor: ', error);
      let errorMessage = 'Ocurrió un error desconocido';
      if (error.status === 400) {
        errorMessage = error.response.data.mensaje;
      } else {
        console.error('Error desconocido: ', error);
      }
      Alert.alert('Error', errorMessage);
    }
  };
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Sign Up to Movies</Text>
        <Input text='Email' value={email} onChangeText={(emailInput) => setEmail(emailInput)}/>
        <Input 
          text='Password' 
          secureTextEntry={!showPassword} 
          value={password} 
          icono={
            <Pressable onPress={()=>{setShowPassword(!showPassword)}}>
                <Ionicons name={showPassword? 'eye' : 'eye-off'} style={styles.icono} size={26}/>
            </Pressable>}
          onChangeText={(passwordInput) => {
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
  error: { color: Colors.color.error, fontSize: 16, marginLeft: 15,},
  icono: { color: Colors.color.white, paddingRight: 10 }
});
