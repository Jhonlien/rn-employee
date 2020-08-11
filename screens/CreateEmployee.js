import React,{useState} from 'react'
import { StyleSheet, Image, ScrollView, Modal, Alert, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import API from '../constants/Api'

const CreateEmployee = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [salary, setSalary] = useState('');
    const [picture, setPicture] = useState(null);
    const [position, setPosition] = useState(null);
    const [modal, setModal] = useState(false);

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
      .then(data => {console.log(data)})
      .catch(err => {console.log(err)})
    }
    const options = {
        title: 'Select Photo',
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
    }
    
    pickImage = () =>{
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
    return (
        <ScrollView style= {styles.root}>
            <Input
                placeholder='Name'
                value = {name}
                onChangeText={text => setName(text)}
              />
             <Input
                placeholder='Phone'
                value = {phone}
                keyboardType="number-pad"
                onChangeText={text => setPhone(text)}
              />
              <Input
                placeholder='Email'
                value = {email}
                onChangeText={text => setEmail(text)}
              />
              <Input
                placeholder='Salary'
                value = {salary}
                onChangeText={text => setSalary(text)}
              />
              <Input
                placeholder='Position'
                value = {position}
                onChangeText={text => setPosition(text)}
              />
              {
                picture &&
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
                    onPress={() => {submitData()}}
                />

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
        </ScrollView>
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
