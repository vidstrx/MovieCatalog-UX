import { FlatList, StyleSheet, Text, View } from "react-native";
import { Colors } from '../theme/theme';
import { Thumbnail, type tnProps } from './Thumbnail';

type carouselProps = {
    title?: string | undefined,
    data?: tnProps[]
    onItemPress?: (id: string) => void
}

export function Carousel({title, data, onItemPress}: carouselProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <FlatList data={data} 
                renderItem={({item}) => (
                    <Thumbnail 
                        id={item.id} 
                        url={item.url} 
                        onClick={() => onItemPress && onItemPress(item.id || '')}
                    /> 
                )}
                keyExtractor={(item) => item.id }
                horizontal={true} showsHorizontalScrollIndicator={false}
                contentInsetAdjustmentBehavior="automatic"/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {marginVertical:10, marginHorizontal: 10},
    title: {fontSize:20, color: Colors.color.white},
})