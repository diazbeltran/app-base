import React, { Component } from 'react';
import {
  BackHandler, Dimensions, StyleSheet, View,
  ImageBackground,
  Image,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Platform
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swiper from 'react-native-swiper';

//-----------------------------------------------------------------
// import firebase from '@react-native-firebase/app';
// import '@react-native-firebase/messaging';

import DeviceInfo from 'react-native-device-info';
//-----------------------------------------------------------------
import { normalize } from '../styles/normalizeFont';
import { scale, verticalScale, moderateScale } from '../styles/scaling';
import themes from '../styles/theme.style';

//-----------------------------------------------------------------

let contador;

const { width, height } = Dimensions.get('window')

class MyImagen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      autoplay: true,
      image: '',
      mensaje46: "",
      mensaje47: "",
      mensaje48: "",
      mensaje49: "",
      pasoPorPantalla: false

    };
  }

  render() {
    if (width >= 768) {
      return (
        <View style={{ backgroundColor: 'transparent' }}>
          <Image source={require('../assets/img/logo_3x.png')} style={styles.logo} />
        </View>
      )
    } else {
      return (
        <View style={{ backgroundColor: 'transparent' }}>
          <Image source={require('../assets/img/logo_2x.png')} style={styles.logo} />
        </View>
      )
    }
    // return (
    //     <Image source={require('../assets/img/logo.png')} style={styles.logo} />
    // )
  }
}


