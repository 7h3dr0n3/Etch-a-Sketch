


working:
2. add slider for size change,
toggle mouseover for active click.
4. graying 10% toward black.
5. lightening 10% toward white.
6. color picker for squares 
7. rainbow mode toggle
8. Eraser.
9. save image/ screenshot of sketch.
10. upload button /which uploads in sketch to edit.

looks:
1. style the button, change background .
2. upload image in background image to Sketch stand in beautiful valley.
3. add music.


function LightenDarkenColor(col, amt) {
  
    var usePound = false;
  
    if (col[0] == "#") {
        col = col.slice(1);
        usePound = true;
    }
 
    var num = parseInt(col,16);
 
    var r = (num >> 16) + amt;
 
    if (r > 255) r = 255;
    else if  (r < 0) r = 0;
 
    var b = ((num >> 8) & 0x00FF) + amt;
 
    if (b > 255) b = 255;
    else if  (b < 0) b = 0;
 
    var g = (num & 0x0000FF) + amt;
 
    if (g > 255) g = 255;
    else if (g < 0) g = 0;
 
    return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
  
}