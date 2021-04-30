import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import { AppTabNavigator } from './AppTabNavigator'
import SettingsScreen from '../screens/SettingsScreen'
import NotificationScreen from '../screens/NotificationScreen';
import MyBartersScreen from '../screens/MyBartersScreen'
import CustomSideBarMenu  from './CustomSideBar';

export const AppDrawerNavigator = createDrawerNavigator({
  Home : {
    screen : AppTabNavigator
    },
  Settings: {
          screen: SettingsScreen
      },
  MyBarters:{
        screen: MyBartersScreen
     },
  Notifications :{
      screen : NotificationScreen
    },
  
  },
  {
    contentComponent: CustomSideBarMenu
  },
  {
    initialRouteName : 'Home'
  })

