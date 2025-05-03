"use client";

import { useMemo, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import axios from "axios";
import toast from "react-hot-toast";

import { categories } from "@/components/navbar/Categories";
import Heading from "@/components/Heading";
import SubHeading from "@/components/SubHeading";
import CategoryInput from "@/components/inputs/CategoryInput";
import StateSelect from "@/components/inputs/StateSelect";
import Counter from "@/components/inputs/Counter";
import ImageUpload from "@/components/inputs/ImageUpload";
import Input from "@/components/inputs/Input";
import { Button } from "@/components/ui/button";
import InviteUsers from "@/components/InviteUsers";

import { FiCheck } from "react-icons/fi";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  TITLE = 2,
  INFO = 3,
}

const stepLabels = ["Category", "Location", "Details", "Info"];
const requiredFields: Record<STEPS, string[]> = {
  [STEPS.CATEGORY]: ["category"],
  [STEPS.LOCATION]: ["location", "locationDetails"],
  [STEPS.TITLE]: [
    "title",
    "description",
    "imageSrc",
    "highlight",
    "whatsIncluded",
    "requirement",
  ],
  [STEPS.INFO]: ["price", "guestCount"],
};

const CreateActivityClient = () => {
  const router = useRouter();
  const [step, setStep] = useState(STEPS.CATEGORY);
  const [isLoading, setIsLoading] = useState(false);
  const [inviteEmails, setInviteEmails] = useState<string[]>([]);
  const [isSendingInvites, setIsSendingInvites] = useState(false);

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
      locationDetails: "",
      guestCount: 10,
      imageSrc: "",
      price: "0",
      title: "",
      description: "",
      highlight: "",
      whatsIncluded: "",
      requirement: "",
      difficulty: "Normal",
      public: false,
    },
  });

  const allFields = watch();

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

  const onBack = () => setStep((value) => value - 1);
  const onNext = () => setStep((value) => value + 1);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (step !== STEPS.INFO) {
      return onNext();
    }

    setIsLoading(true);
    try {
      const response = await axios.post("/api/listings", data);
      const listingId = response.data.id;

      if (inviteEmails.length > 0) {
        await axios.post("/api/invitations", {
          listingId,
          emails: inviteEmails,
        });
      }

      toast.success("Activity created and invitations sent!");
      router.push("/activities");
      reset();
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const progress = useMemo(() => {
    return ((step + 1) / Object.keys(STEPS).length) * 2 * 100;
  }, [step]);

  const isStepComplete = (stepIndex: STEPS): boolean =>
    requiredFields[stepIndex].every((field) => !!allFields[field]);

  let bodyContent: JSX.Element = <></>;

  if (step === STEPS.CATEGORY) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Which of these best describes your activity?"
          subtitle="Select a category"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories.map((item) => (
            <CategoryInput
              key={item.label}
              onClick={(category) => setCustomValue("category", category)}
              selected={allFields.category === item.label}
              label={item.label}
              icon={item.icon}
            />
          ))}
        </div>
      </div>
    );
  }

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
              value={allFields.location}
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
              label="Location details"
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
              value={allFields.imageSrc}
              onChange={(value) => setCustomValue("imageSrc", value)}
            />
          </div>
        </div>
        {[
          "title",
          "description",
          "highlight",
          "whatsIncluded",
          "requirement",
        ].map((id, idx) => (
          <div key={id} className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <SubHeading title={`Field ${idx + 1}`} subtitle={`Enter ${id}`} />
            <div className="col-span-2">
              <Input
                id={id}
                label={id.replace(/([A-Z])/g, " $1")}
                disabled={isLoading}
                register={register}
                errors={errors}
                required
              />
            </div>
          </div>
        ))}
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
          value={allFields.guestCount}
          onChange={(value) => setCustomValue("guestCount", value)}
        />
        <Heading title="Invite friends" subtitle="Ajak la kengkawan" />
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="public"
            {...register("public")}
            className="w-4 h-4"
          />
          <label htmlFor="public" className="text-sm text-gray-600">
            Make this activity public (If unchecked, only invited users can view
            this activity)
          </label>
        </div>
        <InviteUsers onEmailsChange={setInviteEmails} />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen pt-8">
      <div className="max-w-6xl mx-auto flex">
        {/* Fixed Sidebar */}
        <aside className="w-60 fixed top-24 left-1/3 -translate-x-1/3 lg:-translate-x-[320px] p-6 h-[calc(100vh-200px)] bg-mono-100 border-r-2 border-mono-200 z-10">
          <ul className="space-y-4">
            {stepLabels.map((label, index) => (
              <li
                key={label}
                className={`cursor-pointer flex justify-between items-center gap-2 ${
                  step === index
                    ? "font-bold text-mono-800"
                    : "text-mono-400"
                }`}
                onClick={() => setStep(index as STEPS)}
              >
                <span>{label} </span>
                {isStepComplete(index as STEPS) && <FiCheck />}
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Content */}
        <main className="relative h-dvh ml-0 lg:ml-64 w-full max-w-4xl pl-4 pr-4 pb-40">
          <div className="max-w-4xl mx-auto flex flex-col gap-8">
            {bodyContent}
          </div>
          {/* Bottom Navigation */}
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t z-50">
            <div className="w-full bg-gray-200 h-1">
              <div
                className="bg-secondary-600 rounded-r-full h-1 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="max-w-6xl mx-auto px-6 py-4 flex justify-end gap-4">
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
                {step === STEPS.INFO
                  ? isLoading || isSendingInvites
                    ? "Creating..."
                    : "Create Activity"
                  : "Next"}
              </Button>
            </div>
          </div>
        </main>

      </div>
    </div>
  );
};

export default CreateActivityClient;
