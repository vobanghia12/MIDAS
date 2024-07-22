import { create } from 'zustand';

interface SelectedSchoolStore {
  id: string;
  name: string;
  data: any;
  setId: (value: string) => void;
  setName: (value: string) => void;
  setData: (value: any) => void;
}

const useSelectedSchool = create<SelectedSchoolStore>((set: any) => ({
  id: '',
  name: '',
  data: undefined,
  setId: (value: string) => set({ id: value }),
  setName: (value: string) => set({ name: value }),
  setData: (value: any) => set({ data: value })
}));


export default useSelectedSchool;
