
import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const COLOR = {
  mainColor: '#6C6DB4',
  greenColor: 'rgb(77, 196, 144)',
  pinkColor: '#CF9EF5',
};
const Search = (props) => {
  const { searching } = props;
  const [searchText, setSearchText] = useState();
  return (
    <KeyboardAvoidingView>
      <View style={styles.addingTaskContainer}>
        <View style={styles.addTaskInputText}>
          <TextInput
            placeholder={'Tìm gì nè baby ♥'}
            style={styles.searchText}
            value={searchText}
            onChangeText={(text) => searching(text)}
          />
          <TouchableOpacity style={styles.addingTaskButton} onPress={() => setSearchText('')}>
            <Icon name="trash" size={24} color={COLOR.mainColor} style={{ marginRight: 5 }} />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};


const styles = StyleSheet.create({
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
  addingTaskButton: {
    marginLeft: 5,
  },
});

export default Search;