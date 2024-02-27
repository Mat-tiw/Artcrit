*** Settings ***
Documentation     
Library           SeleniumLibrary

Suite Setup       Open Browser    ${URL}    chrome

*** Variables ***
${URL}             http://localhost:3000
${MainPage}        Artcrit
${loginBtn}        id=openInputBtn
${passwordLoginInput}  id=pwdLoginInput
${password}             !Dd12345
${submitBtn}        id=submitLoginForm
${login}             id=username
${commentBtn}        id=toComment
${commentInput}     id=comment-content
${commentText}       hello this's from robot automated testing
${commentFileInput}           id=commentFileInput
${filePath}           D:\\\\Desktop\\artcrit-alpha\\artcrit-early\\public\\test3.jpg
${refToInput}         id=refToInput
${commentSubmit}    id=commentSubmit
${emailInput}         id=regiEmailInput
${email}               tester2@gmail.com
*** Keywords ***
Check Page
   Wait Until Page Contains        ${MainPage}
Click Login
   Click Element    ${loginBtn}
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
Click CommentBtn 
  Click Element    ${commentBtn}
Check CommentInput 
  Wait Until Element Is Visible    ${commentInput}
Click CommentInput 
  Click Element    ${refToInput} 
Input commentTitle
  [Arguments]  ${commentText}
  Input Text    ${commentInput}   ${commentText}
Input commentFileInput
  Choose File    ${commentFileInput}   ${filePath}
Click commentSubmit
  Click Element    ${commentSubmit} 
Check commentPosted
  Wait Until Page Contains ${commentText}
*** Test Cases ***
CreateComment
   [Documentation]
   Check Page
   Click Login
   Input Email     ${email}
   Input password       ${password}
   Click submitBtn
   Check Login
   Click CommentBtn 
   Check CommentInput 
   Input commentTitle   ${commentText}
   Input commentFileInput
   Click commentSubmit