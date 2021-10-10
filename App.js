import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  SafeAreaView,
  Text,
  TouchableOpacity,
  FlatList,
  Keyboard,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

import Header from "./src/components/Header.js";
import AddTask from "./src/components/AddTask.js";
import Search from "./src/components/Search.js";
import NonTask from "./src/components/NonTask.js";
import Tasks from "./src/components/Tasks.js";

const COLOR = {
  mainColor: '#6C6DB4',
  greenColor: 'rgb(77, 196, 144)',
  pinkColor: '#CF9EF5',
};


const TASK_STATUS = {
  DONE: true,
  NOT_DONE: false,
};

const App = () => {
  const [isShowAdd, setIsShowAdd] = useState(false);
  const [isAddSubTask, setIsAddSubTask] = useState(false);
  const [mainTaskIdForAdd, setMainTaskIdForAdd] = useState(0);
  const [isShowSearch, setIsShowSearch] = useState(false);
  const [taskList, setTaskList] = useState([]);
  const [showNotDone, setShowNotDone] = useState(false);
  const [showDone, setShowDone] = useState(false);
  const [showAll, setShowAll] = useState(true);
  const [showData, setShowData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    explainShowData();
  }, [taskList, showAll, showDone, showNotDone]);

  async function getData() {
    try {
      setIsFetching(true);
      const value = await AsyncStorage.getItem('@storage_Key');
      console.log('Task list from storage: ' + value);
      if (value !== null && value.length >= 0) {
        let dt = JSON.parse(value);
        setTaskList(dt);
        explainShowData();
      }
    } catch (e) {
    }
  }
  async function storeData() {
    try {
      if (taskList != null && taskList !== undefined) {
        let strDt = JSON.stringify(taskList);
        console.log('Task list ' + strDt);
        await AsyncStorage.setItem('@storage_Key', strDt);
      } else {
        return;
      }
    } catch (e) {
      return;
    }
  }
  function explainShowData() {
    if (!isFetching) {
      setIsFetching(true);
    }
    let data = [];
    if (showNotDone) {
      console.log('SHOW NOT DONE');
      data = taskList.filter(item => item.mainTask.status === TASK_STATUS.NOT_DONE);
    } else if (showDone) {
      console.log('SHOW DONE');
      data = taskList.filter(item => item.mainTask.status === TASK_STATUS.DONE);
    } else {
      console.log('SHOW ALL');
      data = taskList;
    }
    setTimeout(() => { setIsFetching(false); setShowData(data); }, 300)
    console.log('Show data ' + JSON.stringify(data))

  }
  const searching = (text) => {
    if (!isFetching) {
      setIsFetching(true);
    }
    setSearchText(text)
    console.log("search text " + searchText)
    let newDataShow = [];
    for (const item of taskList) {
      if (item.mainTask.title.includes(text)) {
        newDataShow.push(item)
      } else {
        for (const subItem of item.subTask) {
          if (subItem.title.includes(text)) {
            newDataShow.push(item)
          }
        }
      }
    }
    setTimeout(() => { setIsFetching(false); setShowData(newDataShow); }, 100)
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
    if (!isAddSubTask) {
      console.log('new task to add ' + JSON.stringify(newTask));
      setTaskList([...taskList, newTask]);
    } else {
      let newSubTask = newTask.mainTask;
      newSubTask.id = new Date().getTime();
      console.log('new task to add ' + JSON.stringify(newSubTask));
      console.log('Add subtask ' + mainTaskIdForAdd)
      let newTaskList = taskList.map((task) => {
        if (task.subTask === undefined) {
          task.subTask = [];
        }
        console.log('Task ' + JSON.stringify(task.subTask));
        if (task.id === mainTaskIdForAdd) {
          return {
            ...task,
            subTask: [...task.subTask, newSubTask]
          }
        } else {
          return task;
        }
      });
      setTaskList(newTaskList);
    }
    storeData();
    explainShowData();
    console.log(JSON.stringify(taskList));
    Keyboard.dismiss();
  }
  const showAddTask = (isSubTask, mainTaskId) => {
    setIsShowAdd(true);
    if (isSubTask) {
      setMainTaskIdForAdd(mainTaskId);
      setIsAddSubTask(true);
    } else {
      setMainTaskIdForAdd(0);
      setIsAddSubTask(false);
    }
  }
  const deleteMainTask = (mainTaskId) => {
    console.log('Delete Task id ' + mainTaskId);
    let newTask = taskList.filter(item => item.id !== mainTaskId);
    setTaskList(newTask);
    storeData();
  };
  const deleteSubTask = (mainTaskId, subTaskId) => {
    console.log('Delete Task id ' + mainTaskId);
    let newTask = [];
    for (const item of taskList) {
      if (item.id === mainTaskId) {
        let newSubTask = item.subTask.filter(item => item.id !== subTaskId);
        item.subTask = newSubTask;
        newTask.push(item);
      } else {
        newTask.push(item);
      }
    }
    setTaskList(newTask);
    storeData();
  };
  const changeStatusMainTask = (mainTaskId) => {
    console.log('Çhange status main task at APP ' + mainTaskId)
    let newTaskList = taskList.map((task) => {
      if (task.id === mainTaskId) {
        return {
          ...task,
          mainTask: {
            ...task.mainTask,
            status: !task.mainTask.status
          },
          subTask: task.subTask.map((subTask) => {
            return {
              ...subTask,
              status: !task.mainTask.status
            }
          })
        }
      } else {
        return task;
      }
    });
    setTaskList(newTaskList);
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
    setIsAddSubTask(false);
    setMainTaskIdForAdd(0);
  };

  console.log(JSON.stringify(showData))
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.backgroundStyle}>
        <StatusBar hidden />
        <View style={styles.parentContainer} >
          <Header />
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
            <Text>{taskList.filter((item) => !item.mainTask.status).length + '/' + taskList.length} ♥</Text>
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
              onRefresh={() => getData()}
              refreshing={isFetching}
              onScroll={() => [setIsShowAdd(false), setIsShowSearch(false)]}
              data={showData.length === 0 ? taskList : showData}
              renderItem={({ item }) => <Tasks
                taskItem={item}
                changeStatusMainTask={changeStatusMainTask}
                changeStatusSubTask={changeStatusSubTask}
                showAddTask={showAddTask}
                deleteMainTask={deleteMainTask}
                deleteSubTask={deleteSubTask}
              />
              }
              keyExtractor={(item, index) => String(index)}
              contentContainerStyle={[styles.taskListItem, { flexGrow: 1 }]}
            />)
            : <NonTask text={showAll && searchText === ''
              ? "Chưa có task nào nè baby, thêm task vào làm nào !!"
              : showDone && searchText === ''
                ? "Chưa có task nào xong nè baby, lo làm đi nè !!"
                : showNotDone && searchText === ''
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
  taskListItem: {
    paddingHorizontal: 15,
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
