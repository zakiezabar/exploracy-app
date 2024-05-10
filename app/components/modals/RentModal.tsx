'use client'

import useRentModal from "@/app/hooks/useRentModal";

import Modal from "./Modal";
import { useMemo, useState } from "react";
import Heading from "../Heading";
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

enum STEPS {
    CATEGORY = 0,
    DESCRIPTION = 1,
    IMAGES = 2,
    INFO = 3,
    // DESCRIPTION = 4,
    // PRICE = 5
}

const RentModal = () => {
    const router = useRouter();
    const rentModal = useRentModal();

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
            price: '',
            title:'',
            description: '',
            highlight: '',
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
            rentModal.onClose();
        })
        .catch(() => {
            toast.error('Something went wronng.');
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
        <div className="flex flex-col gap-8">
            <Heading
            title="Which of these best describes your activity?"
            subtitle="Select a category"/>
            <div className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-3
            max-h-[50vh]
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

    if (step === STEPS.DESCRIPTION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="How would you describe this activity?"
                    subtitle="Something that is very sweet and nice"
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
                <Input
                    id="description"
                    label="Description"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <Input 
                    id="hightlight"
                    label="What you'll do?"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    capitalize
                    required
                />
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
            </div>
        )
    }

    if (step === STEPS.IMAGES) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Add a photo to your activity"
                    subtitle="Show guest what your activity looks like!"
                />
                <ImageUpload
                value={imageSrc}
                onChange={(value) => setCustomValue('imageSrc', value)}
                />
            </div>
        )
    }

    if (step === STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                title="Share some basic information about your activity"
                subtitle="What are you offering?"
                />
                <Counter
                    title="Capacity limit"
                    subtitle="How many guests do you allow"
                    value={guestCount}
                    onChange={(value) => setCustomValue('guestCount', value)}
                />
                <Heading
                    title="What would be the price for this activity?"
                    subtitle="How much do you charge per pax?"
                />
                <Input
                    id="price"
                    label="Price"
                    formatPrice
                    type="number"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
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
        isOpen={rentModal.isOpen}
        onClose={rentModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        actionLabel={actionLabel}
        secondaryActionLabel={secondaryActionLabel}
        secondaryAction={step == STEPS.CATEGORY ? undefined : onBack}
        title="Create new activity"
        body={bodyContent}
        />
    );
}
 
export default RentModal;