import { useRef, useCallback } from 'react';
import { FlatList, StyleSheet, TextInput } from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { useFocusEffect } from 'expo-router';
import {Input} from '../components/Input';
import {Card} from '../components/Card'
import {Colors} from '../theme/theme';
import {type tnProps} from '../components/Thumbnail';
import { useAuth } from '../_layout';

export default function HomeScreen() {
  const auth = useAuth();
  const data = [
    {id: '1', title:'title1', rating: '8.5', language: 'En', year: '2023', url: 'https://picsum.photos/150'},
    {id: '2', title:'title2', rating: '8.9', language: 'En', year: '2024', url: 'https://picsum.photos/200'},
    {id: '3', title:'title3', rating: '9.5', language: 'En', year: '2025', url: 'https://picsum.photos/300'},
    {id: '4', title:'title4', rating: '7.6', language: 'En', year: '2026', url: 'https://picsum.photos/150'},
    {id: '5', title:'title5', rating: '8.5', language: 'En', year: '2024', url: 'https://picsum.photos/150'},
    {id: '6', title:'title6', rating: '6.7', language: 'En', year: '2023', url: 'https://picsum.photos/150'},
  ]

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
        <FlatList data={data}
          renderItem={({item}) => <Card id={item.id} title={item.title} rating={item.rating} language={item.language} url={item.url} year={item.year} onClick={()=>{console.log(item.title)}}/>}
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