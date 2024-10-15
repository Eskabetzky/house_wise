import React from 'react';
import {
  SafeAreaView,
  Image,
  FlatList,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Modal,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const COLORS = { primary: '#FCC205', white: '#fff' };

const slides = [
  {
    id: '1',
    image: require('../assets/images/Project_1.png'),
    zoomedImage: require('../assets/images/sample1.jpg'),
    title: "Floor Plan and Cost Estimation",
    subtitle: "Detailed Layout and Breakdown for 12 by 5 house dimension",
  },
  {
    id: '2',
    image: require('../assets/images/Project_1.png'),
    zoomedImage: require('../assets/images/sample1.jpg'),
    title: "Floor Plan and Cost Estimation",
    subtitle: "Detailed Layout and Breakdown for 12 by 5 house dimension",
  },
  {
    id: '3',
    image: require('../assets/images/Project_1.png'),
    zoomedImage: require('../assets/images/sample1.jpg'),
    title: "Floor Plan and Cost Estimation",
    subtitle: "Detailed Layout and Breakdown for 12 by 5 house dimension",
  },
];

const Slide = ({ item, onImagePress }) => {
  return (
    <View style={{ alignItems: 'center' }}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item?.title}</Text>
        <Text style={styles.subtitle}>{item?.subtitle}</Text>
      </View>
      <TouchableOpacity onPress={() => onImagePress(item.zoomedImage)}>
        <View style={styles.imageContainer}>
          <Image source={item?.image} style={styles.image}/>
          <Text style={styles.clickImage}>Click Image to see Result</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const OnboardingScreen = ({ navigation }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState(null);
  const ref = React.useRef();

  const updateCurrentSlideIndex = e => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex !== slides.length) {
      const offset = nextSlideIndex * width;
      ref?.current.scrollToOffset({ offset });
      setCurrentSlideIndex(nextSlideIndex);
    }
  };

  const skip = () => {
    const lastSlideIndex = slides.length - 1;
    const offset = lastSlideIndex * width;
    ref?.current.scrollToOffset({ offset });
    setCurrentSlideIndex(lastSlideIndex);
  };

  const onImagePress = (zoomedImage) => {
    setSelectedImage(zoomedImage);
    setModalVisible(true);
  };

  const Footer = () => {
    return (
      <View style={styles.footerContainer}>
        <View style={styles.indicatorContainer}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                currentSlideIndex === index && {
                  backgroundColor: COLORS.white,
                  width: 25,
                },
              ]}
            />
          ))}
        </View>

        <View style={{ marginBottom: 20 }}>
          {currentSlideIndex === slides.length - 1 ? (
            <View style={{ height: 50 }}>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => navigation.navigate('Build')}>
                <Text style={styles.getStartedText}>BUILD PROJECT</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={[styles.btn, styles.skipBtn]}
                onPress={skip}>
                <Text style={styles.skipText}>SKIP</Text>
              </TouchableOpacity>
              <View style={{ width: 15 }} />
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={goToNextSlide}
                style={styles.btn}>
                <Text style={styles.nextText}>NEXT</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor={COLORS.primary} />
      <FlatList
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        contentContainerStyle={styles.flatListContainer}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={slides}
        pagingEnabled
        renderItem={({ item }) => <Slide item={item} onImagePress={onImagePress} />}
      />
      <Footer />

      {selectedImage && (
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.modalCloseButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
            <Image
              source={selectedImage}
              style={styles.modalImage}
            />
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  imageContainer: {
    height: '65%', // Adjusted height to match the image
    width: width * 1, // Adjusted width to match the image
    borderRadius: 10,
    borderWidth: 4,
    borderColor: '#FCC205', // Change this to the desired border color
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#fff',
    elevation: 10
    
  },
  image: {
    height: '100%',
    width: '95%',
    resizeMode: 'contain', // Ensures the image fills the container
  },
  subtitle: {
    color: '#353336',
    fontSize: 13,
    marginTop: 10,
    maxWidth: '70%',
    textAlign: 'center',
    lineHeight: 23,
    marginBottom: 20
  },
  title: {
    color: '#353336',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 100
  },

  clickImage:{
    alignContent: 'center',
    justifyContent:"center",
    marginBottom: 15
  },
  indicator: {
    height: 2.5,
    width: 10,
    backgroundColor: 'grey',
    marginHorizontal: 3,
    borderRadius: 2,
  },
  btn: {
    flex: 1,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#353336',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor :'#FCC205',
    borderWidth: 1,
  
  },
  skipBtn: {
    borderColor: '#353336',
    borderWidth: 1.5,
    backgroundColor: 'transparent',
    
  },
  skipText: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#353336',
  },
  nextText: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#FCC205',
  },
  getStartedText: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#FCC205',
  },
  footerContainer: {
    height: height * 0.20,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  flatListContainer: {
    height: height * 0.80,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    width: '95%',
    height: '70%',
    resizeMode: 'contain',
    borderRadius: 10,
  },
  modalCloseButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
  },
  closeButtonText: {
    color: 'black',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default OnboardingScreen;
