
export default class playerController  {
  static async hello(req, res, next) {
    try {
      return res
        .status(200)
        .send({ success: true, message: "Hello World"  });
    } catch (err) {
      next(err);
    }
  }

}