/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const TodoScreen = () => {
  const insets = useSafeAreaInsets();
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const storedTasks = await AsyncStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  };

  const addTask = async () => {
    if (task.trim() === '') {
      return;
    }
    const newTasks = [...tasks, task];
    setTasks(newTasks);
    setTask('');
    await AsyncStorage.setItem('tasks', JSON.stringify(newTasks));
  };

  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      <Text style={styles.title}>✨ My To-Do List ✨</Text>
      <View style={styles.card}>
        <TextInput
          style={[styles.input, {height: 400, textAlignVertical: 'top'}]}
          placeholder="What do you need to do?"
          value={task}
          onChangeText={setTask}
          multiline
          placeholderTextColor="#ddd"
        />
        <TouchableOpacity style={styles.button} onPress={addTask}>
          <Text style={styles.buttonText}>Add Task</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: 'black',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#ffffff',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 5,
  },
  card: {
    width: '100%',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.2,
    shadowRadius: 10,
    backdropFilter: 'blur(10px)',
  },
  input: {
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    color: '#ffffff',
    fontSize: 16,
  },
  button: {
    backgroundColor: 'rgba(0, 123, 255, 0.8)',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  taskItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    padding: 10,
    marginTop: 5,
    borderRadius: 5,
    color: '#333',
    textAlign: 'center',
  },
});

export default TodoScreen;
