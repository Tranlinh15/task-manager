import { PrismaClient } from "@prisma/client";

const adapter = new PrismaSqliteAdapter({
  url: "prisma+postgres://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RfaWQiOjEsInNlY3VyZV9rZXkiOiJza19rbzN4alVONENIR1ZXZ2JkaUc3MjYiLCJhcGlfa2V5IjoiMDFLQ042OUpSWFEyUTE2OUNZRDQ3WFM1MTgiLCJ0ZW5hbnRfaWQiOiI1NTdiMTAxM2Y0MDFkNDMxNjQ5MDQwZGEwMjVhNzU5MWJiNDIwMzMzYTFmMTViZDRlNmM2OTUxYjNhMGUzNWNkIiwiaW50ZXJuYWxf<REDACTED_EMAIL>",
});

export const prisma = new PrismaClient({ adapter });
