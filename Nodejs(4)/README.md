Node.js는 REST를 **Express 라는 웹 프레임워크**를 통해 구현합니다

## 1. 설치 방법

[참고자료](https://expressjs.com/ko/starter/installing.html)

```shell
npm i express
```

애플리케이션을 보관한 디렉토리로 이동한 다음 위 명령어를 실행합니다.



## 2. REST란?

[참고자료1](https://medium.com/@hckcksrl/rest%EB%9E%80-c602c3324196) [참고자료2](https://gmlwjd9405.github.io/2018/09/21/rest-and-restful.html) [참고자료3](https://meetup.toast.com/posts/92) [참고자료4](https://velog.io/@kjh107704/REST-%EC%84%9C%EB%B2%84-REST-API%EB%9E%80) 

HTTP URL을 통해 자원을 구분, 명시하고 HTTP Method(POST, GET, DELETE, PUT)을 통해 자원에 대한 행동(CRUD)을 적용하는 것을 의미한다

### 2.1 REST의 제한 조건

REST는 아래의 6가지 조건을 만족하게 구현해야 한다

1. **클라이언트 / 서버 구조 (Client-Server)**
   자원이 있는 Server , 자원을 요청하는 Client의 구조를 가진다.
2. **무상태 (Stateless)**
   각 요청 간 클라이언트의 콘텍스트가 서버에 저장하지 않는다
3. **캐시 처리 가능 (Cachealble)**
   표준 HTTP 프로토콜을 그대로 사용하므로 , 웹에서 사용하는 기존의 인프라를 그대로 활용 가능하다.
4. **계층화**
   API 서버는 순수 비즈니스 로직을 수행하고 그 앞단에 공유 캐시 기능, 로드밸런싱 등을 하는 계층을 추가하여 시스템 규모를 확장시키기 유용하다
5. **인터페이스 일관성(Uniform Interface)**
   아키텍처를 단순화시키고 작은 단위로 분리(decouple)함으로써 클라이언트-서버의 각 파트가 독립적으로 개선될 수 있도록 해준다
6. **자체 표현 구조**
   동사(Method) + 명사(URI) 로 이루어져있어 어떤 메서드에 무슨 행위를 하는지 알 수 있으며 REST API 자체가 매우 쉬워서 API 메세지 자체만 보고도 API를 이해할 수 있다



### 2.2 REST 설계 가이드

위에 항목을 다 지키지 못한다고 하더라도 반드시 지켜야할것이 있습니다

1. URI은 정보의 자원을 표현해야 한다

   1. 메시지는 자신을 어떻게 처리해야 하는지에 대한 충분한 정보를 포함해야 한다
   2. 메시지를 이해하기 위해 그 내용까지 살펴봐야 한다면, 그 메시지는 자기서술적이 아니다

2. 자원에 대한 행위는 HTTP Method(GET, POST, PUT, DELETE)로 표현한다

   1. REST는 HTTP 기반이므로 위의 Method를 사용한다

   2. 데이터를 지워야 하지만 Method를 POST를 사용하면 안된다. - 용도에 맞는 Method사용

      | Method | Action |
      | ------ | ------ |
      | POST   | Create |
      | GET    | Read   |
      | PUT    | Update |
      | Delete | Delete |

   

## 3. 실습

Node.js는 REST를 구현하기 위해 **Express**라는 웹 프레임워크를 사용합니다

### 3.1 설치

```
npm i express
```

설치하기전 애플리케이션을 구축할 디렉토리로 이동합니다.

npm를 통해 설치합니다. - [참고자료](https://expressjs.com/ko/starter/installing.html)

### 3.2 코드

* Rest.js

  * ```javascript
    const express = require('express')
    const app = express()
    const port = 3000
    
    app.get('/', (req, res) => {
        res.send('get response')
    })
    
    app.get('/test', (req, res) => {
        res.send('get test response')
    })
    
    app.get('/json', (req, res) => {
        test_json = JSON.stringify({"test":"Test Data"})
        res.send(test_json)
    })
    
    app.post('/', (req, res) => {
        res.send('post response')
    })
    
    app.delete('/', (req, res) => {
        res.send('delete response')
    })
    
    app.put('/', (req, res) => {
        res.send('put response')
    })
    
    
    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`)
    })
    ```

    **app은 서버를 시작**하며 3000번 포트로 연결합니다.

    **app.Method**를 통해 각 **Method(GET, POST, DELETE, PUT)**을 구분합니다

    **app.Method(PATH, (req, res))** 의 **Path를 통해 각 자원을 구분**합니다

    * app.get**('/',** (req, res))는 **URI(http://localhost:3000/)로 요청**을 의미합니다(이하 Domain을 생략합니다)
    * app.get(**'/test'**,(res, req)) 는 **/test로 요청**을 의미합니다
      * **결과**

    ![01](D:\Node.js Study\Nodejs(4)\01.PNG)

    POST, PUT, DELETE의 결과는 브라우저로 확인하기 어렵워 **POSTMAN**이라는 API 테스트 도구를 통해 확인했습니다. [참고자료](https://meetup.toast.com/posts/107)

    ![2](D:\Node.js Study\Nodejs(4)\img\2.PNG)

    결과에서 보이는것 처럼 HTTP Method에 따라서 다른 값이 넘어오는것을 확인할 수 있습니다.

    비록 지금은 매우 간단한 문장과 json을 보냈지만 당연히 HTML을 보낼 수도 있고 많은 양의 json을 보낼 수 있습니다

    그렇다면 이 API를 활용해 어떻게 동적페이지를 만들까요?

    브라우저에서는 서버에서 보내온 데이터를 페이지의 내용중 해당하는 부분을 갈아끼위 새로 그리게 되는데 이 기법을 이전에 설명한 Ajax라고 부릅니다



## 4. 마치며

지금까지 아주 간단한 Rest API를 작성해봤습니다. 이제 REST를 통해 간단하게 API를 작성해 동적페이지를 구축할 준비가 되었습니다. 다음엔 Ajax를 통해 받아온 데이터를 브라우저에서 어떻게 처리해야 하는지 알아보겠습니다.