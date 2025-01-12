import readline from "readline";
import chalk from "chalk";
import open from "open";

const renderList = (items, selectedIndex) => {
  console.clear();
  items.forEach((item, index) => {
    if (index === selectedIndex) {
      console.log(chalk.black.bgWhite(`> ${item.title} (${item.href}) <`));
    } else {
      console.log(`  ${item.title}`);
    }
  });
  console.log("\nBruk ↑ og ↓ for å navigere, og Enter for å åpne en lenke.");
};

const selectFromList = (items) => {
  readline.emitKeypressEvents(process.stdin);
  process.stdin.setRawMode(true);

  let selectedIndex = items.length - 1;

  // Første render viser bare listen, med siste element fremhevet
  // Vi kjører rerenders for hvert tastetrykk, for å printe ut listen med riktig fremhevet element
  // Ganske uoptimalisert, men det funker 🤷‍♂️🤷‍♂️
  renderList(items, selectedIndex);

  process.stdin.on("keypress", (str, key) => {
    // Vi går ut av programmet dersom brukeren trykker på `ctrl + c`
    if (key.ctrl && key.name === "c") {
      process.stdin.setRawMode(false);
      process.exit();
    }

    const currentItem = items[selectedIndex];

    if (key.name === "up") {
      selectedIndex = selectedIndex > 0 ? selectedIndex - 1 : items.length - 1;
      renderList(items, selectedIndex);
    } else if (key.name === "down") {
      selectedIndex = selectedIndex < items.length - 1 ? selectedIndex + 1 : 0;
      renderList(items, selectedIndex);
    } else if (key.name === "return") {
      if (currentItem.href) {
        console.log(chalk.green(`\nOpening: ${currentItem.href}`));
        open(currentItem.href);
      }

      process.stdin.setRawMode(false);
      process.stdin.pause();
    }
  });
};

function main() {
  const links = [
    { title: "Google", href: "https://www.google.com" },
    { title: "GitHub", href: "https://www.github.com" },
    { title: "Stack Overflow", href: "https://stackoverflow.com" },
    { title: "OpenAI", href: "https://www.openai.com" },
    { title: "Google", href: "https://www.google.com" },
    { title: "GitHub", href: "https://www.github.com" },
    { title: "Stack Overflow", href: "https://stackoverflow.com" },
    { title: "OpenAI", href: "https://www.openai.com" },
    { title: "Google", href: "https://www.google.com" },
    { title: "GitHub", href: "https://www.github.com" },
    { title: "Stack Overflow", href: "https://stackoverflow.com" },
    { title: "OpenAI", href: "https://www.openai.com" },
    { title: "Google", href: "https://www.google.com" },
    { title: "GitHub", href: "https://www.github.com" },
    { title: "Stack Overflow", href: "https://stackoverflow.com" },
    { title: "OpenAI", href: "https://www.openai.com" },
    { title: "Google", href: "https://www.google.com" },
    { title: "GitHub", href: "https://www.github.com" },
    { title: "Stack Overflow", href: "https://stackoverflow.com" },
    { title: "OpenAI", href: "https://www.openai.com" },
    { title: "Google", href: "https://www.google.com" },
    { title: "GitHub", href: "https://www.github.com" },
    { title: "Stack Overflow", href: "https://stackoverflow.com" },
    { title: "OpenAI", href: "https://www.openai.com" },
    { title: "Google", href: "https://www.google.com" },
    { title: "GitHub", href: "https://www.github.com" },
    { title: "Stack Overflow", href: "https://stackoverflow.com" },
    { title: "OpenAI", href: "https://www.openai.com" },
    { title: "Google", href: "https://www.google.com" },
    { title: "GitHub", href: "https://www.github.com" },
    { title: "Stack Overflow", href: "https://stackoverflow.com" },
    { title: "OpenAI", href: "https://www.openai.com" },
  ];

  selectFromList(links);
}

main();
