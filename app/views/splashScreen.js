import React, { Component } from 'react';
import { View, Text, Image, Dimensions, StyleSheet, TouchableOpacity, ImageBackground, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import firebase from 'react-native-firebase';
// import Boton from '../components/Button/Button.component';

const { width, height } = Dimensions.get('window');
//-----------------------------------------------------------------
// import { normalize } from '../styles/normalizeFont';
import { scale, verticalScale, moderateScale } from '../styles/scaling';
import themes from '../styles/theme.style';

//-----------------------------------------------------------------
import { Utils, Validar, CheckConnectivity, Exponea, Redirect } from '../helpers';
//import NetInfo from '@react-native-community/netinfo'
//import FingerprintScanner from 'react-native-fingerprint-scanner';
//import Hint from '../components/Hint/Hint.component';


class MyImagen extends Component {

    constructor(props) {
        super(props);
        this.state = {
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

    }
}

export default class splashScreen extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            status: false,
            porcentaje: 0,
            texto: '',
            barColor: '#0873ba',
            color: '#bbbbbb',
            compatible: false,
            tituloHint: '',
            isConnected: '',
            isType: '',
        };

        this.Hint = React.createRef();
        //this._bootstrapAsync();

     let currentTime = Redirect.getTimeNow();
     console.log(`Constructor splashScreen  ==> ${currentTime} !!!!x!`);


    }

    // Fetch the token from storage then navigate to our appropriate place
    // _bootstrapAsync = async () => {
    //     await this._redireccionar();
    // };

    //-----------------------------------------------------------------

    _redireccionar = async () => {
        //console.log("REDIRECCIONAR desde SplashScreen : ");
        
        const USU_RUT = await AsyncStorage.getItem('USU_RUT');
        console.log("USU_RUT SPLASHSCREEN desde _redireccionar: " +  USU_RUT );

        // const MOSTRAR_ONBOARNING = await AsyncStorage.getItem('MOSTRAR_ONBOARNING');
        // console.log("MOSTRAR_ONBOARNING : " +  MOSTRAR_ONBOARNING );

        //---Authentication
        let compatible = await this._checkDeviceForHardware();
        console.log("ES COMPATIBLE LA APP CON FINGERPRINT : " + compatible);
        let huella = 0;

        await Utils.getItem('huella').then(function (data) {
            huella = parseInt(data);
        });
        console.log("ingreso con huella : " + huella);


        if (huella == 1 && compatible == true) {
            console.log("se abre popup huella");
            //this._Aceptar(1);
            try {
                this.props.navigation.navigate('Auth');
            } catch (error) {
                console.log(error)
            }

        } else {
            //this.props.navigation.navigate(USU_RUT ? 'App' : 'Auth');
            // if(USU_RUT != null){
            //     this.props.navigation.navigate('App');
            // }else{
                this.props.navigation.navigate('Auth');
            // }
        }
    }

    _checkDeviceForHardware = async () => {

        try {
            let compatible = await FingerprintScanner.isSensorAvailable().then((biometryType) => {
                console.log(biometryType);
                return true
            }).catch( error => { return false });

            this.setState({ compatible })
            return compatible
        } catch (error) {
            console.log(error);
            return false 
            //Alert.alert('Error', error);
        }


    }

    //-----------------------------------------------------------------

    clearAsyncStorage = async () => {
        try {
            //console.log('clearAsyncStorage');
            // AsyncStorage.clear();            
            //await AsyncStorage.clear();
            //Utils.removeItemValue('TOKEN_BCI_JWT');
            return true
        } catch (error) {
            console.log(error);
            return false
        }
    }

    async componentDidMount() {

    let currentTime = Redirect.getTimeNow();
     console.log(`componentDidMount splashScreen  ==> ${currentTime} !!!!x!`);


        try {

            if (Platform.OS === "android") {
                // this.setState({ fontLoaded: true })
                // NetInfo.fetch().then(state => {
                //     console.log("Connection type", state.type);
                //     console.log("Is connected?", state.isConnected);
                //     //isConnected = state.isConnected;      
                //     this.setState({
                //     isType : state.type,
                //     isConnected : state.isConnected,
                //     });
                //     console.log(state);
                //     if(state.isConnected == true){
                //         //this.setState({ tituloHint: "Atención" });
                //         //this.Hint.current.mostrarConParametros('Conexión correcta.');
                //         console.log("isInternetReachable? ", state.isInternetReachable);
                //         if(state.isInternetReachable == true){
                             await Utils.checkPermission();
                //             //Utils.createNotificationListeners(); //add this line
                           
                     // await Utils.parametros();
            let currentTime = Redirect.getTimeNow();
            console.log(`1ra llamada a parametros_Todos ==> ${currentTime} !!!!x!`);      
                            await Utils.parametros_Todos();

                            this._interval = setInterval(async () => {
                                                this.setTimePassed();
                                            }, 10);

                //         }else{
                //             this.setState({ tituloHint: "Error de conexíon" });
                //             this.Hint.current.mostrarConParametros('No se puede acceder a internet con la conexión de red actualmente activa.');                        
                //         }


                //     }else{
                //         this.setState({ tituloHint: "Error de conexíon" });
                //         this.Hint.current.mostrarConParametros('No está conectado a internet, por favor encienda WiFi o 3G.');
                //     }


                // });
            }else{

                    Utils.checkPermission();
                   
                   // Utils.parametros();
                   Utils.parametros_Todos();
                    

                    const USU_RUT = await AsyncStorage.getItem('USU_RUT');
                    console.log("USU_RUT SPLASHSCREEN desde setTimePassed : " +  USU_RUT );
        
                    const MOSTRAR_ONBOARNING = await AsyncStorage.getItem('MOSTRAR_ONBOARNING');
                    console.log("MOSTRAR_ONBOARNING desde setTimePassed : " +  MOSTRAR_ONBOARNING );
        
                    if(USU_RUT){
                        //await this._redireccionar();
                        this.props.navigation.navigate('Auth');
                    }else{
        
                        if(MOSTRAR_ONBOARNING == null){
                            console.log("==> Inicio");
                            this.props.navigation.navigate('Inicio');                    
                        }else{
                            console.log("==> Auth");
                            this.props.navigation.navigate('Auth');
                        }
                        
                    }



            }

            //firebase.analytics().setCurrentScreen('splashscreen');
            //Exponea.BCI_Events("splashscreen");
            
        } catch (error) {
            console.log(error)
        }

    }
    //-----------------------------------------------------------------

    componentWillUnmount() {

        if (Platform.OS === "android") {

        clearInterval(this._interval);
        //console.log('componentWillUnmount...');
        }

    }


    //-----------------------------------------------------------------

    _CheckConnectivity = () => {

        // if (Platform.OS === "android") {

        // }else{
        //     // For iOS devices
            
        // }

        NetInfo.isConnected.fetch().then(isConnected =>{
            if(isConnected){
                return true
            }else{
                return false
            }
        });

    }

    handleConnectivityChange = (isConnected) => {
        if (isConnected == true) {
          //this.setState({ connection_Status: "Online" })
          this.setState({ tituloHint: "Atención" });
          this.Hint.current.mostrarConParametros('Conexión correcta.');
        }
        else {
            // this.setState({ connection_Status: "Offline" })
            this.setState({ tituloHint: "Error de conexíon" });
            this.Hint.current.mostrarConParametros('No está conectado a internet, por favor encienda WiFi o 3G.');
        }
    };

    //-----------------------------------------------------------------

    _Prueba() {
        let porc = this.state.porcentaje;
        let result = porc + (width * 0.001);

        //console.log(result);


        if (result < 100) {
            this.setState({ porcentaje: result });
        } else {
            result = width - (width * 0.40);
            this.setState({ porcentaje: result });
            //this.props.navigation.navigate('Inicio');
        }

    }

    clearInterval(valor) {
        //console.log(valor);
    }

    setTimePassed = async () => {
        let porc = this.state.porcentaje;
        //let result = porc + (width * 0.001); // ralentiza el inicio
        let result = porc + (width * 0.1);

        let x = result;
        switch (true) {
            case (x < 25):
                //this.setState({ texto: 'Activando servicios' });
                break;
            case (x >= 25 && x < 50):
                //this.setState({ texto: 'Iniciando componentes de la APP' });
                break;
            case (x >= 50 && x < 75):
                //this.setState({ texto: 'Revisando tus notificaciones' });
                break;
            case (x >= 100):
                this.setState({ texto: '¡Estamos listos!' });
                this.setState({ barColor: '#06973e' });
                this.setState({ color: '#5cbb81' });
                this.setState({ status: true });
                break;
        }

        if (result < 100) {
            this.setState({ porcentaje: result });
        } else {
            result = width - (width * 0.40);
            this.setState({ porcentaje: result });
        }

        if (result >= 100) {
            clearInterval(this._interval);
            const USU_RUT = await AsyncStorage.getItem('USU_RUT');
            console.log("USU_RUT SPLASHSCREEN desde setTimePassed : " +  USU_RUT );

            const MOSTRAR_ONBOARNING = await AsyncStorage.getItem('MOSTRAR_ONBOARNING');
            console.log("MOSTRAR_ONBOARNING desde setTimePassed : " +  MOSTRAR_ONBOARNING );

            if(USU_RUT){
                console.log("RUT => ", USU_RUT);
                await this._redireccionar();
            }else{

                if(MOSTRAR_ONBOARNING == null){
                    console.log("==> Inicio");
                    this.props.navigation.navigate('Inicio');                    
                }else{
                    console.log("==> Auth");
                    this.props.navigation.navigate('Auth');
                }
                
            }
            
        }

    }

    _onPressIcon = () => {
        //console.log('click button')
    }


    render() {

        return (
            <View style={styles.wrapper} >

                    <View style={styles.logoView}>
                        <MyImagen />
                    </View>
                
                {/* <Hint
                    title={this.state.tituloHint}
                    ref={this.Hint}
                /> */}
            </View>
        );
    }
}

const styles = StyleSheet.create({

    wrapper: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems:'center',
        //backgroundColor:'#f4f4f4',
        backgroundColor: '#fafafa',
    },
    content: {
        //height: verticalScale(height/4), 
        width: width,
        //backgroundColor:'red', 
        position: 'absolute',
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoView: {
        paddingTop: height / 3, //scale(height / 3), 
        width: width,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        width: moderateScale(180),
        height: verticalScale(46),
        resizeMode: 'contain'
    },
    titulo: {
        fontSize: moderateScale(themes.FONT_SIZE_SMALL),
        fontFamily: "Overpass-Bold",
        marginBottom: verticalScale(10)
    },
    icono: {
        width: moderateScale(40),
        height: verticalScale(40),
    },
    barColor: {
        height: 10,
        borderRadius: 4,
    }



});	  