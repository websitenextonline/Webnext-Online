from pathlib import Path
import re
r=Path('.')
# Keep the existing homepage intact apart from discoverability and a calculator deep link.
p=r/'index.html';s=p.read_text()
if 'function openToolFromURL()' in s:
 print('Cost guide already linked.');raise SystemExit(0)
match=re.search(r'<section[^>]+id="wn-faq"[^>]*>',s);assert match
card='''<section id="guides" style="background:#f4f8fd;border-top:1px solid #e3eaf3"><div class="w ct"><p class="kk">PRACTICAL WEBSITE GUIDE</p><h2>Plan your website. <em>Know your budget.</em></h2><p>Pakistan mein website ka kharcha kaise calculate karein? Pages, features aur recurring costs ko Roman Urdu mein samjhein. Calculator values examples hain, final quotation nahi.</p><div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;margin-top:24px"><a class="btn bp" href="/guides/website-cost-pakistan/">Read the website cost guide</a><a class="btn bg" href="/?tool=cost#wnStudio">Try the Cost Calculator</a></div></div></section>\n'''
s=s[:match.start()]+card+s[match.start():]
s=s.replace('<h4>EXPLORE</h4>','<h4>EXPLORE</h4><a href="/guides/website-cost-pakistan/">Website cost guide</a>',1)
s=s.replace('<script id="wn-studio-script">','<script src="/assets/website-pricing.js?v=20261122"></script><script id="wn-studio-script">',1)
rate='rates={base:18000,page:2500,commerce:22000,booking:12000,motion:9000,seo:7000,crm:16000,copy:5000}'
assert s.count(rate)==1
s=s.replace(rate,'rates=(window.WN_WEBSITE_PRICING||{}).rates||{base:18000,page:2500,commerce:22000,booking:12000,motion:9000,seo:7000,crm:16000,copy:5000}',1)
needle="Domain, hosting and recurring subscriptions are excluded.</div>"
assert needle in s
s=s.replace(needle,'Domain, hosting and recurring subscriptions are excluded. <a href="/guides/website-cost-pakistan/" style="text-decoration:underline;text-underline-offset:4px">Read the website cost guide</a>.</div>',1)
needle='gallery();brand();cost();layout();posterMaker();assistant();save();'
assert s.count(needle)==1
s=s.replace(needle,needle+'''
function openToolFromURL(){const key=new URLSearchParams(location.search).get('tool');if(!tools.some(t=>t[0]===key))return;select(key);requestAnimationFrame(()=>root.scrollIntoView({behavior:'instant',block:'start'}))}openToolFromURL();addEventListener('popstate',openToolFromURL);
''',1)
p.write_text(s)
