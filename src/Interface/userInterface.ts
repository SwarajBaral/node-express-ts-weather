export default interface IUser {
  id?: number;
  name?: string;
  username: string;
  role: string;
  email: string;
  password: string;
  passConf?: string;
}
