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
const SubTask = props => {
  const { task, mainTaskId, changeStatusSubTask, deleteSubTask } = props;
  console.log('Sub task ' + JSON.stringify(task));
  return (
    <View style={styles.preTaskContainer}>
      <View style={styles.rowDirect}>
        <TouchableOpacity onPress={() => changeStatusSubTask(mainTaskId, task.id)}>
          <Icon name={'heart'} size={20} color={task.status ? COLOR.greenColor : 'red'} />
        </TouchableOpacity>
        <Text style={styles.taskOnceTitle}>{task.title}</Text>
      </View>
      <View style={styles.rowDirect}>
        <Icon
          name={'arrow-up'}
          size={13}
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
        onPress={() => deleteSubTask(mainTaskId, task.id)}>
        <Icon
          name={'times-circle'}
          size={20}
          color={'red'}
          style={styles.deleteIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  rowDirect: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskOnceTitle: {
    marginLeft: 15,
    fontSize: 12,
    color: COLOR.mainColor,
  },
  dateTime: {
    marginLeft: 10,
    fontSize: 10,
  },
  deleteButton: {
    position: 'absolute',
    height: 24,
    width: 24,
    top: -12,
    right: -12,
  },
  preTaskContainer: {
    height: 30,
    width: '87%',
    marginTop: 10,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderWidth: 1 / 2,
    borderRadius: 15,
    marginLeft: 40,
    marginRight: 50,
    justifyContent: 'space-between',
  },
});

export default SubTask;
