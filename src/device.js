import MobileDetect from 'mobile-detect';

let md = new MobileDetect(window.navigator.userAgent);
let device = ((md.mobile() && md.phone() != null) ? 'phone' : 'desktop');
let bundle;

if(device == 'desktop') {
	bundle = 'bundle.desktop.js';
} else {
	bundle = 'bundle.mobile.js';
}

let script = document.createElement('script');
script.setAttribute('src', bundle);
document.body.appendChild(script);