export default interface ErrorResponse<Code = string> {
  message: string;
  code: Code;
}
