import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "./Card/Card";
import CardBody from "./Card/CardBody";
import CardHeader from "./Card/CardHeader";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import AddBoxRoundedIcon from "@material-ui/icons/AddBoxRounded";
import EditableTableRow from "./EditableTableRow";
import TeaDialog from "./Dialog/TeaDialog";
import TankDialog from "./Dialog/TankDialog";
import NotificationDialog from "./Dialog/NotificationDialog";
import locale from "../locale/ko_KR.json";
import styles from "../assets/jss/components/editableTableStyle";

const useStyles = makeStyles(styles);

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function CTableHead(props) {
  const { classes, order, orderBy, onRequestSort, columns } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell className={classes.tableHeader} align="left">
          {locale.ACTION}
        </TableCell>
        {columns.map((column) => (
          <TableCell
            key={column.id}
            align="left"
            padding={column.disablePadding ? "none" : "default"}
            sortDirection={orderBy === column.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === column.id}
              direction={orderBy === column.id ? order : "asc"}
              onClick={createSortHandler(column.id)}
            >
              <Typography className={classes.tableHeader} variant="body2">
                {column.label}
              </Typography>
              {orderBy === column.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const CDialog = ({ dialog, data, open, handleClose, onCreate }) => {
  switch (dialog) {
    case "tea":
      return (
        <TeaDialog
          open={open}
          handleClose={handleClose}
          onCreate={onCreate}
          teas={data}
        />
      );
    case "tank":
      return (
        <TankDialog open={open} handleClose={handleClose} onCreate={onCreate} />
      );
    case "notification":
      return (
        <NotificationDialog
          open={open}
          handleClose={handleClose}
          onCreate={onCreate}
        />
      );
    default:
      return null;
  }
};

export default function EditableTable(props) {
  const {
    rows,
    columns,
    onRemove,
    onUpdate,
    onCreate,
    dialog,
    title,
    subTitle,
    color,
  } = props;
  const classes = useStyles(props);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("calories");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(props.rowsPerPage || 5);
  const [open, setOpen] = useState(false);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <>
      <Card>
        <CardHeader color={color}>
          <div className={classes.header}>
            <div className={classes.headerContent}>
              <h3 className={classes.title}>{title}</h3>
              <p className={classes.category}>{subTitle}</p>
            </div>
            <Tooltip title="추가">
              <AddBoxRoundedIcon
                className={classes.add}
                fontSize="large"
                onClick={handleOpen}
              />
            </Tooltip>
          </div>
        </CardHeader>
        <CardBody>
          <TableContainer>
            <Table>
              <CTableHead
                classes={classes}
                columns={columns}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    return (
                      <EditableTableRow
                        key={row.id}
                        columns={columns}
                        row={row}
                        onUpdate={onUpdate}
                        onRemove={onRemove}
                        color={color}
                      />
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={columns.length + 1} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </CardBody>
      </Card>
      <CDialog
        data={rows}
        dialog={dialog}
        open={open}
        handleClose={handleClose}
        onCreate={onCreate}
      />
    </>
  );
}
