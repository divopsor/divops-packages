export type RawItemRecord = {
  [key: string]: Partial<{
    [key: string]: unknown;
  }>;
};

export type JsonObject = {
  [P in keyof any]: P extends string | number | boolean | undefined ? P : JsonObject;
} | JsonObject[];
