import React,{useState} from 'react'
import { StyleSheet, Text, View, Modal } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';


const CreateEmployee = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [salary, setSalary] = useState('');
    const [picture, setPicture] = useState('');
    const [modal, setModal] = useState(false);
    return (
        <View style= {styles.root}>
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
                    onPress={() => {console.log('Saved')}}
                />
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modal}
                    onRequestClose={()=>{
                        setModal(false)
                    }}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalButtonView}>
                        <Button
                            icon={
                                <Icon
                                    style={{marginRight:10}}
                                    name="camera"
                                    size={15}
                                    color="white"
                                    />
                                }
                                title="Camera"
                                onPress={() => {
                                    console.log('Camera Pressed')
                                }}
                            />
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
                                    console.log('Gallery Pressed')
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
    )
}

export default CreateEmployee

const styles = StyleSheet.create({
    root : {
        margin : 20,
        padding : 5,
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
