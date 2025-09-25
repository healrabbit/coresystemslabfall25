const draggable = document.querySelectorAll('.draggable');
const trash = document.getElementById('trassh'); 
let active = null;
let offsetX, offsetY;
let zindex = 1;
window.addEventListener('load', () => {
    const pageWidth = window.innerWidth;
    const pageHeight = window.innerHeight;

    draggable.forEach(draggable => {
        const elemWidth = draggable.offsetWidth;
        const elemHeight = draggable.offsetHeight;

        const randomLeft = Math.random() * (pageWidth - elemWidth);
        const randomTop = Math.random() * (pageHeight - elemHeight);

        draggable.style.position = 'absolute';
        draggable.style.left = `${randomLeft}px`;
        draggable.style.top = `${randomTop}px`;
    });
});

draggable.forEach(draggable => {
    draggable.addEventListener('mousedown', (e) => {
        active = draggable;
        zindex++;
        active.style.zIndex = zindex;
        offsetX = e.clientX - draggable.getBoundingClientRect().left;
        offsetY = e.clientY - draggable.getBoundingClientRect().top;

        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
    });
});

function mouseMoveHandler(e) {
    if (!active) return;

    const pageWidth = window.innerWidth;
    const pageHeight = window.innerHeight;

    const elemWidth = active.offsetWidth;
    const elemHeight = active.offsetHeight;

    let newLeft = e.clientX - offsetX;
    let newTop = e.clientY - offsetY;

    newLeft = Math.max(0, Math.min(pageWidth - elemWidth, newLeft));
    newTop = Math.max(0, Math.min(pageHeight - elemHeight, newTop));

    active.style.left = `${newLeft}px`;
    active.style.top = `${newTop}px`;
    active.style.position = 'absolute';

   
    if (trash && isColliding(active, trash)) {
        active.style.opacity = 0.5;
    } else if (active) {
        active.style.opacity = 1;
    }
}

function mouseUpHandler() {
    if (active && trash && isColliding(active, trash)) {
        active.remove();
         const id = active.id;
        const counterpartid = id.endsWith("t") ? id.slice(0, -1) : id + "t";
        const counterpart = document.getElementById(counterpartid);

        if (counterpart) {
        counterpart.remove();
        }
   
    }
 active = null;
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);
}

function isColliding(el1, el2) {
    const r1 = el1.getBoundingClientRect();
    const r2 = el2.getBoundingClientRect();

    return !(
        r1.top > r2.bottom ||
        r1.bottom < r2.top ||
        r1.left > r2.right ||
        r1.right < r2.left
    );
}
