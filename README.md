<div id="top"></div>

<!-- PROJECT LOGO -->
<br />
<h1 align="left">DocuBloom</h1>
<img src="./readme/imgs/about.png">

## [About](#about) | [Getting Started](#getting-started) | [Features](#features) | [Structure](#structure) | [Budget](#budget) | [DB Design](#db-design) | [Built With](#built-with) | [Contact](#contact)

<br />

<!-- ABOUT -->
## About

A website for developers to build readable, sharable, and testable API documents, and to receive mock response even if the user's own server went down.

<img src="./readme/imgs/feature.png">

- Test Account

  |Account       | Password | 
  |:------------:|:--------:|
  |sean@sean.com | sean     |

<p align="right"><a href="#top">back to top</a></p>

<!-- Getting Started -->
## Getting Started

- Get your first example API document
<img src="./readme/gifs/get-document.gif">

- Sign in/up to see your documents

  <img src="./readme/gifs/sign-in-up.gif">

<p align="right"><a href="#top">back to top</a></p>

<!-- Features -->
## Features

- Mistype Hint

  <img src="./readme/imgs/mistype-hint.png">

- API Tests

  <img src="./readme/gifs/api-test.gif"/>

- Mock Response

  If a developer's server went down, s/he can still fetch mock response and past the generated urls to their codes, and the development won't be interrupted.

  <img src="./readme/gifs/mock-api.gif"/>

- Collaborator Management

  ![](./readme/imgs/collab-management.jpg)
  
  <img src="./readme/gifs/update-a-collaborator's-role.gif"/>

  [See More](./readme/data/doc_collaboration.md)

<p align="right"><a href="#top">back to top</a></p>

<!-- Structure -->
## Structure

