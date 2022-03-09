import React, {Component} from 'react';

import {
  AppState,
  BackHandler,
  View,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  Image,
  Platform,
  ActivityIndicator,
  Linking,
  StatusBar,
  SafeAreaView,
} from 'react-native';

//import RNFetchBlob from "react-native-blob-util";
//import ViewPager from '@react-native-community/viewpager';
//import AsyncStorage from '@react-native-async-storage/async-storage';
//import firebase from 'react-native-firebase';base';
//-----------------------------------------------------------------

//import { scale, verticalScale, moderateScale } from "../styles/scaling";
//import themes from "../styles/theme.style";

//-----------------------------------------------------------------
//import { Utils, Validar, CheckConnectivity, Exponea, Redirect } from "../helpers";
//import Swiper from "react-native-swiper";

//import WSRestApi from "../services/wsRestApi";
//import wsRestApiSeguimiento from "../services/wsRestApiSeguimiento";
// import BackButton from '../components/BackButton/BackButton.component';
//import Hint from "../components/Hint/Hint.component";
//import TarjetaSalud from "../components/Tarjeta/TarjetaSeguimientoSalud.component";
//import TarjetaVehiculo from "../components/Tarjeta/TarjetaSeguimientoVehiculo.component";
//import WSRestApiReembolsoSalud from "../services/wsRestApiReembolsoSalud";
import styles from './home.style';

//import SQLite from "react-native-sqlite-2";
//import config from "../config/dev.config";

const {width, height} = Dimensions.get('window');

let widthBox = width / 3 - 20;

export default class Home extends Component {
  constructor(props) {
    super(props);

    //this.handleBackButtonClick = this.handleBackButtonClick.bind(this);

    this.state = {
      estado: 'oli',
    };

    //this.Hint = React.createRef();
  }

  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* <NavigationEvents onDidFocus={() => this.refrescar() } /> */}
            {/* <BackButton onBack={ () => { return true }  }> */}
            <View style={styles.wrapper}>
              <Text>APP prueba Dictado</Text>

              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Discado')}>
                {/* <View style={styles.box} ><Text style={styles.labelBox} > Denuncio Siniestro </Text></View>    */}
                <ImageBackground
                  //source={require('../assets/img/denuncio-siniestro-dg.jpg')}
                  source={require('../assets/img/boton1.jpg')}
                  imageStyle={{borderRadius: 10}}
                  style={styles.box}>
                  {/* <View style={styles.overlay}>
                  <Text style = {[styles.textStyle, {paddingTop: 20}]} >Denuncio Siniestro</Text>
                </View> */}
                  {/* <View style={styles.overlay}></View>  */}
                  <View
                    style={{
                      flexDirection: 'column',
                      position: 'absolute',
                      bottom: 0,
                      paddingLeft: 10,
                      paddingBottom: 10,
                    }}>
                    <Text style={[styles.textStyle4, {}]}>Dictado 2 botones</Text>
                    
                  </View>
                </ImageBackground>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Discado_2')}>
                {/* <View style={styles.box} ><Text style={styles.labelBox} > Denuncio Siniestro </Text></View>    */}
                <ImageBackground
                  //source={require('../assets/img/denuncio-siniestro-dg.jpg')}
                  source={require('../assets/img/boton1.jpg')}
                  imageStyle={{borderRadius: 10}}
                  style={styles.box}>
                  {/* <View style={styles.overlay}>
                  <Text style = {[styles.textStyle, {paddingTop: 20}]} >Denuncio Siniestro</Text>
                </View> */}
                  {/* <View style={styles.overlay}></View>  */}
                  <View
                    style={{
                      flexDirection: 'column',
                      position: 'absolute',
                      bottom: 0,
                      paddingLeft: 10,
                      paddingBottom: 10,
                    }}>
                    <Text style={[styles.textStyle4, {}]}>Dictado 4 botones</Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}
