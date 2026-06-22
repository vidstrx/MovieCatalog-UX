import { View, Text, Button, StyleSheet } from 'react-native';
import { useAuth } from '../_layout';

export default function HomeScreen() {
  const auth = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Bienvenido al Home!</Text>
      <Button title="Cerrar Sesión" onPress={() => auth?.logout()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 22 }
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
