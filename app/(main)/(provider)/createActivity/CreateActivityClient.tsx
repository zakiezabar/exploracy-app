"use client";

import { useMemo, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import axios from "axios";
import toast from "react-hot-toast";
import { SafeUser } from "@/app/types";

import { categories } from "@/components/navbar/Categories";
import Heading from "@/components/Heading";
import SubHeading from "@/components/SubHeading";
import CategoryInput from "@/components/inputs/CategoryInput";
import StateSelect from "@/components/inputs/StateSelect";
import Counter from "@/components/inputs/Counter";
import ImageUpload from "@/components/inputs/ImageUpload";
import Input from "@/components/inputs/Input";
import { Button } from "@/components/ui/button";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  TITLE = 2,
  INFO = 3,
}

const CreateActivityClient = () => {
  const router = useRouter();
  const [step, setStep] = useState(STEPS.CATEGORY);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 10,
      imageSrc: "",
      price: "0",
      title: "",
      description: "",
      highlight: "",
      whatsIncluded: "",
      requirement: "",
      difficulty: "Normal",
    },
  });

  const category = watch("category");
  const location = watch("location");
  const guestCount = watch("guestCount");
  const imageSrc = watch("imageSrc");

  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/Map"), {
        ssr: false,
      }),
    []
  );

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.INFO) {
      return onNext();
    }

    setIsLoading(true);

    axios
      .post("/api/listings", data)
      .then(() => {
        toast.success("Activity created!");
        router.push("/activities");
        reset();
      })
      .catch(() => {
        toast.error("Something went wrong.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const progress = useMemo(() => {
    return ((step + 1) / Object.keys(STEPS).length) * 2 * 100;
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these best describes your activity?"
        subtitle="Select a category"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={(category) => setCustomValue("category", category)}
              selected={category == item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your activity located?"
          subtitle="Help guests find you!"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <SubHeading
            title="Location"
            subtitle="Where is your activity state located?"
          />
          <div className="col-span-2">
            <StateSelect
              value={location}
              onChange={(value) => setCustomValue("location", value)}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <SubHeading
            title="Location details"
            subtitle="Enter the landmark to your location."
          />
          <div className="col-span-2">
            <Input
              id="locationDetails"
              label="Provide the details of your location"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />
          </div>
        </div>
      </div>
    );
  }

  if (step === STEPS.TITLE) {
    bodyContent = (
      <div className="flex flex-col gap-8 pb-12">
        <Heading
          title="How would you describe this activity?"
          subtitle="Describe what makes this activity unique."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SubHeading
            title="Add photo"
            subtitle="Show guests what your activity looks like!"
          />
          <div className="col-span-2">
            <ImageUpload
              value={imageSrc}
              onChange={(value) => setCustomValue("imageSrc", value)}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <SubHeading
            title="Actitvity title"
            subtitle="What is the name of your activity?"
          />
          <div className="col-span-2">
            <Input
              id="title"
              label="Enter activity title"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <SubHeading
            title="Description"
            subtitle="What makes your activity unique?"
          />
          <div className="col-span-2">
            <Input
              id="description"
              label="Description"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />
          </div>
        </div>
        <hr className="border-mono-200" />
        <Heading
          title="Activity details"
          subtitle="Provide more information or highlights about your activity"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <SubHeading
            title="Activity title"
            subtitle="Give your activity a name"
          />
          <div className="col-span-2">
            <Input
              id="highlight"
              label="What will guests do?"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <SubHeading
            title="Activity title"
            subtitle="Give your activity a name"
          />
          <div className="col-span-2">
            <Input
              id="whatsIncluded"
              label="What's included?"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <SubHeading
            title="Activity title"
            subtitle="Give your activity a name"
          />
          <div className="col-span-2">
            <Input
              id="requirement"
              label="Required items"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />
          </div>
        </div>
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="Final details" subtitle="Set your price and capacity" />
        <Input
          id="price"
          formatPrice
          type="number"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Counter
          title="Capacity limit"
          subtitle="Maximum number of guests"
          value={guestCount}
          onChange={(value) => setCustomValue("guestCount", value)}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] pt-8">
      {/* Main content */}
      <div className="">
        <div className="flex flex-col gap-8 pb-16">{bodyContent}</div>
      </div>
      {/* Fixed bottom navigation */}
      <div className="fixed bottom-0 md:bottom-0 left-0 right-0 bg-white border-t">
        {/* Progress bar */}
        <div className="w-full bg-gray-200 h-1">
          <div
            className="bg-secondary-600 rounded-r-full h-1 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Navigation buttons */}
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex gap-4 justify-end">
            {step !== STEPS.CATEGORY && (
              <Button
                onClick={onBack}
                size="lg"
                className="px-6 py-3 text-mono-800 border-2 bg-white border-gray-300 rounded-lg hover:bg-mono-200"
                disabled={isLoading}
              >
                Back
              </Button>
            )}
            <Button
              onClick={handleSubmit(onSubmit)}
              variant="primary"
              size="lg"
              disabled={isLoading}
            >
              {step === STEPS.INFO ? "Create Activity" : "Next"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateActivityClient;
