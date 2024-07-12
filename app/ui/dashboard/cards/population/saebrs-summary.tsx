
import {
  FaceSmileIcon,
  AcademicCapIcon,
  UsersIcon
  
} from '@heroicons/react/24/outline';
import MaterialSymbolsLightPersonAlertOutline from '../../../icons/MaterialSymbolsLightPersonAlertOutline';
import React from 'react';
import { Card, Tooltip, Divider, useDisclosure } from '@nextui-org/react';
import { Nunito } from "next/font/google";
import TooltipModal from '@/app/ui/modals/tooltip-modal';
import {
   MySaebrsAcademicTooltip, 
  MySaebrsEmotionalTooltip, 
  MySaebrsSocialTooltip, 
  MySaebrsTotalTooltip, 
  SaebrsAcademicTooltip, 
  SaebrsEmotionalTooltip, 
  SaebrsSocialTooltip, 
  SaebrsTotalTooltip } from '@/app/ui/textblocks/tooltips';
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
=======
import clsx from 'clsx';
import React from 'react';
import { Card, CardHeader, Tooltip, Divider } from '@nextui-org/react';
import { Nunito } from 'next/font/google';
const nunito = Nunito({
  weight: ['200', '200'],
  subsets: ['latin'],
  style: ['normal', 'italic'],
});

