import React, { useEffect, useState, useCallback, useMemo } from "react";
import CustomAppBar from "../../components/CustomAppBar";
import api from "../../services/api";
import UserTable from "../../components/UserTable";
import debounce from "lodash.debounce";

export function Users() {
  const [userList, setUserList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    debouncedEventHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  const getAllUsers = () => {
    api
      .get("/user/all", { params: { search: searchTerm } })
      .then((response) => {
        setUserList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const debouncedEventHandler = useMemo(
    () => debounce(getAllUsers, 500)
  , [searchTerm, getAllUsers]);

  return (
    <div>
      <CustomAppBar pageTitle="Users" />
      <UserTable userList={userList} onUpdate={getAllUsers} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
    </div>
  );
}
