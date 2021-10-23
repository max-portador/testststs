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
        const browser =  this.browser;

        await browser.url('/hw/store/catalog/0');
        await browser.$('.ProductDetails-AddToCart').click();
        await browser.url('/hw/store/cart');
        await browser.url('/hw/store/cart');
        await browser.assertView('plain', '.Cart');
    });
});

describe('[H] Страница главная', async function() {
    it('проверка скриншотом', async function() {
        await browser.url('/hw/store/');
        await browser.assertView('plain', '.Home');
    });
});

describe('[H] Страница доставки', async function() {
    it('проверка скриншотом', async function() {
        await browser.url('/hw/store/delivery');
        await browser.assertView('plain', '.Delivery');
    });
});

describe('[H] Страница контакты', async function() {
    it('проверка скриншотом', async function() {
        await browser.url('/hw/store/contacts');
        await browser.assertView('plain', '.Contacts');
    });
});

describe('[H] Страница каталога', async function() {
    it('проверка скриншотом', async function() {
        const sParent = '.Catalog';

        await browser.url('/hw/store/catalog');
        await browser.$(sParent).waitForExist();
        await browser.assertView('plain', sParent);
    });
});

describe('[H] Страница товара', async function() {
    it('проверка скриншотом', async function() {
        await browser.url('/hw/store/catalog/0');
        await browser.assertView('plain', '.Product');
    });
});