function Interior({
  title,
  values,
  subtitles,
  padding,
}: {
  title: string;
  values: [string | number, string | number, string | number];
  subtitles: [string, string, string];
  padding: string;
}) {
  return (
    <div className={'mx-2 flex h-20 flex-col rounded-xl' + padding}>
      {/* CONTENT ROW */}
      <p className={` text-md ml-2`}> {title} </p>
      <div className="-mx-2 flex flex-row px-8">
        {/* LEFT COLUMN */}
        <div className="flex basis-1/2 flex-col items-center">
          {/* VALUE DIV */}
          <div className="-mb-1">
            <p
              className={clsx('text-2xl', {
                'text-slate-600': values[0].toString().toLowerCase() === 'na',
              })}
            >
              {values[0].toString().toUpperCase()}
            </p>
          </div>

          {/* SUBTITLE DIV */}
          <div>
            <p className="text-sm font-extralight italic">{subtitles[0]}</p>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="ml-10 flex basis-1/2 flex-col items-center">
          {/* VALUE DIV */}
          <div className="">
            <p
              className={clsx('text-2xl', {
                'text-slate-600': values[1].toString().toLowerCase() === 'na',
              })}
            >
              {values[1].toString().toUpperCase()}
            </p>
          </div>

          {/* SUBTITLE DIV */}
          <div className="">
            <p className="text-sm font-extralight italic">{subtitles[1]}</p>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="ml-10 flex basis-1/2 flex-col items-center">
          {/* VALUE DIV */}
          <div className="">
            <p
              className={clsx('text-2xl', {
                'text-slate-600': values[1].toString().toLowerCase() === 'na',
              })}
            >
              {values[2].toString().toUpperCase()}
            </p>
          </div>

          {/* SUBTITLE DIV */}
          <div className="">
            <p className="text-sm font-extralight italic">{subtitles[2]}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SaebrsSummary({
  title,
  subtitlesTop,
  subtitlesBottom,
  valuesTop,
  valuesBottom,
}: {
  title: string;
  subtitlesTop: [string, string, string];
  subtitlesBottom: [string, string, string];
  valuesTop: [string, string, string] | [number, number, number];
  valuesBottom: [string, string, string] | [number, number, number];
}) {


  const {isOpen: SaebrsTotalIsOpen, onOpen: SaebrsTotalOnOpen, onOpenChange: SaebrsTotalOnOpenChange} = useDisclosure();
  const {isOpen: MySaebrsTotalIsOpen, onOpen: MySaebrsTotalOnOpen, onOpenChange: MySaebrsTotalOnOpenChange} = useDisclosure();
  const {isOpen: SaebrsSocialIsOpen, onOpen: SaebrsSocialOnOpen, onOpenChange: SaebrsSocialOnOpenChange} = useDisclosure();
  const {isOpen: MySaebrsSocialIsOpen, onOpen: MySaebrsSocialOnOpen, onOpenChange: MySaebrsSocialOnOpenChange} = useDisclosure();
  const {isOpen: SaebrsEmotionalIsOpen, onOpen: SaebrsEmotionalOnOpen, onOpenChange: SaebrsEmotionalOnOpenChange} = useDisclosure();
  const {isOpen: MySaebrsEmotionalIsOpen, onOpen: MySaebrsEmotionalOnOpen, onOpenChange: MySaebrsEmotionalOnOpenChange} = useDisclosure();
  const {isOpen: SaebrsAcademicIsOpen, onOpen: SaebrsAcademicOnOpen, onOpenChange: SaebrsAcademicOnOpenChange} = useDisclosure();
  const {isOpen: MySaebrsAcademicIsOpen, onOpen: MySaebrsAcademicOnOpen, onOpenChange: MySaebrsAcademicOnOpenChange} = useDisclosure();

// min-w-fit max-w-sm on tooltip className if break
  return (
    <>
    {/* Load modals */}
    <TooltipModal 
    isOpen={SaebrsTotalIsOpen} 
    onOpen={SaebrsTotalOnOpen} 
    onOpenChange={SaebrsTotalOnOpenChange} 
    title={"Saebrs Total Risk Score"} 
    content={SaebrsTotalTooltip()}/>

    <TooltipModal 
    isOpen={MySaebrsTotalIsOpen} 
    onOpen={MySaebrsTotalOnOpen} 
    onOpenChange={MySaebrsTotalOnOpenChange} 
    title={"MySaebrs Total Risk Score"} 
    content={MySaebrsTotalTooltip()}/>

    <TooltipModal 
    isOpen={SaebrsSocialIsOpen} 
    onOpen={SaebrsSocialOnOpen} 
    onOpenChange={SaebrsSocialOnOpenChange} 
    title={"Saebrs Social Risk Score"} 
    content={SaebrsSocialTooltip()}/>

    <TooltipModal 
    isOpen={MySaebrsSocialIsOpen} 
    onOpen={MySaebrsSocialOnOpen} 
    onOpenChange={MySaebrsSocialOnOpenChange} 
    title={"MySaebrs Social Risk Score"} 
    content={MySaebrsSocialTooltip()}/>

    <TooltipModal 
    isOpen={SaebrsEmotionalIsOpen} 
    onOpen={SaebrsEmotionalOnOpen} 
    onOpenChange={SaebrsEmotionalOnOpenChange} 
    title={"Saebrs Emotional Risk Score"} 
    content={SaebrsEmotionalTooltip()}/>

    <TooltipModal 
    isOpen={MySaebrsEmotionalIsOpen} 
    onOpen={MySaebrsEmotionalOnOpen} 
    onOpenChange={MySaebrsEmotionalOnOpenChange} 
    title={"MySaebrs Emotional Risk Score"} 
    content={MySaebrsEmotionalTooltip()}/>

    <TooltipModal 
    isOpen={SaebrsAcademicIsOpen} 
    onOpen={SaebrsAcademicOnOpen} 
    onOpenChange={SaebrsAcademicOnOpenChange} 
    title={"Saebrs Academic Risk Score"} 
    content={SaebrsAcademicTooltip()}/>

    <TooltipModal 
    isOpen={MySaebrsAcademicIsOpen} 
    onOpen={MySaebrsAcademicOnOpen} 
    onOpenChange={MySaebrsAcademicOnOpenChange} 
    title={"MySaebrs Academic Risk Score"} 
    content={MySaebrsAcademicTooltip()}/>
      
      <div className={`${nunito.className} flex flex-col gap-4 lg:flex-row`}>
        <Card className='flex bg-neutral-100 pt-6 pb-3 px-2 basis-1/4 w-full'>
          {/* TOTAL RISK COLUMN */}
          <Tooltip content="Total Saebrs and MySaebrs score tooltip" placement='bottom'>
            <div className='flex flex-col items-center'>
              <div className='ml-3 mr-auto'>
                <RiskTitle title='Total' type='total'/>
              </div>
              
              <div className='items-center justify-center'>
                <div onClick={SaebrsTotalOnOpen}>
                  <RiskRow title='Saebrs' type='total' riskValues={saebrsTotal}/>
                </div>
                
                <Divider orientation='horizontal' className='-mt-1'/>

                <div onClick={MySaebrsTotalOnOpen}>
                  <RiskRow title='MySaebrs' type='total' riskValues={mySaebrsTotal}/>
                </div>
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
                <div onClick={SaebrsEmotionalOnOpen}>
                  <RiskRow title='Saebrs' type='social' riskValues={saebrsSocial}/>
                </div>
                
                <Divider orientation='horizontal' className='-mt-1'/>

                <div onClick={MySaebrsEmotionalOnOpen}>
                  <RiskRow title='MySaebrs' type='social' riskValues={mySaebrsSocial}/>
                </div>
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
                <div onClick={SaebrsAcademicOnOpen}>
                  <RiskRow title='Saebrs' type='academic' riskValues={saebrsAcademic}/>
                </div>
                
                <Divider orientation='horizontal' className='-mt-1'/>

                <div onClick={MySaebrsAcademicOnOpen}>
                  <RiskRow title='MySaebrs' type='academic' riskValues={mySaebrsAcademic}/>
                </div>
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
                  <div onClick={SaebrsEmotionalOnOpen}>
                    <RiskRow title='Saebrs' type='emotional' riskValues={saebrsEmotional}/>
                  </div>
                  
                  <Divider orientation='horizontal' className='-mt-1'/>

                  <div onClick={MySaebrsEmotionalOnOpen}>
                    <RiskRow title='MySaebrs' type='emotional' riskValues={mySaebrsEmotional}/>
                  </div>
                </div>
              </div>
            </Tooltip>

          </Card>
      </div>
    </>
  );
}


{/* <Card className={`${nunito.className} flex flex-row  bg-neutral-100 pt-6 pb-3 px-8 max-w-screen-2xl`}>
        
        <Tooltip content="Total Saebrs and MySaebrs score tooltip" placement='bottom'>
          <div className='flex flex-col basis-1/4'> 
            <RiskTitle title='Total' type='total'/>
            <RiskRow title='Saebrs' type='total' riskValues={saebrsTotal}/>
            <Divider orientation='horizontal' className='-mt-1'/>
            <RiskRow title='MySaebrs' type='total' riskValues={mySaebrsTotal}/>
  return (
    <Card
      className={`${nunito.className} items-center rounded-xl bg-neutral-100 pb-2`}
    >
      {/* MAIN TITLE */}
      <CardHeader className="">
        <h3 className="text-lg font-medium text-slate-800">{title}</h3>
      </CardHeader>

      {/* MAIN CONTENT */}
      <div className="flex flex-col">
        {/* CARD 1 --- ODR */}
        <Tooltip content={'Saebrs Tooltip'} placement="bottom">
          <div>
            <Interior
              title="Saebrs"
              values={valuesTop}
              subtitles={subtitlesTop}
              padding=""
            />
          </div>
        </Tooltip>

        <Divider className="mb-1 mt-0" />

        {/* CARD 2 --- SUSPENSIONS */}
        <Tooltip content={'MySaebrs Tooltip'} placement="bottom">
          <div>
            <Interior
              title="MySaebrs"
              values={valuesBottom}
              subtitles={subtitlesBottom}
              padding=""
            />
          </div>
        </Tooltip>
      </div>
    </Card>
  );
}
