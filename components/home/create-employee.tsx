import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { EmployeeForm } from "./employee-form";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CreateEmployee = ({
  setOpen,
  open,
}: {
  setOpen: (val: boolean) => void;
  open: boolean;
}) => {
  const handleClose = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>NEW EMPLOYEE</DialogTitle>
        <EmployeeForm handleClose={handleClose} />
      </Dialog>
    </div>
  );
};

export const NewEmployee = React.memo(CreateEmployee);
