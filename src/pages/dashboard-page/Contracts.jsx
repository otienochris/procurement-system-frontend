import React, {useEffect, useState} from "react";
import CustomMaterialTable from "../../components/customControls/CustomMaterialTable";
import {useSelector} from "react-redux";
import {addContract, deleteContract, getAllContracts} from "../../services/contract";
import {toast} from "react-toastify";
import Popup from "../../components/customControls/Popup";
import FormAddContract from "./forms/FormAddContract";

const Contracts = () => {
    const token = useSelector(state => state.token);
    const [contracts, setContracts] = useState([]);
    const [updateTable, setUpdateTable] = useState(false);
    const [openPopup, setOpenPopup] = useState(false);

    const fetchData = async (type, body) => {
        switch (type) {
            case "getAllContracts":
                let contracts = [];
                contracts = await getAllContracts(token)
                    .then(response => response)
                    .then(result => result.json())
                    .catch();
                setContracts(contracts);
                break;
            case "saveContract":
                await addContract(token, body).then(response => {
                    if (response.ok) {
                        setUpdateTable(!updateTable);
                    }
                    return response.ok ?
                        toast.success("Item added successfully", {position: "bottom-right"})
                        : toast.error("Error adding the item, please try again", {position: "bottom-right"})
                });
                break
            case "delete":
                await deleteContract(token, body)
                    .then(response => response.ok ?
                        toast.success("Item deleted successfully", {position: "bottom-right"}) :
                        toast.error("Error deleting the item", {position: "bottom-right"})
                    )
                    .then()
                    .catch(() => toast.info("Oops! Could not connect to the server", {position: "bottom-right"}))
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        fetchData("getAllContracts").then();
        console.log(contracts);
    }, [updateTable]);

    const handleFormSubmit = (data) => {
        const status = [data.status]
        const formData = new FormData();
        formData.append("expiryDate", data.expiryDate);
        formData.append("supplierId", data.supplierId);
        formData.append("contractDocument", data.contractDocument[0]);
        formData.append("status", status);

        fetchData("saveContract", formData).then()
    }

    return (
        <>
            <CustomMaterialTable
                title={"Contracts"}
                colums={[
                    {title: "Supplier Id", field: "supplierId"},
                    {title: "Expiry Date", field: "expiryDate", render: (rowData) => new Date(rowData.expiryDate).toDateString()}
                ]}
                data={contracts}
                setOpenPopup={setOpenPopup}
                handleDelete={fetchData}
            />
            <Popup title="Add Contract" openPopup={openPopup} setOpenPopup={setOpenPopup}>
                <FormAddContract handleFormSubmit={handleFormSubmit} />
            </Popup>
        </>
    )
}

export default Contracts;