- Structure

  <img src="./readme/imgs/structure.png">

  [Docker Compose File](https://github.com/FormoSeanIap/DocuBloom-Docker)

- Error Handling Method

  <img src="./readme/imgs/error-handling-method.png">

  [See More](./readme/data/responses.md)

<p align="right"><a href="#top">back to top</a></p>

<!-- Budget -->
## Budget
<img src="./readme/imgs/performance-test.png">

- The current budget is less than 15 USD per month, with equipments able to handle 500 requests per second.

- From the perspective of site traffic, it requires better equipments if the current usage grows 60-100 times larger.

- From the perspective of database, it requires more storage as the current usage grows about 3-4 times larger.

  [See More](./readme/data/budget.md)

<p align="right"><a href="#top">back to top</a></p>

## DB Design

### Document Collection
  <details>
  <summary>Schema</summary>

  ```json
  {
    "_id": {
      "$oid": "<doc_id>"
    },
    "users": {
      "<user_id>": "<user_role>"
    },
    "data": "<doc_data>"
  }
  ```
  </details>

  <details>
  <summary>Example</summary>

  ```json
  {
    "_id": {
      "$oid": "625f7fa6b07959eecafc1234"
    },
    "users": {
      "625f7f85b07959eecafc1234": "O",
      "625f74a91e550e315f325678": "E",
    },
    "data": {
      "servers": [
        {
          "description": "SwaggerHub API Auto Mocking",
          "url": "https://vivaformosean.com"
        }
      ],
      "openapi": "3.0.0",
      "info": {
        "version": "1.0.0",
        "title": "Stylish",
        "description": "User API description 123"
      },
      "tags": [
        {
          "name": "Users",
          "description": "API for in the system"
        }
      ],
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "paths": {
        "/api/1.0/admin/analysis/sales": {
          "get": {
            "tags": [
              "Admins/Analysis"
            ],
            "summary": "get sales details by date",
            "parameters": [
              {
                "in": "query",
                "name": "days",
                "schema": {
                  "type": "integer"
                },
                "required": true,
                "description": "the number of days"
              }
            ],
            "produces": [
              "application/json"
            ],
            "responses": {
              "200": {
                "description": "OK",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/user/profileOutput"
                    },
                    "examples": {
                      "sample1": {
                        "value": {
                          "data": [
                            {
                              "day": "2021-10-23",
                              "sales": 265658,
                              "order": 21
                            },
                            {
                              "day": "2021-10-24",
                              "sales": 207114,
                              "order": 21
                            },
                            {
                              "day": "2021-10-25",
                              "sales": 266399,
                              "order": 27
                            }
                          ]
                        }
                      }
                    }
                  }
                }
              },
              "401": {
                "description": "no token provided",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/user/Error"
                    },
                    "examples": {
                      "sample1": {
                        "value": {
                          "error": "Unauthorized"
                        }
                      }
                    }
                  }
                }
              },
              "403": {
                "description": "normal user, not admin",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/user/Error"
                    },
                    "examples": {
                      "sample1": {
                        "value": {
                          "error": "Forbidden"
                        }
                      }
                    }
                  }
                }
              }
            },
            "security": [
              {
                "bearerAuth": []
              }
            ]
          }
        },
        "/api/1.0/admin/analysis/user_consumption": {
          "get": {
            "tags": [
              "Admins/Analysis"
            ],
            "summary": "get customers consumption by date",
            "parameters": [
              {
                "in": "query",
                "name": "days",
                "schema": {
                  "type": "integer"
                },
                "required": true,
                "description": "number of days"
              },
              {
                "in": "query",
                "name": "rank",
                "schema": {
                  "type": "integer"
                },
                "required": true,
                "description": "the rank number of customers"
              }
            ],
            "produces": [
              "application/json"
            ],
            "responses": {
              "200": {
                "description": "OK",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/user/profileOutput"
                    },
                    "examples": {
                      "sample1": {
                        "value": {
                          "data": [
                            {
                              "user_id": 1,
                              "consumption": 739671,
                              "name": "林鼎棋",
                              "email": "gn01168178@yahoo.com.tw"
                            },
                            {
                              "user_id": 5,
                              "consumption": 691155,
                              "name": "Chun Yu Lai",
                              "email": "lindazoro@yahoo.com.tw"
                            },
                            {
                              "user_id": 4,
                              "consumption": 340876,
                              "name": "張峰林",
                              "email": "paulespling@gmail.com"
                            },
                            {
                              "user_id": 3,
                              "consumption": 278707,
                              "name": "林師廷",
                              "email": "st920090@yahoo.com.tw"
                            },
                            {
                              "user_id": 2,
                              "consumption": 242464,
                              "name": "Wayne Chen",
                              "email": "wayne.swchen@gmail.com"
                            }
                          ]
                        }
                      }
                    }
                  }
                }
              },
              "401": {
                "description": "no token provided",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/user/Error"
                    },
                    "examples": {
                      "sample1": {
                        "value": {
                          "error": "Unauthorized"
                        }
                      }
                    }
                  }
                }
              },
              "403": {
                "description": "normal user, not admin",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/user/Error"
                    },
                    "examples": {
                      "sample1": {
                        "value": {
                          "error": "Forbidden"
                        }
                      }
                    }
                  }
                }
              }
            },
            "security": [
              {
                "bearerAuth": []
              }
            ]
          }
        },
        "/api/1.0/admin/coupons": {
          "get": {
            "tags": [
              "Admins/Coupons"
            ],
            "summary": "get all coupons",
            "security": [
              {
                "bearerAuth": []
              }
            ],
            "produces": [
              "application/json"
            ],
            "responses": {
              "200": {
                "description": "OK",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/user/profileOutput"
                    },
                    "examples": {
                      "sample1": {
                        "value": {
                          "data": [
                            {
                              "id": 123,
                              "prefix": "DAY",
                              "name": 1234567890,
                              "expire_time": "2022-03-27"
                            },
                            {
                              "id": 124,
                              "prefix": "WEEK",
                              "name": 1234567890,
                              "expire_time": "2022-03-27"
                            },
                            {
                              "id": 126,
                              "prefix": "MONTH",
                              "name": 1234567890,
                              "expire_time": "2022-03-27"
                            }
                          ]
                        }
                      }
                    }
                  }
                }
              },
              "401": {
                "description": "no token provided",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/user/Error"
                    },
                    "examples": {
                      "sample1": {
                        "value": {
                          "error": "Unauthorized"
                        }
                      }
                    }
                  }
                }
              },
              "403": {
                "description": "normal user, not admin",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/user/Error"
                    },
                    "examples": {
                      "sample1": {
                        "value": {
                          "error": "Forbidden"
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "post": {
            "tags": [
              "Admins/Coupons"
            ],
            "summary": "add new coupons",
            "security": [
              {
                "bearerAuth": []
              }
            ],
            "requestBody": {
              "description": "Coupon Object",
              "required": true,
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/user/signInInput"
                  },
                  "examples": {
                    "DAY": {
                      "value": {
                        "prefix": "DAY",
                        "name": "1234567890"
                      }
                    },
                    "WEEK": {
                      "value": {
                        "prefix": "WEEK",
                        "name": "1234567890"
                      }
                    },
                    "MONTH": {
                      "value": {
                        "prefix": "MONTH",
                        "name": "1234567890"
                      }
                    }
                  }
                }
              }
            },
            "produces": [
              "application/json"
            ],
            "responses": {
              "200": {
                "description": "OK",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/products/couponCreateOutput"
                    },
                    "examples": {
                      "sample1": {
                        "value": {
                          "data": "create succeed"
                        }
                      }
                    }
                  }
                }
              },
              "400": {
                "description": "coupon already exists",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/user/Error"
                    },
                    "examples": {
                      "not exist": {
                        "value": {
                          "error": "coupon already exists"
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "delete": {
            "tags": [
              "Admins/Coupons"
            ],
            "summary": "delete a coupon",
            "security": [
              {
                "bearerAuth": []
              }
            ],
            "requestBody": {
              "description": "Coupon Object",
              "required": true,
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/user/signInInput"
                  },
                  "examples": {
                    "sample1": {
                      "value": {
                        "data": "Delete successfully"
                      }
                    }
                  }
                }
              }
            },
            "produces": [
              "application/json"
            ],
            "responses": {
              "200": {
                "description": "OK",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/user/profileOutput"
                    },
                    "examples": {
                      "sample1": {
                        "value": {
                          "data": "deleted successfully"
                        }
                      }
                    }
                  }
                }
              },
              "400": {
                "description": "invalid input",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/user/Error"
                    },
                    "examples": {
                      "sample1": {
                        "value": {
                          "error": "Invalid input"
                        }
                      }
                    }
                  }
                }
              },
              "409": {
                "description": "delete fail due to conflict",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/user/Error"
                    },
                    "examples": {
                      "sample1": {
                        "value": {
                          "error": "Conflict"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "/api/1.0/admin/products": {
          "post": {
            "tags": [
              "Admins/Products"
            ],
            "summary": "admin adds new product",
            "security": [
              {
                "bearerAuth": []
              }
            ],
            "requestBody": {
              "description": "Product Object",
              "required": true,
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/products/productPutReq"
                  },
                  "examples": {
                    "sample1": {
                      "value": {
                        "product_id": 202203241908500000,
                        "title": "美味的義美小泡芙",
                        "category": "men",
                        "description": "description",
                        "price": 100,
                        "texture": "test",
                        "wash": "test",
                        "place": "place",
                        "note": "note",
                        "story": "test",
                        "variants": [
                          {
                            "color_code": "FFFFFF",
                            "size": "M",
                            "stock": 10
                          },
                          {
                            "color_code": "CCCCCC",
                            "size": "S",
                            "stock": 10
                          }
                        ],
                        "main_image": "https://vivaformosean-stylish.s3.ap-northeast-1.amazonaws.com/assets/202203241908499000/main"
                      }
                    }
                  }
                }
              }
            },
            "produces": [
              "application/json"
            ],
            "responses": {
              "200": {
                "description": "OK",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/user/profileOutput"
                    },
                    "examples": {
                      "sample1": {
                        "value": {
                          "product_id": 123
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "put": {
            "tags": [
              "Admins/Products"
            ],
            "summary": "admin changes product",
            "requestBody": {
              "description": "Product Object",
              "required": true,
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/products/productPutReq"
                  },
                  "example": {
                    "product_id": 202203241908500000,
                    "category": "men",
                    "title": "美味的義美大大大泡芙",
                    "description": "test",
                    "price": 2000,
                    "texture": "棉 100%",
                    "wash": "水洗",
                    "place": "中國",
                    "note": "實品顏色依單品照為主",
                    "story": "O.N.S is all about options, which is why we took our staple polo shirt and upgraded it with slubby linen jersey, making it even lighter for those who prefer their summer style extra-breezy."
                  }
                }
              }
            },
            "security": [
              {
                "bearerAuth": []
              }
            ],
            "produces": [
              "application/json"
            ],
            "responses": {
              "200": {
                "description": "OK",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/user/profileOutput"
                    },
                    "examples": {
                      "sample1": {
                        "value": {
                          "data": "Update OK"
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "delete": {
            "tags": [
              "Admins/Products"
            ],
            "summary": "admin deletes product",
            "security": [
              {
                "bearerAuth": []
              }
            ],
            "requestBody": {
              "description": "Product Object",
              "required": true,
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/products/productPutReq"
                  },
                  "example": {
                    "product_id": 202203241908500000
                  }
                }
              }
            },
            "responses": {
              "200": {
                "description": "OK",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/user/profileOutput"
                    },
                    "examples": {
                      "sample1": {
                        "value": {
                          "data": "Delete successfully"
                        }
                      }
                    }
                  }
                }
              },
              "400": {
                "description": "Delete failed",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/user/profileOutput"
                    },
                    "examples": {
                      "sample1": {
                        "value": {
                          "error": "Delete failed, need to delete this product's variants first"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "/api/1.0/admin/s3url": {
          "get": {
            "tags": [
              "Admins/Others"
            ],
            "summary": "get s3 upload image",
            "produces": [
              "application/json"
            ],
            "responses": {
              "200": {
                "description": "OK",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/user/profileOutput"
                    },
                    "examples": {
                      "sample1": {
                        "value": {
                          "id": 22032312345123,
                          "url": "https://vivaformosean-stylish.s3.ap-northeast-1.amazonaws.com/73552f341c65d25d1b0ecd231018b6a0?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA3CAX7NLDGVMFW4WU%2F20220323%2Fap-northeast-1%2Fs3%2Faws4_request&X-Amz-Date=20220323T023444Z&X-Amz-Expires=60&X-Amz-Signature=d92b8b3faf381aebb5ef5f34d5b3dfe440b6adb25a4e0a1975319a67b9e6f057&X-Amz-SignedHeaders=host"
                        }
                      }
                    }
                  }
                }
              }
            },
            "security": [
              {
                "bearerAuth": []
              }
            ]
          }
        },
        "/api/1.0/admin/analysis/signup_number": {
          "get": {
            "tags": [
              "Admins/Analysis"
            ],
            "summary": "get sign-up number by date",
            "parameters": [
              {
                "in": "query",
                "name": "days",
                "schema": {
                  "type": "integer"
                },
                "required": true,
                "description": "due date"
              }
            ],
            "produces": [
              "application/json"
            ],
            "responses": {
              "200": {
                "description": "最上面會是最舊的",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/user/profileOutput"
                    },
                    "examples": {
                      "sample1": {
                        "value": {
                          "data": [
                            {
                              "day": "2022-03-13",
                              "signup_number": 5
                            },
                            {
                              "day": "2022-03-14",
                              "signup_number": 33
                            },
                            {
                              "day": "2022-03-15",
                              "signup_number": 29
                            },
                            {
                              "day": "2022-03-16",
                              "signup_number": 29
                            },
                            {
                              "day": "2022-03-17",
                              "signup_number": 24
                            },
                            {
                              "day": "2022-03-18",
                              "signup_number": 21
                            },
                            {
                              "day": "2022-03-19",
                              "signup_number": 36
                            },
                            {
                              "day": "2022-03-20",
                              "signup_number": 22
                            },
                            {
                              "day": "2022-03-21",
                              "signup_number": 1
                            }
                          ]
                        }
                      }
                    }
                  }
                }
              },
              "401": {
                "description": "no token provided",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/user/Error"
                    },
                    "examples": {
                      "sample1": {
                        "value": {
                          "error": "Unauthorized"
                        }
                      }
                    }
                  }
                }
              },
              "403": {
                "description": "normal user, not admin",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/user/Error"
                    },
                    "examples": {
                      "sample1": {
                        "value": {
                          "error": "Forbidden"
                        }
                      }
                    }
                  }
                }
              }
            },
            "security": [
              {
                "bearerAuth": []
              }
            ]
          }
        },
        "/api/1.0/admin/products/stock": {
          "post": {
            "tags": [
              "Admins/Stock"
            ],
            "summary": "admin adds new variant stock",
            "requestBody": {
              "description": "Product Object",
              "required": true,
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/products/variantPutReq"
                  },
                  "example": {
                    "product_id": 201807201824,
                    "variants": [
                      {
                        "color_code": "FFFFFF",
                        "size": "M",
                        "stock": 5
                      },
                      {
                        "color_code": "FFFFFF",
                        "size": "L",
                        "stock": 10
                      }
                    ]
                  }
                }
              }
            },
            "security": [
              {
                "bearerAuth": []
              }
            ],
            "responses": {
              "200": {
                "description": "OK",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/user/profileOutput"
                    },
                    "examples": {
                      "sample1": {
                        "value": {
                          "data": "Create successed"
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "put": {
            "tags": [
              "Admins/Stock"
            ],
            "summary": "admin changes a variant stock",
            "requestBody": {
              "description": "Product Object",
              "required": true,
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/products/variantPutReq"
                  },
                  "example": {
                    "product_id": 201807201824,
                    "variants": [
                      {
                        "color_code": "FFFFFF",
                        "size": "S",
                        "stock": 7
                      },
                      {
                        "color_code": "DDFFBB",
                        "size": "S",
                        "stock": 12
                      }
                    ]
                  }
                }
              }
            },
            "security": [
              {
                "bearerAuth": []
              }
            ],
            "responses": {
              "200": {
                "description": "OK",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/user/profileOutput"
                    },
                    "examples": {
                      "sample1": {
                        "value": {
                          "data": "Update OK"
                        }
                      }
                    }
                  }
                }
              },
              "400": {
                "description": "Update failed",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/user/profileOutput"
                    },
                    "examples": {
                      "sample1": {
                        "value": {
                          "error": "Update failed due to invalid input"
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "delete": {
            "tags": [
              "Admins/Stock"
            ],
            "summary": "admin delete multi variant stock with specific product_id",
            "requestBody": {
              "description": "Product Object",
              "required": true,
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/products/variantDeleteReq"
                  },
                  "example": {
                    "product_id": 202203241908500000
                  }
                }
              }
            },
            "security": [
              {
                "bearerAuth": []
              }
            ],
            "responses": {
              "200": {
                "description": "OK",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/user/profileOutput"
                    },
                    "examples": {
                      "sample1": {
                        "value": {
                          "data": "Delete successfully"
                        }
                      }
                    }
                  }
                }
              },
              "400": {
                "description": "Delete failed",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/user/profileOutput"
                    },
                    "examples": {
                      "sample1": {
                        "value": {
                          "error": "Delete failed due to invalid input"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "/api/1.0/admin/user_coupons": {
          "get": {
            "tags": [
              "Admins/User_coupons"
            ],
            "summary": "get coupons from a user",
            "security": [
              {
                "bearerAuth": []
              }
            ],
            "requestBody": {
              "description": "Coupon Object",
              "required": true,
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/user/signInInput"
                  },
                  "examples": {
                    "sample1": {
                      "value": {
                        "user_id": 10060
                      }
                    }
                  }
                }
              }
            },
            "produces": [
              "application/json"
            ],
            "responses": {
              "200": {
                "description": "OK",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/user/profileOutput"
                    },
                    "examples": {
                      "sample1": {
                        "value": {
                          "data": {
                            "user_coupon_table": [
                              {
                                "id": 11,
                                "user_id": 10060,
                                "coupon_id": 1,
                                "can_use": 0
                              },
                              {
                                "id": 12,
                                "user_id": 10060,
                                "coupon_id": 2,
                                "can_use": 1
                              },
                              {
                                "id": 13,
                                "user_id": 10060,
                                "coupon_id": 3,
                                "can_use": 0
                              }
                            ]
                          }
                        }
                      }
                    }
                  }
                }
              },
              "400": {
                "description": "Client's fault",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/products/couponCreateOutput"
                    },
                    "examples": {
                      "sample1": {
                        "value": {
                          "error": "Read failed due to invalid input"
                        }
                      }
                    }
                  }
                }
              },
              "500": {
                "description": "Server's fault",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/products/couponCreateOutput"
                    },
                    "examples": {
                      "sample1": {
                        "value": {
                          "error": "Read failed"
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "post": {
            "tags": [
              "Admins/User_coupons"
            ],
            "summary": "add a new coupon to a customer",
            "security": [
              {
                "bearerAuth": []
              }
            ],
            "requestBody": {
              "description": "Coupon ID and User ID",
              "required": true,
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/user/signInInput"
                  },
                  "examples": {
                    "sample1": {
                      "value": {
                        "coupon_id": 12,
                        "user_id": 10060
                      }
                    }
                  }
                }
              }
            },
            "produces": [
              "application/json"
            ],
            "responses": {
              "200": {
                "description": "OK",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/products/couponCreateOutput"
                    },
                    "examples": {
                      "sample1": {
                        "value": {
                          "data": "Create successfully"
                        }
                      }
                    }
                  }
                }
              },
              "400": {
                "description": "Client's fault",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/products/couponCreateOutput"
                    },
                    "examples": {
                      "sample1": {
                        "value": {
                          "error": "Create failed due to invalid input"
                        }
                      }
                    }
                  }
                }
              },
              "500": {
                "description": "Server's fault",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/products/couponCreateOutput"
                    },
                    "examples": {
                      "sample1": {
                        "value": {
                          "error": "Create failed"
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "delete": {
            "tags": [
              "Admins/User_coupons"
            ],
            "summary": "delete a coupon from a user",
            "security": [
              {
                "bearerAuth": []
              }
            ],
            "requestBody": {
              "description": "Coupon Object",
              "required": true,
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/user/signInInput"
                  },
                  "examples": {
                    "sample1": {
                      "value": {
                        "id": 14
                      }
                    }
                  }
                }
              }
            },
            "produces": [
              "application/json"
            ],
            "responses": {
              "200": {
                "description": "OK",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/user/profileOutput"
                    },
                    "examples": {
                      "sample1": {
                        "value": {
                          "data": "Delete successfully"
                        }
                      }
                    }
                  }
                }
              },
              "400": {
                "description": "Client's fault",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/products/couponCreateOutput"
                    },
                    "examples": {
                      "sample1": {
                        "value": {
                          "error": "Delete failed due to invalid input"
                        }
                      }
                    }
                  }
                }
              },
              "500": {
                "description": "Server's fault",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/products/couponCreateOutput"
                    },
                    "examples": {
                      "sample1": {
                        "value": {
                          "error": "Delete failed"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "/api/1.0/products/colors": {
          "get": {
            "tags": [
              "Products"
            ],
            "summary": "get color table",
            "produces": [
              "application/json"
            ],
            "responses": {
              "200": {
                "description": "OK",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#products/colorOutput"
                    },
                    "example": {
                      "data": [
                        {
                          "code": "FFFFFF",
                          "name": "白色"
                        },
                        {
                          "code": "DDFFBB",
                          "name": "亮綠"
                        },
                        {
                          "code": "CCCCCC",
                          "name": "淺灰"
                        },
                        {
                          "code": "BB7744",
                          "name": "淺棕"
                        },
                        {
                          "code": "DDF0FF",
                          "name": "淺藍"
                        },
                        {
                          "code": "334455",
                          "name": "深藍"
                        },
                        {
                          "code": "FFDDDD",
                          "name": "粉紅"
                        }
                      ]
                    }
                  }
                }
              }
            }
          }
        },
        "/api/1.0/order/checkout": {
          "post": {
            "tags": [
              "Order"
            ],
            "summary": "user set orders",
            "parameters": [
              {
                "in": "header",
                "name": "x-api-key",
                "schema": {
                  "type": "string"
                },
                "required": true,
                "description": "tapPay partner key",
                "example": "partner_PHgswvYEk4QY6oy3n8X3CwiQCVQmv91ZcFoD5VrkGFXo8N7BFiLUxzeG"
              },
              {
                "in": "header",
                "name": "Content-Type",
                "schema": {
                  "type": "string"
                },
                "required": true,
                "description": "Content-Type",
                "example": "application/json"
              }
            ],
            "requestBody": {
              "description": "Product Object",
              "required": true,
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/products/variantPutReq"
                  },
                  "example": {
                    "prime": "5a9e4f3bee17ff9d95ba456d26543ce825fbb31703b390f38031152cf3f302b2",
                    "order": {
                      "shipping": "delivery",
                      "payment": "credit_card",
                      "subtotal": 1234,
                      "freight": 14,
                      "total": 1300,
                      "recipient": {
                        "name": "Luke",
                        "phone": "0987654321",
                        "email": "luke@gmail.com",
                        "address": "市政府站",
                        "time": "morning"
                      },
                      "list": [
                        {
                          "id": "201807202157",
                          "name": "qwert",
                          "price": 1299,
                          "color": {
                            "code": "#FFFFFF",
                            "name": "white"
                          },
                          "size": "L",
                          "qty": 10
                        },
                        {
                          "id": "qwertr",
                          "name": "qwert",
                          "price": 1299,
                          "color": {
                            "code": "#FFFFFF",
                            "name": "white"
                          },
                          "size": "L",
                          "qty": 10
                        }
                      ]
                    },
                    "coupon_id": 13
                  }
                }
              }
            },
            "security": [
              {
                "bearerAuth": []
              }
            ],
            "responses": {
              "200": {
                "description": "OK",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/user/profileOutput"
                    },
                    "examples": {
                      "sample1": {
                        "value": {
                          "data": {
                            "number": "221484290010"
                          }
                        }
                      }
                    }
                  }
                }
              },
              "401": {
                "description": "no token provided",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/user/Error"
                    },
                    "examples": {
                      "wrong order format": {
                        "value": {
                          "error": "Create Order Error: Wrong Data Format"
                        }
                      },
                      "invalid prime": {
                        "value": {
                          "error": "Invalid prime"
                        }
                      },
                      "coupon already used": {
                        "value": {
                          "error": "This coupon has been used"
                        }
                      }
                    }
                  }
                }
              },
              "403": {
                "description": "wrong token",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/user/Error"
                    },
                    "examples": {
                      "sample1": {
                        "value": {
                          "error": "Forbidden"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "/api/1.0/products/{category}": {
          "get": {
            "tags": [
              "Products"
            ],
            "summary": "fetch products info",
            "produces": [
              "application/json"
            ],
            "parameters": [
              {
                "in": "path",
                "name": "category",
                "schema": {
                  "type": "string"
                },
                "required": true,
                "description": "category",
                "examples": {
                  "all": {
                    "value": "all"
                  },
                  "women": {
                    "value": "women"
                  },
                  "men": {
                    "value": "men"
                  },
                  "accessories": {
                    "value": "accessories"
                  }
                }
              },
              {
                "in": "query",
                "name": "paging",
                "schema": {
                  "type": "number"
                },
                "required": false,
                "description": "page"
              }
            ],
            "responses": {
              "200": {
                "description": "OK",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/products/productsOutput"
                    },
                    "example": {
                      "data": [
                        {
                          "id": 1234,
                          "category": "men",
                          "title": "厚實毛呢格子外套",
                          "description": "高抗寒素材選用，保暖也時尚有型",
                          "price": 2200,
                          "texture": "棉、聚脂纖維",
                          "wash": "手洗（水溫40度",
                          "place": "韓國",
                          "note": "實品顏色以單品照為主",
                          "story": "你絕對不能錯過的超值商品",
                          "colors": [
                            {
                              "code": "334455",
                              "name": "深藍"
                            },
                            {
                              "code": "FFFFFF",
                              "name": "白色"
                            }
                          ],
                          "sizes": [
                            "S",
                            "M"
                          ],
                          "variants": [
                            {
                              "color_code": "334455",
                              "size": "S",
                              "stock": 5
                            },
                            {
                              "color_code": "334455",
                              "size": "M",
                              "stock": 10
                            },
                            {
                              "color_code": "FFFFFF",
                              "size": "S",
                              "stock": 0
                            },
                            {
                              "color_code": "FFFFFF",
                              "size": "M",
                              "stock": 2
                            }
                          ],
                          "main_image": "string",
                          "images": [
                            "https://stylish.com/0.jpg",
                            "https://stylish.com/1.jpg",
                            "https://stylish.com/2.jpg"
                          ]
                        },
                        {
                          "id": 5678,
                          "category": "men",
                          "title": "厚實毛呢格子外套",
                          "description": "高抗寒素材選用，保暖也時尚有型",
                          "price": 2200,
                          "texture": "棉、聚脂纖維",
                          "wash": "手洗（水溫40度",
                          "place": "韓國",
                          "note": "實品顏色以單品照為主",
                          "story": "你絕對不能錯過的超值商品",
                          "colors": [
                            {
                              "code": "334455",
                              "name": "深藍"
                            }
                          ],
                          "sizes": [
                            "S",
                            "M",
                            "L"
                          ],
                          "variants": [
                            {
                              "color_code": "334455",
                              "size": "S",
                              "stock": 5
                            },
                            {
                              "color_code": "334455",
                              "size": "M",
                              "stock": 10
                            },
                            {
                              "color_code": "334455",
                              "size": "L",
                              "stock": 0
                            }
                          ],
                          "main_image": "https://stylish.com/main.jpg",
                          "images": [
                            "https://stylish.com/0.jpg",
                            "https://stylish.com/1.jpg",
                            "https://stylish.com/2.jpg"
                          ]
                        }
                      ]
                    }
                  }
                }
              }
            }
          }
        },
        "https://vivaformosean.com/s3test/index.html": {
          "get": {
            "tags": [
              "S3"
            ],
            "summary": "上傳到S3的測試處",
            "description": "選擇圖片按下上傳鈕之後，會打一個請求給後端得到(1)上傳網址，然後再打一個請求把圖片傳到該網址，最後就會得到(2)該圖片的網址。log會出現兩個網址，分別是(1)和(2)"
          }
        },
        "https://vivaformosean.com/customers.html": {
          "get": {
            "tags": [
              "Socket"
            ],
            "summary": "Socket的顧客房間(要等店員先開)",
            "description": "等店員頁面開好後，再開這個頁面測試，可以重複開"
          }
        },
        "https://vivaformosean.com/staff.html": {
          "get": {
            "tags": [
              "Socket"
            ],
            "summary": "Socket的店員房間(要先開著)",
            "description": "開好這個網頁後，再去開顧客的頁面測試。可以從這個頁面的console看到顧客傳來的訊息和roomID"
          }
        },
        "/api/1.0/user/coupon": {
          "get": {
            "tags": [
              "Users"
            ],
            "summary": "get user coupon",
            "produces": [
              "application/json"
            ],
            "responses": {
              "200": {
                "description": "OK",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/user/profileOutput"
                    },
                    "example": {
                      "data": [
                        {
                          "prefix": "WEEK",
                          "name": "test5",
                          "expire_time": "2022-03-27",
                          "coupon_id": 1,
                          "can_use": false
                        },
                        {
                          "prefix": "DAY",
                          "name": "test5",
                          "expire_time": "2022-03-21",
                          "coupon_id": 2,
                          "can_use": true
                        },
                        {
                          "prefix": "MONTH",
                          "name": "test",
                          "expire_time": "2022-04-19",
                          "coupon_id": 3,
                          "can_use": false
                        }
                      ]
                    }
                  }
                }
              },
              "401": {
                "description": "No token provided",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/user/Error"
                    },
                    "examples": {
                      "sample1": {
                        "value": {
                          "error": "Unauthorized"
                        }
                      }
                    }
                  }
                }
              },
              "403": {
                "description": "wrong token",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/user/Error"
                    },
                    "examples": {
                      "sample1": {
                        "value": {
                          "error": "Forbidden"
                        }
                      }
                    }
                  }
                }
              }
            },
            "security": [
              {
                "bearerAuth": []
              }
            ]
          }
        },
        "/api/1.0/user/profile": {
          "get": {
            "tags": [
              "Users"
            ],
            "summary": "get user profile",
            "produces": [
              "application/json"
            ],
            "responses": {
              "200": {
                "description": "OK",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/user/profileOutput"
                    },
                    "example": {
                      "data": {
                        "provider": "facebook",
                        "name": "Pei",
                        "email": "pei@gmail.com",
                        "picture": "https://graph.facebook.com/123481231233/picture?type=large",
                        "address": "100台北市中正區仁愛路二段100號"
                      }
                    }
                  }
                }
              },
              "401": {
                "description": "No token provided",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/user/Error"
                    },
                    "examples": {
                      "sample1": {
                        "value": {
                          "error": "Unauthorized"
                        }
                      }
                    }
                  }
                }
              },
              "403": {
                "description": "wrong token",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/user/Error"
                    },
                    "examples": {
                      "sample1": {
                        "value": {
                          "error": "Forbidden"
                        }
                      }
                    }
                  }
                }
              }
            },
            "security": [
              {
                "bearerAuth": []
              }
            ]
          }
        },
        "/api/1.0/user/signin": {
          "post": {
            "tags": [
              "Users"
            ],
            "summary": "User sign in through native/google/facebook",
            "requestBody": {
              "description": "User Object",
              "required": true,
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/user/signInInput"
                  },
                  "examples": {
                    "native": {
                      "value": {
                        "provider": "native",
                        "email": "test2@test.com",
                        "password": "test"
                      }
                    },
                    "google": {
                      "value": {
                        "provider": "google",
                        "access_token": "ya29.A0ARrdaM_Txv53OQbHRgJEUbeAfYrL2yLvCiXdXmFqrXviQzw5Za6TqoW00B7lc-75_mOcv620zMQuzydU6zzeJXatXOGr5kELWYxgr0eP479860KBiY5-WKxs6b-y7j1UbLXI6Xri4_EuQlvwt0l7Gwh94bSTa"
                      }
                    }
                  }
                }
              }
            },
            "produces": [
              "application/json"
            ],
            "responses": {
              "200": {
                "description": "OK",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/user/signInOutput"
                    },
                    "example": {
                      "data": {
                        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm92aWRlciI6Imdvb2dsZSIsIm5hbWUiOiLokYnmib_lvaUiLCJlbWFpbCI6InIwODEyNDAwOUBnLm50dS5lZHUudHciLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUFUWEFKeHZ6bEM0NmFPOWtlcHpKSUtMdkFvVHhqRkFxX3h6N2JLUmh3RHE9czk2LWMiLCJpYXQiOjE2NDc1ODk0OTR9.oxkog5IvVVsmgTnyT7-fV7GNhvKz3j_nFR2hMt1osSU",
                        "access_expired": "2592000",
                        "login_at": "2022-03-18T07:44:54.992Z",
                        "user": {
                          "id": 10252,
                          "provider": "native",
                          "name": "abc",
                          "email": "abc@abc.com",
                          "picture": "https://lh3.googleusercontent.com/a/AATXAJxvzlC46aO9kepzJIKLvAoTxjFAq_xz7bKRhwDq=s96-c",
                          "address": "100台北市中正區仁愛路二段100號",
                          "role": 2
                        }
                      }
                    }
                  }
                }
              },
              "400": {
                "description": "no token provided",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/user/Error"
                    },
                    "example": {
                      "error": "Request Error: access token is required."
                    }
                  }
                }
              },
              "403": {
                "description": "wrong provider or access_token",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/user/Error"
                    },
                    "examples": {
                      "wrong access token": {
                        "value": {
                          "error": "Permissions Error: facebook access token is wrong"
                        }
                      },
                      "wrong provider": {
                        "value": {
                          "error": "Wrong Request"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "/api/1.0/user/signup": {
          "post": {
            "tags": [
              "Users"
            ],
            "summary": "Create a new User",
            "requestBody": {
              "description": "User Object",
              "required": true,
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/user/signUpInput"
                  },
                  "example": {
                    "name": "abc",
                    "email": "abc@abc.com",
                    "password": "abc"
                  }
                }
              }
            },
            "produces": [
              "application/json"
            ],
            "responses": {
              "200": {
                "description": "OK",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/user/signUpOutput"
                    },
                    "example": {
                      "data": {
                        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm92aWRlciI6Im5hdGl2ZSIsIm5hbWUiOiJ0ZXN0IiwiZW1haWwiOiJ0ZXN0NEB0ZXN0LmNvbSIsInBpY3R1cmUiOiJodHRwczovL2Nkbi1pY29ucy1wbmcuZmxhdGljb24uY29tLzUxMi82MTYvNjE2NDMwLnBuZyIsImlhdCI6MTY0NzU4ODY3M30.fk4Gd3NtomuSlTpp954f9k0uipNFGtlBlqX1GHv-Iyg",
                        "access_expired": "2592000",
                        "login_at": "2022-03-18T07:31:13.851Z",
                        "user": {
                          "id": 10254,
                          "provider": "native",
                          "name": "abc",
                          "email": "abc@abc.com",
                          "picture": "https://cdn-icons-png.flaticon.com/512/616/616430.png",
                          "address": "100台北市中正區仁愛路二段100號"
                        }
                      }
                    }
                  }
                }
              },
              "400": {
                "description": "user's fault",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/user/Error"
                    },
                    "examples": {
                      "no name, email, or password": {
                        "value": {
                          "error": "Request Error: name, email and password are required."
                        }
                      }
                    }
                  }
                }
              },
              "403": {
                "description": "user's fault",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/user/Error"
                    },
                    "examples": {
                      "email exists": {
                        "value": {
                          "error": "Email Already Exists"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "products": {
        "couponCreateOutput": {
          "type": "object",
          "properties": {
            "data": {
              "type": "object",
              "properties": {
                "coupon_id": {
                  "type": "number"
                }
              }
            }
          }
        },
        "productsOutput": {
          "type": "object",
          "properties": {
            "data": {
              "type": "array",
              "items": {
                "properties": {
                  "id": {
                    "type": "number"
                  },
                  "category": {
                    "type": "string"
                  },
                  "title": {
                    "type": "string"
                  },
                  "description": {
                    "type": "string"
                  },
                  "price": {
                    "type": "number"
                  },
                  "wash": {
                    "type": "string"
                  },
                  "place": {
                    "type": "string"
                  },
                  "note": {
                    "type": "string"
                  },
                  "story": {
                    "type": "string"
                  },
                  "colors": {
                    "type": "array",
                    "items": {
                      "properties": {
                        "code": {
                          "type": "string"
                        },
                        "name": {
                          "type": "string"
                        }
                      }
                    }
                  },
                  "sizes": {
                    "type": "array",
                    "items": {
                      "type": "string"
                    }
                  },
                  "variants": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "color_code": {
                          "type": "string"
                        },
                        "size": {
                          "type": "string"
                        },
                        "stock": {
                          "type": "number"
                        }
                      }
                    }
                  },
                  "main_image": {
                    "type": "string"
                  },
                  "images": {
                    "type": "array",
                    "items": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          }
        },
        "colorOutput": {
          "type": "object",
          "properties": {
            "code": {
              "type": "string"
            },
            "name": {
              "type": "string"
            }
          }
        },
        "productPutReq": {
          "type": "object",
          "properties": {
            "id": {
              "type": "number"
            },
            "category": {
              "type": "string"
            },
            "title": {
              "type": "string"
            },
            "description": {
              "type": "string"
            },
            "price": {
              "type": "number"
            },
            "texture": {
              "type": "string"
            },
            "wash": {
              "type": "string"
            },
            "place": {
              "type": "string"
            },
            "note": {
              "type": "string"
            },
            "story": {
              "type": "string"
            }
          }
        },
        "variantPutReq": {
          "type": "object",
          "properties": {
            "product_id": {
              "type": "number"
            },
            "variants": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "color_id": {
                    "type": "number"
                  },
                  "size": {
                    "type": "string"
                  },
                  "stock": {
                    "type": "number"
                  }
                }
              }
            }
          }
        },
        "variantDeleteReq": {
          "type": "object",
          "properties": {
            "product_id": {
              "type": "number"
            }
          }
        }
      },
      "components": {
        "securitySchemes": {
          "bearerAuth": {
            "type": "http",
            "description": "JWT Authorization header using the Bearer scheme.",
            "scheme": "bearer",
            "bearerFormat": "JWT"
          }
        }
      },
      "user": {
        "signInInput": {
          "type": "object",
          "properties": {
            "provider": {
              "type": "string"
            },
            "email": {
              "type": "string"
            },
            "password": {
              "type": "string"
            },
            "access_token": {
              "type": "string"
            }
          }
        },
        "signInOutput": {
          "type": "object",
          "properties": {
            "data": {
              "type": "object",
              "properties": {
                "access_token": {
                  "type": "string"
                },
                "access_expired": {
                  "type": "string"
                },
                "login_at": {
                  "type": "string"
                },
                "user": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "number"
                    },
                    "provider": {
                      "type": "string"
                    },
                    "name": {
                      "type": "string"
                    },
                    "email": {
                      "type": "string"
                    },
                    "picture": {
                      "type": "string"
                    },
                    "address": {
                      "type": "string"
                    },
                    "role": {
                      "type": "number"
                    }
                  }
                }
              }
            }
          }
        },
        "signUpInput": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string"
            },
            "email": {
              "type": "string"
            },
            "password": {
              "type": "string"
            }
          }
        },
        "signUpOutput": {
          "type": "object",
          "properties": {
            "data": {
              "type": "object",
              "properties": {
                "access_token": {
                  "type": "string"
                },
                "access_expired": {
                  "type": "number"
                },
                "user": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "number"
                    },
                    "provider": {
                      "type": "string"
                    },
                    "name": {
                      "type": "string"
                    },
                    "email": {
                      "type": "string"
                    },
                    "picture": {
                      "type": "string"
                    },
                    "address": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          }
        },
        "profileOutput": {
          "type": "object",
          "properties": {
            "data": {
              "type": "object",
              "properties": {
                "provider": {
                  "type": "string"
                },
                "name": {
                  "type": "string"
                },
                "email": {
                  "type": "string"
                },
                "picture": {
                  "type": "string"
                },
                "address": {
                  "type": "string"
                },
                "coupons": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "properties": {
                      "prefix": {
                        "type": "string"
                      },
                      "suffix": {
                        "type": "number"
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "Error": {
          "type": "object",
          "properties": {
            "error": {
              "type": "string"
            }
          }
        }
      }
    }
  }
  ```

  </details>

### User Collection

  <details>
  <summary>Schema</summary>

  ```json
  {
    "_id": {
      "$oid": "<user_id>"
    },
    "provider": "<user_provider>",
    "email": "<user_email>",
    "password": "<hashed_password>",
    "name": "<user_name>",
    "last_login_at": "<last_login_time>",
    "created_dt": "<created_time>",
    "updated_dt": "<updated_time>"
  }
  ```

  </details>

  <details>
  <summary>Example</summary>

  ```json
  {
    "_id": {
      "$oid": "625f74a91e550e315f321234"
    },
    "provider": "native",
    "email": "sean@sean.com",
    "password": "hashed_password",
    "name": "sean",
    "last_login_at": "2022-05-20T17:22:05+08:00",
    "created_dt": "2022-04-20T10:49:13+08:00",
    "updated_dt": "2022-05-20T17:22:05+08:00"
  }
  ```

  </details>

## Built With

<table>
  <tbody>
    <tr>
      <th text-align="center">Back-End</th>
      <th>Cloud-Service</th>
      <th>Front-End</th>
      <th>Tools</th>
    </tr>
    <tr>
      <td style="vertical-align:top">
        <li><a href="https://nodejs.org/en/">Node.js</a></li>
        <li><a href="https://expressjs.com/">Express.js</a></li>
        <li><a href="https://www.mongodb.com/">MongoDB</a></li>
        <li><a href="https://redis.io/">Redis</a></li>
        <li><a href="https://www.docker.com/">Docker</a></li>
        <li><a href="https://www.nginx.com/">Nginx</a></li>
      </td>
      <td style="vertical-align:top">
        <li><a href="https://aws.amazon.com/ec2/">Amazon EC2</a></li>
        <li><a href="https://aws.amazon.com/s3/">Amazon S3</a></li>
        <li><a href="https://aws.amazon.com/cloudfront/">Amazon CloudFront</a></li>
        <li><a href="https://aws.amazon.com/cloudwatch/">Amazon CloudWatch</a></li>
        <li><a href="https://aws.amazon.com/elasticache/">Amazon ElastiCache</a></li>
        <li><a href="https://aws.amazon.com/elasticloadbalancing/">Elastic Load Balancing</a></li>
        <li><a href="https://aws.amazon.com/autoscaling/">AWS Auto Scaling</a></li>
      </td>
      <td style="vertical-align:top">
        <li><a href="https://reactjs.org/">React.js</a></li>
        <li><a href="https://mui.com/">MUI</a></li>
        <li>HTML5</li>
        <li>CSS3</li>
        <li>JavaScript</li>
      </td>
      <td style="vertical-align:top">
        <li>Git, GitHub</li>
        <li><a href="https://swagger.io/tools/swaggerhub/">Swagger</a></li>
        <li><a href="https://k6.io/">K6</a></li>
        <li><a href="https://www.postman.com/">Postman</a></li>
        <li><a href="https://mochajs.org/">Mocha</a></li>
        <li><a href="https://www.chaijs.com/">Chai</a></li>
      </td>
    </tr>
  </tbody>
</table>

<p align="right"><a href="#top">back to top</a></p>

## Contact

- Author: Sean Ia̍p (Iàp Sîng Gān) (葉承彥)
- Email: iapsinggan@gmail.com