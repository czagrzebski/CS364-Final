import React from 'react';
import { Table } from '@mui/material';

export function Tasks() {
  return (
    <div>
      <Table
        //rows={rows}
        //columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}

