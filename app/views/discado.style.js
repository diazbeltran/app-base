import { StyleSheet , Dimensions, Platform, StatusBar, } from 'react-native';
import themes from '../styles/theme.style';
import { scale, verticalScale, moderateScale } from '../styles/scaling';
import DeviceInfo from 'react-native-device-info';

const { width, height } = Dimensions.get('window');
let widthBox = (width / 3) - 20;

const isIphoneX = DeviceInfo.hasNotch();
const StatusBarHeight = Platform.select({
  ios: isIphoneX == true ? 44 : 20,
  android: StatusBar.currentHeight,
  default: 0
})

export default StyleSheet.create({


  wrapper: {
    flex: 1,
    backgroundColor: '#eaeaea',
    //marginTop: StatusBarHeight,
  },
  container: {
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    marginBottom: verticalScale(5),
    paddingTop: verticalScale(10),
    paddingHorizontal: scale(10)
  },

  marginBottom: {
    marginBottom: verticalScale(20),
  },

  box: {
    height: width >= 768 ? verticalScale(100) : 100,
    width: (widthBox),
    // height: verticalScale(100),
    // width: moderateScale(widthBox),    
    marginLeft: 5,
  },
  box2: {
    height: width >= 768 ? verticalScale(100) : 100,
    width: height >= 1024 ? (widthBox * 2) + -10 : (widthBox * 2) + 25,
    // backgroundColor:'powderblue',
    marginLeft: 5,
    borderRadius: 5,
    //borderColor:'steelblue'                              
  },
  overlay: {
    // position:'absolute',
    // bottom:0,
    //height:50,
    flex: 1,
    backgroundColor: 'black',
    opacity: 0.4,

  },
  green: {
    backgroundColor: 'green',
  },

  red: {
    backgroundColor: 'red',
  },

  white: {
    backgroundColor: 'white',
  },

  yellow: {
    backgroundColor: 'yellow',
    height: 300,
  },

  item: {
    padding: 10,
    fontSize: width >= 768 ? moderateScale(themes.FONT_SIZE_LARGE) - 2 : moderateScale(themes.FONT_SIZE_LARGE), //moderateScale(18), 
    height: 44,
  },

  title: {
    fontSize: width >= 768 ? moderateScale(16) : moderateScale(22), //moderateScale(22),
    fontWeight: 'bold',
    color: '#666666',
    marginBottom: 5,
  },

  label: {
    fontSize: width >= 768 ? moderateScale(18) - 2 : moderateScale(18), //moderateScale(18),
    color: '#666666',
  },
  labelBox: {
    color: "#fff",
    fontSize: width >= 768 ? moderateScale(18) - 2 : moderateScale(18), //moderateScale(18),
    fontWeight: "bold",
    bottom: 0,
    position: 'absolute',
  },
  textStyle: {
    marginTop: 10,
    fontSize: width >= 768 ? moderateScale(18) - 2 : moderateScale(18), //moderateScale(18),
    color: "#FFFFFF",
    fontWeight: 'bold',
    alignSelf: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },
  textStyle2: {
    fontSize: width >= 768 ? moderateScale(themes.FONT_SIZE_SMALL) - 3 : moderateScale(themes.FONT_SIZE_SMALL) - 2, //moderateScale(themes.FONT_SIZE_SMALL),
    color: "#FFFFFF",
    fontFamily: "Overpass-Bold",
    marginBottom: -5,
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 20,
  },
  textStyle3: {
    fontSize: width >= 768 ? moderateScale(themes.FONT_SIZE_SMALL) - 2 : moderateScale(themes.FONT_SIZE_SMALL), //normalize(themes.FONT_SIZE_SMALL),
    color: "#8F8F8F",
    fontFamily: "Overpass-Bold",
    marginBottom: width >= 768 ? -15 : -5,
  },
  textColorBox: {
    color: '#8F8F8F'
  },
  paddingBottom: {
    paddingBottom: 10,
  },
  paddingLeftBox: {
    paddingLeft: 10,
  },
  textGreen: {
    fontWeight: 'bold',
    color: 'green',
  },
  wrapperSwiper: {
  },
  containerSwiper: {
    height: width >= 768 ? verticalScale(350) : verticalScale(310),
    paddingHorizontal: scale(10),
    paddingTop: 15,
    paddingBottom: Platform.OS === "ios" ? 15 : 30
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#92BBD9',
  },
  textSwiper: {
    color: '#fff',
    fontSize: width >= 768 ? moderateScale(themes.FONT_SIZE_SMALL) - 2 : moderateScale(themes.FONT_SIZE_SMALL), //moderateScale(30),
    fontWeight: 'bold',
  },
  bold: {
    fontWeight: "bold",
  },
  marginButtonCab: {
    marginBottom: 0,
  },

  itemListadoElementos: {
    paddingLeft: scale(10),
    marginBottom: verticalScale(5),
    paddingVertical: verticalScale(10),
    backgroundColor: "white"
  }
});
