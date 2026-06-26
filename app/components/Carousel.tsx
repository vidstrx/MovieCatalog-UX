import { FlatList, Text, StyleSheet, View} from "react-native";
import {Thumbnail, type tnProps} from './Thumbnail';
import { Colors } from '../theme/theme';

type carouselProps = {
    title?: string | undefined,
    data?: tnProps[]
}

export function Carousel({title, data}: carouselProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <FlatList data={data} 
                renderItem={({item}) => <Thumbnail id={item.id} url={item.url}/> }
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