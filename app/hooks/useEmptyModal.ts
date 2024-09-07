import { create } from 'zustand';

interface EmptyModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useEmptyModal = create<EmptyModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));

export default useEmptyModal;