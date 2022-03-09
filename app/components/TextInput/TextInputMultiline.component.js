import React, { Component } from 'react';
import { View, Text, TextInput, Platform } from 'react-native';
import styles from './TextInput.component.style.js';
import theme from '../../styles/theme.style';

let numberOfLines

class TextInputMultiline extends Component {

  constructor(props) {
    super(props);

    this.inputRefs = {
      texto2: null,
    };

    this.state = {
      textoAlert: "",
      texto2: '',
      placeholder: '',
      multiline: '',
      numberOfLines: '',
      ocultar: true,
    };
  }

  error = () => {
    this.setState({ brdColor: { borderColor: theme.BORDER_COLOR_FALSE, borderWidth: 1 } })
  }
  ok = () => {
    this.setState({ brdColor: { borderColor: 'transparent' } })
  }


  msjAlert = (value) => {

    if (value.length > 0) {
      this.setState({ ocultar: false })
      this.error();
    } else {
      this.setState({ ocultar: true })
      this.ok();
    }
    this.setState({ textoAlert: value })
  }

  devolverMultiTexto = () => {
    return this.state.texto2;
  }

  agregarMultiText = (texto) =>{
    this.setState({
      texto2 : texto
    })
  }

  UNSAFE_componentWillMount() {
    passedTexto = this.props.texto;
    this.setState({ texto2: passedTexto });
    this.setState({ numberOfLines: this.props.numberOfLines });
    this.setState({ multiline: this.props.multiline });

    passedBoolean = this.props.multiline;
    numberOfLines = this.props.numberOfLines
    console.log(numberOfLines)
  }

  sacarCaracteres(value) {
    console.log("ha ingresado a sacar caracteres");


    let categoria = this.props.categoria;

    if (categoria == "nombre") {
      for (let i = 0; i <= value.length; i++) {
        let valor = value.replace(/[^\a-zA-ZáÁéÉíÍóÓúÚñÑüÜ\s]/g, "");
        this.setState({ texto2: valor })
      }
    }

    if (categoria == 'rut') {
      for (let i = 0; i <= value.length; i++) {
        let valor = value.replace(/[^0-9\K\k\-]/g, "");
        // console.log('valor: ', valor);
        this.setState({ texto2: valor });
      }
    }
    if (categoria == 'serie') {
      for (let i = 0; i <= value.length; i++) {
        let valor = value.replace(/[^0-9]/g, "");
        //console.log('valor: ', valor);
        this.setState({ texto2: valor })
      }

      let x = value.split(/[^0-9]/g)
      let y = ''
      for (let index = 0; index < x.length; index++) {

        y = y + x[index]
        this.setState({ texto2: y })
      }
    }
    if (categoria == 'telefono') {
      for (let i = 0; i <= value.length; i++) {
        let valor = value.replace(/[^0-9]/g, "");
        // console.log('valor: ', valor);
        this.setState({ texto2: valor })
      }
    }
    if (categoria == 'pass') {
      for (let i = 0; i <= value.length; i++) {
        let valor = value.replace(/[^0-9\a-zA-ZáÁéÉíÍóÓúÚñÑüÜ\s]/g, "");
        this.setState({ texto2: valor })
      }
    }
    if (categoria == "texto") {
      for (let i = 0; i <= value.length; i++) {
        let valor = value.replace(/[^\a-zA-ZáÁéÉíÍóÓúÚñÑüÜ\s]/g, "");
        valor = valor.replace(" ", "");
        this.setState({ texto2: valor })
      }
    }



    if (categoria == "correo") {
      for (let i = 0; i <= value.length; i++) {
        let valor = value.replace(" ", "");
        this.setState({ texto2: valor })
      }
    }

    if (categoria == "patente") {
      for (let i = 0; i <= value.length; i++) {
        let valor = value.replace(/[^0-9\a-zA-Z\s]/g, "");
        this.setState({ texto2: valor })
      }
    }
  }


  render() {
    //console.log(this.state.texto2)
    return (
      <View>
        <TextInput
          onChangeText={txt => {
            console.log("se ha realizado un cambio en el texto");
            this.props.sacarCaracteres == true ? this.sacarCaracteres(txt) : this.setState({ texto2: txt })
            //this.props.clave == "1" ? this.props.verificarCaracteres(txt) : null
          }}
          key='1'
          style={[styles.textInputMultiline, this.props.style, this.state.brdColor]}
          value={this.state.texto2}
          // value={this.props.texto}
          //onChangeText={txt => this.setState({ texto2: txt })}
          placeholder={this.props.placeholder}
          placeholderTextColor='#AFAFAF'
          placeholderStyle={{ marginTop: 0 }}
          fontStyle={this.state.texto2 ? 'normal' : 'italic'}
          textAlignVertical="top"
          onBlur={this.props.onBlur}
          maxLength={this.props.maxLength}
          returnKeyType={this.props.returnKeyType}
          onFocus={this.props.cambioOffset}
          // numberOfLines={Platform.OS === 'ios' ? numberOfLines : null}
          // minHeight={(Platform.OS === 'ios' && numberOfLines) ? (20 * numberOfLines) : null}
          textAlign="left"
          multiline={true}
          // lineHeight={10}
          numberOfLines={10}
        />
        {this.state.ocultar == false ? (<Text style={styles.textoRojo} >{this.state.textoAlert}</Text>) : null}
      </View>
    );
  }
}


export default TextInputMultiline;