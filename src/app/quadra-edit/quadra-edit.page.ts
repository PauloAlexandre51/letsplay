import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Quadra } from 'src/app/model/quadra.model';
import { QuadrasService } from 'src/app/services/quadras.service';

@Component({
  selector: 'app-quadra-edit',
  templateUrl: './quadra-edit.page.html',
  styleUrls: ['./quadra-edit.page.scss'],
})
export class QuadraEditPage implements OnInit {
  public quadra: Quadra = new Quadra();
  public quadraEdit: Quadra = new Quadra();

  constructor(private rotaAtiva: ActivatedRoute, private rota: Router, private quadrasService: QuadrasService) { }

  ngOnInit() {
    const codigo = this.rotaAtiva.snapshot.paramMap.get('id');

    this.quadrasService.get(codigo).then((quadra) => {
      this.quadra = quadra;
    });
  }

  public editar() {
    this.quadrasService.edit(this.quadraEdit, this.quadra.id).then(() => {
      this.rota.navigate(['/home-admin']);
    });
  }

  public deletar() {
    this.quadrasService.delete(this.quadra.id).then(() => {
      this.rota.navigate(['/home-admin']);
    });
  }
}