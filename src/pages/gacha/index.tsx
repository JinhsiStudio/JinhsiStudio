import React, { useState } from 'react';
import useSWR from 'swr';
import { Input, Button, Row, Col, message } from 'antd';
import { getGachaLogFromUrl } from '@/services/invokes/gacha';
import GachaCard from '@/components/gacha/gacha-card';
import { GachaLog } from '@/models/gacha/gacha-log';

const fetcher = async (url: string): Promise<GachaLog[] | void> => {
    const response = await getGachaLogFromUrl(url);
    return response;
};
const GachaPage: React.FC = () => {
    const [url, setUrl] = useState<string>('');
    const { data, error, mutate } = useSWR(url, fetcher, { revalidateOnFocus: false });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUrl(e.target.value);
    };

    const handleFetchData = () => {
        if (url) {
            mutate();
        } else {
            message.warning('请输入有效的URL');
        }
    };

    return (
        <div>
            <Input
                placeholder="请输入URL"
                value={url}
                onChange={handleInputChange}
                onPressEnter={handleFetchData}
                style={{ width: '80%', marginRight: 8 }}
            />
            <Button type="primary" onClick={handleFetchData}>
                获取数据
            </Button>
            {error && <div>获取数据时出错: {error.message}</div>}
            <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
                {data && data.length > 0 ? (
                    data.map((log, index) => (
                        <Col key={index} span={8}>
                            <GachaCard data={log} />
                        </Col>
                    ))
                ) : (
                    <div>没有数据</div>
                )}
            </Row>
        </div>
    );
};

export default GachaPage;