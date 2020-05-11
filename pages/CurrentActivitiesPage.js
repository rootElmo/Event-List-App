import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('eventdb.db');

export default function CurrentActivitiesPage(props) {
    const [thisDate, setThisDate] = useState('');
    const [events, setEvents] = useState([]);

    useEffect(() => {
        setDefaultDates();
    }, []);

    const setDefaultDates = () => {
        let curDom = new Date().getDate();
        let curMon = new Date().getMonth();
        let curYear = new Date().getFullYear();
        curMon = curMon + 1;
        if (curDom < 10) {
            toString(curDom);
            curDom = '0' + curDom;
        }
        setThisDate(curYear + '-' + curMon + '-' + curDom);
        updateList();
    }

    const updateList = () => {
        db.transaction(tx => {
            tx.executeSql('select * from event where actdate like ?;', [thisDate], (_, { rows }) =>
                setEvents(rows._array)
            );
        });
    }

    const listSeparator = () => {
        return (
            <View
                style={{
                    height: 5,
                    width: "80%",
                    backgroundColor: "#fff",
                    marginLeft: "10%"
                }}
            />
        );
    };

    navigationOptions = { title: "Today's Activities" };
    const { navigate } = props.navigation;

    return (
        <View style={{flex: 1}}>
            <View style={styles.container}>
                <Text>This is the page where today's activities are</Text>
                <Text>{thisDate}</Text>
                <Button
                    title="update"
                    onClick={updateList}
                />
                <FlatList
                    style={{ marginLeft: "5%" }}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) =>

                        <View style={styles.listcontainer}>
                            <Text style={styles.listText}>
                                {item.actdate}, {item.activity}
                            </Text>

                        </View>}

                    data={events}
                    ItemSeparatorComponent={listSeparator}
                />
                <Button
                    title="placeholder button"
                />
            </View>
        </View>
    );
}

CurrentActivitiesPage.navigationOptions = ({ navigate }) => ({ title: "Today's Activities" });

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',

    },
    listcontainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    listButtons: {
        fontSize: 18,
        color: '#0000ff',
        margin: 5
    },
    listText: {
        fontSize: 18,
        width: 200,
    }
});