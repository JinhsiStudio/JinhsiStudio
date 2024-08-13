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

const { TabPane } = Tabs;

const fetcher = async (url: string): Promise<GachaLog[] | void> => {
    const response = await getGachaLogFromUrl(url);
    return response;
};

export default function GachaPage() {
    const { t } = useTranslation();
    const { storedValue: gachaSetting } = useGachaSetting();
    const [url, setUrl] = useState(gachaSetting?.url || '');
    const { data, error, loading, run } = useRequest(() => fetcher(url), {
        refreshOnWindowFocus: false,
    });
    const [activeTab, setActiveTab] = useState<string>('1');

    const settingRef = useRef<DialogRef>(null);

    const handleFetchDataFromUrl = () => {
        if (gachaSetting && gachaSetting.url != url) {
            setUrl(gachaSetting.url);
        }
        if (url) {
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

    const tabBarButtonWithSetting = <Flex justify="space-between" gap="small">
        <Button type="primary" onClick={handleFetchDataFromUrl}>
            {t("Label-Fetch-Data")}
        </Button>
        <Button type="primary" onClick={() => settingRef.current?.open()}>
            {t("Label-Gacha-Setting")}
        </Button>
    </Flex>;

    const errorMessge = (errorMessage: any) => {
        console.error("Failed to fetch gacha data with error: ", errorMessage);
        message.error(t("Message-Failed-To-Load-Gacha-Data", { ns: 'message' }))
        return <div></div>;
    };

    return (
        <div>
            <GachaSettingModal ref={settingRef}></GachaSettingModal>
            {error && errorMessge(error.message)}
            <Spin spinning={loading} size='large' indicator={<LoadingOutlined />}>
                <Tabs activeKey={activeTab} onChange={setActiveTab} style={{ marginTop: 16 }} tabBarExtraContent={tabBarButtonWithSetting}>
                    <TabPane tab={t("Label-Featured")} key="1">
                        {renderCards(filterDataByConvene([1, 2]))}
                    </TabPane>
                    <TabPane tab={t("Label-Permanent")} key="2">
                        {renderCards(filterDataByConvene([3, 4]))}
                    </TabPane>
                    <TabPane tab={t("Label-Beginner")} key="3">
                        {renderCards(filterDataByConvene([5, 6, 7]))}
                    </TabPane>
                </Tabs>
            </Spin>
        </div>
    );
}