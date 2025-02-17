 export class LoginPage {

    constructor(page) {
        this.page = page;
    }

    async acessaPagina(){
        await this.page.goto('http://paybank-mf-auth:3000/');
    }

    async informaCPF(cpf){
        await this.page.getByRole('textbox', { name: 'Digite seu CPF' }).fill(cpf);
        await this.page.getByRole('button', { name: 'Continuar' }).click();
    }

    async informaSenha(senha){
        for (const d of senha) {
            await this.page.getByRole('button', { name: d }).click();
        }
        await this.page.getByRole('button', { name: 'Continuar' }).click();
    }

    async informa2FA(codigoValidacao){
        await this.page.getByRole('textbox', { name: '000000' }).fill(codigoValidacao);
        await this.page.getByRole('button', { name: 'Verificar' }).click();
    } 
    
};