import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//component
import Home from './screens/Home';
import CreateEmployee from './screens/CreateEmployee'
import Profile from './screens/Profile'

import {reducers} from './reducers/reducers'

const store = createStore(reducers);

const Stack = createStackNavigator();
// const Tab = createBottomTabNavigator();


console.log(store.getState())

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name="Home" 
            component={Home} 
            options={{
              title: 'EmployeeApp',
              headerStatusBarHeight:-3,
              headerTintColor: '#34495e',
              headerTitleStyle: {
                fontSize:14
              }
            }}
          />
          <Stack.Screen 
            name="Create" 
            component={CreateEmployee} 
            options={{
              title: 'Create Employee',
              headerStatusBarHeight:-3,
              headerTintColor: '#34495e',
              headerTitleStyle: {
                left:0,
                fontSize:14,
              }
            }}
          />
          <Stack.Screen name="Profile" component={Profile} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

export default App;


const styles = StyleSheet.create({})
