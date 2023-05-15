export const formatResponse = (response: any) => {
  const keys = response.values[0];
  const data = response.values.slice(1);
  const obj = data.map((arr: any) =>
    Object.assign({}, ...keys.map((k: any, i: any) => ({[k]: arr[i]}))),
  );
  return {keys, obj};
};
