import {View, Text, StyleSheet, TextInput, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import Logo from '../OnBoarding/SVG/Logo';
import {useRoute} from '@react-navigation/native';

const OTP = () => {
  const route = useRoute();
  const phone = route.params.phone;
  console.log(phone);
  const lastFourDigits = phone.slice(-4);

  const [otp, setOtp] = useState(['', '', '', '']);
  const handleOtpChange = (value, index) => {
    // Create a copy of the OTP array
    const newOtp = [...otp];

    // Update the OTP digit at the specified index
    newOtp[index] = value;

    // Update the OTP state
    setOtp(newOtp);
  };
  const [timer, setTimer] = useState(30); // Initial timer value in seconds
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    let interval;

    if (timerRunning && timer >= 0) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    }

    if (timer === 0) {
      // Timer has reached 0, you can take further action here
      // For example, automatically resend OTP or display a message
      // And then reset the timer
      setTimerRunning(false);
      setTimer(30);
    }

    return () => {
      clearInterval(interval);
    };
  }, [timerRunning, timer]);

  const handleResendOTP = () => {
    // Start or restart the timer
    setTimerRunning(true);
  };

  return (
    <View style={{flex: 1}}>
      <View style={{marginTop: '10%', marginLeft: '5%'}}>
        <Logo />
      </View>
      <View style={{marginTop: '8%', marginLeft: '5%'}}>
        <Text style={{fontSize: 30, fontWeight: 'bold', color: '#212B36'}}>
          Verify your Mobile Number
        </Text>
        <Text style={{fontSize: 15, color: '#212B36'}}>
          Please enter code sent to your mobile number ending {'\n'}with ******
          {lastFourDigits}
        </Text>
      </View>
      <View style={styles.container}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.otpInput}
            maxLength={1}
            onChangeText={value => handleOtpChange(value, index)}
            value={digit}
            keyboardType="numeric"
          />
        ))}
      </View>
      <View
        style={{flexDirection: 'row', alignItems: 'center', marginLeft: '5%'}}>
        <Text style={{fontSize: 15, color: '#637381'}}>
          Didn't receive the code?{' '}
        </Text>
        <Pressable onPress={handleResendOTP}>
          <Text style={{fontSize: 15, color: '#5A189A', fontWeight: 'bold'}}>
            Resend OTP
          </Text>
        </Pressable>
        <Text style={{fontSize: 15, color: '#5A189A', fontWeight: 'bold'}}>
          {' '}
          {timer > 0 ? `00:${timer < 10 ? `0${timer}` : timer} sec` : ''}
        </Text>
      </View>
    </View>
  );
};

export default OTP;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop:'10%'    
  },
  otpInput: {
    width: 60,
    height: 50,
    borderWidth: 0.5,
    textAlign: 'center',
    fontSize: 18,
    margin: 5,
    borderRadius: 10,
    marginLeft: 15,
  },
});
