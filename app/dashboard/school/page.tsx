'use client';

import { SaebrsSummary } from '@/app/ui/dashboard/cards/population/saebrs-summary';
import { PopToRiskCharts } from '@/app/ui/dashboard/cards/population/demographics-summary';
import { CardDisciplinarySummary } from '@/app/ui/dashboard/cards/population/disciplinary-summary';
import { CardTestScoreSummary } from '@/app/ui/dashboard/cards/population/test-scores-summary';
import { CardConfidenceVisualizer } from '@/app/ui/dashboard/cards/general/card-confidence';
import { SetStateAction, useEffect, useState } from 'react';
import { CardThreeValue } from '@/app/ui/dashboard/cards/general/card-three-value';
import { Card, Tooltip } from '@nextui-org/react';
import Dropdown from '@/app/ui/Dropdown';
import useRiskOptions from '@/hooks/useRiskOptions';
import useSchoolLevel from '@/hooks/useSchoolLevel';
import { BarChart } from '@/app/ui/charts/BarChart';
import RiskDropdown from '@/app/ui/RiskDropDown';
import { CountMissingValues } from '@/action/getSchoolLevelFunctions';
import { useSearchContext } from '@/app/context/nav-search-context';
import SchoolSearch from '@/app/ui/dashboard/cards/search/school-search-card';
function MidasRiskTooltipContent() {
  return (
    <div>Percentages of students at the three different MIDAS risk levels.</div>
  );
}

