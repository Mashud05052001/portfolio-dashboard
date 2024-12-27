import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import FilledButton from "../../components/button/FilledButton";
import PForm from "../../components/form/PForm";
import PImages from "../../components/form/PImages";
import PInput from "../../components/form/PInput";
import PQuillTextEditor from "../../components/form/PQuillTextEditor";
import { useUpdateProjectAPIMutation } from "../../redux/features/project.api";
import { updateProjectValidationSchema } from "../../schema/schema";
import { TError, TProject } from "../../types";

type CreateProjectsProps = {
  projectData: TProject;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function EditProject({
  projectData,
  setOpenModal,
}: CreateProjectsProps) {
  const [updateProject, { isLoading }] = useUpdateProjectAPIMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const modifiedData: Partial<TProject> = {};
    if (data?.order !== projectData?.order) modifiedData.order = data?.order;
    if (data?.title !== projectData?.title) modifiedData.title = data?.title;
    if (data?.live !== projectData?.live) modifiedData.live = data?.live;
    if (data?.githubClient !== projectData?.githubClient)
      modifiedData.githubClient = data?.githubClient;
    if (data?.githubServer !== projectData?.githubServer)
      modifiedData.githubServer = data?.githubServer;
    if (data?.tech !== projectData?.tech)
      modifiedData.tech = data?.tech?.split(",");
    if (data?.overview !== projectData?.overview)
      modifiedData.overview = data?.overview;
    if (data?.description !== projectData?.description)
      modifiedData.description = data?.description;

    const formData = new FormData();
    const isImageString = typeof data?.image === "string";
    if (isImageString && Object.keys(modifiedData).length === 0) {
      toast.error("Please change anything before update");
      return;
    } else {
      formData.append("data", JSON.stringify(modifiedData));
      formData.append("file", data?.image[0]);
    }
    const loading = toast.loading("Project is updating...");
    try {
      const result = await updateProject({
        data: isImageString ? modifiedData : formData,
        id: projectData?._id,
      }).unwrap();

      if (result?.success) {
        toast.success("Product updated successfull", { id: loading });
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
    order: projectData?.order,
    title: projectData?.title,
    live: projectData?.live,
    githubClient: projectData?.githubClient,
    githubServer: projectData?.githubServer,
    tech: projectData?.tech?.join(","),
    overview: projectData?.overview,
    description: projectData?.description,
    image: projectData?.image,
  };
  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit Project</h1>
      <PForm
        onSubmit={onSubmit}
        resolver={zodResolver(updateProjectValidationSchema)}
        defaultValues={defaultValues}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-6">
          <PInput name="order" label="Order No (Optional)" type="number" />
          <PInput name="title" label="Project Title*" type="text" />
          <PInput name="live" label="Live Preview*" type="text" />
          <PInput name="githubClient" label="Github Client Repo*" type="text" />
          <PInput
            name="githubServer"
            label="Github Server Repo (Optional)"
            type="text"
          />
          <PInput
            name="tech"
            label="Technologies* Format=tech1,tech2,tech3"
            type="text"
          />
          <PInput
            name="overview"
            label="Overview*"
            type="textarea"
            className="col-span-1 md:col-span-2 lg:col-span-3"
            rows={2}
          />
          <PQuillTextEditor
            name="description"
            label="Details*"
            className="col-span-1 md:col-span-2 lg:col-span-3 "
          />
          <PImages
            isImgCropNeed={false}
            maxImageUpload={1}
            name="image"
            label="Image*"
            defaultImages={[projectData?.image]}
          />
        </div>
        <FilledButton className="mt-10" isLoading={isLoading}>
          Update
        </FilledButton>
      </PForm>
    </div>
  );
}
