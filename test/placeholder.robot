*** Settings ***
Documentation     
Library           SeleniumLibrary

Suite Setup       Open Browser    ${url}    chrome

*** Variables ***
${URL}             http://automationexercise.com
${MAINCLASS}       Automation
${REGI_BTN}        xpath=//a[@href='/login']
${NAME}            john
${EMAIL}           test@automationexercise.com
${NAME_INPUT}      name:name
${EMAIL_INPUT}     xpath=//input[@type='email' and @data-qa='signup-email']
${SIGN_UP_BTN}     xpath=//button[contains(text(),'Signup')]
${SIGN_UP_PAGE}    Enter Account Information
${GENDER_RADIO}    id:id_gender1
${DAYS_DROPDOWN}    id=days
${MONTHS_DROPDOWN}    id=months
${YEARS_DROPDOWN}    id=years
${COUNTRY_DROPDOWN}    id=country
*** Keywords ***
Check Page
   Wait Until Page Contains        ${MAINCLASS}
Click Register
   Click Element                   ${REGI_BTN} 
Input Name
   [Arguments]              ${NAME}
   Input Text    ${NAME_INPUT}    ${NAME}

Input Email
   [Arguments]              ${EMAIL}
   Input Text    ${EMAIL_INPUT}    ${EMAIL}
Click Signup
   Click Element    ${SIGN_UP_BTN}
Check SignupPage
   Wait Until Page Contains        ${SIGN_UP_PAGE}
Click Gender
   Click Element    ${GENDER_RADIO}

*** Test Cases ***
Reigstering
   [Documentation]
   Check Page 
   Click Register
   Input Name        ${NAME}
   Input Email       ${EMAIL}
   Click Signup
   Check SignupPage
   Click Gender
    Input Text    id=first_name    John
    Input Text    id=last_name    Doe
    Input Text    id=password    securepassword
    Select From List By Value    ${DAYS_DROPDOWN}    1
    Select From List By Value    ${MONTHS_DROPDOWN}    1
    Select From List By Value    ${YEARS_DROPDOWN}    2021
    Select Checkbox    id=newsletter
    Select Checkbox    id=optin
    Input Text    id=company    ABC Inc.
    Input Text    id=address1    123 Main Street
    Input Text    id=address2    Apt 456
    Select From List By Value    ${COUNTRY_DROPDOWN}    United States
    Input Text    id=state    CA
    Input Text    id=city    San Francisco
    Input Text    id=zipcode    12345
    Input Text    id=mobile_number    9876543210
    Click Element    xpath=//button[contains(text(),'Create Account')]