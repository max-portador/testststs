// describe('[H] Первый тест!', async function() {
//     it('должно "что то" произойти', async function() {
//         const browser =  this.browser;
//
//         await browser.url('/hw/store/');
// // await new Promise((r) => setTimeout(r, 1000));
//
//         const el = await browser.$('.Home');
//
//         await el.waitForExist();
//     });
// });
describe('[H] Страница корзины', async function() {
    it('содержимое должно сохраняться между перезагрузками страницы', async function() {
        await this.browser.url('/hw/store/catalog');
        await this.browser.$('.ProductItem-DetailsLink').click();
        await this.browser.$('.ProductDetails-AddToCart').click();
        await this.browser.url('/hw/store/cart');
        await this.browser.url('/hw/store/cart');

        await this.browser.assertView('plain1', '.Application', {
            compositeImage: true,
        });
    });
});

describe('[H] Страница главная', async function() {
    it('проверка скриншотом', async function() {
        await this.browser.url('/hw/store/');

        await this.browser.assertView('plain2', '.Application', { // '.Application' ?
            compositeImage: true,
        });
    });
});

describe('[H] Страница доставки', async function() {
    it('проверка скриншотом', async function() {
        await this.browser.url('/hw/store/delivery');

        await this.browser.assertView('plain3', '.Application', {
            compositeImage: true,
        });
    });
});

describe('[H] Страница контакты', async function() {
    it('проверка скриншотом', async function() {
        await this.browser.url('/hw/store/contacts');

        await this.browser.assertView('plain4', '.Application', {
            compositeImage: true,
        });
    });
});

describe('[H] Страница каталога', async function() {
    it('проверка скриншотом', async function() {
        const sParent = '.Application';

        await this.browser.url('/hw/store/catalog');
        await this.browser.$(sParent).waitForExist();

        await this.browser.assertView('plain5', sParent, {
            compositeImage: true,
        });
    });
});

// this.browser.setWindowSize(1380, 1024)