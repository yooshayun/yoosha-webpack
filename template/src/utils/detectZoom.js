/**
 * 检测当前浏览器是否处于缩放状态
 */
export function detectZoom (){ 
	 var ratio = 0,
	 screen = window.screen,
	 ua = navigator.userAgent.toLowerCase();
     if (window.devicePixelRatio !== undefined) {
	      ratio = window.devicePixelRatio;
	 } else if (~ua.indexOf('msie')) {  
	    if (screen.deviceXDPI && screen.logicalXDPI) {
	      ratio = screen.deviceXDPI / screen.logicalXDPI;
	    }
	 } else if (window.outerWidth !== undefined && window.innerWidth !== undefined) {
	    ratio = window.outerWidth / window.innerWidth;
	 }
	   
	 if (ratio){
	    ratio = Math.round(ratio * 100);
	 }
	 return ratio;
};