import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { TreeView, TreeItem } from '@mui/lab';
import { useNavigate } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Checkbox, FormControlLabel, Typography } from '@mui/material';

const departmentData = [
  {
    department: 'customer_service',
    sub_departments: ['support', 'customer_success'],
  },
  {
    department: 'design',
    sub_departments: ['graphic_design', 'product_design', 'web_design'],
  },
];

const SecondPage = () => {
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((jsonData) => setData(jsonData));
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'title', headerName: 'Title', width: 300 },
    { field: 'body', headerName: 'Body', width: 600 },
  ];

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    if (!userDetails) {
      // Redirect to the first page if user details are not available
      navigate('/', { state: { message: 'Please enter your details first.' } });
    }
  }, [navigate]);


  const handleTreeItemSelect = (event, value) => {
    setSelectedItems(value);
  };

  const handleCheckboxChange = (event, item) => {
    let updatedSelectedItems;
    if (event.target.checked) {
      updatedSelectedItems = [...selectedItems, item];
    } else {
      updatedSelectedItems = selectedItems.filter((selectedItem) => selectedItem !== item);
    }
    setSelectedItems(updatedSelectedItems);
  };

  const handleDepartmentSelect = (event, department) => {
    let updatedSelectedItems;
    if (event.target.checked) {
      // Select department and all sub-departments
      updatedSelectedItems = [...selectedItems, department, ...department.sub_departments];
    } else {
      // Deselect department and all sub-departments
      updatedSelectedItems = selectedItems.filter(
        (selectedItem) =>
          selectedItem !== department && !department.sub_departments.includes(selectedItem)
      );
    }
    setSelectedItems(updatedSelectedItems);
  };

  const isDepartmentSelected = (department) => {
    const subDepartments = department.sub_departments;
    return subDepartments.every((subDepartment) => selectedItems.includes(subDepartment));
  };

  // const isSubDepartmentSelected = (subDepartment) => {
  //   const department = departmentData.find((department) =>
  //     department.sub_departments.includes(subDepartment)
  //   );
  //   return (
  //     selectedItems.includes(subDepartment) &&
  //     department &&
  //     isDepartmentSelected(department)
  //   );
  // };

  const renderTreeItems = (items) => {
    return items.map((item) => {
      if (typeof item === 'string') {
        return (
          <TreeItem
            key={item}
            nodeId={item}
            label={
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedItems.includes(item)}
                    onChange={(event) => handleCheckboxChange(event, item)}
                  />
                }
                label={item}
              />
            }
          />
        );
      }

      const { department, sub_departments: subDepartments } = item;

      return (
        <TreeItem
          key={department}
          nodeId={department}
          label={
            <FormControlLabel
              control={
                <Checkbox
                  checked={isDepartmentSelected(item)}
                  onChange={(event) => handleDepartmentSelect(event, item)}
                />
              }
              label={department}
            />
          }
        >
          {renderTreeItems(subDepartments)}
        </TreeItem>
      );
    });
  };

  return (
    <div>
      <h2>Second Page - Component 1</h2>
      <div style={{ height: 400, width: '100%', marginBottom: '1rem' }}>
      <DataGrid rows={data} columns={columns} pageSize={5} checkboxSelection />
      </div>
      <h2>Second Page - Component 2</h2>
      <div>
        <Typography variant="h6">Departments and Sub-Departments</Typography>
        <TreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
          selected={selectedItems}
          onNodeSelect={handleTreeItemSelect}
        >
          {renderTreeItems(departmentData)}
        </TreeView>
      </div>
    </div>
  );
};

export default SecondPage;
