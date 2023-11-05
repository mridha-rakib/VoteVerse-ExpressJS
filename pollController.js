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
    next();
  } catch (err) {
    console.log(err);
  }
};

exports.getAllPolls = async (req, res, next) => {
  try {
    let polls = await Poll.find();
    res.render("polls", { polls });
    next();
  } catch (error) {}
};

exports.viewPollGetController = async (req, res, next) => {
  let id = req.params.id;

  try {
    let poll = await Poll.findById(id);

    let options = [...poll.options];
    console.log(options);
    let result = [];

    options.forEach((option) => {
      let parentage = (option.vote * 100) / poll.totalVote;

      result.push({
        ...option._doc,
        parentage: parentage ? parentage : 0,
      });
    });
    res.render("viewPoll", { poll, request });
    next();
  } catch (err) {}
};
