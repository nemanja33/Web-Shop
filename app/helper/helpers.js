import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { v4 as uuid } from "uuid";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadsDir = path.join(__dirname, "../products/images");
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

export function parseMultipart(req, callback) {
  const contentType = req.headers["content-type"];
  const boundary = contentType.match(/boundary=(.+)$/)[1];
  let data = Buffer.alloc(0);

  req.on("data", chunk => {
    data = Buffer.concat([data, chunk]);
  });

  req.on("end", () => {
    const delimiter = Buffer.from(`--${boundary}`);
    const parts = data
      .split(delimiter)
      .filter(part => part.includes("Content-Disposition"));

    const fields = {};

    parts.forEach(part => {
      const headerEnd = part.indexOf("\r\n\r\n");
      const header = part.slice(0, headerEnd).toString();
      const body = part.slice(headerEnd + 4, part.length - 2); // remove trailing \r\n

      const dispositionMatch = /name="([^"]+)"(?:; filename="([^"]+)")?/.exec(header);
      if (!dispositionMatch) return;

      const name = dispositionMatch[1];
      const filename = dispositionMatch[2];

      if (filename) {
        const ext = path.extname(filename);
        const savedName = uuid() + ext;
        const filePath = path.join(uploadsDir, savedName);
        fs.writeFileSync(filePath, body);
        fields["imageUrl"] = savedName;
      } else {
        fields[name] = body.toString();
      }
    });

    callback(fields);
  });
}
