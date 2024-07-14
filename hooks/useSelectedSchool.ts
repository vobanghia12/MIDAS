import { create } from 'zustand';

interface SelectedSchoolStore {
  id: string;
  data: any;
  setId: (value: string) => void;
  setData: (value: any) => void;
}

const useSelectedSchool = create<SelectedSchoolStore>((set: any) => ({
  id: '',
  data: undefined,
  setId: (value: string) => set({ id: value }),
  setData: (value: any) => set({ data: value })
}));


export default useSelectedSchool;
