import {run} from '../retrieve-article-data';

describe('retrieve-article-data tests', () => {
    test('should return the correct successful response', async () => {
        const context = {
            log: jest.fn(),
            done: jest.fn(),
            res: {}
        }
        
        await run(context, {});

        expect(context.res).toMatchSnapshot();
    })
})