export default class initializing extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      autoplay: false,
      paginaActual: 0,
      imagen1: require('../assets/img/01-onboarding.jpg'),
      imagen2: require('../assets/img/02-onboarding.jpg'),
      imagen3: require('../assets/img/03-onboarding.jpg'),
      imagen4: require('../assets/img/04-onboarding.jpg'),
      isLoading: true,
    };
  }

  cargarMensajes = async () => {


    // let mensaje46 = await AsyncStorage.getItem("MENSAJE_46");
    // let mensaje47 = await AsyncStorage.getItem("MENSAJE_47");
    // let mensaje48 = await AsyncStorage.getItem("MENSAJE_48");
    // let mensaje49 = await AsyncStorage.getItem("MENSAJE_49");

    try {


      let mensaje46 = "";
      let mensaje47 = "";
      let mensaje48 = "";
      let mensaje49 = "";

      mensaje46 = await AsyncStorage.getItem("MENSAJE_46");
      mensaje47 = await AsyncStorage.getItem("MENSAJE_47");
      mensaje48 = await AsyncStorage.getItem("MENSAJE_48");
      mensaje49 = await AsyncStorage.getItem("MENSAJE_49");

      if (mensaje46 != null && mensaje46 != undefined) {
        this.setState({ mensaje46: mensaje46 });
      } else {
        this.setState({ mensaje46: "Llegamos donde quiera que estés y te ayudamos con lo que necesitas, todo a un clic." })
      }

      if (mensaje47 != null && mensaje47 != undefined) {
        this.setState({ mensaje47: mensaje47 });
      } else {
        this.setState({ mensaje47: "Podrás ingresar tus boletas y hacer seguimiento de su estado, todo a un clic." })
      }

      if (mensaje48 != null && mensaje48 != undefined) {
        this.setState({ mensaje48: mensaje48 });
      } else {
        this.setState({ mensaje48: "Ingresa de manera fácil tus siniestros, recibiendo nuestra conbertura desde el primer momento." })
      }

      if (mensaje49 != null && mensaje49 != undefined) {
        this.setState({ mensaje49: mensaje49 });
      } else {
        this.setState({ mensaje49: "¿Dejaste tu regalón en el taller? Te vamos informando etapa por etapa el estado de tu vehículo." })
      }
      this.setState({ isLoading: false });

      // this.setState({
      //   mensaje46: mensaje46,
      //   mensaje47: mensaje47,
      //   mensaje48: mensaje48,
      //   mensaje49: mensaje49,
      //   isLoading: false
      // });

    } catch (error) {

    }
  }

  async UNSAFE_componentWillMount() {

    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    await this.cargarMensajes();
    this.setState({
      pasoPorPantalla: true
    })
  }

  async componentWillUnmount() {
    //if (this.state.pasoPorPantalla == true) {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    //}

  }

  handleBackButtonClick = async () => {
    console.log('handleBackButtonClick...');
    return false;
  }


  //-----------------------------------------------------------------
  //LLAMADO OBLIGATORIO PARA CARGA DE FUENTES
  async componentDidMount() {
    //console.log("la fuente esta en estado ", this.state.fontLoaded);
    this.setState({ fontLoaded: true })
    await this.cargarMensajes();


    this.cargarImagen();

    // await firebase.analytics().logEvent('foo', { bar: '123'});
    //await firebase.analytics().setCurrentScreen('HomeApp');

    let uniqueId = DeviceInfo.getUniqueId();
    let version = DeviceInfo.getVersion();
    console.log('uniqueId : ' + uniqueId);
    console.log('version : ' + version);

    //this.checkPermission();


  }


  //-----------------------------------------------------------------
  //revisamos en que swipper(pagina) estamos
  cambioIndex = async (index) => {

    console.log("se ha cambiado el index  a ", index);


    this.setState({ autoplay: false });

    console.log("indice actual ", index);
    this.setState({paginaActual:index});
    //en caso de que lleguemos al ultimo swipper/pagina (0-1-2-3) entonces esperamos 0.1 segundos y nos vamos al login
    if (index == 3) {
      await AsyncStorage.setItem("INITIALIZED", "true");

      contador = setTimeout(async () => {
        //this.props.navigation.navigate("Login");
        //this.props.navigation.navigate("Auth");
      }, 2500)

    } else {
      clearTimeout(contador);
    }
  }

  //-----------------------------------------------------------------


  cargarImagen = () => {

    if (width >= 768) {
      this.setState({
        imagen1: require('../assets/img/01-onboarding_tablet.jpg'),
        imagen2: require('../assets/img/02-onboarding_tablet.jpg'),
        imagen3: require('../assets/img/03-onboarding_tablet.jpg'),
        imagen4: require('../assets/img/04-onboarding_tablet.jpg'),
      })
    } else {
      this.setState({
        imagen1: require('../assets/img/01-onboarding.jpg'),
        imagen2: require('../assets/img/02-onboarding.jpg'),
        imagen3: require('../assets/img/03-onboarding.jpg'),
        imagen4: require('../assets/img/04-onboarding.jpg'),
      })
    }
    //this.props.navigation.navigate("Login");
  }

  cambiarEstadoAutoPlay = () => {
    console.log("se ha cambiado a auto play");
    this.setState({ autoplay: true });

    let pagina = this.state.paginaActual;
    console.log("PAGINA ACTUAL : " + pagina);
    if(pagina == 3){
      this.props.navigation.navigate("Auth");
    }

  }

  render() {
    //console.log(`ancho: ${width} - alto: ${height} `);
    if (this.state.isLoading) {

      return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator
          color='#006fb9'
          size="large"
          style={styles.activityIndicator} />
      </View>
    } else {

      return (

        <Swiper
          dot={<View style={{ backgroundColor: 'rgba(0,0,0,.2)', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: Platform.OS == 'ios' ? 16:20, marginBottom: Platform.OS == 'ios' ? 16:20, }} />}
          autoplay={this.state.autoplay}
          style={styles.wrapperSwiper}
          showsButtons={false}
          onIndexChanged={(index) => this.cambioIndex(index)}
          loop={false}
          autoplayTimeout={0.5}
          showsButtons={true}
          prevButton={<Text style={{ color: "transparent" }}></Text>}
          nextButton={
            <Text style={{ backgroundColor: "red", fontSize: 50, opacity: 0.0001, marginRight: height >= 1024 ? 80 : 10, marginTop: height * 0.90, }}>|=|</Text>
          }
        >

          <ImageBackground
            source={this.state.imagen1}
            style={styles.slide1}
            imageStyle={{ height: height, width: width, resizeMode: 'stretch' }}
          >
            <View style={styles.containerImageBackground}>

              <Image source={require('../assets/icon/icon-intro-asistencia.png')} style={styles.iconBox} />
              {this.state.fontLoaded == true ? (<Text style={styles.titulo}>Asistencia en Ruta</Text>) : (<Text>Loading ... </Text>)}

              <View style={{ marginTop: verticalScale(20) }}>
                {this.state.fontLoaded == true ? (<Text style={styles.subtitulo} >{this.state.mensaje46}{/*Llegamos donde quiera que estés y te ayudamos con lo que necesitas, todo a un click.*/}</Text>) : (<Text>Loading ... </Text>)}
              </View>


              <View
                style={{ position: 'absolute', bottom: 22, width: width, paddingHorizontal: 20, backgroundColor: 'transparent', flexDirection: 'column', }}
              >
                <View style={{ height: 1, backgroundColor: '#8F8F8F', width: '100%', opacity: 0.2, marginVertical: verticalScale(20), }}></View>

                <View style={{ flexDirection: 'row', width: width, justifyContent: 'space-between', alignItems: 'center', }} >
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('Auth')}  >
                    {this.state.fontLoaded == true ? (<Text style={styles.navTexto}>SALTAR</Text>) : (<Text>Loading ... </Text>)}
                  </TouchableOpacity>

                  <TouchableOpacity onPress={this.cambiarEstadoAutoPlay}>
                    {this.state.fontLoaded == true ? (<Text style={[styles.navTexto, { marginRight: scale(40) }]}>SIGUIENTE</Text>) : (<Text>Loading ... </Text>)}
                  </TouchableOpacity>
                </View>

              </View>

            </View>
          </ImageBackground>

          <ImageBackground
            source={this.state.imagen2}
            style={styles.slide1}
            imageStyle={{ height: height, width: width, resizeMode: 'stretch' }}
          >
            <View style={styles.containerImageBackground} >

              <Image source={require('../assets/icon/icon-intro-reembolso.png')} style={styles.iconBox} />
              {this.state.fontLoaded == true ? (<Text style={styles.titulo}>Reembolso en línea</Text>) : (<Text>Loading ... </Text>)}
              <View style={{ marginTop: verticalScale(20) }}>
                {this.state.fontLoaded == true ? (<Text style={styles.subtitulo}>{this.state.mensaje47} {/* Podrás ingresar tus boletas y hacer seguimiento de su estado, todo a un click.*/}</Text>) : (<Text>Loading ... </Text>)}
              </View>



              <View
                style={{ position: 'absolute', bottom: 22, width: width, paddingHorizontal: 20, backgroundColor: 'transparent', flexDirection: 'column', }}
              >
                <View style={{ height: 1, backgroundColor: '#8F8F8F', width: '100%', opacity: 0.2, marginVertical: verticalScale(20), }}></View>

                <View style={{ flexDirection: 'row', width: width, justifyContent: 'space-between', alignItems: 'center', }} >
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('Auth')}  >
                    {this.state.fontLoaded == true ? (<Text style={styles.navTexto}>SALTAR</Text>) : (<Text>Loading ... </Text>)}
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this.cambiarEstadoAutoPlay}>
                    {this.state.fontLoaded == true ? (<Text style={[styles.navTexto, { marginRight: scale(40) }]}>SIGUIENTE</Text>) : (<Text>Loading ... </Text>)}
                  </TouchableOpacity>
                </View>

              </View>

            </View>

          </ImageBackground>

          <ImageBackground
            source={this.state.imagen3}
            style={styles.slide3}
            imageStyle={{ height: height, width: width, resizeMode: 'stretch' }}
          >
            <View style={styles.containerImageBackground} >

              <Image source={require('../assets/icon/icon-intro-denuncio.png')} style={styles.iconBox2} />
              {this.state.fontLoaded == true ? (<Text style={styles.titulo}>Denuncia tu siniestro</Text>) : (<Text>Loading ... </Text>)}

              <View style={{ marginTop: verticalScale(20) }}>
                {this.state.fontLoaded == true ? (<Text style={styles.subtitulo}>{this.state.mensaje48}{/*Ingresa de manera fácil tus siniestros, recibiendo Nuestra cobertura desde el primer momento. */}</Text>) : (<Text>Loading ... </Text>)}
              </View>


              <View
                style={{ position: 'absolute', bottom: 22, width: width, paddingHorizontal: 20, backgroundColor: 'transparent', flexDirection: 'column', }}
              >
                <View style={{ height: 1, backgroundColor: '#8F8F8F', width: '100%', opacity: 0.2, marginVertical: verticalScale(20), }}></View>

                <View style={{ flexDirection: 'row', width: width, justifyContent: 'space-between', alignItems: 'center', }} >
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('Auth')}  >
                    {this.state.fontLoaded == true ? (<Text style={styles.navTexto}>SALTAR</Text>) : (<Text>Loading ... </Text>)}
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this.cambiarEstadoAutoPlay}>
                    {this.state.fontLoaded == true ? (<Text style={[styles.navTexto, { marginRight: scale(40) }]}>SIGUIENTE</Text>) : (<Text>Loading ... </Text>)}
                  </TouchableOpacity>
                </View>

              </View>

            </View>

          </ImageBackground>

          <ImageBackground
            source={this.state.imagen4}
            style={styles.slide3}
            imageStyle={{ height: height, width: width, resizeMode: 'stretch' }}
          >
            <View style={styles.containerImageBackground} >

              <Image source={require('../assets/icon/icon-intro-vehiculo.png')} style={styles.iconBox} />
              {this.state.fontLoaded == true ? (<Text style={styles.titulo}>¿En qué está mi vehículo?</Text>) : (<Text>Loading ... </Text>)}

              <View style={{ marginTop: verticalScale(20) }}>
                {this.state.fontLoaded == true ? (<Text style={styles.subtitulo}>{this.state.mensaje49} {/*¿Dejaste tu regalón en el taller? Te vamos Informando etapa por etapa el estado de tu Vehículo. */}</Text>) : (<Text>Loading ... </Text>)}
              </View>


              <View
                style={{ position: 'absolute', bottom: 22, width: width, paddingHorizontal: 20, backgroundColor: 'transparent', flexDirection: 'column', }}
              >
                <View style={{ height: 1, backgroundColor: '#8F8F8F', width: '100%', opacity: 0.2, marginVertical: verticalScale(20), }}></View>

                <View style={{ flexDirection: 'row', width: width, justifyContent: 'space-between', alignItems: 'center', }} >

                  <TouchableOpacity   >
                    {this.state.fontLoaded == true ? (<Text style={styles.navTexto}>      </Text>) : (<Text></Text>)}
                  </TouchableOpacity>

                  <TouchableOpacity onPress={this.cambiarEstadoAutoPlay}>
                    {this.state.fontLoaded == true ? (<Text style={[styles.navTexto, { marginRight: scale(40) }]}>TERMINAR</Text>) : (<Text>Loading ... </Text>)}
                  </TouchableOpacity>
                </View>

              </View>

            </View>
          </ImageBackground>

        </Swiper>
      );
    }

  }
}

