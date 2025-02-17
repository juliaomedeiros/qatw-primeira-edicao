import pgpromise from 'pg-promise'

const pgp = pgpromise();
const db = pgp('postgres://dba:dba@paybank-db:5432/UserDB');

export async function  obterCodigo2FA(cpf){
    const query =
    `
      SELECT two.code
	  FROM public."TwoFactorCode" two
	  join public."User" use 
	  ON use."id" = two."userId"
	  where use."cpf" = '${cpf}'
	  order by two.id desc
	  limit 1;
    `
    //Esse foi a primeira query utilizada
    // SELECT code
	//     FROM public."TwoFactorCode"
	//     order by id desc
	//     limit 1;

    const result  = await db.oneOrNone(query)
    return result.code; //o code é a coluna da tabela do banco de dados
}