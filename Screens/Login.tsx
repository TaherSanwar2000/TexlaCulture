import {View, Text, TouchableOpacity, ToastAndroid} from 'react-native';
import React, {useState, useRef} from 'react';
import LoginSVG from '../OnBoarding/SVG/LoginSVG';
import PhoneInput from 'react-native-phone-number-input';

const Login = ({navigation}) => {
  const [value, setValue] = useState('');
  const phoneInput = useRef<PhoneInput>(null);
  const checkValid = phoneInput.current?.isValidNumber(value);

  const CheckPhoneNum = () => {
    if (checkValid) {
        navigation.navigate('Otp', {phone: value})
    } else {
      ToastAndroid.show("Enter valid number", ToastAndroid.SHORT);
    }
  };

  return (
    <View style={{flex: 1}}>
      <View style={{marginTop: '10%', marginLeft: '5%'}}>
        <LoginSVG />
      </View>
      <View style={{marginLeft: '5%', marginTop: '5%'}}>
        <PhoneInput
          containerStyle={{
            borderRadius: 15,
            width: '90%',
          }}
          textInputStyle={{height: 40,}}
          textContainerStyle={{
            height: 50,
            borderRadius: 10,
            
          }}
          ref={phoneInput}
          defaultValue={value}
          defaultCode="IN"
          layout="first"
          onChangeText={text => {
            setValue(text);
          }}
          withDarkTheme={false}
          withShadow
          autoFocus
        />
      </View>
      <View style={{marginTop: '2%', marginLeft: '5%'}}>
        <Text style={{fontSize: 12}}>
          By Continuing, I agree to the{' '}
          <Text style={{color: '#5A189A'}}>Terms of Use</Text> &{' '}
          <Text style={{color: '#5A189A'}}>Privacy Policy</Text>
        </Text>
      </View>
      <View style={{alignItems: 'center'}}>
        <TouchableOpacity
          onPress={CheckPhoneNum}
          style={{
            width: '90%',
            backgroundColor: '#5A189A',
            borderRadius: 15,
            marginTop: '5%',
            padding: 15,
          }}>
          <Text style={{fontSize: 20, color: '#FFFFFF', textAlign: 'center'}}>
            Get OTP
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{marginTop: '2%', marginLeft: '7%'}}>
        <Text>
          Having Trouble Logging in?{' '}
          <Text style={{color: '#5A189A'}}>Get Help</Text>
        </Text>
      </View>
    </View>
  );
};

export default Login;
