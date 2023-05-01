import React, { useEffect, useState } from 'react';
import TaskTable from '../../components/TaskTable';
import CustomAppBar from '../../components/CustomAppBar';
import api from '../../services/api';
import useUserStore from '../../utils/Stores';

export function Tasks() {
  const UserId = useUserStore((state) => state.UserId)
  const [taskList, setTaskList] = useState([]);
  const [hideCompleted, setHideCompleted] = useState(false);
  const [showAllTasks, setShowAllTasks] = useState(false);

  console.log(UserId)

  useEffect(() => {
    getAllTasks()

      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hideCompleted, showAllTasks]);

  const getAllTasks = () => {
    api.get('/task/all/', {
      params: {
        UserId: UserId,
        showAllTasks: showAllTasks
      }
    })
      .then((response) => {
        setTaskList(response.data);
      }
    );
  };

  return (
    <div>
      <CustomAppBar pageTitle="Tasks" />
      <TaskTable taskList={taskList} onUpdate={getAllTasks} hideCompleted={hideCompleted} setHideCompleted={setHideCompleted} showAllTasks={showAllTasks} setShowAllTasks={setShowAllTasks}/>
    </div>
  );
}

