function parseQueryValue(
  value: string[] | string | undefined,
): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export function parseStringParam<T extends string | undefined>(
  paramValue: string[] | string | undefined,
  defaultValue: T = undefined as T,
): string | T {
  const parsedValue = parseQueryValue(paramValue);

  return parsedValue || defaultValue;
}

export function parseNumberParam<T extends number | undefined>(
  paramValue: string[] | string | undefined,
  defaultValue: T = undefined as T,
): number | T {
  const parsedValue = parseQueryValue(paramValue);

  return Number(parsedValue) || defaultValue;
}