export default async function Page() {
  const riskOptions = useRiskOptions();
  const schoolLevel = useSchoolLevel();
  
  // const school = useSearchContext('school');
  // school.set();

  const missingVariables = CountMissingValues(schoolLevel);
  

  const [genderState, setGenderState] = useState({
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

  if (schoolLevel.listOfAllStudents === undefined && process.env.NODE_ENV !== 'development') {
    return (
      <div className="flex flex-col h-full gap-2 items-center justify-center">
        <div>Please upload all of the data files first.</div>
      </div>
    );
  }

  const colors = ['rose-500', 'yellow-400', 'green-500'];

  const nameRisk = getCurrentState(genderState);
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
                missingVariables={missingVariables}
                confidence={schoolLevel.confidenceLevel}
                confidenceThresholds={[1, 2, 3, 4, 5]}
              />
            </div>

            <div className="pb-4">
              <CardDisciplinarySummary
                title={'Disciplinary Action Summary'}
                valuesTop={[
                  schoolLevel.riskODR
                    ? schoolLevel.riskODR['odr_risk']['Low Risk'] + '%'
                    : '0%',
                  schoolLevel.riskODR
                    ? schoolLevel.riskODR['odr_risk']['Some Risk'] + '%'
                    : '0%',
                  schoolLevel.riskODR
                    ? schoolLevel.riskODR['odr_risk']['High Risk'] + '%'
                    : '0%',
                ]}
                subtitlesTop={['Low', 'Some', 'High']}
                valuesBottom={[
                  schoolLevel.riskSuspension
                    ? schoolLevel.riskSuspension['susp_risk']['Low Risk'] + '%'
                    : '0%',
                  schoolLevel.riskSuspension
                    ? schoolLevel.riskSuspension['susp_risk']['Some Risk'] + '%'
                    : '0%',
                  schoolLevel.riskSuspension
                    ? schoolLevel.riskSuspension['susp_risk']['High Risk'] + '%'
                    : '0%',
                ]}
                subtitlesBottom={['Low', 'Some', 'High']}
              />
            </div>

            <div className="-mb-8">
              <CardTestScoreSummary
                title={'Test Score Risk Summary'}
                valuesTop={[
                  schoolLevel.riskMath
                    ? schoolLevel.riskMath['math_risk']['Low Risk'] + '%'
                    : '0%',
                  schoolLevel.riskReading
                    ? schoolLevel.riskMath['math_risk']['Some Risk'] + '%'
                    : '0%',
                  schoolLevel.riskReading
                    ? schoolLevel.riskMath['math_risk']['High Risk'] + '%'
                    : '0%',
                ]}
                subtitlesTop={['Low', 'Some', 'High']}
                valuesBottom={[
                  schoolLevel.riskReading
                    ? schoolLevel.riskReading['read_risk']['Low Risk'] + '%'
                    : '0%',
                  schoolLevel.riskReading
                    ? schoolLevel.riskReading['read_risk']['Some Risk'] + '%'
                    : '0%',
                  schoolLevel.riskReading
                    ? schoolLevel.riskReading['read_risk']['High Risk'] + '%'
                    : '0%',
                ]}
                subtitlesBottom={['Low', 'Some', 'High']}
              />
            </div>
          </div>
        </div>
        <div className=" flex h-full w-full flex-col gap-y-28">
          
          <SaebrsSummary 
          saebrsTotal={['NA', 'NA', 'NA']} 
          mySaebrsTotal={['NA', 'NA', 'NA']} 
          saebrsEmotional={['NA', 'NA', 'NA']} 
          mySaebrsEmotional={['NA', 'NA', 'NA']} 
          saebrsSocial={['NA', 'NA', 'NA']} 
          mySaebrsSocial={['NA', 'NA', 'NA']} 
          saebrsAcademic={['NA', 'NA', 'NA']} 
          mySaebrsAcademic={['NA', 'NA', 'NA']}/>

          <div className="flex h-full w-full items-center justify-end">
            <Dropdown riskOptions={riskOptions} />
          </div>

          <div className="flex justify-center">
            {riskOptions.isEthnicity && schoolLevel.ethnicityRisk && (
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
                      data={Object.keys(schoolLevel?.ethnicityRisk).map(
                        (ele: any) => ({
                          id: ele,
                          'High Risk':
                            schoolLevel.ethnicityRisk[ele][nameRisk][
                              'High Risk'
                            ] / 100,
                          'Some Risk':
                            schoolLevel.ethnicityRisk[ele][nameRisk][
                              'Some Risk'
                            ] / 100,
                          'Low Risk':
                            schoolLevel.ethnicityRisk[ele][nameRisk][
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
            {riskOptions.isEnglishLeaner && schoolLevel.ellRisk && (
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
                      data={Object.keys(schoolLevel?.ellRisk).map(
                        (ele: any) => ({
                          id: ele === 'Yes' ? 'ELL' : 'Non-ELL',
                          'High Risk':
                            schoolLevel.ellRisk[ele][nameRisk]['High Risk'] /
                            100,
                          'Some Risk':
                            schoolLevel.ellRisk[ele][nameRisk]['Some Risk'] /
                            100,
                          'Low Risk':
                            schoolLevel.ellRisk[ele][nameRisk]['Low Risk'] / 100,
                        }),
                      )}
                      colors={colors}
                      legendVariable="Ethnicity"
                    />
                  )}
                </div>
              </Card>
            )}
            {riskOptions.isGender && schoolLevel.genderRisk && (
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
                      data={Object.keys(schoolLevel?.genderRisk).map(
                        (ele: any) => ({
                          id: ele,
                          'High Risk':
                            schoolLevel.genderRisk[ele][nameRisk]['High Risk'] /
                            100,
                          'Some Risk':
                            schoolLevel.genderRisk[ele][nameRisk]['Some Risk'] /
                            100,
                          'Low Risk':
                            schoolLevel.genderRisk[ele][nameRisk]['Low Risk'] /
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
            {schoolLevel.saeberAcademic &&
              schoolLevel.mySaeberAcademic &&
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
                            schoolLevel.saeberAcademic['Saebrs']['High Risk'] /
                            100,
                          'Some Risk':
                            schoolLevel.saeberAcademic['Saebrs']['Some Risk'] /
                            100,
                          'Low Risk':
                            schoolLevel.saeberAcademic['Saebrs']['Low Risk'] /
                            100,
                        },
                        {
                          id: 'MySaebrs',
                          'High Risk':
                            schoolLevel.mySaeberAcademic['MySaebrs'][
                              'High Risk'
                            ] / 100,
                          'Some Risk':
                            schoolLevel.mySaeberAcademic['MySaebrs'][
                              'Some Risk'
                            ] / 100,
                          'Low Risk':
                            schoolLevel.mySaeberAcademic['MySaebrs'][
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
            {schoolLevel.saebrsEmotion &&
              schoolLevel.mySaebrsEmotion &&
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
                            schoolLevel.saebrsEmotion['Saebrs']['High Risk'] /
                            100,
                          'Some Risk':
                            schoolLevel.saebrsEmotion['Saebrs']['Some Risk'] /
                            100,
                          'Low Risk':
                            schoolLevel.saebrsEmotion['Saebrs']['Low Risk'] /
                            100,
                        },
                        {
                          id: 'MySaebrs',
                          'High Risk':
                            schoolLevel.mySaebrsEmotion['MySaebrs'][
                              'High Risk'
                            ] / 100,
                          'Some Risk':
                            schoolLevel.mySaebrsEmotion['MySaebrs'][
                              'Some Risk'
                            ] / 100,
                          'Low Risk':
                            schoolLevel.mySaebrsEmotion['MySaebrs']['Low Risk'] /
                            100,
                        },
                      ]}
                      colors={colors}
                      legendVariable="Emotional"
                    />
                  </div>
                </Card>
              )}
            {schoolLevel.saeberSocial &&
              schoolLevel.mySaeberSocial &&
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
                            schoolLevel.saeberSocial['Saebrs']['High Risk'] /
                            100,
                          'Some Risk':
                            schoolLevel.saeberSocial['Saebrs']['Some Risk'] /
                            100,
                          'Low Risk':
                            schoolLevel.saeberSocial['Saebrs']['Low Risk'] / 100,
                        },
                        {
                          id: 'MySaebrs',
                          'High Risk':
                            schoolLevel.mySaeberSocial['MySaebrs']['High Risk'] /
                            100,
                          'Some Risk':
                            schoolLevel.mySaeberSocial['MySaebrs']['Some Risk'] /
                            100,
                          'Low Risk':
                            schoolLevel.mySaeberSocial['MySaebrs']['Low Risk'] /
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
        </div>
      </div>
    </main>
  );
}
