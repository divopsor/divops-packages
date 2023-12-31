export function withMD2HTML(markdown?: string) {
  const lines = markdown?.split('\n') ?? [];
  const resultLines: string[] = [];

  for (let line of lines) {
    const words = line.split(' ');
    if (words[0].startsWith('>') && words[0].endsWith('>')) {
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

      resultLines.push(
        `<span>${line.trim()}</span>`,
      );
    }
  }

  return resultLines.join('<br />');
}
