type HeadingProps = {
    title: string;
    subtitle?: string;
};

export function heading({
    title,
    subtitle,
}: HeadingProps): string {
    return `
    <h2
      style="
        margin:0;
        color:#1f2937;
        font-size:30px;
        line-height:1.2;
        font-weight:700;
        text-align:center;
      "
    >
      ${title}
    </h2>

    ${subtitle
            ? `
        <p
          style="
            margin:14px 0 0;
            text-align:center;
            color:#6b7280;
            font-size:16px;
            line-height:1.7;
          "
        >
          ${subtitle}
        </p>
      `
            : ""
        }
  `;
}