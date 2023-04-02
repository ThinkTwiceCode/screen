export function waterMark(text: string) {
  function textToUrl() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    canvas.width = 200;
    canvas.height = 200;

    ctx.font = '18px Arial';
    ctx.rotate(-30 / 180 * Math.PI);
    ctx.translate(0, 50);
    // 黑白两色文字，保证任何背景色下都能正常显示
    ctx.fillStyle = 'rgba(108, 108, 108, .3)';
    ctx.fillText(text, -20, 80);
    ctx.fillStyle = 'rgba(241, 241, 241, .3)';
    ctx.fillText(text, 40, 120);

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(URL.createObjectURL(blob as Blob));
      });
    });
  }

  function createWrap(imageUrl: string) {
    const div = document.createElement('div');
    const style: Partial<CSSStyleDeclaration> = {
      position: 'fixed',
      top: '0',
      left: '0',
      bottom: '0',
      right: '0',
      zIndex: String(2 ** 31 - 1),
      backgroundRepeat: 'repeat',
      pointerEvents: 'none',
      backgroundImage: `url(${imageUrl})`,
    };
    Object.assign(div.style, style);
    document.body.appendChild(div);
  }

  textToUrl().then((val: any) => {
    createWrap(val);
  });
}