/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {addTodo, editTodo, deleteTodo} from '../redux/todos';
import {StatusBar} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

const TodoApp = () => {
  const [text, setText] = useState('');
  const [editingTodoId, setEditingTodoId] = useState(null);
  const todos = useSelector(state => state);
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    if (text.trim() !== '') {
      const existingTodo = todos.find(
        todo => todo.text.toLowerCase() === text.toLowerCase(),
      );
      if (existingTodo) {
        Alert.alert(
          'Task already registered',
          'You cannot register a task with the same name',
        );
      } else {
        if (editingTodoId) {
          dispatch(editTodo({id: editingTodoId, text}));
          setEditingTodoId(null);
        } else {
          dispatch(addTodo({id: Date.now(), text, completed: false}));
        }
        setText('');
      }
    }
  };

  const handleEditTodo = (id, currentText) => {
    setText(currentText);
    setEditingTodoId(id);
  };

  const handleDeleteTodo = id => {
    Alert.alert(
      'Remove item',
      'Are you sure you want to remove?',
      [
        {
          text: 'NO',
          style: 'cancel',
        },
        {
          text: 'YES',
          onPress: () => dispatch(deleteTodo(id)),
          style: 'destructive',
        },
      ],
      {cancelable: false},
    );
  };

  const handleToggleTodo = id => {
    console.log(id);
    const todo = todos.find(todoEl => todoEl.id === id);
    if (todo) {
      dispatch(
        editTodo({id: todo.id, text: todo.text, completed: !todo.completed}),
      );
    }
  };

  const renderItem = ({item}) => (
    <TouchableOpacity>
      <LinearGradient
        start={{x: 0, y: 0.75}}
        end={{x: 1, y: 0.25}}
        colors={['#FFFFFF00', '#FFFFFF']}>
        <View style={styles.todoEntryWrapper}>
          {item.completed ? (
            <Icon
              name="checkbox-marked"
              size={25}
              onPress={() => handleToggleTodo(item.id)}
              color={'green'}
              style={{
                marginLeft: 10,
              }}
            />
          ) : (
            <Icon
              name="checkbox-blank-outline"
              size={25}
              onPress={() => handleToggleTodo(item.id)}
              color={'gray'}
              style={{
                marginLeft: 10,
              }}
            />
          )}
          <Text
            style={{
              marginLeft: 10,
              textDecorationLine: item.completed ? 'line-through' : 'none',
              color: item.completed ? 'green' : 'gray',
            }}>
            {item.text}
          </Text>
          <Icon
            name="pencil"
            size={25}
            onPress={() => handleEditTodo(item.id, item.text)}
            color={'gray'}
            style={{
              position: 'absolute',
              right: 40,
            }}
          />
          <Icon
            name="delete-outline"
            size={25}
            onPress={() => handleDeleteTodo(item.id)}
            color={'gray'}
            style={{
              position: 'absolute',
              right: 10,
            }}
          />
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <>
      <StatusBar backgroundColor={'#7277cc'} />
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.headerContent}>
            <Text style={styles.headerTodoText}>to.do</Text>
            <Text style={{color: 'white'}}>
              You have{' '}
              <Text style={{fontWeight: 'bold'}}>{todos.length} task</Text>
            </Text>
          </View>
        </View>
        <View style={styles.todoFieldWrapper}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TextInput
              placeholder="Adicionar novo todo..."
              value={text}
              onChangeText={setText}
              style={styles.todoTextInput}
              maxLength={50}
            />
            <View style={styles.textInputIconDivider} />
            <Icon
              name="chevron-right"
              size={40}
              onPress={handleAddTodo}
              color={'lightgray'}
              style={{
                position: 'absolute',
                right: 0,
              }}
            />
          </View>
        </View>
        <FlatList
          data={todos}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          style={{marginTop: 20}}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'lightgray'},
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 125,
    backgroundColor: '#7277cc',
  },
  headerContent: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerTodoText: {color: 'white', fontWeight: 'bold', fontSize: 28},
  todoFieldWrapper: {
    marginVertical: 20,
    paddingHorizontal: 20,
    marginTop: -25,
  },
  todoTextInput: {
    backgroundColor: 'white',
    borderRadius: 5,
    paddingHorizontal: 10,
    width: '100%',
    height: '100%',
  },
  textInputIconDivider: {
    height: '100%',
    width: 0.3,
    backgroundColor: 'lightgray',
    position: 'absolute',
    right: 39,
  },
  todoEntryWrapper: {
    height: 50,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default TodoApp;
