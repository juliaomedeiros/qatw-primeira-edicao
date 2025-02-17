// @ts-check
import { test, expect } from '@playwright/test';
import { obterCodigo2FA } from '../support/db'; 
import { LoginPage } from '../pages/LoginPage';
import { Dashpage } from '../pages/DashPage';
import { limpasJobs,PegarJobDaFila } from '../support/redis';



test('Não deve logar quando o codigo de autenticação é invalido', async ({ page }) => {

  const loginPage = new LoginPage(page);

  const user = {
    cpf: '00000014141',
    senha: '147258'
  }

  await loginPage.acessaPagina();

  await loginPage.informaCPF(user.cpf);

  await loginPage.informaSenha(user.senha);

  await loginPage.informa2FA('123456');

  await expect(page.locator('span')).toContainText('Código inválido. Por favor, tente novamente.');
});

test('Deve acessar a conta do usuário', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const dashpage = new Dashpage(page);

  const user = {
    cpf: '00000014141',
    senha: '147258'
  }

  await limpasJobs();
  
  await loginPage.acessaPagina();
  await loginPage.informaCPF(user.cpf);
  await loginPage.informaSenha(user.senha);

  //#checkpoint
  await page.getByRole('heading', { name: 'Verificação em duas etapas' }).waitFor({timeout:3000});

  //const codigoValidacao = await obterCodigo2FA(user.cpf); //pega o codigo no banco
  
  const codigoValidacao = await PegarJobDaFila(); // Pega o codigo na mensageria redis
  
  await loginPage.informa2FA(codigoValidacao);

  await expect(await dashpage.obterSaldo()).toHaveText('R$ 5.000,00');

  
});