const cheerio = require('cheerio');

export const htmlResolver = (html) => {
    const result = {
        non_relevant: 0,
        safety: 0,
        manual_review: 0,
        composite: 0,
        ICSR: 0,
        total: 0,
    };
    const $ = cheerio.load(html);

    const rows = $('tr').toArray();

    rows.forEach((row) => {
        const tr = $(row);

        const tds = tr.find('td').toArray();

        tds.forEach((td) => {
            const tdText = $(td).text().trim();
            switch (true) {
                case tdText.includes('manual_review'):
                    result.manual_review += 1;
                    break;
                case tdText.includes('non_relevant'):
                    result.non_relevant += 1;
                    break;
                case tdText.includes('safety'):
                    result.safety += 1;
                    break;
                case tdText.includes('composite'):
                    result.composite += 1;
                    break;
                case tdText.includes('ICSR'):
                    result.ICSR += 1;
                    break;
            }
        });
    });

    result.total =
        result.manual_review +
        result.non_relevant +
        result.safety +
        result.composite +
        result.ICSR;

    return result;
};

export const htmlFilter = (html, value) => {
    const $ = cheerio.load(html);

    const filteredTrElements = $('tbody tr').filter((index, element) => {
        let shouldInclude = false;
        $(element)
            .find('td')
            .each((tdIndex, tdElement) => {
                const tdText = $(tdElement).text();

                if (tdText.includes(value)) {
                    shouldInclude = true;
                    return false;
                }
            });
        return shouldInclude;
    });

    $('tbody').empty().append(filteredTrElements);

    return $.html();
};
