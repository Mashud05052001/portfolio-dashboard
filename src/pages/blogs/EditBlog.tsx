import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import FilledButton from "../../components/button/FilledButton";
import PForm from "../../components/form/PForm";
import PImages from "../../components/form/PImages";
import PInput from "../../components/form/PInput";
import PQuillTextEditor from "../../components/form/PQuillTextEditor";
import { useUpdateBlogAPIMutation } from "../../redux/features/blog.api";
import { updateBlogValidationSchema } from "../../schema/schema";
import { TBlog, TError } from "../../types";

type TProps = {
  blogData: TBlog;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function EditBlog({ blogData, setOpenModal }: TProps) {
  const [updateBlog, { isLoading }] = useUpdateBlogAPIMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const modifiedData: Partial<TBlog> = {};
    if (data?.order !== blogData?.order) modifiedData.order = data?.order;
    if (data?.title !== blogData?.title) modifiedData.title = data?.title;
    if (data?.overview !== blogData?.overview)
      modifiedData.overview = data?.overview;
    if (data?.description !== blogData?.description)
      modifiedData.description = data?.description;
    if (data?.category !== blogData?.category)
      modifiedData.category = data?.category;

    try {
      const loading = toast.loading("Blog is updating...");
      const formData = new FormData();
      const isImageString = typeof data?.image === "string";
      if (isImageString && Object.keys(modifiedData).length === 0) {
        toast.error("Please change anything before update");
        return;
      } else {
        formData.append("data", JSON.stringify(modifiedData));
        formData.append("file", data?.image[0]);
      }
      const result = await updateBlog({
        data: isImageString ? modifiedData : formData,
        id: blogData?._id,
      }).unwrap();

      if (result?.success) {
        toast.success("Blog updated successfull", { id: loading });
        setOpenModal(false);
      } else {
        toast.error("Something went wrong! Please try again", {
          id: loading,
        });
      }
    } catch (error) {
      toast.error(`Failed. ${(error as TError)?.data?.message}`);
    }
  };

  const defaultValues = {
    category: blogData?.category,
    order: blogData?.order,
    title: blogData?.title,
    overview: blogData?.overview,
    description: blogData?.description,
    image: blogData?.image,
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit Blog</h1>
      <PForm
        onSubmit={onSubmit}
        resolver={zodResolver(updateBlogValidationSchema)}
        defaultValues={defaultValues}
      >
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
            defaultImages={[blogData?.image]}
          />
        </div>
        <FilledButton className="mt-10" isLoading={isLoading}>
          {blogData ? "Update" : "Create"}
        </FilledButton>
      </PForm>
    </div>
  );
}
