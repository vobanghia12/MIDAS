'use client';
import { SaebrsSummary } from '@/app/ui/dashboard/cards/population/saebrs-summary';
import { CardDisciplinarySummary } from '@/app/ui/dashboard/cards/population/disciplinary-summary';
import { CardTestScoreSummary } from '@/app/ui/dashboard/cards/population/test-scores-summary';
import { CardConfidenceVisualizer } from '@/app/ui/dashboard/cards/general/card-confidence';
import { useState } from 'react';
import { CardThreeValue } from '@/app/ui/dashboard/cards/general/card-three-value';
import useGradeLevel from '@/hooks/useGradeLevel';
import { useSearchContext } from '@/app/context/nav-search-context';
import useRiskOptions from '@/hooks/useRiskOptions';
import { Card } from '@nextui-org/react';
import { BarChart } from '@/app/ui/charts/BarChart';
import { ethnicity, genders, ell } from '@/constants/constants';
import GradeSearchInputOnly from '@/app/ui/dashboard/cards/search/grade-search-input';
import GradeSearch from '@/app/ui/dashboard/cards/search/grade-search-card';
import useSchoolLevel from '@/hooks/useSchoolLevel';
function MidasRiskTooltipContent() {
  return (
    <div>Percentages of students at the three different MIDAS risk levels.</div>
  );
}

