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
${usernameInfo}         tester
${password}             asd
${submitBtn}        id=submitLoginForm
${login}             id=username
${fileInputLocation}    id=postFileInput
${postBadgeInput}       id=postBadgeInput
${postTitleInput}       id=post-title
${postTitle}         automated testing
${postBadge}         testing
${filePath}           D:\\\\Desktop\\artcrit-alpha\\artcrit-early\\public\\test3.jpg
${createPostBtn}     id=postCreationBtn
${postHumbergerBtn}  id=userPostHambergerBtn
${deletePostBtn}     id=deleteUserPost
*** Keywords ***
Check Page
   Wait Until Page Contains        ${MainPage}
Click Login
   Click Element    ${loginBtn}
Input username
   [Arguments]    ${usernameInfo}
   Input Text    ${userLoginInput}    ${usernameInfo}
Input password
  [Arguments]   ${password}
  Input Text    ${passwordLoginInput}    ${password}
Click submitBtn
   Click Button    ${submitBtn}
Check Login
  Wait Until Page Contains Element    ${login}
Input postTitle
  [Arguments]    ${postTitle}
  Input Text    ${postTitleInput}    ${postTitle}
Input postBadge
   [Arguments]  ${postBadge}
   Input Text    ${postBadgeInput}    ${postBadge}
Input postFileInput
  Choose File    ${fileInputLocation}   ${filePath}
Click CreatePost
  Click Button    ${createPostBtn}
Check CreatedPost
  Wait Until Page Contains    ${postTitle}
Click PostHumbergerBtn
  Click Button    ${postHumbergerBtn}
Click DeletePost 
  Click Button    ${deletePostBtn}
*** Test Cases ***
Login
   [Documentation]
   Check Page
   Click Login
   Input username       ${usernameInfo}
   Input password       ${password}
   Click submitBtn
   Check Login
   Input postTitle    ${postTitle}
   Input postBadge    ${postBadge}
   Input postFileInput
   Click CreatePost
   Check CreatedPost
   Click PostHumbergerBtn
   Click DeletePost 

