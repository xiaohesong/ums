import React from 'react'
import Fetch from './until/MyFetch'
import Echart from 'echarts'

class About extends React.Component{
    state = {
        data: [
            {value:34, name:'联盟广告'},
            {value:35, name:'视频广告'},
            {value:48, name:'搜索引擎'}
        ]
    }

    componentDidMount(){
        var myChart = Echart.init(window.document.getElementById('main'));
        myChart.showLoading()
        let echartData = this.state.data
        let array = [{'customers': '用户数量'}, {"roles": '权限数量'}]
        array.forEach((item, index) => {
            let key = Object.keys(item)[0]
            Fetch.all(key).then(data => {
                console.log('item', item, 'key', key, item[key])
                echartData.unshift({value: data.length, name: item[key]})
                this.setState({
                    data: echartData
                })
                this.setOption()
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

    setOption = () => {
        console.log(this.state.data)
        var myChart = Echart.init(window.document.getElementById('main'));
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
                data: ['用户数量','权限数量','联盟广告','视频广告','搜索引擎']
            },
            series : [
                {
                    name: '数量',
                    type: 'pie',
                    radius : '75%',
                    center: ['50%', '60%'],
                    data: this.state.data,
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