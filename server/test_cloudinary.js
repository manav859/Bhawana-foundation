import { v2 as cloudinary } from 'cloudinary';
import { env } from './src/config/env.js';

const cloud_name = 'dfyww7kyk';
const api_key = '243963541371532';
const api_secret = 'HVECzsjMJP213wLgRgCcMH0s_Lw';



cloudinary.config({ cloud_name, api_key, api_secret });

cloudinary.uploader.upload('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=')
  .then(res => console.log('Upload success:', res))
  .catch(err => console.error('Upload failed:', err.message || err));
