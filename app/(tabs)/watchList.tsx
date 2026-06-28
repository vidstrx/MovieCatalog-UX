import { FlatList, StyleSheet, TextInput } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '../components/Card';
import { Colors } from '../theme/theme';
import { allMovies } from './index';

export default function WatchListScreen() {
  return (
    <SafeAreaProvider style={styles.body}>
      <SafeAreaView style={styles.container}>
        {/* <FlatList data={allMovies}
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
        /> */}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, marginTop: 30, },
  body: { backgroundColor: Colors.color.background},
});