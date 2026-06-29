import { Pressable, Image, type ImageProps, type PressableProps, StyleSheet, View} from "react-native";

export type tnProps = ImageProps & PressableProps & {
    id?: string | undefined,
    url: string | undefined,
    onClick?: () => void
}

export function Thumbnail({id, url, onClick, ...rest}: tnProps) {
    return (
        <Pressable id={id} style={styles.button} onPress={onClick} {...rest}>
            <Image style={styles.image} source={{uri: url}} {...rest}/>
        </Pressable> 
    );
};

const styles = StyleSheet.create({
    button: {width:150, height:250, marginVertical:10, marginHorizontal: 5,},
    image: {width: '100%', height: '100%', resizeMode:'cover', borderRadius: 10},
})