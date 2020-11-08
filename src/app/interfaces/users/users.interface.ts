
export interface I_users {

    name?: string,
    last_name?: string,
    id_card?: string,
    pais?: string,
    estado?: string,
    ciudad?: string,
    dir_domicilio?: string,
    nro_movil?: string,
    nro_fijo?: string,
    edad?: string,
    photo?: string,
    status?: string,
    email?: string,
    rol?: string,
    pass?: string,
    createdAt?: string,
    updatedAt?: string,
    last_session?: string,
    enrutator_id?: string,

}


export interface I_login {
    email: string,
    pass: string
}