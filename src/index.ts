import { Command } from 'commander';
import chalk from 'chalk';
import bootstrap from './task.js';

const program = new Command();

program
  .name('backstage-bootstraper')
  .description('CLI to bootstrap Backstage setup with user-defined plugins');

program
  .command('create')
  .description('create a new project in a new directory')
  .argument('<project-name>', 'Project name')
  .option('-p, --plugins <plugin>', 'Plugins', ',')
  .action(async (projectName, options) => {
    await bootstrap(projectName, options.plugins.split(','));
    console.log(chalk.green(`🥇 Successfully created ${chalk.cyan(projectName)}`));
  });

program.parse(process.argv);
