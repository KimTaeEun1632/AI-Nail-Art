![header](https://capsule-render.vercel.app/api?type=waving&color=auto&height=300&section=header&text=NailArtX&fontSize=80)


# NailArtX
> 개인프로젝트 <br>
> 개발기간: 2025.03 ~ 진행중

# 프로젝트 소개 
네일아트 디자인을 찾는데 오랜 시간을 허비하는 사용자들을 위한 Stable Diffusion 기반 AI네이아트 디자인 생성, 관리 웹 입니다. <br>
주변 네일아트를 배우는 사람들을 관찰하고 디자인을 구상하는데 오랜시간이 걸린다는 것을 발견했고, AI를 활용해 '네일아트 디자인을 전문적으로 생성해주는 웹 서비스가 있으면 어떨까?' 라는 생각에서 시작된 프로젝트 입니다. 

# 시작 가이드

### 1. 저장소 클론
```bash
git clone https://github.com/KimTaeEun1632/AI-Nail-Art.git
cd AI-Nail-Art
```

### 2.Node.js 버전 설정 (nvm 사용 시)
```bash
nvm use 20.12.1
```

### 3. 의존성 설치 및 실행
```bash
npm install
npm run dev
```
---
# 📚 STACKS
<p>
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=Next.js&logoColor=white">
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
  <img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=TailwindCSS&logoColor=black">
  <img src="https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white">
  <img src="https://img.shields.io/badge/Auth.js-6A1B9A?style=for-the-badge&logo=javascript&logoColor=white">
  <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white">
</p>

## 🔎 미리보기

| 메인 페이지 | 로그인 페이지 | 이미지 생성 (1) |
|-------------|--------------|----------------|
| ![메인 페이지](https://github.com/user-attachments/assets/1e570512-6e4f-431f-bce5-aa9f5692ab8d) | ![로그인 페이지](https://github.com/user-attachments/assets/1a9280f7-aa4a-4e15-9137-f292b888dbcf) | ![이미지 생성 1](https://github.com/user-attachments/assets/662482a6-ea7b-46db-8338-7c051ce622cf) |

| 이미지 생성 (2) | 내 라이브러리 |
|----------------|-------------|
| ![이미지 생성 2](https://github.com/user-attachments/assets/086593bd-5779-4f45-92e4-09203a267b94) | ![내 라이브러리](https://github.com/user-attachments/assets/81aea019-5e80-40f9-bf7d-ab6bd9f815cc) |

> **Tip**  
> 클릭하면 원본 크기로 크게 볼 수 있어요!  


- **프로젝트 내용**
  - 사용자는 로그인 하고 이미지를 생성할 수 있습니다。
  - 프롬프트에 맞춰 4개의 네일아트 이미지를 생성해 줍니다.
  - 생성된 이미지는 4개의 그리드 이미지로 생성되고 이미지 클릭시 캐러샐 모드로 변경되면서 1개을 집중해서 볼 수 있습니다.
  - 생성된 이미지는 내 라이브러리에서 생성 날짜별로 확인 할 수 있습니다. 
  - 라이브러리에서 이미지 호버시 북마크, 클립보드 복사, 다운로드, 삭제 할 수 있습니다.

 - **주요기능**

**⭐️캐러샐**

![Image](https://github.com/user-attachments/assets/ca334485-665e-4a11-9bd7-ddadbb5a1147)

**⭐️북마크, 복사, 다운로드, 삭제 버튼**

![Image](https://github.com/user-attachments/assets/ec96d850-9c9b-406a-a221-c04f2b3333f4)

# 파일 구조
```
src
 ┣ apis
 ┃ ┣ auth
 ┃ ┃ ┗ auth.jsx
 ┃ ┣ image
 ┃ ┃ ┗ generate.jsx
 ┃ ┗ apis.jsx
 ┣ assets
 ┃ ┗ images
 ┣ components
 ┃ ┣ Common
 ┃ ┣ CreatePage
 ┃ ┣ Layout
 ┃ ┣ MyLibraryPage
 ┃ ┗ Nav
 ┣ constants
 ┃ ┗ user.jsx : 회원가입, 로그인 input validate 정리
 ┣ lib
 ┃ ┣ HoverActionContext.jsx : 이미지 호버시 복사, 북마크, 다운로드, 삭제 로직 정리
 ┃ ┗ ImagesContext.jsx : 이미지 업데이트, 동기화를 위한 context
 ┣ pages
 ┃ ┣ api
 ┃ ┃ ┗ auth
 ┃ ┃ ┃ ┗ [...nextauth].jsx : Auth.js 로직
 ┃ ┣ auth
 ┃ ┃ ┣ signIn.jsx
 ┃ ┃ ┗ signUp.jsx
 ┃ ┣ create-image
 ┃ ┃ ┗ index.jsx : 이미지 생성 페이지(로그인 되어 있을시 자동이동)
 ┃ ┣ my-library
 ┃ ┃ ┗ index.jsx
 ┃ ┣ index.jsx : 메인페이지(로그인 안되어 있을시 보여줌)
 ┃ ┣ _app.jsx
 ┃ ┗ _document.js
 ┗ styles
 ┃ ┗ globals.css
 ```

# 결과 및 성과
프로젝트를 기획 과정에서 '사람들은 어떤 서비스를 찾을까?', '어떤 서비스를 필요로 할까?'라는 생각에서 시작되어 이 프로젝트를 기획하게 되었습니다. 결과적으로 사용자들의 간단한 프롬프트 입력만으로 AI가 자동으로 네일아트 디자인을 생성해 주는 웹 서비스를 만들수 있었습니다. <br>

개발과정에서 이미지 라이브러리 진입 구간에 SSR을 적용해 초기 렌더링을 개선하였고, Tanstack Query의 캐싱, api 호출을 통해 불필요한 api 호출 감소하였으며 낙관적 업데이트를 통해 UX 향상 과정을 통해 Next.js SSR과 Tanstack Query의 이해도를 향상 시킬 수 있었습니다. 또한, python을 활용해 api를 직접 설계하는 과정에서 초기 api 설계가 프로젝트 전체 개발 안전성과 효율성에 미치는 영향을 체감하였습니다.

# 향후 계획
아직 부족한 부분이 많은 미완성으로 향후 page router -> app router로 개선, 구글 로그인 추가,  Stable Diffusion -> 구글 나노바나나 API로 전환 하여 성능을 개선할 것입니다.
