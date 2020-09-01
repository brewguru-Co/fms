import React from "react";
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

function CTableCell(props) {
  const { isModifying, type, id, key, value, onChange } = props;

  if (type === "checkbox") {
    console.log(!isModifying);
    return (
      <TableCell key={key}>
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
    <TableCell key={key}>
      {isModifying ? (
        <TextField
          id={id}
          value={value}
          onChange={onChange}
          color="primary"
          type={type}
        />
      ) : (
        <Typography variant="body2">{value}</Typography>
      )}
    </TableCell>
  );
}

function EditableTableRow(props) {
  const { row, columns, onUpdate, onRemove } = props;
  const [state, setState] = React.useState({
    isModifying: false,
    rowData: { ...row },
  });

  const onChange = (e) => {
    const { id, type, value, checked } = e.target;
    if (type === "checkbox") {
      return setState((prev) => ({
        ...prev,
        rowData: {
          ...prev.rowData,
          [id]: checked,
        },
      }));
    }
    return setState((prev) => ({
      ...prev,
      rowData: {
        ...prev.rowData,
        [id]: type === "number" ? parseFloat(value) : value,
      },
    }));
  };

  const handleUpdate = () => {
    onUpdate(state.rowData);
    setState({ ...state, isModifying: false });
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
                <DoneIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="취소">
              <IconButton
                onClick={() => setState({ ...state, isModifying: false })}
              >
                <CloseIcon />
              </IconButton>
            </Tooltip>
          </>
        ) : (
          <>
            <Tooltip title="수정">
              <IconButton
                onClick={() => setState({ ...state, isModifying: true })}
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
      {Object.keys(row)
        .filter((key) => key !== "id")
        .map((key, index) => (
          <CTableCell
            isModifying={state.isModifying}
            id={key}
            key={index}
            value={state.rowData[key] || ""}
            onChange={onChange}
            color="primary"
            type={getType(key)}
          />
        ))}
    </TableRow>
  );
}

export default EditableTableRow;
