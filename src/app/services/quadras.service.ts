import { Injectable } from '@angular/core';
import { Quadra } from '../model/quadra.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class QuadrasService {

  constructor(private firestore: AngularFirestore) { }

  public getAll() {
    return this.firestore.collection('quadras').snapshotChanges();
  }

  // public getByEsporte(cod: number) {
  //   let esportes = [];
  //   if (cod === 0)
  //     return this.quadras;

  //   for (let obj of this.quadras) {
  //     if (obj.esporte === cod) {
  //       esportes.push(obj);
  //     }
  //   }
  //   return esportes;
  // }

  public get(id: string) {
    return this.firestore.collection('quadras')
      .doc(id).ref.get().then((quadraDocumento) => {
        if (quadraDocumento.exists) {
          const quadra = quadraDocumento.data();

          return {
            id: quadraDocumento.id,
            nome: quadra['nome'],
            logradouro: quadra['logradouro'],
            bairro: quadra['bairro'],
            cidade: quadra['cidade'],
            esporte: quadra['esporte'],
            valorHora: quadra['valorHora'],
            telefone: quadra['telefone'],
            descricao: quadra['descricao'],
            foto: quadra['foto'],
            dataInclusao: quadra['dataInclusao']
          };
        }

        return new Quadra();
      });
  }

  public add(quadra: Quadra) {
    delete quadra.id;
    return this.firestore.collection('quadras').add({
      ...quadra
    });
  }

  public edit(quadra: Quadra, id: String) {
    return this.firestore.doc('quadras/' + id).update({
      ...quadra
    });
  }

  public delete(id: string) {
    return this.firestore.doc('quadras/' + id).delete();
  }
}