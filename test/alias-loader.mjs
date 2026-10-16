import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";

export async function resolve(specifier, context, nextResolve) {
  if (specifier.startsWith("@/")) {
    const subpath = specifier.slice(2);
    const basePath = new URL(`../src/${subpath}`, import.meta.url);
    const basePathStr = fileURLToPath(basePath);

    let resolvedUrl = basePath.href;
    if (existsSync(`${basePathStr}.ts`)) {
      resolvedUrl = `${basePath.href}.ts`;
    } else if (existsSync(`${basePathStr}.tsx`)) {
      resolvedUrl = `${basePath.href}.tsx`;
    } else if (existsSync(`${basePathStr}/index.ts`)) {
      resolvedUrl = `${basePath.href}/index.ts`;
    }

    return nextResolve(resolvedUrl, context);
  }

  return nextResolve(specifier, context);
}
