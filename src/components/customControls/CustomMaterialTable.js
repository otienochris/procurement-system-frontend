import MaterialTable from "material-table";
import React from "react";

const CustomMaterialTable = ({ columns, title, data, setData, setOpenPopup, ...others }) => {
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
        grouping: true,
      }}
      actions={[
        {
          icon: "add",
          tooltip: "Add User",
          onClick: (event, newData) => {
            setOpenPopup(true)
          },
          isFreeAction: true,
        },
        {
          icon: "edit",
          tooltip: "Edit row",
          onClick: (event, rowData) => {
            setOpenPopup(true)
          },
        },
      ]}
      editable={{
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
      }}
      {...others}
    />
  );
};

export default CustomMaterialTable;
