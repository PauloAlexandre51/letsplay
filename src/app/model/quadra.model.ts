import { getDate } from "date-fns";

export class Quadra {
    public id: string;
    public nome: string;
    public logradouro: string;
    public bairro: string;
    public cidade: string;
    public esporte: number;
    public valorHora: number;
    public telefone: string;
    public descricao: string;
    public foto: string;
    public dataInclusao: any;

    constructor()
    constructor(foto?: string) {
        this.foto = (foto) ? foto : '';
        const d = new Date();
        this.dataInclusao = d.toLocaleDateString();
    }
}