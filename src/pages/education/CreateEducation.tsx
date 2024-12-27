import { FieldValues, SubmitHandler } from "react-hook-form";
import PForm from "../../components/form/PForm";
import PInput from "../../components/form/PInput";
import FilledButton from "../../components/button/FilledButton";
import PDate from "../../components/form/PDate";
import { useCreateEducationAPIMutation } from "../../redux/features/education.api";
import { toast } from "sonner";
import { TEducation, TError } from "../../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { educationValidationSchema } from "../../schema/schema";

export default function CreateEducation() {
  const [createEducation, { isLoading }] = useCreateEducationAPIMutation();
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
    const modifiedData: Partial<TEducation> = {
      course: data?.course,
      institution: data?.institution,
      startDate: startDate.toISOString(),
    };
    if (data?.order && data?.order > 0) modifiedData["order"] = data?.order;
    if (data?.location) modifiedData["location"] = data?.location;
    if (data?.endDate)
      modifiedData["endDate"] = new Date(data?.startDate).toISOString();
    console.log(modifiedData);
    const loadingId = toast.loading("Adding new education data...");
    try {
      const result = await createEducation(modifiedData).unwrap();
      console.log(result);
      if (result?.success) {
        toast.success("Education data added successfully", {
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
      <h1 className="text-2xl font-bold mb-6">Create Education</h1>
      <PForm
        onSubmit={onSubmit}
        resolver={zodResolver(educationValidationSchema)}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-6">
          <PInput name="order" label="Order No (Optional)" type="number" />
          <PInput name="course" label="Course Name*" type="text" />
          <PInput name="institution" label="Institution Name*" type="text" />
          <PInput name="location" label="Location (Optional)" type="text" />
          <PDate name="startDate" label="Start Date*" />
          <PDate name="endDate" label="End Date (Leave unchanged if running)" />
        </div>
        <FilledButton className="mt-10" isLoading={isLoading}>
          Create
        </FilledButton>
      </PForm>
    </div>
  );
}
