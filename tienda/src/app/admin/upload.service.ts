import {Injectable} from '@angular/core';
import * as firebase from 'firebase';
import {Upload} from '../models/upload';
import {AngularFirestore} from "angularfire2/firestore";
import * as faker from 'faker';

@Injectable()
export class UploadService {

  private basePath = '/products';

  constructor(private afs: AngularFirestore,) {}

  pushFileToStorage(fileUpload: Upload, progress: {percentage: number}, id: any)
  {
    const storageRef = firebase.storage().ref();
    const fileId = faker.random.alphaNumeric(16);
    const uploadTask = storageRef.child(`${this.basePath}/${fileId}`).put(fileUpload.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        // in progress
        const snap = snapshot as firebase.storage.UploadTaskSnapshot;
        progress.percentage = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
      },
      (error) => {
        // fail
        console.log(error);
      },
      () => {
        // success
        fileUpload.id = fileId;
        fileUpload.url = uploadTask.snapshot.downloadURL;
        fileUpload.name = fileUpload.file.name;
        this.saveFileData(fileUpload, id);
      }
    );
  }

  private saveFileData(fileUpload: Upload, uid: any) {
    let product = this.afs.collection(`products`).doc(uid);
    let newRef = product.collection('uploads').doc(fileUpload.id);
    newRef.set({
      id: fileUpload.id,
      name: fileUpload.name,
      url: fileUpload.url
    });
  }

  public removeFile(fileId) {
    return firebase.storage().ref().child(`${this.basePath}/${fileId}`).delete();
  }
}
