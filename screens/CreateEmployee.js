import React,{useState} from 'react'
import { 
  StyleSheet, 
  Image, 
  ScrollView, 
  Modal, 
  Alert, 
  View,
  KeyboardAvoidingView
 } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import API from '../constants/Api'


const CreateEmployee = ({navigation, route}) => {
    const getProfile = (type) =>{
      if(route.params){
        switch(type){
          case "name":
            return route.params.name
          case "phone":
            return route.params.phone
          case "email":
            return route.params.email
          case "salary":
            return route.params.salary
          case "picture":
            return route.params.picture
          case "position":
            return route.params.position
        }
      }
      return ""
    }
    const [name, setName]           = useState(getProfile("name"));
    const [phone, setPhone]         = useState(getProfile("phone"));
    const [email, setEmail]         = useState(getProfile("email"));
    const [salary, setSalary]       = useState(getProfile("salary"));
    const [picture, setPicture]     = useState(getProfile("picture"));
    const [position, setPosition]   = useState(getProfile("position"));
    const [modal, setModal]         = useState(false);
    const [enableShift, setEnableShift] = useState(false);
    const submitData = () => {
      fetch('https://employeappreact.herokuapp.com/send',{ 
        method: "POST",
        headers: {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          picture,
          salary,
          position,
        })
      })
      .then(res => {res.json()})
      .then(data => {
        console.log(data)
      })
      .catch(err => {
        console.log(err)
        throw err
      })
    }

    const updateData = () =>{
      fetch('https://employeappreact.herokuapp.com/update',{ 
        method: "POST",
        headers: {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify({
          id: route.params._id,
          name:name,
          email:email,
          phone:phone,
          picture:picture,
          salary:salary,
          position:position,
        })
      })
      .then(res => {res.json()})
      .then(() => {
        Alert.alert(`update saved successfuly`)
      })
      .catch(err => {
        console.log(err)
        throw err
      })
    }


    const options = {
        title: 'Select Photo',
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
    }
    
    pickImage = () => {
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            } else {
                const uri = response.uri; const type = response.type; const name = response.fileName;
                const source = {
                    uri,
                    type,
                    name
                }
                cloudinaryUpload(source)
                setPicture(response.uri);
            }
          });
    } 

    const cloudinaryUpload = (photo) => {
        const data = new FormData()
        data.append('file', photo)
        data.append('upload_preset', 'jhonatan')
        data.append("cloud_name", "jhonlien")
        fetch("https://api.cloudinary.com/v1_1/jhonlien/upload", {
          method: "post",
          body: data,
          headers : {
            "content-type": "multipart/form-data", 
            "accept": "application/json"
          }
        }).then(res => res.json()).
          then(data => {
            setPicture(data.secure_url)
          }).catch(err => {
            console.log(err)
          })
      }
      const imageNotNull = (img) => {
        if(img == ""){
          return null;
        }
        else{
          return img;
        }
      }

    return (
      <KeyboardAvoidingView behavior="position"  style={styles.root} enabled={enableShift}>
        <View>
            <Input
                placeholder='Name'
                value = {name}
                onFocus={()=>{
                  setEnableShift(false)
                }}
                onChangeText={text => setName(text)}
              />
             <Input
                placeholder='Phone'
                value = {phone}
                keyboardType="number-pad"
                onFocus={()=>{
                  setEnableShift(false)
                }}
                onChangeText={text => setPhone(text)}
              />
              <Input
                placeholder='Email'
                value = {email}
                onFocus={()=>{
                  setEnableShift(false)
                }}
                onChangeText={text => setEmail(text)}
              />
              <Input
                placeholder='Salary'
                value = {salary}
                onFocus={()=>{
                  setEnableShift(true)
                }}
                onChangeText={text => setSalary(text)}
              />
              <Input
                placeholder='Position'
                value = {position}
                onFocus={()=>{
                  setEnableShift(true)
                }}
                onChangeText={text => setPosition(text)}
              />
              {
                imageNotNull(picture) &&
                <View style={{marginBottom: 5, alignItems:'center'}}>
                <Image
                    style={{width:100, height:100, borderRadius: 50}}
                    source={{uri: picture}}
                />
                </View>
              }
                

              <Button
                buttonStyle={{backgroundColor:'#bdc3c7'}}
                icon={
                    <Icon
                        style={{marginRight:10}}
                        name="upload"
                        size={15}
                        color="white"
                        />
                    }
                    title="Upload Photo"
                    onPress={() => {setModal(true)}}
                />

                {
                  route.params ? 
                  <Button
                  buttonStyle={{backgroundColor:'#27ae60', marginTop:10}}
                  icon={
                      <Icon
                          style={{marginRight:10}}
                          name="check"
                          size={15}
                          color="white"
                          />
                      }
                      title="Update"
                      onPress={() => {
                        updateData();
                        navigation.navigate("Home");
                      }}
                  />
                  :
                  <Button
                  buttonStyle={{backgroundColor:'#2980b9', marginTop:10}}
                  icon={
                      <Icon
                          style={{marginRight:10}}
                          name="save"
                          size={15}
                          color="white"
                          />
                      }
                      title="Save"
                      onPress={() => {
                        submitData();
                        navigation.navigate("Home");
                      }}
                  />

                }
                
                

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modal}
                    onRequestClose={()=>{
                        setModal(false)
                    }}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalButtonView}>
                        <Button
                            icon={
                                <Icon
                                    style={{marginRight:10}}
                                    name="image"
                                    size={15}
                                    color="white"
                                    />
                                }
                                title="Gallery"
                                onPress={() => {
                                    pickImage()
                                    setModal(false);
                                }}
                            />
                        </View>
                        <Button
                                title="Cancel"
                                type="clear"
                                onPress={() => {setModal(false)}}
                            />
                    </View>
                </Modal>
        </View>
        </KeyboardAvoidingView>
    )
}

export default CreateEmployee

const styles = StyleSheet.create({
    root : {
        margin : 20,
        padding : 1,
        paddingBottom: 10,
    },
    inputStyle : {
        fontSize: 12,
        width : 20
    },
    modalContainer : {
        position : 'absolute',
        bottom: 2,
        width:"100%",
        backgroundColor: '#ecf0f1',
        padding: 10
    },
    modalButtonView:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    }
})
