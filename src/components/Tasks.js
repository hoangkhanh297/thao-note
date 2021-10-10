import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import Collapsible from 'react-native-collapsible';
import Icon from 'react-native-vector-icons/FontAwesome';
import Task from "./Task.js";
import SubTask from "./SubTask.js";

const COLOR = {
  mainColor: '#6C6DB4',
  greenColor: 'rgb(77, 196, 144)',
  pinkColor: '#CF9EF5',
};
const Tasks = (props) => {
  const { taskItem, changeStatusSubTask, changeStatusMainTask, showAddTask, deleteMainTask, deleteSubTask } = props;
  const [isCollapsed, setIsCollapsed] = useState(true);

  const onCollapse = () => {
    console.log('On colapse ' + JSON.stringify(taskItem.subTask))
    setIsCollapsed(!isCollapsed)
  }

  console.log('Task item at Tasks ' + JSON.stringify(taskItem))
  return (
    <View style={{ flex: 1 }}>
      <View>
        <View style={{ flexDirection: 'row' }}>
          <Task
            mainTaskId={taskItem.id}
            task={taskItem.mainTask}
            changeStatusMainTask={changeStatusMainTask}
            onCollapse={onCollapse}
            deleteMainTask={deleteMainTask}
          />
          <TouchableOpacity style={{
            marginTop: 10,
            position: 'absolute',
            height: 24,
            width: 24,
            top: 30,
            right: -12,
          }
          } onPress={() => [showAddTask(true, taskItem.id), setIsCollapsed(false)]}>
            <Icon name="plus-circle" size={24} color={COLOR.mainColor} style={{ marginRight: 5 }} />
          </TouchableOpacity>
        </View>
      </View>
      <Collapsible collapsed={isCollapsed}>
        {taskItem.subTask != undefined && taskItem.subTask != null && taskItem.subTask.length !== 0 ? (
          taskItem.subTask.map((item) => {
            return (
              <SubTask task={item} changeStatusSubTask={changeStatusSubTask} mainTaskId={taskItem.id} deleteSubTask={deleteSubTask} />
            )
          })
        ) : (<Text style={{ color: COLOR.pinkColor, fontSize: 14, fontWeight: '300', marginLeft: 40 }}>Chưa có subtask nào cho task '{taskItem.mainTask.title}' add thêm rồi làm nè !!</Text>)}
      </Collapsible>
    </View>
  )
}

export default Tasks;