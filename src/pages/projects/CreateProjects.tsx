import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import FilledButton from "../../components/button/FilledButton";
import PForm from "../../components/form/PForm";
import PImages from "../../components/form/PImages";
import PInput from "../../components/form/PInput";
import PQuillTextEditor from "../../components/form/PQuillTextEditor";
import { useCreateProjectAPIMutation } from "../../redux/features/project.api";
import { projectValidationSchema } from "../../schema/schema";
import { TError, TProject } from "../../types";

export default function CreateProjects() {
  const [createProject, { isLoading }] = useCreateProjectAPIMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const modifiedData: Partial<TProject> = {
      title: data?.title,
      live: data?.live,
      githubClient: data?.githubClient,
      tech: data?.tech?.split(","),
      overview: data?.overview,
      description: data?.description,
    };
    if (data?.order && data?.order > 0) modifiedData["order"] = data?.order;
    if (data?.githubServer) modifiedData["githubServer"] = data?.githubServer;
    console.log(modifiedData);
    const formData = new FormData();
    formData.append("data", JSON.stringify(modifiedData));
    formData.append("file", data?.image[0]);
    const loadingId = toast.loading("Adding new project...");
    try {
      const result = await createProject(formData).unwrap();
      console.log(result);
      if (result?.success) {
        toast.success("Project added successfully", {
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
      <h1 className="text-2xl font-bold mb-6">Create New Project</h1>
      <PForm
        onSubmit={onSubmit}
        resolver={zodResolver(projectValidationSchema)}
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
            // className="md:col-span-2 lg:col-span-3"
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
          />
        </div>
        <FilledButton className="mt-10" isLoading={isLoading}>
          Create
        </FilledButton>
      </PForm>
    </div>
  );
}
