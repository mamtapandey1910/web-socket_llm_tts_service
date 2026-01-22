export const splitTextIntoSegment = (text: string, maxLength: number) => {
  if (!text) {
    return;
  }

  const chunks = [];
  let start = 0;
  while (start < text.length) {
    let end = Math.min(start + maxLength, text.length);
    chunks.push(text.slice(start, end));
    start = end;
  }
  return chunks;
};
