export default class playerController  {
  static async leaderboard(req, res, next) {
    try {
      return res
        .status(200)
        .send({ success: true  });
    } catch (err) {
      next(err);
    }
  }

}