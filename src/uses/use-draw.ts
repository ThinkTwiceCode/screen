import {
  ref,
  unref,
  onMounted, onBeforeUnmount,
} from 'vue';

import { format } from '@/utils/date';

import type { Ref } from 'vue';

export function useDraw(canvasEl: HTMLCanvasElement | Ref<HTMLCanvasElement>) {
  const painting = ref(false); // 鼠标是否按下
  const eraser = ref(false); // 是否启用橡皮擦
  const lastPoint = { x: 0, y: 0 };

  function getCanvas(): HTMLCanvasElement {
    return unref(canvasEl) as HTMLCanvasElement;
  }

  const getContext = () => getCanvas().getContext('2d') as CanvasRenderingContext2D;

  function clear() {
    const canvas = getCanvas();
    const ctx = getContext();
    ctx.fillStyle = '#fff';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(0, 0, canvas.width, canvas.height); // 设置背景色，防止保存为图片时产生透明背景
    ctx.fillStyle = '#000';
  }

  function saveToImage() {
    const canvas = getCanvas();
    const imgUrl = canvas.toDataURL('image/png');
    let saveA = document.createElement("a");
    saveA.style.display = 'none';
    document.body.appendChild(saveA);
    saveA.href = imgUrl;
    saveA.download = `draw-${format(new Date(), 'YYYY_MM_DD_HH_mm_ss_SSS')}`
    saveA.target = "_blank";
    saveA.click();
    document.body.removeChild(saveA);
    saveA.remove();
  }

  onMounted(() => {
    document.documentElement.style.touchAction = 'none'; // 禁止浏览器默认触摸触摸行为（如下拉刷新）
    const canvas = getCanvas();
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    // canvas默认画布大小为300*150，如果不手动调整至于css一致，则会导致画面扭曲
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    
    const offset = { x: 0, y: 0 };
    const trueX = (x: number) => x - offset.x;
    const trueY = (y: number) => y - offset.y;

    clear();
  
    // 画点函数
    function drawCircle(x: number, y: number, radius: number) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(trueX(x), trueY(y), radius, 0, Math.PI * 2);
      ctx.fill();
    }
  
    // 划线函数
    function drawLine(x1: number, y1: number, x2: number, y2: number) {
      ctx.lineWidth = 3;
      ctx.beginPath();

      if (eraser.value) {
        ctx.save();
        ctx.globalCompositeOperation = "destination-out";
        ctx.stroke();
        ctx.closePath();
        ctx.clip();
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.restore();
        return;
      }

      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.moveTo(trueX(x1), trueY(y1));
      ctx.lineTo(trueX(x2), trueY(y2));
      ctx.stroke();
      ctx.closePath();
    }

    if (document.body.ontouchstart !== undefined) {
      // 初始化时直接调用getBoundingClientRect获取的数据可能有误
      let initTouch = () => {
        offset.x = canvas.getBoundingClientRect().left;
        offset.y = canvas.getBoundingClientRect().top;
        initTouch = () => {};
      }

      canvas.ontouchstart = function (e) {
        initTouch();
        painting.value = true;
        const { clientX: x, clientY: y } = e.touches[0];
        Object.assign(lastPoint, { x, y });
      }

      canvas.ontouchmove = function (e) {
        const { clientX: x, clientY: y } = e.touches[0];
        let newPoint = { x, y };
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
        Object.assign(lastPoint, newPoint);
      }

      canvas.ontouchend = function (e) {
        painting.value = false;
      }
    } else {
      canvas.onmousedown = function (e) {
        painting.value = true;
        let x = e.offsetX;
        let y = e.offsetY;
        Object.assign(lastPoint, { x, y });
        // drawCircle(x, y, 5);
      }
    
      canvas.onmousemove = function (e) {
        if (!painting.value) return;
        let x = e.offsetX;
        let y = e.offsetY;
        let newPoint = { x, y };
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
        Object.assign(lastPoint, newPoint);
      }
    
      canvas.onmouseup = function (e) {
        painting.value = false;
      }
    }
  });

  onBeforeUnmount(() => {
    document.documentElement.style.touchAction = 'auto';
  });

  return {
    painting,
    eraser,
    clear,
    saveToImage,
  }
}