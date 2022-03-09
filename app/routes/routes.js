import 'react-native-gesture-handler';
import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Alert, Image, Dimensions, SafeAreaView, ScrollView, StyleSheet, Pressable, Platform, StatusBar, ToastAndroid } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { DefaultTheme, NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//import theme from '../styles/theme.style';
//import Ionicons from 'react-native-vector-icons/Ionicons';
//import Feather from 'react-native-vector-icons/Feather';
import { scale, verticalScale, moderateScale } from '../styles/scaling';
//import { Utils, Validar, CheckConnectivity, Exponea } from '../helpers';
//import WSRestApi from '../services/wsRestApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { width, height } = Dimensions.get('window');
const size = (width >= 768) ? scale(10) : scale(20);
const isIphoneX = DeviceInfo.hasNotch();

const StatusBarHeight = Platform.select({
    ios: isIphoneX == true ? 30 : 15,
    android: 0,//StatusBar.currentHeight,
    default: 0
})

const BarHeight = Platform.select({
    ios: isIphoneX == true ? 130 : 70,
    android: 60,
    default: 0
})

const BarHeightAuth = Platform.select({
    ios: isIphoneX == true ? 90 : 60,
    android: 60,
    default: 0
})

const TabBarHeight = Platform.select({
    ios: isIphoneX == true ? 80 : 50,
    android: 50,
    default: 0
})

const TabBarPaddingBottom = Platform.select({
    ios: isIphoneX == true ? 20 : 0,
    android: 0,
    default: 0
})

const navTheme = DefaultTheme;
navTheme.colors.background = '#fff';



function HeaderLeft({ navigation, color }) {
    return (
        <View style={{ marginLeft: 20, marginTop: StatusBarHeight, }}>
            <TouchableOpacity onPress={() => {
                //console.log("<--- HeaderLeft ", navigation);
                //navigation.navigate("Login");
                navigation.goBack();
            }} >
                <Feather name="arrow-left" size={size} style={{ color: color }} />
            </TouchableOpacity>
        </View>
    );
}
function HeaderAuthLeft({ navigation, color }) {
    return (
        <View style={{ marginLeft: 20, marginTop: isIphoneX == true ? -10 : 0, }}>
            <TouchableOpacity onPress={() => {
                navigation.goBack();
            }} >
                <Feather name="arrow-left" size={size} style={{ color: color }} />
            </TouchableOpacity>
        </View>
    );
}

function HeaderRight({ navigation }) {
    let valor = 0;

    if(valor == 0){
        return (
            <View
                style={{
                    backgroundColor: 'transparent',
                    marginTop: StatusBarHeight,
                }}>
                <TouchableOpacity onPress={ async () => {  
                    
                        navigation.navigate('Home');
                                              
                }} >
                    <Text>Inicio</Text>
                    
                </TouchableOpacity>
            </View>
        );  
    }


}



function LogoTitle({ navigation }) {

    handleClick = async () => {

        try {
          let hayConexion = await CheckConnectivity.fnCheckConnectivity();
          if (hayConexion) {
            navigation.navigate('Home')
          } else {
            this.setState({ titleHint: 'Error de conexión' });
            navigation.navigate('Home');
            //this.Hint.current.mostrarConParametros("No está conectado a internet, por favor encienda WiFi o 3G.");
          }      
        } catch (error) {
          //console.log(error);
        }
    
      }

    return (
        <View
            style={{
                backgroundColor: 'transparent',
                marginTop: StatusBarHeight,
            }}>

<TouchableOpacity onPress={this.handleClick} >
                

            {/* <Image
                source={require('../assets/img/logo_2x.png')}
                style={{
                    width: Platform.OS === 'ios' ? 181 / 1.3 : 181 / 1.2,
                    height: Platform.OS === 'ios' ? 45 / 1.3 : 45 / 1.2,
                    borderColor:'#000'
                }}
            /> */}

</TouchableOpacity>

        </View>
    );
}


//---- AuthLoadingStack ----
//import SplashScreen from '../views/splashScreen';
//import initializingScreen from '../views/initializing.js';
//---- FIN AuthLoadingStack ----

//---- AuthStack ----
// import LoginScreen from '../views/Login/Login.view';
// import ActualizarApp from '../views/ActualizarApp/ActualizarApp.view';
// import ActivarHuellaScreen from '../views/ActivarHuella/ActivarHuella.view';
// import RecuperarScreen from '../views/RecuperarPassword/RecuperarPassword.view';
// import RecuperarScreen2 from '../views/RecuperarPassword/RecuperarPassword2.view';
// import IngresarPinScreen from '../views/RecuperarPassword/IngresarPin.view';
// import IngresarPasswordScreen from '../views/RecuperarPassword/IngresarPassword.view';
// import RegistroUsuarioScreen from '../views/RegistroUsuario/RegistroUsuario.view';
// import RegistroUsuario2Screen from '../views/RegistroUsuario/RegistroUsuario2.view';

//---- FIN AuthStack ----

//---- AppStack ----
import HomeScreen from '../views/Home.js';
import DiscadoScreen from '../views/voz.js';
import Discado_2Screen from '../views/voz_2.js';
import Discado_3Screen from '../views/voz_3.js';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();



function AppStack() {
    return (

        <Stack.Navigator
            initialRouteName="Homex"
            screenOptions={{
                headerTitleAlign: 'center',
                headerStyle: {                    
                    backgroundColor: '#fff',
                    height: BarHeight
                },
            }}
            options={{
                gestureEnabled: false,
            }}
        >
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={({ navigation, route }) => ({
                    //headerLeft: props => <MenuTitle {...props} navigation={navigation} />,
                    headerTitle: props => <LogoTitle {...props} navigation={navigation} />,
                    headerRight: props => <HeaderRight navigation={navigation} />
                })}
            />

            <Stack.Screen
            name="Discado"
            component={DiscadoScreen}
            options={({ navigation, route }) => ({
                //headerLeft: props => <MenuTitle {...props} navigation={navigation} />,
                headerTitle: props => <LogoTitle {...props} navigation={navigation} />,
                headerRight: props => <HeaderRight navigation={navigation} />
            })}
            />
             <Stack.Screen
            name="Discado_2"
            component={Discado_2Screen}
            options={({ navigation, route }) => ({
                //headerLeft: props => <MenuTitle {...props} navigation={navigation} />,
                headerTitle: props => <LogoTitle {...props} navigation={navigation} />,
                headerRight: props => <HeaderRight navigation={navigation} />
            })}
            />

            <Stack.Screen
            name="Discado_3"
            component={Discado_3Screen}
            options={({ navigation, route }) => ({
                //headerLeft: props => <MenuTitle {...props} navigation={navigation} />,
                headerTitle: props => <LogoTitle {...props} navigation={navigation} />,
                headerRight: props => <HeaderRight navigation={navigation} />
            })}
            />




            

                                      

        </Stack.Navigator>
        
    );
}



function getTabBarVisible(route) {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';
    const hideOnScreens = [
        'Buzon', 'BuzonDetalle', 'Asistencia', 'AsistenciaDetalle', 'Config', 'Info', 'Password', 'SiniestroVehiculo', 
        'Prueba2', 'SeguimientoHome', 'DetalleReembolsoSaludHome' , 'Reembolso' ,'PagoEnLinea','VisorPDF',
        'Prueba', 'DenuncioSeguro', 'ConfirmacionDenunciaSeguro', 'DatosDelSiniestro' , 'DatosConstancia', 'DatosOtroConductor',
        'DenunciaSiniestro', 'Accidente2', 'DatosTerceroAcc', 'Accidente31', 'Accidente32', 'Accidente4', 'PantallaFinalAcc',
        'PantallaFinalError', 'PantallaFinalTermino', 'Robo', 'Robo21', 'Robo22', 'Robo3', 'DatosTercero', 'FinalActoMalicios',
        'ActoMalicioso', 'ActoMalicios21', 'ActoMalicios22', 'ActoMalicios3','Contactar2', 'Deposito', 'EditarDeposito' ,'ConfirmarCodigo' ,'ConfirmarDeposito' ,'ConfirmarCorreo','DatosActualizados'];     
    if(hideOnScreens.indexOf(routeName) > -1) return false;
    return true;    
  }

function MainTabs() {
    return (
        <Tab.Navigator

            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    let anchoIcono = 60;
                    let altoIcono = 60;
                    switch (route.name) {
                        case 'Inicio':
                            if (focused) {
                                return <View style={{ flex: 1, width: '100%', }}>
                                    <View style={{ top: 0, height: 2 , backgroundColor: '#006FB9', }} ></View>
                                    <View style={{ flex: 1, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' }}>
                                        {/* <Image source={require('../assets/icon/c_home.png')} style={{ width: anchoIcono, height: altoIcono, opacity: focused ? 1 : 0.5 }} /> */}
                                    </View>
                                </View>
                            } else {
                                return <View style={{ flex: 1, width: '100%', }}>
                                    <View style={{ top: 0, height: 2, backgroundColor: 'transparent', }} ></View>
                                    <View style={{ flex: 1, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' }}>
                                        {/* <Image source={require('../assets/icon/c_home.png')} style={{ width: anchoIcono, height: altoIcono, opacity: focused ? 1 : 0.5 }} /> */}
                                    </View>
                                </View>
                            }
                            break;
                        
                    }
                },        
                
                    activeTintColor: '#595B5A',
                    inactiveTintColor: '#8F8F8F',
                    labelStyle: {                    
                        marginBottom: 5,
                        fontSize: 11
                    },                
                    style: {
                        backgroundColor: '#f5f5f5',
                        paddingBottom: TabBarPaddingBottom,
                        height: TabBarHeight, 
                        //marginBottom: isIphoneX == true ? 0 : 5,                   
                    },
                         
            })}

        >
            <Tab.Screen name="Inicio" 
                component={AppStack} 
                options={({ route }) => ({
                    headerShown:false,
                    gestureEnabled:false,
                    tabBarVisible: getTabBarVisible(route) })
                }             
            />
        
        </Tab.Navigator>
    );
}


function MainNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
            name="Main" 
            component={MainTabs}  
            options={{
                    tabBarLabel: 'Seguimientos',
                    headerShown:false,
                    gestureEnabled:false,
                }}
                />
        </Stack.Navigator>
    );
}



class routes extends Component {

    constructor(props) {
        super(props)
        this.state = {
            userToken: null,
        }
    }

    render() {
        return (
            <NavigationContainer
                theme={navTheme}
            >
                {/* {this.state.userToken == null ? <AuthNavigator/> : <MainNavigator/> } */}
                <Stack.Navigator>
                    {/* <Stack.Screen options={{ headerShown: false, gestureEnabled: false }} name="Initial" component={InitialNavigator} /> */}
                    {/* <Stack.Screen options={{ headerShown: false, gestureEnabled: false }} name="Auth" component={AuthNavigator} />  */}
                    <Stack.Screen options={{ headerShown: false, gestureEnabled: false }} name="App" component={MainNavigator} />
                </Stack.Navigator>

            </NavigationContainer>
        );
    }

}

export default routes;