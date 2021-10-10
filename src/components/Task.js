import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const COLOR = {
  mainColor: '#6C6DB4',
  greenColor: 'rgb(77, 196, 144)',
  pinkColor: '#CF9EF5',
};
const Task = props => {
  const { task, changeStatusMainTask, onCollapse, mainTaskId, deleteMainTask, showAddTask, forceNotCollapse } = props;
  console.log("Main task " + JSON.stringify(task))
  return (
    <View style={styles.preTaskContainer}>
      <View style={styles.rowDirect}>
        <TouchableOpacity onPress={() => changeStatusMainTask(mainTaskId)}>
          <Icon name={'heart'} size={24} color={task.status ? COLOR.greenColor : 'red'} />
        </TouchableOpacity>
        <TouchableOpacity style={{ marginLeft: 5, width: '70%' }} onPress={() => onCollapse()}>
          <Text style={styles.taskOnceTitle}>{task.title}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ marginLeft: 5 }}
          onPress={() => [showAddTask(true, mainTaskId), forceNotCollapse()]}>
          <Icon name="plus-circle" size={20} color={'#aebdf2'} style={{}} />
        </TouchableOpacity>
      </View>
      <View style={[styles.rowDirect, { marginLeft: -19 }]}>
        <Icon
          name={'arrow-up'}
          size={15}
          color={
            task.priority === 'MEDIUM'
              ? '#ba9e11'
              : task.priority === 'HIGH'
                ? 'red'
                : 'green'
          }
        />
        <View>
          <Text style={styles.dateTime}>{task.date}</Text>
          <Text style={styles.dateTime}>{task.time}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteMainTask(mainTaskId)}>
        <Icon
          name={'times-circle'}
          size={24}
          color={'red'}
          style={styles.deleteIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  preTaskContainer: {
    flex: 1,
    height: 50,
    width: '98%',
    marginTop: 10,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderWidth: 1 / 2,
    borderRadius: 15,
    justifyContent: 'space-between',
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
  rowDirect: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateTime: {
    marginLeft: 5,
    fontSize: 12,
  },
});

export default Task;
