import AsyncStorage from '@react-native-async-storage/async-storage';
import OnBoardingSVG1 from './OnBoardingSVG1';
import OnBoardingSVG2 from './OnBoardingSVG2';
import {View, Text, Image, StatusBar, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';

const OnBoarding = ({navigation}) => {
  const [showHomePage, setShowHomePage] = useState(false);

  const slides = [
    {
      id: 1,
      title: ' Simplify HR Tasks',
      description: `TexlaCulture's People Care System is ${'\n'} designed to Manage your HR tasks.`,
      image: <OnBoardingSVG1 width="100%" marginTop="10%" />,
    },
    {
      id: 2,
      title: 'Empower Your Workforce',
      description: `With TexlaCulture's Employee Management ${'\n'} System, unleash the true potential.`,
      image: <OnBoardingSVG2 width="100%" height="40%" marginTop="10%" />,
    },
  ];

  const buttonLable1 = (label: string) => {
    return (
      <View
        style={{
          backgroundColor: '#7B2CBF',
          padding: 10,
          borderRadius: 10,
          paddingHorizontal: 35,
          right: 190,
          width: '250%',
        }}>
        <Text
          style={{
            color: '#FFF',
            fontSize: 18,
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          {label}
        </Text>
      </View>
    );
  };
  const buttonLable2 = (label: string) => {
    return (
      <View
        style={{
          backgroundColor: '#7B2CBF',
          padding: 10,
          borderRadius: 10,
          paddingHorizontal: 35,
          right: 150,
          width: '180%',
        }}>
        <Text
          style={{
            color: '#FFF',
            fontSize: 18,
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          {label}
        </Text>
      </View>
    );
  };

  const handleOnboardingDone = async () => {
    try {
      // Set the onboarding status to completed
      await AsyncStorage.setItem('hasOnboarded', 'true');
      // Navigate to the Login screen
      navigation.replace('Login');
    } catch (error) {
      console.log('Error setting onboarding status:', error);
      // Handle the error, e.g., show an error message or fallback to a default screen
    }
  };

  if (!showHomePage) {
    return (
      <AppIntroSlider
        data={slides}
        renderItem={({item}) => {
          return (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#E0AAFF',
              }}>
              <StatusBar backgroundColor="#E0AAFF" translucent={true} />
              {item.image}
              <View style={{marginHorizontal: '5%'}}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 22,
                    color: '#000000',
                    fontWeight: 'bold',
                    marginTop: '10%',
                  }}>
                  {item.title}
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 15,
                    color: '#4F4F4F',
                    marginTop: 15,
                  }}>
                  {item.description}
                </Text>
              </View>
            </View>
          );
        }}
        activeDotStyle={{
          backgroundColor: '#7B2CBF',
          width: 30,
          bottom: '200%',
        }}
        dotStyle={{
          backgroundColor: '#FFF',
          borderColor: '#7B2CBF',
          borderWidth: 1,
          marginHorizontal: 5,
          width: 10,
          bottom: '200%',
        }}
        renderNextButton={() => buttonLable1('Next')}
        renderDoneButton={() => buttonLable2('Get Started')} // Hide the default "Done" button
        onDone={handleOnboardingDone} // Call your function when "Done" is pressed
      />
    );
  } else {
    return null; // Return null or any other component if you want to show nothing while checking onboarding status
  }
};

export default OnBoarding;
