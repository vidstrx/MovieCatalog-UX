import { Tabs } from 'expo-router';
import {Ionicons} from '@expo/vector-icons';
import { Colors } from '../theme/theme';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false, tabBarStyle:{backgroundColor:'#0F0F0F', }, tabBarActiveBackgroundColor:Colors.color.background, }}>
      <Tabs.Screen name="index" options={{ 
        title: 'Home',
        tabBarIcon: ({color, focused}) => (
          <Ionicons name={focused? 'home':'home-outline'} color={color} size={24} />
        ),
      }} />
      <Tabs.Screen name="about" options={{ 
        title: 'About',
        tabBarIcon: ({color, focused}) => (
          <Ionicons name={focused? 'search':'search-outline'} color={color} size={24} />
        )
      }} />
    </Tabs>
  );
}
