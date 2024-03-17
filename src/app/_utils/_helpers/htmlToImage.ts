import { toPng } from "html-to-image";

export const convertDivToPng = async (div: HTMLElement) => {
  const data = await toPng(div, {
    cacheBust: true,
    canvasWidth: 2480,
    canvasHeight: 3508,
  });
  return data;
};
