import React, {useEffect, useState} from "react";
import CustomMaterialTable from "../../components/customControls/CustomMaterialTable";
import {useSelector} from "react-redux";
import FormSolicitation from "./forms/FormSolicitation";
import Popup from "../../components/customControls/Popup";
import {toast} from "react-toastify";
import {
    addSolicitation,
    deleteSolicitation,
    getAllSolicitations,
    updateSolicitation
} from "../../services/solicitation";
import FormEditSolicitation from "./forms/FormEditSolicitation";

const Solicitations = () => {
    const token = useSelector(state => state.token);
    const [solicitations, setSolicitations] = useState([]);
    const [defaultValues, setDefaultValues] = useState({});
    const [openPopup, setOpenPopup] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [updateTable, setUpdateTable] = useState(false);

    const fetchData = async (type, body) => {
        switch (type) {
            case "getAll":
                const solicitationsFromDb = await getAllSolicitations(token)
                    .then(response => {
                        return response;
                    })
                    .then(result => result.json())
                    .catch(() => toast.info("Oops! Cannot connect to the server", {}));
                setSolicitations(solicitationsFromDb);
                break;
            case "save":
                await addSolicitation(token, body)
                    .then(response => {
                        setUpdateTable(!updateTable);
                        setOpenPopup(false);
                        return response.ok ?
                            toast.success("Successfully added the solicitation", {position: "bottom-right"})
                            : toast.error("Error adding solicitation", {position: "bottom-right"})
                    })
                    .then()
                    .catch(() => toast.info("Oops! Cannot connect to the server", {position: "bottom-right"}));
                break;
            case "delete":
                await deleteSolicitation(token, body).then(response => {
                    if (response.ok){
                        setUpdateTable(!updateTable);
                    }
                    return response.ok ? toast.success("Item deleted successfully", {position: "bottom-right"})
                        : toast.error("Error deleting the item, try again", {position: "bottom-right"})
                }).then().catch(() => toast.info("Oops! Could not reach the server"));
                break;
            case "update":
                await updateSolicitation(token, body, defaultValues.id)
                    .then(response => {
                        setUpdateTable(!updateTable);
                        setOpenEdit(false);
                        return response.ok ?
                            toast.success("Successfully updated the solicitation", {position: "bottom-right"})
                            : toast.error("Error updating solicitation", {position: "bottom-right"})
                    })
                    .then()
                    .catch(() => toast.info("Oops! Cannot connect to the server", {}));

                break
            default:
                break;
        }

    }

    useEffect(() => {
        fetchData("getAll").then();
    }, [updateTable])

    const handleFormSubmit = (data) => {
        console.log(data);
        fetchData("save", data).then()
    }
    const handleEdit = (rowData) => {
        setDefaultValues(rowData);
    }

    const handleEditSubmit = (newData) => {
        fetchData("update", newData).then()
    }
    return (
        <>
            <CustomMaterialTable
                title={"Solicitations"}
                data={solicitations}
                columns={[
                    {title: "Serial No", field: "id"},
                    {title: "Purchase Order Id", field: "purchaseOrderId"},
                    {title: "message", field: "message"},
                    {
                        title: "Date Created",
                        field: "dateCreated",
                        render: (rowData) => new Date(rowData.dateCreated).toDateString()
                    },
                    {
                        title: "Deadline",
                        field: "deadline",
                        render: (rowData) => new Date(rowData.deadline).toDateString()
                    }
                ]}
                setOpenPopup={setOpenPopup}
                setOpenEdit={setOpenEdit}
                handleDelete={fetchData}
                handleEdit={handleEdit}

            />
            <Popup title="Add Solicitation" openPopup={openPopup} setOpenPopup={setOpenPopup}>
                <FormSolicitation solicitations={solicitations} handleFormSubmit={handleFormSubmit}/>
            </Popup>
            <Popup title={"Edit Solicitation"} openPopup={openEdit} setOpenPopup={setOpenEdit} >
                <FormEditSolicitation solicitations={solicitations} handleEditSubmit={handleEditSubmit} defaultValues={defaultValues} />
            </Popup>
        </>)
}

export default Solicitations;