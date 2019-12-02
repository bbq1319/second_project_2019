import React from 'react';
import { Alert } from "react-native";
import Splash from "./Splash";
import * as Location from 'expo-location';
import axios from "axios";
import Weather from "./Weather";

const API_KEY = "1d58b7853f7e7e942b189be948cedc95";

export default class extends React.Component {
  state = {
    isLoading: true
  };

  getWeather = async (latitude, longitude) => {
    const { 
      data: {
        main: {temp}, 
        weather 
      }
    } = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}&units=metric`
    );
    console.log(temp);
    console.log(weather[0]);
    console.log(weather[0].main);
    this.setState({
      isLoading: false,
      condition: weather[0].main,
      temp
    });
  };

  getLocation = async () => {
    try {
      await Location.requestPermissionsAsync();
      const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
      this.getWeather(latitude, longitude);
      this.setState({ isLoading: false });
    } catch (error) {
      Alert.alert("Can't find you.", "So Sad :(");
    }
  }

  componentDidMount() {
    this.getLocation();
  }

  render() {
    const { isLoading, condition, temp } = this.state;
    return isLoading ? <Splash /> : <Weather temp={Math.round(temp)} condition={condition} />;
  }
}
