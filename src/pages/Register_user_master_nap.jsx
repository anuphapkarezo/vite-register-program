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
import EditIcon from "@mui/icons-material/Edit";
import EditOffTwoToneIcon from '@mui/icons-material/EditOffTwoTone';

import Navbar from "../components/navbar/Navbar";

export default function Register_user_master_nap({ onSearch }) {
  const [distinctUserMasterNAP, setDistinctUserMasterNAP] = useState([]);
  const [distinctCountUser, setDistinctCountUser] = useState([]);
  const [distinctDataEmp, setDistinctDataEmp] = useState([]);

  const [factory_data, setfactory_data] = useState('');
  const [Name_data, setName_data] = useState('');
  const [Surname_data, setSurname_data] = useState('');
  const [Email_data, setEmail_data] = useState('');
  const [Phone_data, setPhone_data] = useState('');
  const [UserLogin_data, setUserLogin_data] = useState('');
  const [UserPass_data, setUserPass_data] = useState('');
  const [CountStr_data, setCountStr_data] = useState('0');
  const [Adddate_data, setAdddate_data] = useState('');
  const [Update_data, setUpdate_data] = useState('');

  const [editedNameData, setEditedNameData] = useState('');
  const [editedSurnameData, setEditedSurnameData] = useState('');
  const [editedEmailData, setEditedEmailData] = useState('');
  const [editedFactoryData, setEditedFactoryData] = useState('');
  const [editedPhoneData, setEditedPhoneData] = useState('');
  const [editedUserData, setEditedUserData] = useState('');
  const [editedPassData, setEditedPassData] = useState('');
  const [editedCountData, setEditedCountData] = useState('');
  const [editedAddDateData, setEditedAddDateData] = useState('');
  const [editedUpDateData, setEditedUpDateData] = useState('');


  const [idCode, setIdCode] = useState('');
  const [CountIDcode, setCountIDcode] = useState('');

  const [isNavbarOpen, setIsNavbarOpen] = React.useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDialogOpen_Chk, setIsDialogOpen_Chk] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen_Edit, setIsModalOpen_Edit] = useState(false);

  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = useState(null);

  const [columnVisibilityModel, setColumnVisibilityModel] = React.useState({});

  const [filterModel, setFilterModel] = React.useState({
    items: [],
    quickFilterExcludeHiddenColumns: true,
    quickFilterValues: [''],
  });

  const fetchUserMasterNAP = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`http://10.17.66.242:3001/api/smart_register/filter-user-master-nap`);
      const data = await response.data;
      // console.log(data);
      // Add a unique id property to each row
      const rowsWithId = data.map((row, index) => ({
          ...row,
          id: index, // You can use a better unique identifier here if available
      }));
      setDistinctUserMasterNAP(rowsWithId);
      } catch (error) {
      console.error('Error fetching data:', error);
      setError('An error occurred while fetching data user master NAP');
      } finally {
        setIsLoading(false); // Set isLoading back to false when fetch is complete
      }
  };

  const fetchCountUser = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`http://10.17.66.242:3001/api/smart_register/filter-count-user?id_code=${idCode}`);
      const data = await response.data;
      
      setDistinctCountUser(data);
      if (Array.isArray(data) && data.length > 0) {
        const firstObject = data[0]; // Get the first object from the array
        const countId = firstObject.count_id;
        // setCountIDcode(countId)
        console.log("Count ID:", countId);
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

  const fetchDataEmp = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`http://10.17.66.242:3001/api/smart_register/filter-data-emp-email?id_code=${idCode}`);
      const data = await response.data;
      
      setDistinctDataEmp(data);
      if (Array.isArray(data) && data.length > 0) {
        const firstObject = data[0]; // Get the first object from the array
        const nameobj = firstObject.emp_name_eng;
        const surnameobj = firstObject.emp_lastname_eng;
        const emailobj = firstObject.user_email;
        const phoneobj = firstObject.phone;
        const factoryobj = firstObject.factory;
        const userloginobj = firstObject.user_login;
        const userpassobj = firstObject.user_password;
        const countstrobj = firstObject.count;
        const adddateobj = firstObject.user_adddate;
        const updateobj = firstObject.user_update;

        setName_data(nameobj)
        setSurname_data(surnameobj)
        setfactory_data(factoryobj)
        setEmail_data(emailobj)
        setPhone_data(phoneobj)
        setUserLogin_data(userloginobj)
        setUserPass_data(userpassobj)
        setCountStr_data(countstrobj)
        setAdddate_data(adddateobj)
        setUpdate_data(updateobj)
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

  useEffect(() => {
    fetchUserMasterNAP();
  }, []);

  const handleNavbarToggle = (openStatus) => {
    setIsNavbarOpen(openStatus);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleIdCodeChange = (event) => {
    setIdCode(event.target.value);
    setCountIDcode('');
    setName_data('');
    setSurname_data('');
    setfactory_data('');
    setEmail_data('');
    setPhone_data('');
    setUserLogin_data('');
    setUserPass_data('');
    setCountStr_data('0');
    setAdddate_data('');
    setUpdate_data('');
    
    setEditedNameData('');
    setEditedSurnameData('');
    setEditedEmailData('');
    setEditedFactoryData('');
    setEditedPhoneData('');
    setEditedUserData('');
    setEditedPassData('');
    setEditedAddDateData('');
    setEditedUpDateData('');
    setEditedCountData('');
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIdCode('');
    setName_data('');
    setSurname_data('');
    setfactory_data('');
    setEmail_data('');
    setPhone_data('');
    setUserLogin_data('');
    setUserPass_data('');
    setCountStr_data('0');
    setAdddate_data('');
    setUpdate_data('');

    setEditedNameData('');
    setEditedSurnameData('');
    setEditedEmailData('');
    setEditedFactoryData('');
    setEditedPhoneData('');
    setEditedUserData('');
    setEditedPassData('');
    setEditedAddDateData('');
    setEditedUpDateData('');
    setEditedCountData('');
  };

  const handleCloseModal_Edit = () => {
    setIsModalOpen_Edit(false);

    setIdCode('');
    setName_data('');
    setSurname_data('');
    setfactory_data('');
    setEmail_data('');
    setPhone_data('');
    setUserLogin_data('');
    setUserPass_data('');
    setCountStr_data('0');
    setAdddate_data('');
    setUpdate_data('');

    setEditedNameData('');
    setEditedSurnameData('');
    setEditedEmailData('');
    setEditedFactoryData('');
    setEditedPhoneData('');
    setEditedUserData('');
    setEditedPassData('');
    setEditedAddDateData('');
    setEditedUpDateData('');
    setEditedCountData('');
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleOpenModal_Edit = () => {
    setIsModalOpen_Edit(true);
  };

  const handleEnterKeyPress = (event) => {
    if (event.key === 'Enter') {
      fetchCountUser();
      fetchDataEmp();
    }
  };

  const handleNameDataChange = (event) => {
    setEditedNameData(event.target.value);
    setName_data(event.target.value)
    setSelectedRecord_Name(event.target.value)
  };

  const handleSurnameDataChange = (event) => {
    setEditedSurnameData(event.target.value);
    setSurname_data(event.target.value)
    setSelectedRecord_Surname(event.target.value)
  };

  const handleEmailDataChange = (event) => {
    setEditedEmailData(event.target.value);
    setEmail_data(event.target.value)
    setSelectedRecord_Email(event.target.value);
  };

  const handleFactoryDataChange = (event) => {
    setEditedFactoryData(event.target.value);
    setfactory_data(event.target.value)
    setSelectedRecord_Factory(event.target.value);
  };

  const handlePhoneDataChange = (event) => {
    setEditedPhoneData(event.target.value);
    setPhone_data(event.target.value);
    setSelectedRecord_Phone(event.target.value);
  };

  const handleUserDataChange = (event) => {
    setEditedUserData(event.target.value);
    setUserLogin_data(event.target.value);
    setSelectedRecord_UserLogin(event.target.value);
  };

  const handlePassDataChange = (event) => {
    setEditedPassData(event.target.value);
    setUserPass_data(event.target.value);
    setSelectedRecord_UserPass(event.target.value);
  };

  const handleAddDateDataChange = (event) => {
    setEditedAddDateData(event.target.value);
    setAdddate_data(event.target.value);
  };

  const handleUpDateDataChange = (event) => {
    setEditedUpDateData(event.target.value);
    setUpdate_data(event.target.value);
  };

  const handleCountDataChange = (event) => {
    setEditedCountData(event.target.value);
    setCountStr_data(event.target.value);
  };

  // const handleUpdatePhoneData = () => {
  //   setPhone_data(editedPhoneData);
  //   setEditedPhoneData(''); // Clear the edited data after updating Phone_data
  // };


  const openDialog = () => {
    setIsDialogOpen(true);
    setIdCode('');
    setName_data('');
    setSurname_data('');
    setfactory_data('');
    setEmail_data('');
    setPhone_data('');
    setUserLogin_data('');
    setUserPass_data('');
    setCountStr_data('0');
    setAdddate_data('');
    setUpdate_data('');

    setEditedNameData('');
    setEditedSurnameData('');
    setEditedEmailData('');
    setEditedFactoryData('');
    setEditedPhoneData('');
    setEditedUserData('');
    setEditedPassData('');
    setEditedAddDateData('');
    setEditedUpDateData('');
    setEditedCountData('');

    setCountIDcode('');
    // fetchCountUser();
    // handleCloseModal();
  };
  
  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const openDialog_Chk = () => {
    setIsDialogOpen_Chk(true);
  }

  const closeDialog_Chk = () => {
    setIsDialogOpen_Chk(false);
  };

  const handleSaveData = () => {
    if (CountIDcode > 0){
      openDialog();
    } else if ( idCode == '' || Name_data == '' || Surname_data == '' || Email_data == '' || factory_data == ''
                || Phone_data == '' || UserLogin_data == '' || UserPass_data == '' 
                || Adddate_data == '' || Update_data == '') {
      // console.log('idCode >' , idCode);
      // console.log('Name_data >' , Name_data);
      // console.log('Surname_data >' , Surname_data);
      // console.log('Email_data >' , Email_data);
      // console.log('factory_data >' , factory_data);
      // console.log('Phone_data >' , Phone_data);
      // console.log('UserLogin_data >' , UserLogin_data);
      // console.log('UserPass_data >' , UserPass_data);
      // console.log('CountStr_data >' , CountStr_data);
      // console.log('Adddate_data >' , Adddate_data);
      // console.log('Update_data >' , Update_data);

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
              `http://10.17.66.242:3001/api/smart_register/insert-user-master-nap?factory=${factory_data}&id_code=${idCode}&name=${Name_data}&surname=${Surname_data}&email=${Email_data}&login=${UserLogin_data}&password=${UserPass_data}&adddate=${Adddate_data}&update=${Update_data}&count=${CountStr_data}&phone=${Phone_data}`
            )
            .then(() => {
              // After all requests are completed, fetch the updated data
              return fetchUserMasterNAP();
            })
            .then(() => {
              // Success notification
              Swal.fire({
                icon: "success",
                title: "Save Success",
                text: "User master NAP saved successfully",
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


  const columns = [
    { field: 'factory', headerName: 'Factory', width: 70 , headerAlign: 'center' , headerClassName: 'bold-header' , align: 'center'},
    { field: 'id_code', headerName: 'ID Code', width: 100 , headerAlign: 'center' , headerClassName: 'bold-header' , align: 'center'},
    { field: 'name_eng', headerName: 'Name', width: 150 , headerAlign: 'center' , headerClassName: 'bold-header' , align: 'left'},
    { field: 'surname_eng', headerName: 'Surname', width: 150 , headerAlign: 'center' , headerClassName: 'bold-header' , align: 'left'},
    { field: 'email', headerName: 'E-Mail', width: 230 , headerAlign: 'center' , headerClassName: 'bold-header' , align: 'left'},
    { field: 'phone', headerName: 'Phone', width: 70 , headerAlign: 'center' , headerClassName: 'bold-header' , align: 'center'},
    { field: 'user_login', headerName: 'Username', width: 100 , headerAlign: 'center' , headerClassName: 'bold-header' , align: 'center'},
    { field: 'user_password', headerName: 'Password', width: 100 , headerAlign: 'center' , headerClassName: 'bold-header' , align: 'center'},
    { field: 'user_adddate', headerName: 'Add Date', width: 160 , headerAlign: 'center' , headerClassName: 'bold-header' , align: 'center'},
    { field: 'user_update', headerName: 'Update', width: 160 , headerAlign: 'center' , headerClassName: 'bold-header' , align: 'center'},
    { field: 'count', headerName: 'Count', width: 80 , headerAlign: 'center' , headerClassName: 'bold-header' , align: 'center'},
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

  const [selectedRecord, setSelectedRecord] = useState(null);
  const [selectedRecord_IdCode, setSelectedRecord_IdCode] = useState(null);
  const [selectedRecord_Name, setSelectedRecord_Name] = useState(null);
  const [selectedRecord_Surname, setSelectedRecord_Surname] = useState(null);
  const [selectedRecord_UserLogin, setSelectedRecord_UserLogin] = useState(null);
  const [selectedRecord_UserPass, setSelectedRecord_UserPass] = useState(null);
  const [selectedRecord_Email, setSelectedRecord_Email] = useState(null);
  const [selectedRecord_Count, setSelectedRecord_Count] = useState(null);
  const [selectedRecord_Factory, setSelectedRecord_Factory] = useState(null);
  const [selectedRecord_AddDate, setSelectedRecord_AddDate] = useState(null);
  const [selectedRecord_Phone, setSelectedRecord_Phone] = useState(null);
  const [selectedRecord_UpDate, setSelectedRecord_UpDate] = useState(null);

  const handleEditClick = (row) => {
    setSelectedRecord_IdCode(row.id_code)
    setSelectedRecord_Name(row.name_eng)
    setSelectedRecord_Surname(row.surname_eng)
    setSelectedRecord_UserLogin(row.user_login)
    setSelectedRecord_UserPass(row.user_password)
    setSelectedRecord_Email(row.email)
    setSelectedRecord_Count(row.count)
    setSelectedRecord_Factory(row.factory)
    setSelectedRecord_AddDate(row.user_adddate)
    setSelectedRecord_Phone(row.phone)
    setSelectedRecord_UpDate(row.user_update)
    setSelectedRecord(row);
  };

  const handleSaveEdit = () => {
        console.log('add date' , selectedRecord_AddDate);
        if ( selectedRecord_Name == '' || selectedRecord_UserLogin == '' || selectedRecord_Surname == '' || selectedRecord_UserPass == '' 
        || selectedRecord_Email == '' || selectedRecord_Factory == '' || selectedRecord_Phone == '' || selectedRecord_IdCode == '' 
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
          `http://10.17.66.242:3001/api/smart_register/update-user-master-nap?name=${selectedRecord_Name}&surname=${selectedRecord_Surname}&login=${selectedRecord_UserLogin}&password=${selectedRecord_UserPass}&email=${selectedRecord_Email}&factory=${selectedRecord_Factory}&phone=${selectedRecord_Phone}&update=${Update_format}&id_code=${selectedRecord_IdCode}&add_date=${selectedRecord_AddDate}`
        )
        .then(() => {
          // After all requests are completed, fetch the updated data
          return fetchUserMasterNAP();
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

  // Get current date
  const currentDate = new Date();
  // Extract day, month, and year
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1; // January is 0, so we add 1
  const year = currentDate.getFullYear();
  // Format day, month, and year with leading zeros if necessary
  const formattedDay = day < 10 ? '0' + day : day;
  const formattedMonth = month < 10 ? '0' + month : month;
  // Create the date string in "dd/mm/yyyy" format
  const Update_format = `${formattedDay}/${formattedMonth}/${year}`;

  return (
    <>
        <Navbar onToggle={handleNavbarToggle}/>
        <Box marginLeft={isNavbarOpen ? "220px" : 4} marginTop={10}>
            <Button 
                variant="contained" 
                className="btn_active hover:scale-110"
                // size="small"  btn_active hover:scale-110
                style={{  width: '250px', 
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
                >ADD USER MASTER NAP
            </Button>
            <Box sx={{width: '1480px' , height: 620 , marginTop: '10px' , marginLeft: '45px'}}>
                  <DataGrid
                    columns={columns}
                    // disableColumnFilter
                    // disableDensitySelector
                    rows={distinctUserMasterNAP}
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
                <Box sx={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 725 , height: 590 , bgcolor: '#B4D4FF', boxShadow: 24, p: 4 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' , height: 20 , marginBottom: 20}}>
                        <div style={{width: '100%' ,fontWeight: 'bold' , fontSize: 20 , textAlign: 'center' }}>
                            <label htmlFor="" >ADD USER MASTER NAP</label>
                        </div>
                        <div>
                            <IconButton onClick={handleCloseModal} style={{position: 'absolute', top: '10px', right: '10px',}}>
                                <CloseIcon style={{fontSize: '25px', color: 'white', backgroundColor: '#E55604'}} /> 
                            </IconButton>
                        </div>
                    </div>
                    <div style={{ height: 450 , backgroundColor: '#E4FBFF' }}>
                        <div>
                            <TextField
                              // disabled
                              id="outlined-disabled"
                              label="- ID Code -"
                              value={idCode}
                              onChange={handleIdCodeChange}
                              onKeyDown={handleEnterKeyPress} //combinedHandler //handleEnterKeyPress
                              defaultValue=""
                              InputProps={{
                                style: {fontWeight: 'bold'}, // Changing font color to blue
                              }}
                              style={{backgroundColor: '#EEF5FF' , marginLeft: 20 , marginTop: 20 , width: 300 }}
                            />
                        </div>

                        <div>
                            <TextField
                              // disabled
                              id="outlined-disabled"
                              label="- Name -"
                              // value={Name_data}
                              value={editedNameData !== '' ? editedNameData : Name_data}
                              onChange={handleNameDataChange}
                              style={{backgroundColor: 'white' , marginLeft: 20 , marginTop: 15 , width: 300}}
                            />

                          <TextField
                              // disabled
                              id="outlined-disabled"
                              label="- Username Login -"
                              // value={UserLogin_data}
                              value={editedUserData !== '' ? editedUserData : UserLogin_data}
                              onChange={handleUserDataChange}
                              style={{backgroundColor: 'white' ,  marginLeft: 20 , marginTop: 15  , width: 300 }}
                            />
                        </div>

                        <div>
                            <TextField
                              // disabled
                              id="outlined-disabled"
                              label="- Surname -"
                              // value={Surname_data}
                              value={editedSurnameData !== '' ? editedSurnameData : Surname_data}
                              onChange={handleSurnameDataChange}
                              style={{backgroundColor: 'white' , marginLeft: 20 , marginTop: 15 , width: 300}}
                            />

                            <TextField
                              // disabled
                              id="outlined-disabled"
                              label="- Password Login -"
                              // value={UserPass_data}
                              value={editedPassData !== '' ? editedPassData : UserPass_data}
                              onChange={handlePassDataChange}
                              style={{backgroundColor: 'white' ,  marginLeft: 20 , marginTop: 15  , width: 300 }}
                              type={showPassword ? 'text' : 'password'}
                              variant="outlined"
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton
                                      aria-label="toggle password visibility"
                                      onClick={handleClickShowPassword}
                                      onMouseDown={handleMouseDownPassword}
                                      edge="end"
                                    >
                                      {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }}
                            />
                        </div>

                        <div>
                            <TextField
                              // disabled
                              id="outlined-disabled"
                              label="- E-mail -"
                              // value={Email_data}
                              value={editedEmailData !== '' ? editedEmailData : Email_data}
                              onChange={handleEmailDataChange}
                              style={{backgroundColor: 'white' ,  marginLeft: 20 , marginTop: 15  , width: 300}}
                            />

                            <TextField
                              // disabled
                              id="outlined-disabled"
                              label="- Count Storage -"
                              type="number"
                              // value={CountStr_data}
                              value={editedCountData !== '' ? editedCountData : CountStr_data}
                              onChange={handleCountDataChange}
                              InputLabelProps={{
                                shrink: true,
                              }}
                              style={{backgroundColor: 'white' ,  marginLeft: 20 , marginTop: 15  , width: 300}}
                            />
                        </div>

                        <div>
                            <TextField
                              // disabled
                              id="outlined-disabled"
                              label="- Factory -"
                              // value={factory_data}
                              value={editedFactoryData !== '' ? editedFactoryData : factory_data}
                              onChange={handleFactoryDataChange}
                              style={{backgroundColor: 'white' ,  marginLeft: 20 , marginTop: 15  , width: 300}}
                            />

                            <TextField
                              // disabled
                              id="outlined-disabled"
                              label="- Adddate -"
                              // value={Adddate_data}
                              value={editedAddDateData !== '' ? editedAddDateData : Adddate_data}
                              onChange={handleAddDateDataChange}
                              style={{backgroundColor: 'white' ,  marginLeft: 20 , marginTop: 15  , width: 300}}
                            />
                        </div>

                        <div>
                            <TextField
                              // disabled
                              id="outlined-disabled"
                              label="- Internal Phone -"
                              // value={handlePhoneDataChange}
                              value={editedPhoneData !== '' ? editedPhoneData : Phone_data}
                              onChange={handlePhoneDataChange}
                              // value={Phone_data === '' ? ' ' : '-'}
                              style={{backgroundColor: 'white' ,  marginLeft: 20 , marginTop: 15  , width: 300}}
                            />

                            <TextField
                              // disabled
                              id="outlined-disabled"
                              label="- Update -"
                              // value={Update_data}
                              value={editedUpDateData !== '' ? editedUpDateData : Update_data}
                              onChange={handleUpDateDataChange}
                              style={{backgroundColor: 'white' ,  marginLeft: 20 , marginTop: 15  , width: 300}}
                            />        
                        </div>

                        <div>
                            
                        </div>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'flex-end' , marginTop: 10 , height: 45 }}>
                        <Button variant="contained" startIcon={<CancelIcon />} onClick={handleCloseModal} className="btn_hover" style={{backgroundColor: 'lightgray' , color: 'black' , width: 120 , height: 40 , marginRight: 10 , boxShadow: '3px 3px 5px grey'}}>
                            Cancel
                        </Button>
                        <Button variant="contained" endIcon={<AddToPhotosIcon />} onClick={handleSaveData}  className="btn_hover" style={{backgroundColor: 'lightgreen' , color: 'black' , width: 120 , height: 40 , boxShadow: '3px 3px 5px grey'}}>
                            SAVE
                        </Button>
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

            {/* Modal for Edit data  */}
            <Modal
                open={isModalOpen_Edit}
                onClose={handleCloseModal_Edit}
                aria-labelledby="key-weight-modal-title"
                aria-describedby="key-weight-modal-description"
            >
                <Box sx={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 725 , height: 590 , bgcolor: '#B4D4FF', boxShadow: 24, p: 4 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' , height: 20 , marginBottom: 20}}>
                        <div style={{width: '100%' ,fontWeight: 'bold' , fontSize: 20 , textAlign: 'center' }}>
                            <label htmlFor="" >EDIT USER MASTER NAP</label>
                        </div>
                        <div>
                            <IconButton onClick={handleCloseModal_Edit} style={{position: 'absolute', top: '10px', right: '10px',}}>
                                <CloseIcon style={{fontSize: '25px', color: 'white', backgroundColor: '#E55604'}} /> 
                            </IconButton>
                        </div>
                    </div>
                    <div style={{ height: 450 , backgroundColor: '#E4FBFF' }}>
                        <div>
                            <TextField
                              disabled
                              id="outlined-disabled"
                              label="- ID Code -"
                              value={selectedRecord_IdCode && selectedRecord_IdCode !== '' ? selectedRecord_IdCode : ''}
                              onChange={handleIdCodeChange}
                              onKeyDown={handleEnterKeyPress} //combinedHandler //handleEnterKeyPress
                              InputProps={{
                                style: {fontWeight: 'bold'}, // Changing font color to blue
                              }}
                              style={{backgroundColor: '#EEF5FF' , marginLeft: 20 , marginTop: 20 , width: 300 }}
                            />
                        </div>

                        <div>
                            <TextField
                              id="outlined-disabled"
                              label="- Name -"
                              value={editedNameData !== '' ? editedNameData : selectedRecord_Name}
                              onChange={handleNameDataChange}
                              style={{backgroundColor: 'white' , marginLeft: 20 , marginTop: 15 , width: 300}}
                            />

                          <TextField
                              id="outlined-disabled"
                              label="- Username Login -"
                              value={editedUserData !== '' ? editedUserData : selectedRecord_UserLogin}
                              onChange={handleUserDataChange}
                              style={{backgroundColor: 'white' , marginLeft: 20 , marginTop: 15 , width: 300 }}
                            />
                        </div>

                        <div>
                            <TextField
                              id="outlined-disabled"
                              label="- Surname -"
                              value={editedSurnameData !== '' ? editedSurnameData : selectedRecord_Surname}
                              onChange={handleSurnameDataChange}
                              style={{backgroundColor: 'white' , marginLeft: 20 , marginTop: 15 , width: 300}}
                            />

                            <TextField
                              id="outlined-disabled"
                              label="- Password Login -"
                              value={editedPassData !== '' ? editedPassData : selectedRecord_UserPass}
                              onChange={handlePassDataChange}
                              style={{backgroundColor: 'white' ,  marginLeft: 20 , marginTop: 15  , width: 300 }}
                              type={showPassword ? 'text' : 'password'}
                              variant="outlined"
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton
                                      aria-label="toggle password visibility"
                                      onClick={handleClickShowPassword}
                                      onMouseDown={handleMouseDownPassword}
                                      edge="end"
                                    >
                                      {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }}
                            />
                        </div>

                        <div>
                            <TextField
                              id="outlined-disabled"
                              label="- E-mail -"
                              value={editedEmailData !== '' ? editedEmailData : selectedRecord_Email}
                              onChange={handleEmailDataChange}
                              style={{backgroundColor: 'white' ,  marginLeft: 20 , marginTop: 15  , width: 300}}
                            />

                            <TextField
                              disabled
                              id="outlined-disabled"
                              label="- Count Storage -"
                              type="number"
                              value={editedCountData !== '' ? editedCountData : selectedRecord_Count}
                              onChange={handleCountDataChange}
                              InputLabelProps={{
                                shrink: true,
                              }}
                              style={{backgroundColor: '#EEF5FF' ,  marginLeft: 20 , marginTop: 15  , width: 300}}
                            />
                        </div>

                        <div>
                            <TextField
                              // disabled
                              id="outlined-disabled"
                              label="- Factory -"
                              value={editedFactoryData !== '' ? editedFactoryData : selectedRecord_Factory}
                              onChange={handleFactoryDataChange}
                              style={{backgroundColor: 'white' ,  marginLeft: 20 , marginTop: 15  , width: 300}}
                            />

                            <TextField
                              disabled
                              id="outlined-disabled"
                              label="- Adddate -"
                              // value={Adddate_data}
                              value={editedAddDateData !== '' ? editedAddDateData : selectedRecord_AddDate}
                              onChange={handleAddDateDataChange}
                              style={{backgroundColor: '#EEF5FF' ,  marginLeft: 20 , marginTop: 15  , width: 300}}
                            />
                        </div>

                        <div>
                            <TextField
                              // disabled
                              id="outlined-disabled"
                              label="- Internal Phone -"
                              // value={handlePhoneDataChange}
                              value={editedPhoneData !== '' ? editedPhoneData : selectedRecord_Phone}
                              onChange={handlePhoneDataChange}
                              // value={Phone_data === '' ? ' ' : '-'}
                              style={{backgroundColor: 'white' ,  marginLeft: 20 , marginTop: 15  , width: 300}}
                            />

                            <TextField
                              disabled
                              id="outlined-disabled"
                              label="- Update -"
                              value={Update_format}
                              // value={editedUpDateData !== '' ? editedUpDateData : selectedRecord_UpDate}
                              onChange={handleUpDateDataChange}
                              style={{backgroundColor: '#EEF5FF' ,  marginLeft: 20 , marginTop: 15  , width: 300}}
                            />        
                        </div>

                        <div>
                            
                        </div>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'flex-end' , marginTop: 10 , height: 45 }}>
                        <Button variant="contained" startIcon={<CancelIcon />} onClick={handleCloseModal_Edit} className="btn_hover" style={{backgroundColor: 'lightgray' , color: 'black' , width: 120 , height: 40 , marginRight: 10 , boxShadow: '3px 3px 5px grey'}}>
                            Cancel
                        </Button>
                        <Button variant="contained" endIcon={<EditOffTwoToneIcon />} onClick={handleSaveEdit}  className="btn_hover" style={{backgroundColor: 'orange' , color: 'black' , width: 120 , height: 40 , boxShadow: '3px 3px 5px grey'}}>
                            EDIT
                        </Button>
                    </div>
                </Box>
            </Modal>
        </Box>
    </>
  );
}