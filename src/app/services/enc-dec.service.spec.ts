import { TestBed } from '@angular/core/testing';
import { AES,enc,mode,pad } from 'crypto-ts';
import { BufferedBlockAlgorithmConfig } from 'crypto-ts/src/lib/BufferedBlockAlgorithmConfig';
import { EncDecService } from './enc-dec.service';

describe('EncDecService', () => {
  let service: EncDecService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EncDecService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should return encypted data when the set method is called with a string parameter', ()=>{
    let cyphertext = service.set("please encrypt me");
    expect(cyphertext).toBeTruthy();
  });
  it('should be able to encrypt and decrypt values correctly when using the default config', ()=>{
    let data = "data I want to encrypt";
    let cyphertext = service.set(data);
    let plaintext = service.get(cyphertext);
    expect(plaintext).toBe(data);
  });
  it('should allow you to pass in algorithm config when encrypting and decrypting and return correct value',()=>{
    let data = "data I want to encrypt right now.";
    let config:BufferedBlockAlgorithmConfig = {
      blockSize: 128/8,
      iv:enc.Utf8.parse("Whatever IV I want to use"),
      mode:mode.CBC,
      padding: pad.PKCS7
    };
    let cyphertext = service.set(data,config);
    let plaintext = service.get(cyphertext, config);
    expect(plaintext).toBe(data);
  });
  it('should return different value when two different algorithm configs are used to encrypt and decrypt',()=>{
    let data = "data I want to encrypt right now.";
    let config:BufferedBlockAlgorithmConfig = {
      blockSize: 128/8,
      iv:enc.Utf8.parse("Whatever IV I want to use"),
      mode:mode.CBC,
      padding: pad.PKCS7
    };
    let cyphertext = service.set(data,config);
    let plaintext = service.get(cyphertext);
    expect(plaintext).not.toBe(data);
  });
  it('should encrypt and encode value passed to the encryptAndEncode function even if the value is an object', ()=>{
    let data = {make: "merry", year: "today"};
    let encodedCypher = service.encryptAndEncode(data);
    expect(encodedCypher).toBeTruthy();
  });
  it('should decode and decrypt value passed to the decodeAndDecrypt function', ()=>{
    let encodedCypher = 'dWhzb1ZsV3ZEOHZjQWs5NDRRWmc1Q0o1WldGeUlqb2lkRzlrWVhraWZTRWhJU0VoSVNFaElTRWhJU0VoSVNFaElTRWhJU0VoSVNFaElTRWhJU0VoSVE9PQ==';
    let plaintext = service.decodeAndDecrypt(encodedCypher);
    expect(plaintext).toBeTruthy();
  });

});
