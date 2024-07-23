// src/UnderConstruction.tsx
import { Result } from 'antd';
import { SmileOutlined } from '@ant-design/icons';

export default function TodoPage() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Result
                icon={<SmileOutlined />}
                title="This page is under construction"
                subTitle="We are working hard to bring you this feature. Stay tuned!"
            />
        </div>
    );
};

