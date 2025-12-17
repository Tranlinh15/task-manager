import { defineConfig } from "@prisma/config";

export default defineConfig({
  migrate: {
    url: "prisma+postgres://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RfaWQiOjEsInNlY3VyZV9rZXkiOiJza19rbzN4alVONENIR1ZXZ2JkaUc3MjYiLCJhcGlfa2V5IjoiMDFLQ042OUpSWFEyUTE2OUNZRDQ3WFM1MTgiLCJ0ZW5hbnRfaWQiOiI1NTdiMTAxM2Y0MDFkNDMxNjQ5MDQwZGEwMjVhNzU5MWJiNDIwMzMzYTFmMTViZDRlNmM2OTUxYjNhMGUzNWNkIiwiaW50ZXJuYWxfc2VjcmV0IjoiYWVjZDA4ODEtNDRmOS00MjE1LWJhZmEtZDRkZWY1OWQ3NmIxIn0.vRJp1FchElQrD51f6YMw00BrtBJ9Trv54i22QRTiNw4",
  },
});
