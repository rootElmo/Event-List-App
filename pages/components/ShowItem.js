import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ShowItem(props) {
    return (
        <View>
            <Text style={styles.titleText}>
                {props.itemTitle}
            </Text>
            <Text style={styles.itemText}>
                {props.itemContent}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'grey',
        paddingTop: 20,
        left: 20,
        alignSelf: 'flex-start'
    },
    itemText: {
        fontSize: 14,
        color: 'grey',
        left: 26,
        alignSelf: 'flex-start',
        paddingTop: 5,
        width: '90%',
        
    }
});