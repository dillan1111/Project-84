import React,{Component} from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  Alert} from 'react-native';
import { CheckBox } from 'react-native-elements'
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader'

export default class ExchangeScreen extends Component{
  constructor(){
    super();
    this.state ={
      userName : firebase.auth().currentUser.email,
      toyName:"",
      ageGrp1: false,
      ageGrp2: false,
      ageGrp3: false,
      description:""
    }
  }

  
  createUniqueId(){
    return Math.random().toString(36).substring(7);
  }


  addToy =(toyName, ageGrp1, ageGrp2, ageGrp3, description)=>{
    var userName = this.state.userName
    var requestId  = this.createUniqueId()
    db.collection('exchange_requests').add({
        "username": userName,
        "toy_name":toyName,
        "zero_three": ageGrp1,
        "four_six": ageGrp2,
        "seven_ten": ageGrp3,
        "description": description,
        "request_id": requestId
    })

    this.setState({
        toyName :'',
        ageGrp1: false,
        ageGrp2: false,
        ageGrp3: false,
        description : ''
    })

    return Alert.alert(
        "Toy ready to exchange",
        '',
        [
            {text: 'OK', onPress: () => {
                
                this.props.navigation.navigate('HomeScreen')

            }}
        ]
        )
  }


  render(){
    return(
        <View style={{flex:1}}>
            <MyHeader title="Request Toy" navigation={this.props.navigation}/>
            <KeyboardAvoidingView style={styles.keyBoardStyle}>
              <TextInput
                style ={styles.formTextInput}
                placeholder={"enter toy name"}
                onChangeText={(text)=>{
                    this.setState({
                        toyName:text
                    })
                }}
                value={this.state.toyName}
              />
              <Text style={{colour: '#968E8E', margin: 20, flex: 0.5, fontSize:15, fontWeight:'100', justifyContent:'center', alignItems:'center'}}>Age of the child which the Toy is for</Text>
              <CheckBox
                title='0-3 yrs'
                onPress={() => this.setState({ageGrp1: true})}
                checked={this.state.ageGrp1}
              />
              <CheckBox
                title='4-6 yrs'
                onPress={() => this.setState({ageGrp2: true})}
                checked={this.state.ageGrp2}
              />
              <CheckBox
                title='7-10 yrs'
                onPress={() => this.setState({ageGrp3: true})}
                checked={this.state.ageGrp3}
              />
              <TextInput
                style ={[styles.formTextInput,{height:300}]}
                multiline={true}
                numberOfLines ={8}
                placeholder={"Why do you need the toy, and describe what it essentially is"}
                onChangeText ={(text)=>{
                    this.setState({
                        description:text
                    })
                }}
                value ={this.state.description}
              />
              <TouchableOpacity
                style={styles.button}
                onPress={()=>{this.addToy(this.state.toyName, this.state.ageGrp1, this.state.ageGrp2, this.state.ageGrp3, this.state.description)}}
                >
                <Text>Add Toy</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  keyBoardStyle : {
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  formTextInput:{
    width:"75%",
    height:35,
    alignSelf:'center',
    borderColor:'#ffab91',
    borderRadius:10,
    borderWidth:1,
    marginTop:20,
    padding:10,
  },
  button:{
    width:"75%",
    height:50,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10,
    backgroundColor:"#ff5722",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    marginTop:20
    },
  }
)