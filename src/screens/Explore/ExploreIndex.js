import React, {Component} from 'react';
import {Text, View, SafeAreaView, StyleSheet} from 'react-native';
import MapView, {PROVIDER_GOOGLE, AnimatedRegion} from 'react-native-maps';

export class ExploreIndex extends Component {
  constructor() {
    super();
    this.currentRegion = new MapView.AnimatedRegion({
      latitude: 28.2674,
      longitude: 83.975,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
    });
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <MapView.Animated
          followsUserLocation
          provider={PROVIDER_GOOGLE}
          region={this.currentRegion}
          style={styles.mapViewContainer}></MapView.Animated>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapViewContainer: {
    ...StyleSheet.absoluteFillObject,
  },
});
export default ExploreIndex;
