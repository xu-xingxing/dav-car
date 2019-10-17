export default (state={
    //当前页
    'current':1,
    //当前共有数据
    'total':0,
    //当前页面条数
    'pageSize':10,
    //行的数据
    'dataSource':[],
    //筛选颜色
    'color':[],
    //筛选燃料
    'fuel':[],
    'exhaust':[]
},action)=>{
    switch(action.type){
        case 'initCar':
            return {
                ...state,
                'total':action.total,
                'dataSource':action.dataSource
            }
        case 'changeCurrent':
            return {
                ...state,
                'current':action.current
            }
        case 'changeFilter':
            return {
                ...state,
                [action.k]:action.v
            }
    }
    return state
}