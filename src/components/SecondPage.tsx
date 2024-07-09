// src/components/SecondPage.tsx

import { Container } from '@mui/material';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Department } from '../models/Department';
import DepartmentSelection from './DepartmentSelection';
import PostTable from './PostTable';

const departmentsData: Department[] = [
    {
        id: 1,
        "name": "Customer Service",
        "subDepartments": [
          {id:1.1,name:"Support"},
          {id:1.2,name:"Customer Success"},
          
        ]
      },
      {
        id: 2,
        "name": "Design",
        "subDepartments": [
            {id:2.1,name:"Graphic Design"},
            {id:2.2,name:"Product Design"},
            {id:2.3,name:"Web Design"}
        ]
      }
];

const SecondPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      alert('Please enter your details before accessing this page.');
      navigate('/');
    }
  }, [navigate]);

  return (
    <Container>
      <h1>Second Page</h1>
      <PostTable />
      <DepartmentSelection departments={departmentsData} />
    </Container>
  );
};

export default SecondPage;
