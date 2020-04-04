import React, { useState, useRef, useEffect } from 'react';
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
    bottom: 20,
    width: '100%',
    height: 6,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'white',
    margin: 5,
    display: 'flex',
  },
});

const Carousel = ({ images }) => {
  const [selectedIndex, setSelectedIndex] = useState(0),
    scrollRef = useRef(),
    slideTimeOut = 3000;
  let timer;

  useEffect(() => {
    startAutoSliding();

    return () => {
      clearInterval(timer);
    };
  }, []);

  const startAutoSliding = () => {
    timer = setInterval(() => {
      setSelectedIndex((prevState) => {
        const newIndex = prevState === images.length - 1 ? 0 : prevState + 1;
        scrollRef.current.scrollTo({
          animated: true,
          x: newIndex * deviceWidth,
        });
        return newIndex;
      });
    }, slideTimeOut);
  };

  const setActiveSlide = (event) => {
    const layoutWidth = event.nativeEvent.layoutMeasurement.width,
      offsetX = event.nativeEvent.contentOffset.x;
    setSelectedIndex(Math.floor(offsetX / layoutWidth));
  };

  return (
    <View style={styles.screen}>
      <ScrollView
        horizontal
        pagingEnabled
        onMomentumScrollEnd={setActiveSlide}
        ref={scrollRef}
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
};

export default Carousel;
