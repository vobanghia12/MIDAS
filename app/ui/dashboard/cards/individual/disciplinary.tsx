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

export function CardStudentDiscipline({
  odr,
  suspensions,
}: {
  odr: string;
  suspensions: string;
}) {

  return (
    <Card className={`${nunito.className} bg-neutral-100 w-full`} shadow='md'>
      <CardHeader>
        <h3 className="text-lg font-medium text-slate-800">Disciplinary Summary</h3>
      </CardHeader>
      <CardBody className={`${nunito.className} flex gap-1 justify-center -mt-2`}>
        <Tooltip content={"ODR tooltip"} placement='bottom'>
          <div>
            <Row header="ODRs" content={odr}/>
          </div>
        </Tooltip>
        
        <Divider/>

        <Tooltip content={"Suspensions tooltip"} placement="bottom">
          <div>
            <Row header="Suspensions" content={suspensions}/>
          </div>
        </Tooltip>
      </CardBody>
    </Card>
  );
}