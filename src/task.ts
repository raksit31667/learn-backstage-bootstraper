import fs from 'fs-extra';
import os from 'os';
import { basename, dirname, resolve as resolvePath } from 'path';
import recursive from 'recursive-readdir';
import handlebars from 'handlebars';

const bootstrap = async (projectName: string) => {
  const templateDirectory = resolvePath(dirname(''), 'templates/default-project');
  const temporaryDirectory = resolvePath(os.tmpdir(), projectName);
  const targetDirectory = resolvePath(fs.realpathSync(process.cwd()), projectName);

  console.log('Bootstrap the project...');

  try {
    console.log('Creating a temporary directory...');
    await fs.mkdir(temporaryDirectory);

    console.log('Templating files...');
    const files = await recursive(templateDirectory).catch(error => {
      throw new Error(`Failed to read template directory: ${error.message}`);
    });

    for (const file of files) {
      const destinationFile = file.replace(templateDirectory, temporaryDirectory);
      await fs.ensureDir(dirname(destinationFile));

      if (file.endsWith('.hbs')) {
        const destination = destinationFile.replace(/\.hbs$/, '');

        const template = await fs.readFile(file);
        const compiled = handlebars.compile(template.toString());
        const contents = compiled({ name: basename(destination), projectName });

        await fs.writeFile(destination, contents).catch(error => {
          throw new Error(
            `Failed to create file: ${destination}: ${error.message}`
          );
        });
      } else {
        await fs.copyFile(file, destinationFile).catch(error => {
          throw new Error(
            `Failed to copy file to ${destinationFile} : ${error.message}`
          );
        });
      }
    }

    console.log('Moving to target directory...');
    await fs.move(temporaryDirectory, targetDirectory).catch(error => {
      throw new Error(
        `Failed to move files from ${temporaryDirectory} to ${targetDirectory}: ${error.message}`
      );
    });

  } catch (error: any) {
    await fs.remove(temporaryDirectory);
    throw new Error(
      `Something is wrong: ${error.message}`
    );
  }
};
export default bootstrap;
