import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core'
import React from 'react'

function Suppliers() {
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Employee Id</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>email</TableCell>
            <TableCell>position</TableCell>
            <TableCell>Role</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            
        </TableBody>
      </Table>
    );
}

export default Suppliers
