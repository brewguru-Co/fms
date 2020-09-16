import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import DeleteIcon from "@material-ui/icons/Delete";
import CreateIcon from "@material-ui/icons/Create";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";
import TextField from "@material-ui/core/TextField";
import { toPhoneString } from "../lib/utils";
import { getColor } from "../assets/jss";

const useStyles = makeStyles({});

function CTableCell(props) {
  const { isModifying, type, id, value, error, onChange } = props;

  if (type === "checkbox") {
    return (
      <TableCell padding="none">
        <Checkbox
          id={id}
          type={type}
          checked={value}
          onChange={onChange}
          disabled={!isModifying}
        />
      </TableCell>
    );
  }

  return (
    <>
      {isModifying ? (
        <TableCell style={{ verticalAlign: "top" }} padding="none">
          <TextField
            error={error ? true : false}
            helperText={error}
            id={id}
            value={value}
            onChange={onChange}
            color="primary"
            type={type}
            style={{ padding: 5, width: "100%" }}
          />
        </TableCell>
      ) : (
        <TableCell padding="none">
          <Typography variant="body2">
            {value && type === "tel" ? toPhoneString(value) : value}
          </Typography>
        </TableCell>
      )}
    </>
  );
}

function EditableTableRow(props) {
  const classes = useStyles();
  const { row, columns, onUpdate, onRemove, validator, color } = props;
  const [state, setState] = useState({
    isModifying: false,
    rowData: { ...row },
  });
  const [rowErrors, setRowErrors] = useState({});

  const onChange = (e) => {
    const { id, type, value, checked } = e.target;
    const v = type === "number" ? Number(value) : value;

    if (type === "checkbox") {
      return setState((prev) => ({
        ...prev,
        rowData: { ...prev.rowData, [id]: checked },
      }));
    }

    const errors = validator({ ...state.rowData, [id]: v });
    setRowErrors({ ...errors });
    return setState((prev) => ({
      ...prev,
      rowData: { ...prev.rowData, [id]: v },
    }));
  };

  const handleUpdate = () => {
    if (Object.keys(rowErrors).length === 0) {
      onUpdate(state.rowData);
      setState({ ...state, isModifying: false });
    }
  };

  const handleCancel = () => {
    setState({ ...state, rowData: { ...row }, isModifying: false });
  };

  const getType = (key) => {
    return columns.find((e) => e.id === key).type;
  };

  return (
    <TableRow key={row.id}>
      <TableCell style={{ width: "120px" }} padding="none">
        {state.isModifying ? (
          <>
            <Tooltip title="저장">
              <IconButton onClick={handleUpdate}>
                <DoneIcon style={{ color: getColor("green") }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="취소">
              <IconButton onClick={handleCancel}>
                <CloseIcon style={{ color: getColor("red") }} />
              </IconButton>
            </Tooltip>
          </>
        ) : (
          <>
            <Tooltip title="수정">
              <IconButton
                onClick={() => setState({ ...state, isModifying: true })}
              >
                <CreateIcon style={{ color: getColor(color) }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="삭제">
              <IconButton onClick={() => onRemove(row.id)}>
                <DeleteIcon style={{ color: getColor(color) }} />
              </IconButton>
            </Tooltip>
          </>
        )}
      </TableCell>
      {columns.map(({ id }, index) => (
        <CTableCell
          isModifying={state.isModifying}
          id={id}
          key={index}
          value={state.rowData[id]}
          error={rowErrors[id]}
          onChange={onChange}
          color="primary"
          type={getType(id)}
        />
      ))}
    </TableRow>
  );
}

export default EditableTableRow;
