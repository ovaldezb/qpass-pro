export class Invitacion{
  constructor(
    public id:string="",
    public anfitrion:string,
    public asunto: string,
    public duracion: number,
    public nombreInvitado: string,
    public telefonoInvitado: string,
    public correoInvitado: string,
    public fechaEvento: Date,
    public horaEvento: number,
    public detalle:string,
    public lugar:string,
    public notificarEntrada:boolean
  ){}
}