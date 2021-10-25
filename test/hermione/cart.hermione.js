describe('!!HERMIONE!! CART  ', async function() {
    it('Содержимое должно сохраняться после перезагрузки страницы', async function() {
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