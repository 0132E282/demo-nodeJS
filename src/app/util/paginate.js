class Paginate {
    page ;
    limit;
    query = null;
    constructor(query,page = 1 , limit = 10){
        this.query = query;
        this.limit = limit;
        this.page = page;
    }
    get(){
        const skip = (this.page - 1) * this.limit;
        const result = this.query.skip(skip).limit(this.limit);
        return result.map(item => item.toObject())
    }
}


module.exports = Paginate;