import { Text, StyleSheet, View, Pressable} from "react-native";
import {Thumbnail} from '../molecules/Thumbnail';
import {TextInfo} from '../atoms/TextInfo';
import { Colors } from '../../theme/theme';
import { SafeAreaProvider } from "react-native-safe-area-context";

type cardProps = {
    id?: string | undefined,
    title?: string | undefined,
    rating?: string | undefined,
    language?: string | undefined,
    year?: string | undefined,
    url?: string | undefined,
    onClick?: () => void
}

export function Card({id, title, rating, language, year, url, onClick}: cardProps) {
    return (
        <Pressable id={id} style={styles.container} onPress={onClick}>
            <Thumbnail url={url} onClick={onClick}/>
                <SafeAreaProvider style={styles.info}>
                    <Text style={styles.title} numberOfLines={3} ellipsizeMode="tail">{title}</Text>
                    <TextInfo text={rating} name="star"/>
                    <TextInfo text={language} name="information-circle-outline"/>
                    <TextInfo text={year} name="calendar-outline"/>
                </SafeAreaProvider>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {flexDirection: 'row', marginHorizontal: 10},
    info: {flex: 1, marginHorizontal:10,},
    title: {fontSize:22, color: Colors.color.white, fontWeight:'bold', paddingTop: 5},
})