const Poll = require("./poll");

exports.createPollGetController = (req, res, next) => {
  res.render("create");
};
exports.createPollPostController = async (req, res, next) => {
  let { title, description, option } = req.body;

  let options = option.map((opt) => {
    return {
      name: opt,
      vote: 0,
    };
  });

  let poll = Poll({
    title,
    description,
    options,
  });

  try {
    await poll.save();
    res.redirect("/polls");
  } catch (err) {
    console.log(err);
  }
};
