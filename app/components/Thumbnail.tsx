import { Pressable, Image, type ImageProps, type PressableProps, StyleSheet, View} from "react-native";

type tnProps = ImageProps & PressableProps & {
    url: string | undefined,
    onClick?: () => void
}

export function Thumbnail({url, onClick, ...rest}: tnProps) {
    return (
        <View style={styles.container}>
            <Pressable style={styles.button} onPress={onClick} {...rest}>
                <Image style={styles.image} source={{uri: url}} {...rest}/>
            </Pressable> 
        </View>
    );
};

const styles = StyleSheet.create({
    button: {width:150, height:250},
    image: {width: '100%', height: '100%', resizeMode:'cover', borderRadius: 10},
    container: {marginVertical:30, marginHorizontal: 20}
})