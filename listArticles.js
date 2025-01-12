import readline from "readline";
import chalk from "chalk";
import open from "open";

const VIEWPORT_SIZE = process.stdout.rows - 6;

const renderList = (items, selectedIndex, scrollOffset) => {
  console.clear();

  const visibleItems = items.slice(scrollOffset, scrollOffset + VIEWPORT_SIZE);

  if (scrollOffset > 0) {
    console.log(chalk.dim("↑ Flere artikler over"));
  }

  visibleItems.forEach((item, index) => {
    const actualIndex = scrollOffset + index;
    if (actualIndex === selectedIndex) {
      console.log(chalk.black.bgWhite(`> ${item.title} (${item.href}) <`));
    } else {
      console.log(`  ${item.title}`);
    }
  });

  if (scrollOffset + VIEWPORT_SIZE < items.length) {
    console.log(chalk.dim("↓ Flere artikler under"));
  }
};

const selectFromList = (items) => {
  readline.emitKeypressEvents(process.stdin);
  process.stdin.setRawMode(true);

  let selectedIndex = 0;
  let scrollOffset = 0;

  const updateScroll = () => {
    if (selectedIndex < scrollOffset) {
      scrollOffset = selectedIndex;
    } else if (selectedIndex >= scrollOffset + VIEWPORT_SIZE) {
      scrollOffset = selectedIndex - VIEWPORT_SIZE + 1;
    }
  };

  // Første render viser bare listen, med første element fremhevet
  // Vi kjører rerenders for hvert tastetrykk, for å printe ut listen med riktig fremhevet element
  // Ganske uoptimalisert, men det funker 🤷‍♂️🤷‍♂️
  renderList(items, selectedIndex, scrollOffset);

  process.stdin.on("keypress", (str, key) => {
    // Vi går ut av programmet dersom brukeren trykker på `ctrl + c`
    if (key.ctrl && key.name === "c") {
      process.stdin.setRawMode(false);
      process.exit();
    }

    switch (key.name) {
      case "up":
        selectedIndex =
          selectedIndex > 0 ? selectedIndex - 1 : items.length - 1;
        updateScroll();
        break;
      case "down":
        selectedIndex =
          selectedIndex < items.length - 1 ? selectedIndex + 1 : 0;
        updateScroll();
        break;
      case "return":
        const currentItem = items[selectedIndex];
        if (currentItem.href) {
          open(currentItem.href);
        }
        return;
    }

    renderList(items, selectedIndex, scrollOffset);
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
