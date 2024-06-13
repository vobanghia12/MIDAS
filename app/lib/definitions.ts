// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
/*
id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        school TEXT NOT NULL,
        odr TEXT NOT NULL,
        suspensions TEXT NOT NULL,
        gender TEXT NOT NULL,
        ethnicity TEXT NOT NULL,
        english_learner BOOLEAN NOT NULL,
        grade TEXT NOT NULL,
        mysaebrs_emo TEXT NOT NULL,
        mysaebrs_soc TEXT NOT NULL,
        mysaebrs_aca TEXT NOT NULL,
        saebrs_emo TEXT NOT NULL,
        saebrs_soc TEXT NOT NULL,
        saebrs_aca TEXT NOT NULL, 
        read_risk TEXT NOT NULL,
        math_risk TEXT NOT NULL
*/

export type Student = {
  id: string;
  school: string;
  odr: string;
  suspensions: string;
  gender: string;
  ethnicity: string;
  english_learner: boolean;
  grade: string;
  mysaebrs_emo: string;
  mysaebrs_soc: string;
  mysaebrs_aca: string;
  saebrs_emo: string;
  saebrs_soc: string;
  saebrs_aca: string;
  read_risk: string;
  math_risk: string;
}

export type SchoolField = {
  id: string;
  name: string;
};
