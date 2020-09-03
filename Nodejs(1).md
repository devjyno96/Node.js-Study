# Node.js Study

전체적인 진행은 **생활코딩 Node.js**를 참고했습니다

https://opentutorials.org/module/3549

## 1. Node.js 란?

https://velopert.com/133

https://poiemaweb.com/nodejs-basics

* __Node.js는 웹서버가 아닙니다.__
* **비동기 이벤트 기반 Javascript 런타임**

* Node.js는 **브라우저 밖에서 Javascript 코드를 실행** 할 수 있게 해주는 런타임 환경

* **서버 사이드 애플리케이션** 개발에 사용되는 플렛폼



### 1.1 Node.js의 특징

https://junspapa-itdev.tistory.com/3

* 비동기 이벤트
  * 비동기가 뭐죠? - https://nesoy.github.io/articles/2017-01/Synchronized

* 자바스크립트의 문법 사용
* Non-blocking I/O와 단일 쓰레드 이벤트 루프를 통한 높은 처리성능

* npm(node package manager)통한 다양한 모튤(패키지)제공

  #### Node.js 가 어울리는 웹서비스

  * 간단한 로직. 
  * 대용량(동시에 여러 request를 처리)
  * 빠른 응답시간 요구
  * 빠른 개발 요구
  * 비동기방식에 어울리는 서비스(네트워크 스트리밍 서비스, 채팅 서비스 등)

  #### Node.js 가 어울리지 않는 웹서비스

  * 단일 처리가 오래 걸리는 경우 : 싱글 쓰레드이기 때문
  * 서버 체크로직이 많은 경우 : 비동기방식이기 때문에 CallBack Hell에 빠지지 않기 위해
  * 업무 복잡도/난이도가 높은 경우 : 에러가 나면 서버가 죽기 때문에 코드 품질 중요



## 2. 설치

저는 **WSL(리눅스용 윈도우 하위 시스템)의 우분투20.04LTS**를 사용했습니다

https://docs.microsoft.com/ko-kr/windows/wsl/install-win10



* terminal에 다음 문장을 입력합니다(**Ubuntu 기준**)

  https://nodejs.org/ko/download/package-manager/

```shell
sudo apt install nodejs
```

* 실행 결과

![001](C:\Users\HAI-NLP\Desktop\node.js (1)\001.PNG)



## 3. 간단한 Node.js 실행

간단한 js를 작성해줍니다.

* helloworld.js

```javascript
console.log(1+1);
```

* 실행결과

```shell
node helloworld.js
```

![002](C:\Users\HAI-NLP\Desktop\node.js (1)\002.PNG)



* index.html

```html
<h1>hello Node.js!</h1>
```

* main.js

```javascript
var http = require('http');
var fs = require('fs');
var app = http.createServer(function(request,response){
    var url = request.url;
    if(request.url == '/'){
      url = '/index.html';
    }
    if(request.url == '/favicon.ico'){
        response.writeHead(404);
        response.end();
        return;
    }
    response.writeHead(200);
    response.end(fs.readFileSync(__dirname + url));
 
});
app.listen(3000);
```

​	**app.listen(N);**

​	N안에 정수는 **포트번호**를 지정한다



* 실행결과

```shell
node main.js
```

![003](C:\Users\HAI-NLP\Desktop\node.js (1)\003.PNG)

​	실행 후 브라우저의 **localhost:3000**  을  입력해 http 서버 통신을 요청 할 수 있다

![004](C:\Users\HAI-NLP\Desktop\node.js (1)\004.PNG)

​	**index.html**의 내용이 출력되는것을 확인 할 수 있다



## 4. 마치며



​	지금까지 Node.js의 기본적인 성질과 아주 간단한 서버를 구축해 보았습니다.

​	기본적인 문법이 위에서 설명했듯이 Javascripts로 이루어져 있어 Node.js를 공부하기 전에

​	Javasctipts 공부가 선행되어있어야 할것입니다.

​	다음엔 쿼리 스트링에 대해 알아보겠습니다.

