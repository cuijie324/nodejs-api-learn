var chilkat = require('chilkat_node10_macosx');
const fs = require('fs');

var glob = new chilkat.Global();
var success = glob.UnlockBundle("Anything for 30-day trial");
if (success !== true) {
    console.log(glob.LastErrorText);
    return;
}

//  The LastErrorText can be examined in the success case to see if it was unlocked in
//  trial more, or with a purchased unlock code.
// console.log(glob.LastErrorText);

chilkatExample();

function chilkatExample () {

    //  This requires the Chilkat API to have been previously unlocked.
    //  See Global Unlock Sample for sample code.

    var jks = new chilkat.JavaKeyStore();

    //  Load the Java keystore from a file.  The JKS file password is used
    //  to verify the keyed digest that is found at the very end of the keystore.
    //  It verifies there has been no tampering with the file.
    var success = jks.LoadFile('test1234', __dirname + '/server.keystore.jks');
    if (success !== true) {
        console.log(jks.LastErrorText);
        return;
    }

    //  Find out how many of each type of entry:
    var numTrustedCerts = jks.NumTrustedCerts;
    var numPrivateKeys = jks.NumPrivateKeys;

    // cert: Cert
    var cert;
    var alias;

    var i;

    //  For each trusted certificate, access it by getting
    //  it as a cert object.  Also get the alias associated with the certificate.
    console.log("Trusted Certs:");
    i = 0;
    while (i < numTrustedCerts) {
        cert = jks.GetTrustedCert(i);
        console.log(jks.GetTrustedCertAlias(i) + ": " + cert.SubjectDN);

        i = i + 1;
    }

    // privKey: PrivateKey
    var privKey;
    // certChain: CertChain
    var certChain;

    //  For each private key entry, get the private key and
    //  the associated certificate chain.
    //  Each private key is password protected.  Usually it is the same
    //  password as used for the keyed digest of the entire JKS.
    //  However, this does not have to be.  The password is passed
    //  here to handle the possibility of each private key requiring
    //  a different password.
    console.log("Private Keys:>>>>>>>>>>>>>>>>>>>>>>");
    i = 0;
    while (i < numPrivateKeys) {
        privKey = jks.GetPrivateKey("test1234", i);
        console.log(jks.GetPrivateKeyAlias(i));
        certChain = jks.GetCertChain(i);
        if (jks.GetPrivateKeyAlias(i) === 'ca2') {
            // console.log(privKey);
            // let str = privKey.GetPkcs1Pem();//未加密的私钥?
            let str = privKey.GetPkcs8EncryptedPem('test1234');//获取加密后的私钥
            console.log(str);
            fs.writeFile('private.pem', str, console.log);
        }

        //  The 1st certificate in the chain is the one associated with the private key.
        cert = certChain.GetCert(0);
        console.log(cert.SubjectDN);
        i = i + 1;
    }
}
