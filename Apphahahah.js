import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, Button, Alert } from 'react-native';
import * as SQLite  from 'expo-sqlite';/*
import DateTimePicker from '@react-native-community/datetimepicker';
import { startAsync } from 'expo/build/AR';
*/
const db = SQLite.openDatabase('happeningsdb.db');

export default function App() {

  const [date, setDate] = useState('');
  const [happening, setHappng] = useState('');
  const [hapObj, setHapObj] = useState([]);

  const [visibility, setVisible] = useState(false);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists happenings (id integer primary key not null, hapdate text, title text);');
    });
    updateList();
  }, [])

  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from happenings;', [], (_, { rows }) =>
        setHapObj(rows._array)
      );
    });
  }

  const saveItem = () => {
    db.transaction(tx => {
        tx.executeSql('insert intro happenings (hapdate, title) values (?, ?);', [happening, date]);
      }, null, updateList
    )
  }
{/*
  const btnPress = () => {
    db.transaction(tx => {
        tx.executeSql('insert intro happening (hapdate, title) values (?, ?);',
          [happening, date]);
      }, null, updateList
    )
  }
*/}

  const hidePicker = () => {
    setVisible(false);
  }

  const handlePicker = () => {
    setVisible(false);
  }

  const showPicker = () => {
    setVisible(true);
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
    
    <View style={{ flex: 1, backgroundColor: '#f7f4f0', paddingHorizontal: '2%', paddingTop: 40,
     alignItems: 'center', justifyContent: 'center'}}>
      <View style={{flex: 1, backgroundColor: '#f5efdf', alignItems: 'center'}}>
        <View style={{flexDirection: 'row', padding: 20}}>
          <TextInput style={{width: 100, borderColor: 'black', borderWidth: 1}}
          onChangeText={(happening) => setHappng(happening)}
          value={happening}
          />
          <TextInput style={{width: 100, borderColor: 'black', borderWidth: 1}}
          onChangeText={(date) => setDate(date)}
          value={date}
          />
          <Button
            title="Date"
            onPress={showPicker}
          />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <Button onPress={saveItem}
          title="Add item"/>
        </View>
        <View style={{flex: 5, backgroundColor: 'cyan'}}>
          <Text style={{fontWeight: 'bold'}}>Happenings</Text>
          <FlatList
            
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => <View style={{flex: 1, padding: 10}}><Text style={{fontSize: 20}}>{item.title},{item.hapdate}</Text></View>}
            data={hapObj}
            ItemSeparatorComponent={listSeparator} 
          />
        </View>
      {/*
        <DateTimePicker 
          value={'2020-06-12T14:42:42'}
          isVisible={visibility}
          onConfirm={handlePicker}
          onCancel={hidePicker}
        />
      */}
      </View>

      {/*
      <View style={styles.container1}>
        <View style={styles.bar1}>
          <Text>AAAA</Text>
        </View>
        <View style={styles.bar2}>
          <Text>BBBB</Text>
        </View>
      </View>
      <View style={styles.container2}>
        <View style={styles.bar3}>
          <Text>AAAA</Text>
        </View>
        <View style={styles.bar4}>
          <Text>BBBB</Text>
        </View>
      </View>
      */}
    </View>
    
  );
}

const styles = StyleSheet.create({
  container1: {
    flex: 3,
    backgroundColor: 'red',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  container2: {
    flex: 5,
    backgroundColor: 'red',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  bar1: {
    flex: 0.4,
    backgroundColor: 'blue',
    height: '100%',
  },
  bar2: {
    flex: 0.6,
    backgroundColor: 'green',
    height: '100%',
  },
  bar3: {
    flex: 2,
    backgroundColor: 'yellow',
    height: '100%',
  },
  bar4: {
    flex: 5,
    backgroundColor: 'cyan',
    height: '100%',
  },
});
