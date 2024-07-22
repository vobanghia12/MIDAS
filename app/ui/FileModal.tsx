'use client';
import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import Input from './Input';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Button } from './button';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import useFileModal from '@/hooks/useFileModal';
import { read, utils } from 'xlsx';
import {
  getConfidenceLvel,
  getmyRiskStatsSchoolLevel,
  getDemographic,
} from '@/action/getSchoolLevelFunctions';
import {
  getMyRiskStatsGradeLevel,
  getDemographicGradeLevel,
  getConfidenceLevelForGradeLevel,
} from '@/action/getGradeLevelFunctions';
import useSchoolLevel from '@/hooks/useSchoolLevel';
import { BounceLoader } from 'react-spinners';

import { CompareSchoolNames } from '../api/file-auth/restrict-csv';
import useGradeLevel from '@/hooks/useGradeLevel';
import useClassLevel from '@/hooks/useClassLevel';
import { uploadAndCopyCSV } from '../api/upload/school-data';
import { getDistinctGradeLevels } from '@/action/fetch/getSchoolData';
import useSelectedSchool from '@/hooks/useSelectedSchool';
import { getSession } from 'next-auth/react';
import { createClient } from '@supabase/supabase-js';

const data_frame: string[] = [
  'odr_f',
  'susp_f',
  'gender',
  'ethnicity',
  'ell',
  'schoollevel',
  'math_f',
  'read_f',
  'mysaebrs_emo',
  'mysaebrs_soc',
  'mysaebrs_aca',
  'saebrs_emo',
  'saebrs_soc',
  'saebrs_aca',
];

const supabaseUrl = 'https://kalbwmivszjzlnepcebm.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey!);


export const convertCsvToJson = (data: ArrayBuffer) => {
  const workbook = read(data, { dense: true });

  const sheet = workbook.Sheets[workbook.SheetNames[0]];

  const JSONdata: any[] = utils.sheet_to_json(sheet);

  return JSONdata;
};

/**
 * This function matching with risk factor
 */
export const setSecondMatchingRiskFactor = (
  uploadData: any,
  riskFactorData: any,
  riskFactor: string,
  confidenceFactor: string,
) => {
  const m: any = new Map();

  //x is one row in the data?
  uploadData.forEach(function (x: any) {
    x[riskFactor] = null;
    x[confidenceFactor] = null;
    m.set(x.id, x);
  });

  riskFactorData.forEach(function (x: any) {
    var existing = m.get(x.id);
    if (existing) {
      existing[riskFactor] = x.risk_level;
      existing[confidenceFactor] = x.confidence;
      Object.assign(existing);
    }
  });

  var result = Array.from(m.values());
  return result;
};

