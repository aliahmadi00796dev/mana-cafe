// NEXT_PUBLIC_BASE_PATH="" locally, "/<repo-name>" on GitHub Pages (set by the workflow).
const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
export default { output: "export", trailingSlash: true, basePath: base, assetPrefix: base || undefined, images: { unoptimized: true } };
