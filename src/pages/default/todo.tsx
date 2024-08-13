// src/UnderConstruction.tsx
import { Result } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

export default function TodoPage() {
    const { t } = useTranslation();
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <Result
                icon={<SmileOutlined />}
                title={t('Message-Todo-Page-Title', { ns: 'message' })}
                subTitle={t('Message-Todo-Page-SubTitle', { ns: 'message' })}
            />
        </div>
    );
};

