import React, { useRef, useState } from 'react';
import { Animated, Dimensions, Image, ScrollView, TouchableOpacity, View } from 'react-native';
import { images } from '../../../assets';
import AppText from '../../components/AppText';
import Container from '../../components/Container';
import { styles } from './styles';
import AppButton from '../../components/Button';
interface Types {
  navigation: any;
}
const device_width = Dimensions.get('window').width;


const OnBoardingScreen: React.FC<Types> = ({ navigation }) => {

    const [completed, setCompleted] = useState(false);
    const scroll = useRef<ScrollView>();
    const scrollX = useRef(new Animated.Value(0)).current;
    const onBoardings = [
      {
        title: 'My Pets',
        description: 'Taking care of a pet is my favorite, it helps me to gaimr stress and fatigue.',
        img: images.onBoarding,
      },
      {
        title: 'My Pets',
        description: 'Taking care of a pet is my favorite, it helps me to gaimr stress and fatigue.',
        img: images.onBoarding,
      },
      {
        title: 'My Pets',
        description: 'Taking care of a pet is my favorite, it helps me to gaimr stress and fatigue.',
        img: images.onBoarding,
      },
    ];
  
    React.useEffect(() => {
      scrollX.addListener(({value}) => {
        if (Math.floor(value / device_width) === onBoardings.length - 2) {
          setCompleted(true);
        }
      });
      return () => scrollX.removeListener('');
    }, [onBoardings.length, scrollX]);
  
    const onDoneBoard = () => {
    //   dispatch(AuthenticationActions.boarded.request());
      // navigation.navigate('AnimalTabs');
      navigation.navigate('CreateAnimal');

    };
  
    const onNext = (index: number) => {
      if (index !== 2) {
        scroll.current!.scrollTo({
          x: device_width * (index + 1),
        });
      } else {
        onDoneBoard();
      }
    };
  
    const renderContent = () => {
      return (
        <Animated.ScrollView
          horizontal
          pagingEnabled
          scrollEnabled
          ref={scroll}
          decelerationRate={0}
          scrollEventThrottle={16}
          snapToAlignment="center"
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: false},
          )}>
          {onBoardings.map((item, index) => (
            <View key={`img-${index}`} style={styles.imageAndTextContainer}>
              <View style={styles.contentCenter}>
                <Image
                  source={item.img}
                  resizeMode="contain"
                  style={styles.image}
                />
                <AppText style={styles.txtTitle} subtitle2>
                  {item.title}
                </AppText>
                <AppText style={styles.txtDescription} body2>
                  {item.description}
                </AppText>
              </View>
              <View style={styles.bottomView}>
                <AppButton
                  onPress={() => onNext(index)}
                  title={
                    index !== 2
                      ? 'Continue'
                      : 'Get Started'
                  }
                />
              </View>
              {/* <TouchableOpacity
                style={styles.btnSkip}
                onPress={() => onDoneBoard()}>
                <AppText body2>{t(translations.onBoarding.skip)}</AppText>
              </TouchableOpacity> */}
            </View>
          ))}
        </Animated.ScrollView>
      );
    };
  
    const renderDots = () => {
      const dotPosition = Animated.divide(scrollX, device_width);
      return (
        <View style={styles.dotsContainer}>
          {onBoardings.map((item, index) => {
            const opacity = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp',
            });
            const dotSize = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [8, 10, 8],
              extrapolate: 'clamp',
            });
            return (
              <Animated.View
                key={`dot-${index}`}
                style={[
                  styles.dot,
                  {width: dotSize, height: dotSize},
                  {opacity: opacity},
                ]}
              />
            );
          })}
        </View>
      );
    };
  
    return (
      <Container scrollEnabled={false}>
        <View>{renderContent()}</View>
        <View style={styles.dotsRootContainer}>{renderDots()}</View>
      </Container>
    );
}

export default OnBoardingScreen