const styles = StyleSheet.create({

  wrapper: {
  },
  slide1: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#9DD6EB'
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#97CAE5'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#92BBD9'
  },
  containerImageBackground: {
    backgroundColor: 'transparent',
    height: height / 2.3,
    width: width,
    position: 'absolute',
    bottom: 0,
    paddingTop: verticalScale(50),
    paddingLeft: 20,
    paddingRight: 20
  },
  iconBox: {
    width: moderateScale(40),
    height: verticalScale(40),
    marginBottom: verticalScale(10),
  },
  iconBox2: {
    width: moderateScale(70),
    height: verticalScale(40),
    marginBottom: verticalScale(10),
  },
  titulo: {
    fontSize: moderateScale(themes.FONT_SIZE_LARGE),
    fontFamily: "Overpass-Bold",
    color: '#595B5A',
    marginBottom: verticalScale(10)
  },
  subtitulo: {
    fontSize: moderateScale(themes.FONT_SIZE_SMALL),
    fontFamily: "Overpass-Light",
    color: '#8F8F8F',
    lineHeight: verticalScale(20),
  },
  navTexto: {
    fontSize: moderateScale(themes.FONT_SIZE_SMALLER),
    fontFamily: "Overpass-Light",
    color: '#8F8F8F',
  },


});	  