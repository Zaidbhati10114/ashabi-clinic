type CardItem = {
    label: string;
    value: string;
};

type CardProps = {
    title: string;
    items: CardItem[];
};

export function card({
    title,
    items,
}: CardProps): string {
    return `
<table
  width="100%"
  cellpadding="0"
  cellspacing="0"
  style="
    background:#fafaf9;
    border:1px solid #e5e7eb;
    border-radius:14px;
    margin:30px 0;
  "
>

<tr>

<td
  style="
    padding:22px 24px;
  "
>

<div
  style="
    font-size:18px;
    font-weight:700;
    color:#1f2937;
    margin-bottom:18px;
  "
>
${title}
</div>

${items
            .map(
                (item) => `
<table
  width="100%"
  cellpadding="0"
  cellspacing="0"
  style="
    margin:12px 0;
  "
>

<tr>

<td
  style="
    color:#6b7280;
    font-size:14px;
  "
>
${item.label}
</td>

<td
  align="right"
  style="
    color:#111827;
    font-size:15px;
    font-weight:600;
  "
>
${item.value}
</td>

</tr>

</table>
`
            )
            .join("")}

</td>

</tr>

</table>
`;
}