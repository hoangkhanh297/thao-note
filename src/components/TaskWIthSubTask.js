import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Collapsible from 'react-native-collapsible';
import PerTask from "../components/PerTask.js";
const COLOR = {
  mainColor: '#6C6DB4',
  greenColor: 'rgb(77, 196, 144)',
  pinkColor: '#CF9EF5',
};
const TASK_STATUS = {
  DONE: true,
  NOT_DONE: false,
};
const TaskWithSubTask = (props) => {
  const { taskItem, statusSubTask } = props;
  const [isCollapsed, setIsCollapsed] = useState(true);

  console.log('Task item at TaskWithSubTask ' + JSON.stringify(taskItem))
  return (
    <View>
      <TouchableOpacity onPress={() => setIsCollapsed(!isCollapsed)}>
        <PerTask task={taskItem.mainTask} />
      </TouchableOpacity>
      <Collapsible collapsed={isCollapsed}>
        {taskItem.subTask.map((item) => {
          return (
            <View style={{
              marginLeft: 40, flex: 1,
              height: 30,
              width: '87%',
              marginTop: 5,
              alignItems: 'center',
              flexDirection: 'row',
              paddingHorizontal: 15,
              borderWidth: 0.2,
              borderRadius: 10,
              justifyContent: 'space-between'
            }}>
              <TouchableOpacity onPress={() => statusSubTask(taskItem.id, item.id)}>
                {item.status ? (
                  <Icon name={'heart'} size={20} color={COLOR.greenColor} />
                ) : (
                  <Icon name={'heart'} size={20} color={'red'} />
                )}
              </TouchableOpacity>
              <Text style={styles.taskOnceTitle}>{item.title}</Text>
              <View>
                <Text style={styles.dateTime}>{item.date}</Text>
                <Text style={styles.dateTime}>{item.time}</Text>
              </View>
            </View>
          )
        })}
      </Collapsible>
    </View>
  )
}
const styles = StyleSheet.create({
  backgroundStyle: {
    flex: 1,
  },
  parentContainer: {
    flex: 1,
  },
  headerContainer: {
    height: 180,
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

export default TaskWithSubTask;