import { test, expect } from "playwright/test";

test('Google NTNU Online', async ({ page }) => {
    await page.goto('https://google.com');

    await page.getByRole('button', { name: 'Avvis alle' }).click();

    await page.getByLabel('Søk', { exact: true }).fill('NTNU Online');

    await page.getByLabel('Google-søk').first().click();

    await page.getByRole('link', { name: 'Linjeforeningen Online - NTNU' }).click();

    await expect(page).toHaveURL('https://online.ntnu.no');

    await expect(page.getByRole('link', { name: 'Online', exact: true })).toBeVisible();
})