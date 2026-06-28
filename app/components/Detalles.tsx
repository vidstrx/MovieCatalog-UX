import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Button } from "../components/Button";
import { Carousel } from "../components/Carousel";
import { TextInfo } from "../components/TextInfo";
import { Thumbnail } from "../components/Thumbnail";
import { Colors } from "../theme/theme";
type MovieDetailProps = {
    id?: string;
    title?: string;
    rating?: string;
    language?: string;
    year?: string;
    synopsis?: string;
    url?: string;
    isFavorite?: boolean;
    similar?: { id: string; url: string | undefined }[];
    onBack?: () => void;
    onFavorite?: () => void;
    onTrailer?: () => void;
};

const MOCK: MovieDetailProps = {
    id: "1",
    title: "Quantum Horizon",
    rating: "8.4",
    language: "English",
    year: "2024",
    synopsis:
        "When physicist Dr. Elena Voss discovers a rift in spacetime beneath the Antarctic ice, she must race against a covert government agency to prevent the collapse of parallel realities. A breathtaking journey across dimensions where every choice echoes through time.",
    url: undefined,
    isFavorite: false,
    similar: [
        { id: "2", url: undefined },
        { id: "3", url: undefined },
        { id: "4", url: undefined },
    ],
};

export function MovieDetailScreen({
    title      = MOCK.title,
    rating     = MOCK.rating,
    language   = MOCK.language,
    year       = MOCK.year,
    synopsis   = MOCK.synopsis,
    url        = MOCK.url,
    isFavorite = MOCK.isFavorite,
    similar    = MOCK.similar,
    onBack,
    onFavorite,
    onTrailer,
}: MovieDetailProps) {
    return (
        <ScrollView style={styles.screen} showsVerticalScrollIndicator={false}>

            <View style={styles.heroContainer}>
                <Thumbnail url={url} />

                <Pressable style={styles.backButton} onPress={onBack}>
                    <Text style={styles.navText}>← Back</Text>
                </Pressable>

                <Pressable style={styles.favoriteButton} onPress={onFavorite}>
                    <Text style={styles.navText}>
                        {isFavorite ? "♥ Saved" : "♡ Save"}
                    </Text>
                </Pressable>
            </View>
            <Text style={styles.title}>{title}</Text>

            <TextInfo text={rating}   name="star" />
            <TextInfo text={language} name="information-circle-outline" />
            <TextInfo text={year}     name="calendar-outline" />

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Synopsis</Text>
                <Text style={styles.synopsis}>{synopsis}</Text>
            </View>

            <Button text="▶  Watch Trailer" onClick={onTrailer} />

            <Carousel title="You may also like" data={similar} />

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.color.background,
    },

    heroContainer: {
        position: "relative",
    },
    backButton: {
        position: "absolute",
        top: 20,
        left: 16,
        backgroundColor: "rgba(0,0,0,0.5)",
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 6,
    },
    favoriteButton: {
        position: "absolute",
        top: 20,
        right: 16,
        backgroundColor: "rgba(0,0,0,0.5)",
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 6,
    },
    navText: {
        color: Colors.color.white,
        fontSize: 14,
        fontWeight: "bold",
    },

    title: {
        fontSize: 24,
        color: Colors.color.white,
        fontWeight: "bold",
        marginHorizontal: 10,
        marginTop: 10,
    },

    section: {
        marginHorizontal: 10,
        marginTop: 10,
    },
    sectionTitle: {
        fontSize: 20,
        color: Colors.color.white,
        fontWeight: "bold",
        marginBottom: 6,
    },
    synopsis: {
        fontSize: 15,
        color: Colors.color.white,
        lineHeight: 22,
        opacity: 0.8,
    },
});
