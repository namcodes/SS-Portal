
import React from 'react'
import { Progress, Space } from 'antd';

const twoColors = { '0%': '#108ee9', '100%': '#87d068' };
const conicColors = { '0%': '#87d068', '50%': '#ffe58f', '100%': '#ffccc7' };


const index = () => {
    return (
        <Space wrap>
            <Progress type="dashboard" percent={90} strokeColor={twoColors} status='active' />
            <Progress type="dashboard" percent={100} strokeColor={twoColors} />
            <Progress type="dashboard" percent={93} strokeColor={conicColors} />
        </Space>
    )
}

export default index