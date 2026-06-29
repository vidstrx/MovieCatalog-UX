import { forwardRef } from 'react';
import { StyleSheet, TextInput, type TextInputProps, View } from 'react-native';
import { Colors } from '../../theme/theme';

type inputProps = TextInputProps & {
    text: string,
    icono?: React.ReactNode,
};

export const Input = forwardRef<TextInput, inputProps>(({text, icono, ...rest}, ref) => {
    return (
        <View style={styles.view}>
            <TextInput ref={ref} style={styles.input} placeholder={text} placeholderTextColor={Colors.color.disabled} {...rest}/>
            {icono}
        </View>
    )
});

const styles = StyleSheet.create({
    view: {
        borderRadius: 17,
        borderColor: Colors.color.primary,
        borderWidth:2,
        padding: 10,
        marginVertical: 5,
        marginHorizontal: 10,
        height: 50,
        color: Colors.color.white,
        backgroundColor: Colors.color.background2,
        flexDirection: "row",
        alignItems: "center"
    },
    input: {
        flex: 1,
        paddingVertical: 0,
        fontSize: 17,
        color: Colors.color.white,
    }
});