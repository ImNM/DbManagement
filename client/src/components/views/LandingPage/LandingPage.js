import React,{useEffect} from 'react'
import {withRouter} from'react-router-dom';
import { Layout} from 'antd';
const { Content } = Layout;
function LandingPage(props) {
    return (
        <Layout>
    <Content className="site-layout" style={{ padding: '0 0px', marginTop: 64 }}>
      <div className="site-layout-background" style={{ padding: 0, minHeight: 380 }}>

            <div style = {{display:'flex',justifyContent:'center'}}>
                <img  src={process.env.PUBLIC_URL+'/images/매일이2.jpeg' } />
            </div>
      </div>
    </Content>
  </Layout>
    )
}

export default withRouter(LandingPage);
