import https from 'https';

export const checkIfScrapingIsAllowedFor = async (domain) => {
    async function isDisallowed(domain) {
        const robotsTxtUrl = new URL('/robots.txt', domain);
        return new Promise((resolve) => {
            https.get(robotsTxtUrl, (res) => {
                if (res.statusCode !== 200) return resolve(false);
                let data = '';
                res.on('data', (chunk) => (data += chunk));
                res.on('end', () => resolve(/User-agent: \*\s*Disallow: \//.test(data)));
            }).on('error', () => resolve(false));
        });
    }

    if (await isDisallowed(domain)) {
        console.log(`Scraping disallowed for ${domain}`);
        return false;
    }

    console.log(`Scraping allowed for ${domain}`);
    return true;
}