<div id="top"></div>

<!-- PROJECT LOGO -->
<br />
<h1 align="left">DocuBloom</h1>
<img src="./readme/imgs/about.png">

## [About The Project](#about-the-project) | [Getting Started](#getting-started) | [Features](#features) | [Structure](#structure) | [Budget](#budget) 


<!-- TODO: delete this part -->
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
    <li><a href="#structure">Structure</a></li>
    <li>
      <a href="#budget-prediction">Budget Prediction</a>
      <ul>
        <li><a href="#current-budget-calculation">Current Budget Calculation</a></li>
        <li><a href="#performance-tests-result">Performance Tests Result</a></li>
        <li><a href="#conclusion">Conclusion</a></li>
      </ul>
    </li>
    <li><a href="#error-handling-method">Error Handling Method</a></li>
    <li><a href="#mvcs-structure">MVCS Structure</a></li>
    <li><a href="#api-reference">API Reference</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
<br />

## About The Project
---

It has never been easier to build and manage API documents with DocuBloom!

DocuBloom allows you to
* Build readable, sharable, and testable API documents
* Receive mock response even if your own server went down

<img src="./readme/imgs/feature.png">

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- Getting Started -->
## Getting Started
---

- Get Your First API Document
<img src="./readme/gifs/get-document.gif">

- Sign In/Up to See your Profile

  Account       | Password | 
  :-------------|:---------|
  sean@sean.com | sean     |

  <img src="./readme/gifs/sign-in-up.gif">

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- Features -->
## Features
---

- Mistype Hint

  <img src="./readme/imgs/mistype-hint.png">

- API Tests

  <img src="./readme/gifs/api-test.gif"/>

- Collaborator Management
  <p float="left">
    <img src="./readme/imgs/collab-management-1.jpg" width="49%"/>
    <img src="./readme/imgs/collab-management-2.jpg" width="49%"/>
  </p>
  
  <img src="./readme/gifs/update-a-collaborator's-role.gif"/>

  [Details](#collaborator-management-rules)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- Structure -->
## Structure
---

- Structure

  <img src="./readme/imgs/structure.png">

- Error Handling Method

  <img src="./readme/imgs/error-handling-method.png">

<!-- Budget -->
## Budget
---
<img src="./readme/imgs/performance-test.png">

<br />

### Site Traffic

- Swagger
  Visits     | Bounce rate | Requests | Peak Requests |
  :---------:|:-----------:|:--------:|:-------------:|
  1.4M/month | 61.66%      | 0.08/sec | 8/sec         |

  <img src="./readme/imgs/swagger-traffic.png">

- With the existing budget, equipment can handle 500 requests per second.
- The server will automatically scale out in case the CPU usage is greater than 50%.



### Built With
---
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
      <li><a href="https://mochajs.org/">Mocha</a></li>
      <li><a href="https://www.chaijs.com/">Chai</a></li>
    </ul>
  </li>
</ul>

### Collaborator Management Rules
---
- There are owner, editor, and viewer roles in DocuBloom. Collaborator management depends on these three roles. Just give it a try on the site if you don't want to read these complicated rules XD.
1. You will be the owner right after creating a new document.
2. An owner can change others' role to an owner, editor, or viewer.
3. An owner can see other collaborators of the document.
4. An owner can remove any collaborator instead of another owner.
5. An owner can remove, edit, and view the document.
6. An owner cannot leave a document or be removed by others.
7. A document must have at least one owner.
8. An editor can change others' role to an editor, or viewer.
9. An editor can see other collaborators of the document.
10. An editor can edit and view the document.
11. An editor can leave the document.
12. A viewer can view the document.
13. A viewer can leave the document.
14. A viewer can see other collaborators of the document.
- If you are the owner of a document and you want to remove another owner. You will need to change his role to an editor or view, and then remove him.
- If you are the owner of a document and you want to leave this document. You need make sure there is at least another one as an owner, change your own role to an editor or viewer, and then click the leave document button.

1. Add a Collaborator

<img src="./readme/gifs/add-a-collaborator-i.gif"/>

<img src="./readme/gifs/add-a-collaborator-ii.gif"/>

2. Update a Collaborator’s Role

<img src="./readme/gifs/update-a-collaborator's-role.gif"/>

3. Remove a Collaborator

<img src="./readme/gifs/remove-a-collaborator-i.gif"/>

<img src="./readme/gifs/remove-a-collaborator-ii.gif"/>

4. Leave a Document

<img src="./readme/gifs/leave-a-document-i.gif"/>

<img src="./readme/gifs/leave-a-document-ii.gif"/>