export default async function Page() {
  const [genderState, setGenderState] = useState({
    math_risk: false,
    read_risk: false,
    susp_risk: false,
  });
  const [ethnicityState, setEthnicityState] = useState({
    math_risk: false,
    read_risk: false,
    susp_risk: false,
  });

  const [ellState, setEllState] = useState({
    math_risk: false,
    read_risk: false,
    susp_risk: false,
  });
  const riskOptions = useRiskOptions();
  const gradeLevel = useGradeLevel();
  const grade = useSearchContext('grade');
  grade.set;
  const selectedGrade = grade.get;

  const [midasRisk, setMidasRisk] = useState({
    low: '45%',
    some: '40%',
    high: '15%',
  });

  const [disciplineRisk, setDisciplineRisk] = useState({
    odrZero: '77%',
    odrSome: '23%',
    suspZero: '80%',
    suspSome: '20%',
  });

  // ASK SONJA WHAT THE VALUES FOR TEST RISK ARE
  const [testRisk, setTestRisk] = useState({});

  const [saebrsRisk, setSaebrsRisk] = useState({
    saebrsTotal: ['60%', '25%', '15%'],
    mySaebrsTotal: ['54%', '33%', '13%'],
    saebrsEmotional: ['59%', '33%', '8%'],
    mySaebrsEmotional: ['50%', '37%', '13%'],
    saebrsSocial: ['40%', '41%', '19%'],
    mySaebrsSocial: ['40%', '39%', '17%'],
    saebrsAcademic: ['72%', '16%', '12%'],
    mySaebrsAcademic: ['70%', '18%', '12%'],
  });

  const getCurrentState = (states: any) => {
    const arr = Object.keys(states).filter((state: any) => {
      if (states[state]) return state;
    });

    if (arr) return arr[0];
    return undefined;
  };

  const colors = ['rose-500', 'yellow-400', 'green-500'];

  // Stops proceeding to dashboard before uploading data
  const schoolLevel = useSchoolLevel()
  if (schoolLevel.listOfAllStudents === undefined) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-2">
        <div>Please upload all of the data files first.</div>
      </div>
    );
  }

  // Stops proceeding to dashboard before selecting a grade level
  if (!selectedGrade) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-2">
        <div>Please enter a grade to view the dashboard.</div>
        <div className="w-1/4">
          <GradeSearchInputOnly
            selectedGrade={selectedGrade}
            setSelectedGrade={grade.set}
            gradeList={[
              '6',
              '7',
              '8'
            ]}
          />
        </div>
      </div>
    );
  }

  return (
    <main>
      <div className="flex h-full gap-4">
        {/* LEFT COL */}
        <div className="mb-4 flex basis-1/4 flex-col">
          <div className="flex flex-col gap-3 ">
            <GradeSearch
              selectedGrade={selectedGrade}
              setSelectedGrade={grade.set}
              gradeList={[
                '6',
                '7',
                '8',
              ]}
              classList={['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']}
            />

            <div className="">
              <CardThreeValue
                title="MIDAS Risk Scores"
                values={[
                  midasRisk['low'],
                  midasRisk['some'],
                  midasRisk['high'],
                ]}
                subtitles={['Low', 'Some', 'High']}
                tooltip={MidasRiskTooltipContent()}
              />
            </div>

            <div className="">
              <CardConfidenceVisualizer
                missingVariables={1}
                confidence={3}
                confidenceThresholds={[1, 2, 3, 4, 5]}
              />
            </div>

            <div className="">
              <CardDisciplinarySummary
                title={'Disciplinary Action Summary'}
                valuesTop={['76%', '24%']}
                subtitlesTop={['Zero', 'One Plus']}
                valuesBottom={['21%', '79%']}
                subtitlesBottom={['Zero', 'One Plus']}
              />
            </div>

            <div className="-mb-8">
              <CardTestScoreSummary
                title={'Test Score Risk Summary'}
                valuesTop={['60%', '40%']}
                subtitlesTop={['Low', 'Some']}
                valuesBottom={['55%', '45%']}
                subtitlesBottom={['Low', 'Some']}
              />
            </div>
          </div>
        </div>

        <div className="h-full w-full basis-3/4 flex-col">
          <div className="flex w-full flex-row gap-3">
            <div className="basis-1/4">
              <SaebrsSummary
                title={'Total'}
                valuesTop={['N/A', 'N/A', 'N/A']}
                subtitlesTop={['Low', 'Some', 'High']}
                valuesBottom={['N/A', 'N/A', 'N/A']}
                subtitlesBottom={['Low', 'Some', 'High']}
              />
            </div>
            <div className="basis-1/4">
              <SaebrsSummary
                title={'Social'}
                valuesTop={[
                  gradeLevel
                    ? gradeLevel.saeberSocial[selectedGrade]['saebrs_soc'][
                        'Low Risk'
                      ] + '%'
                    : '0%',
                  gradeLevel
                    ? gradeLevel.saeberSocial[selectedGrade]['saebrs_soc'][
                        'Some Risk'
                      ] + '%'
                    : '0%',
                  gradeLevel
                    ? gradeLevel.saeberSocial[selectedGrade]['saebrs_soc'][
                        'High Risk'
                      ] + '%'
                    : '0%',
                ]}
                subtitlesTop={['Low', 'Some', 'High']}
                valuesBottom={[
                  gradeLevel
                    ? gradeLevel.mySaebrsEmotion[selectedGrade]['mysaebrs_emo'][
                        'Low Risk'
                      ] + '%'
                    : '0%',
                  gradeLevel
                    ? gradeLevel.mySaebrsEmotion[selectedGrade]['mysaebrs_emo'][
                        'Some Risk'
                      ] + '%'
                    : '0%',
                  gradeLevel
                    ? gradeLevel.mySaebrsEmotion[selectedGrade]['mysaebrs_emo'][
                        'High Risk'
                      ] + '%'
                    : '0%',
                ]}
                subtitlesBottom={['Low', 'Some', 'High']}
              />
            </div>
            <div className="basis-1/4">
              <SaebrsSummary
                title={'Academic'}
                valuesTop={[
                  gradeLevel
                    ? gradeLevel.saeberAcademic[selectedGrade]['saebrs_aca'][
                        'Low Risk'
                      ] + '%'
                    : '0%',
                  gradeLevel
                    ? gradeLevel.saeberAcademic[selectedGrade]['saebrs_aca'][
                        'Some Risk'
                      ] + '%'
                    : '0%',
                  gradeLevel
                    ? gradeLevel.saeberAcademic[selectedGrade]['saebrs_aca'][
                        'High Risk'
                      ] + '%'
                    : '0%',
                ]}
                subtitlesTop={['Low', 'Some', 'High']}
                valuesBottom={[
                  gradeLevel
                    ? gradeLevel.mySaeberAcademic[selectedGrade][
                        'mysaebrs_aca'
                      ]['Low Risk'] + '%'
                    : '0%',
                  gradeLevel
                    ? gradeLevel.mySaeberAcademic[selectedGrade][
                        'mysaebrs_aca'
                      ]['Some Risk'] + '%'
                    : '0%',
                  gradeLevel
                    ? gradeLevel.mySaeberAcademic[selectedGrade][
                        'mysaebrs_aca'
                      ]['High Risk'] + '%'
                    : '0%',
                ]}
                subtitlesBottom={['Low', 'Some', 'High']}
              />
            </div>
            <div className="basis-1/4">
              <SaebrsSummary
                title={'Emotional'}
                valuesTop={[
                  gradeLevel
                    ? gradeLevel.saebrsEmotion[selectedGrade]['saebrs_emo'][
                        'Low Risk'
                      ] + '%'
                    : '0%',
                  gradeLevel
                    ? gradeLevel.saebrsEmotion[selectedGrade]['saebrs_emo'][
                        'Some Risk'
                      ] + '%'
                    : '0%',
                  gradeLevel
                    ? gradeLevel.saebrsEmotion[selectedGrade]['saebrs_emo'][
                        'High Risk'
                      ] + '%'
                    : '0%',
                ]}
                subtitlesTop={['Low', 'Some', 'High']}
                valuesBottom={[
                  gradeLevel
                    ? gradeLevel.mySaebrsEmotion[selectedGrade]['mysaebrs_emo'][
                        'Low Risk'
                      ] + '%'
                    : '0%',
                  gradeLevel
                    ? gradeLevel.mySaebrsEmotion[selectedGrade]['mysaebrs_emo'][
                        'Some Risk'
                      ] + '%'
                    : '0%',
                  gradeLevel
                    ? gradeLevel.mySaebrsEmotion[selectedGrade]['mysaebrs_emo'][
                        'High Risk'
                      ] + '%'
                    : '0%',
                ]}
                subtitlesBottom={['Low', 'Some', 'High']}
              />
            </div>
          </div>

          <div className="mt-16 flex flex-row justify-between gap-2">
            <Card
              className="-mt-12 flex h-[68vh] w-1/3 rounded-xl bg-neutral-100"
              shadow="md"
            >
              <p className="-mb-8 p-2 text-xl font-bold">Ethnicity and Risk</p>
              <p className="-mb-8 mt-6 pl-2 text-sm italic">
                Distribution of those at risk for each ethnicity
              </p>
              <div className="mb-0 mt-auto flex h-full flex-col pt-10">
                {
                  <BarChart
                    data={Object.keys(ethnicity).map((ele: any) => ({
                      id: ele,
                      'High Risk': ethnicity[ele]['High Risk'],
                      'Some Risk': ethnicity[ele]['Some Risk'],
                      'Low Risk': ethnicity[ele]['Low Risk'],
                    }))}
                    colors={colors}
                    legendVariable="Ethnicity"
                  />
                }
              </div>
            </Card>
            <Card
              className="-mt-12 flex h-[68vh] w-1/3 rounded-xl bg-neutral-100"
              shadow="md"
            >
              <p className="-mb-8 p-2 text-xl font-bold">
                English Learner and Risk
              </p>
              <p className="-mb-8 mt-6 pl-2 text-sm italic">
                Distribution of those at risk for each english learner
              </p>
              <div className="mb-0 mt-auto flex h-full flex-col pt-10">
                {
                  <BarChart
                    data={Object.keys(ell).map((ele: any) => ({
                      id: ele,
                      'High Risk': ell[ele]['High Risk'],
                      'Some Risk': ell[ele]['Some Risk'],
                      'Low Risk': ell[ele]['Low Risk'],
                    }))}
                    colors={colors}
                    legendVariable="Ell"
                  />
                }
              </div>
            </Card>
            <Card
              className="-mt-12 flex h-[68vh] w-1/3 rounded-xl bg-neutral-100"
              shadow="md"
            >
              <p className="-mb-8 p-2 text-xl font-bold">Gender and Risk</p>
              <p className="-mb-8 mt-6 pl-2 text-sm italic">
                Distribution of those at risk for each gender
              </p>
              <div className="mb-0 mt-auto flex h-full flex-col pt-10">
                {
                  <BarChart
                    data={Object.keys(genders).map((ele: any) => ({
                      id: ele,
                      'High Risk': genders[ele]['High Risk'],
                      'Some Risk': genders[ele]['Some Risk'],
                      'Low Risk': genders[ele]['Low Risk'],
                    }))}
                    colors={colors}
                    legendVariable="Gender"
                  />
                }
              </div>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
