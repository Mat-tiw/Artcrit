*** Settings ***
Documentation     
Library           SeleniumLibrary

Suite Setup       Open Browser    ${URL}    chrome

*** Variables ***
${URL}             http://localhost:3000
${MainPage}        Artcrit
${RegiBtn}         id=openRegiBtn
${RegiUsernameInput}    id=usernameRegiInput
${RegipwdInput}         id=pwdRegiInput
${RegiConfirmpwdInput}  id=confirmpwdRegiInput
${usernameInfo}         john
${password}             !Dd12345


*** Keywords ***
Check Page
   Wait Until Page Contains        ${MainPage}
Click Register
   Click Element    ${RegiBtn}
Input username
   [Arguments]    ${usernameInfo}
   Input Text    ${RegiUsernameInput}    ${usernameInfo}
Input password
  [Arguments]   ${password}
  Input Text    ${RegipwdInput}    ${password}
Input confirmPassword
  [Arguments]   ${password}
  Input Text    ${RegiConfirmpwdInput}   ${password}

*** Test Cases ***
Register
   [Documentation]
   Check Page
   Click Register
   Input username       ${usernameInfo}
   Input password       ${password}
   Input confirmPassword    ${password}
