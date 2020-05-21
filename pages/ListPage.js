import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList} from 'react-native';
import * as SQLite from 'expo-sqlite';
import DatePicker from 'react-native-datepicker';
import { Icon, Button, Input } from 'react-native-elements';
import ShowActivity from './components/ShowActivity';
import EventListStyles from '../Styles/EventListStyles';


const db = SQLite.openDatabase('eventdb.db');

export default function ListPage(props) {
  const [activity, setActivity] = useState('');
  const [actDate, setActDate] = useState('');
  const [thisDate, setThisDate] = useState('');
  const [events, setEvents] = useState([]);
  const [queryAct, setQueryAct] = useState('');

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists activityevent (id integer primary key not null, activity text, actdate text, description text, place text);');
    });
    setDefaultDates();
  }, []);

  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from activityevent;', [], (_, { rows }) =>
        setEvents(rows._array)
      );
    });
  }

  const deleteItem = (id) => {
    db.transaction(
      tx => {
        tx.executeSql(`delete from activityevent where id = ?;`, [id]);
      }, null, res => updateList()
    )
  }

  const updateItem = (act, date, desc, place, id) => {
    db.transaction(
      tx => {
        tx.executeSql(`update activityevent set activity=?, actdate=?, description=?, place=? where id=?`,
          [act, date, desc, place, id]);
      }, null, res => searchList()
    )
  }

  const searchList = () => {
    if (activity.length < 1) {
      db.transaction(tx => {
        tx.executeSql('select * from activityevent where actdate like ?', [actDate], (_, { rows }) =>
          setEvents(rows._array)
        );
      });
    } else {
      db.transaction(tx => {
        tx.executeSql('select * from activityevent where activity like ? and actdate like ?', [queryAct, actDate], (_, { rows }) =>
          setEvents(rows._array)
        );
      });
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
    setThisDate(curYear + '-' + curMon + '-' + curDom);
    setActDate(curYear + '-' + curMon + '-' + curDom);
    updateList();
  }

  const setActivityFunc = (activity) => {
    setActivity(activity)
    setQueryAct(activity + '%')
  }

  const listSeparator = () => {
    return (
      <View
        style={EventListStyles.eventListSeparator}
      />
    );
  };

  const listEmptyFunc = () => {
    return (
      <View style={EventListStyles.emptyListContainer}>
        <Text style={{
          fontSize: 18,
          color: 'grey'
        }}>
          Nothing to display
          </Text>
      </View>
    );
  }

  const listFooter = () => {
    return (
      <View style={EventListStyles.eventListFooter}>
      </View>
    )
  }

  navigationOptions = { title: 'List', };
  const { navigate } = props.navigation;

  return (
    <View style={EventListStyles.pageContainer}>
      <View style={EventListStyles.pageComponentsContainer}>
        <View style={EventListStyles.searchContainer}>
          <Input
            placeholder="Search for activities"
            value={activity}
            onChangeText={(activity) => setActivityFunc(activity)}
          />
          <DatePicker
            style={{ width: '100%', marginTop: 5 }}
            mode="date"
            date={actDate}
            onDateChange={(actDate) => setActDate(actDate)}
            format="YYYY-MM-DD"
            showIcon={false}
          />
          <Button
            buttonStyle={EventListStyles.eventListButtons}
            title="SEARCH"
            onPress={searchList}
            icon={{
              name: "search",
              color: "white",
              size: 22,
            }}
            iconRight={true}
          />
          <Button
            buttonStyle={EventListStyles.eventListButtons}
            title="SHOW ALL"
            onPress={updateList}
            iconRight={true}
            icon={{
              name: 'visibility',
              color: 'white',
              size: 22
            }}
          />
        </View>

        <FlatList
          keyExtractor={item => item.id.toString()}
          renderItem={
            ({ item }) =>
              <View style={EventListStyles.listItemContainer}>
                <Text style={EventListStyles.listItemText}>{item.activity}, {item.actdate}</Text>
                <ShowActivity
                  actv={item.activity}
                  date={item.actdate}
                  place={item.place}
                  description={item.description}
                  eventId={item.id}
                  deleteFunc={deleteItem}
                  updateFunc={updateItem}
                />
              </View>
          }
          data={events}
          ListEmptyComponent={listEmptyFunc}
          ItemSeparatorComponent={listSeparator}
          ListFooterComponent={listFooter}
        />
      </View>
      <View style={EventListStyles.addButtonContainer}>
        <Icon
          name='add'
          title="+"
          color='#63b4cf'
          reverse={true}
          size={26}
          raised={true}
          onPress={() => navigate('AddEvent')}
        />
      </View>
    </View>
  );
}

ListPage.navigationOptions = ({ navigate }) => (
  {
    title: 'Activities',
    headerTitleStyle: {
      color: 'white',
    },
    headerStyle: {
      backgroundColor: '#63b4cf',
    }
  }
);