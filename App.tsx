import * as React from 'react';
import 'react-native-svg'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './components/Home';
import Participants from './components/Participants';
import AddParticipant from './components/AddParticipant';
import PasteParticipants from './components/PasteParticipants';
import AddShuttlecock from './components/AddShuttlecock';
import AddOtherFee from './components/AddOtherFee';
import EditParticipant from './components/EditParticipant';
import Hours from './components/Hours';
import AddHour from './components/AddHour';
import Result from './components/Result';
import FeeDetail from './components/FeeDetail';
import SplashScreen from 'react-native-splash-screen';
import { Platform } from 'react-native';

const Stack = createNativeStackNavigator();

export default function App() {
  React.useEffect(() => {
    if(Platform.OS === 'android'){
      SplashScreen.hide();
    }
  },[]);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{headerShown:false}}/>
        <Stack.Screen name="Participants" component={Participants} options={{headerShown:false}}/>
        <Stack.Screen name="AddParticipant" component={AddParticipant} options={{headerShown:false}}/>
        <Stack.Screen name="EditParticipant" component={EditParticipant} options={{headerShown:false}}/>
        <Stack.Screen name="PasteParticipants" component={PasteParticipants} options={{headerShown:false}}/>
        <Stack.Screen name="AddShuttlecock" component={AddShuttlecock} options={{headerShown:false}}/>
        <Stack.Screen name="AddOtherFee" component={AddOtherFee} options={{headerShown:false}}/>
        <Stack.Screen name="Hours" component={Hours} options={{headerShown:false}}/>
        <Stack.Screen name="AddHour" component={AddHour} options={{headerShown:false}}/>
        <Stack.Screen name="Result" component={Result} options={{headerShown:false}}/>
        <Stack.Screen name="FeeDetail" component={FeeDetail} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}