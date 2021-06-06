import MaterialTable from "material-table";
import React from "react";

const CustomMaterialTable = (props) => {
    const {columns, title, data, handleDelete, setOpenEdit, setOpenPopup, handleEdit, ...others} = props
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
                        if (handleEdit !== undefined){
                            handleEdit(rowData);
                        }
                        if (setOpenEdit !== undefined){
                            setOpenEdit(true);
                        }
                        // if (rowData.status === "C")
                    },
                },
                {
                    icon: "delete",
                    tooltip: "delete",
                    onClick: (event, rowData) => {
                        if (rowData.id !== undefined){
                            handleDelete("delete", rowData.id);
                        }
                        if (rowData.kra !== undefined){
                            handleDelete("delete", rowData.kra);
                        }
                        if (rowData.empId !== undefined){
                            handleDelete("delete", rowData.empId);
                        }
                    }
                }
            ]}

            {...others}
        />
    );
};

export default CustomMaterialTable;
