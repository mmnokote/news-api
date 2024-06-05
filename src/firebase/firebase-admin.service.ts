import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { Datastore } from '@google-cloud/datastore';

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: 'mnews-46d20',
    privateKey:
      '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQColCbdKOfE12gn\n512SRYDGZszYoikuXUY7CvFfLAP53liaXYLF9XdUlq2X8WQi+gqUxZsb5eal8DRb\nujNHP+XnP6ZHSA7hdMs9mjdc2q8W7Wb2ZB7gtHOzbxVg4tps5i6xbXU/gnGsQXts\nqohTCiRitzTYccz7jZIc1Nolj+jFJ014apHu0Q6XBr8DCJDZiKch5ZzmL71kqaOQ\n4mWZxUUpqcT8RHQDy9Q9cWUO3dYzdP0IrWPNAjWT6rp3AfgIZgjxkG/Ok0qGllQ8\nunVVdXh7eGydodCufOuJ05iS+gQDlIWefQnZo2frck0D0I8vjawwl4CVXNxTE/D6\nflCMACpfAgMBAAECggEAAw/Nxy6EJxsScKKF9/hqC3mTpJS/ridSYzgihGv9X6PV\nBv1GFHpXHaLBPGCo1zd/72mAgorq9zUlEJVtKiNB0R6HZOCau3D3mSdlmN9GxIax\nAJwI6Bq6WF9e+SwTTu8GKziBI4ECbmAyFj6XOh0n5k6DPFaQNoOulWQKj/U6THpY\n9b3674+DgeNzbQ3gTkGdeQ4KvFav41kBkEikJCUX/OFGHFVk5c+ZdqVgHFAVnOF8\nDgm7w4lnmKqMQ0nW4KJuMpan0Y2eymUkQX5cEyulXiLYk1CDNwnB/a2Hyhsxhg9O\n3OteSUhzmNNbKsg9otfV1x5sdq1NSpwoX4Uo8sRZoQKBgQDmq0sW81bzcuZOI87S\noZJhBjOmbXmw93uTpEHS3U2FOdbrHriD0pl0TUFfQdVAMzMm00+wpYKfq3X4frvO\nkBcEhTSG8r0E63Fma6Vy7hzAE2NFiQ6Q+eAvcmrgJnUgdbFHqCMBtfJSvFk2yIfR\nH8lxOyip2l2QlYbQTYxgkYoDkwKBgQC7F1Yl2aTz4V7WR0mM6EdSryf90zpc21n8\nuGmLr0w2+IYiB87G0rPxtLVEfD8boZKgW7HeBNXNQlN/dHEz4D8Ls3UT852qAwJQ\nzHa++KyLiJrmF+fAWu6cQkf1lUtzkaQ96dPfkLq5t73lmFLaZxPYX1DRdHEblSyf\n0rbYRkHVhQKBgQCTyML/HUBkEQVEouRrRmEGEHce9Zy1qJlf6ijR9D8qT/hGAxSs\nQE1YmfZ8FS2PSD5JbbDst92MdsnKP0gL+30DxGP24aYAdOfeerExhSSeWs2LS1gt\nwinDvEaE/Z6lAUJnam2jNvLd1xZBZxC9BuSEyyYuTF0NuP76jfSWGiiWSQKBgFSj\n5Rxwj1ip/+6vB45Q01uL1GrXsdKqhdZ4U3+XScKgwoYIxDpcvn2+BDe8ggxtF1mm\nwhwwUc1vkTjbJA+VBtCzWmcxUoXEoLqPFbWl6OGjZnhsHjN+r+5PaiCnbyAUppo/\n+9NrtZ4piyagt/MIqQi9bmGj7TvOTAbuHDxR5JzFAoGABG82w5FxKPod+j9Fduaj\naVA1gzFqzixO0PTGPGMWlp+Afa2Idx0CeHqofHMczONghnv644K3ovJhx2uMeGnI\n4e5+Rvy9Qr1+gFJ+/96outR6yAHxWaID/uxsGfYl7yGdCF++Ww59T2BIaqE9g9bD\njJEaJTXf1dKdS4Byx2YPdqY=\n-----END PRIVATE KEY-----\n',
    clientEmail: 'firebase-adminsdk-ryfkp@mnews-46d20.iam.gserviceaccount.com',
  }),
});

// Initialize Google Cloud Datastore
const datastore = new Datastore({
  projectId: 'mnews-46d20',
  keyFilename: 'config/service-account-file.json',
});

@Injectable()
export class FirebaseAdminService {
  async sendNotification(
    token: string,
    title: string,
    body: string,
    data: any,
  ): Promise<{ message: string }> {
    const message = {
      notification: {
        title: title,
        body: body,
      },
      token: token,
      data: {
        newsImage: data.newsImage,
        newsTitle: data.newsTitle,
        newsDate: data.newsDate,
        author: data.author,
        description: data.description,
        content: data.content,
        source: data.source,
        url: data.url,
      },
    };

    try {
      await admin.messaging().send(message);
      console.log('Notification sent successfully');

      // Store the notification in Datastore
      await this.storeNotification(token, title, body);

      return { message: 'Notification sent successfully' };
    } catch (error) {
      console.error('Error sending notification:', error);
      return { message: 'Approval Status failed' };
    }
  }

  async storeNotification(
    token: string,
    title: string,
    body: string,
  ): Promise<void> {
    const notificationKey = datastore.key('Notification');

    const notification = {
      key: notificationKey,
      data: {
        token,
        title,
        body,
        timestamp: new Date(),
      },
    };

    try {
      await datastore.save(notification);
      console.log('Notification stored successfully in Datastore');
    } catch (error) {
      console.error('Error storing notification in Datastore:', error);
    }
  }
}
