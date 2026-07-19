type BadgeVariant =
    | "success"
    | "danger"
    | "info";

type BadgeProps = {
    text: string;
    variant?: BadgeVariant;
};

const colors = {
    success: {
        bg: "#ecfdf5",
        text: "#166534",
    },
    danger: {
        bg: "#fef2f2",
        text: "#991b1b",
    },
    info: {
        bg: "#eff6ff",
        text: "#1d4ed8",
    },
};

export function badge({
    text,
    variant = "info",
}: BadgeProps): string {
    const color = colors[variant];

    return `
    <div
      style="
        text-align:center;
        margin-bottom:22px;
      "
    >
      <span
        style="
          display:inline-block;
          background:${color.bg};
          color:${color.text};
          padding:8px 16px;
          border-radius:999px;
          font-size:13px;
          font-weight:700;
          letter-spacing:.08em;
          text-transform:uppercase;
        "
      >
        ${text}
      </span>
    </div>
  `;
}