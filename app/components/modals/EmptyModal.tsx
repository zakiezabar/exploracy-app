'use client';

import useEmptyModal from "@/app/hooks/useEmptyModal";
import Modal from "./Modal";

const EmptyModal = () => {
    const emptyModal = useEmptyModal();
    return ( 
        <Modal
        isOpen={emptyModal.isOpen}
        onClose={emptyModal.onClose}
        onSubmit={emptyModal.onClose}
        actionLabel="Submit"
        title="Empty Popup"
        />
     );
}
 
export default EmptyModal;