import { zodResolver } from "@hookform/resolvers/zod";
import moment from "moment";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import FilledButton from "../../components/button/FilledButton";
import PDate from "../../components/form/PDate";
import PForm from "../../components/form/PForm";
import PInput from "../../components/form/PInput";
import { useUpdateEducationAPIMutation } from "../../redux/features/education.api";
import { educationValidationSchema } from "../../schema/schema";
import { TEducation, TError } from "../../types";

type TProps = {
  educationData: TEducation;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function EditEducation({ educationData, setOpenModal }: TProps) {
  const [updateEducation, { isLoading }] = useUpdateEducationAPIMutation();

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
    const modifiedData: Partial<TEducation> = {};
    if (data?.order !== educationData?.order) modifiedData.order = data?.order;
    if (data?.course !== educationData?.course)
      modifiedData.course = data?.course;
    if (data?.institution !== educationData?.institution)
      modifiedData.institution = data?.institution;
    if (data?.location !== educationData?.location)
      modifiedData.location = data?.location;
    if (startDate.toISOString() !== educationData?.startDate)
      modifiedData.startDate = startDate?.toISOString();
    if (data?.endDate)
      modifiedData.endDate = new Date(data?.enddate).toISOString();
    if (educationData?.endDate && data?.endDate === undefined) {
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

    const loading = toast.loading("Education data is updating...");
    try {
      const result = await updateEducation({
        data: modifiedData,
        id: educationData?._id,
      }).unwrap();

      if (result?.success) {
        toast.success("Education data updated successfull", { id: loading });
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
    order: educationData?.order,
    course: educationData?.course,
    institution: educationData?.institution,
    location: educationData?.location,
  };

  const startDate = moment(educationData?.startDate).format("DD-MM-YYYY");
  const endDate = educationData?.endDate
    ? moment(educationData?.endDate).format("DD-MM-YYYY")
    : "Running";

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        {educationData ? "Edit Project" : "Create New Project"}
      </h1>
      <PForm
        onSubmit={onSubmit}
        resolver={zodResolver(educationValidationSchema)}
        defaultValues={defaultValues}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-6">
          <PInput name="order" label="Order No (Optional)" type="number" />
          <PInput name="course" label="Course Name*" type="text" />
          <PInput name="institution" label="Institution Name*" type="text" />
          <PInput name="location" label="Location (Optional)" type="text" />
          <PDate name="startDate" label={`Start Date* Previous=${startDate}`} />
          <PDate name="endDate" label={`End Date Previous=${endDate}`} />
        </div>
        <FilledButton className="mt-10" isLoading={isLoading}>
          Update
        </FilledButton>
      </PForm>
    </div>
  );
}
