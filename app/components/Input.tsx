import { forwardRef } from 'react';
import { TextInput, StyleSheet, type TextInputProps } from 'react-native';
import {Colors} from '../theme/theme'

type inputProps = TextInputProps & {
    text: string,
};

export const Input = forwardRef<TextInput, inputProps>(({text, ...rest}, ref) => {
    return (
        <TextInput ref={ref} style={styles.input} placeholder={text} placeholderTextColor={Colors.color.disabled} {...rest}/>
    );
});

const styles = StyleSheet.create({
    input: {
        borderRadius: 17,
        borderColor: Colors.color.primary,
        borderWidth:2,
        padding: 10,
        marginVertical: 5,
        marginHorizontal: 10,
        height: 50,
        color: Colors.color.white,
        fontSize: 17,
        backgroundColor: Colors.color.background2,
    },
});