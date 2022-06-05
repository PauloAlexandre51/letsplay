import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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

  editarQuadra: FormGroup;
  isSubmitted = false;

  constructor(private rotaAtiva: ActivatedRoute, private rota: Router, private quadrasService: QuadrasService, public formBuilder: FormBuilder) { }

  ngOnInit() {
    const codigo = this.rotaAtiva.snapshot.paramMap.get('id');

    this.quadrasService.get(codigo).then((quadra) => {
      this.quadra = quadra;
    });

    this.editarQuadra = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      logradouro: ['', [Validators.required]],
      bairro: ['', [Validators.required]],
      cidade: ['', [Validators.required]],
      esporte: ['', [Validators.required]],
      valorHora: ['', [Validators.required]],
      telefone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      descricao: ['', [Validators.required]]
    })
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

  submitForm() {
    this.isSubmitted = true;
    if (!this.editarQuadra.valid) {
      console.log('Por favor preencha todos os campos')
      return false;
    } else {
      this.editar();
    }
  }

  get errorControl() {
    return this.editarQuadra.controls;
  }
}
