"use client";
import { getItem, sidebarItems } from "../../constant/sidebarConstant";

import { Layout, Menu, theme } from "antd";
import { ItemType } from "antd/es/menu/interface";
import { LogOut } from "lucide-react";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../redux/features/auth/auth.slice";
import { toast } from "sonner";

const { Header, Content, Sider } = Layout;

const SidebarLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const pathName = location?.pathname;
  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logout Successfull");
  };

  const sidebarItemsWithLogout: ItemType[] = [
    ...sidebarItems,
    getItem(
      <Link
        to=""
        onClick={(e) => {
          e.preventDefault();
          handleLogout();
        }}
      >
        Logout
      </Link>,
      "log-out",
      <LogOut size={22} />
    ),
  ];

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const currentSelectedItem =
    pathName.split("/")[pathName.split("/").length - 1];

  return (
    <Layout style={{ minHeight: "90vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        className="select-none"
      >
        <div className="demo-logo-vertical">
          <div
            className="text-white text-xl py-2 px-5 rounded-lg w-fit mx-auto mt-4 mb-4 bg-[#4d4e4e75]"
            onClick={() => navigate("/")}
          >
            {collapsed ? (
              <strong className="pl-1">M</strong>
            ) : (
              <div
                className={`${
                  collapsed ? "opacity-0" : "opacity-100"
                } duration-1000`}
              >
                Hello,
                <strong className="pl-1">Mahi</strong>
              </div>
            )}
          </div>
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={[currentSelectedItem]}
          mode="inline"
          items={sidebarItemsWithLogout}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: "-28px 16px" }}>
          <div
            style={{
              padding: 12,
              minHeight: 700,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default SidebarLayout;
