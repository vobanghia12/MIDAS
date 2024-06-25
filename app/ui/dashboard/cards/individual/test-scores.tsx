import { Card, CardBody,  CardHeader,  Divider, Tooltip } from '@nextui-org/react';
import React from 'react';

import { Nunito } from "next/font/google";
const nunito = Nunito({weight: ['200', '200'], subsets:['latin'], style: ['normal', 'italic']})

function Row({
  header,
  content,
}:
{
  header: string;
  content: string;
}) {
  return (
    <div className=''>
      <p className='items-start font-normal text-xl'>{header}</p>
      <div className="flex flex-col items-center text-xl">
        <p className='text-2xl'>{content}</p>
      </div>
    </div>
  )
}

export function CardStudentTestScores({
  math,
  reading,
}: {
  math: string;
  reading: string;
}) {

  return (
    <Card className={`${nunito.className} bg-neutral-100 w-full`} shadow='md'>
      <CardHeader>
        <h3 className="text-lg font-medium text-slate-800">Test Risk Scores</h3>
      </CardHeader>
      <CardBody className={`${nunito.className} flex gap-1 justify-center -mt-2`}>
        <Tooltip content="Math risk tooltip" placement='bottom'>
          <div>
            <Row header="Math Risk" content={math}/>
          </div>
        </Tooltip>

        <Divider/>
        
        <Tooltip content="Reading risk tooltip" placement='bottom'>
          <div>
            <Row header="Reading Risk" content={reading}/>
          </div>
        </Tooltip>
      </CardBody>
    </Card>
  );
}