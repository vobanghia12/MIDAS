import {
  FaceSmileIcon,
  AcademicCapIcon,
  UsersIcon
  
} from '@heroicons/react/24/outline';
import MaterialSymbolsLightPersonAlertOutline from '../../../icons/MaterialSymbolsLightPersonAlertOutline';

import clsx from 'clsx';
import React from 'react';
import { Card, Tooltip, Divider } from '@nextui-org/react';
import { Nunito } from "next/font/google";
const nunito = Nunito({weight: ['200', '200'], subsets:['latin'], style: ['normal', 'italic']})

function VerticalDivider() {
  return (
    <div className="w-0 border border-neutral-200 mx-4">&nbsp;</div>
  );
}

function HorizontalDivider() {
  return (
    <div className="h-0 border border-neutral-200 -mt-2">&nbsp;</div>
  );
}

const iconMap = {
  total: MaterialSymbolsLightPersonAlertOutline,
  emotional: FaceSmileIcon,
  social: UsersIcon,
  academic: AcademicCapIcon,
};

function RiskTitle({
  title,
  type,
}: {
  title: string;
  type: 'total' | 'emotional' | 'social' | 'academic';
}) {
  const Icon = iconMap[type];

  return (
    <div className='flex flex-row items-start justify-start -mt-2 mb-1'>
      {Icon ? <Icon className="h-6 w-6 text-gray-700" /> : null}
      <p className='pl-2'>{title}</p>
    </div>
  )
}

