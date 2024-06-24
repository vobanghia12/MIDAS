'use client';

import { ReactNode, useState } from "react";
import { SearchContext } from "./nav-search-context";


export const SearchContextProvider = ({ children }: {children: ReactNode}) => {
  const [ selectedSchool, setSelectedSchool ] = useState<string>('');
  const [ selectedGrade, setSelectedGrade ] = useState<string>('');
  const [ selectedClassroom, setSelectedClassroom ] = useState<string>('');
  const [ selectedStudent, setSelectedStudy ] = useState<string>('');

  return (
    <SearchContext.Provider value={{ 
        school: [ selectedSchool, setSelectedSchool ], 
        grade: [ selectedGrade, setSelectedGrade ], 
        classroom: [ selectedClassroom, setSelectedClassroom ], 
        student: [ selectedStudent, setSelectedStudy ] 
      }}>
      {children}
    </SearchContext.Provider>
  );
};
