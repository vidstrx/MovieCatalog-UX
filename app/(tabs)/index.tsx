import { Text, Button, StyleSheet, ScrollView } from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import {Input} from '../components/Input';
import {Colors} from '../theme/theme';
import {type tnProps} from '../components/Thumbnail';
import {Carousel} from '../components/Carousel';
import { useAuth } from '../_layout';

export default function HomeScreen() {
  const auth = useAuth();
  const data: tnProps[] = [ //thumnail props
    {id: '1', url: 'https://picsum.photos/150'},
    {id: '2', url: 'https://picsum.photos/200'},
    {id: '3', url: 'https://picsum.photos/300'},
    {id: '4', url: 'https://picsum.photos/150'},
    {id: '5', url: 'https://picsum.photos/150'},
    {id: '6', url: 'https://picsum.photos/150'},
  ]

  return (
    <SafeAreaProvider style={styles.body}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>What do you want to watch?</Text>
        <Input text='Search'/>
        <ScrollView>
          <Carousel title='Now Playing' data={data}/>
          <Carousel title='Upcoming' data={data}/>
          <Carousel title='Top Rated' data={data}/>
        </ScrollView>
        <Button title="Cerrar Sesión" onPress={() => auth?.logout()} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, marginTop: 30, },
  body: { backgroundColor: Colors.color.background} ,
  title: { fontSize: 22, paddingTop: 15, paddingLeft: 15, color:Colors.color.white}
});