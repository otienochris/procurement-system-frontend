import { makeStyles } from "@material-ui/core";
import MaterialTable from "material-table";
import React from "react";
import CustomMaterialTable from "../../components/customControls/CustomMaterialTable";
import CustomPaper from "../../components/customControls/CustomPaper";

export const useStyles = makeStyles((theme) => ({
  spacingStyle: {
    margin: "auto auto",
    maxWidth: "95%",
    marginTop: "12vh",
  },
}));

function Employees({ employees, setEmployees }) {
  const classes = useStyles();
  return (
    <div className={classes.spacingStyle}>
      <CustomMaterialTable
        title="Employees"
        columns={[
          { title: "Employment Id", field: "employmentId" },
          { title: "Name", field: "name" },
          { title: "Email", field: "email" },
          { title: "Position", field: "position" },
          { title: "Role", field: "roles.role", defaultGroupOrder:1 },
          {
            title: "STATUS",
            field: "isActive",
            lookup: { false: "Disabled", true: "Active" },
            editable: false,
            default: "false",
            defaultGroupOrder:0
          },
          // { title: "Date Created", field: "dateCreated" },
          // { title: "Date Modified", field: "dateModified" },
        ]}
        data={employees}
        setData={setEmployees}
      />
    </div>
  );
}

export default Employees;

// {
//   "dataCreated": "2021-05-03T13:20:06.988Z",
//   "dateModified": "2021-05-03T13:20:06.988Z",
//   "email": "string",
//   "employmentId": "string",
//   "isActive": true,
//   "name": "string",
//   "position": "string",
//   "roles": {
//     "id": 0,
//     "role": "ROLE_ADMIN"
//   }
// }
