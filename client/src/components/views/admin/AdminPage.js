import React ,{useState}from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import EverySerial from './EverySerial'

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;


function AdminPage() {
    const [MenuKey, setMenuKey] = useState(0)

    const onClickevent = (e) => {
        setMenuKey(e.key)
        console.log(MenuKey)
    }
    return (
        <Layout>
    
    <Content style={{ padding: '50px 50px' }}>
      
      <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
        <Sider className="site-layout-background" width={200}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%' }}
          >
            <SubMenu key="sub1" icon={<UserOutlined />} title="사용자 관련">
              <Menu.Item key="10">유저 조회</Menu.Item>
              <Menu.Item key="11">유저 삭제</Menu.Item>
             
              
            </SubMenu>
            <SubMenu key="sub2" icon={<LaptopOutlined />} title="기기 관련">
              <Menu.Item key="15" onClick={onClickevent}>기기 시리얼 등록</Menu.Item>
              <Menu.Item key="16">기기 정보 확인</Menu.Item>
             
            </SubMenu>
            <SubMenu key="sub3" icon={<NotificationOutlined />} title="subnav 3">
              <Menu.Item key="20">통계</Menu.Item>
              
            </SubMenu>
          </Menu>
        </Sider>
        <Content style={{ display:"flex",flexDirection:"column", padding: '0 24px', minHeight: 280 }}>
        <h1>관리자 용 페이지. on availalbe 기기 시리얼 등록</h1>
        <div>
        {MenuKey == 15 && 
             <EverySerial/>}

        </div>
           

        </Content>
  
       


      </Layout>
        </Content>
    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
  </Layout>
    )
}

export default AdminPage
