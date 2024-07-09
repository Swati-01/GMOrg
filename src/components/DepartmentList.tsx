// src/components/DepartmentList.tsx

import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Collapse, List, ListItem, ListItemText, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Department, SubDepartment } from '../models/Department'; // Ensure correct import path

interface DepartmentListProps {
  departments: Department[];
}

const DepartmentList: React.FC<DepartmentListProps> = ({ departments }) => {
  const [open, setOpen] = useState<number[]>([]);

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

  const renderSubDepartments = (subDepartments: SubDepartment[]) => (
    <List component="div" disablePadding>
      {subDepartments.map((subDept) => (
        <ListItem key={subDept.id} button sx={{ pl: 4 }}>
          <ListItemText primary={subDept.name} />
        </ListItem>
      ))}
    </List>
  );

  const renderDepartments = departments.map((dept) => (
    <div key={dept.id}>
      <ListItem button onClick={() => handleClick(dept.id)}>
        <ListItemText primary={dept.name} />
        {open.includes(dept.id) ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open.includes(dept.id)} timeout="auto" unmountOnExit>
        {renderSubDepartments(dept.subDepartments)}
      </Collapse>
    </div>
  ));

  return (
    <div>
      <Typography variant="h4" gutterBottom>Departments and Sub-Departments</Typography>
      <List component="nav" aria-labelledby="nested-list-subheader">
        {renderDepartments}
      </List>
    </div>
  );
};

export default DepartmentList;
