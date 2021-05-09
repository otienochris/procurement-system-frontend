import React from 'react'
import CustomMaterialTable from '../../components/customControls/CustomMaterialTable'
import {useStyles} from "./Employees"

const DepartmentHeads = ({departmentHeads}) => {
    const classes = useStyles()
    return (
      <div className={classes.spacingStyle}>
        <CustomMaterialTable
          title="Department Heads"
          columns={[{}]}
          data={departmentHeads}
        />
      </div>
    );
}

export default DepartmentHeads
