import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  SafeAreaView,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-date-picker';
import { format } from 'date-fns';
import DropDownPicker from 'react-native-dropdown-picker';

const COLOR = {
  mainColor: '#6C6DB4',
  greenColor: 'rgb(77, 196, 144)',
  pinkColor: '#CF9EF5',
};

const TASK_STATUS = {
  DONE: true,
  NOT_DONE: false,
};

const HeaderConponent = React.memo(() => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.avatarContainer}>
        <Image
          source={require('./src/assets/images/avt.jpg')}
          style={styles.avatarImage}
        />
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
});

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [titleTask, setTitleTask] = useState('');
  const [searchText, setSearchText] = useState('');
  const [date, setDate] = useState(new Date());
  const [isPickDate, setIsPickDate] = useState(false);
  const [isStore, setIsStore] = useState(false);
  const [showNotDone, setShowNotDone] = useState(true);
  const [showDone, setShowDone] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [showData, setShowData] = useState([]);
  const [isShowAdd, setIsShowAdd] = useState(false);
  const [isShowSearch, setIsShowSearch] = useState(false);
  const [isError, setIsError] = useState(false);

  const [priority, setPriority] = useState('MEDIUM');
  const [priorityOpen, setPriorityOpen] = useState(false);
  const [priorityOption, setPriorityOption] = useState([
    { label: 'Low', value: 'LOW' },
    { label: 'Medium', value: 'MEDIUM' },
    { label: 'High', value: 'HIGH' },
  ]);

  async function getData() {
    try {
      const value = await AsyncStorage.getItem('@storage_Key');
      console.log('GetData: ' + value);
      if (value !== null && value.length >= 0) {
        setTasks(JSON.parse(value));
      }
    } catch (e) {
      // error reading value
    }
  }
  async function storeData(data) {
    try {
      let strDt = JSON.stringify(data);
      console.log('Save data ' + strDt);
      if (tasks != null && tasks !== undefined) {
        await AsyncStorage.setItem('@storage_Key', strDt);
      } else {
        return;
      }
    } catch (e) {
      // saving error
      return;
    }
  }
  function explainShowData() {
    let data = [];
    if (showNotDone) {
      console.log('SHOW NOT DONE');
      data = tasks.filter(item => item.status === TASK_STATUS.NOT_DONE);
    } else if (showDone) {
      console.log('SHOW DONE');
      data = tasks.filter(item => item.status === TASK_STATUS.DONE);
    } else {
      console.log('SHOW ALL');
      data = tasks;
    }
    setShowData(data);
    console.log('set show data ' + JSON.stringify(data))
    // return data;
  }
  useEffect(() => {
    getData();
    explainShowData()
  }, [isStore, showDone, showNotDone, showAll]);


  const _addTask = () => {
    if (titleTask === '') {
      setIsError(true);
      return;
    }
    setIsError(false)
    let newTask = [
      ...tasks,
      {
        id: new Date().getTime(),
        title: titleTask,
        status: TASK_STATUS.NOT_DONE,
        date: format(date, 'dd/MM/yyyy'),
        time: format(date, 'hh:mm a'),
        priority: priority,
      },
    ];
    setTasks(newTask);
    explainShowData();
    setTitleTask('');
    setIsPickDate(false);
    storeData(newTask);
    setIsStore(!isStore);
  };

  const _deleteTask = taskId => {
    console.log('Delete Task id ' + taskId);
    let newTask = tasks.filter(item => item.id !== taskId);
    setTasks(newTask);
    explainShowData();
    storeData(newTask);
  };

  const _changeStatusTask = taskId => {
    console.log('Change status Task id ' + taskId);
    let newTask = tasks.map(item => {
      if (item.id === taskId) {
        return {
          ...item,
          status: !item.status,
        };
      } else {
        return item;
      }
    });
    setTasks(newTask);
    explainShowData();
    storeData(newTask);
    setIsStore(!isStore);
  };
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
      setShowAll(false);
    }
  };

  const _searcheText = () => {
    let newDataShow = tasks.filter(item => item.title.includes(searchText));
    setShowData(newDataShow);
  };

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

  const Search = () => {
    return (
      <View style={styles.addingTaskContainer}>
        <TextInput
          placeholder={'Tìm gì nè baby ♥'}
          style={styles.searchText}
          value={searchText}
          onChangeText={txt => setSearchText(txt)}
          onEndEditing={() => _searcheText()}
        />
      </View>
    );
  };
  const AddTask = () => {
    return (
      <View>
        <View style={styles.addingTaskContainer}>
          <View style={styles.priorityContainer}>
            <TextInput
              placeholder={'Làm gì, lúc nào nè baby ♥'}
              style={styles.titleText}
              value={titleTask}
              onChangeText={title => setTitleTask(title)}
            />
            <TouchableOpacity style={styles.addingTaskButton} onPress={_addTask}>
              <Icon name="plus-circle" size={24} color={COLOR.mainColor} style={{ marginRight: 5 }} />
            </TouchableOpacity>
          </View>
        </View>
        {
          isError ? (<Text style={{ color: 'red' }}>Chưa điền task nè meo meo</Text>) : (<View />)
        }


        <View>
          <View style={styles.priorityContainer}>
            {/* <Text style={styles.priorityText}>Priority nè</Text> */}
            <View style={{ marginLeft: 5 }}>
              <TouchableOpacity onPress={() => setIsPickDate(!isPickDate)}>
                <View style={styles.rowDirect}>
                  <Icon name={'calendar'} size={24} color={COLOR.pinkColor} />
                  <Text style={{ marginLeft: 5, fontSize: 16, fontWeight: '600', color: '#704462' }}>{format(date, 'dd/MM/yyyy HH:mm')}</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View>
              <DropDownPicker
                open={priorityOpen}
                value={priority}
                items={priorityOption}
                setOpen={setPriorityOpen}
                setValue={setPriority}
                setItems={setPriorityOption}
                style={{ width: 150 }}
                disabledStyle={{
                  opacity: 0.5,
                  
                }}
                labelStyle={{
                  fontWeight: "bold"
                }}
                textStyle={{
                  fontSize: 20,
                  color: COLOR.mainColor,
                }}
              />
            </View>
          </View>
          <View>
            {isPickDate ? (
              <View style={styles.calendarIcon}>
                <DatePicker date={date} onDateChange={setDate} />
              </View>
            ) : (
              <View />
            )}

          </View>
        </View>





      </View>
    );
  };

  const PerTask = props => {
    const { task } = props;
    return (
      <View style={styles.preTaskContainer}>
        <View style={styles.rowDirect}>
          <TouchableOpacity onPress={() => _changeStatusTask(task.id)}>
            {task.status ? (
              <Icon name={'heart'} size={24} color={COLOR.greenColor} />
            ) : (
              <Icon name={'heart'} size={24} color={'red'} />
            )}
          </TouchableOpacity>
          <Text style={styles.taskOnceTitle}>{task.title}</Text>
        </View>
        <View style={styles.rowDirect}>
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
          onPress={() => _deleteTask(task.id)}>
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

  return (
    <View style={styles.backgroundStyle}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={styles.parentContainer} />
        <HeaderConponent />
        {/* Adding task */}

        <View style={styles.optionZone}>
          <TouchableOpacity style={styles.addTaskButton} onPress={() => setOptionZone('ADD')}>
            <Icon name={'plus'} />
            <Text style={{ color: 'green', marginLeft: 5 }}>ADD</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.searchButton} onPress={() => setOptionZone('SEARCH')}>
            <Icon name={'search'} />
            <Text style={{ color: 'green', marginLeft: 5 }}>SEARCH</Text>
          </TouchableOpacity>
        </View>
        <View>
          {isShowAdd ? <AddTask /> : isShowSearch ? <Search /> : <View />}
        </View>

        {/* Title of body */}
        <View style={styles.titleBodyContainer}>
          <Text style={styles.todayTaskText}>Để xem nay cần làm gì</Text>
          <Text>{tasks.filter((item) => !item.status).length + '/' + tasks.length} ♥</Text>
        </View>
        <View style={styles.taskListPerStatusContainer}>
          <TouchableOpacity
            style={styles.taskLisrPerStatus}
            onPress={() => _setShow('ALL')}>
            <Text>ALL</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.taskLisrPerStatus} onPress={() => _setShow('NOT_DONE')}>
            <Text style={{ color: 'red' }}>NOT DONE</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.taskLisrPerStatus} onPress={() => _setShow('DONE')}>
            <Text style={{ color: 'green' }}>DONE</Text>
          </TouchableOpacity>
        </View>

        {/* Task Lisrt */}

        <FlatList
          data={showData.length === 0 ? tasks : showData}
          renderItem={({ item, index }) => <PerTask task={item} />}
          keyExtractor={(item, index) => String(index)}
          contentContainerStyle={styles.taskListItem}
        />

      </SafeAreaView>
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
    borderWidth: 1 / 2,
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
  },
  priorityContainer: {
    flexDirection: 'row',
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
    // paddingHorizontal: 10,
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
    marginTop: 10,
  },
  preTaskContainer: {
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

export default App;
