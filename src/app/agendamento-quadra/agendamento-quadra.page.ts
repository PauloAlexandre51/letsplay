import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Quadra } from 'src/app/model/quadra.model';
import { QuadrasService } from 'src/app/services/quadras.service';
import { EsporteService } from '../services/esporte/esporte.service';
import { Esporte } from '../model/esporte.model';
import { Agendamento } from '../model/agendamento.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-agendamento-quadra',
  templateUrl: './agendamento-quadra.page.html',
  styleUrls: ['./agendamento-quadra.page.scss'],
})
export class AgendamentoQuadraPage implements OnInit {

  public quadra: Quadra = new Quadra();
  public data: Date;
  public agenda: Agendamento = new Agendamento();
  public codQuadra: string;
  //public esporte: Esporte = new Esporte();

  constructor(private rotaAtiva: ActivatedRoute, private rota: Router, private quadrasService: QuadrasService,private firestore: AngularFirestore) { }

  ngOnInit() {
    this.codQuadra = this.rotaAtiva.snapshot.paramMap.get('id');

    this.quadrasService.get(this.codQuadra).then((quadra) => {
      this.quadra = quadra;
    });
  }

  public add(agenda: Agendamento) {
    return this.firestore.collection('agendamentos').add({
      ...agenda
    });
  }

  Agendar(){
    let dataAgenda = new Date(this.data);

    // let hora = (dataAgenda.getHours() + ":" + dataAgenda.getMinutes());
    let hora = (this.data.toString().substring(11,16))
    let data = (this.data.toString().substring(0,10))

    this.agenda.emailUser = localStorage.getItem('email');
    this.agenda.idQuadra = this.codQuadra;
    this.agenda.data = data;
    this.agenda.hora = hora;

    this.add(this.agenda)
  }
}
