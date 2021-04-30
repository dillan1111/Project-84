import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements'
import firebase from 'firebase';
import db from '../config'
import MyHeader from '../components/MyHeader';

export default class HomeScreen extends Component{
  constructor(){
    super()
    this.state = {
        allRequests : []
    }
  this.requestRef= null
  }

  getRequestedToysList =()=>{
    this.requestRef = db.collection("exchange_requests")
    .onSnapshot((snapshot)=>{
      var requestedToysList = snapshot.docs.map(document => document.data());
      this.setState({
        allRequests : requestedToysList
      });
    })
  }

  componentDidMount(){
    this.getRequestedToysList()
  }

  componentWillUnmount(){
    this.requestRef();
  }

  keyExtractor = (item, index) => index.toString()

  renderItem = ( {item, i} ) =>(
    <ListItem bottomDivider> 
      <ListItem.Content> 
        <ListItem.Title style={{ color: 'black', fontWeight: 'bold' }}> {item.toy_name} </ListItem.Title> 
        <ListItem.Subtitle> {item.description} </ListItem.Subtitle> 
        <Text>0-3 yrs</Text>
        <ListItem.Subtitle> {item.zero_three !== false?(<Text>Recommended Age</Text>):(<Text>Non-Recommended Age</Text>)} </ListItem.Subtitle> 
        <Text>4-6 yrs</Text>
        <ListItem.Subtitle> {item.four_six !== false?(<Text>Recommended Age</Text>):(<Text>Non-Recommended Age</Text>)} </ListItem.Subtitle> 
        <Text>7-10 yrs</Text>
        <ListItem.Subtitle> {item.seven_ten !== false?(<Text>Recommended Age</Text>):(<Text>Non-Recommended Age</Text>)} </ListItem.Subtitle> 
      </ListItem.Content> 
      <TouchableOpacity style={styles.button}
            onPress ={()=>{
              this.props.navigation.navigate('RecieverDetails', {'details': item})
            }}> 
        <Text style={{color:'#ffff'}}>Give Toy</Text> 
      </TouchableOpacity> 
    </ListItem>
  )
   

  render(){
    return(
      <View style={{flex:1}}>
        <MyHeader title="Exhange With Toy Requests" navigation={this.props.navigation}/>
        <View style={{flex:1}}>
          {
            this.state.allRequests.length === 0
            ?(
              <View style={styles.subContainer}>
                <Text style={{ fontSize: 20}}>List Of All Requested Toys</Text>
              </View>
            )
            :(
              <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.allRequests}
                renderItem={this.renderItem}
              />
            )
          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  subContainer:{
    flex:1,
    fontSize: 20,
    justifyContent:'center',
    alignItems:'center'
  },
  button:{
    width:100,
    height:30,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"#ff5722",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8
     }
  }
})