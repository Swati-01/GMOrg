// src/models/Department.ts

export interface Department {
    id: number;
    name: string;
    subDepartments: SubDepartment[];
  }
  
  export interface SubDepartment {
    id: number;
    name: string;
  }
  