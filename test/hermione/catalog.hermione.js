describe('!!HERMIONE!! CATALOG', async function() {
    it('Сравнение скриншотов', async function() {
        await this.browser.url('/hw/store/catalog');

        await this.browser.assertView('plain', '.Catalog', {
            compositeImage: true,
        });
    });
});