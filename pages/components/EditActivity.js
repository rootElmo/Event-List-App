import React, { useState, useEffect } from 'react'
import { View, Text, Modal, StyleSheet } from 'react-native'
import { Button, Icon, Input } from 'react-native-elements'
import DatePicker from 'react-native-datepicker';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('eventdb.db');

export default function EditActivity(props) {

    const [modalVis, setModalVis] = useState(false)
    const [actDate, setActDate] = useState(props.date);
    const [eventDesc, setEventDesc] = useState(props.description);
    const [activity, setActivity] = useState(props.event);
    const [actPlace, setActPlace] = useState(props.place);
    const [eventId, setEventId] = useState(props.id)

    useEffect(() => {

    }, [])

    const handlePress = () => {
        setModalVis(false)
    }

    const updateItem = () => {
        props.updateItem(activity, actDate, eventDesc, actPlace, eventId)
        updateParent()
        setModalVis(false)
    }

    const updateParent = () => {
        props.updateParent('Update parent');
    }

    return (
        <View>
            <Icon
                name="edit"
                onPress={() => setModalVis(true)}
                containerStyle={styles.iconContainer}
                iconStyle={styles.icon}
            />
            <Modal
                visible={modalVis}
                animationType='fade'
            >
                <View style={
                    {
                        flex: 1,
                        backgroundColor: 'white',
                        justifyContent: 'center',
                        padding: 5,
                    }
                }>
                    <Input
                        label="Activity"
                        placeholder="Insert activity title"
                        value={activity}
                        onChangeText={(activity) => setActivity(activity)}
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
                        label="Description"
                        placeholder="Insert event description"
                        multiline
                        numberOfLines={1}
                        value={eventDesc}
                        onChangeText={(eventDesc) => setEventDesc(eventDesc)}
                        containerStyle={
                            {
                                paddingTop: 20,
                            }
                        }
                    />

                    <Input
                        label="Place"
                        placeholder="Insert event place"
                        value={actPlace}
                        onChangeText={(actPlace) => setActPlace(actPlace)}
                        containerStyle={
                            {
                                paddingTop: 20,
                            }
                        }
                    />
                    <View style={
                        {
                            justifyContent: 'center',
                            paddingTop: 40,
                        }
                    }>
                        <Button
                            title="Update"
                            onPress={() => updateItem()}
                            buttonStyle={styles.modalButton}
                        />

                        <Button
                            title="Close"
                            onPress={() => setModalVis(false)}
                            buttonStyle={styles.modalButton}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
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
    modalButton: {
        width: '100%',
        marginTop: 20,
        height: 60,
        backgroundColor: 'lightblue'
    },
});