import { create } from 'zustand';

interface PrivateRentModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const usePrivateRentModal = create<PrivateRentModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));

export default usePrivateRentModal;