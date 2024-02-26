import * as echarts from "echarts";
import { useEffect, useMemo } from 'react';
import { useSelector } from "react-redux";
import { countRateNum } from "../../tools/utils";

export const EchartsPage = () => {

  const {products} = useSelector(s => s.products);

  const productsInRate = useMemo(() => {
    const res = products.filter(e => e.reviews.length).sort((a,b) => b.reviews?.length - a.reviews?.length);
    const rate = res.map((e) => countRateNum(e.reviews));
    const categories = res.slice(0, 5).map(e => e.name);

    return {
      categories, 
      rate,
    }
  }, [products]);

  const productsInStock = useMemo(() => {
    const res = products.map(e => e).sort((a,b) => b?.stock - a?.stock);
    const stock = res.map(e => e.stock);
    const categories = res.map(e => e.name);
    
    return {
      categories,
      stock,
    }

  }, [products]);

    useEffect(() => {

        const option = {
            title: {
              text: "Топ - 5 товаров по отзывам пользователей"
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              }
            },
            legend: {
              left: 'right',
              data: productsInRate.categories,
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: [
              {
                type: 'category',
                data: productsInRate.categories,
                axisTick: {
                  alignWithLabel: true
                },
                axisLabel: { 
                  interval: 0, 
                  rotate: 60,
                  margin: 20,
                  
                },
              }
            ],
            yAxis: [
              {
                type: 'value'
              }
            ],
            series: [
              {
                name: productsInRate.categories,
                type: 'bar',
                barWidth: '60%',
                data: productsInRate.rate,
              }
            ]
          };

          const option2 = {
            title: {
              text: "Наличие на складе"
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              }
            },
            legend: {
              left: 'right',
              data: productsInStock.categories,
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            yAxis: [
              {
                type: 'category',
                data: productsInStock.categories,
                axisTick: {
                  alignWithLabel: true
                },
                axisLabel: { 
                  interval: 0, 
                  rotate: 0,
                  margin: 20,  
                },
              }
            ],
            series: [
              {
                name: productsInStock.categories,
                type: 'bar',
                barWidth: '60%',
                data: productsInStock.stock,
                itemStyle: {
                  color: "red"
                  }
              },
            ]
          };
        const chartRate = document.getElementById("rateId");
        const myChartRate = echarts.init(chartRate);
        option && myChartRate.setOption(option);

        const chartStock = document.getElementById("stockId");
        const myChartStock = echarts.init(chartStock);
        option2 && myChartStock.setOption(option2);

    }, [productsInRate, productsInStock])


    return (
            <div>
              <div id="rateId" style={{width: "600px", height: "600px"}}></div>
              <div id="stockId" style={{width: "600px", height: "600px"}}></div>
            </div>
    )
}