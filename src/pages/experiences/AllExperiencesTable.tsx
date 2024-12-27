import { Pagination, Popover, Select, Table, TableProps } from "antd";
import { Pencil, Trash2, Undo2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import ModalContainer from "../../components/modal/ModalContainer";
import { TError, TExperience } from "../../types";
import moment from "moment";

import {
  useDeleteExperienceAPIMutation,
  useGetAllExperiencesAPIQuery,
  useRetreivedExperienceAPIMutation,
} from "../../redux/features/experience.api";
import EditExperience from "./EditExperience";

type TTableProps = TExperience & { key: string };

const AllExperiencesTable = () => {
  const [editableData, setEditableData] = useState<TExperience | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [page, setPage] = useState(1);
  const {
    data: allExperiencies,
    isLoading,
    isFetching,
  } = useGetAllExperiencesAPIQuery([
    { isDeleted },
    { page },
    { sort: "order" },
  ]);
  const [deleteExperience] = useDeleteExperienceAPIMutation();
  const [retreivedExperience] = useRetreivedExperienceAPIMutation();

  const handleDelete = async (id: string) => {
    const confirm = window.confirm("Are you sure to delete this experience?");
    if (confirm) {
      const loading = toast.loading("Experience is deleting...");
      try {
        const result = await deleteExperience(id);
        if (result?.data?.success) {
          toast.success("Experience is deleted successfully", { id: loading });
        } else {
          toast.error("Something went wrong. Please try again", {
            id: loading,
          });
        }
      } catch (error) {
        toast.error(`Failed. ${(error as TError)?.data?.message}`);
      }
    }
  };
  const handleRetreived = async (id: string) => {
    const confirm = window.confirm(
      "Are you sure to retreived this experience?"
    );
    if (confirm) {
      const loading = toast.loading("Experience is retreiving...");
      try {
        const result = await retreivedExperience(id);
        if (result?.data?.success) {
          toast.success("Experience is retreived successfully", {
            id: loading,
          });
        } else {
          toast.error("Something went wrong. Please try again", {
            id: loading,
          });
        }
      } catch (error) {
        toast.error(`Failed. ${(error as TError)?.data?.message}`);
      }
    }
  };
  useEffect(() => {
    if (!openModal) setEditableData(null);
  }, [openModal]);

  const columns: TableProps<TTableProps>["columns"] = [
    {
      title: "Order",
      dataIndex: "order",
      key: "order",
    },
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
      render: (company: string) =>
        company.length > 12 ? (
          <Popover
            content={<p className="font-medium text-xs">{company}</p>}
            trigger="hover"
            arrow={false}
            className="cursor-pointer"
          >
            {company.slice(0, 12)}...
          </Popover>
        ) : (
          <p>{company}</p>
        ),
    },
    {
      title: "Designation",
      dataIndex: "designation",
      key: "designation",
      render: (designation: string) =>
        designation.length > 12 ? (
          <Popover
            content={<p className="font-medium text-xs">{designation}</p>}
            trigger="hover"
            arrow={false}
            className="cursor-pointer"
          >
            {designation.slice(0, 12)}...
          </Popover>
        ) : (
          <p>{designation}</p>
        ),
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      render: (location: string) =>
        location?.length > 12 ? (
          <Popover
            content={<p className="font-medium text-xs">{location}</p>}
            trigger="hover"
            arrow={false}
            className="cursor-pointer"
          >
            {location.slice(0, 12)}...
          </Popover>
        ) : (
          <p>{location || "Not Provided"}</p>
        ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (description: string) =>
        description?.length > 20 ? (
          <Popover
            content={<p className="font-medium text-xs">{description}</p>}
            trigger="hover"
            arrow={false}
            className="cursor-pointer"
          >
            {description.slice(0, 20)}...
          </Popover>
        ) : (
          <p>{description || "Not Provided"}</p>
        ),
    },
    {
      title: "Technology",
      dataIndex: "technologies",
      key: "technologies",
      render: (techs: string[]) =>
        techs ? (
          <Popover
            content={<p className="font-medium text-xs">{techs.join(", ")}</p>}
            trigger="hover"
            arrow={false}
            className="cursor-pointer"
          >
            {techs.join(", ").length > 12 ? (
              <>{techs.join(", ").slice(0, 12)}...</>
            ) : (
              <>{techs.join(", ")}</>
            )}
          </Popover>
        ) : (
          "Not Provided"
        ),
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      render: (startDate: string) => moment(startDate).format("ll"),
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      render: (endDate: string) =>
        endDate ? moment(endDate).format("ll") : "Running",
    },

    {
      title: "Action",
      key: "action",
      render: (record: TTableProps) => {
        return (
          <div className="flex space-x-3">
            {isDeleted ? (
              <Undo2
                size={20}
                className="cursor-pointer hover:text-blue-600 duration-100 ml-2"
                onClick={() => handleRetreived(record?._id)}
              />
            ) : (
              <>
                <Pencil
                  size={20}
                  className="cursor-pointer hover:text-blue-600 duration-100"
                  onClick={() => {
                    setOpenModal(true);
                    setEditableData(record);
                  }}
                />
                <Trash2
                  size={20}
                  className="cursor-pointer hover:text-red-600 duration-100"
                  onClick={() => handleDelete(record?._id)}
                />
              </>
            )}
          </div>
        );
      },
    },
  ];

  const tableData: TTableProps[] =
    allExperiencies?.data?.map((project) => ({
      key: project?._id,
      ...project,
    })) || [];
  return (
    <div>
      <div className="flex flex-col md:flex-row space-y-4 md:justify-between mb-8 md:items-center">
        <h1 className="text-2xl ">
          Total {allExperiencies?.meta?.totalData} Experiencies Exists
        </h1>
        <div>
          <Select
            showSearch
            placeholder="Select Experience Status"
            style={{ width: 150 }}
            onChange={(data) => setIsDeleted(data)}
            defaultValue={false}
            options={[
              { value: false, label: "Not Deleted" },
              { value: true, label: "Deleted" },
            ]}
          />
        </div>
      </div>

      <div className="min-h-[calc(100vh-250px)]">
        <Table<TTableProps>
          columns={columns}
          dataSource={tableData}
          pagination={false}
          loading={isLoading || isFetching}
          size="small"
        />
      </div>
      <Pagination
        align="start"
        defaultCurrent={allExperiencies?.meta?.page}
        total={allExperiencies?.meta?.totalData}
        showSizeChanger={false}
        onChange={(page) => setPage(page)}
      />
      {openModal && editableData && (
        <div
          className={`${
            openModal ? "visible opacity-100" : "invisible opacity-0"
          }`}
        >
          <ModalContainer openModal={openModal} setOpenModal={setOpenModal}>
            <EditExperience
              experienceData={editableData}
              setOpenModal={setOpenModal}
            />
          </ModalContainer>
        </div>
      )}
    </div>
  );
};

export default AllExperiencesTable;
