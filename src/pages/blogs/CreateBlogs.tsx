import { FieldValues, SubmitHandler } from "react-hook-form";
import PForm from "../../components/form/PForm";
import PInput from "../../components/form/PInput";
import PImages from "../../components/form/PImages";
import FilledButton from "../../components/button/FilledButton";
import PQuillTextEditor from "../../components/form/PQuillTextEditor";
import { useCreateBlogAPIMutation } from "../../redux/features/blog.api";
import { toast } from "sonner";
import { TBlog, TError } from "../../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { blogValidationSchema } from "../../schema/schema";

export default function CreateBlogs() {
  const [createBlog, { isLoading }] = useCreateBlogAPIMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const modifiedData: Partial<TBlog> = {
      title: data?.title,
      category: data?.category,
      overview: data?.overview,
      description: data?.description,
    };
    if (data?.order && data?.order > 0) modifiedData["order"] = data?.order;
    console.log(modifiedData);
    const formData = new FormData();
    formData.append("data", JSON.stringify(modifiedData));
    formData.append("file", data?.image[0]);
    const loadingId = toast.loading("Adding new blog...");
    try {
      const result = await createBlog(formData).unwrap();
      console.log(result);
      if (result?.success) {
        toast.success("Blog added successfully", {
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
      <h1 className="text-2xl font-bold mb-6">Create New Blog</h1>
      <PForm onSubmit={onSubmit} resolver={zodResolver(blogValidationSchema)}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-6">
          <PInput name="order" label="Order No (Optional)" type="number" />
          <PInput name="title" label="Title*" type="text" />
          <PInput name="category" label="Category*" type="text" />
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
