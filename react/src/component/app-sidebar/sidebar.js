import React from "react";
import styles from "./sidebar.module.css";
import { Layout, Menu, Breadcrumb, Icon } from "antd";
import { Link } from "@reach/router";
import {
  getCurrentUserName,
  setCurrentUserName,
  clearToken,
  clearCurrentUser,
  clearCurrentUserName,
} from "../../libs/storage/tokenStorage";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const SiderDemo = (props) => {
  const [collapsed, setCollapsed] = React.useState(false);
  const [selectedKey, setSelectedKey] = React.useState("1");
  const [userName, setUsername] = React.useState("");
  const getCurrentUser = props.getCurrentUser;
  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  React.useEffect(() => {
    const user = getCurrentUserName();
    if (user) {
      setUsername(user);
    } else {
      window.axiosInstance
        .get("/profile/userName", {
          params: {
            id: getCurrentUser,
          },
        })
        .then((res) => {
          const { username } = res.data;
          setCurrentUserName(username);
          setUsername(username);
        });
    }
  }, []);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div
          className={collapsed ? styles.logo_collapsed : styles.logo_default}
        >
          <img
            className={
              collapsed
                ? styles.profileImage_collapsed
                : styles.profileImage_default
            }
            src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
          />
        </div>
        <Menu theme="dark" selectedKeys={[selectedKey]} mode="inline">
          <Menu.Item key="1" onClick={() => setSelectedKey("1")}>
            <Link to={`/create-new-project/${getCurrentUser}`}>
              <Icon type="pie-chart" />
              <span>Use existing model</span>
            </Link>
          </Menu.Item>

          <SubMenu
            key="sub2"
            title={
              <span>
                <Icon type="team" />
                <span>Profile</span>
              </span>
            }
          >
            <Menu.Item key="3" onClick={() => setSelectedKey("3")}>
              <Link to={`/user-profile`}>Edit Profile</Link>
            </Menu.Item>
            <Menu.Item key="4" onClick={() => setSelectedKey("4")}>
              <Link to={`/user-profile-change-password`}>Change Password</Link>
            </Menu.Item>
          </SubMenu>

          <Menu.Item
            key="5"
            onClick={() => {
              clearToken();
              clearCurrentUser();
              clearCurrentUserName();
            }}
          >
            <Link to="/login">
              <Icon type="logout" />
              <span>Logout</span>
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: "#fff", padding: 0 }} />
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>{userName || "username"}</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ background: "#fff", minHeight: 360 }}>
            {props.Component}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>WeBase ©2021</Footer>
      </Layout>
    </Layout>
  );
};

export default SiderDemo;
