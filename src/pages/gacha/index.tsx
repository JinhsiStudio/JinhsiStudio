import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { Input, Button, Row, Col, message, Tabs } from 'antd';
import { getGachaLogFromUrl } from '@/services/invokes/gacha';
import GachaCard from '@/components/gacha/gacha-card';
import { GachaLog } from '@/models/gacha/gacha-log';
import { useTranslation } from 'react-i18next';

const { TabPane } = Tabs;

const fetcher = async (url: string): Promise<GachaLog[] | void> => {
    const response = await getGachaLogFromUrl(url);
    return response;
};

export default function GachaPage() {
    const [url, setUrl] = useState<string>('');
    const { data, error, mutate } = useSWR(url, fetcher, { revalidateOnFocus: false });
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState<string>('1');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUrl(e.target.value);
    };

    useEffect(() => {
        // 禁止页面滚动
        document.body.style.overflow = 'hidden';
        return () => {
            // 恢复页面滚动
            document.body.style.overflow = 'auto';
        };
    }, []);

    const handleFetchData = () => {
        if (url) {
            mutate();
        } else {
            message.warning(t('Message-Please-Input-Valid-Gacha-Url'));
        }
    };

    const filterDataByConvene = (conveneTypes: number[]) => {
        return data?.filter(log => conveneTypes.includes(log.convene)) || [];
    };

    const renderCards = (logs: GachaLog[]) => {
        const colSpan = 24 / (logs.length || 1); // 动态计算每个 Col 的 span 值
        return (
            <Row gutter={[16, 16]}>
                {logs.map((log, index) => (
                    <Col key={index} span={colSpan}>
                        <GachaCard data={log} />
                    </Col>
                ))}
            </Row>
        );
    };

    return (
        <div>
            <Input
                placeholder={t('Message-Please-Input-Gacha-Url')}
                value={url}
                onChange={handleInputChange}
                onPressEnter={handleFetchData}
                style={{ width: '80%', marginRight: 8 }}
            />
            <Button type="primary" onClick={handleFetchData}>
                获取数据
            </Button>
            {error && <div>获取数据时出错: {error.message}</div>}
            <Tabs activeKey={activeTab} onChange={setActiveTab} style={{ marginTop: 16 }}>
                <TabPane tab="限定" key="1">
                    {renderCards(filterDataByConvene([1, 2]))}
                </TabPane>
                <TabPane tab="常驻" key="2">
                    {renderCards(filterDataByConvene([3, 4]))}
                </TabPane>
                <TabPane tab="新手" key="3">
                    {renderCards(filterDataByConvene([5, 6, 7]))}
                </TabPane>
            </Tabs>
        </div>
    );
}