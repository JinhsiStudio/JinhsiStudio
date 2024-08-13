import { useRef, useState } from 'react';
import { useRequest } from 'ahooks';
import { Button, Row, Col, message, Tabs, Spin, Flex } from 'antd';
import { getGachaLogFromUrl } from '@/services/invokes/gacha';
import GachaCard from '@/components/gacha/gacha-card';
import { GachaLog } from '@/models/gacha/gacha-log';
import { LoadingOutlined } from '@ant-design/icons';
import { GachaSettingModal } from '@/components/gacha/setting/gacha-setting';
import { DialogRef } from '@/components/base/base-dialog';
import { useTranslation } from 'react-i18next';
import { useGachaSetting } from '@/hooks/storage/gacha/use-gacha-setting';
import type { TabsProps } from 'antd';

const fetcher = async (url: string): Promise<GachaLog[] | void> => {
    const response = await getGachaLogFromUrl(url);
    return response;
};

export default function GachaPage() {
    const { t } = useTranslation();
    const { storedValue: gachaSetting } = useGachaSetting();
    const { data, loading, run } = useRequest(() => fetcher(gachaSetting?.url || ''), {
        refreshOnWindowFocus: false,
        onError: (e) => throwErrorMessge(e)
    });
    const [activeTab, setActiveTab] = useState<string>('1');
    const settingRef = useRef<DialogRef>(null);

    const handleFetchDataFromUrl = () => {
        if (gachaSetting?.url) {
            run();
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

    const throwErrorMessge = (error: Error) => {
        console.error("Failed to fetch gacha data with error: ", error);
        message.error(t("Message-Failed-To-Load-Gacha-Data", { ns: 'message' }))
    };

    const tabBarButtonWithSetting = <Flex justify="space-between" gap="small">
        <Button type="primary" onClick={handleFetchDataFromUrl}>
            {t("Label-Fetch-Data")}
        </Button>
        <Button type="primary" onClick={() => settingRef.current?.open()}>
            {t("Label-Gacha-Setting")}
        </Button>
    </Flex>;


    const tabItems: TabsProps['items'] = [
        {
            key: '1',
            label: t("Label-Featured"),
            children: renderCards(filterDataByConvene([1, 2])),
        },
        {
            key: '2',
            label: t("Label-Permanent"),
            children: renderCards(filterDataByConvene([3, 4])),
        },
        {
            key: '3',
            label: t("Label-Beginner"),
            children: renderCards(filterDataByConvene([5, 6, 7])),
        },

    ]

    return (
        <div>
            <GachaSettingModal ref={settingRef}></GachaSettingModal>
            <Spin spinning={loading} size='large' indicator={<LoadingOutlined />}>
                <Tabs items={tabItems} activeKey={activeTab} onChange={setActiveTab} style={{ marginTop: 16 }} tabBarExtraContent={tabBarButtonWithSetting} />
            </Spin>
        </div>
    );
}