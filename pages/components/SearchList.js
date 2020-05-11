import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { Input, Button, Icon } from 'react-native-elements';

export default function SearchList(props) {

    const [modalVis, setModalVis] = useState(false)
    const [activity, setActivity] = useState('')
    const [actDate, setActDate] = useState('')

    return (
        <View>
            <Button
                title="SEARCH"
                buttonStyle={styles.buttonStyle}
                onPress={() => setModalVis(true)}
            />

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
                            borderRadius: 5,
                            paddingHorizontal: 5,
                        }
                    }>

                        <Input
                            label="Activity"
                            placeholder="Insert activity title"
                            value={activity}
                            onChangeText={(activity) => setActivity(activity)}
                            labelStyle={
                                {
                                    color:'grey'
                                }
                            }
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

                        <View style={
                            {
                                flexDirection: 'row',
                                justifyContent: 'flex-end',
                                margintop: 5,
                            }
                        }>

                        </View>
                        <View style={
                            {
                                paddingTop: 40,
                            }
                        }>
                        <Button
                            title='SEARCH'
                            buttonStyle={styles.buttonStyle}
                        />

                        <Button
                            title='CLOSE'
                            onPress={() => setModalVis(false)}
                            buttonStyle={styles.buttonStyle}
                        />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonStyle: {
        height: 60,
        backgroundColor: 'lightblue',
        marginTop: 5,
        justifyContent: 'space-evenly',
        paddingHorizontal: 120,
    },
});