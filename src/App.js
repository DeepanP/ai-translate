import React, { Component } from 'react';


import codes from './codes'
import query from './query'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button
} from 'react-native';
import ButtonGroup from './ButtonGroup';
import { API, graphqlOperation } from 'aws-amplify'
//var Sound = require('react-native-sound')
//Sound.setCategory('Playback')

const buttons = [
  'French',
  'German',
  'Portugese',
  'Spanish'
]

export default class App extends Component {
  state = {
    index: 0,
    codes,
    code:codes[0].code,
    sentence: '',
    mp3Url: '',
    loading: false
  }
  updateIndex = index => {
    this.setState({ index })
  }
  onChangeText = (val) => {
    this.setState({ sentence: val })
  }
  translate = async () => {
    if (this.state.sentence === '') return;
    try {
      this.setState({ loading: true })
      const translation = await API.graphql(graphqlOperation(query, { sentence: this.state.sentence, code: this.state.code }))
      const { sentence } = translation.data.getTranslatedSentence
      const mp3Url = `https://s3.amazonaws.com/lambda-ai/${sentence}`
      this.setState({ mp3Url, loading: false });
    } catch (error) {
      console.log('error translating : ', error)
      this.setState({ loading: false })
    }
  }
  playSound = () => {
    var translated = new Audio(this.state.mp3Url);
    translated.play();
    
  }
  onLanguageSelect = (selected)=>{
    this.state.code = selected;
  };
  render() {
    const buttonProps = {
      allowEmpty:false,
      code:'fr',
      buttons:codes,
      onChange: this.onLanguageSelect
    };
    return (
      <View style={styles.container}>
        <ButtonGroup {...buttonProps} />
        <TextInput
          multiline
          onChangeText={val => this.onChangeText(val)}
          style={styles.input}
          value={this.state.sentence}
          placeholder='Text to translate'
        />
        <Button
          onPress={this.translate}
          backgroundColor='#1E88E5'
          title="TRANSLATE"
          loading={this.state.loading}
        />
        {
         this.state.mp3Url !== '' && (
          <Button
            onPress={this.playSound}
            backgroundColor='#1E88E5'
            title="Play Recording"
            style={{ marginTop: 10 }}
          />
         )
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    padding: 10,
    paddingTop: 10,
    backgroundColor: '#ededed',
    height: 300,
    margin: 10,
    fontSize: 16,
    marginTop: 5
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
