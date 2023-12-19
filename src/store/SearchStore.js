

import { create } from "zustand";


const useSearchStore = create((set, get) => ({
    content: "",
    setContent: (args) => set({ content: args })
}))

export default useSearchStore;