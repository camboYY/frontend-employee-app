import React from "react";
import { fetchAllEmployees } from "../store";
import { useAppDispatch } from "./hooks";

export function useFetchingUser() {
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    async function getUserById() {
      await dispatch(fetchAllEmployees()).unwrap();
    }
    getUserById();
  }, [dispatch]);
}
