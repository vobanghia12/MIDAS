'use client';

import { CardMidasRisk } from '@/app/ui/dashboard/cards/individual/midas-summary';
import { SaebrsSummary } from '@/app/ui/dashboard/cards/individual/saebrs-summary';
import StudentSearch from '../../ui/dashboard/cards/search/student-search';
import { useEffect, useState } from 'react';
import useSchoolLevel from '@/hooks/useSchoolLevel';
import { useSearchContext } from '@/app/context/nav-search-context';
import { CardStudentDiscipline } from '@/app/ui/dashboard/cards/individual/disciplinary';
import { CardStudentTestScores } from '@/app/ui/dashboard/cards/individual/test-scores';
import { CardConfidenceVisualizer } from '@/app/ui/dashboard/cards/general/card-confidence';
import { nunito } from '@/app/ui/fonts';
import { Button } from '@/app/ui/button';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { postData } from '@/app/lib/helpers';
import { writeFile } from 'xlsx';

interface SearchProps {
  searchParams: {
    studentId: string;
  };
}

export default function Page({ searchParams }: SearchProps) {
  const schoolLevel = useSchoolLevel();
  const stateStudent = useSearchContext('student');
  const setSelectedStudent = stateStudent.set;
  const selectedStudent = stateStudent.get;

  const searchData = () => {
    const result = schoolLevel?.listOfAllStudents?.filter(
      (student: any) => student.studentid === selectedStudent,
    );

    if (result?.length > 0) return result[0];

    return '';
  };

  const computeConfidenceForEachStudent = (data: any) => {
    let confidence: number = 0;
    if (data) {
      confidence = Math.round(
        (data?.math_confidence +
          data?.susp_confidence +
          data?.read_confidence +
          data?.odr_confidence) /
          4,
      );
    }
    return confidence;
  };

  const data: any = searchData();

  let confidence: number = computeConfidenceForEachStudent(data);

  const [saebrsScores, setSaebrsScores] = useState({
    saebrsTotal: 'NA',
    mySaebrsTotal: 'NA',
    saebrsEmotional: 'NA',
    mySaebrsEmotional: 'NA',
    saebrsSocial: 'NA',
    mySaebrsSocial: 'NA',
    saebrsAcademic: 'NA',
    mySaebrsAcademic: 'NA',
  });

  const [midasSummary, setMidasSummary] = useState({
    midasRisk: 'NA',
    missingVariables: 1,
    confidence: 0,
    confidenceThreshold: [1, 2, 3, 4, 5],
  });

  const [identification, setIdentification] = useState({
    studentId: data?.studentid ?? 'NA',
    grade: data?.gradelevel ?? 'NA',
    classroomId: data?.classroom ?? 'NA',
  });

  const [demographics, setDemographics] = useState({
    gender: data?.gender ?? 'NA',
    ethnicity: data?.ethnicity ?? 'NA',
    englishLearner: data?.ell ?? 'NA',
  });

  const [testScoreRisk, setTestScoreRisk] = useState({
    math: data?.math_risk ?? 'NA',
    reading: data?.reading_risk ?? 'NA',
    suspension: 'NA',
    odr: 'NA',
  });

  useEffect(() => {
    setDemographics({
      gender: data?.gender ?? 'NA',
      ethnicity: data?.ethnicity ?? 'NA',
      englishLearner: data?.ell ?? 'NA',
    });

    setIdentification({
      studentId: data?.studentid ?? 'NA',
      grade: data?.gradelevel ?? 'NA',
      classroomId: data?.classroom ?? 'NA',
    });

    setSaebrsScores({
      saebrsTotal: 'NA',
      mySaebrsTotal: 'NA',
      saebrsEmotional: data?.saebrs_emo,
      mySaebrsEmotional: data?.mysaebrs_emo,
      saebrsSocial: data?.saebrs_soc,
      mySaebrsSocial: data?.mysaebrs_soc,
      saebrsAcademic: data?.saebrs_aca,
      mySaebrsAcademic: data?.mysaebrs_aca,
    });

    setTestScoreRisk({
      math: data?.math_risk ?? 'NA',
      reading: data?.read_risk ?? 'NA',
      suspension: data?.susp_risk ?? 'NA',
      odr: data?.odr_risk ?? 'NA',
    });

    setMidasSummary({
      midasRisk: 'NA',
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

  //handle export feature
  const handleExport = async (listStudents: any) => {
    const result = await postData({
      url: `http://localhost:3000/api/export`,
      data: { listStudents },
    });
    const res = writeFile(result, 'students.xlsx', {
      compression: true,
      type: 'file',
    });
  };
  return (
    <main className={`${nunito.className}`}>
      <div className="mb-10 flex w-full justify-end">
        <Button
          className="bg-[#1e8434] hover:bg-[#1e8434a1]"
          onClick={() => handleExport(schoolLevel?.listOfAllStudents)}
        >
          <ArrowDownTrayIcon className="w-6 pr-2" />
          <p>Export</p>
        </Button>
      </div>
      <div className="flex flex-col gap-4">
        {/* Top row */}
        <div className="flex w-full flex-row gap-8">
          <div className={`${nunito.className} flex w-full basis-1/3`}>
            <StudentSearch
              selectedStudent={selectedStudent}
              setSelectedStudent={setSelectedStudent}
              data={data}
            />
          </div>

          <div className="flex w-full basis-1/3">
            <CardStudentDiscipline
              odr={testScoreRisk.odr}
              suspensions={testScoreRisk.suspension}
            />
          </div>

          <div className="flex w-full basis-1/3">
            <CardStudentTestScores
              math={testScoreRisk.math}
              reading={testScoreRisk.reading}
            />
          </div>
        </div>

        {/* Second row */}
        <div className="flex w-full flex-row gap-4">
          <div className="flex basis-1/5 flex-col gap-2">
            <CardMidasRisk midasRisk={midasSummary.midasRisk} />
            <CardConfidenceVisualizer
              confidence={confidence}
              confidenceThresholds={[1, 2, 3, 4, 5]}
              missingVariables={0}
            />
          </div>

          <div className="flex w-max basis-4/5 flex-row">
            <SaebrsSummary
              saebrsTotal={saebrsScores.saebrsTotal}
              mySaebrsTotal={saebrsScores.mySaebrsTotal}
              saebrsEmotional={saebrsScores.saebrsEmotional}
              mySaebrsEmotional={saebrsScores.mySaebrsEmotional}
              saebrsSocial={saebrsScores.saebrsSocial}
              mySaebrsSocial={saebrsScores.mySaebrsSocial}
              saebrsAcademic={saebrsScores.saebrsAcademic}
              mySaebrsAcademic={saebrsScores.mySaebrsAcademic}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