function RiskRow({
  title,
  type,
  riskValues,
}: {
  title: string;
  type: string;
  riskValues: string[];
}) {
  return (
    <div className=''>
      {/* SAEBRS ROW */}
      <div className='flex flex-row items-center h-20 mb-2 mx-5 '>
        <div className='flex flex-col'>
          <p className='-ml-2'>{title}</p>
          {/* LOW RISK COLUMN */}
          <div className='flex flex-row gap-1' >
            <div className='flex flex-col items-center pr-4'>
              {/* VALUE */}
              <p className=' text-2xl'>
                {riskValues[0]}
              </p>
              
              {/* SUBTITLE */}
              <p className='font-extralight italic text-sm'>
                Low
              </p>
            </div>
            
            <div className='flex flex-col items-center px-4'>
              {/* VALUE */}
              <p className=' text-2xl'>
                {riskValues[1]}
              </p>
              {/* SUBTITLE */}
              <p className='font-extralight italic text-sm'>
                Some
              </p>
            </div>

            <div className='flex flex-col items-center pl-4'>
              {/* VALUE */}
              <p className=' text-2xl'>
                {riskValues[2]}
              </p>
              {/* SUBTITLE */}
              <p className='font-extralight italic text-sm'>
                High
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SaebrsSummary({
  saebrsTotal,
  mySaebrsTotal,
  saebrsEmotional,
  mySaebrsEmotional,
  saebrsSocial,
  mySaebrsSocial,
  saebrsAcademic,
  mySaebrsAcademic,
}: {
  saebrsTotal: string[];
  mySaebrsTotal: string[];
  saebrsEmotional: string[];
  mySaebrsEmotional: string[];
  saebrsSocial: string[];
  mySaebrsSocial: string[];
  saebrsAcademic: string[];
  mySaebrsAcademic: string[];
}) {

// min-w-fit max-w-sm on tooltip className if break
  return (
      // MAIN ROW
      <div className={`${nunito.className} flex flex-row gap-2 min-w-full w-full`}>
        <Card className='flex bg-neutral-100 pt-6 pb-3 px-2 basis-1/4 w-full'>
          {/* TOTAL RISK COLUMN */}
          <Tooltip content="Total Saebrs and MySaebrs score tooltip" placement='bottom'>
            <div className='flex flex-col items-center'>
              <div className='ml-3 mr-auto'>
                <RiskTitle title='Total' type='total'/>
              </div>
              
              <div className='items-center justify-center'>
                <RiskRow title='Saebrs' type='total' riskValues={saebrsTotal}/>
                <Divider orientation='horizontal' className='-mt-1'/>
                <RiskRow title='MySaebrs' type='total' riskValues={mySaebrsTotal}/>
              </div>
              
            </div>
          </Tooltip>
          </Card>
          
          <Card className='flex bg-neutral-100 pt-6 pb-3 px-2 basis-1/4 w-full'>

          {/* EMOTIONAL RISK COLUMN */}
          <Tooltip content="Emotional Saebrs and MySaebrs score tooltip" placement='bottom'>
            <div className='flex flex-col  items-center'>  
              <div className='ml-3 mr-auto'>
                <RiskTitle title='Emotional' type='emotional'/>
              </div>
              
              <div className='items-center justify-center'>
                <RiskRow title='Saebrs' type='emotional' riskValues={saebrsEmotional}/>
                <Divider orientation='horizontal' className='-mt-1'/>
                <RiskRow title='MySaebrs' type='emotional' riskValues={mySaebrsEmotional}/>
              </div>
            </div>
          </Tooltip>

          </Card>

          <Card className='flex  bg-neutral-100 pt-6 pb-3 px-2 basis-1/4 w-full'>
          {/* SOCIAL RISK COLUMN */}
          <Tooltip content="Social Saebrs and MySaebrs score tooltip" placement='bottom'>
            <div className='flex flex-col  items-center'>
              <div className='ml-3 mr-auto'>
                <RiskTitle title='Social' type='social'/>
              </div>
              
              <div className='items-center justify-center'>
                <RiskRow title='Saebrs' type='social' riskValues={saebrsSocial}/>
                <Divider orientation='horizontal' className='-mt-1'/>
                <RiskRow title='MySaebrs' type='social' riskValues={mySaebrsSocial}/>
              </div>
            </div>
          </Tooltip>
          </Card>

          
          <Card className='flex  bg-neutral-100 pt-6 pb-3 px-2 basis-1/4 w-full'>
          {/* ACADEMIC RISK COLUMN */}
          <Tooltip content="Academic Saebrs and MySaebrs score tooltip" placement='bottom'>
            <div className='flex flex-col items-center'>
              <div className='ml-3 mr-auto'>
                <RiskTitle title='Academic' type='academic'/>
              </div>
              
              <div className='items-center justify-center'>
                <RiskRow title='Saebrs' type='academic' riskValues={saebrsAcademic}/>
                <Divider orientation='horizontal' className='-mt-1'/>
                <RiskRow title='MySaebrs' type='academic' riskValues={mySaebrsAcademic}/>
              </div>
            </div>
          </Tooltip>
        </Card>
      </div>
  );
}


{/* <Card className={`${nunito.className} flex flex-row  bg-neutral-100 pt-6 pb-3 px-8 max-w-screen-2xl`}>
        
        <Tooltip content="Total Saebrs and MySaebrs score tooltip" placement='bottom'>
          <div className='flex flex-col basis-1/4'> 
            <RiskTitle title='Total' type='total'/>
            <RiskRow title='Saebrs' type='total' riskValues={saebrsTotal}/>
            <Divider orientation='horizontal' className='-mt-1'/>
            <RiskRow title='MySaebrs' type='total' riskValues={mySaebrsTotal}/>
          </div>
        </Tooltip>
        
        <Divider orientation='vertical' className='mx-4'/>

        
        <Tooltip content="Emotional Saebrs and MySaebrs score tooltip" placement='bottom'>
          <div className='flex flex-col basis-1/4'>  
            <RiskTitle title='Emotional' type='emotional'/>
            <RiskRow title='Saebrs' type='total' riskValues={saebrsEmotional}/>
            <Divider orientation='horizontal' className='-mt-1'/>
            <RiskRow title='MySaebrs' type='total' riskValues={mySaebrsEmotional}/>
          </div>
        </Tooltip>

        <Divider orientation='vertical' className='mx-4'/>

        
        <Tooltip content="Social Saebrs and MySaebrs score tooltip" placement='bottom'>
          <div className='flex flex-col basis-1/4'>
            <RiskTitle title='Social' type='social'/>
            <RiskRow title='Saebrs' type='total' riskValues={saebrsSocial}/>
            <Divider orientation='horizontal' className='-mt-1'/>
            <RiskRow title='MySaebrs' type='total' riskValues={mySaebrsSocial}/>
          </div>
        </Tooltip>

        <Divider orientation='vertical' className='mx-4'/>

        
        <Tooltip content="Academic Saebrs and MySaebrs score tooltip" placement='bottom'>
          <div className='flex flex-col basis-1/4'>
            <RiskTitle title='Academic' type='academic'/>
            <RiskRow title='Saebrs' type='total' riskValues={saebrsAcademic}/>
            <Divider orientation='horizontal' className='-mt-1'/>
            <RiskRow title='MySaebrs' type='total' riskValues={mySaebrsAcademic}/>
          </div>
        </Tooltip>
      </Card> */}