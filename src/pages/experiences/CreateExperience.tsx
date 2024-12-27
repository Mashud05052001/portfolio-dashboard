import { FieldValues, SubmitHandler } from "react-hook-form";
import PForm from "../../components/form/PForm";
import PInput from "../../components/form/PInput";
import FilledButton from "../../components/button/FilledButton";
import PDate from "../../components/form/PDate";
import { TError, TExperience } from "../../types";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { experienceValidationSchema } from "../../schema/schema";
import { useCreateExperienceAPIMutation } from "../../redux/features/experience.api";

export default function CreateExperience() {
  const [createExperience, { isLoading }] = useCreateExperienceAPIMutation();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const startDate = new Date(data?.startDate);
    const currentDate = new Date();
    if (startDate > new Date()) {
      toast.error("Start date cannot be in the future.");
      return;
    } else if (data?.endDate) {
      const endDate = new Date(data?.endDate);
      if (endDate > currentDate) {
        toast.error(
          "End date cannot be in the future. Please delete enddate if you are continue it"
        );
        return;
      } else if (endDate < startDate) {
        toast.error("End date cannot be before the start date.");
        return;
      }
    }
    const modifiedData: Partial<TExperience> = {
      company: data?.company,
      designation: data?.designation,
      startDate: startDate.toISOString(),
      description: data?.description,
    };
    if (data?.order && data?.order > 0) modifiedData["order"] = data?.order;
    if (data?.location) modifiedData["location"] = data?.location;
    if (data?.technologies)
      modifiedData["technologies"] = (data?.technologies as string).split(",");
    if (data?.endDate)
      modifiedData["endDate"] = new Date(data?.startDate).toISOString();

    const loadingId = toast.loading("Adding new experience data...");
    try {
      const result = await createExperience(modifiedData).unwrap();
      console.log(result);
      if (result?.success) {
        toast.success("Experience data added successfully", {
          id: loadingId,
        });
      } else {
        toast.error(`Something went wrong! Please try again`, {
          id: loadingId,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(`Failed. ${(error as TError)?.data?.message}`, {
        id: loadingId,
      });
    }
  };
  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Create Experience</h1>
      <PForm
        onSubmit={onSubmit}
        resolver={zodResolver(experienceValidationSchema)}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-6">
          <PInput name="order" label="Order No (Optional)" type="number" />
          <PInput name="company" label="Company Name*" type="text" />
          <PInput name="designation" label="Designation*" type="text" />
          <PInput name="location" label="Location (Optional)" type="text" />
          <PDate name="startDate" label="Start Date*" />
          <PDate name="endDate" label="End Date (Leave unchanged if running)" />
          <PInput
            name="technologies"
            label="Technologies (Optional) Format=tech1,tech2,tech3"
            type="text"
          />
          <PInput
            name="description"
            label="Description"
            type="textarea"
            className="col-span-1 md:col-span-2 lg:col-span-3"
            rows={2}
          />
        </div>
        <FilledButton className="mt-10" isLoading={isLoading}>
          Create
        </FilledButton>
      </PForm>
    </div>
  );
}
