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
  backgroundStyle: {
    flex: 1,
  },
  parentContainer: {
    flex: 1,
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
  titleText: {
    // borderWidth: 1 / 2,
    borderRadius: 10,
    flex: 1,
    height: 60,
    paddingLeft: 15,
    marginRight: 10
  },
  searchText: {
    // borderWidth: 1 / 2,
    borderRadius: 15,
    flex: 1,
    height: 40,
    paddingLeft: 15,
    width: 40,
  },
  addingTaskContainer: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  addTaskInputText: {
    flexDirection: 'row',
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1 / 2,
    borderRadius: 10,
  },
  priorityContainer: {
    flexDirection: 'row',
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1 / 2,
    borderRadius: 10,
  },
  priorityText: {
    flex: 1,
    height: 30,
    paddingLeft: 15,
  },
  addingTaskButton: {
    marginLeft: 5,
  },
  titleBodyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  preTaskContainer: {
    flex: 1,
    height: 50,
    width: '100%',
    marginTop: 10,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderWidth: 1 / 2,
    borderRadius: 15,
    justifyContent: 'space-between',
  },
  taskListItem: {
    paddingHorizontal: 15,
  },
  todayTaskText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLOR.mainColor,
  },
  taskOnceTitle: {
    marginLeft: 15,
    fontSize: 15,
    color: COLOR.mainColor,
  },
  deleteButton: {
    position: 'absolute',
    height: 24,
    width: 24,
    top: -12,
    right: -12,
  },
  deleteIcon: {
    backgroundColor: 'white',
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
  calendarIcon: {
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowDirect: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  dateTime: {
    marginLeft: 10,
    fontSize: 12,
  },
  note: {
    marginLeft: 10,
    fontSize: 12,
    color: '#e1f7c1',
  },
  taskLisrPerStatus: {
    paddingHorizontal: 15,
    borderWidth: 1 / 2,
    borderRadius: 15,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addTaskButton: {
    paddingHorizontal: 15,
    borderWidth: 1 / 2,
    borderRadius: 15,
    height: 30,
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  searchButton: {
    borderWidth: 1 / 2,
    borderRadius: 15,
    height: 30,
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  optionZone: {
    marginTop: 10,
    flexDirection: 'row',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
  },
  taskListPerStatusContainer: {
    // height: 40,
    // width: '100%',
    paddingHorizontal: 45,
    // borderWidth: 1,
    justifyContent: 'space-between',
    // alignItems: 'center',
    marginTop: 10,
    marginBottom: 5,
    // backgroundColor: '#ded3e6',
    flexDirection: 'row',
  },
});
export default Header;