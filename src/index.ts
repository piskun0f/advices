import './env';

import { WikiClient } from '@370/wiki-client';


(async (): Promise<void> => {
    if (process.env.URL && process.env.TOKEN) {
        const client = new WikiClient(process.env.URL, process.env.TOKEN);
        const ivtPages = await client.getSubPagesByDepth('persons/students/ivt', -1);
        if (ivtPages) {
            const pages = ivtPages.filter(page => {
                return page.path.includes('multimedia/composition');
            });

            for (const page of pages) {
                const pageSplit = page.path.split('/');
                console.log(pageSplit[pageSplit.indexOf('multimedia') - 1]);
                const pageInfo = await client.getPageInfo(parseInt(page.id));
                if (pageInfo) {
                    console.log(pageInfo.pages.single.content);
                }
                console.log('\n----------------------------------------------------------------------------------------------------------------------------');
            }
        }
    }

})().catch(console.log);
