import { StyleSheet, Dimensions, Platform, } from 'react-native';
import { normalize } from '../styles/normalizeFont';
import { scale, verticalScale, moderateScale } from '../styles/scaling';
import theme from '../styles/theme.style';


const Pantalla = {
  alto: Math.round(Dimensions.get("window").height) - 50, //ese 50 corresponde al tab na
  ancho: Math.round(Dimensions.get("window").width)
}

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({

  wrapper: {
    flex: 1,
    //flexWrap: "wrap",
    paddingHorizontal: theme.CONTAINER_PADDING,
    //paddingTop: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight,
    paddingTop: Platform.OS === 'ios' ? 20 : 10,
    backgroundColor: "#FFFFFF"
  },
  container: {
    flex: 1,
  },

  //------------------------------------------------------------------------------------------------

  titleView: {
    justifyContent: "flex-start",
    height: verticalScale(32), //Pantalla.alto * 0.11,
    width: "100%",
  },
  title: {
    fontSize: normalize(theme.FONT_SIZE_LARGE),
    color: "#595B5A",
    fontFamily: "Overpass-Bold"

  },
  titulo: {
    fontSize: moderateScale(theme.FONT_SIZE_LARGE),
    color: "#595B5A",
    fontFamily: "Overpass-Bold",
  },
  //------------------------------------------------------------------------------------------------

  pickerSelectBox: {
    justifyContent: "flex-start",
    //height: verticalScale(60),
    width: "100%",
    marginBottom: verticalScale(theme.MARGIN_BOTTOM),
  },

  pickerSelect: {
    height: verticalScale(50),
    width: "100%",
    borderRadius: theme.BORDER_RADIUS,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.TEXT_INPUT_BACKGROUNDCOLOR,
  },

  //------------------------------------------------------------------------------------------------

  caption: {
    fontSize: normalize(theme.FONT_SIZE_MEDIUM),
    width: "100%",
    color: "#595B5A",
    marginBottom: verticalScale(theme.MARGIN_SUBTITLE),
    fontFamily: "Overpass-Bold"
  },
  caption2: {
    fontSize: normalize(theme.FONT_SIZE_MEDIUM),
    color: "#595B5A",
    marginRight: verticalScale(5),
    fontFamily: "Overpass-Bold"
  },
  caption3: {
    fontSize: normalize(theme.FONT_SIZE_SMALLER),
    color: "#595B5A",
  },

  textInputBoxMultiline: {
    justifyContent: "flex-start",
    //height: verticalScale(124),
    width: "100%",
    marginBottom: verticalScale(theme.MARGIN_BOTTOM),

  },

  textInputBoxMultiline2: {
    justifyContent: "flex-start",
    //height: verticalScale(124),
    width: "100%",
    marginBottom: verticalScale(theme.MARGIN_BOTTOM),

  },
  textInputBoxMultiline3: {
    justifyContent: "flex-start",
    //height: verticalScale(124),
    width: "100%",
    marginBottom: verticalScale(theme.MARGIN_BOTTOM),

  },
  textInputBoxMultiline4: {
    justifyContent: "flex-start",
    //height: verticalScale(124),
    width: "100%",
    marginBottom: verticalScale(theme.MARGIN_BOTTOM),

  },

  textInputMultiline: {
    height: Pantalla.alto * 0.15,
    width: "100%",
    borderColor: theme.COLOR_INPUT,
    borderWidth: 1,
    borderRadius: theme.BORDER_RADIUS,
    paddingLeft: 10
  },

  textInputBox: {
    justifyContent: "flex-start",
    //height: height >= 1024 ? verticalScale(75) : verticalScale(60),
    width: "100%",
    //marginBottom: verticalScale(theme.MARGIN_BOTTOM),
    marginBottom: verticalScale(theme.MARGIN_BOTTOM),
  },

  textInput: {
    height: verticalScale(32), //Pantalla.alto * 0.05,
    width: "100%",
    // borderColor: theme.COLOR_INPUT,
    // borderWidth: 1,
    borderRadius: theme.BORDER_RADIUS,
    paddingLeft: 10,
    backgroundColor: theme.TEXT_INPUT_BACKGROUNDCOLOR,
  },
  inputTelefono: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  vistaTextInputTelefonoPrefijo: {
    //height: verticalScale(32),
    width: "20%",
    borderRadius: 4,
    backgroundColor: "#F2F2F2",
    alignItems: "center",
    paddingRight: 10,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  vistaTextInputTelefonoSufijo: {
    //height: verticalScale(32),
    width: "77%",
    borderRadius: 4,
    backgroundColor: "#F2F2F2",
    justifyContent: "center",
  },



  //------------------------------------------------------------------------------------------------

  itemAttachFile: {
    height: verticalScale(100),
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginBottom: verticalScale(theme.MARGIN_BOTTOM),
  },
  dataPicker: {
    height: moderateScale(70, 0.3),
    width: moderateScale(90, 0.3),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FAFAFA",
    borderRadius: 3,
  },
  imageAttachFile: {
    height: moderateScale(40, 0.3),
    width: moderateScale(40, 0.3),
    opacity: 0.3,
    resizeMode: "contain"
  },
  textAttach: {
    color: '#8F8F8F',
    fontSize: normalize(theme.FONT_SIZE_SMALLER),
  },
  //------------------------------------------------------------------------------------------------

  // textInput2: {
  //   height: verticalScale(32),
  //   width: "100%",
  //   borderRadius: theme.BORDER_RADIUS,
  //   backgroundColor: theme.TEXT_INPUT_BACKGROUNDCOLOR,
  //   paddingLeft: 10,
  //   fontSize:14,
  // },

  adjuntarImagenes: {
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginTop: verticalScale(10),
    marginBottom: verticalScale(20),
    //marginBottom: width >= 768 ? verticalScale(theme.MARGIN_BOTTOM)+20 :  verticalScale(theme.MARGIN_BOTTOM) + 10,
  },
  textoAdjuntarImagen: {
    fontSize: theme.FONT_SIZE_SMALL,
    opacity: 0.5,
    fontFamily: "Overpass-Bold",
    //marginBottom:5
  },
  circuloAdjuntarImagen: {
    height: scale(60),
    width: scale(80),
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
    backgroundColor: theme.TEXT_INPUT_BACKGROUNDCOLOR,
  },

  //------------------------------------------------------------------------------------------------

  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80
  },

  itemButtom: {
    marginBottom: verticalScale(30)
  },

  textoRojo: {
    color: theme.TEXT_COLOR_FALSE,
    fontSize: theme.FONT_SIZE_SMALL,
    marginVertical: Platform.OS == "ios" ? 4 : 0,
    
  },

  //----------------------------------------------------------
containerModal:{
  //backgroundColor: "#f2f2f2", 
  backgroundColor: "rgba(88,88,88,0.35)",
  width: width * 0.4, 
  height: verticalScale(110), 
  borderRadius: 4, 
  justifyContent: "center", 
  alignItems: "center", 
  paddingTop:scale(10)        
},

activityIndicator: {
  height:40,
  marginBottom:scale(10),
},

contenedorModal: {
  alignItems: "center",
  justifyContent: "center",
},
textoLoading: {
  fontFamily: "Overpass-Bold",
  //color: '#007acc', 
  color: "white",
  fontSize: width >= 768 ? moderateScale(18) : moderateScale(16),
},

//--------- Botón dictado por voz -----------
    touchableMic: {
      height: 60, 
      borderRadius: 30, 
      backgroundColor:'transparent', 
      justifyContent:'center', 
      alignItems:'center',
      //marginLeft: Platform.OS === 'android' ? scale(5) : 0,
    },
    circuloIconoMicrofono: {
        backgroundColor: "#0065A5",
        height: 50,
        width: 50,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",    
        marginHorizontal:scale(5)
    },
    circuloIconoMicrofono2: {
      backgroundColor: "#0065A5",
      height: 50,
      width: 50,
      borderRadius: 25,
      justifyContent: "center",
      alignItems: "center",    
      marginHorizontal:scale(5)
  },

  circuloIconoMicrofono3: {
    backgroundColor: "#0065A5",
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",    
    marginHorizontal:scale(5)
},

circuloIconoMicrofono4: {
  backgroundColor: "#0065A5",
  height: 50,
  width: 50,
  borderRadius: 25,
  justifyContent: "center",
  alignItems: "center",    
  marginHorizontal:scale(5)
},

  
    circuloIconoMicRecord: {
        backgroundColor: "#cc2900",
        height: 50,
        width: 50,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: scale(10)
    }, 
    circuloIconoMicRecord2: {
      backgroundColor: "#cc2900",
      height: 50,
      width: 50,
      borderRadius: 25,
      justifyContent: "center",
      alignItems: "center",
      marginLeft: scale(10)
  }, 

  circuloIconoMicRecord3: {
    backgroundColor: "#cc2900",
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: scale(10)
}, 

circuloIconoMicRecord4: {
  backgroundColor: "#cc2900",
  height: 50,
  width: 50,
  borderRadius: 25,
  justifyContent: "center",
  alignItems: "center",
  marginLeft: scale(10)
}, 


});    