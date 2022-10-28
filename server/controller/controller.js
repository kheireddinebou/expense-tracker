const { Category, Transaction } = require("../models/model");

const createCategory = (req, res) => {
  const Create = new Category({
    type: "Investment",
    color: "#FCBE44",
  });

  Create.save(error => {
    if (error) console.log(error);
    return res.json(Create);
  });
};

const getCategories = async (req, res) => {
  const categories = await Category.find();
  try {
    res.json(categories);
  } catch {
    error => console.log(error);
  }
};

const createTransaction = async (req, res) => {
  await Transaction.create(req.body);
  try {
    const newTransaction = await Transaction.find({ name: req.body.name });
    res.json(newTransaction);
  } catch {
    error => console.log(error);
  }
};

const getTransactions = async (req, res) => {
  const transactions = await Transaction.find();
  try {
    res.json(transactions);
  } catch {
    error => console.log(error);
  }
};

const deleteTransaction = async (req, res) => {
  try {
    await Transaction.findByIdAndDelete(req.body);
    res.json({ message: "Item deleted succussfully" });
  } catch {
    error => console.log(error);
  }
};

const getLabels = async (req, res) => {
  try {
    await Transaction.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "type",
          foreignField: "type",
          as: "category_info",
        },
      },
      {
        $unwind: "$category_info",
      },
    ]).then(result => {
      let data = result.map(v =>
        Object.assign(
          {},
          {
            _id: v._id,
            name: v.name,
            type: v.type,
            amount: v.amount,
            color: v.category_info.color,
            
          }
        )
      );

      res.json(data);
    });
  } catch {
    error => res.json(error);
  }
};

// const getLabels = async (req, res) => {
//     try {
//       const transactions = await Transaction.find();
//       const invTransactions = await Transaction.find({ type: "Investment" });
//       const expTransactions = await Transaction.find({ type: "Expense" });
//       const savTransactions = await Transaction.find({ type: "Savings" });

//       const invPercent = (invTransactions.length * 100) / transactions.length;
//       const expPercent = (expTransactions.length * 100) / transactions.length;
//       const savPercent = (savTransactions.length * 100) / transactions.length;

//       res.json([
//         {
//           type: invPercent ? invTransactions[0].type : "",
//           percent: invPercent,
//         },
//         {
//           type: expPercent ? expTransactions[0].type : "",
//           percent: expPercent,
//         },
//         {
//           type: savPercent ? savTransactions[0].type : "",
//           percent: savPercent,
//         },
//       ]);
//     } catch {
//       error => console.log(error);
//     }
//   };

module.exports = {
  createCategory,
  getCategories,
  createTransaction,
  getTransactions,
  deleteTransaction,
  getLabels,
};
