import { Text, Button, StyleSheet, ScrollView } from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import {Input} from '../components/Input';
import {Colors} from '../theme/theme';
import {Thumbnail} from '../components/Thumbnail';
import { useAuth } from '../_layout';

export default function HomeScreen() {
  const auth = useAuth();

  return (
    <SafeAreaProvider style={styles.body}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>What do you want to watch?</Text>
        <Input text='Search'/>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <Thumbnail url='https://picsum.photos/150'/>
          <Thumbnail url='https://picsum.photos/150'/>
          <Thumbnail url='https://picsum.photos/150'/>
          <Thumbnail url='https://picsum.photos/150'/>
          <Thumbnail url='https://picsum.photos/150'/>
          <Thumbnail url='https://picsum.photos/150'/>
        </ScrollView>
        <Button title="Cerrar Sesión" onPress={() => auth?.logout()} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'column', marginTop: 30, },
  body: { backgroundColor: Colors.color.background} ,
  title: { fontSize: 22, paddingTop: 15, paddingLeft: 15, color:Colors.color.white}
});


// import { Text, View, StyleSheet } from "react-native";

// export default function Index() {
//   return (
//     <View style={styles.container}>
//       <Text>Edit src/app/index.tsx to edit this screen.</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: '#F54927',
//   },
// });
