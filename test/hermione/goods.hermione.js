describe('[H] Страница товара', async function() {
    it('проверка скриншотом', async function() {
        const sParent = '.Application';

        await this.browser.url('/hw/store/catalog');
        await this.browser.$(sParent).waitForExist();
        await this.browser.$('.ProductItem-DetailsLink').click();
        await this.browser.$(sParent).waitForExist();

        await this.browser.assertView('plain6', '.Application', {
            compositeImage: true,
        });
    });
});