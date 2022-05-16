import { Component, OnInit } from '@angular/core';

import { Quadra } from 'src/app/model/quadra.model';
import { QuadrasService } from 'src/app/services/quadras.service';
import { Esporte } from '../model/esporte.model';
import { EsporteService } from '../services/esporte/esporte.service';
import { AuthService } from '../services/authentication.service';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.page.html',
  styleUrls: ['./home-admin.page.scss'],
})
export class HomeAdminPage implements OnInit {

  public quadras: Array<Quadra> = [];
  public esportes: Array<Esporte> = [];
  public selected: number;

  constructor(private quadraService: QuadrasService, private EsporteService: EsporteService, public authService: AuthService) { }

  ngOnInit() {
    this.esportes = this.EsporteService.getAll();

    this.quadraService.getAll().subscribe((quadrasColecao) => {
      console.log(quadrasColecao);

      this.quadras = quadrasColecao.map((item) => {
        return {
          id: item.payload.doc.id,
          nome: item.payload.doc.data()['nome'],
          logradouro: item.payload.doc.data()['logradouro'],
          bairro: item.payload.doc.data()['bairro'],
          cidade: item.payload.doc.data()['cidade'],
          esporte: item.payload.doc.data()['esporte'],
          valorHora: item.payload.doc.data()['valorHora'],
          telefone: item.payload.doc.data()['telefone'],
          descricao: item.payload.doc.data()['descricao']
        };
      });
    });
  }

}
