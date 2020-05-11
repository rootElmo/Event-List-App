import React, { useState, useEffect } from 'react';
import { View, Text, Modal, StyleSheet } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import * as SQLite from 'expo-sqlite';
import EditActivity from './EditActivity';

const db = SQLite.openDatabase('eventdb.db');

export default function ShowActivity(props) {

    const [modalVis, setModalVis] = useState(false);
    const [actDate, setActDate] = useState('');
    const [eventDesc, setEventDesc] = useState('');
    const [activity, setActivity] = useState('');
    const [actPlace, setActPlace] = useState('');
    const [delModalVis, setDelModalVis] = useState(false);
    const [eventId, setEventId] = useState(props.eventId)

    useEffect(() => {

    }, []);

    const handleIconPress = () => {
        setModalVis(true)
        setActDate(props.date)
        setEventDesc(props.description)
        setActivity(props.actv)
        setActPlace(props.place)
    }

    const updateParent = (text) => {
        console.log(text)
        res => {
            setActDate(props.date)
            setEventDesc(props.description)
            setActivity(props.actv)
            setActPlace(props.place)
        }
    }

    const deleteItem = () => {
        props.deleteFunc(eventId)
        onDbSuccess();
    }

    const onDbSuccess = () => {
        setDelModalVis(false);
        setModalVis(false);
    }

    const handleClose = () => {
        setModalVis(false);
    }

    const ShowItem = (titleText, itemContent) => {
        return (
            <View>
                <Text style={styles.titleText}>
                    {titleText}
                </Text>
                <Text style={styles.itemText}>
                    {itemContent}
                </Text>
            </View>
        );
    }

    const DeleteModal = () => {

        return (
            <View>
                <Icon
                    name='delete'
                    containerStyle={styles.iconContainer}
                    iconStyle={styles.icon}
                    onPress={() => setDelModalVis(true)}
                />
                <Modal
                    visible={delModalVis}
                    transparent={true}
                    animationType='fade'
                >
                    <View style={
                        {
                            flex: 1,
                            padding: '5%',
                            justifyContent: 'center',
                            backgroundColor: 'rgba(0,0,0,0.5)',
                        }
                    }>
                        <View style={
                            {
                                backgroundColor: 'white',
                                paddingVertical: 5,
                                borderRadius: 5,
                            }
                        }>
                            <Text style={{
                                alignSelf: 'center',
                                fontSize: 18,
                                color: 'grey'
                            }}>
                                Are you sure?
                            </Text>
                            <View style={
                                {
                                    justifyContent: 'center'
                                }
                            }>
                                <Button
                                    title='YES'
                                    buttonStyle={styles.buttonStyle}
                                    onPress={() => deleteItem()}
                                />

                                <Button
                                    title='NO'
                                    buttonStyle={styles.buttonStyle}
                                    onPress={() => setDelModalVis(false)}
                                />
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }

    return (
        <View>
            <Icon
                name="visibility"
                onPress={() => handleIconPress()}
                color="#757575"
                containerStyle={{ left: 110 }}
            >
            </Icon>
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
                            paddingBottom: 20,
                            paddingTop: 5,
                            justifyContent: 'center',
                            borderRadius: 5
                        }
                    }>
                        <View style={
                            {
                                flexDirection: 'row',
                                justifyContent: 'flex-end',
                                margintop: 5,
                            }
                        }>
                            <EditActivity
                                event={activity}
                                date={actDate}
                                id={eventId}
                                place={actPlace}
                                description={eventDesc}
                                updateItem={props.updateFunc}
                                updateParent={updateParent}
                            />

                            <DeleteModal />

                        </View>

                        {ShowItem('Title', activity)}

                        {ShowItem('Description', eventDesc)}

                        {ShowItem('Date', actDate)}

                        {ShowItem('Place', actPlace)}

                        <Button
                            title='Close'
                            onPress={() => handleClose()}
                            buttonStyle={styles.buttonStyle}
                            color='lightblue'
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
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
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'grey',
        paddingTop: 20,
        left: 20,
        alignSelf: 'flex-start'
    },
    iconContainer: {
        borderRadius: 5,
        alignSelf: 'flex-end',
        right: 5,
        backgroundColor: '#f5f5f5',
        padding: 10,
        marginLeft: 5,
    },
    icon: {
        color: '#757575'
    },
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