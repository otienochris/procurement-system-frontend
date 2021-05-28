import React, {useEffect, useState} from "react";
import CustomMaterialTable from "../../components/customControls/CustomMaterialTable";
import {useSelector} from "react-redux";

const OrderManagement = () => {

    const token = useSelector(state => state.token);
    const [openPopup, setOpenPopup] = useState(false);
    const [updateTable, setUpdateTable] = useState(false);

    const fetchData = async (type, body) => {
        switch (type){
            case "getAllOrderManagements":
                break;
            case "addOrderManagement":
                setUpdateTable(!updateTable)
                break
            case "delete":
                break;
            default:
                break
        }
    }

    useEffect(()=> {

    }, [updateTable])

    return (<CustomMaterialTable
        title={"Order Management"}
        columns={[]}
        data={[]}
        handleDelete={fetchData}
        setOpenPopup={setOpenPopup}
    />)
}

export default OrderManagement;