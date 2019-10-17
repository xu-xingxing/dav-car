import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table,Checkbox,Tag} from 'antd'

/*
    使用connect装饰一下组件，将全局的state
*/
@connect(
    //安装到自己的props上获取全局的state,
    ({car})=>({
        'current':car.current,
        'total':car.total,
        'dataSource':car.dataSource,
        'pageSize':car.pageSize,
        'color':car.color,
        'fuel':car.fuel,
        'exhaust':car.exhaust
    }),
    //获取唯一改变全局state的dispatch方法
    dispatch=>({
        dispatch
    })
)
export default class Car extends Component {
    componentWillMount(){
        this.props.dispatch({'type':'initCar_saga'})
    }
    render() {
        return (
            <div className="wrap">
                颜色：<Checkbox.Group
                        value={this.props.color}
                        onChange={v=>{
                            console.log(v)
                            this.props.dispatch({'type':'changeFilter_saga','k':'color','v':v})
                        }}
                        >
                    {
                         ['红', '黄', '紫', '白', '黑', '蓝','灰','银灰','橙','绿','香槟','咖啡'].map((item,index)=>{
                             return <Checkbox value={item} key={index}>{item}</Checkbox>
                         })
                    }
                </Checkbox.Group>
                <br/>
                燃料：<Checkbox.Group
                        value={this.props.fuel}
                        onChange={v=>{
                            console.log(v)
                            this.props.dispatch({'type':'changeFilter_saga','k':'fuel','v':v})
                        }}
                        >
                    {
                        ['柴油', '油电混合', '纯电动', '汽油'].map((item,index)=>{
                             return <Checkbox value={item} key={index}>{item}</Checkbox>
                         })
                    }
                </Checkbox.Group>
                <br/>
                尾气：<Checkbox.Group
                        value={this.props.exhaust}
                        onChange={v=>{
                            console.log(v)
                            this.props.dispatch({'type':'changeFilter_saga','k':'exhaust','v':v})
                        }}
                        >
                    {
                        ['国一', '国二', '国三', '国四','国五','国六'].map((item,index)=>{
                             return <Checkbox value={item} key={index}>{item}</Checkbox>
                         })
                    }
                </Checkbox.Group>
                <br/>
                {
                    this.props.color.length!=0
                    ?
                    <Tag closable onClose={()=>{
                        this.props.dispatch({'type':'changeFilter_saga','k':'color','v':[]})
                    }}>
                        颜色：{this.props.color.join('或')}
                    </Tag>
                    :
                    null
                }
                {
                    this.props.fuel.length!=0
                    ?
                    <Tag closable onClose={()=>{
                        this.props.dispatch({'type':'changeFilter_saga','k':'fuel','v':[]})
                    }}>
                        燃料：{this.props.fuel.join('或')}
                    </Tag>
                    :
                    null
                }
                {
                    this.props.exhaust.length!=0
                    ?
                    <Tag closable onClose={()=>{
                        this.props.dispatch({'type':'changeFilter_saga','k':'exhaust','v':[]})
                    }}>
                        尾气：{this.props.exhaust.join('或')}
                    </Tag>
                    :
                    null
                }
                <Table
                    rowKey="id"
                    columns={[
                        { 'title': '编号', 'key': 'id', 'dataIndex': 'id' },
                        { 'title': '图片', 'key':'img',  'dataIndex':'img',render:(txt,{id})=>{
                            return <div>
                                <img src={`http://aiqianduan.com:7897/images/carimages_small/${id}/view/${txt}`}/>
                            </div>
                        }},
                        { 'title': '品牌', 'key': 'brand', 'dataIndex': 'brand' },
                        { 'title': '车系', 'key': 'series', 'dataIndex': 'series' },
                        { 'title': '颜色', 'key': 'color', 'dataIndex': 'color' },
                        { 'title': '发动机', 'key': 'engine', 'dataIndex': 'engine' },
                        { 'title': '尾气', 'key': 'exhaust', 'dataIndex': 'exhaust' },
                        { 'title': '燃料', 'key': 'fuel', 'dataIndex': 'fuel' }
                    ]}
                    dataSource={this.props.dataSource}
                    pagination={{
                        'current':this.props.current,
                        'pageSize':this.props.pageSize,
                        'total':this.props.total,
                        'onChange':current=>{
                            this.props.dispatch({'type':'changeCurrent_saga',current})
                        }
                    }}
                />
            </div>
        )
    }
}
