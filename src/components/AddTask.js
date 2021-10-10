
import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-date-picker';
import { format } from 'date-fns';
import DropDownPicker from 'react-native-dropdown-picker';
const COLOR = {
    mainColor: '#6C6DB4',
    greenColor: 'rgb(77, 196, 144)',
    pinkColor: '#CF9EF5',
};

const AddTask = (props) => {
    const { addTask } = props;
    const [titleTask, setTitleTask] = useState('');
    const [isError, setIsError] = useState(false);
    const [date, setDate] = useState(new Date());
    const [isPickDate, setIsPickDate] = useState(false);
    const [priorityOpen, setPriorityOpen] = useState(false);
    const [priority, setPriority] = useState('MEDIUM');
    const [priorityOption, setPriorityOption] = useState([
        { label: 'Medium', value: 'MEDIUM', icon: () => <Image source={require('../assets/images/medium.png')} style={{ width: 15, height: 15 }} /> },
        { label: 'Low', value: 'LOW', icon: () => <Image source={require('../assets/images/low.png')} style={{ width: 15, height: 15 }} /> },
        { label: 'High', value: 'HIGH', icon: () => <Image source={require('../assets/images/high.png')} style={{ width: 15, height: 15 }} /> },
    ]);
    return (
        <View>
            <View style={styles.addingTaskContainer}>
                <View style={[styles.addTaskInputText, {
                    borderColor: !isError || titleTask !== ''
                        ? 'black'
                        : 'red'
                }]}>
                    <TextInput
                        placeholder={'Làm gì, lúc nào nè baby ♥'}
                        style={styles.titleText}
                        value={titleTask}
                        onChangeText={setTitleTask}
                    />
                    <TouchableOpacity style={styles.addingTaskButton} onPress={() => [addTask(
                        {
                            id: new Date().getTime(),
                            subTask: [],
                            mainTask: {
                                title: titleTask,
                                status: false,
                                date: format(date, 'dd/MM/yyyy'),
                                time: format(date, 'hh:mm a'),
                                subTask: [],
                                priority: priority,
                            }
                        }), setTitleTask('')]}>
                        <Icon name="plus-circle" size={24} color={COLOR.mainColor} style={{ marginRight: 5 }} />
                    </TouchableOpacity>
                </View>
            </View>
            {
                isError ? (<Text style={{ color: 'red', marginLeft: 20, marginTop: 3, marginBottom: 5 }}>Chưa điền task nè meo meo !!</Text>) : (<View />)
            }
            <View style={{ paddingHorizontal: 15 }}>
                <View style={styles.priorityContainer}>
                    {/* <Text style={styles.priorityText}>Priority nè</Text> */}
                    <View style={{ marginLeft: 5 }}>
                        <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => setIsPickDate(!isPickDate)}>
                            <View style={styles.rowDirect}>
                                <Icon name={'calendar'} size={24} color={'#434545'} />
                                <Text style={{ marginLeft: 5, fontSize: 15, fontWeight: '300', color: 'black' }}>{format(date, 'dd/MM/yyyy HH:mm')}</Text>
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
                            style={{ width: 130, height: 40, marginBottom: 10, marginTop: 10, marginRight: 15, borderWidth: 0.5, marginEnd: 10 }}
                            dropDownDirection={'TOP'}
                            containerStyle={{
                                width: 130,
                                marginRight: 10
                            }}
                            disabledStyle={{
                                opacity: 1,
                                fontSize: 15,
                                fontWeight: '300',
                                color: 'black',
                            }}
                            drop
                            labelStyle={{
                                fontSize: 15,
                                fontWeight: '300',
                                color: 'black',
                            }}
                            textStyle={{
                                fontSize: 15,
                                fontWeight: '300',
                                color: 'black',
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
                <View
                    style={{
                        marginTop: 10,
                        borderBottomColor: 'black',
                        borderBottomWidth: 0.5,
                        marginLeft: 15,
                        marginRight: 15
                    }}
                />
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
        marginTop: 2,
        alignItems: 'center',
        paddingHorizontal: 15,
    },
    addTaskInputText: {
        flexDirection: 'row',
        marginTop: 5,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 0.8,
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

export default AddTask;
