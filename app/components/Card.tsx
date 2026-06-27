import { Text, StyleSheet, View, Pressable} from "react-native";
import {Thumbnail} from './Thumbnail';
import {TextInfo} from './TextInfo';
import { Colors } from '../theme/theme';

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
            <View style={styles.info}>
                <Text style={styles.title}>{title}</Text>
                <TextInfo text={rating} name="star"/>
                <TextInfo text={language} name="information-circle-outline"/>
                <TextInfo text={year} name="calendar-outline"/>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {flexDirection: 'row', marginHorizontal: 10},
    info: {marginHorizontal:10,},
    title: {fontSize:22, color: Colors.color.white, fontWeight:'bold', paddingTop: 5},
})