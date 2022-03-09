import { StyleSheet, Platform, Dimensions } from 'react-native';
import theme from '../../styles/theme.style';
import { normalize } from '../../styles/normalizeFont.js';
import { scale, verticalScale, moderateScale } from '../../styles/scaling';


const Pantalla = {
  alto: Math.round(Dimensions.get("window").height) - 50, //ese 50 corresponde al tab na
  ancho: Math.round(Dimensions.get("window").width)
}
const { width, height } = Dimensions.get('window');

export default StyleSheet.create({

  textInput: {

    height: verticalScale(40), //Pantalla.alto * 0.05,
    width: "100%",
    borderRadius: theme.BORDER_RADIUS,
    backgroundColor: theme.TEXT_INPUT_BACKGROUNDCOLOR,
    paddingLeft: 10,
    fontSize: moderateScale(theme.FONT_SIZE_SMALL),
    color: '#fff',
    fontFamily: 'Overpass-Regular',
  },

  textInputPass: {
    height: verticalScale(32), //Pantalla.alto * 0.05,
    borderRadius: theme.BORDER_RADIUS,
    fontSize: moderateScale(theme.FONT_SIZE_SMALL),
    color: '#fff',
  },
  imgTextInput: {
    height: verticalScale(25),
    width: moderateScale(25),
    resizeMode: "contain"
  },

  textInput2: {
    height: 50,
    width: "100%",
    paddingLeft: 10,
    fontSize: moderateScale(14),
    borderRadius: theme.BORDER_RADIUS,
    ...Platform.select({
      ios: {
        backgroundColor: 'red',
      },
      android: {
        backgroundColor: 'blue',
      },
    }),
  },

  textInputMultiline: {
    height: Pantalla.alto * 0.15,
    width: "100%",
    borderRadius: theme.BORDER_RADIUS,
    backgroundColor: theme.TEXT_INPUT_BACKGROUNDCOLOR,
    paddingLeft: 10,
    paddingTop: verticalScale(5),
    color: '#1D1D1B',
    fontSize: moderateScale(14),
  },

  // normal: {
  //   fontFamily: Platform.OS === 'ios' ? 'San Francisco' : 'normal',   
  // },

  // italic: {
  //   fontFamily: Platform.OS === 'ios' ? 'Verdana-Italic' : 'normal', 
  // }

  vistaTextInput: {
    height: verticalScale(32),
    width: "100%",
    borderRadius: 4,
    justifyContent: "space-between",
    paddingHorizontal: scale(15),
    alignItems: "center",
    flexDirection: "row"
  },

  vistaTextPassInput: {
    height: verticalScale(50),
    width: "100%",
    borderRadius: 4,
    justifyContent: "space-between",
    //paddingHorizontal: scale(15),
    paddingLeft: 10,
    paddingRight: scale(35),
    alignItems: "flex-start",
    flexDirection: "row"
  },

  textPassInput: {
    height: verticalScale(32), //Pantalla.alto * 0.05,
    width: "100%",
    //borderRadius: theme.BORDER_RADIUS,
    backgroundColor: theme.TEXT_INPUT_BACKGROUNDCOLOR,
    // paddingLeft: 10,
    fontFamily: 'Overpass-Regular',
    fontSize: moderateScale(theme.FONT_SIZE_SMALL),
    color: '#fff',
  },

  iconEye: {
    marginTop: width >= 768 ? 5 : 6,
  },
  textoRojo: {

    color: theme.TEXT_COLOR_FALSE,
    fontSize: theme.FONT_SIZE_SMALL,
    marginVertical: Platform.OS == "ios" ? 4 : 0,
  },

  estiloTextoRojo: {
    marginTop: verticalScale(4),
    color: theme.TEXT_COLOR_FALSE,
    fontSize: theme.FONT_SIZE_SMALL
  },

  circuloIconoMicrofono: {
    // backgroundColor: "#0065A5",
    backgroundColor: "#ccfff2",
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: scale(10)
  },

});    