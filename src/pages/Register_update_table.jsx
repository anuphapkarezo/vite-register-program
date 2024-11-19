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

export default function Register_update_table({ onSearch }) {
  const Custom_Progress = () => (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
    <div className="loader"></div>
    <div style={{ marginTop: 16, fontSize: 18, fontWeight: 'bold', color: '#3498db' }}>Loading Data...</div>
      <style jsx>{`
        .loader {
          border: 8px solid #f3f3f3;
          border-top: 8px solid #3498db;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );

  const [distinctDataUpdateTable, setDistinctDataUpdateTable] = useState([]);

  const [isNavbarOpen, setIsNavbarOpen] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen_Edit, setIsModalOpen_Edit] = useState(false);

  const [columnVisibilityModel, setColumnVisibilityModel] = React.useState({});

  const [filterModel, setFilterModel] = React.useState({
    items: [],
    quickFilterExcludeHiddenColumns: true,
    quickFilterValues: [''],
  });

  const fetchDataUpdateTable = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`http://10.17.66.242:3001/api/smart_register/filter-update-datetime-all-table`);
      const data = await response.data;
      const rowsWithId = data.map((row, index) => ({
        ...row,
        id: index, // You can use a better unique identifier here if available
      }));
      setDistinctDataUpdateTable(rowsWithId);
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

  useEffect(() => {
    fetchDataUpdateTable();
  }, []);

  const columns_update_table = [
    { field: 'sort_no', headerName: 'TABLE NO.', width: 90 , headerAlign: 'center' , headerClassName: 'bold-header' , align: 'center'},
    { field: 'table_name', headerName: 'TABLE NAME', width: 250 , headerAlign: 'center' , headerClassName: 'bold-header' , align: 'left'},
    { field: 'min_id', headerName: 'MIN ID', width: 100 , headerAlign: 'center' , headerClassName: 'bold-header' , align: 'left',
      valueFormatter: (params) => {
        if (params.value == 0) {
          return '-';
        }
        const value = parseInt(params.value, 10);
        return value.toLocaleString();
      },
      cellClassName: (params) => {
        // If the value is not 1, return a custom CSS class
        return params.value !== 1 ? 'orange-background' : '';
      },
    },
    { field: 'max_id', headerName: 'MAX ID', width: 100 , headerAlign: 'center' , headerClassName: 'bold-header' , align: 'left',
      valueFormatter: (params) => {
        if (params.value == 0) {
          return '-';
        }
        const value = parseInt(params.value, 10);
        return value.toLocaleString();
      },
    },
    { field: 'min_update_datetime', headerName: 'MIN UPDATE', width: 200 , headerAlign: 'center' , headerClassName: 'bold-header' , align: 'center'},
    { field: 'max_update_datetime', headerName: 'MAX UPDATE', width: 200 , headerAlign: 'center' , headerClassName: 'bold-header' , align: 'center'},
    { field: 'status_date', headerName: 'STATUS UPDATE', width: 150 , headerAlign: 'center' , headerClassName: 'bold-header' , align: 'center',
      renderCell: (params) => {
        let backgroundColor = '';
        switch (params.value) {
          case 'NORMAL':
            backgroundColor = 'lightgreen';
            break;
          case 'ABNORMAL':
            backgroundColor = 'red';
            break;
          default:
            break;
        }
        return (
          <div style={{ backgroundColor: backgroundColor, width: '100%', height: '100%', textAlign: 'center' , paddingTop: 5}}>
            {params.value}
          </div>
        );
      }
    },
  ]

  return (
    <>
        <Navbar onToggle={handleNavbarToggle}/>
        <Box marginLeft={isNavbarOpen ? "220px" : 4} marginTop={10}>
            <Box sx={{width: 1120 , height: 650 }}>
              {isLoading ? (
                <Custom_Progress />
              ) : (
                <>
                  <DataGrid
                    columns={columns_update_table}
                    rows={distinctDataUpdateTable}
                    slots={{ toolbar: GridToolbar }}
                    filterModel={filterModel}
                    onFilterModelChange={(newModel) => setFilterModel(newModel)}
                    slotProps={{ toolbar: { showQuickFilter: true } }}
                    columnVisibilityModel={columnVisibilityModel}
                    onColumnVisibilityModelChange={(newModel) =>
                      setColumnVisibilityModel(newModel)
                    }
                    getRowHeight={() => 40}
                    sx={{
                      '& .MuiDataGrid-row': {
                        backgroundColor: 'lightyellow', // Change to desired color
                      },
                      
                    }}
                  />
                </>
              )}
            </Box>
        </Box>
    </>
  );
}