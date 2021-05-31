import React, {useEffect, useState} from "react";
import CustomMaterialTable from "../../components/customControls/CustomMaterialTable";
import {useSelector} from "react-redux";
import FormSolicitation from "./forms/FormSolicitation";
import Popup from "../../components/customControls/Popup";
import {toast} from "react-toastify";
import {addSolicitation, deleteSolicitation, getAllSolicitations} from "../../services/solicitation";

const Solicitations = () => {
    const token = useSelector(state => state.token);
    const [solicitations, setSolicitations] = useState([])
    const [openPopup, setOpenPopup] = useState(false);
    const [updateTable, setUpdateTable] = useState(false);

    const fetchData = async (type, body) => {
        switch (type) {
            case "getAllSolicitations":
                const solicitationsFromDb = await getAllSolicitations(token)
                    .then(response => {
                        return response;
                    })
                    .then(result => result.json())
                    .catch(() => toast.info("Oops! Cannot connect to the server", {}));
                setSolicitations(solicitationsFromDb);
                break;
            case "addSolicitation":
                await addSolicitation(token, body)
                    .then(response => {
                        setUpdateTable(!updateTable);
                        setOpenPopup(false);
                        return response.ok ?
                            toast.success("Successfully added the solicitation", {position: "bottom-right"})
                            : toast.error("Error adding solicitation", {position: "bottom-right"})
                    })
                    .then()
                    .catch(() => toast.info("Oops! Cannot connect to the server", {}));
                break;
            case "delete":
                await deleteSolicitation(token, body).then(response => {
                    if (response.ok){
                        setUpdateTable(!updateTable)
                    }
                    return response.ok ? toast.success("Item deleted successfully", {position: "bottom-right"})
                        : toast.error("Error deleting the item, try again", {position: "bottom-right"})
                }).then().catch(() => toast.info("Oops! Could not reach the server"));
                break;
            default:
                break;
        }

    }

    useEffect(() => {
        fetchData("getAllSolicitations").then();
    }, [updateTable])

    const handleFormSubmit = (data) => {
        console.log(data);
        fetchData("addSolicitation", data).then()
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
                handleDelete={fetchData}
                setOpenPopup={setOpenPopup}
                handleDelete={fetchData}

            />
            <Popup title="Add Solicitation" openPopup={openPopup} setOpenPopup={setOpenPopup}>
                <FormSolicitation handleFormSubmit={handleFormSubmit}/>
            </Popup>
        </>)
}

export default Solicitations;