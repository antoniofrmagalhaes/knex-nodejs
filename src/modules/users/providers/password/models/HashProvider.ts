export default interface IHashProvider {
  generateHash(_payload: string): Promise<string>
  compareHash(_payload: string, _hashed: string): Promise<boolean>
}
