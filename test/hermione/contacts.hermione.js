describe('!!HERMIONE!! CONTACTS  ', async function() {
    it('Сравнение скриншотов', async function() {
        await this.browser.url('/hw/store/contacts');

        await this.browser.assertView('plain', '.Contacts', {
            compositeImage: true,
        });
    });
});