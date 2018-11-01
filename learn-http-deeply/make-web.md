# Web 应用

## CGI 程序

* web 服务器接收请求，转发给 CGI 程序
* 每次都要启动一个程序

## Servlet

* Servlet 的运行环境叫做 Web 容器或 Servlet 容器 
* Servlet 常驻内存，比 CGI 更轻量

## 数据格式

### XML | Extensible Markup Language | 可标记拓展语言

```xml
  <saml:AttributeStatement>
     <saml:Attribute
       xmlns:x500="urn:oasis:names:tc:SAML:2.0:profiles:attribute:X500"
       x500:Encoding="LDAP"
       NameFormat="urn:oasis:names:tc:SAML:2.0:attrname-format:uri"
       Name="urn:oid:1.3.6.1.4.1.5923.1.1.1.1"
       FriendlyName="eduPersonAffiliation">
       <saml:AttributeValue
         xsi:type="xs:string">member</saml:AttributeValue>
       <saml:AttributeValue
         xsi:type="xs:string">staff</saml:AttributeValue>
     </saml:Attribute>
   </saml:AttributeStatement>
```

### RSS/Atom | 用于发布更新信息

* 两者都利用到了 xml

### JSON | 依据 javascript 

```json
  "saml:AuthnStatement": {
      "-AuthnInstant": "2004-12-05T09:22:00Z",
      "-SessionIndex": "b07b804c-7c29-ea16-7300-4f3d6f7928ac",
      "saml:AuthnContext": {
        "saml:AuthnContextClassRef": "
         urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport
       "
      }
    }
```