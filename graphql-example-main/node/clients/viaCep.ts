import type { IOContext } from "@vtex/api";
import { ExternalClient } from "@vtex/api";


export default class ViaCep extends ExternalClient {
    constructor(context: IOContext) {
        super('https://viacep.com.br', context)
    }

    public searchCep = async (cep: string) => {
        try {
            const response = await this.http.get(`/ws/${cep}/json/`)
            console.log('Response from ViaCep:', response)
            return response
        } catch (error) {
            console.error('Error fetching CEP data:', error)
            throw new Error(`Failed to fetch CEP data for ${cep}: ${error.message}`)
        }
    }
}