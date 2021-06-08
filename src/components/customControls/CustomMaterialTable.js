import MaterialTable from "material-table";
import React, {useEffect, useState} from "react";


const CustomMaterialTable = (props) => {
    const {columns, title, data, handleDelete, setOpenEdit, setOpenPopup, handleEdit, allowEdit, allowAdd, allowDelete, ...others} = props
    const [actionArray, setActionArray] = useState([{
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
                if (handleEdit !== undefined) {
                    handleEdit(rowData);
                }
                if (setOpenEdit !== undefined) {
                    setOpenEdit(true);
                }
            },
        },
        {
            icon: "delete",
            tooltip: "delete",
            onClick: (event, rowData) => {
                if (rowData.id !== undefined) {
                    handleDelete("delete", rowData.id);
                }
                if (rowData.kra !== undefined) {
                    handleDelete("delete", rowData.kra);
                }
                if (rowData.empId !== undefined) {
                    handleDelete("delete", rowData.empId);
                }
            }
        }]);

    useEffect(() => {
        console.log(allowEdit, allowAdd, allowDelete)

        const yesAdd = actionArray[0]
        const yesEdit = actionArray[1];
        const yesDel = actionArray[2]

        let actingArray = [];

        if ((allowAdd !== undefined) && allowAdd) {
            actingArray[0] = yesAdd;
        }
        if (allowDelete !== undefined && allowDelete) {
            actingArray[1] = yesDel;
        }
        if (allowEdit !== undefined && allowEdit){
            actingArray[2] = yesEdit;
        }
        setActionArray(actingArray);
    }, [])

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
            actions={actionArray}

            {...others}
        />
    );
};

export default CustomMaterialTable;
