import { Text, StyleSheet, View } from "react-native";
import { Colors } from '../../theme/theme';
import { Ionicons } from '@expo/vector-icons';

type textInfoProps = {
    text: string | undefined,
    name?: 'star-outline' | 'calendar-outline' | 'star' | 'information-circle-outline' | undefined,
}

export function TextInfo({text, name}: textInfoProps) {
    const color = name === "star" ? Colors.color.rating : Colors.color.white;
    return (
        <View style={styles.container}>
            {name && <Ionicons style={styles.icon} name={name} color={color}/>}
            <Text style={[styles.text, {color:color}]}>{text}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {flexDirection: 'row', marginVertical:8, marginHorizontal: 10},
    icon: {fontSize: 20, paddingVertical: 5},
    text: {fontSize: 20, paddingVertical: 2, paddingHorizontal: 10}
})