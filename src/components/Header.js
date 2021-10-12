import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  Modal,
  Pressable,
  TextInput,
  LogBox
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from "react-native-image-picker"
import AsyncStorage from '@react-native-async-storage/async-storage';
import ActionSheet from 'react-native-actionsheet';
const COLOR = {
  mainColor: '#6C6DB4',
  greenColor: 'rgb(77, 196, 144)',
  pinkColor: '#CF9EF5',
};

const Header = () => {
  const [resourcePath, setResourcePath] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isChangeName, setIsChangeName] = useState(false);
  const [appName, setAppName] = useState('Thảo Nguyễn Todo App');
  const [tempAppName, setTempAppName] = useState('Thảo Nguyễn Todo App');
  const [imgHeight, setImgHeight] = useState(400);
  const [imgWidth, setImgWidth] = useState(400);
  let actionSheet = useRef();

  const Popup = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        animationType='fade'
        visible={modalVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image
              source={
                resourcePath === undefined
                  || resourcePath === null
                  || resourcePath.assets[0] === undefined
                  || resourcePath.assets[0] === null
                  || resourcePath.assets[0].uri == undefined
                  ? require('../assets/images/avt.jpg')
                  : { uri: resourcePath.assets[0].uri }}
              style={{ height: imgHeight, width: imgWidth, }}
            />
            <View style={{ flexDirection: 'row', marginTop: 15, width: 200, justifyContent: 'space-between' }}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>OK</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => selectFile()}
              >
                <Text style={styles.textStyle}>Đổi ảnh</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
  var optionArray = [
    'Xem ảnh',
    'Đổi ảnh',
    'Huỷ'
  ];

  const showActionSheet = () => {
    //To show the Bottom ActionSheet
    actionSheet.current.show();
  };

  useEffect(() => {
    loadImage();
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
  }, []);

  useEffect(() => {
    saveImage();
    if (resourcePath === undefined
      || resourcePath === null
      || resourcePath.assets[0] === undefined
      || resourcePath.assets[0] === null
      || resourcePath.assets[0].uri == undefined) {
      console.log('Do not do anything');
    } else {
      setImgHeight(Math.min(resourcePath.assets[0].height / 3, imgHeight))
      setImgWidth(Math.min(resourcePath.assets[0].width / 3, imgWidth))
    }
  }, [resourcePath]);
  async function loadImage() {
    try {
      const value = await AsyncStorage.getItem('@storage_Key_Image');
      console.log('Image from store: ' + value);
      if (value !== null && value.length >= 0) {
        let dt = JSON.parse(value);
        setResourcePath(dt);
      }
    } catch (e) {
    }
  }
  async function saveImage() {
    try {
      if (resourcePath != null) {
        let strDt = JSON.stringify(resourcePath);
        console.log('Save image ' + strDt);
        await AsyncStorage.setItem('@storage_Key_Image', strDt);
      } else {
        return;
      }
    } catch (e) {
      return;
    }
  }
  const selectFile = () => {
    var options = {
      mediaType: 'photo',
      saveToPhotos: true,
      includeBase64: true,
      quality: 1,
    };
    ImagePicker.launchImageLibrary(options, res => {
      if (res.didCancel) {
        console.log('Cancel change avatar ' + JSON.stringify(res));
      } else if (res.errorCode) {
        console.log('Select image error ' + JSON.stringify(res));
      } else {
        console.log('Response = ', res);
        setResourcePath(res)
      }
    });
  };
  return (

    <View style={styles.headerContainer}>
      <View style={styles.avatarContainer}>
        <Pressable
          onPress={showActionSheet}
        >
          <Image
            source={
              resourcePath === undefined
                || resourcePath === null
                || resourcePath.assets[0] === undefined
                || resourcePath.assets[0] === null
                || resourcePath.assets[0].uri == undefined
                ? require('../assets/images/avt.jpg')
                : { uri: resourcePath.assets[0].uri }}
            style={styles.avatarImage}
          />
        </Pressable >
        {modalVisible ? (<Popup />) : (<View />)}
        <View style={styles.container}>
          <ActionSheet
            ref={actionSheet}
            title={'Baby muốn làm gì nào 🤔'}
            options={optionArray}
            cancelButtonIndex={2}
            useNativeDriver={true}
            destructiveButtonIndex={2}
            onPress={(index) => {
              if (index === 0) {
                setModalVisible(true);
              } else if (index === 1) {
                selectFile();
              }
            }}
          />
        </View>


      </View>
      <View style={styles.headerText}>
        <Text style={styles.appName}> {appName} </Text>
        <Text style={styles.appSlogan}> Bắt đầu ngày mới thôi nào</Text>
        <View>
          <View style={styles.rowDirect}>
            <Icon name={'heart'} size={15} color={COLOR.greenColor} />
            <Text style={styles.note}>Done</Text>
          </View>
          <View style={styles.rowDirect}>
            <Icon name={'heart'} size={15} color={'red'} />
            <Text style={styles.note}>Not done</Text>
          </View>
        </View>
      </View>

    </View>

  );
};


const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "#e6f6f7",
    borderRadius: 20,
    borderColor: '#FF6DAA',
    borderWidth: 3,
    padding: 35,
    alignItems: "center",
    shadowColor: "#FF6DAA",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  changeAppNameInput: {
    borderWidth: 1 / 2,
    width: 200,
    borderRadius: 15,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonClose: {
    backgroundColor: "#FFABCE",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    fontWeight: "bold",
    textAlign: "center"
  },
  container: {
    // flex: 1,
    // justifyContent: 'center',
    // alignContent: 'center',
    // textAlign: 'center',
    // paddingTop: 30,
    backgroundColor: 'red',
    // marginLeft: 200
    // padding: 16,
    // borderWidth: 1,
    // borderRadius: 15
  },
  buttonStyle: {
    width: '100%',
    height: 40,
    padding: 10,
    backgroundColor: '#f5821f',
    marginTop: 30,
  },
  buttonTextStyle: {
    color: 'white',
    textAlign: 'center',
  },
  titleStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    marginTop: 10,
  },
  headerContainer: {
    height: 110,
    width: '100%',
    backgroundColor: 'rgba(71,73,161,0.8)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  headerText: {
    marginLeft: 15,
  },
  appSlogan: {
    color: 'white',
  },
  appName: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  avatarImage: {
    height: 90,
    width: 90,
  },
  avatarContainer: {
    height: 90,
    width: 90,
    borderRadius: 99999,
    overflow: 'hidden',
  },
  note: {
    marginLeft: 10,
    fontSize: 12,
    color: '#e1f7c1',
  },
  rowDirect: {
    flexDirection: 'row',
    alignItems: 'center',
  },

});
export default Header;