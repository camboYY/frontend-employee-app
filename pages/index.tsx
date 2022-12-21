import { Button } from "@mui/material";
import React from "react";
import { EmployeeList, NewEmployee } from "@/components/home";
import { useAppDispatch, useAppSelector } from "hooks/hooks";

export default function Home() {
  const [open, setOpen] = React.useState(false);
  const count = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  return (
    <div className="flex justify-center flex-col">
      <Button
        variant="outlined"
        className="w-40 my-2"
        onClick={() => setOpen(true)}
      >
        New Employee
      </Button>
      <EmployeeList />
      <NewEmployee open={open} setOpen={setOpen} />
    </div>
  );
}
