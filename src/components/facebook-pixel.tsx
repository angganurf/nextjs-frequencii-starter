"use client";

import Script from "next/script";

const FacebookPixel = () => {
	return (
		<>
			<Script id="facebook-pixel" strategy="lazyOnload">
				{`
					!(function(f,b,e,v,vv,n,nn,t,s,tt,ss){
						if (!f.cbq){nn = f.cbq = function(){nn.initialized ? nn.apply(f.cbq, arguments) : nn.queue.push(arguments);};
						if(!f._cbq) f._cbq = nn;
						nn.push = nn; nn.loaded = !0; nn.version = '2.0'; nn.queue = [];
						tt = b.createElement(e); tt.async = !0; tt.src = vv; ss=b.getElementsByTagName(e)[0]; ss.parentNode.insertBefore(tt,ss);}
						if (f.xbq) return; if (f.fbq) f.xbq=f.fbq;
						n = f.fbq = function()
						{if(arguments[0].startsWith('track')){n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);f.cbq.initialized ? f.cbq.apply(f.cbq, arguments) : f.cbq.queue.push(arguments);}
						else{n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);}};
						if(!f._fbq) f._fbq = n;
						n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = (f.xbq)?f.xbq.queue:[];
						t = b.createElement(e); t.async = !0; t.src = v;s=b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t,s);
					})
					(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js', 'https://tracking.editinfoto.site/sdk/6076537033969085414/events.js');
					fbq('init', '2275671962944641');
					fbq('track', 'PageView');
					cbq('setHost', 'https://tracking.editinfoto.site');
					cbq('init', '6076537033969085414');
					cbq('set', 'integrationMethod', 'forkFromSnippetCode');
					cbq('track', 'PageView');
        `}
			</Script>
			<noscript>
				<img
					height="1"
					width="1"
					style={{ display: "none" }}
					src="https://www.facebook.com/tr?id=2275671962944641&ev=PageView&noscript=1"
					alt="facebook pixel"
				/>
			</noscript>
		</>
	);
};

export default FacebookPixel;
