import { Injectable } from '@angular/core';
import { AES,enc,mode,pad } from 'crypto-ts';
import { BufferedBlockAlgorithmConfig } from 'crypto-ts/src/lib/BufferedBlockAlgorithmConfig';
import { environment } from 'src/environments/environments';
@Injectable({
  providedIn: 'root'
})
export class EncDecService {

  constructor() { }

  ivStr = environment.ivString;

  /**
   * @description Sets the defaultAlgorithm for this instance of the decryptionService.
   */
  set DefaultAESAlgorithmConfig(algorithmConfig: BufferedBlockAlgorithmConfig){
    this.defaultAESAlgorithmConfig = algorithmConfig;
  }

  private defaultAESAlgorithmConfig:BufferedBlockAlgorithmConfig = {
    blockSize: 128/8,
    iv:enc.Utf8.parse(this.ivStr),
    mode:mode.CBC,
    padding: pad.PKCS7
  }

  /**
   * @description Encrypts a value passed in using the AES encryption Algorithm.
   * @param value value to be encrypted
   * @param algorithmConfig configuration for the algorithmn
   * @returns cyphertext.
   */
  set(value:string, algorithmConfig?: BufferedBlockAlgorithmConfig){
    let key = enc.Utf8.parse(environment.secretKey);
    algorithmConfig = algorithmConfig || this.defaultAESAlgorithmConfig;    
    let encrypted = AES.encrypt(enc.Utf8.parse(value), key, algorithmConfig);

    return encrypted.toString();
  }

    /**
     * @description Decrypts a cyphertext passed in using the AES encryption Algorithm.
     * @param cyphertext cyphertext to be encrypted
     * @param algorithmConfig configuration for the algorithm 
     * @returns cyphertext.
     */
  get(cyphertext: string, algorithmConfig?: BufferedBlockAlgorithmConfig)
  {
    let key = enc.Utf8.parse(environment.secretKey);
    // if user passes algorithm config then we will use it, if not then use the default.
    algorithmConfig = algorithmConfig || this.defaultAESAlgorithmConfig;

    try{
      let bytes  = AES.decrypt(cyphertext.toString(), key, algorithmConfig);
      let plaintext = bytes.toString(enc.Utf8);
      return plaintext;
    }catch(e:any){
      console.log(e);
    }
    return null;
  }
  /**
   * @description Encrypts a value passed then encode value to base64.
   * @param value Value can be any data type. It will be stringified and encrypted
   * @returns `null` if unable to encrypt and `encoded` cypher text if encryption was successful
   */
  encryptAndEncode(value:any){
    if(typeof value != 'string'){
      value = JSON.stringify(value);
    }
    let cyphertext = this.set(value);
    if(!cyphertext){
      return null;
    }
    return btoa(cyphertext);
  }

  /**
   * @description Decodes and decrypt a value.
   * @param encodedCypher Value to be decoded and decrypted.
   * @returns `null` if unable to decrypt and `plaintext` if successfulu
   */
  decodeAndDecrypt(encodedCypher:string){
    let cyphertext = atob(encodedCypher);
    let plaintext = this.get(cyphertext);
    return plaintext;
  }

  
}
