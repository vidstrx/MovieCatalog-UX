import { Text, StyleSheet, Pressable, type PressableProps } from 'react-native';
import {Colors} from '../../theme/theme';

type btnProps = PressableProps & {
    text: string;
    onClick?: () => void;
};

export function Button ({text, onClick, ...rest}: btnProps){
    return (
        <Pressable style={({pressed}) => [
            {backgroundColor: pressed ? '#255CBA':'#15448F'}, 
            styles.normal,]} 
            onPress={onClick}
            {...rest}>
            <Text style={styles.text}>{text}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    normal: {
        borderRadius: 8,
        padding: 12,
        margin: 10
    },
    text: {
        color: Colors.color.white,
        fontSize: 15,
        fontWeight: 'bold',
        alignSelf: 'center',
    }
});