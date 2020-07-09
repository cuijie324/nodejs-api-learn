#!/bin/bash

DAYS_VALID=3650 # key有效期
PASSWORD=cha123 # 密码
PASSWOD_OPTION="-storepass $PASSWORD -keypass $PASSWORD"

#keystore
CA_STORE="ca.keystore.jks"
SERVER_STORE="server.keystore.jks"
CLIENT_STORE="client.keystore.jks"

SERVER_TRUST="server.truststore.jks"
CLIENT_TRUST="client.truststore.jks"

#别名
CA_ALIAS="ca"
SERVER_ALIAS="server"
CLIENT_ALIAS="client"

#dn
CA_DNAME="CN=chatu,OU=it,O=chatu,L=guangzhou,ST=guangdong,C=CN"
SERVER_DNAME="CN=server,OU=it,O=chatu,L=guangzhou,ST=guangdong,C=CN"
CLIENT_DNAME="CN=client,OU=it,O=chatu,L=guangzhou,ST=guangdong,C=CN"

SERVER_EXT="san=dns:localhost"
CSR_FILE="tmp.csr"
CA_CRT="ca.pem"
SERVER_CRT="server.pem"
CLIENT_CRT="client.pem"

##############################################################################

echo "创建ca、server、client密钥对，keytool会自动生成一个自签名的证书"
keytool -genkeypair -keystore $CA_STORE -alias $CA_ALIAS -dname $CA_DNAME -validity $DAYS_VALID -keyalg RSA $PASSWOD_OPTION
keytool -genkeypair -keystore $SERVER_STORE -alias $SERVER_ALIAS -dname $SERVER_DNAME -validity $DAYS_VALID -keyalg RSA $PASSWOD_OPTION
keytool -genkeypair -keystore $CLIENT_STORE -alias $CLIENT_ALIAS -dname $CLIENT_DNAME -validity $DAYS_VALID -keyalg RSA $PASSWOD_OPTION

echo "导出根证书，导入到客户端和服务端的keystore"
keytool -export -keystore $CA_STORE -alias $CA_ALIAS -file $CA_CRT -rfc $PASSWOD_OPTION
keytool -import -keystore $SERVER_STORE -alias $CA_ALIAS -file $CA_CRT -noprompt $PASSWOD_OPTION
keytool -import -keystore $CLIENT_STORE -alias $CA_ALIAS -file $CA_CRT -noprompt $PASSWOD_OPTION

echo "服务端证书签名"
keytool -certreq -keystore $SERVER_STORE -alias $SERVER_ALIAS -file $CSR_FILE $PASSWOD_OPTION
keytool -gencert -keystore $CA_STORE -alias $CA_ALIAS  -infile $CSR_FILE -outfile $SERVER_CRT -rfc -ext $SERVER_EXT $PASSWOD_OPTION
keytool -import -keystore $SERVER_STORE -alias $SERVER_ALIAS -file $SERVER_CRT $PASSWOD_OPTION

echo "删除证书签名请求文件"
rm -rf $CSR_FILE

echo "客户端证书签名"
keytool -certreq -keystore $CLIENT_STORE -alias $CLIENT_ALIAS -file $CSR_FILE $PASSWOD_OPTION
keytool -gencert -keystore $CA_STORE -alias $CA_ALIAS  -infile $CSR_FILE -outfile $CLIENT_CRT -rfc $PASSWOD_OPTION
keytool -import -keystore $CLIENT_STORE -alias $CLIENT_ALIAS -file $CLIENT_CRT $PASSWOD_OPTION

echo "删除证书签名请求文件"
rm -rf $CSR_FILE

echo "ca证书导入客户端和服务端的truststore"
keytool -import -keystore $SERVER_TRUST -alias $CA_ALIAS -file $CA_CRT -noprompt $PASSWOD_OPTION
keytool -import -keystore $CLIENT_TRUST -alias $CA_ALIAS -file $CA_CRT -noprompt $PASSWOD_OPTION

echo "生成完成"

# keytool -keystore server.keystore.jks -alias ca1 -gencert -ext san=dns:localhost -infile ca2.csr -outfile ca2.pem -rfc -storepass test1234 -keypass test1234

# #Step 1 kafka server keypair
# keytool -keystore server.keystore.jks -alias localhost -validity 365 -keyalg RSA -genkey

# #Step 2 CA
# openssl req -new -x509 -keyout ca-key -out ca-cert -days 365
# keytool -keystore server.truststore.jks -alias CARoot -import -file ca-cert
# keytool -keystore client.truststore.jks -alias CARoot -import -file ca-cert

# #Step 3 sign server certificate
# keytool -keystore server.keystore.jks -alias localhost -certreq -file cert-file
# openssl x509 -req -CA ca-cert -CAkey ca-key -in cert-file -out cert-signed -days 365 -CAcreateserial -passin pass:test1234

# keytool -keystore server.keystore.jks -alias CARoot -import -file ca-cert
# keytool -keystore server.keystore.jks -alias localhost -import -file cert-signed
