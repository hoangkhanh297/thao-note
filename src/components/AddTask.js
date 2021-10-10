
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
    const [error, setError] = useState('');
    const [date, setDate] = useState(new Date());
    const [isPickDate, setIsPickDate] = useState(false);
    const [priorityOpen, setPriorityOpen] = useState(false);
    const [priority, setPriority] = useState('MEDIUM');
    const [priorityOption, setPriorityOption] = useState([
        { label: 'Medium', value: 'MEDIUM', icon: () => <Image source={require('../assets/images/medium.png')} style={{ width: 15, height: 15 }} /> },
        { label: 'Low', value: 'LOW', icon: () => <Image source={require('../assets/images/low.png')} style={{ width: 15, height: 15 }} /> },
        { label: 'High', value: 'HIGH', icon: () => <Image source={require('../assets/images/high.png')} style={{ width: 15, height: 15 }} /> },
    ]);

    const validateAndAdd = () => {
        if (titleTask === '') {
            console.log('Chưa điền task nè meo meo!!')
            setError('Chưa điền task nè meo meo!!');
            return;
        }
        if (date < new Date().setHours(0)) {
            console.log('Baby chọn ngày ' + format(date, 'dd/MM/yyyy HH:mm:ss a') + format(currentDate, 'dd/MM/yyyy HH:mm:ss a') + ', ngày này sai nè!!')
            setError('Baby chọn ngày ' + format(date, 'dd/MM/yyyy HH:mm a') + ', ngày này sai nè!!')
            return;
        }
        addTask(
            {
                id: new Date().getTime(),
                subTask: [],
                mainTask: {
                    title: titleTask,
                    status: false,
                    date: format(date, 'dd/MM/yyyy'),
                    time: format(date, 'hh:mm a'),
                    priority: priority,
                }
            });
        setTitleTask('');
        setIsPickDate(false);
        setError('');
    }
    return (
        <View>
            <View style={styles.addingTaskContainer}>
                <View style={[styles.addTaskInputText, {
                    borderColor: error === ''
                        ? 'black'
                        : 'red'
                }]}>
                    <TextInput
                        placeholder={'Làm gì, lúc nào nè baby ♥'}
                        style={styles.titleText}
                        value={titleTask}
                        onChangeText={(text) => [setTitleTask(text), setError('')]}
                    />
                    <TouchableOpacity style={styles.addingTaskButton} onPress={() => validateAndAdd()}>
                        <Icon name="plus-circle" size={24} color={COLOR.mainColor} style={{ marginRight: 5 }} />
                    </TouchableOpacity>
                </View>
            </View>
            {
                error !== '' ? (<Text style={{ color: 'red', marginLeft: 20, marginTop: 3, marginBottom: 5 }}>{error}</Text>) : (<View />)
            }
            <View style={{ paddingHorizontal: 15 }}>
                <View style={[styles.priorityContainer, {
                    borderWidth: 0.5, borderColor: error === ''
                        ? 'black'
                        : 'red'
                }]}>
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
    titleText: {
        // borderWidth: 1 / 2,
        borderRadius: 10,
        flex: 1,
        height: 60,
        paddingLeft: 15,
        marginRight: 10
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
    rowDirect: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default AddTask;
