import { Queue } from "bullmq";

const connection = {
    host: 'paybank-redis',
    port: 6379
};

//esse é o nome da fila ja criados no redis
const queueName = 'twoFactorQueue';

//se inscreve na fila 
const queue = new Queue(queueName, { connection });

export const PegarJobDaFila = async () => {
 const jobs = await queue.getJobs() //busca todos os jobs da fila
 return jobs[0].data.code; //retorna o codigo de autenticação do primeiro job da fila   
}

export const limpasJobs = async () => {
    await queue.obliterate();
}