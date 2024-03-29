export function withMD2HTML(markdown?: string) {
  const lines = markdown?.split('\n') ?? [];
  const resultLines: string[] = [];

  for (const line of lines) {
    const words = line.split(' ');

    if (line.trim() === '') {
      resultLines.push('<br />');
    } else if (words[0].startsWith('>') && words[0].endsWith('>')) {
      const subscript = words[0] === '>' ? null : words[0].slice(1, words[0].length - 1);
      const others = line.replace(new RegExp(`^>${subscript}>`), '').trim();

      resultLines.push(
        [
          '<div style="border-left: 4px solid #c8c8c8; text-indent: 8px; background: rgba(0,0,0,0.2); padding: 15px;">',
          subscript == null ? '' : `<span style="display: block; font-size: 12px; text-indent: 0;">${subscript}</span>`,
          `<span>${others}</span>`,
          '</div>',
        ].join(''),
      );
    } else if (words[0] === '-') {
      const [, ...text] = words;
      resultLines.push(`<li><span>${text.join(' ')}</span></li>`);
    } else if (words[0].startsWith('#')) {
      const [heading, ...text] = words;
      const size = heading.split('#').length - 1;
      const thisLine = `<h${size}>${text.join(' ').trim()}</h${size}>`;
      resultLines.push(thisLine);
    } else if (line.startsWith('https://') && line.endsWith('.jpg')) {
      const images = line.split(',');

      resultLines.push(`
        <div style="text-align: center; display: flex; width: 100%; justify-content: space-evenly; flex-wrap: wrap; gap: 20px;">
          ${images.map(x => `<img
            src="${x}"
            style="border-radius: 16px; max-height: 320px; max-width: 100%"
          />`).join('')}
        </div>
      `);
    } else {
      resultLines.push(line);
    }
  }

  for (let i = 0; i < resultLines.length; i++) {
    let line = resultLines[i];

    if (line === '<br />') {
      continue;
    }
    // eslint-disable-next-line no-useless-escape
    const linkPattern = /!?\[([^\]]*)\]\(([^\)]+)\)/gm;
    const linkMatches = [...line.matchAll(linkPattern) as any];

    for (const match of linkMatches) {
      line = line.replace(match[0], `<a style="color: skyblue" href="${match[2]}" target="_blank">${match[1]}</a>`);
    }

    const boldPattern = /\*\*(.*?)\*\*/gm;
    const boldMatched = [...line.matchAll(boldPattern) as any];

    for (const match of boldMatched) {
      line = line.replace(match[0], `<bold>${match[1]}</bold>`);
    }
    const isIndented = line[0] === ' ' && line[1] !== '';
    resultLines[i] = `<p style="${isIndented ? 'text-indent: 1.4rem; ' : ''}text-align: justify; word-break: break-word;">${line.trim()}</p>`;
  }

  return resultLines.filter(x => x !== '').join('\n');
}
