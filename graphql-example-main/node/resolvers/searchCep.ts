type ArgsType = {
  cep: string
}

export const searchCep = async (_:any, { cep }: ArgsType, { clients: { viaCep } }: Context) => {
  console.log(cep)
  return await viaCep.searchCep(cep)
}