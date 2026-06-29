import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../_layout';
import { Button } from '../components/atoms/Button';
import { Input } from '../components/atoms/Input';
import { Colors } from '../theme/theme';

//export let favoriteMovies:any[] = [];
export const appState = {favoriteMovies: [] as Number[]};
export let favoriteMovies:any[] = [];

const addFavorites = async (user: string) =>{
    try{
        const repuestaGet = await axios.get(process.env.EXPO_PUBLIC_API_URL + `/peliculas/favorites/${user}`);
        const arrayMovies:any[] = repuestaGet.data;
        appState.favoriteMovies = arrayMovies.map(movie => movie.id);
    }catch(error){
        console.log(error);
    }
    favoriteMovies = appState.favoriteMovies;
}

export default function LoginScreen() {
  const auth = useAuth();
  const router = useRouter();
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [errorMessageEmail, setErrorMessageEmail] = useState<string | null>('');
  const [showPassword, setShowPassword] = useState(false);

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
        addFavorites(response.data.userId);
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
        <Input 
          text='Password' 
          secureTextEntry={!showPassword} 
          value={password} 
          onChangeText={(passwordInput) => setPassword(passwordInput)} 
          icono={
            <Pressable onPress={()=>{setShowPassword(!showPassword)}}>
                <Ionicons name={showPassword? 'eye' : 'eye-off'} style={styles.icono} size={26}/>
            </Pressable>
          }/>
        <Button text="Log In" disabled={!password||!email? true: false} onClick={() => {handleLogin(email,password)}} />
        <Button text="Sign Up" onClick={() => router.push('/(auth)/signUp')} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', backgroundColor: Colors.color.background },
  title: { color:Colors.color.white, fontSize: 24, fontWeight: 'bold', alignSelf: 'center' },
  error: { color: Colors.color.error, fontSize: 16, marginLeft: 15,},
  icono: { color: Colors.color.white, paddingRight: 10 }
});
