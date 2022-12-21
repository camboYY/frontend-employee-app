import React from "react";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import { Formik } from "formik";
import Button from "@mui/material/Button";
import styled from "@emotion/styled";
import { DialogActions, DialogContent, DialogContentText } from "@mui/material";

// Shape of form values
interface FormValues {
  email?: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  phoneNumber?: string;
}

const MyEmployeeForm = ({
  handleClose,
}: {
  handleClose: (evt: boolean) => void;
}) => {
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    middleName: "",
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    lastName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    phoneNumber: Yup.number().max(12).required("Required"),
    middleName: Yup.string().optional(),
  });

  const onSubmit = React.useCallback(
    (values: FormValues) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
      }, 400);
      handleClose(true);
    },
    [handleClose]
  );

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({
        touched,
        errors,
        values: { firstName, lastName, email, phoneNumber, middleName },
        handleSubmit,
        handleBlur,
        handleChange,
      }) => (
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <DialogContentTextStyled id="alert-dialog-slide-description">
              <TextField
                label="First Name"
                id="firstName"
                size="small"
                name="firstName"
                helperText={touched.firstName ? errors.firstName : ""}
                error={touched.firstName && Boolean(errors.firstName)}
                onChange={handleChange}
                value={firstName}
                onBlur={handleBlur}
              />
              <TextField
                label="Last Name"
                id="lastName"
                size="small"
                name="lastName"
                helperText={touched.lastName ? errors.lastName : ""}
                error={touched.lastName && Boolean(errors.lastName)}
                onChange={handleChange}
                value={lastName}
                onBlur={handleBlur}
              />
              <TextField
                label="Middle Name"
                id="middleName"
                size="small"
                type="text"
                name="middleName"
                helperText={touched.middleName ? errors.middleName : ""}
                error={touched.middleName && Boolean(errors.middleName)}
                onChange={handleChange}
                value={middleName}
                onBlur={handleBlur}
              />
              <TextField
                type="email"
                label="E-mail"
                id="email"
                name="email"
                size="small"
                helperText={touched.email ? errors.email : ""}
                error={touched.email && Boolean(errors.email)}
                onChange={handleChange}
                value={email}
                onBlur={handleBlur}
              />
              <TextField
                label="Phone Number"
                id="phoneNumber"
                size="small"
                type="number"
                name="phoneNumber"
                helperText={touched.phoneNumber ? errors.phoneNumber : ""}
                error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                onChange={handleChange}
                value={phoneNumber}
                onBlur={handleBlur}
              />
            </DialogContentTextStyled>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleClose(true)}>Cancel</Button>
            <Button variant="outlined" type="submit">
              Save
            </Button>
          </DialogActions>
        </form>
      )}
    </Formik>
  );
};
export const EmployeeForm = React.memo(MyEmployeeForm);

const DialogContentTextStyled = styled(DialogContentText)`
  display: flex;
  flex-direction: column;
  min-width: 400px;
  > div {
    margin: 10px 0;
  }

  button {
    margin: auto;
  }
`;
