type ButtonProps = {
    text: string;
    href: string;
    backgroundColor?: string;
    textColor?: string;
};

export function button({
    text,
    href,
    backgroundColor = "#5F7D5A",
    textColor = "#ffffff",
}: ButtonProps): string {
    return `
<table
  role="presentation"
  cellspacing="0"
  cellpadding="0"
  border="0"
  align="center"
  style="margin:32px auto;"
>
<tr>
<td
  bgcolor="${backgroundColor}"
  style="
    border-radius:12px;
  "
>

<a
  href="${href}"
  target="_blank"
  style="
    display:inline-block;
    padding:16px 30px;
    color:${textColor};
    text-decoration:none;
    font-size:16px;
    font-weight:600;
    border-radius:12px;
  "
>
${text}
</a>

</td>
</tr>
</table>
`;
}