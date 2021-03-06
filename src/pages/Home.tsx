import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [done, setDone] = useState(false);

  function handleAddTask(newTaskTitle: string) {
    
    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: done
    }

    setTasks(oldState => [...oldState, newTask]);
  }

  function handleToggleTaskDone(id: number) {
    const updateTasks = tasks.map(tasks => ({...tasks}));
    const selectionTask = updateTasks.filter(item => {
      return item.id === id 
    });
    selectionTask.forEach(item => item.done = !item.done);
    setTasks(selectionTask);
  }

  function handleRemoveTask(id: number) {
    setTasks(item => item.filter(
      task => task.id !== id
    ));
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})