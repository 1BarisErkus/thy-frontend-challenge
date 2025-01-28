import { create } from 'zustand'

type SelectStore = {
  openSelectId: string | null
  setOpenSelectId: (id: string | null) => void
}

export const useSelectStore = create<SelectStore>((set) => ({
  openSelectId: null,
  setOpenSelectId: (id) => set({ openSelectId: id }),
})) 