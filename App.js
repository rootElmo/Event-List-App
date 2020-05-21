import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import * as SQLite from 'expo-sqlite';
import DatePicker from 'react-native-datepicker'/*
import EditActivity from './pages/components/EditActivity';*/
import ListPage from './pages/ListPage.js';
import {createAppContainer} from'react-navigation';
import {createStackNavigator} from'react-navigation-stack'
import NavigationPlaceholderPage from './pages/NavigationPlaceholderPage.js';
import CurrentActivitiesPage from './pages/CurrentActivitiesPage.js';
import AddEventPage from './pages/AddEventPage.js';

import AppStyles from './Styles/EventListStyles';

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

  // Update eventlist
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
        style={ AppStyles.EventListSeparator/*{
          height: 5,
          width: "80%",
          backgroundColor: "#fff",
          marginLeft: "10%"
        }*/}
      />
    );
  };

  return (
      <AppContainer />
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
