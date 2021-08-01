# 테스트
1. mysql 서버가 실행되고 있어야합니다.
2. mysql 아이디 비번은 root, 1234로 통일해주세요
3. mysql안에 metaclass 라는 db가 있어야합니다.
4. java8버전이 설치 되어 있어야 합니다.

# 빌드
1. project root에서 ./gradlew build 를 입력합니다.
   1. 만약 빌드 성공시 BUILD SUCCESS! 라는 메세지가 나타납니다.
2. 빌드 결과물은 rootProject/build/libs/에 있습니다.
3. java -jar ./해당jar파일 이름 
4. 이렇게 한다면 리액트랑 연동되어 보여집니다.