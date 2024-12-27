import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import FilledButton from "../../components/button/FilledButton";
import PForm from "../../components/form/PForm";
import PImages from "../../components/form/PImages";
import PInput from "../../components/form/PInput";
import { useUpdateSkillAPIMutation } from "../../redux/features/skill.api";
import { updateSkillValidationSchema } from "../../schema/schema";
import { TError, TSkillData } from "../../types";

type TProps = {
  skillData: TSkillData;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function EditSkill({ skillData, setOpenModal }: TProps) {
  const [updateSkill, { isLoading }] = useUpdateSkillAPIMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const modifiedData: Partial<TSkillData> = {};
    if (data?.order !== skillData?.order) modifiedData.order = data?.order;
    if (data?.name !== skillData?.name) modifiedData.name = data?.name;

    const formData = new FormData();
    const isImageString = typeof data?.image === "string";
    if (isImageString && Object.keys(modifiedData).length === 0) {
      toast.error("Please change anything before update");
      return;
    } else {
      formData.append("data", JSON.stringify(modifiedData));
      formData.append("file", data?.image[0]);
    }
    const loading = toast.loading("Skill is updating...");
    try {
      const result = await updateSkill({
        data: isImageString ? modifiedData : formData,
        id: skillData?._id,
      }).unwrap();

      if (result?.success) {
        toast.success("Skill updated successfull", { id: loading });
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
    order: skillData?.order,
    name: skillData?.name,
    image: skillData?.image,
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit Skill</h1>
      <PForm
        onSubmit={onSubmit}
        resolver={zodResolver(updateSkillValidationSchema)}
        defaultValues={defaultValues}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <PInput name="name" label="Skill Name*" type="text" />
          <PInput name="order" label="Order No (Optional)" type="number" />
          <PImages
            isImgCropNeed={false}
            maxImageUpload={1}
            name="image"
            label="Image*"
            defaultImages={[skillData?.image]}
          />
        </div>
        <FilledButton className="mt-10" isLoading={isLoading}>
          {skillData ? "Update" : "Create"}
        </FilledButton>
      </PForm>
    </div>
  );
}
