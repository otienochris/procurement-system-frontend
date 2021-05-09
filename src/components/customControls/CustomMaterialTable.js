import MaterialTable from "material-table";
import React from "react";

const CustomMaterialTable = ({ columns, title, data, setData, ...others }) => {
  return (
    <MaterialTable
      title={title}
      columns={columns}
      data={data}
      options={{
        filtering: true,
        exportButton: true,
        actionsColumnIndex: -1,
        addRowPosition: "first",
        grouping: true
      }}
      editable={{
        onRowAdd: (newRow) =>
          new Promise((resolve, reject) => {
            const updatedRows = [...data, newRow];
            setTimeout(() => {
              setData(updatedRows);
              resolve();
            }, 2000);
          }),
        onRowDelete: (selectedRow) =>
          new Promise((resolve, reject) => {
            const index = selectedRow.tableData.id;
            const updatedRows = [...data];
            updatedRows.splice(index, 1);
            setTimeout(() => {
              setData(updatedRows);
              resolve();
            }, 2000);
          }),
        onRowUpdate: (updatedRow, oldRow) =>
          new Promise((resolve, reject) => {
            const index = oldRow.tableData.id;
            const updatedRows = [...data];
            updatedRows[index] = updatedRow;
            setTimeout(() => {
              setData(updatedRows);
              resolve();
            }, 2000);
          }),
        onBulkUpdate: (selectedRows) =>
          new Promise((resolve, reject) => {
            const rowsAsArray = Object.values(selectedRows);
            const updatedRows = [...data];
            let index;
            rowsAsArray.map((updatedRow) => {
              index = updatedRow.oldData.tableData.id;
              updatedRows[index] = updatedRow.newData;
            });
            setTimeout(() => {
              setData(updatedRows);
              resolve();
            }, 2000);
          }),
      }}
      {...others}
    />
  );
};

export default CustomMaterialTable;
