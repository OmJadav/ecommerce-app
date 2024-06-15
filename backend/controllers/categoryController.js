import Category from "../models/CategorySchema.js";

export const addNewCategory = async (req, res) => {
    try {
        const { name, thumbnail } = req.body;
        if (!name || !thumbnail) {
            return res.status(400).json({ error: "Please fill all the fields!" });
        }

        const category = await Category.findOne({ name });
        if (category) {
            return res.status(400).json({ error: "Category already exists!" });
        }

        const newCategory = new Category({ name, thumbnail });
        await newCategory.save();
        res.status(201).json({ category: newCategory });

    } catch (err) {
        console.error("Error in Add Category Controller: ", err.message);
        res.status(500).json({ error: "Internal Server Error!" });
    }
};
export const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json({ categories })
    } catch (err) {
        console.log("Error in getting all categories :: " + err.message)
        res.status(500).json({ error: "INTERNAL SERVER ERROR" })
    }
}
export const getCategoryProducts = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        const category = await Category.findById(id).populate("products");
        if (!category) {
            return res.status(404).json({ error: "No Products found !" })
        }
        res.status(201).json({ category })

    } catch (err) {
        console.log("Error in getting products by category ! ::" + err.message);
        res.status(501).json({ error: "INTERNAL SERVER ERROR!" })
    }
}