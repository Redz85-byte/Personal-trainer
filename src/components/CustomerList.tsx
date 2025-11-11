import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import type { Customer } from '../types';
import { getCustomers } from '../api/customerapi';

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

  const columns: GridColDef[] = [
    { field: 'firstname', headerName: 'Firstname', width: 150 },
    { field: 'lastname', headerName: 'Lastname', width: 150 },
    { field: 'streetadress', headerName: 'Streetadress', width: 150 },
    { field: 'postcode', headerName: 'Postcode', width: 150 },
    { field: 'city', headerName: 'City', width: 150 },
    { field: 'email', headerName: 'Email', width: 150 },
    { field: 'phone', headerName: 'Phone', width: 150 },
  ]

  return (
    <>
      <div style={{ width: '80&', height: 500, margin: '50px auto 0 auto' }}>
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
