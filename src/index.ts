import { Command } from 'commander';
import chalk from 'chalk';

const program = new Command();

program
  .name('backstage-bootstraper')
  .description('CLI to bootstrap Backstage setup with user-defined plugins');

program
  .command('create')
  .description('create a new project in a new directory')
  .argument('<project-name>', 'Project name')
  .action(projectName => {
    console.log(chalk.green(`🥇  Successfully created ${chalk.cyan(projectName)}`));
  });

program.parse(process.argv);
