type ParagraphProps = {
    text: string;
    center?: boolean;
};

export function paragraph({
    text,
    center = false,
}: ParagraphProps): string {
    return `
    <p
      style="
        margin:0 0 18px;
        color:#4b5563;
        font-size:16px;
        line-height:1.8;
        text-align:${center ? "center" : "left"};
      "
    >
      ${text}
    </p>
  `;
}