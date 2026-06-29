import { Slot, useRouter, useSegments } from 'expo-router';
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext<{ user: any; login: (userData: any) => void; logout: () => void } | null>(null);

export function useAuth() {
  return useContext(AuthContext);
}
export let userId: string;

export default function RootLayout() {
  const [user, setUser] = useState<any>(null);
  const [isNavigationReady, setIsNavigationReady] = useState(false);
  const segments = useSegments();
  const router = useRouter();

  const login = (userData:any) => setUser(userData);
  const logout = () => setUser(null);

  // Efecto 1: Avisa cuando el layout ya se montó en el primer renderizado
  useEffect(() => {
    setIsNavigationReady(true);
  }, []);

  userId = user;
  // Efecto 2: Controla la redirección condicional
  useEffect(() => {
    if (!isNavigationReady) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!user && !inAuthGroup) {
      router.replace('/(auth)/logIn');
    } else if (user && inAuthGroup) {
      router.replace('/(tabs)');
    }
  }, [user, segments, isNavigationReady]);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <Slot />
    </AuthContext.Provider>
  );
}

// import { Stack } from "expo-router";

// export default function RootLayout() {
//   return <Stack />;
// }
