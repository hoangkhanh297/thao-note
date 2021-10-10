import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from "react-native-image-picker"
import AsyncStorage from '@react-native-async-storage/async-storage';

const COLOR = {
  mainColor: '#6C6DB4',
  greenColor: 'rgb(77, 196, 144)',
  pinkColor: '#CF9EF5',
};
const Header = () => {
  const [resourcePath, setResourcePath] = useState(null);

  useEffect(() => {
    console.log('Test user effect')
    loadImage();
  }, []);
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
      maxWidth: 90,
      maxHeight: 90,
      quality: 1,
    };
    ImagePicker.launchImageLibrary(options, res => {
      if (res.didCancel) {
        console.log('Cancel change avatar ' + JSON.stringify(res));
      } else if (res.errorCode !== undefined || res.errorCode !== null) {
        console.log('Select image error ' + res.errorCode);
      } else {
        console.log('Response = ', res);
        setResourcePath(res)
        saveImage()
      }
    });
  };
  return (
    <View style={styles.headerContainer}>
      <View style={styles.avatarContainer}>
        <TouchableOpacity onPress={() => selectFile()}>
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
        </TouchableOpacity>

      </View>
      <View style={styles.headerText}>
        <Text style={styles.appName}> Thảo Nguyễn Todo App </Text>
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