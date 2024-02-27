*** Settings ***
Documentation     
Library           SeleniumLibrary

Suite Setup       Open Browser    ${URL}    chrome

*** Variables ***
${URL}             http://localhost:3000
${MainPage}        Artcrit
${loginBtn}        id=openInputBtn
${userLoginInput}  id=usernameLoginInput
${passwordLoginInput}  id=pwdLoginInput
${emailInput}         id=regiEmailInput
${email}               tester2@gmail.com
${usernameInfo}         john
${password}             !Dd12345
${submitBtn}        id=submitLoginForm
${login}             id=username
${toProfile}       id=toProfile
${usernameAtProfile}   id=profileUserName
${editProfileBtn}     id=editProfileButton
${editUserAvater}    id=editUserAvatar
${editUsername}      id=editUsername
${editUserBio}      id=editUserBio
${bio}              hello bio from automated test
${filePath}           D:\\\\Desktop\\artcrit-alpha\\artcrit-early\\public\\test3.jpg
${editProfileFormSubmitBtn}      id=editProfileFormSubmitBtn
${deleteUserBtn}            id=deleteUser
${deleteUserFinalBtn}       id=deleteUserFinal
${reClick}                 id=editProfileButton
*** Keywords ***
Check Page
   Wait Until Page Contains        ${MainPage}
Click Login
   Click Element    ${loginBtn}
Input username
   [Arguments]    ${usernameInfo}
   Input Text    ${userLoginInput}    ${usernameInfo}
Input Email 
   [Arguments]       ${email}
   Input Text    ${emailInput}        ${email}
Input password
  [Arguments]   ${password}
  Input Text    ${passwordLoginInput}    ${password}
Click submitBtn
   Click Button    ${submitBtn}
Check Login
  Wait Until Page Contains Element    ${login}
Click BtnToProfile
  Click Element    ${toProfile}
Check ProfilePage
  Wait Until Page Contains    ${usernameInfo}
Click EditProfileBtn 
  Click Button       ${editProfileBtn}
Input commentFileInput
  Choose File    ${editUserAvater}   ${filePath}
Input EditUsername
  Input Text    ${editUsername}     ${usernameInfo} 
Input EditUserBio 
  Input Text  ${editUserBio}  ${bio} 
Click EditProfileFormSubmitBtn 
   Click Button    ${editProfileFormSubmitBtn}
Check EditSuccess
   Wait Until Page Contains    ${bio}
Click DeleteUser
  Click Button    ${deleteUserBtn}
Click DeleteUserFinal 
  Click Button    ${deleteUserFinalBtn}
Click ReClickEditBtn
  Click Button    ${reClick}

*** Test Cases ***
CreateComment
   [Documentation]
   Check Page
   Click Login
   Input Email      ${email}
   Input password       ${password}
   Click submitBtn
   Check Login
   Click BtnToProfile
   Check ProfilePage
   Click EditProfileBtn 
   Input commentFileInput
   Input EditUsername
   Input EditUserBio 
   Click EditProfileFormSubmitBtn 
   Check EditSuccess
DeleteUser
   [Documentation]
   Check Page
   Click Login
   Input Email      ${email}
   Input password       ${password}
   Click submitBtn
   Check Login
   Click BtnToProfile
   Click ReClickEditBtn
   Click DeleteUser
   Click DeleteUserFinal 