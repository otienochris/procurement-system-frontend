import {Grid, IconButton, makeStyles, Toolbar,} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import MenuOpenIcon from "@material-ui/icons/MenuOpen";
import FolderIcon from "@material-ui/icons/Folder";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import PeopleIcon from "@material-ui/icons/People";
import WebIcon from '@material-ui/icons/Web';
import AssessmentIcon from '@material-ui/icons/Assessment';
import {
    employeesDomainUrl,
    requestHeaderWithoutBodyAfterAuthentication,
    suppliersDomainUrl,
} from "../../components/requestHeaders";
import {useSelector} from "react-redux";
import Purchases from "./Purchases";
import SolicitationManagement from "./SolicitationManagement";
import Applications from "./Applications";
import Users from "./Users";

const useStylesIndex = makeStyles((theme) => ({
    navigationArea: {
        minHeight: "100vh",
        // position: "absolute",
        // left: "0px",
        width: "12vw",
        backgroundColor: "white",
    },
    dashboardArea: {
        minHeight: "100vh",
        minWidth: "100%",
        color: "white",
        marginTop: "5vh",
    },
    toolBar: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "9vh",
    },
    menuIconStyle: {
        marginBottom: theme.spacing(4),
    },
    otherIconStyle: {
        marginBottom: theme.spacing(1),
    },
    backgroundStyle: {
        // backgroundColor: "green",
    },
}));

function Index() {
    const classes = useStylesIndex();
    const token = useSelector((state) => state.token);
    const role = useSelector(state => state.userDetails.role)
    const [employees, setEmployees] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [departmentHeads, setDepartmentHeads] = useState([]);
    const [selectedTab, setSelectedTab] = useState(1);

    const handleClick = (value) => {
        setSelectedTab(value);
    };

    const fetchEmployees = async (url) => {
        try {
            const response = await fetch(
                url,
                requestHeaderWithoutBodyAfterAuthentication(token)
            );
            const result = await response.json();
            setEmployees(result);
        } catch (error) {
            console.log(error);
        }
    };
    const fetchSuppliers = async (url) => {
        try {
            const response = await fetch(
                url,
                requestHeaderWithoutBodyAfterAuthentication(token)
            );
            const result = await response.json();
            setSuppliers(result);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (role === "ROLE_ADMIN") {
            fetchEmployees(employeesDomainUrl).then();
            fetchSuppliers(suppliersDomainUrl).then();
        }
    }, []);

    return (
        <Grid container>
            <Grid item xs={2} sm={1} className={`${classes.navigationArea}`}>
                <Toolbar className={classes.toolBar}>
                    <IconButton className={classes.menuIconStyle} title="menu">
                        <MenuOpenIcon fontSize="large"/>
                    </IconButton>

                    {(role === "ROLE_DEPARTMENT_HEAD" || role === "ROLE_ADMIN") &&
                    <IconButton
                        className={classes.otherIconStyle}
                        onClick={() => handleClick(0)}
                        title="Purchases"
                    >
                        <ShoppingBasketIcon/>
                    </IconButton>
                    }
                    <IconButton
                        className={classes.otherIconStyle}
                        onClick={() => handleClick(1)}
                        title="Order Management"
                    >
                        <WebIcon/>
                    </IconButton>
                    {(role === "ROLE_ADMIN" || role === "ROLE_SUPPLIER") && <IconButton
                        className={classes.otherIconStyle}
                        onClick={() => handleClick(2)}
                        title="Applications"
                    >
                        <FolderIcon/>
                    </IconButton>}

                    {role === "ROLE_ADMIN" && <IconButton
                        className={classes.otherIconStyle}
                        onClick={() => handleClick(3)}
                        title="Reports"
                    >
                        <AssessmentIcon/>
                    </IconButton>}
                    {role === "ROLE_ADMIN" && <IconButton
                        className={classes.otherIconStyle}
                        onClick={() => handleClick(4)}
                        title="Users"
                    >
                        <PeopleIcon/>
                    </IconButton>}

                </Toolbar>
            </Grid>
            <Grid item xs={10} sm={11} className={classes.backgroundStyle}>
                {/*admin view */}
                {
                    role === "ROLE_ADMIN" &&
                    <>
                        {selectedTab === 0 && <Purchases/>}
                        {selectedTab === 1 && <SolicitationManagement />}
                        {selectedTab === 2 && <Applications/>}
                        {selectedTab === 4 &&
                        <Users employees={employees} setEmployees={setEmployees} suppliers={suppliers}
                            setSuppliers={setSuppliers}
                            departmentHeads={departmentHeads}
                            setDepartmentHeads={setDepartmentHeads}
                            customClass={classes} />}
                    </>
                }

                {/*department head view*/}
                {
                    role === "ROLE_DEPARTMENT_HEAD" &&
                    <>
                        {selectedTab === 0 && <Purchases/>}
                        {selectedTab === 1 && <SolicitationManagement />}
                    </>
                }

                {
                    role === "ROLE_SUPPLIER" &&
                    <>
                        {selectedTab === 1 && <SolicitationManagement />}
                        {selectedTab === 2 && <Applications/>}

                    </>
                }

                {/*{
                    ((selectedTab === 0 && role === "ROLE_ADMIN") || (selectedTab === 0 && role === "ROLE_DEPARTMENT_HEAD"))
                    && <Purchases/>
                }
                {
                    (
                        ((selectedTab === 1 && role === "ROLE_ADMIN") || (selectedTab === 1 && role === "ROLE_SUPPLIER")) ||
                        (selectedTab === 1 && role === "ROLE_DEPARTMENT_HEAD")
                    )
                    && <SolicitationManagement/>
                }
                {
                    ((selectedTab === 2 && role === "ROLE_ADMIN") || (selectedTab === 2 && role === "ROLE_SUPPLIER"))
                    && <Applications/>
                }
                {
                    (selectedTab === 4 && role === "ROLE_ADMIN")
                    && <Users
                        employees={employees}
                        setEmployees={setEmployees}
                        suppliers={suppliers}
                        setSuppliers={setSuppliers}
                        departmentHeads={departmentHeads}
                        setDepartmentHeads={setDepartmentHeads}
                        customClass={classes}
                    />}*/}
            </Grid>
        </Grid>
    );
}

export default Index;
