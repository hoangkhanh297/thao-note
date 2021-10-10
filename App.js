import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  SafeAreaView,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
  Keyboard,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

import HeaderConponent from "./src/components/Header.js";
import AddTask from "./src/components/AddTask.js";
import Search from "./src/components/Search.js";
import NonTask from "./src/components/NonTask.js";
import Tasks from "./src/components/Tasks.js";

const COLOR = {
  mainColor: '#6C6DB4',
  greenColor: 'rgb(77, 196, 144)',
  pinkColor: '#CF9EF5',
};

const exam = [
  {
    "id": 1633698553197,
    "mainTask": {
      "title": "Main task  1",
      "status": false,
      "date": "08/10/2021",
      "time": "08:02 PM",
      "priority": "MEDIUM"
    },
    "subTask": [
      {
        "id": 1633698553195,
        "title": "subtask 1.1",
        "status": false,
        "date": "08/10/2021",
        "time": "08:02 PM",
        "priority": "MEDIUM"
      },
      {
        "id": 1633698553196,
        "title": "subtask 1.2",
        "status": false,
        "date": "08/10/2021",
        "time": "08:02 PM",
        "priority": "MEDIUM"
      }
    ]
  },
  {
    "id": 1633698553190,
    "mainTask": {
      "title": "Main task 2",
      "status": false,
      "date": "08/10/2021",
      "time": "08:02 PM",
      "priority": "MEDIUM"
    },
    "subTask": [
      {
        "id": 1633698553192,
        "title": "subtask 2.1",
        "status": false,
        "date": "08/10/2021",
        "time": "08:02 PM",
        "priority": "MEDIUM"
      },
      {
        "id": 1633698553193,
        "title": "subtask 2.2",
        "status": false,
        "date": "08/10/2021",
        "time": "08:02 PM",
        "priority": "MEDIUM"
      }
    ]
  }
];

