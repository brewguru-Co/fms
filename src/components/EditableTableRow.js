import React from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import CreateIcon from "@material-ui/icons/Create";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";
import TextField from "@material-ui/core/TextField";

function EditableTableRow(props) {
  const { row, columns, onUpdate, onRemove } = props;
  const [state, setState] = React.useState({
    isModifiying: false,
    rowData: { ...row },
  });

  const onChange = (e) => {
    const { id, type, value } = e.target;
    setState((prev) => ({
      ...prev,
      rowData: {
        ...prev.rowData,
        [id]: type === "number" ? parseFloat(value) : value,
      },
    }));
  };

  const handleUpdate = () => {
    onUpdate(state.rowData);
    setState({ ...state, isModifiying: false });
  };

  const getType = (key) => {
    return columns.find((e) => e.id === key).type;
  };

  return (
    <TableRow key={row.id}>
      <TableCell style={{ width: "120px" }} padding="none">
        {state.isModifiying ? (
          <>
            <Tooltip title="저장">
              <IconButton onClick={handleUpdate}>
                <DoneIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="취소">
              <IconButton
                onClick={() => setState({ ...state, isModifiying: false })}
              >
                <CloseIcon />
              </IconButton>
            </Tooltip>
          </>
        ) : (
          <>
            <Tooltip title="수정">
              <IconButton
                onClick={() => setState({ ...state, isModifiying: true })}
              >
                <CreateIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="삭제">
              <IconButton onClick={() => onRemove(row.id)}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </>
        )}
      </TableCell>
      {state.isModifiying
        ? Object.keys(row)
            .filter((key) => key !== "id")
            .map((key, index) => (
              <TableCell key={index}>
                <TextField
                  id={key}
                  value={state.rowData[key] || ""}
                  onChange={onChange}
                  color="primary"
                  type={getType(key)}
                />
              </TableCell>
            ))
        : Object.keys(row)
            .filter((key) => key !== "id")
            .map((key, index) => (
              <TableCell key={index}>
                <Typography variant="body2">{row[key]}</Typography>
              </TableCell>
            ))}
    </TableRow>
  );
}

export default EditableTableRow;
