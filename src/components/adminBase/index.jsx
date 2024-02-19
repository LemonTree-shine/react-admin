import React,{useState,useEffect} from "react";
import { Menu,Dropdown,Button } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import {useNavigate} from "react-router-dom";
import './index.scss';
const { SubMenu } = Menu;

const data = [{
    title:'Base Info',
    icon:<MailOutlined />,
    link:'/baseInfo',
    key:'1',
    children:[],
},
// {
//     title:'Navigation Two',
//     icon:<AppstoreOutlined />,
//     link:'',
//     key:'2',
//     children:[{
//         title:'2-1',
//         link:'/index',
//         key:'2-1',
//         children:[]
//     }]
// }
];

export default function Index(props){
    const {children} = props;
    const navigate = useNavigate();
    const [menuData,setMenuData] = useState(data); 
    
    const currentPath = window.location.pathname;
    const defaultKeys = [currentPath];

    const renderMenu = (data)=>{
        return data.map((item)=>{
            if(item.children && item.children.length){
                return <SubMenu key={item.link} icon={item.icon || ''} title={item.title}>
                    {renderMenu(item.children)}
                </SubMenu>;
            }else{
                return <Menu.Item key={item.link} icon={item.icon || ''} onClick={()=>{
                    navigate(item.link)
                }}>{item.title}</Menu.Item>
            }
        })
    }

    const overlay = (
        <Menu>
          <Menu.Item className="admin-overlay-item" key="signOut">
            Sign Out
          </Menu.Item>
        </Menu>
    );

    return <div className='admin-base-layout'>
        <header className='admin-base-header'>
            <div className='admin-logo-wrap'>
                {/* <img src='/assets/images/logo.svg'/> */}
            </div>
            <Dropdown className='admin-right-menu-drop-wrap' overlay={overlay}>
                <div className='admin-right-menu-title'>Hi,Admin</div>
            </Dropdown>
        </header>
        <div className='admin-base-left-menu'>
            <div className="admin-base-menu-scroll-wrap">
                <Menu 
                    mode="inline"
                    defaultSelectedKeys={defaultKeys}
                >
                    {renderMenu(menuData)}
                </Menu>
            </div>
        </div>
        <div className='admin-base-content-wrap'>
            {children}
        </div>
    </div>
}