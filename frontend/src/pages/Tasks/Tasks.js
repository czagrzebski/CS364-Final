import React, { useEffect, useState } from 'react';
import TaskTable from '../../components/TaskTable';
import CustomAppBar from '../../components/CustomAppBar';
import api from '../../services/api';

export function Tasks() {
  const [taskList, setTaskList] = useState([]);

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

  return (
    <div>
      <CustomAppBar pageTitle="Tasks"/>
      <TaskTable taskList={taskList} onUpdate={getAllTasks}/>
    </div>
  );
}

