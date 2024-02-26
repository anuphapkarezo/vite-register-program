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

import Navbar from "../components/navbar/Navbar";
import { update } from "lodash";

export default function Register_user_system_role({ onSearch }) {
  const [distinctUserSystemRole, setDistinctUserSystemRole] = useState([]);
  const [distinctCountUser, setDistinctCountUser] = useState([]);
  // const [distinctCountUserMapSystem, setDistinctCountUserMapSystem] = useState([]);
  const [distinctDataUserNap, setDistinctDataUserNap] = useState([]);
  const [distinctDataSystem, setDistinctDataSystem] = useState([]);
  const [distinctDataRole, setDistinctDataRole] = useState([]);
  const [distinctSystemName, setDistinctSystemName] = useState([]);
  const [distinctRoleType, setDistinctRoleType] = useState([]);

  
  const [isModalOpen_Edit, setIsModalOpen_Edit] = useState(false);

  const [selectedRecord_IdCode, setSelectedRecord_IdCode] = useState(null);
  const [selectedRecord_SystemNo, setSelectedRecord_SystemNo] = useState(null);
  const [selectedRecord_SystemName, setSelectedRecord_SystemName] = useState(null);
  const [selectedRecord_RoleNo, setSelectedRecord_RoleNo] = useState(null);
  const [selectedRecord_RoleName, setSelectedRecord_RoleName] = useState(null);

  const [selectedRecord_IdCode_old, setSelectedRecord_IdCode_old] = useState(null);
  const [selectedRecord_SystemNo_old, setSelectedRecord_SystemNo_old] = useState(null);
  const [selectedRecord_SystemName_old, setSelectedRecord_SystemName_old] = useState(null);
  const [selectedRecord_RoleNo_old, setSelectedRecord_RoleNo_old] = useState(null);
  const [selectedRecord_RoleName_old, setSelectedRecord_RoleName_old] = useState(null);

  const [CountSystem, setCountSystem] = useState(0);
  const [CountMapSystem, setCountMapSystem] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDialogOpen_Map, setIsDialogOpen_Map] = useState(false);
  const [isDialogOpen_Chk, setIsDialogOpen_Chk] = useState(false);

  const [Username, setUsername] = useState('');
  const [SystemNo, setSystemNo] = useState('0');
  const [SystemName, setSystemName] = useState('');
  const [RoleNo, setRoleNo] = useState('0');
  const [RoleName, setRoleName] = useState('');
  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1; // Month starts from 0
    const year = date.getFullYear();
  
    // Ensure leading zero for day/month if needed
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;
  
    return `${formattedDay}/${formattedMonth}/${year}`;
  };
  const [Update, setUpdate] = useState(formatDate(new Date()));

  const [isNavbarOpen, setIsNavbarOpen] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen_System, setIsModalOpen_System] = useState(false);
  const [isModalOpen_Role, setIsModalOpen_Role] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [columnVisibilityModel, setColumnVisibilityModel] = React.useState({});

  const [filterModel, setFilterModel] = React.useState({
    items: [],
    quickFilterExcludeHiddenColumns: true,
    quickFilterValues: [''],
  });

  const fetchUserSystemRole = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`http://10.17.66.242:3001/api/smart_register/filter-user-system-role`);
      const data = await response.data;
      // console.log(data);
      // Add a unique id property to each row
      const rowsWithId = data.map((row, index) => ({
          ...row,
          id: index, // You can use a better unique identifier here if available
      }));
      setDistinctUserSystemRole(rowsWithId);
      } catch (error) {
      console.error('Error fetching data:', error);
      setError('An error occurred while fetching data user master NAP');
      } finally {
        setIsLoading(false); // Set isLoading back to false when fetch is complete
      }
  };

  const fetchCountUserSystem = async () => {
    const selectedUsername = Username ? Username.user_login : '';
    try {
      setIsLoading(true);
      const response = await axios.get(`http://10.17.66.242:3001/api/smart_register/filter-count-user-system-role?username_nap=${selectedUsername}&system_no=${SystemNo}&system_name=${SystemName}`);
      // const response = await axios.get(`http://10.17.66.242:3001/api/smart_register/filter-count-user-system-role?username_nap=Anupab&system_no=1&system_name=Factory%20supply%20consumption%20management`);

      const data = await response.data;
      console.log("data:", data);
      
      setDistinctCountUser(data);
      if (Array.isArray(data) && data.length > 0) {
        const firstObject = data[0]; // Get the first object from the array
        const countUser = firstObject.count_role;
        setCountSystem(countUser)
        console.log("Count User:", countUser);
      } else {
        console.log("Data format is unexpected or empty");
      }
    
      } catch (error) {
      console.error('Error fetching data:', error);
      setError('An error occurred while fetching data count user master');
      } finally {
        setIsLoading(false); // Set isLoading back to false when fetch is complete
      }
  };

  const fetchDataUserNap = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`http://10.17.66.242:3001/api/smart_register/filter-data-user-nap`);
      const data = await response.data;
      console.log(data);
      // const transformedData = data.map(item => item.user_login);

      setDistinctDataUserNap(data);
      } catch (error) {
      console.error('Error fetching data:', error);
      setError('An error occurred while fetching data user master NAP');
      } finally {
        setIsLoading(false); // Set isLoading back to false when fetch is complete
      }
  };

  const fetchRoleType = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`http://10.17.66.242:3001/api/smart_register/filter-role-type?role_no=${RoleNo}`);
      const data = await response.data;
      // const transformedData = data.map(item => item.user_login);

      setDistinctRoleType(data);
      if (data && data.length > 0) {
        setRoleName(data[0].role_type); // Assuming system_name is the key in your data object
      }

      } catch (error) {
      console.error('Error fetching data:', error);
      setError('An error occurred while fetching data user master NAP');
      } finally {
        setIsLoading(false); // Set isLoading back to false when fetch is complete
      }
  };

  const fetchRoleType_Edit = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`http://10.17.66.242:3001/api/smart_register/filter-role-type?role_no=${selectedRecord_RoleNo}`);
      const data = await response.data;

      if (data && data.length > 0) {
        setSelectedRecord_RoleName(data[0].role_type); // Assuming system_name is the key in your data object
      }

      } catch (error) {
      console.error('Error fetching data:', error);
      setError('An error occurred while fetching data user master NAP');
      } finally {
        setIsLoading(false); // Set isLoading back to false when fetch is complete
      }
  };

  useEffect(() => {
    if (RoleNo !== null) {
      fetchRoleType();
    }

    if (selectedRecord_RoleNo !== null) {
      fetchRoleType_Edit();
    }
  }, [RoleNo , selectedRecord_RoleNo]);

  const fetchSystemName = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`http://10.17.66.242:3001/api/smart_register/filter-system-name?system_no=${SystemNo}`);
      const data = await response.data;
      // const transformedData = data.map(item => item.user_login);

      setDistinctSystemName(data);
      if (data && data.length > 0) {
        setSystemName(data[0].system_name); // Assuming system_name is the key in your data object
      }

      } catch (error) {
      console.error('Error fetching data:', error);
      setError('An error occurred while fetching data user master NAP');
      } finally {
        setIsLoading(false); // Set isLoading back to false when fetch is complete
      }
  };

  const fetchSystemName_Edit = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`http://10.17.66.242:3001/api/smart_register/filter-system-name?system_no=${selectedRecord_SystemNo}`);
      const data = await response.data;
      // const transformedData = data.map(item => item.user_login);

      if (data && data.length > 0) {
        setSelectedRecord_SystemName(data[0].system_name); // Assuming system_name is the key in your data object
      }

      } catch (error) {
      console.error('Error fetching data:', error);
      setError('An error occurred while fetching data user master NAP');
      } finally {
        setIsLoading(false); // Set isLoading back to false when fetch is complete
      }
  };

  useEffect(() => {
    if (SystemNo !== null) {
      fetchSystemName();
    }

    if (selectedRecord_SystemNo !== null) {
      fetchSystemName_Edit();
    }
  }, [SystemNo , selectedRecord_SystemNo]);

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

  const fetchDataRole = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`http://10.17.66.242:3001/api/smart_register/filter-data-role`);
      const data = await response.data;
      const rowsWithId = data.map((row, index) => ({
        ...row,
        id: index, // You can use a better unique identifier here if available
      }));
      setDistinctDataRole(rowsWithId);
      } catch (error) {
      console.error('Error fetching data:', error);
      setError('An error occurred while fetching data user master NAP');
      } finally {
        setIsLoading(false); // Set isLoading back to false when fetch is complete
      }
  };

  useEffect(() => {
    fetchUserSystemRole();
    fetchDataSystem();
    fetchDataRole();
    // fetchCountUserSystem();
  }, []);

  useEffect(() => {
    if (Username !== '' && SystemNo !== '' && SystemName) {
      fetchCountUserSystem();
    }
  }, [Username , SystemNo , SystemName]);

  const handleNavbarToggle = (openStatus) => {
    setIsNavbarOpen(openStatus);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setUsername('');

    setSystemNo(0);
    setSystemName('');

    setRoleNo(0);
    setRoleName('');
  };

  const handleCloseModal_Edit = () => {
    setIsModalOpen_Edit(false);
    setUsername('');

    setSystemNo(0);
    setSystemName('');

    setRoleNo(0);
    setRoleName('');
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
    fetchDataUserNap();
  };

  const handleCloseModal_System = () => {
    setIsModalOpen_System(false);
  };

  const handleOpenModal_System = () => {
    setIsModalOpen_System(true);
  };

  const handleCloseModal_Role = () => {
    setIsModalOpen_Role(false);
  };

  const handleOpenModal_Role = () => {
    setIsModalOpen_Role(true);
  };

  const handleUSystemNoChange = (event) => {
    setSystemNo(event.target.value);
    setSelectedRecord_SystemNo(event.target.value);
    setSystemName('');
    setSelectedRecord_SystemName('');
  }

  const handleUSystemNameChange = (event) => {
    setSystemName(event.target.value);
    setSelectedRecord_SystemName(event.target.value);
  }

  const handleURoleNoChange = (event) => {
    setRoleNo(event.target.value);
    setSelectedRecord_RoleNo(event.target.value);
    setRoleName('');
    setSelectedRecord_RoleName('');
  }

  const handleURoleNameChange = (event) => {
    setRoleName(event.target.value);
    setSelectedRecord_RoleName(event.target.value);
  }

  const handleUsernameChange = (event , newValue) => {
    setUsername(newValue);
  }
  
  const handleSaveData = (newValue) => {
    const selectedUsername = Username ? Username.user_login : '';

    if (CountSystem > 0){
      openDialog();
    } else if (selectedUsername === '' || 
                SystemNo === '0' || 
                SystemName === ''|| 
                RoleNo === '0' || 
                RoleName === '' || 
                Update === '') {
      openDialog_Chk();
    } else {
      const swalWithZIndex = Swal.mixin({
        customClass: {
          popup: 'my-swal-popup', // Define a custom class for the SweetAlert popup
        },
      });
      handleCloseModal();
      
      swalWithZIndex.fire({
        title: "Confirm Save",
        text: "Are you sure you want to save the data?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Save",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          // User confirmed, proceed with data saving
          // Delete existing data
          axios
            .get(
              `http://10.17.66.242:3001/api/smart_register/insert-user-system-role?user_name_naps=${selectedUsername}&system_no=${SystemNo}&system_name=${SystemName}&role_no=${RoleNo}&role_type=${RoleName}&update_date=${Update}`
            )
            .then(() => {
              // After all requests are completed, fetch the updated data
              return fetchUserSystemRole();
            })
            .then(() => {
              // Success notification
              Swal.fire({
                icon: "success",
                title: "Save Success",
                text: "Map user system role saved successfully",
                confirmButtonText: "OK",
              });
  
              // Close the modal
              // handleCloseModal();
            })
            .catch((error) => {
              console.error("Error saving data:", error);
              // Handle the error or display an error message using Swal
              Swal.fire({
                icon: "error",
                title: "Save Error",
                text: "An error occurred while saving data",
                confirmButtonText: "OK",
              });
            });
        }
      });
  
      // Set a higher z-index for the SweetAlert dialog
      document.querySelector('.my-swal-popup').style.zIndex = '9999';
    }
  }

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const openDialog = () => {
    setIsDialogOpen(true);
  }

  // const closeDialog_Map = () => {
  //   setIsDialogOpen_Map(false);
  // };

  // const openDialog_Map = () => {
  //   setIsDialogOpen_Map(true);
  // }

  const openDialog_Chk = () => {
    setIsDialogOpen_Chk(true);
  }

  const closeDialog_Chk = () => {
    setIsDialogOpen_Chk(false);
  };

  
  const handleEditClick = (row) => {
    setSelectedRecord_IdCode(row.user_name_naps)
    setSelectedRecord_SystemNo(row.system_no)
    setSelectedRecord_SystemName(row.system_name)
    setSelectedRecord_RoleNo(row.role_no)
    setSelectedRecord_RoleName(row.role_type)

    setSelectedRecord_IdCode_old(row.user_name_naps)
    setSelectedRecord_SystemNo_old(row.system_no)
    setSelectedRecord_SystemName_old(row.system_name)
    setSelectedRecord_RoleNo_old(row.role_no)
    setSelectedRecord_RoleName_old(row.role_type)
    // setSelectedRecord(row);
  };

  const handleSave_Edit = (row) => {
        // console.log('user_name_naps >',selectedRecord_IdCode_old);
        // console.log('system_no >',selectedRecord_SystemNo_old);
        // console.log('system_name >',selectedRecord_SystemName_old);
        // console.log('role_no >',selectedRecord_RoleNo_old);
        // console.log('role_type >',selectedRecord_RoleName_old);

        // console.log('---------------------------------------------');

        // console.log('user_name_naps >>>',selectedRecord_IdCode);
        // console.log('system_no >>>',selectedRecord_SystemNo);
        // console.log('system_name >>>',selectedRecord_SystemName);
        // console.log('role_no >>>',selectedRecord_RoleNo);
        // console.log('role_type >>>',selectedRecord_RoleName);
        if ( selectedRecord_IdCode == '' || selectedRecord_SystemNo == '' || selectedRecord_SystemName == '' 
        || selectedRecord_RoleNo == '' || selectedRecord_RoleName == '' || Update == ''
        ) {
        openDialog_Chk();
        } else {
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
        // User confirmed, proceed with data saving
        // Delete existing data
        axios
        .get(
          `http://10.17.66.242:3001/api/smart_register/update-map-user-system-role?system_no=${selectedRecord_SystemNo}&system_name=${selectedRecord_SystemName}&role_no=${selectedRecord_RoleNo}&role_type=${selectedRecord_RoleName}&update_date=${Update}&user_name_naps=${selectedRecord_IdCode}&system_no_old=${selectedRecord_SystemNo_old}&system_name_old=${selectedRecord_SystemName_old}&role_no_old=${selectedRecord_RoleNo_old}&role_type_old=${selectedRecord_RoleName_old}`
        )
        .then(() => {
          // After all requests are completed, fetch the updated data
          return fetchUserSystemRole();
        })
        .then(() => {
          // Success notification
          Swal.fire({
            icon: "success",
            title: "Edit Success",
            text: "User master NAP Edited successfully",
            confirmButtonText: "OK",
          });

          // Close the modal
          // handleCloseModal();
        })
        .catch((error) => {
          console.error("Error saving data:", error);
          // Handle the error or display an error message using Swal
          Swal.fire({
            icon: "error",
            title: "Edit Error",
            text: "An error occurred while editing data",
            confirmButtonText: "OK",
          });
        });
        }
        });

        // Set a higher z-index for the SweetAlert dialog
        document.querySelector('.my-swal-popup').style.zIndex = '9999';
        }
    }

  const columns = [
    { field: 'user_name_naps', headerName: 'Username', width: 160 , headerAlign: 'center' , headerClassName: 'bold-header' , align: 'left'},
    { field: 'system_no', headerName: 'System No.', width: 150 , headerAlign: 'center' , headerClassName: 'bold-header' , align: 'center'},
    { field: 'system_name', headerName: 'System Name', width: 350 , headerAlign: 'center' , headerClassName: 'bold-header' , align: 'left'},
    { field: 'role_no', headerName: 'Role No.', width: 100 , headerAlign: 'center' , headerClassName: 'bold-header' , align: 'center'},
    { field: 'role_type', headerName: 'Role Name', width: 150 , headerAlign: 'center' , headerClassName: 'bold-header' , align: 'left'},
    { field: 'update_date', headerName: 'Update', width: 160 , headerAlign: 'center' , headerClassName: 'bold-header' , align: 'center'},
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

  const columns_system = [
    { field: 'system_no', headerName: 'System no.', width: 150 , headerAlign: 'center' , headerClassName: 'bold-header' , align: 'center'},
    { field: 'system_name', headerName: 'System name', width: 350 , headerAlign: 'center' , headerClassName: 'bold-header' , align: 'left'},
  ]

  const columns_role = [
    { field: 'role_no', headerName: 'Role no.', width: 160, headerAlign: 'center' , headerClassName: 'bold-header' , align: 'center'},
    { field: 'role_type', headerName: 'Role name', width: 213 , headerAlign: 'center' , headerClassName: 'bold-header' , align: 'left'},
  ]

  return (
    <>
        <Navbar onToggle={handleNavbarToggle}/>
        <Box marginLeft={isNavbarOpen ? "220px" : 4} marginTop={10}>
            <Button 
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
                onClick={handleOpenModal}
                endIcon={<AddToPhotosIcon />}
                >ADD MAP USER SYSTEM ROLE
            </Button>
            <Box sx={{width: '1180px' , height: 510 , marginTop: '10px' , marginLeft: '45px'}}>
                  <DataGrid
                    columns={columns}
                    // disableColumnFilter
                    // disableDensitySelector
                    rows={distinctUserSystemRole}
                    slots={{ toolbar: GridToolbar }}
                    filterModel={filterModel}
                    onFilterModelChange={(newModel) => setFilterModel(newModel)}
                    slotProps={{ toolbar: { showQuickFilter: true } }}
                    columnVisibilityModel={columnVisibilityModel}
                    // checkboxSelection
                    onColumnVisibilityModelChange={(newModel) =>
                      setColumnVisibilityModel(newModel)
                    }
                  />
            </Box>
            <Modal
                open={isModalOpen}
                onClose={handleCloseModal}
                aria-labelledby="key-weight-modal-title"
                aria-describedby="key-weight-modal-description"
            >
                <Box sx={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 725 , height: 460 , bgcolor: '#B4D4FF', boxShadow: 24, p: 4 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' , height: 20 , marginBottom: 20}}>
                        <div style={{width: '100%' ,fontWeight: 'bold' , fontSize: 20 , textAlign: 'center' }}>
                            <label htmlFor="" >ADD MAP USER SYSTEM ROLE</label>
                        </div>
                        <div>
                            <IconButton onClick={handleCloseModal} style={{position: 'absolute', top: '10px', right: '10px',}}>
                                <CloseIcon style={{fontSize: '25px', color: 'white', backgroundColor: '#E55604'}} /> 
                            </IconButton>
                        </div>
                    </div>
                    <div style={{ height: 320 , backgroundColor: '#E4FBFF' }}>
                        <div >
                            {/* <TextField
                              // disabled
                              id="outlined-disabled"
                              label="- Username NAP -"
                              value={Username}
                              onChange={handleUsernameChange}
                              // onKeyDown={handleEnterKeyPress} //combinedHandler //handleEnterKeyPress
                              defaultValue=""
                              style={{backgroundColor: 'white' , marginLeft: 20 , marginTop: 20 , width: 300 }}
                            /> */}
                            <div style={{paddingTop: 20}}>
                              <Autocomplete
                                  disablePortal
                                  // id="combo-box-demo-series"
                                  // size="small"
                                  options={distinctDataUserNap}
                                  getOptionLabel={(option) => option && option.user_login}
                                  // getOptionLabel={(option) => option && option.user_login ? option.user_login : ''}
                                  value={Username}
                                  // onChange={handleUsernameChange}
                                  onChange={(event, newValue) => handleUsernameChange(event, newValue)} 
                                  // onChange={(event, newValue) => {
                                  //   handleUsernameChange(event, newValue);
                                  //   handleSaveData(event, newValue);
                                  // }}
                                  sx={{ width: 300 , backgroundColor: 'white' , marginLeft: 2.5}}
                                  renderInput={(params) => <TextField {...params} label=" Username NAP" />}
                                  isOptionEqualToValue={(option, value) =>
                                      option && value && option.user_login === value.user_login
                                  }
                              />
                            </div>
                        </div>

                        <div>
                            <TextField
                              // disabled
                              id="outlined-disabled"
                              label="- System No. -"
                              type="number"
                              value={SystemNo}
                              onChange={handleUSystemNoChange}
                              // onKeyDown={handleEnterKeyPress} //combinedHandler //handleEnterKeyPress
                              defaultValue="0"
                              InputLabelProps={{
                                shrink: true,
                              }}
                              style={{backgroundColor: 'white' , marginLeft: 20 , marginTop: 20 , width: 300 }}
                            />

                            <TextField
                              // disabled
                              id="outlined-disabled"
                              label="- System Name -"
                              value={SystemName}
                              onChange={handleUSystemNameChange}
                              // onKeyDown={handleEnterKeyPress} //combinedHandler //handleEnterKeyPress
                              style={{backgroundColor: 'white' , marginLeft: 20 , marginTop: 20 , width: 300 }}
                            />
                        </div>

                        <div>
                            <TextField
                              // disabled
                              id="outlined-disabled"
                              label="- Role No. -"
                              type="number"
                              value={RoleNo}
                              onChange={handleURoleNoChange}
                              // onKeyDown={handleEnterKeyPress} //combinedHandler //handleEnterKeyPress
                              defaultValue="0"
                              InputLabelProps={{
                                shrink: true,
                              }}
                              style={{backgroundColor: 'white' , marginLeft: 20 , marginTop: 20 , width: 300 }}
                            />

                            <TextField
                              // disabled
                              id="outlined-disabled"
                              label="- Role Name -"
                              value={RoleName}
                              onChange={handleURoleNameChange}
                              // onKeyDown={handleEnterKeyPress} //combinedHandler //handleEnterKeyPress
                              style={{backgroundColor: 'white' , marginLeft: 20 , marginTop: 20 , width: 300 }}
                            />
                        </div>

                        <div>
                            <TextField
                              // disabled
                              id="outlined-disabled"
                              label="- Update -"
                              value={Update}
                              // onChange={handleDateChange}
                              // value={editedUpDateData !== '' ? editedUpDateData : Update_data}
                              // onChange={handleUpDateDataChange}
                              style={{backgroundColor: 'white' ,  marginLeft: 20 , marginTop: 15  , width: 300}}
                            />        
                        </div>

                        
                    </div>
                    
                    <div style={{display: 'flex', justifyContent: 'flex-end' , marginTop: 10 , height: 45 }}>
                        <Button variant="contained" onClick={handleOpenModal_System} className="btn_hover" style={{backgroundColor: 'orange' , color: 'black' , width: 150 , height: 40 , marginRight: 10 , boxShadow: '3px 3px 5px grey'}}>
                            Data system
                        </Button>
                        <Button variant="contained" onClick={handleOpenModal_Role} className="btn_hover" style={{backgroundColor: 'orange' , color: 'black' , width: 150 , height: 40 , marginRight: 120 , boxShadow: '3px 3px 5px grey'}}>
                            Data role
                        </Button>
                        
                        <Button variant="contained" startIcon={<CancelIcon />} onClick={handleCloseModal} className="btn_hover" style={{backgroundColor: 'lightgray' , color: 'black' , width: 120 , height: 40 , marginRight: 10 , boxShadow: '3px 3px 5px grey'}}>
                            Cancel
                        </Button>
                        <Button variant="contained" endIcon={<AddToPhotosIcon />} onClick={handleSaveData}  className="btn_hover" style={{backgroundColor: 'lightgreen' , color: 'black' , width: 120 , height: 40 , boxShadow: '3px 3px 5px grey'}}>
                            SAVE
                        </Button>
                        
                    </div>
                </Box>
            </Modal>
            
            {/* Modal for Edit data */}
            <Modal
                open={isModalOpen_Edit}
                onClose={handleCloseModal_Edit}
                aria-labelledby="key-weight-modal-title"
                aria-describedby="key-weight-modal-description"
            >
                <Box sx={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 725 , height: 460 , bgcolor: '#B4D4FF', boxShadow: 24, p: 4 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' , height: 20 , marginBottom: 20}}>
                        <div style={{width: '100%' ,fontWeight: 'bold' , fontSize: 20 , textAlign: 'center' }}>
                            <label htmlFor="" >EDIT MAP USER SYSTEM ROLE</label>
                        </div>
                        <div>
                            <IconButton onClick={handleCloseModal_Edit} style={{position: 'absolute', top: '10px', right: '10px',}}>
                                <CloseIcon style={{fontSize: '25px', color: 'white', backgroundColor: '#E55604'}} /> 
                            </IconButton>
                        </div>
                    </div>
                    <div style={{ height: 320 , backgroundColor: '#E4FBFF' }}>
                        <div >
                            <div style={{paddingTop: 20}}>
                              <TextField
                                disabled
                                id="outlined-disabled"
                                label="- ID Code -"
                                value={selectedRecord_IdCode}
                                style={{backgroundColor: '#EEF5FF' , marginLeft: 20  , width: 300 }}
                              />
                            </div>
                        </div>

                        <div>
                            <TextField
                              id="outlined-disabled"
                              label="- System No. -"
                              type="number"
                              value={selectedRecord_SystemNo}
                              onChange={handleUSystemNoChange}
                              defaultValue="0"
                              InputLabelProps={{
                                shrink: true,
                              }}
                              style={{backgroundColor: 'white' , marginLeft: 20 , marginTop: 20 , width: 300 }}
                            />

                            <TextField
                              // disabled
                              id="outlined-disabled"
                              label="- System Name -"
                              value={selectedRecord_SystemName}
                              onChange={handleUSystemNameChange}
                              // onKeyDown={handleEnterKeyPress} //combinedHandler //handleEnterKeyPress
                              style={{backgroundColor: 'white' , marginLeft: 20 , marginTop: 20 , width: 300 }}
                            />
                        </div>

                        <div>
                            <TextField
                              // disabled
                              id="outlined-disabled"
                              label="- Role No. -"
                              type="number"
                              value={selectedRecord_RoleNo}
                              onChange={handleURoleNoChange}
                              // onKeyDown={handleEnterKeyPress} //combinedHandler //handleEnterKeyPress
                              defaultValue="0"
                              InputLabelProps={{
                                shrink: true,
                              }}
                              style={{backgroundColor: 'white' , marginLeft: 20 , marginTop: 20 , width: 300 }}
                            />

                            <TextField
                              // disabled
                              id="outlined-disabled"
                              label="- Role Name -"
                              value={selectedRecord_RoleName}
                              onChange={handleURoleNameChange}
                              // onKeyDown={handleEnterKeyPress} //combinedHandler //handleEnterKeyPress
                              style={{backgroundColor: 'white' , marginLeft: 20 , marginTop: 20 , width: 300 }}
                            />
                        </div>

                        <div>
                            <TextField
                              disabled
                              id="outlined-disabled"
                              label="- Update -"
                              value={Update}
                              // onChange={handleDateChange}
                              // value={editedUpDateData !== '' ? editedUpDateData : Update_data}
                              // onChange={handleUpDateDataChange}
                              style={{backgroundColor: '#EEF5FF' ,  marginLeft: 20 , marginTop: 15  , width: 300}}
                            />        
                        </div>

                        
                    </div>
                    
                    <div style={{display: 'flex', justifyContent: 'flex-end' , marginTop: 10 , height: 45 }}>
                        <Button variant="contained" onClick={handleOpenModal_System} className="btn_hover" style={{backgroundColor: 'orange' , color: 'black' , width: 150 , height: 40 , marginRight: 10 , boxShadow: '3px 3px 5px grey'}}>
                            Data system
                        </Button>
                        <Button variant="contained" onClick={handleOpenModal_Role} className="btn_hover" style={{backgroundColor: 'orange' , color: 'black' , width: 150 , height: 40 , marginRight: 120 , boxShadow: '3px 3px 5px grey'}}>
                            Data role
                        </Button>
                        
                        <Button variant="contained" startIcon={<CancelIcon />} onClick={handleCloseModal_Edit} className="btn_hover" style={{backgroundColor: 'lightgray' , color: 'black' , width: 120 , height: 40 , marginRight: 10 , boxShadow: '3px 3px 5px grey'}}>
                            Cancel
                        </Button>
                        <Button variant="contained" endIcon={<AddToPhotosIcon />} onClick={handleSave_Edit}  className="btn_hover" style={{backgroundColor: 'lightgreen' , color: 'black' , width: 120 , height: 40 , boxShadow: '3px 3px 5px grey'}}>
                            SAVE
                        </Button>
                        
                    </div>
                </Box>
            </Modal>

            <Modal
                open={isModalOpen_System}
                onClose={handleCloseModal_System}
                aria-labelledby="key-weight-modal-title"
                aria-describedby="key-weight-modal-description"
            >
                <Box sx={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 567 , height: 650 , bgcolor: '#B4D4FF', boxShadow: 24, p: 4 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' , height: 20 , marginBottom: 20}}>
                        <div style={{width: '100%' ,fontWeight: 'bold' , fontSize: 20 , textAlign: 'center' }}>
                            <label htmlFor="" >DATA FOR SYSTEM</label>
                        </div>
                        <div>
                            <IconButton onClick={handleCloseModal_System} style={{position: 'absolute', top: '10px', right: '10px',}}>
                                <CloseIcon style={{fontSize: '25px', color: 'white', backgroundColor: '#E55604'}} /> 
                            </IconButton>
                        </div>
                        
                    </div>
                    <div style={{border: '1px solid black' , height: 560 , backgroundColor: '#E4FBFF' }}>
                        <DataGrid
                        columns={columns_system}
                        // disableColumnFilter
                        // disableDensitySelector
                        rows={distinctDataSystem}
                      />
                    </div>
                </Box>
            </Modal>

            <Modal
                open={isModalOpen_Role}
                onClose={handleCloseModal_Role}
                aria-labelledby="key-weight-modal-title"
                aria-describedby="key-weight-modal-description"
            >
                <Box sx={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 440 , height: 650 , bgcolor: '#B4D4FF', boxShadow: 24, p: 4 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' , height: 20 , marginBottom: 20}}>
                        <div style={{width: '100%' ,fontWeight: 'bold' , fontSize: 20 , textAlign: 'center' }}>
                            <label htmlFor="" >DATA FOR ROLE</label>
                        </div>
                        <div>
                            <IconButton onClick={handleCloseModal_Role} style={{position: 'absolute', top: '10px', right: '10px',}}>
                                <CloseIcon style={{fontSize: '25px', color: 'white', backgroundColor: '#E55604'}} /> 
                            </IconButton>
                        </div>
                        
                    </div>
                    <div style={{border: '1px solid black' , height: 560 , backgroundColor: '#E4FBFF' }}>
                        <DataGrid
                        columns={columns_role}
                        // disableColumnFilter
                        // disableDensitySelector
                        rows={distinctDataRole}
                      />
                    </div>
                </Box>
            </Modal>

            <Dialog open={isDialogOpen} onClose={closeDialog}>
                <DialogTitle style={{backgroundColor: '#6499E9' , color: 'red'}}>Duplicate data</DialogTitle>
                <DialogContent style={{backgroundColor: '#9EDDFF'  , color: 'red'}}>
                      <DialogContentText  style={{paddingTop: 20 , color: 'black' , paddingLeft: 0}}>
                            Duplicate data in system, Please check try again.
                      </DialogContentText>
                </DialogContent>
                <DialogActions style={{backgroundColor: '#9EDDFF' , height: 50}}>
                      <Button onClick={() => { closeDialog()}} style={{width: 100 , backgroundColor: '#7C81AD' , borderRadius:5 , border: '1px solid black' , color: 'white'}}>
                        OK
                      </Button>
                </DialogActions>
            </Dialog>

            {/* <Dialog open={isDialogOpen_Map} onClose={closeDialog_Map}>
                <DialogTitle style={{backgroundColor: '#6499E9' , color: 'red'}}>Not found data</DialogTitle>
                <DialogContent style={{backgroundColor: '#9EDDFF'  , color: 'red'}}>
                      <DialogContentText  style={{paddingTop: 20 , color: 'black' , paddingLeft: 0}}>
                            Not found username in Database, Please add user before Map system.
                      </DialogContentText>
                </DialogContent>
                <DialogActions style={{backgroundColor: '#9EDDFF' , height: 50}}>
                      <Button onClick={() => { closeDialog_Map()}} style={{width: 100 , backgroundColor: '#7C81AD' , borderRadius:5 , border: '1px solid black' , color: 'white'}}>
                        OK
                      </Button>
                </DialogActions>
            </Dialog> */}

            <Dialog open={isDialogOpen_Chk} onClose={closeDialog_Chk}>
                <DialogTitle style={{backgroundColor: '#6499E9' , color: 'red'}}>Incomplete data</DialogTitle>
                <DialogContent style={{backgroundColor: '#9EDDFF'  , color: 'red'}}>
                      <DialogContentText  style={{paddingTop: 20 , color: 'black' , paddingLeft: 0}}>
                          Incomplete data for save, Please check try again.
                      </DialogContentText>
                </DialogContent>
                <DialogActions style={{backgroundColor: '#9EDDFF' , height: 50}}>
                      <Button onClick={() => { closeDialog_Chk()}} style={{width: 100 , backgroundColor: '#7C81AD' , borderRadius:5 , border: '1px solid black' , color: 'white'}}>
                        OK
                      </Button>
                </DialogActions>
            </Dialog>
        </Box>
    </>
  );
}