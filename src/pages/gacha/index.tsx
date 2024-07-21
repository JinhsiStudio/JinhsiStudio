import { Button, Input, Space } from "antd";
// import { getGachaLogFromUrl } from "@/services/invokes/gacha";
// import Column from "antd/es/table/Column";
// import { ChangeEventHandler, useState } from "react";
// import useSWR from "swr";

export default function GachaPage() {
    // const onUrlChanged = (event: ChangeEventHandler<HTMLInputElement> | undefined) => {
    //     setGachaUrl(event.target.value);
    // };
    // const [gachaUrl, setGachaUrl] = useState("");
    // const [currentGachaUrl, setCurrentGachaUrl] = useState("");
    // const { data, error, isLoading } = useSWR(gachaUrl, getGachaLogFromUrl)
    // if (error) return <div>failed to load</div>
    // if (isLoading) return <div>loading...</div>
    return <Space.Compact style={{ width: '100%' }}>
        <Input defaultValue="Combine input and button" />
        <Button type="primary">更新唤取数据</Button>
    </Space.Compact>

}