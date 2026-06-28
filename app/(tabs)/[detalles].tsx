import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { Dimensions, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import { TextInfo } from '../components/TextInfo';
import { Thumbnail } from '../components/Thumbnail';
import { Colors } from '../theme/theme';
import { allMovies } from './index';

const { width } = Dimensions.get('window');
const VIDEO_HEIGHT = 210;

export default function DetallesScreen() {
    const router = useRouter();
    const navigation = useNavigation(); // el controlador de navegación nativa
    const { detalles } = useLocalSearchParams<{ detalles: string }>();
    
    const movie = allMovies.find((m) => m.id === detalles);

    if (!movie) {
        return null;
    }

    const getYouTubeId = (url: string) => {
        if (!url) return null;
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const videoId = getYouTubeId(movie.videoUrl);

    return (
        <View style={styles.screen}>
            
            <View style={styles.videoContainer}>
                {videoId ? (
                    <YoutubePlayer
                        height={VIDEO_HEIGHT}
                        width={width}
                        play={true}
                        videoId={videoId}
                    />
                ) : (
                    <View style={[styles.videoPlaceholder, { height: VIDEO_HEIGHT }]} />
                )}

                {/*  Cambiado a navigation.goBack() para forzar el retorno a la pantalla previa */}
                <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Text style={styles.navText}>← Back</Text>
                </Pressable>
                <Pressable style={styles.heartButton} onPress={() => { /* Sin función todavía */ }}>
                    <Text style={styles.heartIcon}>❤️</Text>
                </Pressable>
            </View>

            <ScrollView style={styles.scrollBody} showsVerticalScrollIndicator={false}>
                
                <View style={styles.titleContainer}>
                    <Text style={styles.movieTitle} numberOfLines={2} ellipsizeMode="tail">
                        {movie.title}
                    </Text>
                </View>

                <View style={styles.metadataRow}>
                    <View style={styles.metaItem}><TextInfo text={movie.rating?.toString()} name="star" /></View>
                    <View style={styles.metaItem}><TextInfo text={movie.year?.toString()} name="calendar-outline" /></View>
                    <View style={styles.metaItem}><TextInfo text={movie.language} name="information-circle-outline" /></View>
                </View>

                <View style={styles.synopsisContainer}>
                    <Text style={styles.synopsisText}>{movie.sinopsis}</Text>
                </View>

            </ScrollView>

            <View style={styles.posterAbsoluteContainer} pointerEvents="none">
                <Thumbnail url={movie.imageUrl} />
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.color.background,
    },
    videoContainer: {
        width: width,
        height: VIDEO_HEIGHT + 60, 
        paddingTop: 60, 
        backgroundColor: '#000',
        zIndex: 1,
    },
    videoPlaceholder: {
        backgroundColor: '#000',
        width: '100%',
    },
    backButton: {
        position: "absolute",
        top: 72, 
        left: 16,
        backgroundColor: "rgba(0,0,0,0.6)",
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 6,
        zIndex: 10,
    },
    heartButton: {
        position: "absolute",
        top: 72, 
        right: 16, 
        backgroundColor: "rgba(0,0,0,0.6)",
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 6,
        zIndex: 10,
    },
    heartIcon: {
        fontSize: 14,
    },
    navText: {
        color: Colors.color.white,
        fontSize: 14,
        fontWeight: "bold",
    },
    scrollBody: {
        flex: 1,
        zIndex: 5,
    },
    titleContainer: {
        paddingRight: 15,
        paddingTop: 40,      
        paddingBottom: 10,
        marginLeft: 135,   
        minHeight: 85, 
    },
    movieTitle: {
        fontSize: 22,
        color: Colors.color.white,
        fontWeight: 'bold',
    },
    posterAbsoluteContainer: {
        position: 'absolute',
        top: (VIDEO_HEIGHT + 60) - 100, 
        left: 15,
        width: 150,
        height: 250,
        zIndex: 99, 
        transform: [{ scale: 0.65 }],
        transformOrigin: 'top left', 
    },
    metadataRow: {
        flexDirection: 'row', 
        alignItems: 'center',
        paddingHorizontal: 5,
        marginTop: 15, 
        marginBottom: 10,
    },
    metaItem: {
        marginRight: -12, 
    },
    synopsisContainer: {
        paddingHorizontal: 15,
        marginTop: 10,
        marginBottom: 30,
    },
    synopsisText: {
        fontSize: 15,
        color: Colors.color.white,
        lineHeight: 22,
        opacity: 0.9,
    },
});