import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator
} from "react-native";
import Weather from "../components/Weather";
import HomeVeggies from "../components/HomeVeggies";
import * as api from "../utils/api";
import AnimatedCarrot from "../components/LoadingCard";

class WelcomePage extends React.Component {
  state = {
    veg: [],
    dateplanted: {},
    isLoadingUser: true
  };

  render() {
    return (
      <ScrollView>

        {this.state.isLoadingUser ? (
          <AnimatedCarrot />
        ) : (
          <View>
            <Weather />
            {this.state.veg.map(veggies => (
              <HomeVeggies
                key={veggies}
                veg={veggies}
                date={this.state.dateplanted[veggies]}
              />
            ))}
          </View>
        )}
      </ScrollView>
    );
  }

  componentDidMount = () => {
    this.fetchUser().then(data => this.setState({ isLoadingUser: false }));
  };
  fetchUser = async () => {
    const { user } = this.props.screenProps;
    const data = await api.getUserbyID(user);
    this.setState({
      veg: Object.keys(data.data.Garden),
      dateplanted: data.data.Garden
    });
    return data;
  };
}


export default WelcomePage;
