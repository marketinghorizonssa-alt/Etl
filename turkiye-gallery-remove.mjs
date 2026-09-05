import fs from 'node:fs';
import path from 'node:path';

const file = path.resolve('dist','turkiye','index.html');
if (!fs.existsSync(file)) process.exit(0);

let html = fs.readFileSync(file,'utf8');
html = html.replace(/<a href="#gallery">صور تركيا<\/a>/g,'');
html = html.replace(/<section class="tk-section tk-gallery-section" id="gallery">[\s\S]*?<\/section>\s*(?=<section class="tk-consult">)/g,'');
fs.writeFileSync(file,html);
console.log('Removed Turkey gallery section and its anchor link.');
