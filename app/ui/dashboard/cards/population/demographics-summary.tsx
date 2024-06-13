
import { Key, useState } from "react";
import { BarChartEnglishLearner, BarChartEthnicity, DonutChartGender } from "../../../charts/total-demographics-charts";
import {  Dropdown,  DropdownTrigger,  DropdownMenu,  DropdownSection,  DropdownItem, Card } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { Nunito } from "next/font/google";
const nunito = Nunito({weight: ['200', '200'], subsets:['latin'], style: ['normal', 'italic']})

function Capitalize(str: string){
  return str.charAt(0).toUpperCase() + str.slice(1);
}


export function PopToRiskCharts() {
  const [ genderRiskSample, setGenderRiskSample ] = useState('high')
  const [ ethnicityRiskSample, setEthnicityRiskSample ] = useState('high')
  const [ ellRiskSample, setEllRiskSample ] = useState('high')

  return (
    // Main div
    <div className={`${nunito.className} flex flex-row min-h-max h-max basis-full`}>
      
      
      <Card className='bg-neutral-100 mr-2 pb-7 -mb-4  basis-1/3 rounded-xl' shadow='md'>
        <p className={`pl-2 -mb-8 text-xl`}>Gender and Risk</p>
        <div className='flex flex-col pt-10 mb-0 mt-auto h-full'>
          <DonutChartGender />
        </div>
      </Card>
      
      

      <Card className='bg-neutral-100 mr-2  pb-7 -mb-4 basis-1/3 rounded-xl' shadow='md'>
        <p className={`pl-2 -mb-8 text-xl font-sans`}>English Learner Status and Risk</p>
        <div className='flex flex-col pt-10 mb-0 mt-auto h-full'>
          <BarChartEnglishLearner/>
        </div>
      </Card>

      <Card className='bg-neutral-100 mr-2  pb-7 -mb-4 basis-1/3 rounded-xl' shadow='md'>
        <p className={`pl-2 -mb-8 text-xl font-sans`}>Ethnicity and Risk</p>
        <div className='flex flex-col pt-10 mb-0 mt-auto h-full'>
          <BarChartEthnicity/>
        </div>
      </Card>
{/* 
      <Card className='bg-neutral-100 mr-2 basis-1/3 rounded-xl' shadow='md'>
        <p className={`pl-2 -mb-8 text-xl font-sans`}>English Learner Status and Risk</p>
        <div className='flex flex-col items-center'>
          <div className={`pt-10 pb-5 scale-125`}>
            <DonutChartEnglishLearner/>
          </div>
          
          <div className='flex flex-col pb-2 mt-4 scale-125'>
            <Dropdown>
              <DropdownTrigger>
                <Button variant="bordered">
                  Select risk level sample
                </Button>
              </DropdownTrigger>

              <DropdownMenu onAction={(key: Key) => setEllRiskSample(key.toString())}>
                <DropdownItem key='high'>High</DropdownItem>
                <DropdownItem key='some'>Some</DropdownItem>
                <DropdownItem key='low'>Low</DropdownItem>
              </DropdownMenu>
            </Dropdown>

            <div className={`-mt-4`}>
              <EnglishLearnerAtRiskChart label={'At ' + Capitalize(ellRiskSample) + ' Risk'}/>
            </div>
          </div>
        </div>
      </Card> */}
    </div>
  );
}