export class Usuario{

  constructor(

    public id: string,
    public Nombre: string,
    public Apellidos: string,
    public Condominio: string,
    public Direccion: string,
    public tipoUsuario: string,
    public fechaNacimiento: string,
    public rfcOrcurp: string,
    public telefono: number

  ){}

}