import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Button, FlatList, Modal } from 'react-native';
import * as SQLite from 'expo-sqlite';
import DatePicker from 'react-native-datepicker'/*
import EditActivity from './pages/components/EditActivity';*/
import ListPage from './pages/ListPage.js';
import{createAppContainer} from'react-navigation';
import{createStackNavigator} from'react-navigation-stack'
import NavigationPlaceholderPage from './pages/NavigationPlaceholderPage.js';
import CurrentActivitiesPage from './pages/CurrentActivitiesPage.js';
import AddEventPage from './pages/AddEventPage.js';


const db = SQLite.openDatabase('eventdb.db');

const MyApp= createStackNavigator({
    List:  {screen: ListPage},
    AddEvent: {screen: AddEventPage},
    Navigation: {screen: NavigationPlaceholderPage},
    CurrentActivities: {screen: CurrentActivitiesPage}
  }
);

const AppContainer = createAppContainer(MyApp);



export default function App() {
  const [activity, setActivity] = useState('');
  const [actDate, setActDate] = useState('');
  const [thisDate, setThisDate] = useState('');
  const [events, setEvents] = useState([]);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists event (id integer primary key not null, activity text, actdate text);');
    });
    updateList();
    setDefaultDates();

  }, []);

  const setModalVisible = (bool) => {
    setModalVis(bool);
  }

  const setDefaultDates = () => {
    let curDom = new Date().getDate();
    let curMon = new Date().getMonth();
    let curYear = new Date().getFullYear();
    setThisDate(curYear + '-' + curMon + '-' + curDom);
    setActDate(curYear + '-' + curMon + '-' + curDom);
  }

  // Save course
  const saveItem = () => {
    db.transaction(tx => {
        tx.executeSql('insert into event (activity, actdate) values (?, ?);', [activity, actDate]);    
      }, null, 
      updateList
    )
    setActivity('');
  }

  // Update courselist
  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from event;', [], (_, { rows }) =>
        setEvents(rows._array)
      ); 
    });
  }

  // Delete course
  const deleteItem = (id) => {
    db.transaction(
      tx => {
        tx.executeSql(`delete from event where id = ?;`, [id]);
      }, null, updateList
    )    
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

  return (
      <AppContainer />
/*

    <View style={{flex: 1, paddingTop: 20}}>
      <View style={styles.container}>
        <DatePicker
          style={{width:200, marginTop: 30}}
          mode="date"
          date={actDate}
          onDateChange={(actDate) => setActDate(actDate)}
          format="YYYY-MM-DD"
        />

        <TextInput placeholder='Activity' style={{ marginTop: 5, marginBottom: 5,  fontSize:18, width: 200, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(activity) => setActivity(activity)}
          value={activity}/>

        <View >
          <Button onPress={saveItem} title="Save" /> 
          <Button onPress={updateList} title="Update" /> 
        </View>

        <Text>Date to DB :{actDate}</Text>
        <Text>Today's date :{thisDate}</Text>
        <Text style={{marginTop: 30, fontSize: 20}}>Activities</Text>


        <FlatList 
          style={{marginLeft : "5%"}}
          keyExtractor={item => item.id.toString()} 
          renderItem={({item}) => 
          
          <View style={styles.listcontainer}><Text style={styles.listText}>{item.actdate}, {item.activity}</Text>
          
          <Text style={styles.listButtons} onPress={() => deleteItem(item.id)}> Delete</Text>

          <EditActivity id={item.id} activity={item.activity} date={item.actdate} today={thisDate}/>

          </View>} 

          data={events} 
          ItemSeparatorComponent={listSeparator} 
        />  

      </View>

      <Button title="Placeholder btn"/>

    </View>

*/  

  );
}

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