// src/components/DepartmentSelection.tsx

import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Checkbox, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Department, SubDepartment } from '../models/Department'; // Ensure correct import path

interface DepartmentSelectionProps {
  departments: Department[];
}

const DepartmentSelection: React.FC<DepartmentSelectionProps> = ({ departments }) => {
  const [selected, setSelected] = useState<number[]>([]);
  const [open, setOpen] = useState<number[]>([]);

  const handleToggle = (id: number) => () => {
    const currentIndex = selected.indexOf(id);
    const newSelected = [...selected];

    if (currentIndex === -1) {
      newSelected.push(id);
    } else {
      newSelected.splice(currentIndex, 1);
    }

    setSelected(newSelected);
  };

  const handleClick = (id: number) => {
    const currentIndex = open.indexOf(id);
    const newOpen = [...open];

    if (currentIndex === -1) {
      newOpen.push(id);
    } else {
      newOpen.splice(currentIndex, 1);
    }

    setOpen(newOpen);
  };

  const isSelected = (id: number) => selected.indexOf(id) !== -1;
  const isSubSelected = (subDepartments: SubDepartment[]) =>
    subDepartments.every(subDept => selected.indexOf(subDept.id) !== -1);

  const renderSubDepartments = (subDepartments: SubDepartment[]) => (
    <List disablePadding>
      {subDepartments.map(subDept => (
        <ListItem key={subDept.id} button onClick={handleToggle(subDept.id)} sx={{ pl: 4 }}>
          <ListItemIcon>
            <Checkbox
              edge="start"
              checked={isSelected(subDept.id)}
              tabIndex={-1}
              disableRipple
              inputProps={{ 'aria-labelledby': `checkbox-list-label-${subDept.id}` }}
            />
          </ListItemIcon>
          <ListItemText id={`checkbox-list-label-${subDept.id}`} primary={subDept.name} />
        </ListItem>
      ))}
    </List>
  );

  const renderDepartments = departments.map(dept => (
    <div key={dept.id}>
      <ListItem button onClick={() => handleClick(dept.id)}>
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={isSubSelected(dept.subDepartments)}
            tabIndex={-1}
            disableRipple
            inputProps={{ 'aria-labelledby': `checkbox-list-label-${dept.id}` }}
          />
        </ListItemIcon>
        <ListItemText id={`checkbox-list-label-${dept.id}`} primary={dept.name} />
        {open.includes(dept.id) ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      {open.includes(dept.id) && renderSubDepartments(dept.subDepartments)}
    </div>
  ));

  return (
    <div>
      <Typography variant="h4" gutterBottom>Select Departments and Sub-Departments</Typography>
      <List component="nav" aria-labelledby="nested-list-subheader">
        {renderDepartments}
      </List>
    </div>
  );
};

export default DepartmentSelection;
