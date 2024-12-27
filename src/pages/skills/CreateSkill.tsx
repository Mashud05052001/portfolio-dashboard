import { FieldValues, SubmitHandler } from "react-hook-form";
import FilledButton from "../../components/button/FilledButton";
import PForm from "../../components/form/PForm";
import PImages from "../../components/form/PImages";
import PInput from "../../components/form/PInput";
import { useCreateSkillAPIMutation } from "../../redux/features/skill.api";
import { TError, TSkillData } from "../../types";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { skillValidationSchema } from "../../schema/schema";

const CreateSkill = () => {
  const [createSkill, { isLoading }] = useCreateSkillAPIMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const modifiedData: Partial<TSkillData> = {
      name: data?.name,
    };
    if (data?.order && data?.order > 0) modifiedData["order"] = data?.order;
    const formData = new FormData();
    formData.append("data", JSON.stringify(modifiedData));
    formData.append("file", data?.image[0]);

    const loadingId = toast.loading("Adding new skill...");
    try {
      const result = await createSkill(formData).unwrap();
      console.log(result);
      if (result?.success) {
        toast.success("Skill added successfully", {
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
    <div className="max-w-4xl">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Add Skill</h1>
        <PForm
          onSubmit={onSubmit}
          resolver={zodResolver(skillValidationSchema)}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <PInput name="name" label="Skill Name*" type="text" />
            <PInput name="order" label="Order No (Optional)" type="number" />
            <PImages
              isImgCropNeed={false}
              maxImageUpload={1}
              name="image"
              label="Image*"
            />
          </div>
          <FilledButton className="mt-10" isLoading={isLoading}>
            Create
          </FilledButton>
        </PForm>
      </div>
    </div>
  );
};

export default CreateSkill;
