export const distance = (x: number, y: number) => Math.abs(x - y);

export const assertNever = (
  value: never,
  message: string,
  softAssert?: boolean,
): never => {
  if (softAssert) {
    console.error(message);
    return value;
  }

  throw new Error(message);
};
