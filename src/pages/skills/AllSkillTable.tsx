import { Avatar, Pagination, Select, Table, TableProps } from "antd";
import { Pencil, Trash2, Undo2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import ModalContainer from "../../components/modal/ModalContainer";
import {
  useDeleteSkillAPIMutation,
  useGetAllSkillsAPIQuery,
  useRetreivedSkillAPIMutation,
} from "../../redux/features/skill.api";
import { TError, TSkillData } from "../../types";
import EditSkill from "./EditSkill";

type TTableProps = TSkillData & { key: string };

const AllSkillsTable = () => {
  const [editableData, setEditableData] = useState<TSkillData | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [page, setPage] = useState(1);
  const {
    data: allSkills,
    isLoading,
    isFetching,
  } = useGetAllSkillsAPIQuery([{ isDeleted }, { page }, { sort: "order" }]);
  const [deleteSkill] = useDeleteSkillAPIMutation();
  const [retreivedSkill] = useRetreivedSkillAPIMutation();

  const handleDelete = async (id: string) => {
    const confirm = window.confirm("Are you sure to delete this skill?");
    if (confirm) {
      const loading = toast.loading("Skill is deleting...");
      try {
        const result = await deleteSkill(id);
        if (result?.data?.success) {
          toast.success("Skill is deleted successfully", { id: loading });
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
    const confirm = window.confirm("Are you sure to retreived this skill?");
    if (confirm) {
      const loading = toast.loading("Skill is retreiving...");
      try {
        const result = await retreivedSkill(id);
        if (result?.data?.success) {
          toast.success("Skill is retreived successfully", { id: loading });
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
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (img) => <Avatar src={img} size={40} />,
    },
    {
      title: "Skill Name",
      dataIndex: "name",
      key: "name",
      render: (name: string) => <p>{name}</p>,
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
    allSkills?.data?.map((project) => ({
      key: project?._id,
      ...project,
    })) || [];
  return (
    <div>
      <div className="flex flex-col md:flex-row space-y-4 md:justify-between mb-8 md:items-center">
        <h1 className="text-2xl ">
          Total {allSkills?.meta?.totalData} Skills Exists
        </h1>
        <div>
          <Select
            showSearch
            placeholder="Select Skill Status"
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
        defaultCurrent={allSkills?.meta?.page}
        total={allSkills?.meta?.totalData}
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
            <EditSkill skillData={editableData} setOpenModal={setOpenModal} />
          </ModalContainer>
        </div>
      )}
    </div>
  );
};

export default AllSkillsTable;
