import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from './screens/Splash';
import Register from './screens/Register';
import Login from './screens/Login';
import Main from './screens/Main';

const Stack = createNativeStackNavigator();

const App = () => {
  return (

    <NavigationContainer>
     <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Splash} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={Main} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>

  );
};

export default App;