import jwt, { Secret } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { MySQLService } from "../Data/mysqldatacontroller";
import IUser from "../Interface/userInterface";

class authService {
  database;
  constructor(database: any) {
    this.database = database;
  }
  generateToken(obj: any) {
    return jwt.sign(obj, process.env.ACCESS_TOKEN_SECRET as Secret);
  }
  async checkUserExists(email: string) {
    try {
      const status = await this.database.getUser(email);
      if (status.length > 0) {
        return { success: true, user: status };
      }
      return { success: false, msg: "User not found" };
    } catch (err) {
      return { success: false, error: err };
    }
  }
  async login(user: any) {
    try {
      const checkUserExists: any = await this.checkUserExists(user.email);
      if (checkUserExists.success) {
        const check = bcrypt.compareSync(
          user.password,
          checkUserExists.user[0].password
        );
        if (check) {
          const accesstoken = this.generateToken({
            ...user,
            role: checkUserExists.user[0].role,
            username: checkUserExists.user[0].username,
            uid: checkUserExists.user[0].id,
          });
          return { success: true, accesstoken };
        } else {
          return { success: false, msg: "Incorrect password" };
        }
      }
      return { success: false, msg: "User doesn't exist" };
    } catch (err) {
      return { success: false, error: err };
    }
  }
  async signUp(user: IUser) {
    try {
      const hashedPass = await bcrypt.hash(user.password, 10);
      const id = new Date().getTime();
      const signUpStatus = await this.database.addUser(user, hashedPass, id);
      return { succcess: true, body: signUpStatus };
    } catch (err) {
      return { success: false, error: err };
    }
  }
}

export default new authService(MySQLService);
