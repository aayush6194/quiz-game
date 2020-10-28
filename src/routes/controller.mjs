export default class Controller  {
  static async message(req, res, next) {
    try {
      return res
        .send(`This is a websocket server. Please try Opening the client at localhost:8082`);
    } catch (err) {
      next(err);
    }
  }

}