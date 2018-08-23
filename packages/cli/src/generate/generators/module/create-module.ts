
// 3p
import { existsSync } from 'fs';

// FoalTS
import { copyFileFromTemplates, getNames, mkdirIfNotExists, renderTemplate } from '../../utils';

export function createModule({ name }: { name: string }) {
  const names = getNames(name);

  let prefix = '';

  if (existsSync('src/app/sub-modules')) {
    prefix = 'src/app/sub-modules/';
  } else if (existsSync('sub-modules')) {
    prefix = 'sub-modules/';
  }

  mkdirIfNotExists(`${prefix}${names.kebabName}`);

  renderTemplate('module/index.ts', `${prefix}${names.kebabName}/index.ts`, names);
  renderTemplate('module/module.ts', `${prefix}${names.kebabName}/${names.kebabName}.module.ts`, names);

  mkdirIfNotExists(`${prefix}${names.kebabName}/controllers`);
  copyFileFromTemplates('module/controllers/index.ts', `${prefix}${names.kebabName}/controllers/index.ts`);
  mkdirIfNotExists(`${prefix}${names.kebabName}/controllers/templates`);
  mkdirIfNotExists(`${prefix}${names.kebabName}/hooks`);
  copyFileFromTemplates('module/hooks/index.ts', `${prefix}${names.kebabName}/hooks/index.ts`);

  mkdirIfNotExists(`${prefix}${names.kebabName}/entities`);
  copyFileFromTemplates('module/entities/index.ts', `${prefix}${names.kebabName}/entities/index.ts`);

  mkdirIfNotExists(`${prefix}${names.kebabName}/sub-modules`);
  copyFileFromTemplates('module/sub-modules/index.ts', `${prefix}${names.kebabName}/sub-modules/index.ts`);

  mkdirIfNotExists(`${prefix}${names.kebabName}/services`);
  copyFileFromTemplates('module/services/index.ts', `${prefix}${names.kebabName}/services/index.ts`);
}
