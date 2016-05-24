import * as AESjson from 'aes_json'


var pencrypted = (iv, salt, cipher) => {
    encryptedout.value = AESjson.implode(iv, salt, cipher);
    inputencrypted.value = encryptedout.value;
};

var pdecrypted = function(textBuffer){
    dataout.value = new TextDecoder("utf-8").decode(textBuffer);
};

encryptbutton.onclick = function(){
  var iv = AESjson.randchars(16), salt = AESjson.randchars(50);
  
  AESjson.importkey(password.value)
  .then(AESjson.derivekey.bind(this, salt))
  .then(AESjson.encrypt.bind(this, inputdata.value, iv))
  .then(pencrypted.bind(this, iv, salt));
};

decryptbutton.onclick = function(){
  var pack = AESjson.explode(inputencrypted.value),
      salt = pack.salt,
      iv = pack.iv;
  AESjson.importkey(password.value)
  .then(AESjson.derivekey.bind(this, salt))
  .then(AESjson.decrypt.bind(this, pack.ciphertext, iv))
  .then(pdecrypted);
};

