import React, { useState } from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Checkbox, Collapse } from '@mui/material';

const DepartmentList = () => {
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);

  const departments = [
    {
      department: 'customer_service',
      sub_departments: ['support', 'customer_success'],
    },
    {
      department: 'design',
      sub_departments: ['graphic_design', 'product_design', 'web_design'],
    },
  ];

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleExpand = (value) => () => {
    const currentIndex = expanded.indexOf(value);
    const newExpanded = [...expanded];

    if (currentIndex === -1) {
      newExpanded.push(value);
    } else {
      newExpanded.splice(currentIndex, 1);
    }

    setExpanded(newExpanded);
  };

  const handleSelectAllSubDepartments = (department) => () => {
    const allSubDepartmentsSelected =
      department.sub_departments.every((subDepartment) => checked.includes(subDepartment)) &&
      checked.includes(department.department);

    const newChecked = [...checked];

    if (allSubDepartmentsSelected) {
      // Deselect all sub-departments
      department.sub_departments.forEach((subDepartment) => {
        const index = newChecked.indexOf(subDepartment);
        if (index !== -1) {
          newChecked.splice(index, 1);
        }
      });
    } else {
      // Select all sub-departments
      department.sub_departments.forEach((subDepartment) => {
        if (!newChecked.includes(subDepartment)) {
          newChecked.push(subDepartment);
        }
      });
    }

    // Toggle the department checkbox
    const departmentIndex = newChecked.indexOf(department.department);
    if (departmentIndex === -1) {
      newChecked.push(department.department);
    } else {
      newChecked.splice(departmentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <div>
      <h2>Second Page - Component 2</h2>
      <List>
        {departments.map((department) => (
          <div key={department.department}>
            <ListItem
              button
              onClick={handleExpand(department.department)}
              dense
              disableRipple
              disableGutters
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={
                    checked.includes(department.department) &&
                    department.sub_departments.every((subDepartment) =>
                      checked.includes(subDepartment)
                    )
                  }
                  onChange={handleSelectAllSubDepartments(department)}
                />
              </ListItemIcon>
              <ListItemText primary={department.department} />
            </ListItem>
            <Collapse in={expanded.includes(department.department)} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {department.sub_departments.map((subDepartment) => (
                  <ListItem
                    key={subDepartment}
                    button
                    onClick={handleToggle(subDepartment)}
                    dense
                    disableRipple
                    disableGutters
                  >
                    <ListItemIcon>
                      <Checkbox edge="start" checked={checked.includes(subDepartment)} />
                    </ListItemIcon>
                    <ListItemText primary={subDepartment} />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </div>
        ))}
      </List>
    </div>
  );
};

export default DepartmentList;
