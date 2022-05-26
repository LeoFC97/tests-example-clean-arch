export default abstract class BaseHttpError extends Error {
  public abstract status: number;
  public abstract code: string;
  public abstract name: string;
  public abstract message: string;
}
