import React, { useState, useEffect , useRef } from "react";
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import './styles/Register_user_master_nap.css'; // Import the CSS file
import axios from "axios";
import Button from '@mui/material/Button';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CancelIcon from '@mui/icons-material/Cancel';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Swal from 'sweetalert2';
import Autocomplete from "@mui/material/Autocomplete";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';

import Navbar from "../components/navbar/Navbar";
import { update } from "lodash";

export default function Register_system_detail({ onSearch }) {
  const [distinctDataSystem, setDistinctDataSystem] = useState([]);

  const [selectedRecord_SystemNo, setSelectedRecord_SystemNo] = useState('');
  const [selectedRecord_SystemName, setSelectedRecord_SystemName] = useState('');
  const [selectedRecord_Server, setSelectedRecord_Server] = useState('');
  const [selectedRecord_Port, setSelectedRecord_Port] = useState('');

  const [selectedRecord_Server_Old, setSelectedRecord_Server_Old] = useState('');
  const [selectedRecord_Port_Old, setSelectedRecord_Port_Old] = useState('');


  const [isNavbarOpen, setIsNavbarOpen] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen_Edit, setIsModalOpen_Edit] = useState(false);

  const [columnVisibilityModel, setColumnVisibilityModel] = React.useState({});

  const [filterModel, setFilterModel] = React.useState({
    items: [],
    quickFilterExcludeHiddenColumns: true,
    quickFilterValues: [''],
  });

  const fetchDataSystem = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`http://10.17.66.242:3001/api/smart_register/filter-data-system`);
      const data = await response.data;
      const rowsWithId = data.map((row, index) => ({
        ...row,
        id: index, // You can use a better unique identifier here if available
      }));
      setDistinctDataSystem(rowsWithId);
      } catch (error) {
      console.error('Error fetching data:', error);
      setError('An error occurred while fetching data user master NAP');
      } finally {
        setIsLoading(false); // Set isLoading back to false when fetch is complete
      }
  };
  
  const handleNavbarToggle = (openStatus) => {
    setIsNavbarOpen(openStatus);
  };

  const handleEditClick = (row) => {
    setSelectedRecord_SystemNo(row.system_no)
    setSelectedRecord_SystemName(row.system_name)
    setSelectedRecord_Server(row.use_server)
    setSelectedRecord_Port(row.port_no)

    setSelectedRecord_Server_Old(row.use_server)
    setSelectedRecord_Port_Old(row.port_no)
  };

  const handleCloseModal_Edit = () => {
    setIsModalOpen_Edit(false);

    setSelectedRecord_SystemNo('')
    setSelectedRecord_SystemName('')
    setSelectedRecord_Server('')
    setSelectedRecord_Port('')

    setSelectedRecord_Server_Old('')
    setSelectedRecord_Port_Old('')
  };

  const handleServerChange = (event) => {
    setSelectedRecord_Server(event.target.value);
  }

  const handlePortChange = (event) => {
    setSelectedRecord_Port(event.target.value);
  }

  const handleSave_Edit = (row) => {
    if ( selectedRecord_Server == '' || selectedRecord_Port == '') 
    {
      // openDialog_Chk();
    } 
    // else if (selectedRecord_Server == selectedRecord_Server_Old) {
    // } else if (selectedRecord_Port == selectedRecord_Port_Old) {
    // }
     else {
      const swalWithZIndex = Swal.mixin({
      customClass: {
      popup: 'my-swal-popup', // Define a custom class for the SweetAlert popup
      },
      });
      handleCloseModal_Edit();

      swalWithZIndex.fire({
      title: "Confirm Save Edit",
      text: "Are you sure you want to save edit the data?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Save",
      cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {

          async function fetchData() {
            try {
                // console.log('DateCim 2' , DateCim);
                const response = await axios.get(`http://10.17.66.242:3001/api/smart_register/filter-count-system-detail?system_no=${selectedRecord_SystemNo}`);
                const data = response.data;
                const CountSystemNo = data[0].count_system;
                // console.log('CountSystemNo:' , CountSystemNo);
        
                if (CountSystemNo > 0) {
                    await axios.get(`http://10.17.66.242:3001/api/smart_register/update-server-port-system-detail?server_edit=${selectedRecord_Server}&port_edit=${selectedRecord_Port}&system_no=${selectedRecord_SystemNo}&server=${selectedRecord_Server_Old}&port=${selectedRecord_Port_Old}`);
                } else {
                    await axios.get(`http://10.17.66.242:3001/api/smart_register/insert-system-detail?system_no=${selectedRecord_SystemNo}&server=${selectedRecord_Server}&port=${selectedRecord_Port}`);
                }
        
                Swal.fire({
                    icon: "success",
                    title: "Save Success",
                    text: "Data master saved successfully",
                    confirmButtonText: "OK",
                });
                fetchDataSystem();
            } catch (error) {
                console.error("Error saving data:", error);
                Swal.fire({
                    icon: "error",
                    title: "Save Error",
                    text: "An error occurred while saving data",
                    confirmButtonText: "OK",
                });
            }
          }
          fetchData();
        } 
      });
    } 
  }

  useEffect(() => {
    fetchDataSystem();
  }, []);

  const columns_system = [
    { field: 'system_no', headerName: 'System no.', width: 100 , headerAlign: 'center' , headerClassName: 'bold-header' , align: 'center'},
    { field: 'system_name', headerName: 'System name', width: 350 , headerAlign: 'center' , headerClassName: 'bold-header' , align: 'left'},
    { field: 'use_server', headerName: 'Server', width: 150 , headerAlign: 'center' , headerClassName: 'bold-header' , align: 'left'},
    { field: 'port_no', headerName: 'Port no.', width: 150 , headerAlign: 'center' , headerClassName: 'bold-header' , align: 'center'},
    { field: 'edit', headerName: 'Edit', width: 80 , headerAlign: 'center' , headerClassName: 'bold-header', align: 'center',
      renderCell: (params) => {
        // console.log('Row', params.row); // Add this line to log the row object
        return (
          <div>
            <button
              className="bg-orange-500 px-2 py-1.5 rounded-xl text-white hover:bg-orange-700 hover:scale-110 duration-300 focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-opacity-50"
              onClick={() => { handleEditClick(params.row); setIsModalOpen_Edit(true);}}
            >
              <EditIcon />
            </button>
          </div>
        );
      },
  },
  ]

  return (
    <>
        <Navbar onToggle={handleNavbarToggle}/>
        <Box marginLeft={isNavbarOpen ? "220px" : 4} marginTop={10}>
            {/* <Button 
                variant="contained" 
                className="btn_active hover:scale-110"
                // size="small"  btn_active hover:scale-110
                style={{  width: '285px', 
                          height: '50px' , 
                          marginLeft: 55 , 
                          backgroundColor: '#2B3499' , 
                          color:'white' ,
                          fontWeight: 'bold' , 
                          boxShadow: '5px 5px 5px grey' ,
                          borderRadius: 20 ,
                          border: '1px solid black'
                      }}
                // onClick={handleOpenModal}
                endIcon={<AddToPhotosIcon />}
                >ADD SYSTEM DETAIL
            </Button> */}
            <Box sx={{width: 860 , height: 580 , marginTop: '10px' , marginLeft: '45px'}}>
                  <DataGrid
                    columns={columns_system}
                    rows={distinctDataSystem}
                    slots={{ toolbar: GridToolbar }}
                    filterModel={filterModel}
                    onFilterModelChange={(newModel) => setFilterModel(newModel)}
                    slotProps={{ toolbar: { showQuickFilter: true } }}
                    columnVisibilityModel={columnVisibilityModel}
                    onColumnVisibilityModelChange={(newModel) =>
                      setColumnVisibilityModel(newModel)
                    }
                  />
            </Box>

            <Modal
                open={isModalOpen_Edit}
                onClose={handleCloseModal_Edit}
                aria-labelledby="key-weight-modal-title"
                aria-describedby="key-weight-modal-description"
            >
                <Box sx={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 630 , height: 310 , bgcolor: '#B4D4FF', boxShadow: 24, p: 4 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' , height: 20 , marginBottom: 20}}>
                        <div style={{width: '100%' ,fontWeight: 'bold' , fontSize: 20 , textAlign: 'center' }}>
                            <label htmlFor="" >EDIT SYSTEM DETAIL</label>
                        </div>
                        <div>
                            <IconButton onClick={handleCloseModal_Edit} style={{position: 'absolute', top: '10px', right: '10px',}}>
                                <CloseIcon style={{fontSize: '25px', color: 'white', backgroundColor: '#E55604'}} /> 
                            </IconButton>
                        </div>
                    </div>
                    <div style={{ height: 170 , backgroundColor: '#E4FBFF' }}>
                        <div >
                            <div style={{paddingTop: 20}}>
                              <TextField
                                disabled
                                id="outlined-disabled"
                                label="- System No. -"
                                value={selectedRecord_SystemNo}
                                style={{backgroundColor: '#EEF5FF' , marginLeft: 10  , width: 120 }}
                                inputProps={{
                                    style: { textAlign: 'center' },
                                }}
                              />

                              <TextField
                                disabled
                                id="outlined-disabled"
                                label="- System Name -"
                                value={selectedRecord_SystemName}
                                style={{backgroundColor: '#EEF5FF' , marginLeft: 25 , width: 400 }}
                              />
                            </div>
                        </div>

                        <div >
                            <div style={{paddingTop: 20}}>
                              <TextField
                                // disabled
                                id="outlined-disabled"
                                label="- Server -"
                                value={selectedRecord_Server}
                                onChange={handleServerChange}
                                style={{backgroundColor: 'white' , marginLeft: 10  , width: 260 }}
                                inputProps={{
                                    style: { textAlign: 'left' },
                                }}
                              />

                              <TextField
                                id="outlined-disabled"
                                label="- Port -"
                                value={selectedRecord_Port}
                                onChange={handlePortChange}
                                style={{backgroundColor: 'white' , marginLeft: 25 , width: 260 }}
                              />
                            </div>
                        </div>
                    </div>
                    
                    <div style={{display: 'flex', justifyContent: 'flex-end' , marginTop: 10 , height: 45 }}>
                        <Button variant="contained" startIcon={<CancelIcon />} onClick={handleCloseModal_Edit} className="btn_hover" style={{backgroundColor: 'lightgray' , color: 'black' , width: 120 , height: 40 , marginRight: 10 , boxShadow: '3px 3px 5px grey'}}>
                            Cancel
                        </Button>
                        <Button variant="contained" endIcon={<AddToPhotosIcon />} onClick={handleSave_Edit} className="btn_hover" style={{backgroundColor: 'lightgreen' , color: 'black' , width: 120 , height: 40 , boxShadow: '3px 3px 5px grey'}}>
                            SAVE
                        </Button>
                    </div>
                </Box>
            </Modal>
        </Box>
    </>
  );
}