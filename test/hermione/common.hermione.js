describe('[H] Страница корзины', async function() {
    it('содержимое должно сохраняться между перезагрузками страницы', async function() {
        await this.browser.url('/hw/store/catalog');
        await this.browser.$('.ProductItem-DetailsLink').click();
        await this.browser.$('.ProductDetails-AddToCart').click();
        await this.browser.url('/hw/store/cart');
        await this.browser.url('/hw/store/cart');

        await this.browser.assertView('plain', '.Cart', {
            compositeImage: true,
        });

        await this.browser.$('.Cart-Clear').click();
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
        await this.browser.url('/hw/store/catalog');

        await this.browser.assertView('plain', '.Catalog', {
            compositeImage: true,
        });
    });
});

// describe('[H] Страница товара', async function() {
//     it('проверка скриншотом', async function() {
//         await this.browser.url('/hw/store/catalog');
//         await this.browser.$('.ProductItem-DetailsLink').click();
//
//         await this.browser.assertView('plain', '.Product', {
//             compositeImage: true,
//         });
//     });
// });

// this.browser.setWindowSize(1380, 1024)