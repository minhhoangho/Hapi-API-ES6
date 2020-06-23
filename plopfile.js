import path from 'path';

const BASE_DB_PATH = path.join(__dirname, 'src', 'database');

export default function(plop) {
  // create your generators here
  plop.setGenerator('basics', {
    description: 'this is a skeleton plopfile',
    prompts: [], // array of inquirer prompts
    actions: [] // array of actions
  });
  plop.setGenerator('controller', {
    description: 'application controller logic',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'controller name please'
      }
    ],
    actions: [
      {
        type: 'add',
        path: 'src/{{name}}.js',
        templateFile: 'plop-templates/controller.hbs'
      }
    ]
  });
}
