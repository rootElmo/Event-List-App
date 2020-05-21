import React from 'react';
import * as SQLite from 'expo-sqlite';
import ListPage from './pages/ListPage.js';
import {createAppContainer} from'react-navigation';
import {createStackNavigator} from'react-navigation-stack'
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
  return (
      <AppContainer />
  );
}
