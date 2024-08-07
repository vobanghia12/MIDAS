'use client';

import { SaebrsSummary } from '@/app/ui/dashboard/cards/population/saebrs-summary';
import { PopToRiskCharts } from '@/app/ui/dashboard/cards/population/demographics-summary';
import { CardDisciplinarySummary } from '@/app/ui/dashboard/cards/population/disciplinary-summary';
import { CardTestScoreSummary } from '@/app/ui/dashboard/cards/population/test-scores-summary';
import { CardConfidenceVisualizer } from '@/app/ui/dashboard/cards/general/card-confidence';
import { useEffect, useState } from 'react';
import { CardThreeValue } from '@/app/ui/dashboard/cards/general/card-three-value';
import { Card, CardHeader, Tooltip } from '@nextui-org/react';
import useSchoolLevel from '@/hooks/useSchoolLevel';
import { BarChart } from '@/app/ui/charts/BarChart';
import { ethnicity, genders, ell } from '@/constants/constants';
function MidasRiskTooltipContent() {
  return (
    <div>Percentages of students at the three different MIDAS risk levels.</div>
  );
}

export default async function Page() {
  const schoolLevel = useSchoolLevel();
  console.log(schoolLevel);

  const [genderState, setGenderState] = useState({
    math_risk: false,
    read_risk: false,
    susp_risk: false,
  });

  const [ellState, setEllState] = useState({
    math_risk: false,
    read_risk: false,
    susp_risk: false,
  });
  const [midasRisk, setMidasRisk] = useState({
    low: '45%',
    some: '40%',
    high: '15%',
  });

  const getCurrentState = (states: any) => {
    const arr = Object.keys(states).filter((state: any) => {
      if (states[state]) return state;
    });

    if (arr) return arr[0];
    return undefined;
  };

  if (schoolLevel.listOfAllStudents === undefined) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-2">
        <div>Please upload all of the data files first.</div>
      </div>
    );
  }

  const colors = ['rose-500', 'yellow-400', 'green-500'];

  const genderRisk = getCurrentState(genderState);
  return (
    <main>
      <div className="flex gap-4">
        {/* LEFT COL */}

        <div className="mb-4 flex basis-1/4 flex-col">
          <div className="flex flex-col gap-3 ">
            <Card className="w-full bg-neutral-100" shadow="md">
              <CardHeader>
                <h3 className="text-lg font-medium text-slate-800">
                  Currently viewing school page{' '}
                </h3>
              </CardHeader>
            </Card>
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
                missingVariables={0}
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
        {schoolLevel?.saebrsEmotion && (
          <div className="h-full w-full basis-3/4 flex-col">
            <div className="-mb-8 flex w-full flex-row gap-3">
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
                    schoolLevel
                      ? schoolLevel.saeberSocial['Saebrs']['Low Risk'] + '%'
                      : '0%',
                    schoolLevel
                      ? schoolLevel.saeberSocial['Saebrs']['Some Risk'] + '%'
                      : '0%',
                    schoolLevel
                      ? schoolLevel.saeberSocial['Saebrs']['High Risk'] + '%'
                      : '0%',
                  ]}
                  subtitlesTop={['Low', 'Some', 'High']}
                  valuesBottom={[
                    schoolLevel
                      ? schoolLevel.mySaeberSocial['MySaebrs']['Low Risk'] + '%'
                      : '0%',
                    schoolLevel
                      ? schoolLevel.mySaeberSocial['MySaebrs']['Some Risk'] +
                        '%'
                      : '0%',
                    schoolLevel
                      ? schoolLevel.mySaeberSocial['MySaebrs']['High Risk'] +
                        '%'
                      : '0%',
                  ]}
                  subtitlesBottom={['Low', 'Some', 'High']}
                />
              </div>
              <div className="basis-1/4">
                <SaebrsSummary
                  title={'Academic'}
                  valuesTop={[
                    schoolLevel
                      ? schoolLevel.saeberAcademic['Saebrs']['Low Risk'] + '%'
                      : '0%',
                    schoolLevel
                      ? schoolLevel.saeberAcademic['Saebrs']['Some Risk'] + '%'
                      : '0%',
                    schoolLevel
                      ? schoolLevel.saeberAcademic['Saebrs']['High Risk'] + '%'
                      : '0%',
                  ]}
                  subtitlesTop={['Low', 'Some', 'High']}
                  valuesBottom={[
                    schoolLevel
                      ? schoolLevel.mySaeberAcademic['MySaebrs']['Low Risk'] +
                        '%'
                      : '0%',
                    schoolLevel
                      ? schoolLevel.mySaeberAcademic['MySaebrs']['Some Risk'] +
                        '%'
                      : '0%',
                    schoolLevel
                      ? schoolLevel.mySaeberAcademic['MySaebrs']['High Risk'] +
                        '%'
                      : '0%',
                  ]}
                  subtitlesBottom={['Low', 'Some', 'High']}
                />
              </div>
              <div className="basis-1/4">
                <SaebrsSummary
                  title={'Emotional'}
                  valuesTop={[
                    schoolLevel
                      ? schoolLevel.saebrsEmotion['Saebrs']['Low Risk'] + '%'
                      : '0%',
                    schoolLevel
                      ? schoolLevel.saebrsEmotion['Saebrs']['Some Risk'] + '%'
                      : '0%',
                    schoolLevel
                      ? schoolLevel.saebrsEmotion['Saebrs']['High Risk'] + '%'
                      : '0%',
                  ]}
                  subtitlesTop={['Low', 'Some', 'High']}
                  valuesBottom={[
                    schoolLevel
                      ? schoolLevel.mySaebrsEmotion['MySaebrs']['Low Risk'] +
                        '%'
                      : '0%',
                    schoolLevel
                      ? schoolLevel.mySaebrsEmotion['MySaebrs']['Some Risk'] +
                        '%'
                      : '0%',
                    schoolLevel
                      ? schoolLevel.mySaebrsEmotion['MySaebrs']['High Risk'] +
                        '%'
                      : '0%',
                  ]}
                  subtitlesBottom={['Low', 'Some', 'High']}
                />
              </div>
            </div>

            <div className="mt-16 flex justify-between gap-2">
              <Card
                className="-mt-4 flex h-[68vh] w-[550px] rounded-xl bg-neutral-100"
                shadow="md"
              >
                <p className="-mb-8 p-2 text-xl font-bold">
                  Ethnicity and Risk
                </p>
                <p className="-mb-8 mt-6 pl-2 text-sm italic">
                  Distribution of those at risk for each ethnicity
                </p>
                <div className="mb-0 mt-auto flex h-full flex-col pt-10 ">
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
                className="-mt-4 flex h-[68vh] w-[400px] rounded-xl bg-neutral-100"
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
                      legendVariable="ELL"
                    />
                  }
                </div>
              </Card>
              <Card
                className="-mt-4 flex h-[68vh] w-[400px] rounded-xl bg-neutral-100"
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
        )}

        {/* <div className=" flex h-full w-full flex-col gap-y-28">
          <div className="flex h-full w-full items-center justify-end">
            <Dropdown riskOptions={riskOptions} />
          </div>

          <div className="flex justify-center">
            {riskOptions.isEthnicity && schooLevel.ethnicityRisk && (
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
                      data={Object.keys(schooLevel?.ethnicityRisk).map(
                        (ele: any) => ({
                          id: ele,
                          'High Risk':
                            schooLevel.ethnicityRisk[ele][nameRisk][
                              'High Risk'
                            ] / 100,
                          'Some Risk':
                            schooLevel.ethnicityRisk[ele][nameRisk][
                              'Some Risk'
                            ] / 100,
                          'Low Risk':
                            schooLevel.ethnicityRisk[ele][nameRisk][
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
            {riskOptions.isEnglishLeaner && schooLevel.ellRisk && (
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
                      data={Object.keys(schooLevel?.ellRisk).map(
                        (ele: any) => ({
                          id: ele === 'Yes' ? 'ELL' : 'Non-ELL',
                          'High Risk':
                            schooLevel.ellRisk[ele][nameRisk]['High Risk'] /
                            100,
                          'Some Risk':
                            schooLevel.ellRisk[ele][nameRisk]['Some Risk'] /
                            100,
                          'Low Risk':
                            schooLevel.ellRisk[ele][nameRisk]['Low Risk'] / 100,
                        }),
                      )}
                      colors={colors}
                      legendVariable="Ethnicity"
                    />
                  )}
                </div>
              </Card>
            )}
            {riskOptions.isGender && schooLevel.genderRisk && (
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
                      data={Object.keys(schooLevel?.genderRisk).map(
                        (ele: any) => ({
                          id: ele,
                          'High Risk':
                            schooLevel.genderRisk[ele][nameRisk]['High Risk'] /
                            100,
                          'Some Risk':
                            schooLevel.genderRisk[ele][nameRisk]['Some Risk'] /
                            100,
                          'Low Risk':
                            schooLevel.genderRisk[ele][nameRisk]['Low Risk'] /
                            100,
                        }),
                      )}
                      colors={colors}
                      legendVariable="Gender"
                    />
                  )}
                </div>
              </Card>
            )}
            {riskOptions.isTotalScore && 'No Chart Total'}
            {schooLevel.saeberAcademic &&
              schooLevel.mySaeberAcademic &&
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
                            schooLevel.saeberAcademic['Saebrs']['High Risk'] /
                            100,
                          'Some Risk':
                            schooLevel.saeberAcademic['Saebrs']['Some Risk'] /
                            100,
                          'Low Risk':
                            schooLevel.saeberAcademic['Saebrs']['Low Risk'] /
                            100,
                        },
                        {
                          id: 'MySaebrs',
                          'High Risk':
                            schooLevel.mySaeberAcademic['MySaebrs'][
                              'High Risk'
                            ] / 100,
                          'Some Risk':
                            schooLevel.mySaeberAcademic['MySaebrs'][
                              'Some Risk'
                            ] / 100,
                          'Low Risk':
                            schooLevel.mySaeberAcademic['MySaebrs'][
                              'Low Risk'
                            ] / 100,
                        },
                      ]}
                      colors={colors}
                      legendVariable="Academic"
                    />
                  </div>
                </Card>
              )}
            {schooLevel.saebrsEmotion &&
              schooLevel.mySaebrsEmotion &&
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
                            schooLevel.saebrsEmotion['Saebrs']['High Risk'] /
                            100,
                          'Some Risk':
                            schooLevel.saebrsEmotion['Saebrs']['Some Risk'] /
                            100,
                          'Low Risk':
                            schooLevel.saebrsEmotion['Saebrs']['Low Risk'] /
                            100,
                        },
                        {
                          id: 'MySaebrs',
                          'High Risk':
                            schooLevel.mySaebrsEmotion['MySaebrs'][
                              'High Risk'
                            ] / 100,
                          'Some Risk':
                            schooLevel.mySaebrsEmotion['MySaebrs'][
                              'Some Risk'
                            ] / 100,
                          'Low Risk':
                            schooLevel.mySaebrsEmotion['MySaebrs']['Low Risk'] /
                            100,
                        },
                      ]}
                      colors={colors}
                      legendVariable="Emotional"
                    />
                  </div>
                </Card>
              )}
            {schooLevel.saeberSocial &&
              schooLevel.mySaeberSocial &&
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
                            schooLevel.saeberSocial['Saebrs']['High Risk'] /
                            100,
                          'Some Risk':
                            schooLevel.saeberSocial['Saebrs']['Some Risk'] /
                            100,
                          'Low Risk':
                            schooLevel.saeberSocial['Saebrs']['Low Risk'] / 100,
                        },
                        {
                          id: 'MySaebrs',
                          'High Risk':
                            schooLevel.mySaeberSocial['MySaebrs']['High Risk'] /
                            100,
                          'Some Risk':
                            schooLevel.mySaeberSocial['MySaebrs']['Some Risk'] /
                            100,
                          'Low Risk':
                            schooLevel.mySaeberSocial['MySaebrs']['Low Risk'] /
                            100,
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
