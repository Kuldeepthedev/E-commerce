class Apifeatures {
    constructor(query, querystr) {
        this.query = query;
        this.querystr = querystr;
    }

    search() {
        const keyword = this.querystr.keyword;

    if (keyword) {
        this.query = this.query.find({
            $or: [
                { name: { $regex: `.*${keyword}.*`, $options: "i" } },
                { category: { $regex: `.*${keyword}.*`, $options: "i" } },
                { description: { $regex: `.*${keyword}.*`, $options: "i" } },
            ],
        });
    }

    return this;
    };

    filter(){
        const querycopy = {...this.querystr};
        const removefiled = ["keyword", "page","limit"]
        removefiled.forEach(key=>delete querycopy[key])
        let queryStr = JSON.stringify(querycopy)
        queryStr= queryStr.replace(/\b(gt|gte|lt|lte)\b/g,(key)=>`$${key}`);
        this.query = this.query.find(JSON.parse(queryStr));
        return this
    }
    pagination(resultParPage){
        const currentpage = Number(this.querystr.page) || 1;
        const skipfile = resultParPage*(currentpage-1);
        this.query = this.query.limit(resultParPage).skip(skipfile);
        return this;

    }
}

module.exports = Apifeatures;