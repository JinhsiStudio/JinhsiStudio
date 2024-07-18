import { FileSearchOutlined, HomeOutlined, LeftOutlined, SettingOutlined, TeamOutlined } from "@ant-design/icons";
import { Layout, Menu, MenuProps } from "antd";
import { Content, Footer } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { useNavigate, } from "react-router-dom";
import { useState } from "react";
import AppRoutes from "./routers";
import { useTranslation } from "react-i18next";



type MenuItem = Required<MenuProps>['items'][number];
export const RootLayoutPage = () => {
    const navigate = useNavigate();
    const [selectedKeys, setSelectedKeys] = useState(['Home']);
    const [collapsed, setCollapsed] = useState(false);
    const { t } = useTranslation();
    const handleMenuClick = (key: string, path: string) => {
        setSelectedKeys([...selectedKeys, key]);
        navigate(path);
    };

    const items: MenuItem[] = [
        {
            key: 'Home',
            label: t('Label-Home'),
            icon: <HomeOutlined />,
            onClick: () => handleMenuClick('Home', "/")
        },
        {
            key: 'tools',
            label: t('Label-Tools'),
            type: 'group',
            children: [
                {
                    key: 'Gacha',
                    label: t('Label-GachaTracker'),
                    icon: <FileSearchOutlined />,
                    onClick: () => handleMenuClick('Gacha', "/gacha")
                },
            ]
        },
        {
            key: 'data',
            label: t('Label-Data'),
            type: 'group',
            children: [
                {
                    key: 'characterData',
                    label: t('Label-Data-Character'),
                    icon: <TeamOutlined />,
                    onClick: () => handleMenuClick('characterData', "/data/character")
                },
            ]
        },
        {
            key: 'profile',
            label: t('Label-Profile'),
            type: 'group',
            children: [
                {
                    key: 'Setting',
                    label: t('Label-Settings'),
                    icon: <SettingOutlined />,
                    onClick: () => handleMenuClick('Setting', "/settings")
                },
            ],
        },
    ];

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} theme="light">
                <div style={{ padding: '8px', textAlign: 'center', borderBottom: '1px solid #f0f0f0' }}>
                    <LeftOutlined
                        style={{ fontSize: '16px', cursor: 'pointer' }}
                        onClick={() => {
                            if (selectedKeys.length > 1) {
                                const newSelectedKeys = [...selectedKeys];
                                newSelectedKeys.pop();
                                setSelectedKeys(newSelectedKeys);
                                navigate(-1);
                            }
                        }}
                    />
                </div>
                <Menu
                    theme="light"
                    selectedKeys={[selectedKeys[selectedKeys.length - 1]]}
                    defaultSelectedKeys={['Home']}
                    items={items}
                />
            </Sider>
            <Layout>
                <Content style={{ margin: '0 16px' }}>
                    <AppRoutes />
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Jinhsi Studio ©{new Date().getFullYear()} Created by Chiichen
                </Footer>
            </Layout>
        </Layout>
    );
};
