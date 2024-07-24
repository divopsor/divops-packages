import { Command, Option } from 'clipanion';
import { readFile, writeFile, existsSync } from 'fs-extra';
import path from 'path';

export class MainCommand extends Command {
  from = Option.String('--from', { required: true });

  to = Option.String('--to', { required: true });

  targets = Option.Rest();

  async execute() {
    const { from, to, targets } = this;

    if (from === '' || to === '') {
      throw new Error(`파라미터가 올바르지 않습니다. (${JSON.stringify({ from, to })})`);
    }

    if (targets.length === 0) {
      throw new Error('변경할 파일을 입력해주세요.');
    }

    for (const target of targets) {
      if (!existsSync(path.join(process.cwd(), target))) {
        throw new Error(`경로가 존재하지 않습니다. (${path.join(process.cwd(), target)})`);
      }
    }

    for (const target of targets) {
      const filepath = path.join(process.cwd(), target);
      const before = await readFile(filepath, 'utf-8');

      const after = before.replaceAll(from, to);

      await writeFile(filepath, after, 'utf-8');
      console.log(`✅ ${filepath} updated.`);
    }
  }
}
