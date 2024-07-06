"use client"
import React, { useEffect, useState } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { Api } from '@/api/Api';

interface DataInter {
    article_name: string;
    total_purchases: number;
}

export default function Chart2() {

    const [data, setData] = useState<DataInter[]>([]);
    const [axisData, setAxisData] = useState<string[]>([]);
    const [seriesData, setSeriesData] = useState<number[]>([]);

    useEffect(() => {
        const newAxis: string[] = [];
        const newserie: number[] = [];

        Api.getAll("order-article/getArticleMostSell").then((values: any[]) => {
            console.log(values);
            setData(values);
            values.forEach(element => {
                newAxis.push(String(element.article_name));
                newserie.push(element.total_purchases);
            });
            setAxisData(newAxis);
            setSeriesData(newserie);
        })
    }, []);


    return (
        <LineChart
            xAxis={[{scaleType: 'point', data: axisData }]}
            series={[
                {
                    data: seriesData,
                    area: true,
                },
            ]}
            width={500}
            height={300}
        />
    );
}
