import { Pagination, Popover, Select, Table, TableProps } from "antd";
import { Pencil, Trash2, Undo2 } from "lucide-react";
import moment from "moment";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import ModalContainer from "../../components/modal/ModalContainer";
import { TEducation, TError } from "../../types";

import {
  useDeleteEducationAPIMutation,
  useGetAllEducationsAPIQuery,
  useRetreivedEducationAPIMutation,
} from "../../redux/features/education.api";
import EditEducation from "./EditEducation";

type TTableProps = TEducation & { key: string };

const AllEducationTable = () => {
  const [editableData, setEditableData] = useState<TEducation | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [page, setPage] = useState(1);
  const {
    data: allExperiencies,
    isLoading,
    isFetching,
  } = useGetAllEducationsAPIQuery([{ isDeleted }, { page }, { sort: "order" }]);
  const [deleteEducation] = useDeleteEducationAPIMutation();
  const [retreivedEducation] = useRetreivedEducationAPIMutation();

  const handleDelete = async (id: string) => {
    const confirm = window.confirm("Are you sure to delete this education?");
    if (confirm) {
      const loading = toast.loading("Education is deleting...");
      try {
        const result = await deleteEducation(id);
        if (result?.data?.success) {
          toast.success("Education is deleted successfully", { id: loading });
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
    const confirm = window.confirm("Are you sure to retreived this education?");
    if (confirm) {
      const loading = toast.loading("Education is retreiving...");
      try {
        const result = await retreivedEducation(id);
        if (result?.data?.success) {
          toast.success("Education is retreived successfully", {
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
      title: "Course",
      dataIndex: "course",
      key: "course",
      render: (course: string) =>
        course.length > 16 ? (
          <Popover
            content={<p className="font-medium text-xs">{course}</p>}
            trigger="hover"
            arrow={false}
            className="cursor-pointer"
          >
            {course.slice(0, 16)}...
          </Popover>
        ) : (
          <p>{course}</p>
        ),
    },
    {
      title: "Institution",
      dataIndex: "institution",
      key: "institution",
      render: (institution: string) =>
        institution.length > 16 ? (
          <Popover
            content={<p className="font-medium text-xs">{institution}</p>}
            trigger="hover"
            arrow={false}
            className="cursor-pointer"
          >
            {institution.slice(0, 16)}...
          </Popover>
        ) : (
          <p>{institution}</p>
        ),
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      render: (location: string) =>
        location?.length > 16 ? (
          <Popover
            content={<p className="font-medium text-xs">{location}</p>}
            trigger="hover"
            arrow={false}
            className="cursor-pointer"
          >
            {location.slice(0, 16)}...
          </Popover>
        ) : (
          <p>{location || "Not Provided"}</p>
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
          Total {allExperiencies?.meta?.totalData} Educational Data Exists
        </h1>
        <div>
          <Select
            showSearch
            placeholder="Select Education Status"
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
            asd
            <EditEducation
              educationData={editableData}
              setOpenModal={setOpenModal}
            />
          </ModalContainer>
        </div>
      )}
    </div>
  );
};

export default AllEducationTable;
