'use client';
import { SaebrsSummary } from '@/app/ui/dashboard/cards/population/saebrs-summary';
import { PopToRiskCharts } from '@/app/ui/dashboard/cards/population/demographics-summary';
import { CardDisciplinarySummary } from '@/app/ui/dashboard/cards/population/disciplinary-summary';
import { CardTestScoreSummary } from '@/app/ui/dashboard/cards/population/test-scores-summary';
import { CardConfidenceVisualizer } from '@/app/ui/dashboard/cards/general/card-confidence';
import { useState } from 'react';
import { CardThreeValue } from '@/app/ui/dashboard/cards/general/card-three-value';
import useGradeLevel from '@/hooks/useGradeLevel';
import { useSearchContext } from '@/app/context/nav-search-context';
import useRiskOptions from '@/hooks/useRiskOptions';
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

  const genderRisk = getCurrentState(genderState);
  const ellRisk = getCurrentState(ellState);
  const ethRisk = getCurrentState(ethnicityState);

  if (!selectedGrade || gradeLevel.confidenceLevel[selectedGrade] === undefined)
    return (
      <div className="flex h-full items-center justify-center">
        <div>Enter the grade first</div>
      </div>
    );
  console.log(
    gradeLevel.saebrsEmotion[selectedGrade]['saebrs_emo']['High Risk'],
  );
  return (
    <main>
      <div className="flex h-full gap-4">
        {/* LEFT COL */}
        <div className="mb-4 flex flex-col">
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
                confidence={gradeLevel.confidenceLevel[selectedGrade]}
                confidenceThresholds={[1, 2, 3, 4, 5]}
              />
            </div>

            <div className="pb-4">
              <CardDisciplinarySummary
                title={'Disciplinary Action Summary'}
                valuesTop={[
                  gradeLevel.riskODR
                    ? gradeLevel.riskODR[selectedGrade]['odr_risk'][
                        'Low Risk'
                      ] + '%'
                    : '0%',
                  gradeLevel.riskODR
                    ? gradeLevel.riskODR[selectedGrade]['odr_risk'][
                        'Some Risk'
                      ] + '%'
                    : '0%',
                  gradeLevel.riskODR
                    ? gradeLevel.riskODR[selectedGrade]['odr_risk'][
                        'High Risk'
                      ] + '%'
                    : '0%',
                ]}
                subtitlesTop={['Zero', 'One Plus', 'Zeo']}
                valuesBottom={[
                  gradeLevel.riskSuspension
                    ? gradeLevel.riskSuspension[selectedGrade]['susp_risk'][
                        'Low Risk'
                      ] + '%'
                    : '0%',
                  gradeLevel.riskSuspension
                    ? gradeLevel.riskSuspension[selectedGrade]['susp_risk'][
                        'Some Risk'
                      ] + '%'
                    : '0%',
                  gradeLevel.riskSuspension
                    ? gradeLevel.riskSuspension[selectedGrade]['susp_risk'][
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
                  gradeLevel.riskMath
                    ? gradeLevel.riskMath[selectedGrade]['math_risk'][
                        'Low Risk'
                      ] + '%'
                    : '0%',
                  gradeLevel.riskMath
                    ? gradeLevel.riskMath[selectedGrade]['math_risk'][
                        'Some Risk'
                      ] + '%'
                    : '0%',
                  gradeLevel.riskMath
                    ? gradeLevel.riskMath[selectedGrade]['math_risk'][
                        'High Risk'
                      ] + '%'
                    : '0%',
                ]}
                subtitlesTop={['Low', 'Some', 'High']}
                valuesBottom={[
                  gradeLevel.riskReading
                    ? gradeLevel.riskReading[selectedGrade]['read_risk'][
                        'Low Risk'
                      ] + '%'
                    : '0%',
                  gradeLevel.riskReading
                    ? gradeLevel.riskReading[selectedGrade]['read_risk'][
                        'Some Risk'
                      ] + '%'
                    : '0%',
                  gradeLevel.riskReading
                    ? gradeLevel.riskReading[selectedGrade]['read_risk'][
                        'High Risk'
                      ] + '%'
                    : '0%',
                ]}
                subtitlesBottom={['Low', 'Some', 'High']}
              />
            </div>
          </div>
        </div>
        <div className="h-full w-full flex-col">
          <div className="flex w-full justify-between">
            <div className="-mb-8">
              <SaebrsSummary
                title={'Total'}
                valuesTop={['N/A', 'N/A', 'N/A']}
                subtitlesTop={['Low', 'Some', 'High']}
                valuesBottom={['N/A', 'N/A', 'N/A']}
                subtitlesBottom={['Low', 'Some', 'High']}
              />
            </div>

            <div className="-mb-8">
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
                  gradeLevel.riskMath
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
            <div className="-mb-8">
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
                  gradeLevel.riskMath
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
                  gradeLevel.riskReading
                    ? gradeLevel.mySaebrsEmotion[selectedGrade]['mysaebrs_emo'][
                        'Some Risk'
                      ] + '%'
                    : '0%',
                  gradeLevel.riskReading
                    ? gradeLevel.mySaebrsEmotion[selectedGrade]['mysaebrs_emo'][
                        'High Risk'
                      ] + '%'
                    : '0%',
                ]}
                subtitlesBottom={['Low', 'Some', 'High']}
              />
            </div>
            <div className="-mb-8">
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
                  gradeLevel.riskMath
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
                  gradeLevel.riskReading
                    ? gradeLevel.mySaeberAcademic[selectedGrade][
                        'mysaebrs_aca'
                      ]['Some Risk'] + '%'
                    : '0%',
                  gradeLevel.riskReading
                    ? gradeLevel.mySaeberAcademic[selectedGrade][
                        'mysaebrs_aca'
                      ]['High Risk'] + '%'
                    : '0%',
                ]}
                subtitlesBottom={['Low', 'Some', 'High']}
              />
            </div>
          </div>
          <div className=" mt-16 flex justify-between">
            <Card
              className="-mb-4 mr-2 flex h-[31rem] w-1/3 rounded-xl bg-neutral-100 p-6 "
              shadow="md"
            >
              <RiskDropdown
                riskOptions={ethnicityState}
                setRiskOption={setEthnicityState}
              />
              <p className="-mb-8 p-2 text-xl font-bold">Ethnicity and Risk</p>
              <p className="-mb-8 mt-6 pl-2 text-sm italic">
                Distribution of those at risk for each ethnicity
              </p>
              <div className="mb-0 mt-auto flex h-full flex-col pt-10">
                {ethRisk && (
                  <BarChart
                    data={Object.keys(
                      gradeLevel?.ethnicityRisk[selectedGrade],
                    ).map((ele: any) => ({
                      id: ele,
                      'High Risk':
                        gradeLevel.ethnicityRisk[selectedGrade][ele][ethRisk][
                          'High Risk'
                        ] / 100,
                      'Some Risk':
                        gradeLevel.ethnicityRisk[selectedGrade][ele][ethRisk][
                          'Some Risk'
                        ] / 100,
                      'Low Risk':
                        gradeLevel.ethnicityRisk[selectedGrade][ele][ethRisk][
                          'Low Risk'
                        ] / 100,
                    }))}
                    colors={colors}
                    legendVariable="Ethnicity"
                  />
                )}
              </div>
            </Card>
            <Card
              className=" -mb-4 mr-2 h-[31rem] w-1/3 rounded-xl bg-neutral-100 p-6"
              shadow="md"
            >
              <RiskDropdown
                riskOptions={ellState}
                setRiskOption={setEllState}
              />
              <p className="-mb-8 p-2 text-xl font-bold">
                English Learner and Risk
              </p>
              <p className="-mb-8 mt-6 pl-2 text-sm italic">
                Distribution of those at risk for each english learner
              </p>
              <div className="mb-0 mt-auto flex h-full flex-col pt-10">
                {ellRisk && (
                  <BarChart
                    data={Object.keys(gradeLevel?.ellRisk[selectedGrade]).map(
                      (ele: any) => ({
                        id: ele === 'Yes' ? 'ELL' : 'Non-ELL',
                        'High Risk':
                          gradeLevel.ellRisk[selectedGrade][ele][ellRisk][
                            'High Risk'
                          ] / 100,
                        'Some Risk':
                          gradeLevel.ellRisk[selectedGrade][ele][ellRisk][
                            'Some Risk'
                          ] / 100,
                        'Low Risk':
                          gradeLevel.ellRisk[selectedGrade][ele][ellRisk][
                            'Low Risk'
                          ] / 100,
                      }),
                    )}
                    colors={colors}
                    legendVariable="Ell"
                  />
                )}
              </div>
            </Card>
            <Card
              className=" -mb-4 mr-2 h-[31rem] w-1/3 rounded-xl bg-neutral-100 p-6"
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
                {genderRisk && (
                  <BarChart
                    data={Object.keys(
                      gradeLevel?.genderRisk[selectedGrade],
                    ).map((ele: any) => ({
                      id: ele,
                      'High Risk':
                        gradeLevel.genderRisk[selectedGrade][ele][genderRisk][
                          'High Risk'
                        ] / 100,
                      'Some Risk':
                        gradeLevel.genderRisk[selectedGrade][ele][genderRisk][
                          'Some Risk'
                        ] / 100,
                      'Low Risk':
                        gradeLevel.genderRisk[selectedGrade][ele][genderRisk][
                          'Low Risk'
                        ] / 100,
                    }))}
                    colors={colors}
                    legendVariable="Gender"
                  />
                )}
              </div>
            </Card>
          </div>
        </div>

        {/* <div className=" flex h-full w-full flex-col gap-y-28">
          <div className="flex h-full w-full items-center justify-end">
            <Dropdown riskOptions={riskOptions} />
          </div>

          <div className="flex justify-center">
            {riskOptions.isEthnicity && gradeLevel.ethnicityRisk && (
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
                        gradeLevel?.ethnicityRisk[selectedGrade],
                      ).map((ele: any) => ({
                        id: ele,
                        'High Risk':
                          gradeLevel.ethnicityRisk[selectedGrade][ele][
                            nameRisk
                          ]['High Risk'] / 100,
                        'Some Risk':
                          gradeLevel.ethnicityRisk[selectedGrade][ele][
                            nameRisk
                          ]['Some Risk'] / 100,
                        'Low Risk':
                          gradeLevel.ethnicityRisk[selectedGrade][ele][
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
            {riskOptions.isEnglishLeaner && gradeLevel.ellRisk && (
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
                      data={Object.keys(gradeLevel?.ellRisk[selectedGrade]).map(
                        (ele: any) => ({
                          id: ele === 'Yes' ? 'ELL' : 'Non-ELL',
                          'High Risk':
                            gradeLevel.ellRisk[selectedGrade][ele][nameRisk][
                              'High Risk'
                            ] / 100,
                          'Some Risk':
                            gradeLevel.ellRisk[selectedGrade][ele][nameRisk][
                              'Some Risk'
                            ] / 100,
                          'Low Risk':
                            gradeLevel.ellRisk[selectedGrade][ele][nameRisk][
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
            {riskOptions.isGender && gradeLevel.genderRisk && (
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
                        gradeLevel?.genderRisk[selectedGrade],
                      ).map((ele: any) => ({
                        id: ele,
                        'High Risk':
                          gradeLevel.genderRisk[selectedGrade][ele][nameRisk][
                            'High Risk'
                          ] / 100,
                        'Some Risk':
                          gradeLevel.genderRisk[selectedGrade][ele][nameRisk][
                            'Some Risk'
                          ] / 100,
                        'Low Risk':
                          gradeLevel.genderRisk[selectedGrade][ele][nameRisk][
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
            {gradeLevel.saeberAcademic &&
              gradeLevel.mySaeberAcademic &&
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
                            gradeLevel.saeberAcademic[selectedGrade][
                              'saebrs_aca'
                            ]['High Risk'] / 100,
                          'Some Risk':
                            gradeLevel.saeberAcademic[selectedGrade][
                              'saebrs_aca'
                            ]['Some Risk'] / 100,
                          'Low Risk':
                            gradeLevel.saeberAcademic[selectedGrade][
                              'saebrs_aca'
                            ]['Low Risk'] / 100,
                        },
                        {
                          id: 'MySaebrs',
                          'High Risk':
                            gradeLevel.mySaeberAcademic[selectedGrade][
                              'mysaebrs_aca'
                            ]['High Risk'] / 100,
                          'Some Risk':
                            gradeLevel.mySaeberAcademic[selectedGrade][
                              'mysaebrs_aca'
                            ]['Some Risk'] / 100,
                          'Low Risk':
                            gradeLevel.mySaeberAcademic[selectedGrade][
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
            {gradeLevel.saebrsEmotion &&
              gradeLevel.mySaebrsEmotion &&
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
                            gradeLevel.saebrsEmotion[selectedGrade][
                              'saebrs_emo'
                            ]['High Risk'] / 100,
                          'Some Risk':
                            gradeLevel.saebrsEmotion[selectedGrade][
                              'saebrs_emo'
                            ]['Some Risk'] / 100,
                          'Low Risk':
                            gradeLevel.saebrsEmotion[selectedGrade][
                              'saebrs_emo'
                            ]['Low Risk'] / 100,
                        },
                        {
                          id: 'MySaebrs',
                          'High Risk':
                            gradeLevel.mySaebrsEmotion[selectedGrade][
                              'mysaebrs_emo'
                            ]['High Risk'] / 100,
                          'Some Risk':
                            gradeLevel.mySaebrsEmotion[selectedGrade][
                              'mysaebrs_emo'
                            ]['Some Risk'] / 100,
                          'Low Risk':
                            gradeLevel.mySaebrsEmotion[selectedGrade][
                              'mysaebrs_emo'
                            ]['Low Risk'] / 100,
                        },
                      ]}
                      colors={colors}
                      legendVariable="Emotional"
                    />
                  </div>
                </Card>
              )}
            {gradeLevel.saeberSocial &&
              gradeLevel.mySaeberSocial &&
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
                            gradeLevel.saeberSocial[selectedGrade][
                              'saebrs_soc'
                            ]['High Risk'] / 100,
                          'Some Risk':
                            gradeLevel.saeberSocial[selectedGrade][
                              'saebrs_soc'
                            ]['Some Risk'] / 100,
                          'Low Risk':
                            gradeLevel.saeberSocial[selectedGrade][
                              'saebrs_soc'
                            ]['Low Risk'] / 100,
                        },
                        {
                          id: 'MySaebrs',
                          'High Risk':
                            gradeLevel.mySaeberSocial[selectedGrade][
                              'mysaebrs_soc'
                            ]['High Risk'] / 100,
                          'Some Risk':
                            gradeLevel.mySaeberSocial[selectedGrade][
                              'mysaebrs_soc'
                            ]['Some Risk'] / 100,
                          'Low Risk':
                            gradeLevel.mySaeberSocial[selectedGrade][
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
        </div> */}
      </div>
    </main>
  );
}
