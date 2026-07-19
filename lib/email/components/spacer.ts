export function spacer(height = 24): string {
    return `
    <div
      style="
        height:${height}px;
        line-height:${height}px;
      "
    >
      &nbsp;
    </div>
  `;
}