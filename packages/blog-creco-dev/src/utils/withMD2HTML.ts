export function withMD2HTML(markdown: string) {
  const lines = markdown.split('\n');
  const resultLines: string[] = [];

  for (let line of lines) {
    if (line.startsWith('#')) {
      const [heading, ...text] = line.split(' ');
      const size = heading.split('#').length - 1;
      line = `<h${size}>${text.join(' ')}</h${size}>`;
      resultLines.push(line);
    } else if (line.startsWith('https://') && line.endsWith('.jpg')) {
      const images = line.split(',');

      resultLines.push(`
        <div style="text-align: center; display: flex; width: 100%; justify-content: space-evenly; flex-wrap: wrap; gap: 20px;">
          ${images.map(x => `<img src="${x}" style="max-height: 320px; max-width: 100%" />`).join('')}
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

      resultLines.push(line);
    }
  }

  return resultLines.join('<br/>');
}
