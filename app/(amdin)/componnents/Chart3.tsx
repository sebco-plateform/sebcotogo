"use client"
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
// @ts-ignore
import {DatasetType} from "@mui/x-charts/models/seriesType/config";
import React, {useEffect, useState} from "react";
import {Api} from "@/api/Api";

interface DataInter {
    user_firstName: string;
    total_orders: number
}
export default function Chart3() {
    const [data, setData] = useState<DataInter[]>([]);

    useEffect(() => {
        Api.getAll("order/getTopBuyingClients").then((values: any[]) => {
            setData(values);
        })
    }, []);
    return (
        <div style={{ width: '100%' }}>

            <BarChart
                dataset={data as DatasetType}
                yAxis={[{ scaleType: 'band', dataKey: 'user_firstName' }]}
                series={[{ dataKey: 'total_orders', label: 'Commande total', valueFormatter }]}
                layout="vertical"
                {...chartSetting}
            />


        </div>
    );
}



const valueFormatter = (value: number | null) => `${value}mm`;

const chartSetting = {
    height: 300,
    sx: {
        [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
            transform: 'translateX(-10px)',
        },
    },
};
