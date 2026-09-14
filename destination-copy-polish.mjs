import fs from 'node:fs';
import path from 'node:path';

const changes = [
  {
    file: path.resolve('dist/europe/austria/index.html'),
    from: 'إجابات واضحة لأهم نوايا البحث عن النمسا',
    to: 'دليلك للتخطيط لرحلة النمسا'
  },
  {
    file: path.resolve('dist/europe/france/index.html'),
    from: 'إجابات مفيدة حسب نية البحث الحقيقية',
    to: 'دليلك للتخطيط لرحلة فرنسا وباريس'
  }
];

for (const change of changes) {
  if (!fs.existsSync(change.file)) continue;
  const html = fs.readFileSync(change.file, 'utf8');
  if (!html.includes(change.from)) continue;
  fs.writeFileSync(change.file, html.replace(change.from, change.to));
}

console.log('Polished destination guide headings.');
