import { Injectable } from '@angular/core';
import {
    Camera, CameraResultType,
    CameraSource,
    Photo
} from '@capacitor/camera';
import {
    Filesystem,
    Directory
} from '@capacitor/filesystem';

import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Platform } from '@ionic/angular';
import { Foto } from 'src/app/model/foto.model';

@Injectable({
    providedIn: 'root'
})
export class FotoService {
    public foto: Foto = {
        filepath: '',
        webviewpath: './../../assets/img/quadra.jpg',
        url: ''
    };

    constructor(private storage: AngularFireStorage,
        private platform: Platform) { }

    async tirarFoto() {
        const imagem = await Camera.getPhoto({
            resultType: CameraResultType.Uri,
            source: CameraSource.Camera,
            quality: 90
        });

        this.foto = {
            filepath: imagem.path,
            webviewpath: imagem.webPath,
            url: ''
        };
        console.log(this.foto);
    }

    public async upload(nome: string) {
        const nomeFoto = nome + this.imageName();
        let file = null;

        if (this.platform.is('hybrid')) {
            const filePath = this.foto.filepath;
            const readFile = await Filesystem.readFile({
                path: filePath,
            });
            file = `data:image/jpeg;base64,${readFile.data}`;
        } else {
            file = this.foto.webviewpath;
        }

        const response = await fetch(file);
        const blob = await response.blob();
        const formData = new FormData();

        formData.append('file', blob, nomeFoto);

        const foto = formData.get('file');
        const filepath = 'fotoQuadra/' + nomeFoto;
        const fileRef = this.storage.ref(filepath);
        const result = this.storage.upload(filepath, foto);

        return result.then(() => fileRef);
    }

    imageName() {
        const newTime = Math.floor(Date.now() / 1000);
        return Math.floor(Math.random() * 5) + newTime;
    }

}