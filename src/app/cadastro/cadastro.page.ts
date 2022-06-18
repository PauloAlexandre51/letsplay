import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Quadra } from 'src/app/model/quadra.model';
import { QuadrasService } from 'src/app/services/quadras.service';
import { Esporte } from '../model/esporte.model';
import { EsporteService } from '../services/esporte/esporte.service';
import { FotoService } from 'src/app/services/foto.service';
import { getDate } from 'date-fns';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {
  public quadra: Quadra = new Quadra();
  public esportes: Array<Esporte> = [];
  public selected: number;

  cadastroQuadra: FormGroup;
  isSubmitted = false;

  constructor(private quadraService: QuadrasService,
    private rota: Router,
    private EsporteService: EsporteService,
    public formBuilder: FormBuilder,
    private fotoServ: FotoService) { }

  ngOnInit() {
    this.esportes = this.EsporteService.getEsporte();

    this.cadastroQuadra = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      logradouro: ['', [Validators.required]],
      bairro: ['', [Validators.required]],
      cidade: ['', [Validators.required]],
      esporte: ['', [Validators.required]],
      valorHora: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      telefone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      descricao: ['', [Validators.required]]
    })


  }

  public cadastrar() {
    this.fotoServ.upload('quadra-').then((ref) => {
      ref.getDownloadURL().subscribe((url) => {
        this.quadra.foto = url;
        this.quadraService.add(this.quadra)
          .then((resposta: any) => {
            this.rota.navigate(['/home-admin']);
          });
      });
    })
  }

  get errorControl() {
    return this.cadastroQuadra.controls;
  }

  submitForm() {
    this.isSubmitted = true;
    if (!this.cadastroQuadra.valid) {
      console.log('Por favor preencha todos os campos')
      return false;
    } else {
      this.cadastrar();
    }
  }

  public acionarCamera() {
    this.fotoServ.tirarFoto();
  }
}