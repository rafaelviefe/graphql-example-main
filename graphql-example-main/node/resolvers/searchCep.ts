type ArgsType = {
  cep: string
}

export const queries = {
  searchCep: async (args: ArgsType, ctx: Context) => {
    const { clients } = ctx
    console.log('Context clients:', clients)  // Log para inspecionar os clientes

    const { viaCep } = clients
    console.log('ViaCep client:', viaCep)  // Log para verificar o viaCep

    const { cep } = args

    if (!viaCep) {
      throw new Error("viaCep client is not initialized in the context")
    }

    try {
      return await viaCep.searchCep(cep)
    } catch (error) {
      throw new Error(`Failed to fetch data from viaCep: ${error.message}`)
    }
  }
}