import React, {useEffect, useState} from "react";
import CustomMaterialTable from "../../components/customControls/CustomMaterialTable";
import {useSelector} from "react-redux";

const Contracts = () => {
    const token = useSelector(state => state.token);
    const [updateTable, setUpdate] = useState(false);
    const [openPopup, setOpenPopup] = useState(false);

    const fetchData = async (type, body) => {
        switch (type) {
            case "getAllContracts":
                break;
            default:
                break;
        }
    }

    useEffect(() => {

    }, [updateTable])
    return (
        <CustomMaterialTable
            title={"Contracts"}
            data={[]}
            colums={[]}
            setOpenPopup={setOpenPopup}
            handleDelete={fetchData}
        />
    )
}

export default Contracts;