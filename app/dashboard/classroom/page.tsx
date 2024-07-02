'use client';

import { SaebrsSummary } from '@/app/ui/dashboard/cards/population/saebrs-summary';
import { PopToRiskCharts } from '@/app/ui/dashboard/cards/population/demographics-summary';
import { CardDisciplinarySummary } from '@/app/ui/dashboard/cards/population/disciplinary-summary';
import { CardTestScoreSummary } from '@/app/ui/dashboard/cards/population/test-scores-summary';
import { CardConfidenceVisualizer } from '@/app/ui/dashboard/cards/general/card-confidence';
import { useState } from 'react';
import { CardThreeValue } from '@/app/ui/dashboard/cards/general/card-three-value';
import useRiskOptions from '@/hooks/useRiskOptions';
import useClassLevel from '@/hooks/useClassLevel';
import { useSearchContext } from '@/app/context/nav-search-context';
import Dropdown from '@/app/ui/Dropdown';
import { Card } from '@nextui-org/react';
import RiskDropdown from '@/app/ui/RiskDropDown';
import { BarChart } from '@/app/ui/charts/BarChart';
import { BarChartTotal } from '@/app/ui/charts/total-demographics-charts';

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
  const riskOptions = useRiskOptions();
  const classLevel = useClassLevel();
  console.log(classLevel);
  const classroom = useSearchContext('classroom');
  classroom.set;
  const selectedClass = classroom.get;

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

  const nameRisk = getCurrentState(genderState);

  if (!selectedClass || classLevel.confidenceLevel[selectedClass] === undefined)
    return (
      <div className="flex h-full items-center justify-center">
        <div>Enter the grade first</div>
      </div>
    );
  console.log(
    classLevel.saebrsEmotion[selectedClass]['saebrs_emo']['High Risk'],
  );
  return (
    <main>
      <div className="flex gap-4">
        {/* LEFT COL */}
        <div className="mb-4 flex basis-1/4 flex-col">
          <div className="flex flex-col">
            <div className="pb-4">
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

            <div className="pb-4">
              <CardConfidenceVisualizer
                missingVariables={1}
                confidence={classLevel.confidenceLevel[selectedClass]}
                confidenceThresholds={[1, 2, 3, 4, 5]}
              />
            </div>

            <div className="pb-4">
              <CardDisciplinarySummary
                title={'Disciplinary Action Summary'}
                valuesTop={[
                  classLevel.riskODR
                    ? classLevel.riskODR[selectedClass]['odr_risk'][
                        'Low Risk'
                      ] + '%'
                    : '0%',
                  classLevel.riskODR
                    ? classLevel.riskODR[selectedClass]['odr_risk'][
                        'Some Risk'
                      ] + '%'
                    : '0%',
                  classLevel.riskODR
                    ? classLevel.riskODR[selectedClass]['odr_risk'][
                        'High Risk'
                      ] + '%'
                    : '0%',
                ]}
                subtitlesTop={['Low', 'Some', 'High']}
                valuesBottom={[
                  classLevel.riskSuspension
                    ? classLevel.riskSuspension[selectedClass]['susp_risk'][
                        'Low Risk'
                      ] + '%'
                    : '0%',
                  classLevel.riskSuspension
                    ? classLevel.riskSuspension[selectedClass]['susp_risk'][
                        'Some Risk'
                      ] + '%'
                    : '0%',
                  classLevel.riskSuspension
                    ? classLevel.riskSuspension[selectedClass]['susp_risk'][
                        'High Risk'
                      ] + '%'
                    : '0%',
                ]}
                subtitlesBottom={['Low', 'Some', 'High']}
              />
            </div>

            <div className="-mb-8">
              <CardTestScoreSummary
                title={'Test Score Risk Summary'}
                valuesTop={[
                  classLevel.riskMath
                    ? classLevel.riskMath[selectedClass]['math_risk'][
                        'Low Risk'
                      ] + '%'
                    : '0%',
                  classLevel.riskMath
                    ? classLevel.riskMath[selectedClass]['math_risk'][
                        'Some Risk'
                      ] + '%'
                    : '0%',
                  classLevel.riskMath
                    ? classLevel.riskMath[selectedClass]['math_risk'][
                        'High Risk'
                      ] + '%'
                    : '0%',
                ]}
                subtitlesTop={['Low', 'Some', 'High']}
                valuesBottom={[
                  classLevel.riskReading
                    ? classLevel.riskReading[selectedClass]['read_risk'][
                        'Low Risk'
                      ] + '%'
                    : '0%',
                  classLevel.riskReading
                    ? classLevel.riskReading[selectedClass]['read_risk'][
                        'Some Risk'
                      ] + '%'
                    : '0%',
                  classLevel.riskReading
                    ? classLevel.riskReading[selectedClass]['read_risk'][
                        'High Risk'
                      ] + '%'
                    : '0%',
                ]}
                subtitlesBottom={['Low', 'Some', 'High']}
              />
            </div>
          </div>
        </div>
        <div className=" flex h-full w-full flex-col gap-y-28">
          <div className="flex h-full w-full items-center justify-end">
            <Dropdown riskOptions={riskOptions} />
          </div>

          <div className="flex justify-center">
            {riskOptions.isEthnicity && classLevel.ethnicityRisk && (
              <Card
                className=" -mb-4 mr-2 h-[26rem] w-8/12 rounded-xl bg-neutral-100 p-6"
                shadow="md"
              >
                <RiskDropdown
                  riskOptions={genderState}
                  setRiskOption={setGenderState}
                />
                <p className="-mb-8 p-2 text-xl font-bold">
                  Ethnicity and Risk
                </p>
                <p className="-mb-8 mt-6 pl-2 text-sm italic">
                  Distribution of those at risk for each ethnicity
                </p>
                <div className="mb-0 mt-auto flex h-full flex-col pt-10">
                  {nameRisk && (
                    <BarChart
                      data={Object.keys(
                        classLevel?.ethnicityRisk[selectedClass],
                      ).map((ele: any) => ({
                        id: ele,
                        'High Risk':
                          classLevel.ethnicityRisk[selectedClass][ele][
                            nameRisk
                          ]['High Risk'] / 100,
                        'Some Risk':
                          classLevel.ethnicityRisk[selectedClass][ele][
                            nameRisk
                          ]['Some Risk'] / 100,
                        'Low Risk':
                          classLevel.ethnicityRisk[selectedClass][ele][
                            nameRisk
                          ]['Low Risk'] / 100,
                      }))}
                      colors={colors}
                      legendVariable="Ethnicity"
                    />
                  )}
                </div>
              </Card>
            )}
            {riskOptions.isEnglishLeaner && classLevel.ellRisk && (
              <Card
                className=" -mb-4 mr-2 h-[26rem] w-8/12 rounded-xl bg-neutral-100 p-6"
                shadow="md"
              >
                <RiskDropdown
                  riskOptions={genderState}
                  setRiskOption={setGenderState}
                />
                <p className="-mb-8 p-2 text-xl font-bold">
                  English Learner and Risk
                </p>
                <p className="-mb-8 mt-6 pl-2 text-sm italic">
                  Distribution of those at risk for each english learner
                </p>
                <div className="mb-0 mt-auto flex h-full flex-col pt-10">
                  {nameRisk && (
                    <BarChart
                      data={Object.keys(classLevel?.ellRisk[selectedClass]).map(
                        (ele: any) => ({
                          id: ele === 'Yes' ? 'ELL' : 'Non-ELL',
                          'High Risk':
                            classLevel.ellRisk[selectedClass][ele][nameRisk][
                              'High Risk'
                            ] / 100,
                          'Some Risk':
                            classLevel.ellRisk[selectedClass][ele][nameRisk][
                              'Some Risk'
                            ] / 100,
                          'Low Risk':
                            classLevel.ellRisk[selectedClass][ele][nameRisk][
                              'Low Risk'
                            ] / 100,
                        }),
                      )}
                      colors={colors}
                      legendVariable="Ethnicity"
                    />
                  )}
                </div>
              </Card>
            )}
            {riskOptions.isGender && classLevel.genderRisk && (
              <Card
                className=" -mb-4 mr-2 h-[26rem] w-8/12 rounded-xl bg-neutral-100 p-6"
                shadow="md"
              >
                <RiskDropdown
                  riskOptions={genderState}
                  setRiskOption={setGenderState}
                />
                <p className="-mb-8 p-2 text-xl font-bold">Gender and Risk</p>
                <p className="-mb-8 mt-6 pl-2 text-sm italic">
                  Distribution of those at risk for each gender
                </p>
                <div className="mb-0 mt-auto flex h-full flex-col pt-10">
                  {nameRisk && (
                    <BarChart
                      data={Object.keys(
                        classLevel?.genderRisk[selectedClass],
                      ).map((ele: any) => ({
                        id: ele,
                        'High Risk':
                          classLevel.genderRisk[selectedClass][ele][nameRisk][
                            'High Risk'
                          ] / 100,
                        'Some Risk':
                          classLevel.genderRisk[selectedClass][ele][nameRisk][
                            'Some Risk'
                          ] / 100,
                        'Low Risk':
                          classLevel.genderRisk[selectedClass][ele][nameRisk][
                            'Low Risk'
                          ] / 100,
                      }))}
                      colors={colors}
                      legendVariable="Gender"
                    />
                  )}
                </div>
              </Card>
            )}
            {riskOptions.isTotalScore && 'No Total Chart'}
            {classLevel.saeberAcademic &&
              classLevel.mySaeberAcademic &&
              riskOptions.isAcademic && (
                <Card
                  className=" -mb-4 mr-2 h-[26rem] w-8/12 rounded-xl bg-neutral-100 p-6"
                  shadow="md"
                >
                  <p className="-mb-8 p-2 text-xl font-bold">
                    Academic and Risk
                  </p>
                  <p className="-mb-8 mt-6 pl-2 text-sm italic">
                    Distribution of those at risk for each academic performance
                  </p>
                  <div className="mb-0 mt-auto flex h-full flex-col pt-10">
                    <BarChart
                      data={[
                        {
                          id: 'Saebrs',
                          'High Risk':
                            classLevel.saeberAcademic[selectedClass][
                              'saebrs_aca'
                            ]['High Risk'] / 100,
                          'Some Risk':
                            classLevel.saeberAcademic[selectedClass][
                              'saebrs_aca'
                            ]['Some Risk'] / 100,
                          'Low Risk':
                            classLevel.saeberAcademic[selectedClass][
                              'saebrs_aca'
                            ]['Low Risk'] / 100,
                        },
                        {
                          id: 'MySaebrs',
                          'High Risk':
                            classLevel.mySaeberAcademic[selectedClass][
                              'mysaebrs_aca'
                            ]['High Risk'] / 100,
                          'Some Risk':
                            classLevel.mySaeberAcademic[selectedClass][
                              'mysaebrs_aca'
                            ]['Some Risk'] / 100,
                          'Low Risk':
                            classLevel.mySaeberAcademic[selectedClass][
                              'mysaebrs_aca'
                            ]['Low Risk'] / 100,
                        },
                      ]}
                      colors={colors}
                      legendVariable="Academic"
                    />
                  </div>
                </Card>
              )}
            {classLevel.saebrsEmotion &&
              classLevel.mySaebrsEmotion &&
              riskOptions.isEmotional && (
                <Card
                  className=" -mb-4 mr-2 h-[26rem] w-8/12 rounded-xl bg-neutral-100 p-6"
                  shadow="md"
                >
                  <p className="-mb-8 p-2 text-xl font-bold">
                    Emotional and Risk
                  </p>
                  <p className="-mb-8 mt-6 pl-2 text-sm italic">
                    Distribution of those at risk for each emotion
                  </p>
                  <div className="mb-0 mt-auto flex h-full flex-col pt-10">
                    <BarChart
                      data={[
                        {
                          id: 'Saebrs',
                          'High Risk':
                            classLevel.saebrsEmotion[selectedClass][
                              'saebrs_emo'
                            ]['High Risk'] / 100,
                          'Some Risk':
                            classLevel.saebrsEmotion[selectedClass][
                              'saebrs_emo'
                            ]['Some Risk'] / 100,
                          'Low Risk':
                            classLevel.saebrsEmotion[selectedClass][
                              'saebrs_emo'
                            ]['Low Risk'] / 100,
                        },
                        {
                          id: 'MySaebrs',
                          'High Risk':
                            classLevel.mySaebrsEmotion[selectedClass][
                              'mysaebrs_emo'
                            ]['High Risk'] / 100,
                          'Some Risk':
                            classLevel.mySaebrsEmotion[selectedClass][
                              'mysaebrs_emo'
                            ]['Some Risk'] / 100,
                          'Low Risk':
                            classLevel.mySaebrsEmotion[selectedClass][
                              'mysaebrs_emo'
                            ]['Low Risk'] / 100,
                        },
                      ]}
                      colors={colors}
                      legendVariable="Emotional"
                    />
                  </div>
                </Card>
              )}{' '}
            {classLevel.saeberSocial &&
              classLevel.mySaeberSocial &&
              riskOptions.isSocial && (
                <Card
                  className=" -mb-4 mr-2 h-[26rem] w-8/12 rounded-xl bg-neutral-100 p-6"
                  shadow="md"
                >
                  <p className="-mb-8 p-2 text-xl font-bold">Social and Risk</p>
                  <p className="-mb-8 mt-6 pl-2 text-sm italic">
                    Distribution of those at risk for each social skill
                  </p>
                  <div className="mb-0 mt-auto flex h-full flex-col pt-10">
                    <BarChart
                      data={[
                        {
                          id: 'Saebrs',
                          'High Risk':
                            classLevel.saeberSocial[selectedClass][
                              'saebrs_soc'
                            ]['High Risk'] / 100,
                          'Some Risk':
                            classLevel.saeberSocial[selectedClass][
                              'saebrs_soc'
                            ]['Some Risk'] / 100,
                          'Low Risk':
                            classLevel.saeberSocial[selectedClass][
                              'saebrs_soc'
                            ]['Low Risk'] / 100,
                        },
                        {
                          id: 'MySaebrs',
                          'High Risk':
                            classLevel.mySaeberSocial[selectedClass][
                              'mysaebrs_soc'
                            ]['High Risk'] / 100,
                          'Some Risk':
                            classLevel.mySaeberSocial[selectedClass][
                              'mysaebrs_soc'
                            ]['Some Risk'] / 100,
                          'Low Risk':
                            classLevel.mySaeberSocial[selectedClass][
                              'mysaebrs_soc'
                            ]['Low Risk'] / 100,
                        },
                      ]}
                      colors={colors}
                      legendVariable="Social"
                    />
                  </div>
                </Card>
              )}
          </div>
        </div>
      </div>
    </main>
  );
}
