/**
 * Created by guoshan on 2017/10/18.
 */
var mongoose = require('mongoose');
//图表
var Schema = mongoose.Schema;

var models = require("./models");
for(var m in models){
    mongoose.model(m,new Schema(models[m]));
}

module.exports = {
    getModel: function(type){
        return _getModel(type);
    }
};

var _getModel = function(type){
    return mongoose.model(type);
};