import { Command, Option } from 'clipanion';
import execa from 'execa';
import fs from 'fs';
import { readFile, writeFile } from 'fs-extra';
import path from 'path';
import { GIT_IGNORE_DEFAULT, GIT_IGNORE_ZERO_INSTALL, YARNRC_SUPPORTED_ARCHITECTURES } from '../constants';

const GIT_IGNORE = [GIT_IGNORE_DEFAULT, GIT_IGNORE_ZERO_INSTALL].join('\n');

export class MainCommand extends Command {
  cwd = Option.String({ required: false });

  async execute() {
    const basePath = this.cwd ?? process.cwd();

    if(fs.existsSync(path.join(basePath, 'package.json'))) {
      throw new Error('이미 package.json 이 존재하는 프로젝트 구성입니다.');
    }

    await execa(`yarn`, ['init', '-y'], { cwd: basePath });

    console.log(`✅ yarn init -y`);

    await writeFile(path.join(basePath, '.gitignore'), GIT_IGNORE,'utf-8');

    await execa(`yarn`, ['set', 'version', 'stable'], { cwd: basePath });

    console.log(`✅ yarn set version stable`);

    const contents = await readFile(path.join(basePath, '.yarnrc.yml'), 'utf-8');

    if (!contents.includes('nodeLinker')) {
      await writeFile(
        path.join(basePath, '.yarnrc.yml'),
        [
          'nodeLinker: pnp',
          YARNRC_SUPPORTED_ARCHITECTURES,
          contents,
        ].join('\n'),
        'utf-8'
      );

      console.log(`✅ "nodeLinker: pnp" added.`);
    }

    await execa(`yarn`, ['set', 'version', 'stable'], { cwd: basePath });

    await execa(`yarn`, [], { cwd: basePath });

    console.log(`✅ yarn install`);

    await execa(`yarn`, ['dlx', '@yarnpkg/sdks', 'vscode'], { cwd: basePath });

    console.log(`✅ yarn dlx @yarnpkg/sdks vscode`);
  }
}

