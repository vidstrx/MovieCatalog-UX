import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { FlatList, Image, StyleSheet, Text } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { appState } from '../(auth)/logIn';
import { Card } from '../components/Card';
import { Colors } from '../theme/theme';
import { allMovies } from './index';

export default function WatchListScreen() {
  const [watchlist, setWatchlist] = useState<typeof allMovies>([]);

  useFocusEffect(
    useCallback( () => {
      const funcion = (async ()=>{
          setWatchlist(allMovies.filter(movie => { return appState.favoriteMovies.includes(Number(movie.id))}));
      });
      funcion();
    }, [])
  );
  const router = useRouter(); 
  if(watchlist.length > 0){
    return (
      <SafeAreaProvider style={styles.body}>
            <SafeAreaView style={styles.container}>
              <FlatList data={watchlist}
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
  }else{
    return(
      <SafeAreaProvider style={styles.bodyNotFound}>
        <Image size={20} style={styles.notFound} source={require('../../assets/images/no-content.png')} />
        <Text style={styles.text}>No Movies Added...</Text>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, marginTop: 30, },
  body: { backgroundColor: Colors.color.background,},
  notFound:{ filter: 'invert(100%)', width: 200, height: 200, marginLeft:"39%"},
  bodyNotFound: { backgroundColor: Colors.color.background, justifyContent:'center', flexDirection:'column'},
  text: {color: Colors.color.white, fontSize:20, marginTop:"1%", marginLeft:"39%"}
});