import React, { Component, createRef } from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  View,
} from 'react-native';
//expo constants
import Constants from 'expo-constants';

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  slide: {
    width: deviceWidth,
    height: '100%',
  },
  textWrapper: {
    position: 'absolute',
    bottom: 100,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    color: 'white',
  },
  subtitle: {
    fontSize: 15,
    color: 'white',
  },
  indicatorsWrapper: {
    position: 'absolute',
    bottom: 25,
    width: '100%',
    height: 6,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'white',
    margin: 5,
    display: 'flex',
  },
});

class Carousel extends Component {
  state = {
    selectedIndex: 0,
    intervalId: 0,
  };
  scrollRef = createRef();
  slideTimeOut = 4000;

  componentDidMount() {
    this.startAutoSliding();
  }

  componentWillUnmount() {
    this.stopAutoSliding();
  }

  stopAutoSliding = () => {
    const { intervalId } = this.state;
    clearInterval(intervalId);
  };

  startAutoSliding = () => {
    const { images } = this.props;
    const id = setInterval(() => {
      this.setState((prevState) => {
        const newIndex =
          prevState.selectedIndex === images.length - 1
            ? 0
            : prevState.selectedIndex + 1;
        this.scrollRef.current.scrollTo({
          animated: true,
          x: newIndex * deviceWidth,
        });
        return { selectedIndex: newIndex };
      });
    }, this.slideTimeOut);
    this.setState({ intervalId: id });
  };

  setActiveSlide = (event) => {
    const layoutWidth = event.nativeEvent.layoutMeasurement.width,
      offsetX = event.nativeEvent.contentOffset.x;
    this.setState({ selectedIndex: Math.floor(offsetX / layoutWidth) });

    this.startAutoSliding();
  };

  render() {
    const { images } = this.props,
      { selectedIndex } = this.state;

    return (
      <View style={styles.screen}>
        <ScrollView
          horizontal
          pagingEnabled
          onMomentumScrollBegin={this.stopAutoSliding}
          onMomentumScrollEnd={this.setActiveSlide}
          ref={this.scrollRef}
        >
          {images.map((el, i) => (
            <ImageBackground
              style={styles.slide}
              key={i}
              source={{ uri: el.url }}
            >
              <View style={styles.textWrapper}>
                <Text style={styles.title}>{el.title}</Text>
                <Text style={styles.subtitle}>{el.subtitle}</Text>
              </View>
            </ImageBackground>
          ))}
        </ScrollView>
        <View style={styles.indicatorsWrapper}>
          {images.map((el, i) => (
            <View
              style={{
                ...styles.indicator,
                opacity: selectedIndex === i ? 0.5 : 1,
              }}
              key={i}
            />
          ))}
        </View>
      </View>
    );
  }
}

export default Carousel;
