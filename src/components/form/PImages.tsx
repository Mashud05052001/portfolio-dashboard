import type { UploadFile, UploadProps } from "antd";
import { Upload } from "antd";
import ImgCrop from "antd-img-crop";
import { useState } from "react";
import {
  Controller,
  ControllerRenderProps,
  FieldValues,
} from "react-hook-form";

type FileType = File;
type TQImagesProps = {
  name: string;
  label?: string;
  others?: Record<string, unknown>;
  maxImageUpload?: number;
  defaultImages?: string[];
  isImgCropNeed?: boolean;
};

const PImages = ({
  name,
  label,
  others,
  maxImageUpload = 1,
  defaultImages = [],
  isImgCropNeed = false,
}: TQImagesProps) => {
  const [fileList, setFileList] = useState<UploadFile[]>(
    defaultImages.map((url, index) => ({
      uid: `-${index}`,
      name: `default-image-${index}`,
      status: "done",
      url,
    }))
  );

  const beforeUpload: UploadProps["beforeUpload"] = () => {
    return false;
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as FileType);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const uploadContent = (field: ControllerRenderProps<FieldValues, string>) => (
    <Upload
      listType="picture-card"
      fileList={fileList}
      onChange={({ fileList }) => {
        setFileList(fileList);
        const images = fileList.map((item) => item?.originFileObj || item.url);
        field.onChange(images);
      }}
      maxCount={maxImageUpload || 1}
      onPreview={onPreview}
      beforeUpload={beforeUpload}
      {...(others || {})}
    >
      {fileList.length < maxImageUpload && "+ Upload"}
    </Upload>
  );
  return (
    <div className="space-y-2 text-sm">
      {label && (
        <label className="block text-zinc-700  font-medium">{label}</label>
      )}

      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <div className="relative">
            {isImgCropNeed ? (
              <ImgCrop rotationSlider>{uploadContent(field)}</ImgCrop>
            ) : (
              uploadContent(field)
            )}

            {error && (
              <div className="absolute font-semibold left-1 bottom-[-1.4rem] text-red-500 whitespace-nowrap overflow-hidden text-ellipsis">
                <small>{error?.message}</small>
              </div>
            )}
          </div>
        )}
      />
    </div>
  );
};

export default PImages;
