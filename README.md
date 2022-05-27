<div id="top"></div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="http://www.vivaformosean.com/">
    <img src="https://github.com/FormoSeanIap/project2-frontend/blob/develop/public/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">DocuBloom</h3>

  <p align="center">
    A website for developers to build readable, shareable, and testable API documents, with an amazing mock response functionality.<br /> 
    <a href="http://www.vivaformosean.com/"><strong>Explore the website »</strong></a><br />
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#get-your-first-api-document">Get Your First API Document</a></li>
        <li><a href="#sign-in/up-to-see-your-profile">Sign In/Up to See your Profile</a></li>
      </ul>
    </li>
    <li>
      <a href="#features">Features</a>
      <ol>
        <li>
          <a href="#documentation">Documentation</a>
          <ul>
            <li><a href="#get-document">Get Document</a></li>
            <li><a href="#document-contents">Document Contents</a></li>
            <li><a href="#mistype-hint">Mistype Hint</a></li>
          </ul>
        </li>
        <li>
          <a href="#documentation">API Management</a>
          <ul>
            <li><a href="#api-tests">API Tests</a></li>
            <li><a href="#mock-response">Mock Response</a></li>
          </ul>
        </li>
        <li>
          <a href="#document-management">Document Management</a>
          <ul>
            <li><a href="#create-a-document">Create a Document</a></li>
            <li><a href="#edit-a-document">Edit a Document</a></li>
            <li><a href="#delete-a-document">Delete a Document</a></li>
          </ul>
        </li>
        <li>
          <a href="#collaborator-management">Collaborator Management</a>
          <ul>
            <li><a href="#add-a-collaborator">Add a Collaborator</a></li>
            <li><a href="#update-a-collaborator’s-role">Update a Collaborator’s Role</a></li>
            <li><a href="#remove-a-collaborator">Remove a Collaborator</a></li>
            <li><a href="#leave-a-document">Leave a Document</a></li>
          </ul>
        </li>
      </ol>
    </li>
    <li>
      <a href="#budget-prediction">Budget Prediction</a>
      <ul>
        <li><a href="#current-budget-calculation">Current Budget Calculation</a></li>
        <li><a href="#performance-tests-result">Performance Tests Result</a></li>
        <li><a href="#conclusion">Conclusion</a></li>
      </ul>
    </li>
    <li><a href="#architecture">Architecture</a></li>
    <li><a href="#error-handling-method">Error Handling Method</a></li>
    <li><a href="#mvcs-structure">MVCS Structure</a></li>
    <li><a href="#api-reference">API Reference</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- Figures -->
<details>
  <summary>Figures</summary>
  <ol>
    <li><a href="#about-the=project">About the Project</a></li>
    <li><a href="#document-contents-i">Document Contents I</a></li>
    <li><a href="#document-contents-ii">Document Contents II</a></li>
    <li><a href="#document-contents-iii">Document Contents III</a></li>
    <li><a href="#mistype-hint">Mistype Hint</a></li>
    <li><a href="#performance-tests-result-i">Performance Tests Result I</a></li>
    <li><a href="#performance-tests-result-ii">Performance Tests Result II</a></li>
    <li><a href="#error-hint">Error Hint</a></li>
    <li><a href="#cloud-structure">Cloud Structure</a></li>
    <li><a href="#error-handling-method">Error Handling Method</a></li>
    <li><a href="#mvcs-structure">MVCS Structure</a></li>
  </ol>
</details>


<!-- Tables -->
<details>
  <summary>Tables</summary>
  <ol>
    <li><a href="#account-password">Account Password</a></li>
    <li><a href="#current-equipment">Current Equipment</a></li>
  </ol>
</details>

<!-- Gifs -->
<details>
  <summary>Gifs</summary>
  <ol>
    <li><a href="#get-document2">Get Document</a></li>
    <li><a href="#sign-in/up">Sign In/Up</a></li>
    <li><a href="#see-doc-contents">See Doc Contents</a></li>
    <li><a href="#test-apis-i">Test APIs I</a></li>
    <li><a href="#test-apis-ii">Test APIs II</a></li>
    <li><a href="#mock-response">Mock Response</a></li>
    <li><a href="#create-a-document">Create a Document</a></li>
    <li><a href="#edit-a-document">Edit a Document</a></li>
    <li><a href="#delete-a-document">Delete a Document</a></li>
    <li><a href="#add-a-collaborator">Add a Collaborator</a></li>
    <li><a href="#update-a-collaborator’s-role">Update a Collaborator’s Role</a></li>
    <li><a href="#remove-a-collaborator">Remove a Collaborator</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

It has never been easier to build and manage API documents with DocuBloom!

DocuBloom allows you to
* Build readable API documents
* Test if API is wokring properly with the document you built
* Share documents with collaborators and manage their role
* Receive mock response even if your own server went down

