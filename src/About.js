import React from 'react'
import Fetch from './until/MyFetch'
import Echart from 'echarts'

const EchartData = [{'customers': '用户数量'}, {"roles": '权限数量'}]

class About extends React.Component{
    componentDidMount(){
        var myChart = Echart.init(window.document.getElementById('main'));
        myChart.showLoading()
        let echartData = []
        EchartData.forEach((item, index) => {
            let key = Object.keys(item)[0]
            Fetch.all(key).then(data => {
                echartData.push({value: data.length, name: item[key]})
                this.setOption(myChart, echartData)
            })
        })
    }

    render() {
        return(
            <div>
                <h3>Hi,About You</h3>
                <div id="main" style={{width: '500px', height: '400px'}}>

                </div>
            </div>
        )
    }

    setOption = (myChart, echartData) => {
        let data = EchartData.map(item => Object.values(item))
        myChart.setOption({
            title : {
                text: '基本数据',
                subtext: '纯属虚构',
                x:'right'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: Array.prototype.concat(...data)
            },
            series : [
                {
                    name: '数量',
                    type: 'pie',
                    radius : '75%',
                    center: ['50%', '60%'],
                    data: echartData,
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        });
        myChart.hideLoading();
    }
}

export default About
