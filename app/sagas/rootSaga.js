import { takeEvery,put,select } from 'redux-saga/effects'
import querystring from 'querystring'
import axios from 'axios'
//要使用产生器
export default function * (){
    //使用takeEvery打劫
    yield takeEvery('initCar_saga',function*(){
        //使用select去获取全局的state
        const { current, color, fuel, exhaust } = yield select(({car})=>car)
        console.log(exhaust)
        const {total,results} = yield axios.get('http://www.aiqianduan.com:7897/cars?'+querystring.stringify({
            'page':current,
            'color':color.join('v'),
            'fuel':fuel.join('v'),
            'exhaust':exhaust.join('v')
        })).then(data=>data.data)
        // yield put({'type':'initCar',newArr})
        yield put({'type':'initCar','dataSource':results,total})
    })
    //更改数据的第几页
    yield takeEvery('changeCurrent_saga',function *({current}){
        //先修改current
        yield put({'type':'changeCurrent',current})
        //重新拉取数据
        yield put({'type':'initCar_saga'})
    })
    //筛选汽车-依据是颜色、尾气、燃料
    yield takeEvery('changeFilter_saga',function*({k,v}){
        //先修改颜色\尾气
        yield put({'type':'changeFilter',k,v})
        console.log(k,v)
        yield put({'type':'changeCurrent','current':1})
        yield put({'type':'initCar_saga'})
    })
}