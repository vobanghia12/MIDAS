'use client';

import { CardMidasRisk } from '@/app/ui/dashboard/cards/individual/midas-summary';
import { SaebrsSummary } from '@/app/ui/dashboard/cards/individual/saebrs-summary';
import StudentSearch from '../../ui/dashboard/student-search';
import { UserCircleIcon } from '@heroicons/react/24/outline';

import { CardTripleStack } from '@/app/ui/dashboard/cards';
import { CardStudentDemographics } from '@/app/ui/dashboard/cards/individual/student-demographics';
import { CardTestsAndDisciplineSummary } from '@/app/ui/dashboard/cards/individual/tests-discipline-summary';
import { useEffect, useState } from 'react';
import useSchoolLevel from '@/hooks/useSchoolLevel';

interface SearchProps {
  searchParams: {
    studentId: string;
  };
}

export default async function Page({ searchParams }: SearchProps) {
  const schoolLevel = useSchoolLevel();

  const searchData = () => {
    const result = schoolLevel?.listOfAllStudents?.filter(
      (student: any) => student.studentid === searchParams.studentId,
    );

    if (result?.length > 0) return result[0];

    return '';
  };

  const data: any = searchData();
  console.log(data);
  console.log(schoolLevel.listOfAllStudents);

  console.log(searchParams.studentId);

  const [saebrsScores, setSaebrsScores] = useState({
    saebrsTotal: '',
    mySaebrsTotal: '',
    saebrsEmotional: '',
    mySaebrsEmotional: '',
    saebrsSocial: '',
    mySaebrsSocial: '',
    saebrsAcademic: '',
    mySaebrsAcademic: '',
  });

  const [midasSummary, setMidasSummary] = useState({
    midasRisk: '',
    missingVariables: 1,
    confidence: 0,
    confidenceThreshold: [1, 2, 3, 4, 5],
  });

  const [identification, setIdentification] = useState({
    studentId: data?.studentid ?? '',
    grade: data?.gradelevel ?? '',
    classroomId: data?.classroom ?? '',
  });

  const [demographics, setDemographics] = useState({
    gender: data?.gender ?? '',
    ethnicity: data?.ethnicity ?? '',
    englishLearner: data?.ell ?? '',
  });

  const [testScoreRisk, setTestScoreRisk] = useState({
    math: data?.math_risk ?? '',
    reading: data?.reading_risk ?? '',
    suspension: '',
  });

  useEffect(() => {
    setDemographics({
      gender: data?.gender ?? '',
      ethnicity: data?.ethnicity ?? '',
      englishLearner: data?.ell ?? '',
    });

    setIdentification({
      studentId: data?.studentid ?? '',
      grade: data?.gradelevel ?? '',
      classroomId: data?.classroom ?? '',
    });

    setSaebrsScores({
      saebrsTotal: '',
      mySaebrsTotal: '',
      saebrsEmotional: data?.saebrs_emo,
      mySaebrsEmotional: data?.mysaebrs_emo,
      saebrsSocial: data?.saebrs_soc,
      mySaebrsSocial: data?.mysaebrs_soc,
      saebrsAcademic: data?.saebrs_aca,
      mySaebrsAcademic: data?.mysaebrs_aca,
    });

    setTestScoreRisk({
      math: data?.math_risk ?? '',
      reading: data?.read_risk ?? '',
      suspension: data?.susp_risk ?? '',
    });

    setMidasSummary({
      midasRisk: '',
      missingVariables: 1,
      confidence:
        Math.round(
          (data?.math_confidence +
            data?.read_confidence +
            data?.susp_confidence) /
            3,
        ) ?? 0,
      confidenceThreshold: [1, 2, 3, 4, 5],
    });
  }, [data]);
  // Fetch functions here for states

  return (
    <main className="mt-4">
      <div className="mb-8 flex flex-row">
        <div className="mr-4 flex basis-1/4 flex-col items-center">
          <StudentSearch></StudentSearch>
          <div className="h-52 w-52 border-2 border-solid border-gray-500 shadow-md">
            <UserCircleIcon className=" text-gray-700 subpixel-antialiased shadow-lg" />
          </div>
        </div>

        <div className="basis-1/4 pr-4">
          <CardMidasRisk
            midasRisk={midasSummary['midasRisk']}
            missingVariablesCount={midasSummary['missingVariables']}
            confidence={midasSummary['confidence']}
            confidenceThresholds={midasSummary['confidenceThreshold']}
          />
        </div>

        <div className="mx-4 flex basis-1/4 flex-col rounded-xl shadow-lg">
          <CardTripleStack
            title={'Student Information'}
            subtitles={['Student ID', 'Grade', 'Classroom ID']}
            values={[
              identification['studentId'],
              identification['grade'],
              identification['classroomId'],
            ]}
            capitalize={true}
          />
        </div>

        <div className="mx-4 flex basis-1/4 flex-col rounded-xl shadow-lg">
          <CardStudentDemographics
            title={'Student Demographics'}
            subtitles={['Gender', 'Ethnicity', 'English Learner?']}
            values={[
              demographics['gender'],
              demographics['ethnicity'],
              demographics['englishLearner'],
            ]}
            capitalize={true}
          />
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex flex-row">
          <div className="basis-3/4">
            <SaebrsSummary
              saebrsTotal={saebrsScores['saebrsTotal']}
              mySaebrsTotal={saebrsScores['mySaebrsTotal']}
              saebrsEmotional={saebrsScores['saebrsEmotional']}
              mySaebrsEmotional={saebrsScores['mySaebrsEmotional']}
              saebrsSocial={saebrsScores['saebrsSocial']}
              mySaebrsSocial={saebrsScores['mySaebrsSocial']}
              saebrsAcademic={saebrsScores['saebrsAcademic']}
              mySaebrsAcademic={saebrsScores['mySaebrsAcademic']}
            />
          </div>

          <div className="mx-4 flex basis-1/4 flex-col rounded-xl">
            <CardTestsAndDisciplineSummary
              title="Test"
              subtitlesTop={['Math', 'Reading']}
              subtitlesBottom={['ODR', 'Suspensions']}
              valuesTop={[testScoreRisk.math, testScoreRisk.reading]}
              valuesBottom={['', testScoreRisk.suspension]}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
