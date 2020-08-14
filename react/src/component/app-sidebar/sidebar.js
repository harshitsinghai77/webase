import React from 'react';
import styles from './sidebar.module.css'
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { Link } from '@reach/router'
import localStorage from 'local-storage'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const SiderDemo = (props) => {
  const [collapsed, setCollapsed] = React.useState(false);

  const [userName, setUsername] = React.useState('');

  const getCurrentUser = props.getCurrentUser
  const onCollapse = collapsed => {
    setCollapsed(collapsed)
  };

  React.useEffect(() => {
    const user = localStorage.get('name');
    if(user){
        setUsername(user)
    }else{
        window.axiosInstance.get('/profile/userName', {
            params: {
              id: getCurrentUser,
            }
        }).then(res => {
            localStorage.set('name', res.data.username);
            setUsername(res.data.username)
        })
    }
  }, [])

  return (
    <Layout style={{ minHeight: '100vh' }}>
    <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className={styles.logo}>
            <img className={styles.profileImage} src = "https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png" />
        </div>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
        
        <Menu.Item key="1">
            <Link to= {`/create-new-project/${getCurrentUser}`}>
                <Icon type="pie-chart" />
                <span>Use existing model</span>
            </Link>
        </Menu.Item>
        
        <Menu.Item key="3">
            <Link to= {`/object-detection`}>
                <Icon type="desktop" />
                <span>Object Detection</span>
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
            <Menu.Item key="6"><Link to= {`/user-profile`}>Edit Profile</Link></Menu.Item>
            <Menu.Item key="8"><Link to= {`/user-profile-change-password`}>Change Password</Link></Menu.Item>
        </SubMenu>
        </Menu>
    </Sider>
    <Layout>
        <Header style={{ background: '#fff', padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>{userName || 'username'}</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ background: '#fff', minHeight: 360 }}>
            {props.Component}
        </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>WeBase ©2019</Footer>
    </Layout>
    </Layout>
  );

}

export default SiderDemo;