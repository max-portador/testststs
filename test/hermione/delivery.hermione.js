describe('!!HERMIONE!! DELIVERY ', async function() {
    it('Сравнение скриншотов', async function() {
        await this.browser.url('/hw/store/delivery');

        await this.browser.assertView('plain', '.Delivery', {
            compositeImage: true,
        });
    });
});