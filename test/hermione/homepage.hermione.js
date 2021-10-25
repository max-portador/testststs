describe('!!HERMIONE!! HOMEPAGE  ', async function() {
    it('Сравнение скриншотов', async function() {
        await this.browser.url('/hw/store/');

        await this.browser.assertView('plain', '.Home', {
            compositeImage: true,
        });
    });
});