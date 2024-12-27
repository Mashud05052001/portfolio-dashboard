import { Avatar, Pagination, Popover, Select, Table, TableProps } from "antd";
import { Pencil, Trash2, Undo2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  useDeleteBlogAPIMutation,
  useGetAllBlogsAPIQuery,
  useRetreivedBlogAPIMutation,
} from "../../redux/features/blog.api";
import { TBlog, TError } from "../../types";
import ModalContainer from "../../components/modal/ModalContainer";
import EditBlog from "./EditBlog";

type TTableProps = TBlog & { key: string };

const AllBlogsTable = () => {
  const [editableData, setEditableData] = useState<TBlog | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [page, setPage] = useState(1);
  const {
    data: allBlogs,
    isLoading,
    isFetching,
  } = useGetAllBlogsAPIQuery([{ isDeleted }, { page }, { sort: "order" }]);
  const [deleteBlog] = useDeleteBlogAPIMutation();
  const [retreivedBlog] = useRetreivedBlogAPIMutation();

  const handleDelete = async (id: string) => {
    const confirm = window.confirm("Are you sure to delete this blog?");
    if (confirm) {
      const loading = toast.loading("Blog is deleting...");
      try {
        const result = await deleteBlog(id);
        if (result?.data?.success) {
          toast.success("Blog is deleted successfully", { id: loading });
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
    const confirm = window.confirm("Are you sure to retreived this blog?");
    if (confirm) {
      const loading = toast.loading("Blog is retreiving...");
      try {
        const result = await retreivedBlog(id);
        if (result?.data?.success) {
          toast.success("Blog is retreived successfully", { id: loading });
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
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (title: string) => (
        <Popover
          content={<p className="font-medium text-xs">{title}</p>}
          trigger="hover"
          arrow={false}
          className="cursor-pointer"
        >
          {title.slice(0, 10)}...
        </Popover>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Overview",
      dataIndex: "overview",
      key: "overview",
      render: (link: string) => (
        <Popover
          content={<p className="font-medium text-xs">{link}</p>}
          trigger="hover"
          arrow={false}
          className="cursor-pointer"
        >
          {link.slice(0, 20)}...
        </Popover>
      ),
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
    allBlogs?.data?.map((project) => ({
      key: project?._id,
      ...project,
    })) || [];
  return (
    <div>
      <div className="flex flex-col md:flex-row space-y-4 md:justify-between mb-8 md:items-center">
        <h1 className="text-2xl ">
          Total {allBlogs?.meta?.totalData} Blogs Exists
        </h1>
        <div>
          <Select
            showSearch
            placeholder="Select Blog Status"
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
        defaultCurrent={allBlogs?.meta?.page}
        total={allBlogs?.meta?.totalData}
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
            <EditBlog blogData={editableData} setOpenModal={setOpenModal} />
          </ModalContainer>
        </div>
      )}
    </div>
  );
};

export default AllBlogsTable;
