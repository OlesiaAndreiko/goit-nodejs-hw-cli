const { program } = require("commander");
const chalk = require("chalk");

const contacts = require("./contacts.js");

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await contacts.listContacts();
      console.table(allContacts);
      break;

    case "get":
      const contact = await contacts.getContactById(id);
      if (!contact) {        
        return console.log(chalk.bgRed(`Contact with id ${id} not found!`));
      }
      console.log(chalk.bgCyan('%s'), contact);
      break;

    case "add":
      const newContact = await contacts.addContact(name, email, phone);
      console.log(chalk.bgCyan('%s'), newContact);
      break;

    case "remove":
      const result = await contacts.removeContact(id);
      if (!result) {
        return console.log(chalk.bgRed(`Contact with id ${id} not found!`));
      }
      console.log(
        chalk.bgGreen(
          `The contact with id ${id} has been successfully deleted!`
        )
      );
      break;

    default:
      console.log(chalk.bgRed("Unknown action type!"));
  }
}

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "contact id")
  .option("-n, --name <type>", "contact name")
  .option("-e, --email <type>", "contact email")
  .option("-p, --phone <type>", "contact phone");

program.parse(process.argv);

const options = program.opts();

invokeAction(options);