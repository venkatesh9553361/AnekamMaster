import React from 'react';
import ReadOnlyRow from "./ReadOnlyRow";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import TextField from '@mui/material/TextField';
import { DataGrid } from '@mui/x-data-grid';
import { Fragment, useState } from "react";
import data from '../mock-data.json'
const Home = () => {
  const [contacts, setContacts] = useState(data);
  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    
  ];
   const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 90,
    }];
return (
    <div className="app-container">




    <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                News
              </Typography>
              <Button color="inherit">Login</Button>
            </Toolbar>
          </AppBar>
        </Box>
        <TextField label="fullWidth" id="fullWidth" style={{width:"35%"}} />
        
    <div className="">
    
        <div style={{ height: 400, width: '35%', height: 400, width: '35%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            // rowsPerPageOptions={[5]}
            checkboxSelection
          />
        </div>
    
        /*<table style={{width: '60%' ,position:"absolute" ,top:"20%" ,right:"2%" }}>
      
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Vendor </th>
                  <th>GST No.</th>
                  <th>Mobile Number</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((contact) => (
                  <Fragment>
                    <ReadOnlyRow contact={contact}/>
                  </Fragment>
                ))}
              </tbody>
          </table>*/
    
    </div>
    
    
    
          {/* <table>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Vendor Company</th>
                  <th>GST No.</th>
                  <th>Mobile Number</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((contact) => (
                  <Fragment>
                    <ReadOnlyRow contact={contact}/>
                  </Fragment>
                ))}
              </tbody>
          </table> */}
        </div>
)

}

export default Home