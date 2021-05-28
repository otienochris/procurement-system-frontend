import MaterialTable from "material-table";
import React from "react";

const CustomMaterialTable = (props) => {
    const {columns, title, data, setData, handleDelete, setOpenPopup, ...others} = props
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
                {
                    icon: "delete",
                    tooltip: "delete",
                    onClick: (event, rowData) => {
                        handleDelete("delete", rowData.id)
                    }
                }
            ]}

            {...others}
        />
    );
};

export default CustomMaterialTable;
