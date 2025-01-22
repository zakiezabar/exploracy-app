'use client'

import useCreateActivityModal from "@/app/hooks/useCreateCreateActivityModal";

import Modal from "./Modal";
import { useMemo, useState } from "react";
import Heading from "../Heading";
import SubHeading from "../SubHeading";
import { categories } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import CountrySelect from "../inputs/CountrySelect";
import StateSelect from "../inputs/StateSelect";

import dynamic from "next/dynamic";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from 'next/navigation';

interface CreateActivityModalProps {
    isOpen: boolean;
    onClose: () => void;
}

enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    TITLE = 2,
    INFO = 3,
    // DESCRIPTION = 4,
    // PRICE = 5
}

const CreateActivityModal: React.FC<CreateActivityModalProps> = ({
    isOpen,
    onClose,
}) => {
    const router = useRouter();
    // const CreateActivityModal = useCreateActivityModal();

    const [step, setStep] = useState(STEPS.CATEGORY);
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
        },
        reset
    } = useForm<FieldValues>({
        defaultValues:{
            category: '',
            location: null,
            // capacityLimit: 10,
            guestCount: 10,
            imageSrc: '',
            price: '0',
            title:'',
            description: '',
            highlight: '',
            whatsIncluded: '',
            requirement: '',
            difficulty: 'Normal',
        }
    });

    const category = watch('category');
    const location = watch('location');
    const guestCount = watch('guestCount');
    const imageSrc = watch('imageSrc');

    const Map = useMemo(() => dynamic(() => import('../Map'), {
        ssr: false
    }), []);

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
        })
    }

    const onBack = () => {
        setStep((value) => value - 1);
    };

    const onNext = () => {
        setStep((value) => value + 1);
    }

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (step !== STEPS.INFO) {
            return onNext();
        }

        setIsLoading(true)

        axios.post('/api/listings', data)
        .then(() => {
            toast.success('Listing created!');
            router.refresh();
            reset();
            setStep(STEPS.CATEGORY);
            onClose();
        })
        .catch(() => {
            toast.error('Something went wrong.');
        }).finally(() => {
            setIsLoading(false);
        })
    }

    const actionLabel = useMemo(() => {
        if (step == STEPS.INFO) {
            return 'Create';
        }

        return 'Next';
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        if (step == STEPS.CATEGORY) {
            return undefined;
        }
        return 'Back';
    }, [step]);

    let bodyContent = (
        <div className="flex flex-col gap-2">
            <Heading
            title="Which of these best describes your activity?"
            subtitle="Select a category"/>
            <div className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-2
            max-h-[60vh]
            overflow-y-auto
            ">
                {categories.map((item) => (
                    <div key={item.label} className="col-span-1">
                        <CategoryInput 
                            onClick={(category) => 
                            setCustomValue('category', category)}
                            selected={category == item.label}
                            label={item.label}
                            icon={item.icon}
                        />
                    </div>
                ))}
            </div>
        </div>
    )

    if (step === STEPS.LOCATION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                title="Where is your activity located?"
                subtitle="Help guests find you!"
                />
                <StateSelect 
                value={location}
                onChange={(value) => setCustomValue('location', value)}/>
                {/* <Map
                center={location?.latlng}
                /> */}
                <Input 
                    id="locationDetails"
                    label="Enter the landmark to your location."
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
        )
    }

    if (step === STEPS.TITLE) {
        bodyContent = (
          <div className="flex flex-col gap-8">
            <Heading
              title="How would you describe this activity?"
              subtitle="Describe what makes this activity unique and help quests to understand what they can expect."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <SubHeading
                  title="Add a photo to your activity"
                  subtitle="Show guest what your activity looks like!"
              />
              <ImageUpload
              value={imageSrc}
              onChange={(value) => setCustomValue('imageSrc', value)}
              />
            </div>
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <SubHeading
                    title="Add a photo to your activity"
                    subtitle="Show guest what your activity looks like!"
                />
                <Input 
                    id="title"
                    label="Activity name"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    capitalize
                    required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <SubHeading
                    title="Add a photo to your activity"
                    subtitle="Show guest what your activity looks like!"
                />
                <Input
                    id="description"
                    label="Description of your activity"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
              </div>
            </div>
            <div className="flex flex-col gap-8">
              <Heading
                  title="Activity highlights"
                  subtitle="Provide a brief description of the key activities and experiences guests will engage in. Highlight any unique aspects or attractions."
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <SubHeading
                    title="Add a photo to your activity"
                    subtitle="Show guest what your activity looks like!"
                />
                <Input 
                  id="highlight"
                  label="What exactly guests will do?"
                  disabled={isLoading}
                  register={register}
                  errors={errors}
                  capitalize
                  required
              />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <SubHeading
                    title="Add a photo to your activity"
                    subtitle="Show guest what your activity looks like!"
                />
                <Input 
                    id="whatsIncluded"
                    label="What's included in this activity (special perks or features)?."
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    capitalize
                    required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <SubHeading
                    title="List essential items guests need to bring to participate in this activity."
                    subtitle="Show guest what your activity looks like!"
                />
                <Input 
                    id="requirement"
                    label="Enter items"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    capitalize
                    required
                />
              </div>
            </div>
          </div>
        )
    }

    if (step === STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="What would be the price for this activity?"
                    subtitle="How much do you charge per pax?"
                />
                <Input
                    id="price"
                    // label="Price"
                    formatPrice
                    type="number"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <Counter
                    title="Capacity limit"
                    subtitle="How many guests do you allow"
                    value={guestCount}
                    onChange={(value) => setCustomValue('guestCount', value)}
                />
            </div>
        )
    }

    // if (step === STEPS.LOCATION) {
    //     bodyContent = (
    //         <div className="flex flex-col gap-8">
    //             <Heading
    //             title="Where is your activity located?"
    //             subtitle="Help guests find you!"
    //             />
    //             <StateSelect 
    //             value={location}
    //             onChange={(value) => setCustomValue('location', value)}/>
    //             <Map
    //             center={location?.latlng}
    //             />
    //         </div>
    //     )
    // }

    // if (step === STEPS.PRICE) {
    //     bodyContent = (
    //         <div className="flex flex-col gap-8">
    //             <Heading
    //                 title="What would be the price for this activity?"
    //                 subtitle="How much do you charge per pax?"
    //             />
    //             <Input
    //                 id="price"
    //                 label="Price"
    //                 formatPrice
    //                 type="number"
    //                 disabled={isLoading}
    //                 register={register}
    //                 errors={errors}
    //                 required
    //             />
    //         </div>
    //     )
    // }

    return (
        <Modal
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit(onSubmit)}
        actionLabel={actionLabel}
        secondaryActionLabel={secondaryActionLabel}
        secondaryAction={step == STEPS.CATEGORY ? undefined : onBack}
        title="Create new activity"
        body={bodyContent}
        fullscreen
        />
    );
}
 
export default CreateActivityModal;