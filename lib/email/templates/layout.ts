import { APP } from "@/lib/config/app";
import { CLINIC } from "@/lib/config/clinic";

type EmailLayoutProps = {
    title: string;
    preheader?: string;
    content: string;
};

export function emailLayout({
    title,
    preheader,
    content,
}: EmailLayoutProps) {
    return `
<!DOCTYPE html>
<html lang="en">

<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>${title}</title>

</head>

<body
  style="
    margin:0;
    padding:32px 16px;
    background:#F7FAFC;
    font-family:
      -apple-system,
      BlinkMacSystemFont,
      'Segoe UI',
      Roboto,
      Helvetica,
      Arial,
      sans-serif;
  "
>

<div
  style="
    display:none;
    max-height:0;
    overflow:hidden;
    opacity:0;
  "
>
${preheader ?? ""}
</div>

<table
  width="100%"
  cellpadding="0"
  cellspacing="0"
  style="
    max-width:620px;
    margin:auto;
    background:#ffffff;
    border-radius:18px;
    overflow:hidden;
    box-shadow:0 8px 30px rgba(0,0,0,.08);
  "
>

<!-- HEADER -->

<tr>

<td
  style="
    background:#245889;
    color:white;
    text-align:center;
    padding:42px 32px;
  "
>

<div
  style="
    font-size:32px;
    font-weight:700;
    letter-spacing:.5px;
  "
>
${CLINIC.name}
</div>

<div
  style="
    margin-top:10px;
    font-size:15px;
    opacity:.9;
  "
>
Personalized Homeopathic Care
</div>

</td>

</tr>

<!-- CONTENT -->

<tr>

<td
  style="
    padding:42px 36px;
  "
>

${content}

</td>

</tr>

<!-- FOOTER -->

<tr>

<td
  style="
    background:#EEF5FB;
    border-top:1px solid #ececec;
    padding:28px;
    text-align:center;
    color:#6b7280;
    font-size:14px;
    line-height:1.8;
  "
>

<strong style="color:#374151">
${CLINIC.name}
</strong>

<br>

${CLINIC.address}

<br>

📞 ${CLINIC.phone}

${CLINIC.email
            ? `<br>✉️ ${CLINIC.email}`
            : ""
        }

<br><br>

<a
  href="${APP.url}"
  style="
    color:#245889;
    text-decoration:none;
    font-weight:600;
  "
>
Visit our website
</a>

</td>

</tr>

</table>

</body>

</html>
`;
}
