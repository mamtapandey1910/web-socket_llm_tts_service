// Split every segment in such a way that it split with the max text length of 150, if if there is period in that segment then split it from the period, if there is no period then split is with the last ",", and if both are not there then go with maxsize

export const splitTextIntoSegment = (text: any) => {
  if (!text) {
    return [];
  }

  const maxSize = Number(process.env.SEGMENT_SIZE) || 150;
  const chunks = [];
  let start = 0;

  while (start < text.length) {
    let end = Math.min(start + maxSize, text.length);
    let segment = text.slice(start, end);

    const lastPeriod = segment.lastIndexOf(".");
    const lastComma = segment.lastIndexOf(",");

    if (lastPeriod !== -1) {
      end = start + lastPeriod + 1;
    } else if (lastComma !== -1) {
      end = start + lastComma + 1;
    } else {
      end = Math.min(start + maxSize, text.length);
    }

    const chunk = text.slice(start, end).trim();
    if (chunk) {
      chunks.push(chunk);
    }

    start = end;
  }
  return chunks;
};