const App = () => {
  const [isShowAdd, setIsShowAdd] = useState(false);
  const [isAddSubTask, setIsAddSubTask] = useState(false);
  const [mainTaskIdForAdd, setMainTaskIdForAdd] = useState(0);
  const [isShowSearch, setIsShowSearch] = useState(false);
  const [taskList, setTaskList] = useState(exam);
  const [showNotDone, setShowNotDone] = useState(true);
  const [showDone, setShowDone] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [showData, setShowData] = useState(exam);

  const searching = (text) => {
    console.log("search text " + text)
  }
  const _setShow = value => {
    console.log('Show ' + value);
    if (value === 'DONE') {
      setShowDone(true);
      setShowNotDone(false);
      setShowAll(false);
    }
    if (value === 'NOT_DONE') {
      setShowDone(false);
      setShowNotDone(true);
      setShowAll(false);
    }
    if (value === 'ALL') {
      setShowDone(false);
      setShowNotDone(false);
      setShowAll(true);
    }
  };
  const addTask = (newTask) => {
    console.log('new task to add ' + JSON.stringify(newTask));
    if (!isAddSubTask) {
      setTaskList([...taskList, newTask]);
      setShowData([...showData, newTask]);
    } else {
      newTask.mainTask.id = new Date().getTime();
      newTask.mainTask.subTask = undefined;
      console.log('Add subtask ' + mainTaskIdForAdd)
      let newShowData = showData.map((task) => {
        if (task.id === mainTaskIdForAdd) {
          return {
            ...task,
            subTask: [...task.subTask, newTask.mainTask]
          }
        } else {
          return task;
        }
      });
      setShowData(newShowData);
    }
    setIsShowAdd(false);
    console.log(JSON.stringify(taskList));
  }
  const showAddTask = (isSubTask, mainTaskId) => {
    setIsShowAdd(!isShowAdd);
    if (isSubTask) {
      setMainTaskIdForAdd(mainTaskId);
    }
    setIsAddSubTask(isSubTask);
  }
  const changeStatusMainTask = (mainTaskId) => {
    console.log('Çhange status main task at APP ' + mainTaskId)
    let newShowData = showData.map((task) => {
      if (task.id === mainTaskId) {
        return {
          ...task,
          mainTask: {
            ...task.mainTask,
            status: !task.mainTask.status
          }
        }
      } else {
        return task;
      }
    });
    console.log('olde task ' + JSON.stringify(showData));
    console.log('new task ' + JSON.stringify(newShowData));
    setShowData(newShowData);
  }

  const changeStatusSubTask = (mainTaskId, subTaskId) => {
    console.log('main id ' + mainTaskId);
    console.log('sub id ' + subTaskId);
    let newTask =
      showData.map((mainTask) => {
        if (mainTask.id === mainTaskId) {
          return {
            ...mainTask,
            subTask: mainTask.subTask.map((subTask) => {
              if (subTask.id === subTaskId) {
                return {
                  ...subTask,
                  status: !subTask.status
                }
              } else {
                return subTask
              }
            })
          }
        } else {
          return mainTask;
        }
      });
    setShowData(newTask);
  }
  const setOptionZone = value => {
    if (value === 'ADD') {
      if (isShowSearch) {
        setIsShowSearch(false);
      }
      setIsShowAdd(!isShowAdd);
    } else if (value === 'SEARCH') {
      if (isShowAdd) {
        setIsShowAdd(false);
      }
      setIsShowSearch(!isShowSearch);
    } else {
      setIsShowAdd(false);
      setIsShowSearch(false);
    }
  };

  console.log(JSON.stringify(showData))
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.backgroundStyle}>
        <StatusBar hidden />
        <View style={styles.parentContainer} >
          <HeaderConponent />
          <View style={styles.optionZone}>
            <TouchableOpacity style={styles.addTaskAndSearchButton} onPress={() => setOptionZone('ADD')}>
              <Icon name={'plus'} />
              <Text style={{ color: 'green', marginLeft: 5 }}>ADD</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.addTaskAndSearchButton} onPress={() => setOptionZone('SEARCH')}>
              <Icon name={'search'} />
              <Text style={{ color: 'green', marginLeft: 5 }}>SEARCH</Text>
            </TouchableOpacity>
          </View>
          <View>
            {isShowAdd ? <AddTask addTask={addTask} /> : isShowSearch ? <Search searching={searching} /> : <View />}
          </View>

          <View style={styles.titleBodyContainer}>
            <Text style={styles.todayTaskText}>Để xem nay cần làm gì</Text>
            <Text>{taskList.filter((item) => !item.status).length + '/' + taskList.length} ♥</Text>
          </View>

          <View style={styles.taskListPerStatusContainer}>
            <TouchableOpacity
              style={{
                paddingHorizontal: 15,
                borderWidth: 1 / 2,
                borderRadius: 15,
                height: 30,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: showAll ? '#f58ecc' : '#ffff',
              }}
              onPress={() => _setShow('ALL')}>
              <Text style={{ color: showAll ? 'white' : 'black', fontWeight: showAll ? 'bold' : '400' }}>ALL</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{
              paddingHorizontal: 15,
              borderWidth: 1 / 2,
              borderRadius: 15,
              height: 30,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: showNotDone ? '#f58ecc' : '#ffff',
            }}
              onPress={() => _setShow('NOT_DONE')}>
              <Text style={{ color: showNotDone ? 'white' : 'red', fontWeight: showNotDone ? 'bold' : '400' }}>NOT DONE</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{
              paddingHorizontal: 15,
              borderWidth: 1 / 2,
              borderRadius: 15,
              height: 30,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: showDone ? '#f58ecc' : '#ffff',
            }}
              onPress={() => _setShow('DONE')}>
              <Text style={{ color: showDone ? 'white' : 'green', fontWeight: showDone ? 'bold' : '400' }}>DONE</Text>
            </TouchableOpacity>
          </View>
          {showData.length !== 0 ?
            (<FlatList
              removeClippedSubviews={false}
              data={showData.length === 0 ? tasks : showData}
              renderItem={({ item }) => <Tasks taskItem={item} changeStatusMainTask={changeStatusMainTask} changeStatusSubTask={changeStatusSubTask} showAddTask={showAddTask} />}
              keyExtractor={(item, index) => String(index)}
              contentContainerStyle={[styles.taskListItem, { flexGrow: 1 }]}
            />)
            : <NonTask text={showAll
              ? "Chưa có task nào nè baby, thêm task vào làm nào !!"
              : showDone
                ? "Chưa có task nào xong nè baby, lo làm đi nè !!"
                : showNotDone
                  ? "Chưa có task nào chưa xong nè baby, xoã thôi !!"
                  : "Chưa có task nào cho từ khoá '" + searchText + "' nè baby !!"} />
          }
        </View >
      </View >
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    flex: 1,
  },
  parentContainer: {
    flex: 1,
  },
  optionZone: {
    marginTop: 10,
    flexDirection: 'row',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
  },
  addTaskAndSearchButton: {
    paddingHorizontal: 15,
    borderWidth: 1 / 2,
    borderRadius: 15,
    height: 30,
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  titleBodyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  todayTaskText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLOR.mainColor,
  },
  taskListPerStatusContainer: {
    paddingHorizontal: 45,
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 5,
    flexDirection: 'row',
  },
});
export default App;
