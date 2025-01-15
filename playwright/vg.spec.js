import { test } from "playwright/test";
import {VG_ARTICLES_CSS_LOCATOR} from "./constants.js";
import { checkIfScrapingIsAllowedFor } from "./utils.js";

test('hent ut artikler fra VG', async ({ page }) => {
    if (!await checkIfScrapingIsAllowedFor('https://vg.no')) return;

    await page.goto('https://vg.no')

    const anchors = await page.$$(VG_ARTICLES_CSS_LOCATOR);

    console.log(await anchors[0].evaluate(el => {
        const rawTitle = el.querySelector('h2.headline')?.textContent || '';
        const cleanTitle = rawTitle.replace(/\n+/g, ' ').trim();
        const hasVGPlus = el.querySelector('.article-meta p.subscription')?.innerText === 'VG+';
        const labeledTitle = hasVGPlus ? `[+] ${cleanTitle}` : cleanTitle;


        return {
            href: el.getAttribute('href'),
            title: labeledTitle
        };
    }));

    for (const anchor of anchors) {
        const { href, title } = await anchor.evaluate(el => {
            const rawTitle = el.querySelector('h2.headline')?.textContent || '';
            const cleanTitle = rawTitle.replace(/\n+/g, ' ').trim();
            const hasVGPlus = el.querySelector('.article-meta p.subscription')?.innerText === 'VG+';
            const labeledTitle = hasVGPlus ? `[+] ${cleanTitle}` : cleanTitle;


            return {
                href: el.getAttribute('href'),
                title: labeledTitle
            };
        });

        console.log({
            href, title
        })
    }
})

