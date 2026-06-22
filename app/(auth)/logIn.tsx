import { Text, StyleSheet } from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAuth } from '../_layout';
import { Button } from '../components/Button'
import {Colors} from '../theme/theme'
import { Input } from '../components/Input'

export default function LoginScreen() {
  const auth = useAuth();
  const router = useRouter();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Pantalla de Login</Text>
        <Input text='Email'/>
        <Input text='Password' secureTextEntry={true}/>
        <Button text='Prueba 1'/>
        {/* <Button text="Sign In" onClick={() => auth?.login()} /> */}
        <Button text="Sign Up" onClick={() => router.push('/(auth)/signUp')} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', gap: 10, backgroundColor: Colors.color.background },
  title: { color:Colors.color.white, fontSize: 24, fontWeight: 'bold', alignSelf: 'center' }
});
