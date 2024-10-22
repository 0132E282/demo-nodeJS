module.exports = {
    multipleMongooseObject : function(data = []){
      return  data.map((value) => value.toObject());
    }
}