<a href="http://www.vivaformosean.com/"><strong>Try it now</strong></a><br />

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

<ul>
  <li>
    Back-End
    <ul>
      <li><a href="https://nodejs.org/en/">Node.js</a></li>
      <li><a href="https://expressjs.com/">Express.js</a></li>
      <li><a href="https://www.mongodb.com/">MongoDB</a></li>
      <li><a href="https://redis.io/">Redis</a></li>
      <li><a href="https://www.docker.com/">Docker</a></li>
      <li><a href="https://www.nginx.com/">Nginx</a></li>
    </ul>
  </li>
  <li>
    Cloud-Service
    <ul>
      <li><a href="https://aws.amazon.com/ec2/">Amazon EC2</a></li>
      <li><a href="https://aws.amazon.com/s3/">Amazon S3</a></li>
      <li><a href="https://aws.amazon.com/cloudfront/">Amazon CloudFront</a></li>
      <li><a href="https://aws.amazon.com/cloudwatch/">Amazon CloudWatch</a></li>
      <li><a href="https://aws.amazon.com/elasticache/">Amazon ElastiCache</a></li>
      <li><a href="https://aws.amazon.com/elasticloadbalancing/">Elastic Load Balancing</a></li>
      <li><a href="https://aws.amazon.com/autoscaling/">AWS Auto Scaling</a></li>
    </ul>
  </li>
  <li>
    Front-End
    <ul>
      <li><a href="https://reactjs.org/">React.js</a></li>
      <li><a href="https://mui.com/">MUI</a></li>
      <li>HTML5</li>
      <li>CSS3</li>
      <li>JavaScript</li>
    </ul>
  </li>
  <li>
    Tools
    <ul>
      <li>Git, GitHub</li>
      <li><a href="https://swagger.io/tools/swaggerhub/">Swagger</a></li>
      <li><a href="https://k6.io/">K6</a></li>
      <li><a href="https://www.postman.com/">Postman</a></li>
    </ul>
  </li>
</ul>

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- Getting Started -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Get Your First API Document

- Simply [Enter the Website](https://www.vivaformosean.com/), click GET EXAMPLE, and click VIEW. Just that simple!
<img id="get-document2" src="./readme/gifs/get-document.gif">


### Sign In/Up to See your Profile

- Sign in/up to see all of your documents
[![Sign-In/Up][sign-in/up]]()
- The default accout/password is

Account       | Password| 
--------------|:-------:|
sean@sean.com | sean    |

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- Features -->
## Features

Let's dive in and enjoy these cool DocuBloom features together!

### Documentation
1. Get Document
- This has been mentioned in the Getting Started Section. [Check it out!](#get-your-first-api-document)
2. Document Contents
- Following the last part, you can see the contents of document including the parameter, request, response of an API.

<img src="" width="50%">

<img src="" width="50%">

3. Mistype Hint
- You'll be given a clear hint for any mistyping. Tired of a never-ending stream of minor blunders? No worries in DocuBloom!

<img src="" width="50%">

### API Management
1. API Tests
- You can test your API and see if it is working as expected. The API document is actually alive!

<img src=".gif"/>

<img src=".gif"/>

### Document Management
1. Create a Document

<img src=".gif"/>

2. Edit a Document

<img src=".gif"/>

3. Delete a Document

<img src=".gif"/>

### Collaborator Management
- There are owner, editor, and viewer roles in DocuBloom. Collaborator management depends on these three roles. Just give it a try on the site if you don't want to read these complicated rules XD.
1. You will be the owner right after creating a new document.
2. An owner can change others' role to an owner, editor, or viewer.
3. An owner can see other collborators of the document.
4. An owner can remove any collaborator instead of another owner.
5. An owner can remove, edit, and view the document.
6. An owner cannot leave a document or be removed by others.
7. A document must haave at least one owner.
8. An editor can change others' role to an editor, or viewer.
9. An editor can see other collborators of the document.
10. An editor can edit and view the document.
11. An editor can leave the document.
12. A viewer can view the document.
13. A viewer can leave the document.
14. A viewer can see other collborators of the document.
- If you are the owner of a document and you want to remove another owner. You will need to change his role to an editor or view, and then remove him.
- If you are the owner of a document and you want to leave this document. You need make sure there is at least another one as an owner, change your own role to an editor or viewer, and then click the leave document button.

1. Add a Collaborator

<img src=".gif"/>

<img src=".gif"/>

2. Update a Collaborator’s Role

<img src=".gif"/>

3. Remove a Collaborator

<img src=".gif"/>

<img src=".gif"/>

4. Leave a Document

<img src=".gif"/>

<img src=".gif"/>

<p align="right">(<a href="#top">back to top</a>)</p>
