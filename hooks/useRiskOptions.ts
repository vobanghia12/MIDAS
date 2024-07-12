import { create } from 'zustand';

interface RiskOptionStore {
  isTotalScore: boolean;
  isEmotional: boolean;
  isSocial: boolean;
  isAcademic: boolean;
  isGender: boolean;
  isEnglishLeaner: boolean;
  isEthnicity: boolean;
  onTotalScore: () => void;
  onEmotional: () => void;
  onSocial: () => void;
  onAcademic: () => void;
  onGender: () => void;
  onEnglishLearner: () => void;
  onEthnicity: () => void;
}

const useRiskOptions = create<RiskOptionStore>((set: any) => ({
  isTotalScore: false,
  isEmotional: false,
  isSocial: false,
  isAcademic: false,
  isGender: false,
  isEnglishLeaner: false,
  isEthnicity: false,
  onTotalScore: () =>
    set({
      isTotalScore: true,
      isEmotional: false,
      isSocial: false,
      isAcademic: false,
      isGender: false,
      isEnglishLeaner: false,
      isEthnicity: false,
    }),
  onEmotional: () =>
    set({
      isTotalScore: false,
      isEmotional: true,
      isSocial: false,
      isAcademic: false,
      isGender: false,
      isEnglishLeaner: false,
      isEthnicity: false,
    }),
  onSocial: () =>
    set({
      isTotalScore: false,
      isEmotional: false,
      isSocial: true,
      isAcademic: false,
      isGender: false,
      isEnglishLeaner: false,
      isEthnicity: false,
    }),
  onAcademic: () =>
    set({
      isTotalScore: false,
      isEmotional: false,
      isSocial: false,
      isAcademic: true,
      isGender: false,
      isEnglishLeaner: false,
      isEthnicity: false,
    }),
  onGender: () =>
    set({
      isTotalScore: false,
      isEmotional: false,
      isSocial: false,
      isAcademic: false,
      isGender: true,
      isEnglishLeaner: false,
      isEthnicity: false,
    }),
  onEnglishLearner: () =>
    set({
      isTotalScore: false,
      isEmotional: false,
      isSocial: false,
      isAcademic: false,
      isGender: false,
      isEnglishLeaner: true,
      isEthnicity: false,
    }),
  onEthnicity: () =>
    set({
      isTotalScore: false,
      isEmotional: false,
      isSocial: false,
      isAcademic: false,
      isGender: false,
      isEnglishLeaner: false,
      isEthnicity: true,
    }),
}));

export default useRiskOptions;
