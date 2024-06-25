'use client';

import { 
  Card, 
  CardBody, 
  CardHeader, 
  Input,
  Button,
  Divider,
  Tooltip
} from "@nextui-org/react";
import { Nunito } from "next/font/google";
import SimpleLineIconsMagnifier from "@/app/ui/icons/SimpleLineIconsMagnifier";
import { DonutChart } from "@/app/ui/charts/donut-chart";
import { StudentDemographics } from "@/app/types/student-demographics";
const nunito = Nunito({weight: ['200', '200'], subsets:['latin'], style: ['normal', 'italic']})

const genderDataPlaceholder = [
  {
    id: "Male",
    value: 500
  },
  {
    id: "Female",
    value: 548
  }
]

const ethnicityDataPlaceholder = [
  {
    id: 'White',
    value: 358
  },
  {
    id: 'Hispanic',
    value: 300
  },
  {
    id: 'Other POC',
    value: 390
  }
]

const englishLearnerDataPlaceholder = [
  {
    id: "Not ELL",
    value: 800
  },
  {
    id: "ELL",
    value: 248
  }
]


function DemographicsBox({
  label,
  content,
}:
{
  label: string;
  content: string;
}) {
  return (
    <div className='flex flex-col w-full h-full basis-1/4'>
      <p className='ml-0.5 mr-auto'>{label}</p>
      <div className='flex justify-center items-center'>
        <p className="text-xl mt-2">{content}</p>
      </div>
    </div>
  )
}


function DemographicsRow({
  content,
  className,
}:
{
  content: StudentDemographics;
  className?: string;

}) {
  return (
    <div className={`${nunito.className} flex flex-row ${className}`}>
      <DemographicsBox label='Grade' content={content.grade} />

      <Divider orientation="vertical"/>

      <Tooltip className="bg-neutral-100" 
        content={
          <div className='w-96 h-96'>
            <p className={`${nunito.className} text-xl -mb-4`}>School Gender demographics</p>
            <DonutChart data={genderDataPlaceholder} colors={['#f87171', '#a5f3fc']} selectedSlice={content.gender}/>
          </div>
        } 
        placement='bottom'>
          <div className='basis-1/4'>
            <DemographicsBox label='Gender' content={content.gender} />
          </div>
      </Tooltip>

      <Divider orientation="vertical"/>

      <Tooltip className="bg-neutral-100" 
        content={
          <div className='w-96 h-96'>
            <p className={`${nunito.className} text-xl -mb-4`}>School English-learner demographics</p>
            <DonutChart data={englishLearnerDataPlaceholder} colors={['#a3a3a3', '#4ade80']} selectedSlice={content.ell}/>
          </div>
        } 
        placement='bottom'>
          <div className='basis-1/4'>
            <DemographicsBox label='English Learner?' content={content.ell} />
          </div>
      </Tooltip>

      <Divider orientation="vertical"/>

      <Tooltip className="bg-neutral-100" 
        content={
          <div className='w-96 h-96'>
            <p className={`${nunito.className} text-xl -mb-4`}>School Ethnicity demographics</p>
            <DonutChart data={ethnicityDataPlaceholder} colors={['#f87171', '#a5f3fc', '#4ade80']} selectedSlice={content.ethnicity}/>
          </div>
        } 
        placement='bottom'>
          <div className='basis-1/4'>
            <DemographicsBox label='Ethnicity' content={content.ethnicity} />
          </div>
      </Tooltip>
    </div>
  )
}

export default function StudentSearch({
  selectedStudent,
  setSelectedStudent,
}: {
  selectedStudent: string;
  setSelectedStudent : React.Dispatch<React.SetStateAction<string>>;
}) {

  const SearchAction = async (formData: FormData) => {
    const id = formData.get('studentId') || ""
    setSelectedStudent(id.toString())
    console.log({selectedStudent})
  }

  return (
    <Card className="bg-neutral-100 pb-1 w-full" shadow='md'>
        <CardHeader className={nunito.className}>
          <h3 className="text-lg font-medium text-slate-800">Currently viewing student </h3>&nbsp;<span className="font-extrabold underline">{selectedStudent}</span>
        </CardHeader>
        <CardBody className={`${nunito.className} -mt-4 flex flex-row w-full`}>
          <div className='flex flex-col basis-full w-max gap-1'>
            <form className="flex flex-row w-full mb-4" action={SearchAction}>
              <div className='flex w-full'>
                <Input name="studentId" placeholder="Enter student ID" variant="underlined"/>
                <Button className='min-w-fit' variant="flat" type="submit" >
                  <SimpleLineIconsMagnifier/>
                </Button>
              </div>
            </form>

            <DemographicsRow content={{grade: '8', gender: 'Male', ell: 'ELL', ethnicity: 'White'}} className="mb-0 mt-auto h-full"/>
          </div>
        </CardBody>
      </Card>
  );
}