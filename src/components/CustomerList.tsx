import { DataGrid, type GridColDef, type GridRenderCellParams } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import type { Customer } from '../types';
import { getCustomers, deleteCustomer } from '../api/customerapi';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCustomerComponent from './AddCustomer';
import EditCustomer from './EditCustomer';

function CustomerList() {
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = () => {
    getCustomers()
      .then(data => setCustomers(data._embedded.customers))
      .catch(err => console.error(err))
  }

  const handleDelete = (url: string) => {
    if(window.confirm("Are you sure you want to delete customer?")) {
    deleteCustomer(url)
      .then(() => fetchCustomers())
      .catch(err => console.error(err))
    }
  }
  
  const columns: GridColDef[] = [
    { field: 'firstname', headerName: 'Firstname', width: 150 },
    { field: 'lastname', headerName: 'Lastname', width: 150 },
    { field: 'streetadress', headerName: 'Streetadress', width: 150 },
    { field: 'postcode', headerName: 'Postcode', width: 150 },
    { field: 'city', headerName: 'City', width: 150 },
    { field: 'email', headerName: 'Email', width: 150 },
    { field: 'phone', headerName: 'Phone', width: 120 },
     {
      field: 'actions',
  headerName: 'Actions',
  width: 150, 
  sortable: false,
  filterable: false,
  renderCell: (params: GridRenderCellParams) => (
    <>
      <EditCustomer customerRow={params.row} fetchCustomers={fetchCustomers} />
      <IconButton
        color="error"
        size="small"
        onClick={() => handleDelete(params.row._links.self.href)}
      >
        <DeleteIcon />
      </IconButton>
    </>
  ),
}
  ];

  return (
    <>
      <div style={{ width: '80&', height: 500, margin: '50px auto 0 auto' }}>
          <div style={{ marginBottom: "10px" }}>
        <AddCustomerComponent fetchCustomers={getCustomers} />
      </div>
        <DataGrid
          rows={customers}
          columns={columns}
          getRowId={row => row._links.self.href}
          autoPageSize
          rowSelection={false}
        />
      </div>
    </>
  );
}

export default CustomerList;
