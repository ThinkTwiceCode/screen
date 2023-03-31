import { format } from '@/utils/date';

export function saveDataUrlToImage(imgUrl: string, name?: string) {
  const imgName = typeof name === 'string' ? name: format(new Date(), 'YYYY_MM_DD_HH_mm_ss_SSS');
  let saveA = document.createElement("a");
  saveA.style.display = 'none';
  document.body.appendChild(saveA);
  saveA.href = imgUrl;
  saveA.download = imgName;
  saveA.target = "_blank";
  saveA.click();
  saveA.remove();
}