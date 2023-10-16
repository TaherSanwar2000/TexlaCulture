import {createStackNavigator} from '@react-navigation/stack';
import Login from '../Screens/Login';
import OTP from '../Screens/OTP';
import OnBoarding from '../OnBoarding/OnBoarding';

const Stack = createStackNavigator();

function Navigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Boarding" component={OnBoarding} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Otp" component={OTP} />
    </Stack.Navigator>
  );
}
export default Navigator;
