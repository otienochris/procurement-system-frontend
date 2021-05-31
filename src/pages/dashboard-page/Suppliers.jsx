import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import CustomMaterialTable from "../../components/customControls/CustomMaterialTable";
import Popup from "../../components/customControls/Popup";
import {useStyles} from "./Employees";
import FormSupplierSignup from "../signup-page/Forms/FormSupplierSignup";
import {getAllSuppliers, saveSupplier} from "../../services/users/supplier-service";
import CustomButton from "../../components/customControls/CustomButton";
import {toast} from "react-toastify";
import {toastOptions} from "../../App";

function Suppliers(props) {
    const token = useSelector((state) => state.token);
    const [suppliers, setSuppliers] = useState([])
    const [openPopup, setOpenPopup] = useState(false);
    const [updateTable, setUpdateTable] = useState(false);
    const classes = useStyles();

    const fetchData = async (type, body) => {
        switch (type) {
            case "getAllSuppliers":
                const suppliersFromDB = await getAllSuppliers(token)
                    .then(response => response)
                    .then(result => result.json());
                setSuppliers(suppliersFromDB);
                break;
            case "saveSupplier":
                await saveSupplier(body)
                    .then(response => {
                        if (response.ok) {
                            setUpdateTable(true);
                            setOpenPopup(false);
                            toast.success("Supplier Successfully added", toastOptions);
                        } else {
                            toast.error("Error saving supplier", toastOptions);
                        }
                    }).then().catch(reason => {
                        toast.info("Oops! Could not connect to the server", toastOptions);
                    });
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        fetchData("getAllSuppliers").then()
    }, [updateTable])

    const handleFormSubmit = (data) => {
        delete data.password2;
        fetchData("saveSupplier", data).then();
    }

    return (
        <>
            <div className={classes.spacingStyle}>
                <CustomMaterialTable
                    title="Suppliers"
                    columns={[
                        {title: "Kra Pin", field: "kra"},
                        {title: "Title", field: "name"},
                        {title: "Email", field: "email"},
                        {title: "Description", field: "description"},
                        {
                            title: "Status",
                            field: "isAccountActive",
                            default: "false",
                            editable: false,
                            // defaultGroupOrder: 0,
                            render: (rowData) => !rowData.isAccountActive ?
                                <CustomButton text={"Disabled"} style={{backgroundColor: "red"}}/> :
                                <CustomButton text={"Activated"} style={{backgroundColor: "green"}}/>
                        },
                    ]}
                    setOpenPopup={setOpenPopup}
                    data={suppliers}
                    setData={setSuppliers}
                />
            </div>
            <Popup openPopup={openPopup} setOpenPopup={setOpenPopup} title="Add Supplier">
                <FormSupplierSignup handleFormSubmit={handleFormSubmit}/>
            </Popup>
        </>
    );
}

export default Suppliers;
