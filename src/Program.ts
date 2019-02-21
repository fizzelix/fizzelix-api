import Server from "./Server";
import Database from "./Database";

namespace Fizzelix {
  class Program {
    static init(): void {
      Server.start();
      Database.connect();
      Database.showConnection();
    }
  }
  Program.init();
}
