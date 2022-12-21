import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { useFetchingUser } from "hooks/useFetchingUser";
import { useEmployees } from "@/store/index";

interface Column {
  id: "name" | "code" | "population" | "size" | "density" | "action";
  label: string;
  minWidth?: number;
  align?: "right" | "center" | "left" | "inherit" | "justify";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "code", label: "ISO\u00a0Code", minWidth: 100 },
  {
    id: "population",
    label: "Population",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "size",
    label: "Size\u00a0(km\u00b2)",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "density",
    label: "Density",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toFixed(2),
  },
  {
    id: "action",
    label: "Action",
    minWidth: 170,
    align: "center",
  },
];

interface Data {
  name: string;
  code: string;
  population: number;
  size: number;
  density: number;
  action?: React.ReactNode;
}

function createData(
  name: string,
  code: string,
  population: number,
  size: number
): Data {
  const density = population / size;
  return {
    name,
    code,
    population,
    size,
    density,
    action: <RenderActionButtons id={1} />,
  };
}

function RenderActionButtons({ id }: { id: number }) {
  function onEditBtn(id: number) {}
  function onDeleteBtn(id: number) {}
  return (
    <StyledDiv>
      <Button onClick={() => onEditBtn(id)}>Edit</Button>
      <Button onClick={() => onDeleteBtn(id)}>Delete</Button>
    </StyledDiv>
  );
}

const rows = [
  createData("India", "IN", 1324171354, 3287263),
  createData("China", "CN", 1403500365, 9596961),
  createData("Italy", "IT", 60483973, 301340),
  createData("United States", "US", 327167434, 9833520),
  createData("Canada", "CA", 37602103, 9984670),
  createData("Australia", "AU", 25475400, 7692024),
  createData("Germany", "DE", 83019200, 357578),
  createData("Ireland", "IE", 4857000, 70273),
  createData("Mexico", "MX", 126577691, 1972550),
  createData("Japan", "JP", 126317000, 377973),
  createData("France", "FR", 67022000, 640679),
  createData("United Kingdom", "GB", 67545757, 242495),
  createData("Russia", "RU", 146793744, 17098246),
  createData("Nigeria", "NG", 200962417, 923768),
  createData("Brazil", "BR", 210147125, 8515767),
];

const MyEmployeeList = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  useFetchingUser();
  const user = useEmployees();
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const RenderTableCell = React.useCallback(
    ({ row }: { row: Data }) => (
      <TableRow hover role="checkbox" tabIndex={-1}>
        {columns.map((column) => {
          const value = row[column.id];
          return (
            <TableCell key={column.id} align={column.align}>
              {column.format && typeof value === "number"
                ? column.format(value)
                : value}
            </TableCell>
          );
        })}
      </TableRow>
    ),
    []
  );

  const RenderTableBody = React.useCallback(
    ({ rows }: { rows: Data[] }) => {
      return (
        <TableBody>
          {rows
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => (
              <RenderTableCell key={row.code} row={row} />
            ))}
        </TableBody>
      );
    },
    [page, rowsPerPage, RenderTableCell]
  );

  const RenderTableCellHeader = React.useCallback(
    ({ column }: { column: Column }) => (
      <TableCell
        key={column.id}
        align={column.align}
        style={{ minWidth: column.minWidth }}
      >
        {column.label}
      </TableCell>
    ),
    []
  );

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <RenderTableCellHeader column={column} key={column.id} />
              ))}
            </TableRow>
          </TableHead>
          <RenderTableBody rows={rows} />
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export const EmployeeList = React.memo(MyEmployeeList);

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  button {
    margin: 0px 4px;
  }
`;
