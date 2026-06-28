import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useRef } from 'react';
import { FlatList, StyleSheet, TextInput } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../_layout';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { Colors } from '../theme/theme';
import { allMovies } from './index';

export default function HomeScreen() {
  const auth = useAuth();
  const router = useRouter(); 
  
  const inputRef = useRef<TextInput>(null);
  useFocusEffect(
    useCallback(() => {
      const timeout = setTimeout(() => {
        inputRef.current?.focus();
      }, 200);
      return () => clearTimeout(timeout);
    }, [])
  );

  return (
    <SafeAreaProvider style={styles.body}>
      <SafeAreaView style={styles.container}>
        <Input ref={inputRef} text='Search'/>
        <FlatList data={allMovies}
          renderItem={({item}) => (
            <Card 
              id={item.id} 
              title={item.title} 
              rating={item.rating} 
              language={item.language} 
              url={item.imageUrl} 
              year={item.year} 
              onClick={() => router.push({
                pathname: '/(tabs)/[detalles]',
                params: { detalles: item.id }
              })}
            />
          )}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, marginTop: 30, },
  body: { backgroundColor: Colors.color.background} ,
  title: { fontSize: 22, paddingTop: 15, paddingLeft: 15, color:Colors.color.white}
});