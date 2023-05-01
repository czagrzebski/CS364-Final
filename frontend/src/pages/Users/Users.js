import React, { useEffect, useState } from "react";
import CustomAppBar from "../../components/CustomAppBar";
import api from "../../services/api";
import UserTable from "../../components/UserTable";

export function Users() {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = () => {
    api
      .get("/user/all")
      .then((response) => {
        setUserList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <CustomAppBar pageTitle="Users" />
      <UserTable userList={userList} onUpdate={getAllUsers} />
    </div>
  );
}
