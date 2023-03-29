import {
  ref, reactive,
  onMounted,
  unref,
} from 'vue';

import { ElMessage } from 'element-plus';

import type { Ref } from 'vue';

type MaybeRefHTMLElement = HTMLElement | Ref<HTMLElement>;

function drawStar(ctx: CanvasRenderingContext2D) {
  function fillStart(r: number) {
    ctx.save();
    ctx.beginPath()
    ctx.moveTo(r,0);
    for (var i=0;i<9;i++){
      ctx.rotate(Math.PI/5);
      if(i%2 == 0) {
        ctx.lineTo((r/0.525731)*0.200811,0);
      } else {
        ctx.lineTo(r,0);
      }
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  ctx.fillRect(0,0,150,150);
  ctx.translate(75,75);

  // Create a circular clipping path
  ctx.beginPath();
  ctx.arc(0,0,60,0,Math.PI*2,true);
  ctx.clip();

  // draw background
  var lingrad = ctx.createLinearGradient(0,-75,0,75);
  lingrad.addColorStop(0, '#232256');
  lingrad.addColorStop(1, '#143778');

  ctx.fillStyle = lingrad;
  ctx.fillRect(-75,-75,150,150);

  // draw stars
  for (var j=1;j<50;j++){
    ctx.save();
    ctx.fillStyle = '#fff';
    ctx.translate(75-Math.floor(Math.random()*150),
                  75-Math.floor(Math.random()*150));
    fillStart(Math.floor(Math.random()*  4)+2);
    ctx.restore();
  }
}

function drawTwoRectangle(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = 'rgb(200 ,0 ,0)';
  ctx.fillRect(100, 100, 50, 50);

  ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
  ctx.fillRect(125, 125, 50, 50);
}

function drawStrokeRectangle(ctx: CanvasRenderingContext2D) {
  // ctx.lineWidth = 5;
  ctx.strokeStyle = 'rgb(200 ,0 ,0)';
  ctx.strokeRect(100, 200, 50, 50);

  // ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
  // ctx.fillRect(100, 200, 50, 50);
}

function clearRectangle(ctx: CanvasRenderingContext2D) {
  drawTwoRectangle(ctx);

  ctx.clearRect(130, 130, 15, 15);
}

function drawTriangle(ctx: CanvasRenderingContext2D) {
  ctx.beginPath();
  ctx.moveTo(100, 100);
  ctx.lineTo(100, 200);
  ctx.lineTo(50, 200);
  /**
   * 当调用fill函数后，所有未闭合的图形都会自动闭合，所以不需再要手动调用fill函数。
   * 但是调用stroke时不会自动闭合。
   */
  ctx.fill();
}

function drawSmiley(ctx: CanvasRenderingContext2D) {
  ctx.beginPath();
  ctx.arc(75, 75, 50, 0, Math.PI * 2, true); // 绘制
  ctx.closePath();
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(110, 75);
  ctx.arc(75, 75, 30, 0, Math.PI, false);   // 口 (顺时针)
  // ctx.closePath();
  // ctx.stroke();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(65, 65);
  ctx.arc(60, 65, 5, 0, Math.PI * 2, true);  // 左眼
  ctx.moveTo(95, 65);
  ctx.arc(90, 65, 5, 0, Math.PI * 2, true);  // 右眼
  ctx.fill();
}

function drawBezier(ctx: CanvasRenderingContext2D) {
  ctx.beginPath();
  ctx.moveTo(100, 100);
  ctx.quadraticCurveTo(100, 100, 200, 200);

  ctx.moveTo(300, 300);
  ctx.bezierCurveTo(300, 300, 300, 450, 500, 500);
  ctx.stroke();
  ctx.closePath();
}

export function useDraw(canvasEl: MaybeRefHTMLElement, parentEl: MaybeRefHTMLElement) {
  const painting = ref(false); // 鼠标是否按下
  const eraser = ref(false); // 是否启用橡皮擦
  const lastPoint = reactive({ x: 0, y: 0 });

  function getCanvas(): HTMLCanvasElement {
    return unref(canvasEl) as HTMLCanvasElement;
  }

  function getParentElment(): HTMLElement {
    return unref(parentEl);
  }

  function getContext(): CanvasRenderingContext2D {
    return getCanvas().getContext('2d') as CanvasRenderingContext2D;
  }

  onMounted(() => {
    const canvas = getCanvas();
    const ctx = getContext();
  
    const parent = getParentElment();
    canvas.width = parent.clientWidth;
    canvas.height = parent.clientHeight;
  
    // 画点函数
    function drawCircle(x: number, y: number, radius: number) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
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
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      ctx.closePath();
    }

    if (document.body.ontouchstart !== undefined) {
      document.body.addEventListener('touchmove', (e) => {
        e.preventDefault();
      });
      ElMessage.info('移动端');
      canvas.ontouchstart = function (e) {
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
      ElMessage.info('PC端');
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

  return {
    painting,
    eraser,
  }
}