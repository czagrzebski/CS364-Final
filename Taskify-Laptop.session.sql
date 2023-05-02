SELECT User.FirstName, User.LastName, count(Task.TaskTitle)
  FROM User JOIN AssignedTo JOIN Task 
    ON User.UserId = AssignedTo.UserId
       AND Task.TaskId = AssignedTo.TaskId
    WHERE Task.TaskCompleted = 1
    GROUP BY User.UserId