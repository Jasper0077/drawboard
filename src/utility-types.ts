
// https://github.com/krzkaczor/ts-essentials
export type MarkOptional<T, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>;

export type Merge<M, N> = Omit<M, keyof N> & N;
