import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { TextInfo } from '../components/TextInfo';
import { Colors } from '../theme/theme';

export default function DetailScreen() {
  const { detalles } = useLocalSearchParams<{ detalles: string }>();
  const router = useRouter();
  const movieMock = {
    title: `Madame Web (ID: ${detalles})`,
    backdropUrl: 'https://picsum.photos/400/250',
    posterUrl: 'https://picsum.photos/150/250',
    rating: '5.57',
    year: '2024',
    runtime: '727',
    language: 'en',
    synopsis: 'Forced to confront revelations about her past, paramedic Cassandra Webb forges a relationship with three young women destined for powerful futures... if they can all survive a deadly present.'
  };

  return (
    <SafeAreaProvider style={styles.body}>
      <SafeAreaView style={styles.container}>
        
        <View style={styles.header}>
          <Pressable onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={28} color={Colors.color.white} />
          </Pressable>
          <Text style={styles.headerTitle}>Detail</Text>
          <Ionicons name="heart-outline" size={28} color={Colors.color.white} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.backdropContainer}>
            <Image source={{ uri: movieMock.backdropUrl }} style={styles.backdrop} />
            <View style={styles.playButton}>
              <Ionicons name="play-circle" size={64} color="red" />
            </View>
            <View style={styles.ratingBadge}>
              <Ionicons name="star" size={16} color={Colors.color.rating} />
              <Text style={styles.ratingText}>{movieMock.rating}</Text>
            </View>
          </View>
          <View style={styles.mainInfoContainer}>
            <Image source={{ uri: movieMock.posterUrl }} style={styles.poster} />
            <Text style={styles.movieTitle}>{movieMock.title}</Text>
          </View>

          <View style={styles.metadataRow}>
            <TextInfo text={movieMock.year} name="calendar-outline" />
            <TextInfo text={`${movieMock.runtime} min`} name="information-circle-outline" />
            <TextInfo text={movieMock.language.toUpperCase()} name="information-circle-outline" />
          </View>

          <View style={styles.synopsisContainer}>
            <Text style={styles.synopsisText}>{movieMock.synopsis}</Text>
          </View>
        </ScrollView>

      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  body: { flex: 1, backgroundColor: Colors.color.background },
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  headerTitle: { fontSize: 20, color: Colors.color.white, fontWeight: 'bold' },
  backdropContainer: { width: '100%', height: 220, position: 'relative', justifyContent: 'center', alignItems: 'center' },
  backdrop: { width: '100%', height: '100%', resizeMode: 'cover', opacity: 0.7 },
  playButton: { position: 'absolute' },
  ratingBadge: {
    position: 'absolute',
    bottom: 10,
    right: 15,
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
    alignItems: 'center',
  },
  ratingText: { color: Colors.color.rating, marginLeft: 5, fontWeight: 'bold' },
  mainInfoContainer: { flexDirection: 'row', paddingHorizontal: 15, marginTop: -40, alignItems: 'flex-end' },
  poster: { width: 110, height: 160, borderRadius: 10, borderWidth: 2, borderColor: Colors.color.background },
  movieTitle: { flex: 1, fontSize: 22, color: Colors.color.white, fontWeight: 'bold', marginLeft: 15, marginBottom: 10 },
  metadataRow: { flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: 10, marginTop: 15 },
  synopsisContainer: { paddingHorizontal: 20, marginTop: 20 },
  synopsisText: { color: Colors.color.white, fontSize: 16, lineHeight: 24, textAlign: 'justify' },
});