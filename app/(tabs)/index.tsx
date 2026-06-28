import axios from 'axios';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Button, ScrollView, StyleSheet, Text } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../_layout';
import { Carousel } from '../components/Carousel';
import { Input } from '../components/Input';
import { type tnProps } from '../components/Thumbnail';
import { Colors } from '../theme/theme';

function getData(array:[]) {
  const data: tnProps[] = array.map((movie) => ({
    id: movie.id.toString(), url: movie.bannerVertical
  }));
  return data;
}

export let allMovies:any[] = [];

export default function HomeScreen() {
  const auth = useAuth();
  const router = useRouter();
  const [nowPlaying, setNowPlaying] = useState<[]>([]);
  const [upComing, setUpComing] = useState<[]>([]);
  const [topRated, setTopRated] = useState<[]>([]);

  const handleMoviePress = (id: string) => {
    router.push({
      pathname: '/(tabs)/[detalles]',
      params: { detalles: id }
    });
  };

  const getMovies = async () => {
    try {
      let response = await axios.get(process.env.EXPO_PUBLIC_API_URL + "/peliculas/home");
      if(response.status === 200) {
        setNowPlaying(response.data.nowPlaying);
        setUpComing(response.data.upcoming);
        setTopRated(response.data.topRated);
        console.log('Datos extraidos');
      }
    } catch (error: any) {
      console.log('Error en la respuesta del servidor: ', error);
    }
  }
  
  const nowPlayingData = getData(nowPlaying);
  const upComingData = getData(upComing);
  const topRatedData = getData(topRated);
  allMovies = [...nowPlaying, ...upComing, ...topRated].map((movie) => ({
    id: movie.id.toString(),
    title: movie.titulo,
    imageUrl: movie.bannerVertical,
    rating: movie.rating,
    language: movie.idioma,
    year: movie.releaseYear,
    sinopsis: movie.sinopsis,
    videoUrl: movie.trailerYoutube
  })).filter((movie, index, self) => 
    self.findIndex((m) => m.id === movie.id) === index
  );

  useEffect(() => {
    getMovies();
  },[]);

  return (
    <SafeAreaProvider style={styles.body}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>What do you want to watch?</Text>
        <Input text='Search' onFocus={() => router.push('/(tabs)/search')} 
          showSoftInputOnFocus={false}/>
        <ScrollView>
          <Carousel title='Now Playing' data={nowPlayingData} onItemPress={handleMoviePress}/>
          <Carousel title='Upcoming' data={upComingData} onItemPress={handleMoviePress}/>
          <Carousel title='Top Rated' data={topRatedData} onItemPress={handleMoviePress}/>
        </ScrollView>
        <Button title="Cerrar SesiÃ³n" onPress={() => auth?.logout()} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, marginTop: 30, },
  body: { backgroundColor: Colors.color.background} ,
  title: { fontSize: 22, paddingTop: 15, paddingLeft: 15, color:Colors.color.white}
});