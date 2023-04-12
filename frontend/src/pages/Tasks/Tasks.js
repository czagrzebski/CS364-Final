import React, { useEffect, useState } from 'react';
import TaskTable from '../../components/TaskTable';
import CustomAppBar from '../../components/CustomAppBar';
import api from '../../services/api';
import CreateTaskDialog from '../../components/CreateTaskDialog';
import { Button } from '@mui/material';

export function Tasks() {
  const [taskList, setTaskList] = useState([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  useEffect(() => {
    getAllTasks()
  }, []);

  const getAllTasks = () => {
    api.get('task/all')
      .then((response) => {
        setTaskList(response.data);
      }
    );
  };

  const updateTask = (task) => {
    api.put('task/update', task)
      .then((response) => {
        getAllTasks();
      }
    );
  } 

  return (
    <div>
      <CustomAppBar pageTitle="Tasks"/>
      <CreateTaskDialog isCreateDialogOpen={isCreateDialogOpen} setIsCreateDialogOpen={setIsCreateDialogOpen} onTaskUpdate={getAllTasks} />
      <TaskTable taskList={taskList} addTask={() => setIsCreateDialogOpen(true)} updateTask={updateTask}/>
    </div>
  );
}

