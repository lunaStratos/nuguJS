
## NUGU JS ##
***

SK NUGU의 json을 더욱 쉽게 구현하기 위해서 만든 npm입니다.
본 npm의 특징은 다음과 같습니다.

* json을 만들 필요가 없음
* 값을 넣으면 자동으로 response에 넣어서 보내짐
* 텍스트와 음악지원

## 버전관리 ##

* 0.1 : 최초 버전
* 0.2.2 : 부수적인 기능 추가

## 사용방법 ##

우선 request로 npm을 부릅니다.

    const nuguApp = require('nugujs');

그리고 나서

    const nugu = nuguApp(req, res);

response 값을 올리고 나면 사용이 가능합니다.

### parameter의 value를 1개만 얻을때 ###

	const value1 = nugu.get("parameterName")

키 이름으로 지정된 "parameterName"의 Value가 나옵니다. 만약 값이 없다면 undefined가 나옵니다.

### parameter와 value를 전체 다 얻을때 ###

	const values = nugu.getAll()
	//return {key1: value, key2: value, key3: value ... }
이 경우 JSON으로 return 값이 나옵니다.

### accessToken을 얻을때 ###

const accessToken = nugu.token()
이 경우 JSON으로 return 값이 나옵니다.

### parameter가 하나인 텍스트 보낼때 ###

	let output = {}
	let value1 = "The Quick Brown Fox Jumps Over The Lazy Dog"
	output.value1 = value1
	nugu.say(output);

***
### parameter가 여러개일때 ###
만약 parameter가 여러개라면 다음과 같이 만듭니다.

    let output = {}
    let value1 = "Day before yesterday I saw a rabbit, and yesterday a deer,"
    let value2 = "and today, you"
    output.value1 = value1
    output.value2 = value2
    nugu.say(output);

***


### Express 엔진에서 사용방법 ###

    const express = require('express')
    const nuguApp = require('nugujs');
    const nugu = nuguApp(req, res);

    const app = express()
    let output = {}

    app.get('/textSay',  (req, res) => {
      const nugu = nuguApp(req, res);
      let value1 = "Day before yesterday I saw a rabbit, and yesterday a deer,"
      let value2 = "and today, you"
      output.value1 = value1
      output.value2 = value2
      nugu.say(output);
    })

    app.get('/ssmlSay',  (req, res) => {
    const nugu = nuguApp(req, res);

    })

    app.listen(3000)

## 문의사항 ##

Dev.LunaStratos@gmail.com 으로 메일 보내주시면 됩니다.