const FileModal = () => {
  const [isLoading, setIsLoading] = useState<boolean>();
  const fileModal = useFileModal();
  const router = useRouter();
  const schooLevel = useSchoolLevel();
  const gradeLevel = useGradeLevel();
  const classLevel = useClassLevel();

  const selectedSchool = useSelectedSchool();
  const [userName, setUsername] = useState();

  useEffect(() => {
    const _getSession = async() => {
        const session = await getSession();
        setUsername(session?.user.name);
    }
    
    _getSession();
  }, [])

  //handle form
  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      document1: null,
    },
  });

  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      fileModal.onClose();
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);

      let file1: File = values.document1?.[0];

      if ((await CompareSchoolNames(file1)) == false) {
        toast.error('You are not permitted to open this file');
        // throw(new Error("User is not permitted to open this file."))
        return;
      }

      if (!file1) {
        toast.error('Missing fields');
        return;
      }

      const data1 = await file1.arrayBuffer();
      // const data2 = await file2.arrayBuffer();
      // const data3 = await file3.arrayBuffer();
      // const data4 = await file4.arrayBuffer();
      // const data5 = await file5.arrayBuffer();
      // const data6 = await file6.arrayBuffer();

      // let { data: schoolName, error } = await supabase
      // .rpc('get_school_name_from_username', {
      //   _username: userName
      // })
      // if (error) console.error(error)
      // else console.log(schoolName)

      // uploadAndCopyCSV(userName + "_data", convertCsvToJson(data1))
      
      selectedSchool.setData(convertCsvToJson(data1));

      console.log("SELECTED SCHOOL")
      console.log(selectedSchool.data)


      console.log(getDistinctGradeLevels(selectedSchool.data))
      
      
      let uploadData: any = convertCsvToJson(data1);

      // const inputData: any = convertCsvToJson(data2);

      // const mathRiskData: any = convertCsvToJson(data3);

      // const readRiskData: any = convertCsvToJson(data4);

      // //get ODR data
      // const odrRiskData: any = convertCsvToJson(data6);

      // const suspRiskData: any = convertCsvToJson(data5);

      // const m: any = new Map();
      // uploadData.forEach(function (x: any) {
      //   x.id = null;
      //   m.set(
      //     `${x.odr_f},${x.susp_f},${x.gender},${x.ethnicity},${x.ell},${x.schoollevel},${x.math_f},${x.read_f},${x.mysaebrs_emo},${x.mysaebrs_soc},${x.mysaebrs_aca},${x.saebrs_emo},${x.saebrs_soc},${x.saebrs_aca}`,
      //     x,
      //   );
      // });

      // inputData.forEach(function (x: any) {
      //   var existing = m.get(
      //     `${x.odr_f},${x.susp_f},${x.gender},${x.ethnicity},${x.ell},${x.schoollevel},${x.math_f},${x.read_f},${x.mysaebrs_emo},${x.mysaebrs_soc},${x.mysaebrs_aca},${x.saebrs_emo},${x.saebrs_soc},${x.saebrs_aca}`,
      //   );
      //   if (existing) {
      //     const a = { id: x.id };
      //     Object.assign(existing, a);
      //   }
      // });

      // uploadData = structuredClone(Array.from(m.values()));

      // //deep clone the array after matching

      // // //filter for math risk
      // const mathRisk = setSecondMatchingRiskFactor(
      //   uploadData,
      //   mathRiskData,
      //   'math_risk',
      //   'math_confidence',
      // );

      // // //filter for read risk
      // const readRisk = setSecondMatchingRiskFactor(
      //   uploadData,
      //   readRiskData,
      //   'read_risk',
      //   'read_confidence',
      // );

      // const odrRisk = setSecondMatchingRiskFactor(
      //   uploadData,
      //   odrRiskData,
      //   'odr_risk',
      //   'odr_confidence',
      // );

      // // //filter for suspension risk
      // const suspRisk = setSecondMatchingRiskFactor(
      //   uploadData,
      //   suspRiskData,
      //   'susp_risk',
      //   'susp_confidence',
      // );

      //mysaeber Emotion Risk
      schooLevel.setMySaebrsEmotion(
        getmyRiskStatsSchoolLevel(uploadData, 'mysaebrs_emo', 'MySaebrs'),
      );

      //saeber Emotion Risk
      schooLevel.setSaebrsEmotion(
        getmyRiskStatsSchoolLevel(uploadData, 'saebrs_emo', 'Saebrs'),
      );

      //Saeber Academic Risk
      schooLevel.setMySaeberAcademic(
        getmyRiskStatsSchoolLevel(uploadData, 'mysaebrs_aca', 'MySaebrs'),
      );

      //Mysaeber Academic Risk
      schooLevel.setSaeberAcademic(
        getmyRiskStatsSchoolLevel(uploadData, 'saebrs_aca', 'Saebrs'),
      );

      //Saeber Social Risk
      schooLevel.setSaeberSocial(
        getmyRiskStatsSchoolLevel(uploadData, 'saebrs_soc', 'Saebrs'),
      );
      //Mysaeber Social Risk
      schooLevel.setMySaeberSocial(
        getmyRiskStatsSchoolLevel(uploadData, 'mysaebrs_soc', 'MySaebrs'),
      );

      // schooLevel.setRiskMath(
      //   getmyRiskStatsSchoolLevel(suspRisk, 'math_risk', 'math_risk'),
      // );

      // schooLevel.setRiskReading(
      //   getmyRiskStatsSchoolLevel(suspRisk, 'read_risk', 'read_risk'),
      // );

      // schooLevel.setRiskSuspension(
      //   getmyRiskStatsSchoolLevel(suspRisk, 'susp_risk', 'susp_risk'),
      // );

      // //set ODR for school level
      // schooLevel.setRiskODR(
      //   getmyRiskStatsSchoolLevel(suspRisk, 'odr_risk', 'odr_risk'),
      // );

      // schooLevel.setConfidenceLevel(getConfidenceLvel(suspRisk));

      schooLevel.setlistOfAllStudents(uploadData);

      // schooLevel.setGenderRisk(getDemographic(suspRisk, 'gender'));

      // schooLevel.setEllRisk(getDemographic(suspRisk, 'ell'));

      // schooLevel.setEthnicityRisk(getDemographic(suspRisk, 'ethnicity'));

      //mysaeber Emotion Risk
      gradeLevel.setMySaebrsEmotion(
        getMyRiskStatsGradeLevel(uploadData, 'gradelevel', 'mysaebrs_emo'),
      );

      //saeber Emotion Risk
      gradeLevel.setSaebrsEmotion(
        getMyRiskStatsGradeLevel(uploadData, 'gradelevel', 'saebrs_emo'),
      );

      //MySaeber Academic Risk
      gradeLevel.setMySaeberAcademic(
        getMyRiskStatsGradeLevel(uploadData, 'gradelevel', 'mysaebrs_aca'),
      );

      //Saeber Academic Risk
      gradeLevel.setSaeberAcademic(
        getMyRiskStatsGradeLevel(uploadData, 'gradelevel', 'saebrs_aca'),
      );

      //Mysaeber Social Risk
      gradeLevel.setMySaeberSocial(
        getMyRiskStatsGradeLevel(uploadData, 'gradelevel', 'mysaebrs_soc'),
      );
      //saeber Social Risk
      gradeLevel.setSaeberSocial(
        getMyRiskStatsGradeLevel(uploadData, 'gradelevel', 'saebrs_soc'),
      );

      // gradeLevel.setRiskMath(
      //   getMyRiskStatsGradeLevel(uploadData, 'gradelevel', 'math_risk'),
      // );

      // gradeLevel.setRiskReading(
      //   getMyRiskStatsGradeLevel(uploadData, 'gradelevel', 'read_risk'),
      // );

      // gradeLevel.setRiskSuspension(
      //   getMyRiskStatsGradeLevel(uploadData, 'gradelevel', 'susp_risk'),
      // );

      // gradeLevel.setRiskODR(
      //   getMyRiskStatsGradeLevel(suspRisk, 'gradelevel', 'odr_risk'),
      // );

      // gradeLevel.setConfidenceLevel(
      //   getConfidenceLevelForGradeLevel(suspRisk, 'gradelevel'),
      // );

      // gradeLevel.setGenderRisk(
      //   getDemographicGradeLevel(suspRisk, 'gradelevel', 'gender'),
      // );

      // gradeLevel.setEthnicityRisk(
      //   getDemographicGradeLevel(suspRisk, 'gradelevel', 'ethnicity'),
      // );

      // gradeLevel.setEllRisk(
      //   getDemographicGradeLevel(suspRisk, 'gradelevel', 'ell'),
      // );

      //classroom

      //mysaeber Emotion Risk
      classLevel.setMySaebrsEmotion(
        getMyRiskStatsGradeLevel(uploadData, 'classroom', 'mysaebrs_emo'),
      );

      //saeber Emotion Risk
      classLevel.setSaebrsEmotion(
        getMyRiskStatsGradeLevel(uploadData, 'classroom', 'saebrs_emo'),
      );

      //MySaeber Academic Risk
      classLevel.setMySaeberAcademic(
        getMyRiskStatsGradeLevel(uploadData, 'classroom', 'mysaebrs_aca'),
      );

      //Saeber Academic Risk
      classLevel.setSaeberAcademic(
        getMyRiskStatsGradeLevel(uploadData, 'classroom', 'saebrs_aca'),
      );

      //Mysaeber Social Risk
      classLevel.setMySaeberSocial(
        getMyRiskStatsGradeLevel(uploadData, 'classroom', 'mysaebrs_soc'),
      );
      //saeber Social Risk
      classLevel.setSaeberSocial(
        getMyRiskStatsGradeLevel(uploadData, 'classroom', 'saebrs_soc'),
      );

      // classLevel.setRiskMath(
      //   getMyRiskStatsGradeLevel(suspRisk, 'classroom', 'math_risk'),
      // );

      // classLevel.setRiskReading(
      //   getMyRiskStatsGradeLevel(suspRisk, 'classroom', 'read_risk'),
      // );

      // classLevel.setRiskSuspension(
      //   getMyRiskStatsGradeLevel(suspRisk, 'classroom', 'susp_risk'),
      // );

      // classLevel.setConfidenceLevel(
      //   getConfidenceLevelForGradeLevel(suspRisk, 'classroom'),
      // );

      // classLevel.setGenderRisk(
      //   getDemographicGradeLevel(suspRisk, 'classroom', 'gender'),
      // );

      // classLevel.setEthnicityRisk(
      //   getDemographicGradeLevel(suspRisk, 'classroom', 'ethnicity'),
      // );

      // classLevel.setEllRisk(
      //   getDemographicGradeLevel(suspRisk, 'classroom', 'ell'),
      // );

      // classLevel.setRiskODR(
      //   getMyRiskStatsGradeLevel(suspRisk, 'classroom', 'odr_risk'),
      // );

      router.refresh();
      setIsLoading(false);
      toast.success('File uploaded');
      reset();
      fileModal.onClose();
    } catch (error) {
      toast.error('Somthing went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Modal
        title="Uploading a Document"
        description=""
        isOpen={fileModal.isOpen}
        onChange={onChange}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-4"
        >
          <div>
            <p className="pb-1 text-left">School Upload File</p>
            <Input
              type="file"
              className="mt-1"
              id="document1"
              disabled={isLoading}
              {...register('document1', { required: true })}
              accept=".csv"
            />
          </div>
          {isLoading ? (
            <BounceLoader className=" m-auto" color="blue" size={40} />
          ) : (
            <Button
              disabled={isLoading}
              type="submit"
              className="m-auto w-20 font-semibold"
            >
              Upload
            </Button>
          )}
        </form>
      </Modal>
    </>
  );
};

export default FileModal;
