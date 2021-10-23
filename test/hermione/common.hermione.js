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
        await this.browser.url('/hw/store/catalog/0');
        await this.browser.$('.ProductDetails-AddToCart').click();
        await this.browser.url('/hw/store/cart');
        await this.browser.url('/hw/store/cart');
        await this.browser.assertView('plain', '.Cart', {
            compositeImage: true,
        });
    });
});

describe('[H] Страница главная', async function() {
    it('проверка скриншотом', async function() {
        await this.browser.url('/hw/store/');
        await this.browser.assertView('plain', '.Home', {
            compositeImage: true,
        });
    });
});
// it('главная', async function() {
//     await this.browser.url('/hw/store/');
//     await this.browser.assertView('plain', '.Application', {
//         compositeImage: true,
//     });
// });

describe('[H] Страница доставки', async function() {
    it('проверка скриншотом', async function() {
        await this.browser.url('/hw/store/delivery');
        await this.browser.assertView('plain', '.Delivery', {
            compositeImage: true,
        });
    });
});

describe('[H] Страница контакты', async function() {
    it('проверка скриншотом', async function() {
        await this.browser.url('/hw/store/contacts');
        await this.browser.assertView('plain', '.Contacts', {
            compositeImage: true,
        });
    });
});

describe('[H] Страница каталога', async function() {
    it('проверка скриншотом', async function() {
        const sParent = '.Catalog';

        await this.browser.url('/hw/store/catalog');
        await this.browser.$(sParent).waitForExist();
        await this.browser.assertView('plain', sParent, {
            compositeImage: true,
        });
    });
});

describe('[H] Страница товара', async function() {
    it('проверка скриншотом', async function() {
        await this.browser.url('/hw/store/catalog/0');
        await this.browser.assertView('plain', '.Product', {
            compositeImage: true,
        });
    });
});