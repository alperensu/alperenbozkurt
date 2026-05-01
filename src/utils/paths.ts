export const getAssetPath = (path: string) => {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '/alperenbozkurt';
  // Ensure path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  // If we are in development or basePath is empty, return original path
  if (!basePath || normalizedPath.startsWith(basePath)) {
    return normalizedPath;
  }
  
  return `${basePath}${normalizedPath}`;
};
