"use client";

import { BackwardOutlined, FileSearchOutlined, HomeOutlined, SettingOutlined, TeamOutlined } from "@ant-design/icons";
import { Layout, Menu, MenuProps } from "antd";
import { Content, Footer } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

type MenuItem = Required<MenuProps>['items'][number];
export default function RootLayoutPage({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const selectedKeys = useRef<string[]>(['Home']);
    const items: MenuItem[] = [
        {
            key: 'Home',
            label: '首页',
            icon: <HomeOutlined />,
            onClick: () => {
                selectedKeys.current.push('Home');
                router.push("/")
            }
        },
        {
            key: 'tools',
            label: '工具',
            type: 'group',
            children: [
                {
                    key: 'Gacha',
                    label: '唤取分析',
                    icon: <FileSearchOutlined />,
                    onClick: () => {
                        selectedKeys.current.push('Gacha');
                        router.push("/gacha")
                    }
                },
            ]
        },
        {
            key: 'data',
            label: '数据',
            type: 'group',
            children: [
                {
                    key: 'characterData',
                    label: '角色数据',
                    icon: < TeamOutlined />,
                    onClick: () => {
                        selectedKeys.current.push('characterData');
                        router.push("/data/character")
                    }
                },
            ]
        },
        {
            key: 'profile',
            label: '个人',
            type: 'group',
            children: [
                {
                    key: 'Setting',
                    label: '设置',
                    icon: <SettingOutlined />,
                    onClick: () => {
                        selectedKeys.current.push('Setting')
                        router.push("/settings")
                    }

                },
            ],
        },

    ];
    const [collapsed, setCollapsed] = useState(false);
    const router = useRouter();
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} theme="light">
                <BackwardOutlined onClick={() => { selectedKeys.current.pop(); router.back() }} />
                <Menu theme="light" selectedKeys={[selectedKeys.current[selectedKeys.current.length - 1]]} defaultSelectedKeys={['Home']} items={items} />
            </Sider>
            <Layout>
                <Content style={{ margin: '0 16px' }}>
                    {children}
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Jinhsi Studio ©{new Date().getFullYear()} Created by Chiichen
                </Footer>
            </Layout>
        </Layout>
    );
}
