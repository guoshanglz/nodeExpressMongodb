/**
 * Created by guoshan on 2017/10/18.
 */
module.exports={
    gshtml:{
        name:{type:String,required:true},
        pwd:{type:String,required:true},
        car:{type:String,required:true}
    },
    training:{
        // 哪个区 机构名称 地址   旗下坑蒙子公司  其他描述
        place:{type:String,required:true},
        name:{type:String,required:true},
        address:{type:String,required:true},
        son:{type:String,required:true},
        other:{type:String,required:true}
    },
    training_user:{
        name:{type:String,required:true},
        pwd:{type:String,required:true},
        nickname:{type:String,required:true}
    }
}