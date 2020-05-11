import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { Button, Input } from 'react-native-elements';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('eventdb.db');

export default function AddEventPage(props) {

    const [actDate, setActDate] = useState('');
    const [eventDesc, setEventDesc] = useState('');
    const [activity, setActivity] = useState('');
    const [actPlace, setActPlace] = useState('');
    const [modalVis, setModalVis] = useState(false);
    const [modalMsg, setModalMsg] = useState('');
    const [modalErrMsg, setModalErrMsg] = useState(false);

    useEffect(() => {
        setDefaultDates();
    }, [])

    const saveItem = () => {

        if (activity.length < 1 || eventDesc.length < 1 || actPlace.length < 1) {
            setModalMsg('Please check that all fields are filled');
            setModalErrMsg(true);
            setModalVis(true);
        } else {
            db.transaction(tx => {
                tx.executeSql('insert into activityevent (activity, actdate, description, place) values (?, ?, ?, ?);',
                    [activity, actDate, eventDesc, actPlace]);
            }, null,
                onDbSuccess()
            )
        }
    }

    const onDbSuccess = () => {
        setModalMsg('Event added successfully!')
        setModalVis(true)
    }

    const onModalClose = () => {
        setModalVis(false);
        if (modalErrMsg == false) {
            navigate('List');
        }
    }

    const setDefaultDates = () => {
        let curDom = new Date().getDate();
        let curMon = new Date().getMonth();
        let curYear = new Date().getFullYear();
        curMon = curMon + 1;
        if (curDom < 10) {
            toString(curDom);
            curDom = '0' + curDom;
        }
        setActDate(curYear + '-' + curMon + '-' + curDom);
    }

    navigationOptions = { title: 'AddEvent', };
    const { navigate } = props.navigation;

    return (
        <View style={{ flex: 1, paddingTop: 20, alignItems: 'center' }}>
            <View style={{ width: '100%' }}>
                <View style={{
                    padding: 5,
                }}>
                    <Input
                        label="Activity title"
                        placeholder="Insert title"
                        labelStyle={{ color: 'grey' }}
                        onChangeText={(activity) => setActivity(activity)}
                        value={activity}
                    />
                    <Text style={
                        {
                            fontSize: 16,
                            fontWeight: 'bold',
                            color: 'grey',
                            left: 10,
                            paddingTop: 20
                        }
                    }>
                        Activity date
                    </Text>
                    <DatePicker
                        style={{ width: '100%', marginTop: 10 }}
                        mode="date"
                        date={actDate}
                        onDateChange={(actDate) => setActDate(actDate)}
                        format="YYYY-MM-DD"
                        showIcon={false}
                    />
                    <Input
                        multiline
                        numberOfLines={1}
                        label="Activity description"
                        placeholder="Insert description"
                        onChangeText={(eventDesc) => setEventDesc(eventDesc)}
                        value={eventDesc}
                        labelStyle={
                            {
                                color: 'grey'
                            }
                        }
                        containerStyle={
                            {
                                paddingTop: 20
                            }
                        }
                    />
                    <Input
                        label="Place"
                        placeholder="Inset place for activity"
                        onChangeText={(actPlace) => setActPlace(actPlace)}
                        value={actPlace}
                        labelStyle={
                            {
                                color: 'grey'
                            }
                        }
                        containerStyle={
                            {
                                paddingTop: 20
                            }
                        }
                    />
                </View>

                <Button
                    buttonStyle={styles.buttonStyle}
                    title="ADD"
                    color='lightblue'
                    onPress={saveItem}
                />
            </View>

            <Modal
                visible={modalVis}
                transparent={true}
                animationType='fade'
            >
                <View style={
                    {
                        flex: 1,
                        padding: '5%',
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        justifyContent: 'center'
                    }
                }>
                    <View style={
                        {
                            backgroundColor: 'white',
                            paddingVertical: 20,
                            justifyContent: 'center',
                            borderRadius: 5
                        }
                    }>

                        <Text style={
                            {
                                fontSize: 18,
                                color: 'grey',
                                left: 10,
                                paddingTop: 20,
                                alignSelf: 'center'
                            }
                        }>{modalMsg}
                        </Text>

                        <Button
                            title='Close'
                            onPress={() => onModalClose()}
                            buttonStyle={styles.buttonStyle}
                            color='lightblue'
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
}

AddEventPage.navigationOptions = ({ navigate }) => (
    {
        title: "Add a new event",
        headerTitleStyle: {
            color: 'white',
        },
        headerStyle: {
            backgroundColor: '#63b4cf',
        }
    }
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',/*
     justifyContent: 'center',*/

    },
    listcontainer: {
        flexDirection: 'row',
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        height: 60,
        paddingHorizontal: '2%',
    },
    listButtons: {
        fontSize: 18,
        color: '#0000ff',
        margin: 5,
        color: 'grey'
    },
    listText: {
        fontSize: 14,
        width: 200,
        color: 'grey'
    },
    buttonStyle: {
        height: 60,
        backgroundColor: 'lightblue',
        justifyContent: 'space-evenly',
        paddingHorizontal: 5,
        marginHorizontal: 5,
        marginTop: 20
    },
});