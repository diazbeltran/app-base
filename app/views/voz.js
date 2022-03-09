import React, {Component} from 'react';
import {
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Modal,
  Image,
  Vibration,
  Platform,
  ScrollViewBase,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import FileViewer from "react-native-file-viewer";

//import Voice from '@react-native-community/voice';
//import Voice from '@react-native-voice/voice';
import Voice, {
  SpeechRecognizedEvent,
  SpeechResultsEvent,
  SpeechErrorEvent,
} from '@react-native-voice/voice';
import {
  PERMISSIONS,
  check,
  request,
  RESULTS,
  openSettings,
} from 'react-native-permissions';

//import Select from '../../../components/Select/Select.component';
//import Boton from '../../../components/Button/Button.component';
//import TextInput2 from '../../../components/TextInput/TextInput.component';
import TextInputMultiline from '../components/TextInput/TextInputMultiline.component';

//import Loading from '../../../components/Loading/Loading.component';
import styles from './tab5.view.style.js';
//import Hint from '../../../components/Hint/Hint.component';
//import HintAlertas from '../../../components/Hint/Hint.component';
//import HintImagenAmpliada from '../../../components/Hint/Hint.component';
//import HintPDF from '../../../components/Hint/HintPDF.component';
//import WSRestApi from '../../../services/wsRestApi';
//import WSRestApiContacto from '../../../services/wsRestApiContacto';
///import config from '../../../config/dev.config';
//import { Utils, Validar, CheckConnectivity } from '../../../helpers';
//import NetInfo from "@react-native-community/netinfo";
//import TextInputTelefonoMovil from '../../../components/TextInput/TextInputTelefonoMovil.component';
//import Icon from 'react-native-vector-icons/FontAwesome5';
import {scale, verticalScale, moderateScale} from '../styles/scaling';
const {width, height} = Dimensions.get('window');
const PATTERN = [1000, 2000, 3000, 4000];
let timer = null;
export default class Discado extends Component {
  // static async getDerivedStateFromProps(props, state) {

  //     //console.log(props);
  //     //let modo = await AsyncStorage.getItem("MODO");
  //     //this.setState({ modoListaCorta: 'true' });
  //     //console.log("SE HA DEVUELTO EL MODO ACTUAL DE LA VISTA ", modo);

  //     return null;
  //   }

  constructor(props) {
    super(props);

    this.inputRefs = {};
    //  this.Loading = React.createRef();
    this.state = {
      pesoMaximo: 2000,
      ocultar: true,
      textInputMultiline: '',
      textInputMultiline2: '',
      textoMultiLine: '',

      fontLoaded: false,
      isLoading: true,
      //isLoading: false,
      nombre: new String('Felipe Rubio'),
      texto2: '',
      motivo: undefined,
      items: [],
      modoListaCorta: false,
      mensaje: '',
      textoInline: '',
      accion: '',
      prefijo: '+56',
      sufijo: '',
      otrosRepetido: 0,

      TOKEN_BCI_JWT: '',
      TOKEN_JWT: '',
      USU_ID: '',
      USU_RUT: '',
      WebAPIRest_BCI: '',
      PasswordWs: '',

      arregloImagenes: [],
      tituloHint: '',

      hayConexion: false,
      visible: false,
      modalVisible: true,

      //MICROFONO
      results: [],
      partialResults: [],
      textoActual: '',
      stylePressIn: {},
      stylePressOut: {},
      stylePressInTouchableMic: {},
      stylePressInCirculoIconoMic:{},
      stylePressInTouchableMic2: {},
      stylePressInCirculoIconoMic2:{},
    };
    this.Hint = React.createRef();
    this.Hint2 = React.createRef();
    this.HintImagenAmpliada = React.createRef();
    this.HintPDF = React.createRef();
    //this.ActionSheet = React.createRef();
    this.Selector = React.createRef();
    this.Motivo = React.createRef();
    this.TextInput2 = React.createRef();
    this.TextInputMultiline = React.createRef();
    this.TextInputMultiline2 = React.createRef();
    this.HintAlertas = React.createRef();
    this.TextInput2 = React.createRef();

    // Voice.onSpeechStart = this.onSpeechStartHandler.bind(this);
    // Voice.onSpeechEnd = this.onSpeechEndHandler.bind(this);
    // Voice.onSpeechResults = this.onSpeechResultsHandler.bind(this);
    // Voice.onSpeechError = this.onSpeechError.bind(this);
    console.log('---------------------constructor voice ---------------');
    Voice.destroy().then(Voice.removeAllListeners);
        Voice.onSpeechStart = this.onSpeechStartHandler.bind(this);
        Voice.onSpeechEnd = this.onSpeechEndHandler.bind(this);
        Voice.onSpeechResults = this.onSpeechResultsHandler.bind(this);
        Voice.onSpeechError = this.onSpeechError.bind(this);
  }

  // validarComentarioOnBlur = () => {
  //   let texto = this.TextInputMultiline.current.devolverMultiTexto();

  //   if (texto.length > 0 && texto.trim() != '') {
  //     this.setState({heightPatente: 60});
  //     this.TextInputMultiline.current.msjAlert('');
  //   } else {
  //     this.setState({heightComentario: 65});
  //     this.TextInputMultiline.current.msjAlert('Ingresa un mensaje.');
  //   }
  // };

  async componentDidMount() {
    const {navigation} = this.props;
    this._unsubscribe = navigation.addListener('focus', () => {
      /*-----------------------------------------------------------*/
      let momentoActual = new Date();
      let hora = momentoActual.getHours();
      let minuto = momentoActual.getMinutes();
      let segundo = momentoActual.getSeconds();

      let horaImprimible = hora + ' : ' + minuto + ' : ' + segundo;
      console.log(`do something ==> ${horaImprimible}!`);
      /*-----------------------------------------------------------*/
      //this.cargarDatos();

      this.getPermissionAsync();
    });
  }

  componentWillUnmount() {
    console.log('---------------------contac Unmount ---------------');
    Voice.destroy().then(Voice.removeAllListeners);

    this._unsubscribe();
  }

  RecibirOffset(value) {
    if (value == '1') {
      this.setState({offset: verticalScale(25)});
      console.log('ARRIBA');
    }
    if (value == '2') {
      this.setState({offset: verticalScale(50)});
      console.log('MEDIO');
    }
    if (value == '3') {
      this.setState({offset: verticalScale(100)});
      console.log('ABAJO');
    }
  }

  mostrarElemento = e => {
    console.log('Tab5 => nos ha llegado el elemento => ', e);
  };

  //-----------------------------------------------------------------

  mostrarImagenAmpliada = (imagen, key, extension) => {
    this.setState({imagenAmpliada: imagen});
    console.log('extension => ', extension);
    if (extension == 'pdf') {
      let MyArray = this.Selector.current.obtenerArregloImagenes();
      let pdfBase64 = '';
      console.log('MyArray => ', MyArray);
      MyArray.forEach(e => {
        if (e.key == key) {
          pdfBase64 = e.Archivo;
        }
      });

      let obj = pdfBase64.split(',');
      pdfBase64 = obj[1];

      ////this.HintPDF.current.mostrarConParametros5(pdfBase64, key);
      this.HintImagenAmpliada.current.mostrarConParametros5(pdfBase64, key);

      //this.openFile(MyArray[0].Uri);
    } else if (extension == 'docx') {
      let MyArray = this.Selector.current.obtenerArregloImagenes();
      console.log(MyArray[0].Uri);
      this.openFile(MyArray[0].Uri);
    } else {
      this.HintImagenAmpliada.current.mostrarConParametros2(imagen, key);
    }
  };

  //-----------------------------------------------------------------

  //-----------------------------------------------------------------
  validar = async (categoria) => {

    if (categoria == 'TextInputMultiline') {

        let descripcionhechos = this.TextInputMultiline.current.devolverMultiTexto() == undefined ? "" : this.TextInputMultiline.current.devolverMultiTexto();

        descripcionhechos = descripcionhechos.trim();

        if (descripcionhechos == '') {
            let respuesta = 'Ingresa una descripción';
            this.TextInputMultiline.current.msjAlert(respuesta);
            return false;
        } else {
            this.TextInputMultiline.current.msjAlert('');
            return true;
        }
    }

    if (categoria == 'TextInputMultiline2') {

        let descripcionDanhos = this.TextInputMultiline2.current.devolverMultiTexto() == undefined ? "" : this.TextInputMultiline2.current.devolverMultiTexto();

        descripcionDanhos = descripcionDanhos.trim();


        if (descripcionDanhos == '') {
            let respuesta = 'Ingresa una descripción2.';
            this.TextInputMultiline2.current.msjAlert(respuesta);
            return false;
        } else {
            this.TextInputMultiline2.current.msjAlert('');
            return true;
        }
    }
}

  // async startRecording() {
  //   try {
  //     Vibration.vibrate();

  //     this.setState({
  //       recognized: '',
  //       pitch: '',
  //       error: '',
  //       started: '',
  //       results: [],
  //       partialResults: [],
  //       end: '',
  //     });

  //     //let texto = this.TextInputMultiline.current.devolverMultiTexto();
  //     let texto = '';
  //     texto =
  //       this.TextInputMultiline.current.devolverMultiTexto() == undefined
  //         ? ''
  //         : this.TextInputMultiline.current.devolverMultiTexto();
  //     if (texto.length > 0) {
  //       console.log('Hay Texto!!!');
  //       this.setState({textoActual: texto});
  //     } else {
  //       console.log('No Hay Texto!!!');
  //       this.setState({textoActual: ''});
  //     }
  //     this.TextInputMultiline.current.msjAlert('Dictando... ');

  //     if (Platform.OS == 'ios') {
  //       await Voice.start('es-ES');
  //     } else {
  //       Voice.start('es_ES', {
  //         RECOGNIZER_ENGINE: 'GOOGLE',
  //         EXTRA_PARTIAL_RESULTS: true,
  //       });
  //     }
  //   } catch (error) {
  //     console.log('-----------------' + error);
  //   }
  // }

  async startRecording(tipo) {
    try {

       

        Vibration.vibrate();

        this.setState({
            recognized: '',
            pitch: '',
            error: '',
            started: '',
            results: [],
            partialResults: [],
            end: '',
        });

        if (tipo == 1) {
            this.setState({ accion: '1' });                
            let texto = "";
            texto = this.TextInputMultiline.current.devolverMultiTexto() == undefined ? "" : this.TextInputMultiline.current.devolverMultiTexto();          
            if (texto.length > 0) {
                console.log("Hay Texto!!!");
                this.setState({ textoActual: texto })
            } else {
                console.log("No Hay Texto!!!");
                this.setState({ textoActual: '' })
            }
            this.TextInputMultiline.current.msjAlert("Dictando... ");
        }

        if (tipo == 2) {
            this.setState({ accion: '2' });
            let texto = "";                
            texto = this.TextInputMultiline2.current.devolverMultiTexto() == undefined ? "" : this.TextInputMultiline2.current.devolverMultiTexto();
            if (texto.length > 0) {
                console.log("Hay Texto!!!");
                this.setState({ textoActual: texto })
            } else {
                console.log("No Hay Texto!!!");
                this.setState({ textoActual: '' })
            }
            this.TextInputMultiline2.current.msjAlert("Dictando... ");
        }

        if (Platform.OS == 'ios') {
            await Voice.start('es-ES');
        } else {
            Voice.start('es_ES', {
                "RECOGNIZER_ENGINE": "GOOGLE",
                "EXTRA_PARTIAL_RESULTS": true
            });
        }


    } catch (error) {
        console.log(error);
    }
}

  // async stopRecording() {
  //   try {
  //     console.log('stopRecording...');
  //     this.TextInputMultiline.current.msjAlert('');
  //     await Voice.stop();

  //     Vibration.vibrate(500);
  //   } catch (e) {
  //     console.error('-------' + e);
  //   }
  // }

  async stopRecording(tipo) {
    try {
        console.log("stopRecording...");
        if (tipo == 1) {
            this.TextInputMultiline.current.msjAlert("");
        }
        if (tipo == 2) {
            this.TextInputMultiline2.current.msjAlert("");
        }

        await Voice.stop();
        console.log("seguimiento stop-->");
        Vibration.vibrate(500);

    } catch (e) {
        console.error(e);
    }
}

  onSpeechStartHandler = (e) => {
    console.log('onSpeechStart: ', e);
    this.setState({
      started: '√',
    });
  };

  onSpeechRecognized = (e) => {
    console.log('onSpeechRecognized: ', e);
    this.setState({
      recognized: '√',
    });
  };

  // onSpeechEndHandler = (e) => {
  //   console.log('onSpeechEnd: ', e);
  //   this.setState({
  //     end: '√',
  //   });

  //   this.TextInputMultiline.current.msjAlert('');
  // };

  onSpeechEndHandler = (e) => {
    console.log('onSpeechEnd: ', e);
    this.setState({
        end: '√',
    });

    if (this.state.accion === '1') {
        this.TextInputMultiline.current.msjAlert("");
    }

    if (this.state.accion === '2') {
        this.TextInputMultiline2.current.msjAlert("");
    }

};




  // onSpeechResultsHandler = (e) => {
  //   console.log('onSpeechResults: ', e);
  //   this.setState({
  //     results: e.value[0],
  //   });

  //   if (this.state.results != null && this.state.results != '') {
  //     //console.log("TERMINA SPEECH...");
  //     let fraseFinal = '';
  //     let results = this.state.results;
  //     let textoActual = this.state.textoActual;
  //     if (textoActual == '') {
  //       let mayus = results.charAt(0).toUpperCase();
  //       let colaTexto = results.substr(1, results.length);
  //       fraseFinal = mayus + colaTexto;
  //     } else {
  //       fraseFinal = textoActual + ', ' + results;
  //     }

  //     this.TextInputMultiline.current.agregarMultiText(fraseFinal);
  //   }
  // };

  onSpeechResultsHandler = (e) => {
    console.log('onSpeechResults: ', e);
    this.setState({
        results: e.value[0],
    });

    if (this.state.accion === '1') {
        if (this.state.results != null && this.state.results != '') {
            //console.log("TERMINA SPEECH...");
            let fraseFinal = "";
            let results = this.state.results;
            let textoActual = this.state.textoActual;
            if (textoActual == "") {
                let mayus = results.charAt(0).toUpperCase();
                let colaTexto = results.substr(1, results.length);
                fraseFinal = mayus + colaTexto;
            } else {
                fraseFinal = textoActual + ", " + results;
            }

            this.TextInputMultiline.current.agregarMultiText(fraseFinal);

        }

    }

    if (this.state.accion === '2') {
        if (this.state.results != null && this.state.results != '') {
            //console.log("TERMINA SPEECH...");
            let fraseFinal = "";
            let results = this.state.results;
            let textoActual = this.state.textoActual;
            if (textoActual == "") {
                let mayus = results.charAt(0).toUpperCase();
                let colaTexto = results.substr(1, results.length);
                fraseFinal = mayus + colaTexto;
            } else {
                fraseFinal = textoActual + ", " + results;
            }

            this.TextInputMultiline2.current.agregarMultiText(fraseFinal);

        }

    }

};



  onSpeechError = (e) => {
    console.log('onSpeechError: ', e);
  };

  onSpeechPartialResults = (e) => {
    console.log('onSpeechPartialResults: ', e);
    this.setState({
      partialResults: e.value,
    });
  };

  onSpeechVolumeChanged = (e) => {
    console.log('onSpeechVolumeChanged: ', e);
    this.setState({
      pitch: e.value,
    });
  };

  getPermissionAsync = async () => {
    if (Platform.OS == 'ios') {
      const res = await request(PERMISSIONS.IOS.MICROPHONE);
      if (res === RESULTS.GRANTED) {
        console.log('The permission microphone is granted');
      }

      const res2 = await request(PERMISSIONS.IOS.SPEECH_RECOGNITION);
      if (res2 === RESULTS.GRANTED) {
        console.log('The permission speech recognition is granted');
      }
    } else {
      const res = await request(PERMISSIONS.ANDROID.MICROPHONE);
      if (res === RESULTS.GRANTED) {
        console.log('The permission is granted');
      }

      const res2 = await request(PERMISSIONS.ANDROID.RECORD_AUDIO);
      if (res2 === RESULTS.GRANTED) {
        console.log('The permission record audio is granted');
      }
    }
  };

  // handlePressIn = async () => {
  //   console.log('PRESS IN...');
  //   this.startRecording();

  //   this.setState({
  //     stylePressInTouchableMic: {backgroundColor: '#ff3300'},
  //     stylePressInCirculoIconoMic: {
  //       backgroundColor: '#ff3300',
  //       height: 51,
  //       width: 51,
  //       borderRadius: 25,
  //     },
  //   });

  //   //let rut = await AsyncStorage.getItem('USU_RUT');
  //   //  this._Ingresa_Trazabilidad(rut, 51, "MIC Contáctenos");
  // };

  handlePressOut = async (tipo) => {
    console.log(`PRESS OUT ==> ${tipo}!`);
    this.stopRecording(tipo);
    if(tipo == 1){
        this.setState({
            stylePressInTouchableMic: {},
            stylePressInCirculoIconoMic: {}
        })
    }

    if(tipo == 2){
        this.setState({
            stylePressInTouchableMic2: {},
            stylePressInCirculoIconoMic2: {}
        })
    }
}



  // handlePressOut = async () => {
  //   console.log('PRESS OUT...');
  //   this.stopRecording();
  //   this.setState({
  //     stylePressInTouchableMic: {},
  //     stylePressInCirculoIconoMic: {},
  //   });
  // };

  handlePressIn = async (tipo) => {
    console.log(`PRESS IN ==> ${tipo}!`);
    this.startRecording(tipo);

    let rut = await AsyncStorage.getItem("USU_RUT");

    if(tipo == 1){
        this.setState({
            stylePressInTouchableMic: { backgroundColor: '#ff3300' },
            stylePressInCirculoIconoMic: { backgroundColor: "#ff3300", height: 51, width: 51, borderRadius: 25, }
        })

        //this._Ingresa_Trazabilidad(rut, 51,  "MIC ACC 1");

    }

    if(tipo == 2){
      console.log("aki");
        this.setState({
            stylePressInTouchableMic2: { backgroundColor: '#ff3300' },
            stylePressInCirculoIconoMic2: { backgroundColor: "#ff3300", height: 51, width: 51, borderRadius: 25, }
        })

       // this._Ingresa_Trazabilidad(rut, 51, "MIC ACC 2");

    }


}

  //-----------------------------------------------------------------
  render() {
    return (
      <View style={{...styles.wrapper}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            accessible={false}>
            <KeyboardAvoidingView
              behavior="position"
              keyboardVerticalOffset={10}>
              <View style={styles.textInputBoxMultiline}>
                {/* {this.state.fontLoaded == true ? (<Text style={styles.caption}>Mensaje</Text>) : (<Text>Loading ... </Text>)} */}
                <Text style={styles.caption}>Mensaje</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <TextInputMultiline
                    key="1"
                    texto={this.state.textoMultiLine}
                    placeholder="Ingrese texto"
                    multiline={true}
                    numberOfLines={10}
                    ref={this.TextInputMultiline}
                    onBlur={() => this.validar('TextInputMultiline')}
                    //onBlur={() => this.validarComentarioOnBlur()}
                    maxLength={500}
                    sacarCaracteres={true}
                    categoria={'pass'}
                    style={{
                      width:
                        Platform.OS === 'android' ? scale(240) : scale(250),
                    }}
                  />

                  <TouchableWithoutFeedback
                   onPressIn={() => this.handlePressIn(1)}
                   onPressOut={() => this.handlePressOut(1)}
                   // onPressIn={this.handlePressIn}
                    // onPressOut={this.handlePressOut}
                    activeOpacity={0.6}>
                    <View
                      style={[
                        styles.touchableMic,
                        this.state.stylePressInTouchableMic,
                      ]}>
                      <View
                        style={[
                          styles.circuloIconoMicrofono,
                          this.state.stylePressInCirculoIconoMic,
                        ]}>
                        {/* <Icon name="microphone-alt" size={20} color="white"></Icon> */}
                        <Text>1</Text>
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </View>

              {/* 1 */}

              <View style={styles.textInputBoxMultiline2}>
                {/* {this.state.fontLoaded == true ? (<Text style={styles.caption}>Mensaje</Text>) : (<Text>Loading ... </Text>)} */}
                <Text style={styles.caption}>Mensaje 2</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <TextInputMultiline
                    key="2"
                    texto={this.state.textoMultiLine2}
                    placeholder="Ingrese texto"
                    multiline={true}
                    numberOfLines={10}
                    ref={this.TextInputMultiline2}
                    onBlur={() => this.validar('TextInputMultiline2')}
                    //onBlur={() => this.validarComentarioOnBlur()}
                    maxLength={500}
                    sacarCaracteres={true}
                    categoria={'pass'}
                    style={{
                      width:
                        Platform.OS === 'android' ? scale(240) : scale(250),
                    }}
                  />

                  <TouchableWithoutFeedback
                    onPressIn={() => this.handlePressIn(2)}
                    onPressOut={() => this.handlePressOut(2)}
                    // onPressIn={this.handlePressIn}
                    // onPressOut={this.handlePressOut}
                    activeOpacity={0.6}>
                    <View
                      style={[
                        styles.touchableMic,
                        this.state.stylePressInTouchableMic2,
                      ]}>
                      <View
                        style={[
                          styles.circuloIconoMicrofono2,
                          this.state.stylePressInCirculoIconoMic2,
                        ]}>
                        {/* <Icon name="microphone-alt" size={20} color="white"></Icon> */}
                        <Text>2</Text>
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </View>


            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </ScrollView>
      </View>
    );
  }
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
