import { read } from 'fs';
import { create } from 'zustand';

interface GradeLevelStore {
  listOfAllStudents: any;
  confidenceLevel: any;
  saebrsEmotion: any;
  mySaebrsEmotion: any;
  saeberAcademic: any;
  mySaeberAcademic: any;
  saeberSocial: any;
  mySaeberSocial: any;
  riskMath: any;
  riskReading: any;
  riskSuspension: any;
  riskODR: any;
  genderRisk: any;
  ethnicityRisk: any;
  ellRisk: any;
  setSaebrsEmotion: (emo: any) => void;
  setMySaebrsEmotion: (emo: any) => void;
  setSaeberAcademic: (academic: any) => void;
  setMySaeberAcademic: (academic: any) => void;
  setSaeberSocial: (social: any) => void;
  setMySaeberSocial: (social: any) => void;
  setRiskMath: (math: any) => void;
  setRiskReading: (reading: any) => void;
  setRiskSuspension: (susp: any) => void;
  setConfidenceLevel: (confidence: any) => void;
  setlistOfAllStudents: (students: any) => void;
  setGenderRisk: (gender: any) => void;
  setEthnicityRisk: (ethnicity: any) => void;
  setEllRisk: (ell: any) => void;
  setRiskODR: (odr: any) => void;
}

const useGradeLevel = create<GradeLevelStore>((set: any) => ({
  riskODR: '',
  genderRisk: '',
  listOfAllStudents: undefined,
  confidenceLevel: 0,
  riskMath: '',
  riskReading: '',
  riskSuspension: '',
  saebrsEmotion: '',
  mySaebrsEmotion: '',
  saeberAcademic: '',
  mySaeberAcademic: '',
  saeberSocial: '',
  mySaeberSocial: '',
  ethnicityRisk: '',
  ellRisk: '',
  setSaebrsEmotion: (emo: JSON) => set({ saebrsEmotion: emo }),
  setMySaebrsEmotion: (emo: JSON) => set({ mySaebrsEmotion: emo }),
  setSaeberAcademic: (academic: JSON) => set({ saeberAcademic: academic }),
  setMySaeberAcademic: (academic: JSON) => set({ mySaeberAcademic: academic }),
  setSaeberSocial: (social: JSON) => set({ saeberSocial: social }),
  setMySaeberSocial: (social: JSON) => set({ mySaeberSocial: social }),
  setRiskMath: (math: any) => set({ riskMath: math }),
  setRiskReading: (reading: any) => set({ riskReading: reading }),
  setRiskSuspension: (susp: any) => set({ riskSuspension: susp }),
  setConfidenceLevel: (confidence: any) => set({ confidenceLevel: confidence }),
  setlistOfAllStudents: (students: any) => set({ listOfAllStudents: students }),
  setGenderRisk: (gender: any) => set({ genderRisk: gender }),
  setEthnicityRisk: (ethnicity: any) => set({ ethnicityRisk: ethnicity }),
  setEllRisk: (ell: any) => set({ ellRisk: ell }),
  setRiskODR: (odr: any) => set({ riskODR: odr }),
}));

export default useGradeLevel;
