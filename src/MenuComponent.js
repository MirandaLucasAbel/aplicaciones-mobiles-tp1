import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import SeachComponent from './SeachComponent';
import HomeComponent from './HomeComponent';



export default function MenuComponent() {
    const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="home" component={HomeComponent} />
      <Drawer.Screen name="search" component={SeachComponent} />
    </Drawer.Navigator>
  );
}