import React, { useState, useEffect } from 'react';
import { View, Button, Text } from 'react-native'; 

export default function NavigationPlaceholderPage(props){

    navigationOptions = { title: "Navigation page"};
    const {navigate} = props.navigation;

    return(
        <View style={{flexDirection: 'column', height: 100, justifyContent: 'space-evenly'}}>
            <Button 
                title="List Page"
                onPress={() => navigate('List')} title="List"
            />
            <Button 
                title="Today's activities"
                onPress={() => navigate('CurrentActivities')} title="Today's Activities"
            />
        </View>
    );
}

NavigationPlaceholderPage.navigationOptions = ({navigate}) => ({title: "Navigation Page"})