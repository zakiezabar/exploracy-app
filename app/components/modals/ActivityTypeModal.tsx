'use client'
import Modal from './Modal'; // Assuming this is the correct path
import ImageButton from '../ImageButton';

interface ActivityTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPublic: () => void;
  onPrivate: () => void;
}

const ActivityTypeModal: React.FC<ActivityTypeModalProps> = ({ 
  isOpen,
  onClose,
  onPublic,
  onPrivate
}) => {

  const handlePublicActivity = () => {
    onPublic();
    onClose();
  };

  const handlePrivateActivity = () => {
    onPrivate();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Choose Activity Type"
      body={
        <div className="grid grid-cols-2 gap-4 p-4">
          <ImageButton
            imageSrc="/images/icon-Cultural.png" // Replace with your actual image path
            title="Public Activity"
            onClick={handlePublicActivity}
          />
          <ImageButton
            imageSrc="/images/icon-Fitness.png" // Replace with your actual image path
            title="Private Activity"
            onClick={handlePrivateActivity}
          />
        </div>
      }
    />
  );
};

export default ActivityTypeModal;


// import React from 'react';
// import Modal from "./Modal";
// import Button from '../Button';  // Assuming a Button component for UI consistency

// interface ActivityTypeModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onChoosePublic: () => void;
//   onChoosePrivate: () => void;
// }

// const ActivityTypeModal: React.FC<ActivityTypeModalProps> = ({ isOpen, onClose, onChoosePublic, onChoosePrivate }) => {
//   const bodyContent = (
//     <div className="text-center p-4">
//       <h2>Do you want to create a public or private activity?</h2>
//       <div className="mt-4">
//         <Button label="Public" onClick={onChoosePublic} />
//         <Button label="Private" onClick={onChoosePrivate} />
//       </div>
//     </div>
//   );

//   return (
//     <Modal
//       isOpen={isOpen}
//       onClose={onClose}
//       onSubmit={onClose} // There is no specific form submission, so this could technically trigger close as well
//       title="Select Activity Type"
//       body={bodyContent}
//       actionLabel="Close"  // This button can be used just to close if no other actions are needed
//       secondaryAction={onClose}
//       secondaryActionLabel="Cancel"  // Allows cancellation of the action
//     />
//   );
// };

// export default ActivityTypeModal;
