import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import FilledButton from "../../components/button/FilledButton";
import PDate from "../../components/form/PDate";
import PForm from "../../components/form/PForm";
import PInput from "../../components/form/PInput";
import { useUpdateExperienceAPIMutation } from "../../redux/features/experience.api";
import { experienceValidationSchema } from "../../schema/schema";
import { TError, TExperience } from "../../types";
import moment from "moment";

type TProps = {
  experienceData: TExperience;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function EditExperience({
  experienceData,
  setOpenModal,
}: TProps) {
  const [updateExperience, { isLoading }] = useUpdateExperienceAPIMutation();

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
    const modifiedData: Partial<TExperience> = {};
    if (data?.order !== experienceData?.order) modifiedData.order = data?.order;
    if (data?.company !== experienceData?.company)
      modifiedData.company = data?.company;
    if (data?.designation !== experienceData?.designation)
      modifiedData.designation = data?.designation;
    if (data?.location !== experienceData?.location)
      modifiedData.location = data?.location;
    if (data?.description !== experienceData?.description)
      modifiedData.description = data?.description;
    if (data?.technologies !== experienceData?.technologies?.join(","))
      modifiedData.technologies = data?.technologies?.split(",");
    if (startDate.toISOString() !== experienceData?.startDate)
      modifiedData.startDate = startDate?.toISOString();
    if (data?.endDate)
      modifiedData.endDate = new Date(data?.enddate).toISOString();
    if (experienceData?.endDate && data?.endDate === undefined) {
      const confirm = window.confirm(
        "Are you sure to make this course running again? If not plese select previous date."
      );
      if (!confirm) {
        return;
      }
      modifiedData.endDate = null;
    }
    if (Object.keys(modifiedData).length === 0) {
      toast.error("Please change anything before update");
      return;
    }
    const loading = toast.loading("Experience data is updating...");
    try {
      const result = await updateExperience({
        data: modifiedData,
        id: experienceData?._id,
      }).unwrap();

      if (result?.success) {
        toast.success("Experience data updated successfull", { id: loading });
        setOpenModal(false);
      } else {
        toast.error("Something went wrong! Please try again", {
          id: loading,
        });
      }
    } catch (error) {
      toast.error(`Failed. ${(error as TError)?.data?.message}`, {
        id: loading,
      });
    }
  };
  const defaultValues = {
    order: experienceData?.order,
    company: experienceData?.company,
    designation: experienceData?.designation,
    location: experienceData?.location,
    description: experienceData?.description,
    technologies: experienceData?.technologies?.join(","),
  };

  const startDate = moment(experienceData?.startDate).format("DD-MM-YYYY");
  const endDate = experienceData?.endDate
    ? moment(experienceData?.endDate).format("DD-MM-YYYY")
    : "Running";

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        {experienceData ? "Edit Project" : "Create New Project"}
      </h1>
      <PForm
        onSubmit={onSubmit}
        resolver={zodResolver(experienceValidationSchema)}
        defaultValues={defaultValues}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-6">
          <PInput name="order" label="Order No (Optional)" type="number" />
          <PInput name="company" label="Company Name*" type="text" />
          <PInput name="designation" label="Designation*" type="text" />
          <PInput name="location" label="Location (Optional)" type="text" />
          <PDate name="startDate" label={`Start Date* Previous=${startDate}`} />
          <PDate name="endDate" label={`End Date Previous=${endDate}`} />
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
          Update
        </FilledButton>
      </PForm>
    </div>
  );
}
