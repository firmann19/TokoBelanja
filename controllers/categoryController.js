const {Category} = require("../models")


class CategoryController {
    //create
    static createCategory() {
        let {type} = req.body;

        Category.create({
            type
        })
        .then(result => {
            let response = {
                
            }
        })
    }
}

module.exports = CategoryController