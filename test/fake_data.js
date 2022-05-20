const users = [
  {
    provider: 'native',
    email: 'test0@test.com',
    password: 'test0',
    name: 'test0',
  },
  {
    provider: 'native',
    email: 'test1@test.com',
    password: 'test1',
    name: 'test1',
  },
  {
    provider: 'native',
    email: 'test2@test.com',
    password: 'test2',
    name: 'test2',
  },
];

// four docs, stylish, stylish2, easy-notify, docubloom
const docs = [
  {
    servers: [
      {
        description: 'SwaggerHub API Auto Mocking',
        url: 'https://virtserver.swaggerhub.com/formosean/test1/1.0.0',
      },
      {
        description: 'SwaggerHub API Auto Mocking',
        url: 'https://vivaformosean.com',
      },
    ],
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'Stylish',
      description: 'User API description 123',
    },
    tags: [
      {
        name: 'Users',
        description: 'API for in the system',
      },
    ],
    consumes: [
      'application/json',
    ],
    produces: [
      'application/json',
    ],
    paths: {
      '/api/1.0/admin/analysis/sales': {
        get: {
          tags: [
            'Admins/Analysis',
          ],
          summary: 'get sales details by date',
          parameters: [
            {
              in: 'query',
              name: 'days',
              schema: {
                type: 'integer',
              },
              required: true,
              description: 'the number of days',
            },
          ],
          produces: [
            'application/json',
          ],
          responses: {
            200: {
              description: 'OK',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/user/profileOutput',
                  },
                  examples: {
                    sample1: {
                      value: {
                        data: [
                          {
                            day: '2021-10-23',
                            sales: 265658,
                            order: 21,
                          },
                          {
                            day: '2021-10-24',
                            sales: 207114,
                            order: 21,
                          },
                          {
                            day: '2021-10-25',
                            sales: 266399,
                            order: 27,
                          },
                        ],
                      },
                    },
                  },
                },
              },
            },
            401: {
              description: 'no token provided',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/user/Error',
                  },
                  examples: {
                    sample1: {
                      value: {
                        error: 'Unauthorized',
                      },
                    },
                  },
                },
              },
            },
            403: {
              description: 'normal user, not admin',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/user/Error',
                  },
                  examples: {
                    sample1: {
                      value: {
                        error: 'Forbidden',
                      },
                    },
                  },
                },
              },
            },
          },
          security: [
            {
              bearerAuth: [],
            },
          ],
        },
      },
      '/api/1.0/admin/analysis/user_consumption': {
        get: {
          tags: [
            'Admins/Analysis',
          ],
          summary: 'get customers consumption by date',
          parameters: [
            {
              in: 'query',
              name: 'days',
              schema: {
                type: 'integer',
              },
              required: true,
              description: 'number of days',
            },
            {
              in: 'query',
              name: 'rank',
              schema: {
                type: 'integer',
              },
              required: true,
              description: 'the rank number of customers',
            },
          ],
          produces: [
            'application/json',
          ],
          responses: {
            200: {
              description: 'OK',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/user/profileOutput',
                  },
                  examples: {
                    sample1: {
                      value: {
                        data: [
                          {
                            user_id: 1,
                            consumption: 739671,
                            name: '林鼎棋',
                            email: 'gn01168178@yahoo.com.tw',
                          },
                          {
                            user_id: 5,
                            consumption: 691155,
                            name: 'Chun Yu Lai',
                            email: 'lindazoro@yahoo.com.tw',
                          },
                          {
                            user_id: 4,
                            consumption: 340876,
                            name: '張峰林',
                            email: 'paulespling@gmail.com',
                          },
                          {
                            user_id: 3,
                            consumption: 278707,
                            name: '林師廷',
                            email: 'st920090@yahoo.com.tw',
                          },
                          {
                            user_id: 2,
                            consumption: 242464,
                            name: 'Wayne Chen',
                            email: 'wayne.swchen@gmail.com',
                          },
                        ],
                      },
                    },
                  },
                },
              },
            },
            401: {
              description: 'no token provided',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/user/Error',
                  },
                  examples: {
                    sample1: {
                      value: {
                        error: 'Unauthorized',
                      },
                    },
                  },
                },
              },
            },
            403: {
              description: 'normal user, not admin',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/user/Error',
                  },
                  examples: {
                    sample1: {
                      value: {
                        error: 'Forbidden',
                      },
                    },
                  },
                },
              },
            },
          },
          security: [
            {
              bearerAuth: [],
            },
          ],
        },
      },
      '/api/1.0/admin/coupons': {
        get: {
          tags: [
            'Admins/Coupons',
          ],
          summary: 'get all coupons',
          security: [
            {
              bearerAuth: [],
            },
          ],
          produces: [
            'application/json',
          ],
          responses: {
            200: {
              description: 'OK',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/user/profileOutput',
                  },
                  examples: {
                    sample1: {
                      value: {
                        data: [
                          {
                            id: 123,
                            prefix: 'DAY',
                            name: 1234567890,
                            expire_time: '2022-03-27',
                          },
                          {
                            id: 124,
                            prefix: 'WEEK',
                            name: 1234567890,
                            expire_time: '2022-03-27',
                          },
                          {
                            id: 126,
                            prefix: 'MONTH',
                            name: 1234567890,
                            expire_time: '2022-03-27',
                          },
                        ],
                      },
                    },
                  },
                },
              },
            },
            401: {
              description: 'no token provided',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/user/Error',
                  },
                  examples: {
                    sample1: {
                      value: {
                        error: 'Unauthorized',
                      },
                    },
                  },
                },
              },
            },
            403: {
              description: 'normal user, not admin',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/user/Error',
                  },
                  examples: {
                    sample1: {
                      value: {
                        error: 'Forbidden',
                      },
                    },
                  },
                },
              },
            },
          },
        },
        post: {
          tags: [
            'Admins/Coupons',
          ],
          summary: 'add new coupons',
          security: [
            {
              bearerAuth: [],
            },
          ],
          requestBody: {
            description: 'Coupon Object',
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/user/signInInput',
                },
                examples: {
                  DAY: {
                    value: {
                      prefix: 'DAY',
                      name: '1234567890',
                    },
                  },
                  WEEK: {
                    value: {
                      prefix: 'WEEK',
                      name: '1234567890',
                    },
                  },
                  MONTH: {
                    value: {
                      prefix: 'MONTH',
                      name: '1234567890',
                    },
                  },
                },
              },
            },
          },
          produces: [
            'application/json',
          ],
          responses: {
            200: {
              description: 'OK',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/products/couponCreateOutput',
                  },
                  examples: {
                    sample1: {
                      value: {
                        data: 'create succeed',
                      },
                    },
                  },
                },
              },
            },
            400: {
              description: 'coupon already exists',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/user/Error',
                  },
                  examples: {
                    'not exist': {
                      value: {
                        error: 'coupon already exists',
                      },
                    },
                  },
                },
              },
            },
          },
        },
        delete: {
          tags: [
            'Admins/Coupons',
          ],
          summary: 'delete a coupon',
          security: [
            {
              bearerAuth: [],
            },
          ],
          requestBody: {
            description: 'Coupon Object',
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/user/signInInput',
                },
                examples: {
                  sample1: {
                    value: {
                      data: 'Delete successfully',
                    },
                  },
                },
              },
            },
          },
          produces: [
            'application/json',
          ],
          responses: {
            200: {
              description: 'OK',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/user/profileOutput',
                  },
                  examples: {
                    sample1: {
                      value: {
                        data: 'deleted successfully',
                      },
                    },
                  },
                },
              },
            },
            400: {
              description: 'invalid input',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/user/Error',
                  },
                  examples: {
                    sample1: {
                      value: {
                        error: 'Invalid input',
                      },
                    },
                  },
                },
              },
            },
            409: {
              description: 'delete fail due to conflict',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/user/Error',
                  },
                  examples: {
                    sample1: {
                      value: {
                        error: 'Conflict',
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/api/1.0/admin/products': {
        post: {
          tags: [
            'Admins/Products',
          ],
          summary: 'admin adds new product',
          security: [
            {
              bearerAuth: [],
            },
          ],
          requestBody: {
            description: 'Product Object',
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/products/productPutReq',
                },
                examples: {
                  sample1: {
                    value: {
                      product_id: 202203241908499000,
                      title: '美味的義美小泡芙',
                      category: 'men',
                      description: 'description',
                      price: 100,
                      texture: 'test',
                      wash: 'test',
                      place: 'place',
                      note: 'note',
                      story: 'test',
                      variants: [
                        {
                          color_code: 'FFFFFF',
                          size: 'M',
                          stock: 10,
                        },
                        {
                          color_code: 'CCCCCC',
                          size: 'S',
                          stock: 10,
                        },
                      ],
                      main_image: 'https://vivaformosean-stylish.s3.ap-northeast-1.amazonaws.com/assets/202203241908499000/main',
                    },
                  },
                },
              },
            },
          },
          produces: [
            'application/json',
          ],
          responses: {
            200: {
              description: 'OK',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/user/profileOutput',
                  },
                  examples: {
                    sample1: {
                      value: {
                        product_id: 123,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        put: {
          tags: [
            'Admins/Products',
          ],
          summary: 'admin changes product',
          requestBody: {
            description: 'Product Object',
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/products/productPutReq',
                },
                example: {
                  product_id: 202203241908499000,
                  category: 'men',
                  title: '美味的義美大大大泡芙',
                  description: 'test',
                  price: 2000,
                  texture: '棉 100%',
                  wash: '水洗',
                  place: '中國',
                  note: '實品顏色依單品照為主',
                  story: 'O.N.S is all about options, which is why we took our staple polo shirt and upgraded it with slubby linen jersey, making it even lighter for those who prefer their summer style extra-breezy.',
                },
              },
            },
          },
          security: [
            {
              bearerAuth: [],
            },
          ],
          produces: [
            'application/json',
          ],
          responses: {
            200: {
              description: 'OK',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/user/profileOutput',
                  },
                  examples: {
                    sample1: {
                      value: {
                        data: 'Update OK',
                      },
                    },
                  },
                },
              },
            },
          },
        },
        delete: {
          tags: [
            'Admins/Products',
          ],
          summary: 'admin deletes product',
          security: [
            {
              bearerAuth: [],
            },
          ],
          requestBody: {
            description: 'Product Object',
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/products/productPutReq',
                },
                example: {
                  product_id: 202203241908499000,
                },
              },
            },
          },
          responses: {
            200: {
              description: 'OK',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/user/profileOutput',
                  },
                  examples: {
                    sample1: {
                      value: {
                        data: 'Delete successfully',
                      },
                    },
                  },
                },
              },
            },
            400: {
              description: 'Delete failed',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/user/profileOutput',
                  },
                  examples: {
                    sample1: {
                      value: {
                        error: "Delete failed, need to delete this product's variants first",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/api/1.0/admin/s3url': {
        get: {
          tags: [
            'Admins/Others',
          ],
          summary: 'get s3 upload image',
          produces: [
            'application/json',
          ],
          responses: {
            200: {
              description: 'OK',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/user/profileOutput',
                  },
                  examples: {
                    sample1: {
                      value: {
                        id: 22032312345123,
                        url: 'https://vivaformosean-stylish.s3.ap-northeast-1.amazonaws.com/73552f341c65d25d1b0ecd231018b6a0?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA3CAX7NLDGVMFW4WU%2F20220323%2Fap-northeast-1%2Fs3%2Faws4_request&X-Amz-Date=20220323T023444Z&X-Amz-Expires=60&X-Amz-Signature=d92b8b3faf381aebb5ef5f34d5b3dfe440b6adb25a4e0a1975319a67b9e6f057&X-Amz-SignedHeaders=host',
                      },
                    },
                  },
                },
              },
            },
          },
          security: [
            {
              bearerAuth: [],
            },
          ],
        },
      },
      '/api/1.0/admin/analysis/signup_number': {
        get: {
          tags: [
            'Admins/Analysis',
          ],
          summary: 'get sign-up number by date',
          parameters: [
            {
              in: 'query',
              name: 'days',
              schema: {
                type: 'integer',
              },
              required: true,
              description: 'due date',
            },
          ],
          produces: [
            'application/json',
          ],
          responses: {
            200: {
              description: '最上面會是最舊的',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/user/profileOutput',
                  },
                  examples: {
                    sample1: {
                      value: {
                        data: [
                          {
                            day: '2022-03-13',
                            signup_number: 5,
                          },
                          {
                            day: '2022-03-14',
                            signup_number: 33,
                          },
                          {
                            day: '2022-03-15',
                            signup_number: 29,
                          },
                          {
                            day: '2022-03-16',
                            signup_number: 29,
                          },
                          {
                            day: '2022-03-17',
                            signup_number: 24,
                          },
                          {
                            day: '2022-03-18',
                            signup_number: 21,
                          },
                          {
                            day: '2022-03-19',
                            signup_number: 36,
                          },
                          {
                            day: '2022-03-20',
                            signup_number: 22,
                          },
                          {
                            day: '2022-03-21',
                            signup_number: 1,
                          },
                        ],
                      },
                    },
                  },
                },
              },
            },
            401: {
              description: 'no token provided',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/user/Error',
                  },
                  examples: {
                    sample1: {
                      value: {
                        error: 'Unauthorized',
                      },
                    },
                  },
                },
              },
            },
            403: {
              description: 'normal user, not admin',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/user/Error',
                  },
                  examples: {
                    sample1: {
                      value: {
                        error: 'Forbidden',
                      },
                    },
                  },
                },
              },
            },
          },
          security: [
            {
              bearerAuth: [],
            },
          ],
        },
      },
      '/api/1.0/admin/products/stock': {
        post: {
          tags: [
            'Admins/Stock',
          ],
          summary: 'admin adds new variant stock',
          requestBody: {
            description: 'Product Object',
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/products/variantPutReq',
                },
                example: {
                  product_id: 201807201824,
                  variants: [
                    {
                      color_code: 'FFFFFF',
                      size: 'M',
                      stock: 5,
                    },
                    {
                      color_code: 'FFFFFF',
                      size: 'L',
                      stock: 10,
                    },
                  ],
                },
              },
            },
          },
          security: [
            {
              bearerAuth: [],
            },
          ],
          responses: {
            200: {
              description: 'OK',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/user/profileOutput',
                  },
                  examples: {
                    sample1: {
                      value: {
                        data: 'Create successed',
                      },
                    },
                  },
                },
              },
            },
          },
        },
        put: {
          tags: [
            'Admins/Stock',
          ],
          summary: 'admin changes a variant stock',
          requestBody: {
            description: 'Product Object',
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/products/variantPutReq',
                },
                example: {
                  product_id: 201807201824,
                  variants: [
                    {
                      color_code: 'FFFFFF',
                      size: 'S',
                      stock: 7,
                    },
                    {
                      color_code: 'DDFFBB',
                      size: 'S',
                      stock: 12,
                    },
                  ],
                },
              },
            },
          },
          security: [
            {
              bearerAuth: [],
            },
          ],
          responses: {
            200: {
              description: 'OK',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/user/profileOutput',
                  },
                  examples: {
                    sample1: {
                      value: {
                        data: 'Update OK',
                      },
                    },
                  },
                },
              },
            },
            400: {
              description: 'Update failed',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/user/profileOutput',
                  },
                  examples: {
                    sample1: {
                      value: {
                        error: 'Update failed due to invalid input',
                      },
                    },
                  },
                },
              },
            },
          },
        },
        delete: {
          tags: [
            'Admins/Stock',
          ],
          summary: 'admin delete multi variant stock with specific product_id',
          requestBody: {
            description: 'Product Object',
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/products/variantDeleteReq',
                },
                example: {
                  product_id: 202203241908499000,
                },
              },
            },
          },
          security: [
            {
              bearerAuth: [],
            },
          ],
          responses: {
            200: {
              description: 'OK',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/user/profileOutput',
                  },
                  examples: {
                    sample1: {
                      value: {
                        data: 'Delete successfully',
                      },
                    },
                  },
                },
              },
            },
            400: {
              description: 'Delete failed',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/user/profileOutput',
                  },
                  examples: {
                    sample1: {
                      value: {
                        error: 'Delete failed due to invalid input',
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/api/1.0/admin/user_coupons': {
        get: {
          tags: [
            'Admins/User_coupons',
          ],
          summary: 'get coupons from a user',
          security: [
            {
              bearerAuth: [],
            },
          ],
          requestBody: {
            description: 'Coupon Object',
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/user/signInInput',
                },
                examples: {
                  sample1: {
                    value: {
                      user_id: 10060,
                    },
                  },
                },
              },
            },
          },
          produces: [
            'application/json',
          ],
          responses: {
            200: {
              description: 'OK',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/user/profileOutput',
                  },
                  examples: {
                    sample1: {
                      value: {
                        data: {
                          user_coupon_table: [
                            {
                              id: 11,
                              user_id: 10060,
                              coupon_id: 1,
                              can_use: 0,
                            },
                            {
                              id: 12,
                              user_id: 10060,
                              coupon_id: 2,
                              can_use: 1,
                            },
                            {
                              id: 13,
                              user_id: 10060,
                              coupon_id: 3,
                              can_use: 0,
                            },
                          ],
                        },
                      },
                    },
                  },
                },
              },
            },
            400: {
              description: "Client's fault",
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/products/couponCreateOutput',
                  },
                  examples: {
                    sample1: {
                      value: {
                        error: 'Read failed due to invalid input',
                      },
                    },
                  },
                },
              },
            },
            500: {
              description: "Server's fault",
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/products/couponCreateOutput',
                  },
                  examples: {
                    sample1: {
                      value: {
                        error: 'Read failed',
                      },
                    },
                  },
                },
              },
            },
          },
        },
        post: {
          tags: [
            'Admins/User_coupons',
          ],
          summary: 'add a new coupon to a customer',
          security: [
            {
              bearerAuth: [],
            },
          ],
          requestBody: {
            description: 'Coupon ID and User ID',
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/user/signInInput',
                },
                examples: {
                  sample1: {
                    value: {
                      coupon_id: 12,
                      user_id: 10060,
                    },
                  },
                },
              },
            },
          },
          produces: [
            'application/json',
          ],
          responses: {
            200: {
              description: 'OK',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/products/couponCreateOutput',
                  },
                  examples: {
                    sample1: {
                      value: {
                        data: 'Create successfully',
                      },
                    },
                  },
                },
              },
            },
            400: {
              description: "Client's fault",
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/products/couponCreateOutput',
                  },
                  examples: {
                    sample1: {
                      value: {
                        error: 'Create failed due to invalid input',
                      },
                    },
                  },
                },
              },
            },
            500: {
              description: "Server's fault",
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/products/couponCreateOutput',
                  },
                  examples: {
                    sample1: {
                      value: {
                        error: 'Create failed',
                      },
                    },
                  },
                },
              },
            },
          },
        },
        delete: {
          tags: [
            'Admins/User_coupons',
          ],
          summary: 'delete a coupon from a user',
          security: [
            {
              bearerAuth: [],
            },
          ],
          requestBody: {
            description: 'Coupon Object',
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/user/signInInput',
                },
                examples: {
                  sample1: {
                    value: {
                      id: 14,
                    },
                  },
                },
              },
            },
          },
          produces: [
            'application/json',
          ],
          responses: {
            200: {
              description: 'OK',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/user/profileOutput',
                  },
                  examples: {
                    sample1: {
                      value: {
                        data: 'Delete successfully',
                      },
                    },
                  },
                },
              },
            },
            400: {
              description: "Client's fault",
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/products/couponCreateOutput',
                  },
                  examples: {
                    sample1: {
                      value: {
                        error: 'Delete failed due to invalid input',
                      },
                    },
                  },
                },
              },
            },
            500: {
              description: "Server's fault",
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/products/couponCreateOutput',
                  },
                  examples: {
                    sample1: {
                      value: {
                        error: 'Delete failed',
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/api/1.0/products/colors': {
        get: {
          tags: [
            'Products',
          ],
          summary: 'get color table',
          produces: [
            'application/json',
          ],
          responses: {
            200: {
              description: 'OK',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#products/colorOutput',
                  },
                  example: {
                    data: [
                      {
                        code: 'FFFFFF',
                        name: '白色',
                      },
                      {
                        code: 'DDFFBB',
                        name: '亮綠',
                      },
                      {
                        code: 'CCCCCC',
                        name: '淺灰',
                      },
                      {
                        code: 'BB7744',
                        name: '淺棕',
                      },
                      {
                        code: 'DDF0FF',
                        name: '淺藍',
                      },
                      {
                        code: '334455',
                        name: '深藍',
                      },
                      {
                        code: 'FFDDDD',
                        name: '粉紅',
                      },
                    ],
                  },
                },
              },
            },
          },
        },
      },
      '/api/1.0/order/checkout': {
        post: {
          tags: [
            'Order',
          ],
          summary: 'user set orders',
          parameters: [
            {
              in: 'header',
              name: 'x-api-key',
              schema: {
                type: 'string',
              },
              required: true,
              description: 'tapPay partner key',
              example: 'partner_PHgswvYEk4QY6oy3n8X3CwiQCVQmv91ZcFoD5VrkGFXo8N7BFiLUxzeG',
            },
            {
              in: 'header',
              name: 'Content-Type',
              schema: {
                type: 'string',
              },
              required: true,
              description: 'Content-Type',
              example: 'application/json',
            },
          ],
          requestBody: {
            description: 'Product Object',
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/products/variantPutReq',
                },
                example: {
                  prime: '5a9e4f3bee17ff9d95ba456d26543ce825fbb31703b390f38031152cf3f302b2',
                  order: {
                    shipping: 'delivery',
                    payment: 'credit_card',
                    subtotal: 1234,
                    freight: 14,
                    total: 1300,
                    recipient: {
                      name: 'Luke',
                      phone: '0987654321',
                      email: 'luke@gmail.com',
                      address: '市政府站',
                      time: 'morning',
                    },
                    list: [
                      {
                        id: '201807202157',
                        name: 'qwert',
                        price: 1299,
                        color: {
                          code: '#FFFFFF',
                          name: 'white',
                        },
                        size: 'L',
                        qty: 10,
                      },
                      {
                        id: 'qwertr',
                        name: 'qwert',
                        price: 1299,
                        color: {
                          code: '#FFFFFF',
                          name: 'white',
                        },
                        size: 'L',
                        qty: 10,
                      },
                    ],
                  },
                  coupon_id: 13,
                },
              },
            },
          },
          security: [
            {
              bearerAuth: [],
            },
          ],
          responses: {
            200: {
              description: 'OK',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/user/profileOutput',
                  },
                  examples: {
                    sample1: {
                      value: {
                        data: {
                          number: '221484290010',
                        },
                      },
                    },
                  },
                },
              },
            },
            401: {
              description: 'no token provided',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/user/Error',
                  },
                  examples: {
                    'wrong order format': {
                      value: {
                        error: 'Create Order Error: Wrong Data Format',
                      },
                    },
                    'invalid prime': {
                      value: {
                        error: 'Invalid prime',
                      },
                    },
                    'coupon already used': {
                      value: {
                        error: 'This coupon has been used',
                      },
                    },
                  },
                },
              },
            },
            403: {
              description: 'wrong token',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/user/Error',
                  },
                  examples: {
                    sample1: {
                      value: {
                        error: 'Forbidden',
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/api/1.0/products/{category}': {
        get: {
          tags: [
            'Products',
          ],
          summary: 'fetch products info',
          produces: [
            'application/json',
          ],
          parameters: [
            {
              in: 'path',
              name: 'category',
              schema: {
                type: 'string',
              },
              required: true,
              description: 'category',
              examples: {
                all: {
                  value: 'all',
                },
                women: {
                  value: 'women',
                },
                men: {
                  value: 'men',
                },
                accessories: {
                  value: 'accessories',
                },
              },
            },
            {
              in: 'query',
              name: 'paging',
              schema: {
                type: 'number',
              },
              required: false,
              description: 'page',
            },
          ],
          responses: {
            200: {
              description: 'OK',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/products/productsOutput',
                  },
                  example: {
                    data: [
                      {
                        id: 1234,
                        category: 'men',
                        title: '厚實毛呢格子外套',
                        description: '高抗寒素材選用，保暖也時尚有型',
                        price: 2200,
                        texture: '棉、聚脂纖維',
                        wash: '手洗（水溫40度',
                        place: '韓國',
                        note: '實品顏色以單品照為主',
                        story: '你絕對不能錯過的超值商品',
                        colors: [
                          {
                            code: '334455',
                            name: '深藍',
                          },
                          {
                            code: 'FFFFFF',
                            name: '白色',
                          },
                        ],
                        sizes: [
                          'S',
                          'M',
                        ],
                        variants: [
                          {
                            color_code: '334455',
                            size: 'S',
                            stock: 5,
                          },
                          {
                            color_code: '334455',
                            size: 'M',
                            stock: 10,
                          },
                          {
                            color_code: 'FFFFFF',
                            size: 'S',
                            stock: 0,
                          },
                          {
                            color_code: 'FFFFFF',
                            size: 'M',
                            stock: 2,
                          },
                        ],
                        main_image: 'string',
                        images: [
                          'https://stylish.com/0.jpg',
                          'https://stylish.com/1.jpg',
                          'https://stylish.com/2.jpg',
                        ],
                      },
                      {
                        id: 5678,
                        category: 'men',
                        title: '厚實毛呢格子外套',
                        description: '高抗寒素材選用，保暖也時尚有型',
                        price: 2200,
                        texture: '棉、聚脂纖維',
                        wash: '手洗（水溫40度',
                        place: '韓國',
                        note: '實品顏色以單品照為主',
                        story: '你絕對不能錯過的超值商品',
                        colors: [
                          {
                            code: '334455',
                            name: '深藍',
                          },
                        ],
                        sizes: [
                          'S',
                          'M',
                          'L',
                        ],
                        variants: [
                          {
                            color_code: '334455',
                            size: 'S',
                            stock: 5,
                          },
                          {
                            color_code: '334455',
                            size: 'M',
                            stock: 10,
                          },
                          {
                            color_code: '334455',
                            size: 'L',
                            stock: 0,
                          },
                        ],
                        main_image: 'https://stylish.com/main.jpg',
                        images: [
                          'https://stylish.com/0.jpg',
                          'https://stylish.com/1.jpg',
                          'https://stylish.com/2.jpg',
                        ],
                      },
                    ],
                  },
                },
              },
            },
          },
        },
      },
      'https://vivaformosean.com/s3test/index.html': {
        get: {
          tags: [
            'S3',
          ],
          summary: '上傳到S3的測試處',
          description: '選擇圖片按下上傳鈕之後，會打一個請求給後端得到(1)上傳網址，然後再打一個請求把圖片傳到該網址，最後就會得到(2)該圖片的網址。log會出現兩個網址，分別是(1)和(2)',
        },
      },
      'https://vivaformosean.com/customers.html': {
        get: {
          tags: [
            'Socket',
          ],
          summary: 'Socket的顧客房間(要等店員先開)',
          description: '等店員頁面開好後，再開這個頁面測試，可以重複開',
        },
      },
      'https://vivaformosean.com/staff.html': {
        get: {
          tags: [
            'Socket',
          ],
          summary: 'Socket的店員房間(要先開著)',
          description: '開好這個網頁後，再去開顧客的頁面測試。可以從這個頁面的console看到顧客傳來的訊息和roomID',
        },
      },
      '/api/1.0/user/coupon': {
        get: {
          tags: [
            'Users',
          ],
          summary: 'get user coupon',
          produces: [
            'application/json',
          ],
          responses: {
            200: {
              description: 'OK',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/user/profileOutput',
                  },
                  example: {
                    data: [
                      {
                        prefix: 'WEEK',
                        name: 'test5',
                        expire_time: '2022-03-27',
                        coupon_id: 1,
                        can_use: false,
                      },
                      {
                        prefix: 'DAY',
                        name: 'test5',
                        expire_time: '2022-03-21',
                        coupon_id: 2,
                        can_use: true,
                      },
                      {
                        prefix: 'MONTH',
                        name: 'test',
                        expire_time: '2022-04-19',
                        coupon_id: 3,
                        can_use: false,
                      },
                    ],
                  },
                },
              },
            },
            401: {
              description: 'No token provided',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/user/Error',
                  },
                  examples: {
                    sample1: {
                      value: {
                        error: 'Unauthorized',
                      },
                    },
                  },
                },
              },
            },
            403: {
              description: 'wrong token',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/user/Error',
                  },
                  examples: {
                    sample1: {
                      value: {
                        error: 'Forbidden',
                      },
                    },
                  },
                },
              },
            },
          },
          security: [
            {
              bearerAuth: [],
            },
          ],
        },
      },
      '/api/1.0/user/profile': {
        get: {
          tags: [
            'Users',
          ],
          summary: 'get user profile',
          produces: [
            'application/json',
          ],
          responses: {
            200: {
              description: 'OK',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/user/profileOutput',
                  },
                  example: {
                    data: {
                      provider: 'facebook',
                      name: 'Pei',
                      email: 'pei@gmail.com',
                      picture: 'https://graph.facebook.com/123481231233/picture?type=large',
                      address: '100台北市中正區仁愛路二段100號',
                    },
                  },
                },
              },
            },
            401: {
              description: 'No token provided',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/user/Error',
                  },
                  examples: {
                    sample1: {
                      value: {
                        error: 'Unauthorized',
                      },
                    },
                  },
                },
              },
            },
            403: {
              description: 'wrong token',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/user/Error',
                  },
                  examples: {
                    sample1: {
                      value: {
                        error: 'Forbidden',
                      },
                    },
                  },
                },
              },
            },
          },
          security: [
            {
              bearerAuth: [],
            },
          ],
        },
      },
      '/api/1.0/user/signin': {
        post: {
          tags: [
            'Users',
          ],
          summary: 'User sign in through native/google/facebook',
          requestBody: {
            description: 'User Object',
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/user/signInInput',
                },
                examples: {
                  native: {
                    value: {
                      provider: 'native',
                      email: 'test2@test.com',
                      password: 'test',
                    },
                  },
                  google: {
                    value: {
                      provider: 'google',
                      access_token: 'ya29.A0ARrdaM_Txv53OQbHRgJEUbeAfYrL2yLvCiXdXmFqrXviQzw5Za6TqoW00B7lc-75_mOcv620zMQuzydU6zzeJXatXOGr5kELWYxgr0eP479860KBiY5-WKxs6b-y7j1UbLXI6Xri4_EuQlvwt0l7Gwh94bSTa',
                    },
                  },
                },
              },
            },
          },
          produces: [
            'application/json',
          ],
          responses: {
            200: {
              description: 'OK',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/user/signInOutput',
                  },
                  example: {
                    data: {
                      access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm92aWRlciI6Imdvb2dsZSIsIm5hbWUiOiLokYnmib_lvaUiLCJlbWFpbCI6InIwODEyNDAwOUBnLm50dS5lZHUudHciLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUFUWEFKeHZ6bEM0NmFPOWtlcHpKSUtMdkFvVHhqRkFxX3h6N2JLUmh3RHE9czk2LWMiLCJpYXQiOjE2NDc1ODk0OTR9.oxkog5IvVVsmgTnyT7-fV7GNhvKz3j_nFR2hMt1osSU',
                      access_expired: '2592000',
                      login_at: '2022-03-18T07:44:54.992Z',
                      user: {
                        id: 10252,
                        provider: 'native',
                        name: 'abc',
                        email: 'abc@abc.com',
                        picture: 'https://lh3.googleusercontent.com/a/AATXAJxvzlC46aO9kepzJIKLvAoTxjFAq_xz7bKRhwDq=s96-c',
                        address: '100台北市中正區仁愛路二段100號',
                        role: 2,
                      },
                    },
                  },
                },
              },
            },
            400: {
              description: 'no token provided',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/user/Error',
                  },
                  example: {
                    error: 'Request Error: access token is required.',
                  },
                },
              },
            },
            403: {
              description: 'wrong provider or access_token',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/user/Error',
                  },
                  examples: {
                    'wrong access token': {
                      value: {
                        error: 'Permissions Error: facebook access token is wrong',
                      },
                    },
                    'wrong provider': {
                      value: {
                        error: 'Wrong Request',
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/api/1.0/user/signup': {
        post: {
          tags: [
            'Users',
          ],
          summary: 'Create a new User',
          requestBody: {
            description: 'User Object',
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/user/signUpInput',
                },
                example: {
                  name: 'abc',
                  email: 'abc@abc.com',
                  password: 'abc',
                },
              },
            },
          },
          produces: [
            'application/json',
          ],
          responses: {
            200: {
              description: 'OK',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/user/signUpOutput',
                  },
                  example: {
                    data: {
                      access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm92aWRlciI6Im5hdGl2ZSIsIm5hbWUiOiJ0ZXN0IiwiZW1haWwiOiJ0ZXN0NEB0ZXN0LmNvbSIsInBpY3R1cmUiOiJodHRwczovL2Nkbi1pY29ucy1wbmcuZmxhdGljb24uY29tLzUxMi82MTYvNjE2NDMwLnBuZyIsImlhdCI6MTY0NzU4ODY3M30.fk4Gd3NtomuSlTpp954f9k0uipNFGtlBlqX1GHv-Iyg',
                      access_expired: '2592000',
                      login_at: '2022-03-18T07:31:13.851Z',
                      user: {
                        id: 10254,
                        provider: 'native',
                        name: 'abc',
                        email: 'abc@abc.com',
                        picture: 'https://cdn-icons-png.flaticon.com/512/616/616430.png',
                        address: '100台北市中正區仁愛路二段100號',
                      },
                    },
                  },
                },
              },
            },
            400: {
              description: "user's fault",
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/user/Error',
                  },
                  examples: {
                    'no name, email, or password': {
                      value: {
                        error: 'Request Error: name, email and password are required.',
                      },
                    },
                  },
                },
              },
            },
            403: {
              description: "user's fault",
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/user/Error',
                  },
                  examples: {
                    'email exists': {
                      value: {
                        error: 'Email Already Exists',
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    products: {
      couponCreateOutput: {
        type: 'object',
        properties: {
          data: {
            type: 'object',
            properties: {
              coupon_id: {
                type: 'number',
              },
            },
          },
        },
      },
      productsOutput: {
        type: 'object',
        properties: {
          data: {
            type: 'array',
            items: {
              properties: {
                id: {
                  type: 'number',
                },
                category: {
                  type: 'string',
                },
                title: {
                  type: 'string',
                },
                description: {
                  type: 'string',
                },
                price: {
                  type: 'number',
                },
                wash: {
                  type: 'string',
                },
                place: {
                  type: 'string',
                },
                note: {
                  type: 'string',
                },
                story: {
                  type: 'string',
                },
                colors: {
                  type: 'array',
                  items: {
                    properties: {
                      code: {
                        type: 'string',
                      },
                      name: {
                        type: 'string',
                      },
                    },
                  },
                },
                sizes: {
                  type: 'array',
                  items: {
                    type: 'string',
                  },
                },
                variants: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      color_code: {
                        type: 'string',
                      },
                      size: {
                        type: 'string',
                      },
                      stock: {
                        type: 'number',
                      },
                    },
                  },
                },
                main_image: {
                  type: 'string',
                },
                images: {
                  type: 'array',
                  items: {
                    type: 'string',
                  },
                },
              },
            },
          },
        },
      },
      colorOutput: {
        type: 'object',
        properties: {
          code: {
            type: 'string',
          },
          name: {
            type: 'string',
          },
        },
      },
      productPutReq: {
        type: 'object',
        properties: {
          id: {
            type: 'number',
          },
          category: {
            type: 'string',
          },
          title: {
            type: 'string',
          },
          description: {
            type: 'string',
          },
          price: {
            type: 'number',
          },
          texture: {
            type: 'string',
          },
          wash: {
            type: 'string',
          },
          place: {
            type: 'string',
          },
          note: {
            type: 'string',
          },
          story: {
            type: 'string',
          },
        },
      },
      variantPutReq: {
        type: 'object',
        properties: {
          product_id: {
            type: 'number',
          },
          variants: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                color_id: {
                  type: 'number',
                },
                size: {
                  type: 'string',
                },
                stock: {
                  type: 'number',
                },
              },
            },
          },
        },
      },
      variantDeleteReq: {
        type: 'object',
        properties: {
          product_id: {
            type: 'number',
          },
        },
      },
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          description: 'JWT Authorization header using the Bearer scheme.',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    user: {
      signInInput: {
        type: 'object',
        properties: {
          provider: {
            type: 'string',
          },
          email: {
            type: 'string',
          },
          password: {
            type: 'string',
          },
          access_token: {
            type: 'string',
          },
        },
      },
      signInOutput: {
        type: 'object',
        properties: {
          data: {
            type: 'object',
            properties: {
              access_token: {
                type: 'string',
              },
              access_expired: {
                type: 'string',
              },
              login_at: {
                type: 'string',
              },
              user: {
                type: 'object',
                properties: {
                  id: {
                    type: 'number',
                  },
                  provider: {
                    type: 'string',
                  },
                  name: {
                    type: 'string',
                  },
                  email: {
                    type: 'string',
                  },
                  picture: {
                    type: 'string',
                  },
                  address: {
                    type: 'string',
                  },
                  role: {
                    type: 'number',
                  },
                },
              },
            },
          },
        },
      },
      signUpInput: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
          },
          email: {
            type: 'string',
          },
          password: {
            type: 'string',
          },
        },
      },
      signUpOutput: {
        type: 'object',
        properties: {
          data: {
            type: 'object',
            properties: {
              access_token: {
                type: 'string',
              },
              access_expired: {
                type: 'number',
              },
              user: {
                type: 'object',
                properties: {
                  id: {
                    type: 'number',
                  },
                  provider: {
                    type: 'string',
                  },
                  name: {
                    type: 'string',
                  },
                  email: {
                    type: 'string',
                  },
                  picture: {
                    type: 'string',
                  },
                  address: {
                    type: 'string',
                  },
                },
              },
            },
          },
        },
      },
      profileOutput: {
        type: 'object',
        properties: {
          data: {
            type: 'object',
            properties: {
              provider: {
                type: 'string',
              },
              name: {
                type: 'string',
              },
              email: {
                type: 'string',
              },
              picture: {
                type: 'string',
              },
              address: {
                type: 'string',
              },
              coupons: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    prefix: {
                      type: 'string',
                    },
                    suffix: {
                      type: 'number',
                    },
                  },
                },
              },
            },
          },
        },
      },
      Error: {
        type: 'object',
        properties: {
          error: {
            type: 'string',
          },
        },
      },
    },
  },
  {
    servers: [
      {
        description: 'SwaggerHub API Auto Mocking',
        url: 'https://vivaformosean.com',
      },
    ],
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'Stylish2',
      description: 'User API description',
    },
    tags: [
      {
        name: 'Users',
        description: 'API for in the system',
      },
    ],
    consumes: [
      'application/json',
    ],
    produces: [
      'application/json',
    ],
    paths: {
      '/api/1.0/admin/analysis/sales': {
        get: {
          tags: [
            'Admins/Analysis',
          ],
          summary: 'get sales details by date',
          parameters: [
            {
              in: 'query',
              name: 'days',
              schema: {
                type: 'integer',
              },
              required: true,
              description: 'the number of days',
            },
          ],
          produces: [
            'application/json',
          ],
          responses: {
            200: {
              description: 'OK',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/user/profileOutput',
                  },
                  examples: {
                    sample1: {
                      value: {
                        data: [
                          {
                            day: '2021-10-23',
                            sales: 265658,
                            order: 21,
                          },
                          {
                            day: '2021-10-24',
                            sales: 207114,
                            order: 21,
                          },
                          {
                            day: '2021-10-25',
                            sales: 266399,
                            order: 27,
                          },
                        ],
                      },
                    },
                  },
                },
              },
            },
            401: {
              description: 'no token provided',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/user/Error',
                  },
                  examples: {
                    sample1: {
                      value: {
                        error: 'Unauthorized',
                      },
                    },
                  },
                },
              },
            },
            403: {
              description: 'normal user, not admin',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/user/Error',
                  },
                  examples: {
                    sample1: {
                      value: {
                        error: 'Forbidden',
                      },
                    },
                  },
                },
              },
            },
          },
          security: [
            {
              bearerAuth: [],
            },
          ],
        },
      },
      '/api/1.0/admin/analysis/user_consumption': {
        get: {
          tags: [
            'Admins/Analysis',
          ],
          summary: 'get customers consumption by date',
          parameters: [
            {
              in: 'query',
              name: 'days',
              schema: {
                type: 'integer',
              },
              required: true,
              description: 'number of days',
            },
            {
              in: 'query',
              name: 'rank',
              schema: {
                type: 'integer',
              },
              required: true,
              description: 'the rank number of customers',
            },
          ],
          produces: [
            'application/json',
          ],
          responses: {
            200: {
              description: 'OK',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/user/profileOutput',
                  },
                  examples: {
                    sample1: {
                      value: {
                        data: [
                          {
                            user_id: 1,
                            consumption: 739671,
                            name: '林鼎棋',
                            email: 'gn01168178@yahoo.com.tw',
                          },
                          {
                            user_id: 5,
                            consumption: 691155,
                            name: 'Chun Yu Lai',
                            email: 'lindazoro@yahoo.com.tw',
                          },
                          {
                            user_id: 4,
                            consumption: 340876,
                            name: '張峰林',
                            email: 'paulespling@gmail.com',
                          },
                          {
                            user_id: 3,
                            consumption: 278707,
                            name: '林師廷',
                            email: 'st920090@yahoo.com.tw',
                          },
                          {
                            user_id: 2,
                            consumption: 242464,
                            name: 'Wayne Chen',
                            email: 'wayne.swchen@gmail.com',
                          },
                        ],
                      },
                    },
                  },
                },
              },
            },
            401: {
              description: 'no token provided',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/user/Error',
                  },
                  examples: {
                    sample1: {
                      value: {
                        error: 'Unauthorized',
                      },
                    },
                  },
                },
              },
            },
            403: {
              description: 'normal user, not admin',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/user/Error',
                  },
                  examples: {
                    sample1: {
                      value: {
                        error: 'Forbidden',
                      },
                    },
                  },
                },
              },
            },
          },
          security: [
            {
              bearerAuth: [],
            },
          ],
        },
      },
      '/api/1.0/admin/coupons': {
        get: {
          tags: [
            'Admins/Coupons',
          ],
          summary: 'get all coupons',
          security: [
            {
              bearerAuth: [],
            },
          ],
          produces: [
            'application/json',
          ],
          responses: {
            200: {
              description: 'OK',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/user/profileOutput',
                  },
                  examples: {
                    sample1: {
                      value: {
                        data: [
                          {
                            id: 123,
                            prefix: 'DAY',
                            name: 1234567890,
                            expire_time: '2022-03-27',
                          },
                          {
                            id: 124,
                            prefix: 'WEEK',
                            name: 1234567890,
                            expire_time: '2022-03-27',
                          },
                          {
                            id: 126,
                            prefix: 'MONTH',
                            name: 1234567890,
                            expire_time: '2022-03-27',
                          },
                        ],
                      },
                    },
                  },
                },
              },
            },
            401: {
              description: 'no token provided',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/user/Error',
                  },
                  examples: {
                    sample1: {
                      value: {
                        error: 'Unauthorized',
                      },
                    },
                  },
                },
              },
            },
            403: {
              description: 'normal user, not admin',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/user/Error',
                  },
                  examples: {
                    sample1: {
                      value: {
                        error: 'Forbidden',
                      },
                    },
                  },
                },
              },
            },
          },
        },
        post: {
          tags: [
            'Admins/Coupons',
          ],
          summary: 'add new coupons',
          security: [
            {
              bearerAuth: [],
            },
          ],
          requestBody: {
            description: 'Coupon Object',
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/user/signInInput',
                },
                examples: {
                  DAY: {
                    value: {
                      prefix: 'DAY',
                      name: '1234567890',
                    },
                  },
                  WEEK: {
                    value: {
                      prefix: 'WEEK',
                      name: '1234567890',
                    },
                  },
                  MONTH: {
                    value: {
                      prefix: 'MONTH',
                      name: '1234567890',
                    },
                  },
                },
              },
            },
          },
          produces: [
            'application/json',
          ],
          responses: {
            200: {
              description: 'OK',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/products/couponCreateOutput',
                  },
                  examples: {
                    sample1: {
                      value: {
                        data: 'create succeed',
                      },
                    },
                  },
                },
              },
            },
            400: {
              description: 'coupon already exists',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/user/Error',
                  },
                  examples: {
                    'not exist': {
                      value: {
                        error: 'coupon already exists',
                      },
                    },
                  },
                },
              },
            },
          },
        },
        delete: {
          tags: [
            'Admins/Coupons',
          ],
          summary: 'delete a coupon',
          security: [
            {
              bearerAuth: [],
            },
          ],
          requestBody: {
            description: 'Coupon Object',
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/user/signInInput',
                },
                examples: {
                  sample1: {
                    value: {
                      data: 'Delete successfully',
                    },
                  },
                },
              },
            },
          },
          produces: [
            'application/json',
          ],
          responses: {
            200: {
              description: 'OK',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/user/profileOutput',
                  },
                  examples: {
                    sample1: {
                      value: {
                        data: 'deleted successfully',
                      },
                    },
                  },
                },
              },
            },
            400: {
              description: 'invalid input',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/user/Error',
                  },
                  examples: {
                    sample1: {
                      value: {
                        error: 'Invalid input',
                      },
                    },
                  },
                },
              },
            },
            409: {
              description: 'delete fail due to conflict',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/user/Error',
                  },
                  examples: {
                    sample1: {
                      value: {
                        error: 'Conflict',
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/api/1.0/admin/products': {
        post: {
          tags: [
            'Admins/Products',
          ],
          summary: 'admin adds new product',
          security: [
            {
              bearerAuth: [],
            },
          ],
          requestBody: {
            description: 'Product Object',
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/products/productPutReq',
                },
                examples: {
                  sample1: {
                    value: {
                      product_id: 202203241908499000,
                      title: '美味的義美小泡芙',
                      category: 'men',
                      description: 'description',
                      price: 100,
                      texture: 'test',
                      wash: 'test',
                      place: 'place',
                      note: 'note',
                      story: 'test',
                      variants: [
                        {
                          color_code: 'FFFFFF',
                          size: 'M',
                          stock: 10,
                        },
                        {
                          color_code: 'CCCCCC',
                          size: 'S',
                          stock: 10,
                        },
                      ],
                      main_image: 'https://vivaformosean-stylish.s3.ap-northeast-1.amazonaws.com/assets/202203241908499000/main',
                    },
                  },
                },
              },
            },
          },
          produces: [
            'application/json',
          ],
          responses: {
            200: {
              description: 'OK',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/user/profileOutput',
                  },
                  examples: {
                    sample1: {
                      value: {
                        product_id: 123,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        put: {
          tags: [
            'Admins/Products',
          ],
          summary: 'admin changes product',
          requestBody: {
            description: 'Product Object',
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/products/productPutReq',
                },
                example: {
                  product_id: 202203241908499000,
                  category: 'men',
                  title: '美味的義美大大大泡芙',
                  description: 'test',
                  price: 2000,
                  texture: '棉 100%',
                  wash: '水洗',
                  place: '中國',
                  note: '實品顏色依單品照為主',
                  story: 'O.N.S is all about options, which is why we took our staple polo shirt and upgraded it with slubby linen jersey, making it even lighter for those who prefer their summer style extra-breezy.',
                },
              },
            },
          },
          security: [
            {
              bearerAuth: [],
            },
          ],
          produces: [
            'application/json',
          ],
          responses: {
            200: {
              description: 'OK',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/user/profileOutput',
                  },
                  examples: {
                    sample1: {
                      value: {
                        data: 'Update OK',
                      },
                    },
                  },
                },
              },
            },
          },
        },
        delete: {
          tags: [
            'Admins/Products',
          ],
          summary: 'admin deletes product',
          security: [
            {
              bearerAuth: [],
            },
          ],
          requestBody: {
            description: 'Product Object',
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/products/productPutReq',
                },
                example: {
                  product_id: 202203241908499000,
                },
              },
            },
          },
          responses: {
            200: {
              description: 'OK',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/user/profileOutput',
                  },
                  examples: {
                    sample1: {
                      value: {
                        data: 'Delete successfully',
                      },
                    },
                  },
                },
              },
            },
            400: {
              description: 'Delete failed',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/user/profileOutput',
                  },
                  examples: {
                    sample1: {
                      value: {
                        error: "Delete failed, need to delete this product's variants first",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/api/1.0/admin/s3url': {
        get: {
          tags: [
            'Admins/Others',
          ],
          summary: 'get s3 upload image',
          produces: [
            'application/json',
          ],
          responses: {
            200: {
              description: 'OK',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/user/profileOutput',
                  },
                  examples: {
                    sample1: {
                      value: {
                        id: 22032312345123,
                        url: 'https://vivaformosean-stylish.s3.ap-northeast-1.amazonaws.com/73552f341c65d25d1b0ecd231018b6a0?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA3CAX7NLDGVMFW4WU%2F20220323%2Fap-northeast-1%2Fs3%2Faws4_request&X-Amz-Date=20220323T023444Z&X-Amz-Expires=60&X-Amz-Signature=d92b8b3faf381aebb5ef5f34d5b3dfe440b6adb25a4e0a1975319a67b9e6f057&X-Amz-SignedHeaders=host',
                      },
                    },
                  },
                },
              },
            },
          },
          security: [
            {
              bearerAuth: [],
            },
          ],
        },
      },
      '/api/1.0/admin/analysis/signup_number': {
        get: {
          tags: [
            'Admins/Analysis',
          ],
          summary: 'get sign-up number by date',
          parameters: [
            {
              in: 'query',
              name: 'days',
              schema: {
                type: 'integer',
              },
              required: true,
              description: 'due date',
            },
          ],
          produces: [
            'application/json',
          ],
          responses: {
            200: {
              description: '最上面會是最舊的',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/user/profileOutput',
                  },
                  examples: {
                    sample1: {
                      value: {
                        data: [
                          {
                            day: '2022-03-13',
                            signup_number: 5,
                          },
                          {
                            day: '2022-03-14',
                            signup_number: 33,
                          },
                          {
                            day: '2022-03-15',
                            signup_number: 29,
                          },
                          {
                            day: '2022-03-16',
                            signup_number: 29,
                          },
                          {
                            day: '2022-03-17',
                            signup_number: 24,
                          },
                          {
                            day: '2022-03-18',
                            signup_number: 21,
                          },
                          {
                            day: '2022-03-19',
                            signup_number: 36,
                          },
                          {
                            day: '2022-03-20',
                            signup_number: 22,
                          },
                          {
                            day: '2022-03-21',
                            signup_number: 1,
                          },
                        ],
                      },
                    },
                  },
                },
              },
            },
            401: {
              description: 'no token provided',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/user/Error',
                  },
                  examples: {
                    sample1: {
                      value: {
                        error: 'Unauthorized',
                      },
                    },
                  },
                },
              },
            },
            403: {
              description: 'normal user, not admin',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/user/Error',
                  },
                  examples: {
                    sample1: {
                      value: {
                        error: 'Forbidden',
                      },
                    },
                  },
                },
              },
            },
          },
          security: [
            {
              bearerAuth: [],
            },
          ],
        },
      },
      '/api/1.0/admin/products/stock': {
        post: {
          tags: [
            'Admins/Stock',
          ],
          summary: 'admin adds new variant stock',
          requestBody: {
            description: 'Product Object',
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/products/variantPutReq',
                },
                example: {
                  product_id: 201807201824,
                  variants: [
                    {
                      color_code: 'FFFFFF',
                      size: 'M',
                      stock: 5,
                    },
                    {
                      color_code: 'FFFFFF',
                      size: 'L',
                      stock: 10,
                    },
                  ],
                },
              },
            },
          },
          security: [
            {
              bearerAuth: [],
            },
          ],
          responses: {
            200: {
              description: 'OK',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/user/profileOutput',
                  },
                  examples: {
                    sample1: {
                      value: {
                        data: 'Create successed',
                      },
                    },
                  },
                },
              },
            },
          },
        },
        put: {
          tags: [
            'Admins/Stock',
          ],
          summary: 'admin changes a variant stock',
          requestBody: {
            description: 'Product Object',
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/products/variantPutReq',
                },
                example: {
                  product_id: 201807201824,
                  variants: [
                    {
                      color_code: 'FFFFFF',
                      size: 'S',
                      stock: 7,
                    },
                    {
                      color_code: 'DDFFBB',
                      size: 'S',
                      stock: 12,
                    },
                  ],
                },
              },
            },
          },
          security: [
            {
              bearerAuth: [],
            },
          ],
          responses: {
            200: {
              description: 'OK',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/user/profileOutput',
                  },
                  examples: {
                    sample1: {
                      value: {
                        data: 'Update OK',
                      },
                    },
                  },
                },
              },
            },
            400: {
              description: 'Update failed',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/user/profileOutput',
                  },
                  examples: {
                    sample1: {
                      value: {
                        error: 'Update failed due to invalid input',
                      },
                    },
                  },
                },
              },
            },
          },
        },
        delete: {
          tags: [
            'Admins/Stock',
          ],
          summary: 'admin delete multi variant stock with specific product_id',
          requestBody: {
            description: 'Product Object',
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/products/variantDeleteReq',
                },
                example: {
                  product_id: 202203241908499000,
                },
              },
            },
          },
          security: [
            {
              bearerAuth: [],
            },
          ],
          responses: {
            200: {
              description: 'OK',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/user/profileOutput',
                  },
                  examples: {
                    sample1: {
                      value: {
                        data: 'Delete successfully',
                      },
                    },
                  },
                },
              },
            },
            400: {
              description: 'Delete failed',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/user/profileOutput',
                  },
                  examples: {
                    sample1: {
                      value: {
                        error: 'Delete failed due to invalid input',
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/api/1.0/admin/user_coupons': {
        get: {
          tags: [
            'Admins/User_coupons',
          ],
          summary: 'get coupons from a user',
          security: [
            {
              bearerAuth: [],
            },
          ],
          requestBody: {
            description: 'Coupon Object',
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/user/signInInput',
                },
                examples: {
                  sample1: {
                    value: {
                      user_id: 10060,
                    },
                  },
                },
              },
            },
          },
          produces: [
            'application/json',
          ],
          responses: {
            200: {
              description: 'OK',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/user/profileOutput',
                  },
                  examples: {
                    sample1: {
                      value: {
                        data: {
                          user_coupon_table: [
                            {
                              id: 11,
                              user_id: 10060,
                              coupon_id: 1,
                              can_use: 0,
                            },
                            {
                              id: 12,
                              user_id: 10060,
                              coupon_id: 2,
                              can_use: 1,
                            },
                            {
                              id: 13,
                              user_id: 10060,
                              coupon_id: 3,
                              can_use: 0,
                            },
                          ],
                        },
                      },
                    },
                  },
                },
              },
            },
            400: {
              description: "Client's fault",
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/products/couponCreateOutput',
                  },
                  examples: {
                    sample1: {
                      value: {
                        error: 'Read failed due to invalid input',
                      },
                    },
                  },
                },
              },
            },
            500: {
              description: "Server's fault",
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/products/couponCreateOutput',
                  },
                  examples: {
                    sample1: {
                      value: {
                        error: 'Read failed',
                      },
                    },
                  },
                },
              },
            },
          },
        },
        post: {
          tags: [
            'Admins/User_coupons',
          ],
          summary: 'add a new coupon to a customer',
          security: [
            {
              bearerAuth: [],
            },
          ],
          requestBody: {
            description: 'Coupon ID and User ID',
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/user/signInInput',
                },
                examples: {
                  sample1: {
                    value: {
                      coupon_id: 12,
                      user_id: 10060,
                    },
                  },
                },
              },
            },
          },
          produces: [
            'application/json',
          ],
          responses: {
            200: {
              description: 'OK',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/products/couponCreateOutput',
                  },
                  examples: {
                    sample1: {
                      value: {
                        data: 'Create successfully',
                      },
                    },
                  },
                },
              },
            },
            400: {
              description: "Client's fault",
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/products/couponCreateOutput',
                  },
                  examples: {
                    sample1: {
                      value: {
                        error: 'Create failed due to invalid input',
                      },
                    },
                  },
                },
              },
            },
            500: {
              description: "Server's fault",
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/products/couponCreateOutput',
                  },
                  examples: {
                    sample1: {
                      value: {
                        error: 'Create failed',
                      },
                    },
                  },
                },
              },
            },
          },
        },
        delete: {
          tags: [
            'Admins/User_coupons',
          ],
          summary: 'delete a coupon from a user',
          security: [
            {
              bearerAuth: [],
            },
          ],
          requestBody: {
            description: 'Coupon Object',
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/user/signInInput',
                },
                examples: {
                  sample1: {
                    value: {
                      id: 14,
                    },
                  },
                },
              },
            },
          },
          produces: [
            'application/json',
          ],
          responses: {
            200: {
              description: 'OK',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/user/profileOutput',
                  },
                  examples: {
                    sample1: {
                      value: {
                        data: 'Delete successfully',
                      },
                    },
                  },
                },
              },
            },
            400: {
              description: "Client's fault",
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/products/couponCreateOutput',
                  },
                  examples: {
                    sample1: {
                      value: {
                        error: 'Delete failed due to invalid input',
                      },
                    },
                  },
                },
              },
            },
            500: {
              description: "Server's fault",
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/products/couponCreateOutput',
                  },
                  examples: {
                    sample1: {
                      value: {
                        error: 'Delete failed',
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/api/1.0/products/colors': {
        get: {
          tags: [
            'Products',
          ],
          summary: 'get color table',
          produces: [
            'application/json',
          ],
          responses: {
            200: {
              description: 'OK',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#products/colorOutput',
                  },
                  example: {
                    data: [
                      {
                        code: 'FFFFFF',
                        name: '白色',
                      },
                      {
                        code: 'DDFFBB',
                        name: '亮綠',
                      },
                      {
                        code: 'CCCCCC',
                        name: '淺灰',
                      },
                      {
                        code: 'BB7744',
                        name: '淺棕',
                      },
                      {
                        code: 'DDF0FF',
                        name: '淺藍',
                      },
                      {
                        code: '334455',
                        name: '深藍',
                      },
                      {
                        code: 'FFDDDD',
                        name: '粉紅',
                      },
                    ],
                  },
                },
              },
            },
          },
        },
      },
      '/api/1.0/order/checkout': {
        post: {
          tags: [
            'Order',
          ],
          summary: 'user set orders',
          parameters: [
            {
              in: 'header',
              name: 'x-api-key',
              schema: {
                type: 'string',
              },
              required: true,
              description: 'tapPay partner key',
              example: 'partner_PHgswvYEk4QY6oy3n8X3CwiQCVQmv91ZcFoD5VrkGFXo8N7BFiLUxzeG',
            },
            {
              in: 'header',
              name: 'Content-Type',
              schema: {
                type: 'string',
              },
              required: true,
              description: 'Content-Type',
              example: 'application/json',
            },
          ],
          requestBody: {
            description: 'Product Object',
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/products/variantPutReq',
                },
                example: {
                  prime: '5a9e4f3bee17ff9d95ba456d26543ce825fbb31703b390f38031152cf3f302b2',
                  order: {
                    shipping: 'delivery',
                    payment: 'credit_card',
                    subtotal: 1234,
                    freight: 14,
                    total: 1300,
                    recipient: {
                      name: 'Luke',
                      phone: '0987654321',
                      email: 'luke@gmail.com',
                      address: '市政府站',
                      time: 'morning',
                    },
                    list: [
                      {
                        id: '201807202157',
                        name: 'qwert',
                        price: 1299,
                        color: {
                          code: '#FFFFFF',
                          name: 'white',
                        },
                        size: 'L',
                        qty: 10,
                      },
                      {
                        id: 'qwertr',
                        name: 'qwert',
                        price: 1299,
                        color: {
                          code: '#FFFFFF',
                          name: 'white',
                        },
                        size: 'L',
                        qty: 10,
                      },
                    ],
                  },
                  coupon_id: 13,
                },
              },
            },
          },
          security: [
            {
              bearerAuth: [],
            },
          ],
          responses: {
            200: {
              description: 'OK',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/user/profileOutput',
                  },
                  examples: {
                    sample1: {
                      value: {
                        data: {
                          number: '221484290010',
                        },
                      },
                    },
                  },
                },
              },
            },
            401: {
              description: 'no token provided',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/user/Error',
                  },
                  examples: {
                    'wrong order format': {
                      value: {
                        error: 'Create Order Error: Wrong Data Format',
                      },
                    },
                    'invalid prime': {
                      value: {
                        error: 'Invalid prime',
                      },
                    },
                    'coupon already used': {
                      value: {
                        error: 'This coupon has been used',
                      },
                    },
                  },
                },
              },
            },
            403: {
              description: 'wrong token',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/user/Error',
                  },
                  examples: {
                    sample1: {
                      value: {
                        error: 'Forbidden',
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/api/1.0/products/{category}': {
        get: {
          tags: [
            'Products',
          ],
          summary: 'fetch products info',
          produces: [
            'application/json',
          ],
          parameters: [
            {
              in: 'path',
              name: 'category',
              schema: {
                type: 'string',
              },
              required: true,
              description: 'category',
              examples: {
                all: {
                  value: 'all',
                },
                women: {
                  value: 'women',
                },
                men: {
                  value: 'men',
                },
                accessories: {
                  value: 'accessories',
                },
              },
            },
            {
              in: 'query',
              name: 'paging',
              schema: {
                type: 'number',
              },
              required: false,
              description: 'page',
            },
          ],
          responses: {
            200: {
              description: 'OK',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/products/productsOutput',
                  },
                  example: {
                    data: [
                      {
                        id: 1234,
                        category: 'men',
                        title: '厚實毛呢格子外套',
                        description: '高抗寒素材選用，保暖也時尚有型',
                        price: 2200,
                        texture: '棉、聚脂纖維',
                        wash: '手洗（水溫40度',
                        place: '韓國',
                        note: '實品顏色以單品照為主',
                        story: '你絕對不能錯過的超值商品',
                        colors: [
                          {
                            code: '334455',
                            name: '深藍',
                          },
                          {
                            code: 'FFFFFF',
                            name: '白色',
                          },
                        ],
                        sizes: [
                          'S',
                          'M',
                        ],
                        variants: [
                          {
                            color_code: '334455',
                            size: 'S',
                            stock: 5,
                          },
                          {
                            color_code: '334455',
                            size: 'M',
                            stock: 10,
                          },
                          {
                            color_code: 'FFFFFF',
                            size: 'S',
                            stock: 0,
                          },
                          {
                            color_code: 'FFFFFF',
                            size: 'M',
                            stock: 2,
                          },
                        ],
                        main_image: 'string',
                        images: [
                          'https://stylish.com/0.jpg',
                          'https://stylish.com/1.jpg',
                          'https://stylish.com/2.jpg',
                        ],
                      },
                      {
                        id: 5678,
                        category: 'men',
                        title: '厚實毛呢格子外套',
                        description: '高抗寒素材選用，保暖也時尚有型',
                        price: 2200,
                        texture: '棉、聚脂纖維',
                        wash: '手洗（水溫40度',
                        place: '韓國',
                        note: '實品顏色以單品照為主',
                        story: '你絕對不能錯過的超值商品',
                        colors: [
                          {
                            code: '334455',
                            name: '深藍',
                          },
                        ],
                        sizes: [
                          'S',
                          'M',
                          'L',
                        ],
                        variants: [
                          {
                            color_code: '334455',
                            size: 'S',
                            stock: 5,
                          },
                          {
                            color_code: '334455',
                            size: 'M',
                            stock: 10,
                          },
                          {
                            color_code: '334455',
                            size: 'L',
                            stock: 0,
                          },
                        ],
                        main_image: 'https://stylish.com/main.jpg',
                        images: [
                          'https://stylish.com/0.jpg',
                          'https://stylish.com/1.jpg',
                          'https://stylish.com/2.jpg',
                        ],
                      },
                    ],
                  },
                },
              },
            },
          },
        },
      },
      'https://vivaformosean.com/s3test/index.html': {
        get: {
          tags: [
            'S3',
          ],
          summary: '上傳到S3的測試處',
          description: '選擇圖片按下上傳鈕之後，會打一個請求給後端得到(1)上傳網址，然後再打一個請求把圖片傳到該網址，最後就會得到(2)該圖片的網址。log會出現兩個網址，分別是(1)和(2)',
        },
      },
      'https://vivaformosean.com/customers.html': {
        get: {
          tags: [
            'Socket',
          ],
          summary: 'Socket的顧客房間(要等店員先開)',
          description: '等店員頁面開好後，再開這個頁面測試，可以重複開',
        },
      },
      'https://vivaformosean.com/staff.html': {
        get: {
          tags: [
            'Socket',
          ],
          summary: 'Socket的店員房間(要先開著)',
          description: '開好這個網頁後，再去開顧客的頁面測試。可以從這個頁面的console看到顧客傳來的訊息和roomID',
        },
      },
      '/api/1.0/user/coupon': {
        get: {
          tags: [
            'Users',
          ],
          summary: 'get user coupon',
          produces: [
            'application/json',
          ],
          responses: {
            200: {
              description: 'OK',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/user/profileOutput',
                  },
                  example: {
                    data: [
                      {
                        prefix: 'WEEK',
                        name: 'test5',
                        expire_time: '2022-03-27',
                        coupon_id: 1,
                        can_use: false,
                      },
                      {
                        prefix: 'DAY',
                        name: 'test5',
                        expire_time: '2022-03-21',
                        coupon_id: 2,
                        can_use: true,
                      },
                      {
                        prefix: 'MONTH',
                        name: 'test',
                        expire_time: '2022-04-19',
                        coupon_id: 3,
                        can_use: false,
                      },
                    ],
                  },
                },
              },
            },
            401: {
              description: 'No token provided',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/user/Error',
                  },
                  examples: {
                    sample1: {
                      value: {
                        error: 'Unauthorized',
                      },
                    },
                  },
                },
              },
            },
            403: {
              description: 'wrong token',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/user/Error',
                  },
                  examples: {
                    sample1: {
                      value: {
                        error: 'Forbidden',
                      },
                    },
                  },
                },
              },
            },
          },
          security: [
            {
              bearerAuth: [],
            },
          ],
        },
      },
      '/api/1.0/user/profile': {
        get: {
          tags: [
            'Users',
          ],
          summary: 'get user profile',
          produces: [
            'application/json',
          ],
          responses: {
            200: {
              description: 'OK',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/user/profileOutput',
                  },
                  example: {
                    data: {
                      provider: 'facebook',
                      name: 'Pei',
                      email: 'pei@gmail.com',
                      picture: 'https://graph.facebook.com/123481231233/picture?type=large',
                      address: '100台北市中正區仁愛路二段100號',
                    },
                  },
                },
              },
            },
            401: {
              description: 'No token provided',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/user/Error',
                  },
                  examples: {
                    sample1: {
                      value: {
                        error: 'Unauthorized',
                      },
                    },
                  },
                },
              },
            },
            403: {
              description: 'wrong token',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/user/Error',
                  },
                  examples: {
                    sample1: {
                      value: {
                        error: 'Forbidden',
                      },
                    },
                  },
                },
              },
            },
          },
          security: [
            {
              bearerAuth: [],
            },
          ],
        },
      },
      '/api/1.0/user/signin': {
        post: {
          tags: [
            'Users',
          ],
          summary: 'User sign in through native/google/facebook',
          requestBody: {
            description: 'User Object',
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/user/signInInput',
                },
                examples: {
                  native: {
                    value: {
                      provider: 'native',
                      email: 'test2@test.com',
                      password: 'test',
                    },
                  },
                  google: {
                    value: {
                      provider: 'google',
                      access_token: 'ya29.A0ARrdaM_Txv53OQbHRgJEUbeAfYrL2yLvCiXdXmFqrXviQzw5Za6TqoW00B7lc-75_mOcv620zMQuzydU6zzeJXatXOGr5kELWYxgr0eP479860KBiY5-WKxs6b-y7j1UbLXI6Xri4_EuQlvwt0l7Gwh94bSTa',
                    },
                  },
                },
              },
            },
          },
          produces: [
            'application/json',
          ],
          responses: {
            200: {
              description: 'OK',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/user/signInOutput',
                  },
                  example: {
                    data: {
                      access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm92aWRlciI6Imdvb2dsZSIsIm5hbWUiOiLokYnmib_lvaUiLCJlbWFpbCI6InIwODEyNDAwOUBnLm50dS5lZHUudHciLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUFUWEFKeHZ6bEM0NmFPOWtlcHpKSUtMdkFvVHhqRkFxX3h6N2JLUmh3RHE9czk2LWMiLCJpYXQiOjE2NDc1ODk0OTR9.oxkog5IvVVsmgTnyT7-fV7GNhvKz3j_nFR2hMt1osSU',
                      access_expired: '2592000',
                      login_at: '2022-03-18T07:44:54.992Z',
                      user: {
                        id: 10252,
                        provider: 'native',
                        name: 'abc',
                        email: 'abc@abc.com',
                        picture: 'https://lh3.googleusercontent.com/a/AATXAJxvzlC46aO9kepzJIKLvAoTxjFAq_xz7bKRhwDq=s96-c',
                        address: '100台北市中正區仁愛路二段100號',
                        role: 2,
                      },
                    },
                  },
                },
              },
            },
            400: {
              description: 'no token provided',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/user/Error',
                  },
                  example: {
                    error: 'Request Error: access token is required.',
                  },
                },
              },
            },
            403: {
              description: 'wrong provider or access_token',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/user/Error',
                  },
                  examples: {
                    'wrong access token': {
                      value: {
                        error: 'Permissions Error: facebook access token is wrong',
                      },
                    },
                    'wrong provider': {
                      value: {
                        error: 'Wrong Request',
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/api/1.0/user/signup': {
        post: {
          tags: [
            'Users',
          ],
          summary: 'Create a new User',
          requestBody: {
            description: 'User Object',
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/user/signUpInput',
                },
                example: {
                  name: 'abc',
                  email: 'abc@abc.com',
                  password: 'abc',
                },
              },
            },
          },
          produces: [
            'application/json',
          ],
          responses: {
            200: {
              description: 'OK',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/user/signUpOutput',
                  },
                  example: {
                    data: {
                      access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm92aWRlciI6Im5hdGl2ZSIsIm5hbWUiOiJ0ZXN0IiwiZW1haWwiOiJ0ZXN0NEB0ZXN0LmNvbSIsInBpY3R1cmUiOiJodHRwczovL2Nkbi1pY29ucy1wbmcuZmxhdGljb24uY29tLzUxMi82MTYvNjE2NDMwLnBuZyIsImlhdCI6MTY0NzU4ODY3M30.fk4Gd3NtomuSlTpp954f9k0uipNFGtlBlqX1GHv-Iyg',
                      access_expired: '2592000',
                      login_at: '2022-03-18T07:31:13.851Z',
                      user: {
                        id: 10254,
                        provider: 'native',
                        name: 'abc',
                        email: 'abc@abc.com',
                        picture: 'https://cdn-icons-png.flaticon.com/512/616/616430.png',
                        address: '100台北市中正區仁愛路二段100號',
                      },
                    },
                  },
                },
              },
            },
            400: {
              description: "user's fault",
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/user/Error',
                  },
                  examples: {
                    'no name, email, or password': {
                      value: {
                        error: 'Request Error: name, email and password are required.',
                      },
                    },
                  },
                },
              },
            },
            403: {
              description: "user's fault",
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/user/Error',
                  },
                  examples: {
                    'email exists': {
                      value: {
                        error: 'Email Already Exists',
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    products: {
      couponCreateOutput: {
        type: 'object',
        properties: {
          data: {
            type: 'object',
            properties: {
              coupon_id: {
                type: 'number',
              },
            },
          },
        },
      },
      productsOutput: {
        type: 'object',
        properties: {
          data: {
            type: 'array',
            items: {
              properties: {
                id: {
                  type: 'number',
                },
                category: {
                  type: 'string',
                },
                title: {
                  type: 'string',
                },
                description: {
                  type: 'string',
                },
                price: {
                  type: 'number',
                },
                wash: {
                  type: 'string',
                },
                place: {
                  type: 'string',
                },
                note: {
                  type: 'string',
                },
                story: {
                  type: 'string',
                },
                colors: {
                  type: 'array',
                  items: {
                    properties: {
                      code: {
                        type: 'string',
                      },
                      name: {
                        type: 'string',
                      },
                    },
                  },
                },
                sizes: {
                  type: 'array',
                  items: {
                    type: 'string',
                  },
                },
                variants: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      color_code: {
                        type: 'string',
                      },
                      size: {
                        type: 'string',
                      },
                      stock: {
                        type: 'number',
                      },
                    },
                  },
                },
                main_image: {
                  type: 'string',
                },
                images: {
                  type: 'array',
                  items: {
                    type: 'string',
                  },
                },
              },
            },
          },
        },
      },
      colorOutput: {
        type: 'object',
        properties: {
          code: {
            type: 'string',
          },
          name: {
            type: 'string',
          },
        },
      },
      productPutReq: {
        type: 'object',
        properties: {
          id: {
            type: 'number',
          },
          category: {
            type: 'string',
          },
          title: {
            type: 'string',
          },
          description: {
            type: 'string',
          },
          price: {
            type: 'number',
          },
          texture: {
            type: 'string',
          },
          wash: {
            type: 'string',
          },
          place: {
            type: 'string',
          },
          note: {
            type: 'string',
          },
          story: {
            type: 'string',
          },
        },
      },
      variantPutReq: {
        type: 'object',
        properties: {
          product_id: {
            type: 'number',
          },
          variants: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                color_id: {
                  type: 'number',
                },
                size: {
                  type: 'string',
                },
                stock: {
                  type: 'number',
                },
              },
            },
          },
        },
      },
      variantDeleteReq: {
        type: 'object',
        properties: {
          product_id: {
            type: 'number',
          },
        },
      },
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          description: 'JWT Authorization header using the Bearer scheme.',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    user: {
      signInInput: {
        type: 'object',
        properties: {
          provider: {
            type: 'string',
          },
          email: {
            type: 'string',
          },
          password: {
            type: 'string',
          },
          access_token: {
            type: 'string',
          },
        },
      },
      signInOutput: {
        type: 'object',
        properties: {
          data: {
            type: 'object',
            properties: {
              access_token: {
                type: 'string',
              },
              access_expired: {
                type: 'string',
              },
              login_at: {
                type: 'string',
              },
              user: {
                type: 'object',
                properties: {
                  id: {
                    type: 'number',
                  },
                  provider: {
                    type: 'string',
                  },
                  name: {
                    type: 'string',
                  },
                  email: {
                    type: 'string',
                  },
                  picture: {
                    type: 'string',
                  },
                  address: {
                    type: 'string',
                  },
                  role: {
                    type: 'number',
                  },
                },
              },
            },
          },
        },
      },
      signUpInput: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
          },
          email: {
            type: 'string',
          },
          password: {
            type: 'string',
          },
        },
      },
      signUpOutput: {
        type: 'object',
        properties: {
          data: {
            type: 'object',
            properties: {
              access_token: {
                type: 'string',
              },
              access_expired: {
                type: 'number',
              },
              user: {
                type: 'object',
                properties: {
                  id: {
                    type: 'number',
                  },
                  provider: {
                    type: 'string',
                  },
                  name: {
                    type: 'string',
                  },
                  email: {
                    type: 'string',
                  },
                  picture: {
                    type: 'string',
                  },
                  address: {
                    type: 'string',
                  },
                },
              },
            },
          },
        },
      },
      profileOutput: {
        type: 'object',
        properties: {
          data: {
            type: 'object',
            properties: {
              provider: {
                type: 'string',
              },
              name: {
                type: 'string',
              },
              email: {
                type: 'string',
              },
              picture: {
                type: 'string',
              },
              address: {
                type: 'string',
              },
              coupons: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    prefix: {
                      type: 'string',
                    },
                    suffix: {
                      type: 'number',
                    },
                  },
                },
              },
            },
          },
        },
      },
      Error: {
        type: 'object',
        properties: {
          error: {
            type: 'string',
          },
        },
      },
    },
  },
  {
    openapi: '3.0.0',
    info: {
      title: 'Easy-Notify',
      description: 'API Document for Easy-Notify\n',
      termsOfService: 'https://easynotify.site/',
      contact: {
        email: 'nnjkm076017@gmail.com',
      },
      version: '1.0',
    },
    servers: [
      {
        url: 'https://easynotify.site/notifier/api/1.0',
        description: 'EasyNotify',
      },
      {
        url: 'http://localhost:3000/notifier/api/1.0',
        description: 'localhost',
      },
      {
        url: 'https://virtserver.swaggerhub.com/nnjkm076017/EasyNotify/1.0',
        description: 'SwaggerHub API Auto Mocking',
      },
    ],
    tags: [
      {
        name: 'notification',
        description: 'Everything about notification',
      },
    ],
    paths: {
      '/notifications': {
        get: {
          tags: [
            'notification',
          ],
          summary: 'Gets Notifications detail',
          description: 'Get notifications',
          operationId: 'getNotifications',
          parameters: [
            {
              name: 'id',
              in: 'query',
              description: 'notification id',
              required: false,
              style: 'form',
              explode: true,
              schema: {
                type: 'string',
              },
            },
          ],
          responses: {
            200: {
              description: 'successful operation',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/inline_response_200',
                  },
                },
              },
            },
            400: {
              description: 'Invalid input',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/inline_response_400',
                  },
                },
              },
            },
            401: {
              description: 'No channel Id or Key',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/inline_response_401',
                  },
                },
              },
            },
            403: {
              description: 'Wrong channel Key',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/inline_response_403',
                  },
                },
              },
            },
            404: {
              description: 'Notification not found',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/inline_response_404',
                  },
                },
              },
            },
          },
          security: [
            {
              channelKey: [],
              channelId: [],
            },
          ],
        },
        put: {
          tags: [
            'notification',
          ],
          summary: 'Modify a notification',
          operationId: 'updateNotification',
          parameters: [
            {
              name: 'id',
              in: 'query',
              description: 'notification id',
              required: false,
              style: 'form',
              explode: true,
              schema: {
                type: 'string',
              },
            },
          ],
          requestBody: {
            $ref: '#/components/requestBodies/Notification',
          },
          responses: {
            200: {
              description: 'Update notification successfully',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/inline_response_200_1',
                  },
                },
              },
            },
            400: {
              description: 'Invalid input',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/inline_response_400',
                  },
                },
              },
            },
            401: {
              description: 'No channel Id or Key',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/inline_response_401',
                  },
                },
              },
            },
            403: {
              description: 'Wrong channel Key',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/inline_response_403',
                  },
                },
              },
            },
            404: {
              description: 'Notification not found',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/inline_response_404',
                  },
                },
              },
            },
          },
          security: [
            {
              channelKey: [],
              channelId: [],
            },
          ],
        },
        delete: {
          tags: [
            'notification',
          ],
          summary: 'Deletes a notification',
          operationId: 'deleteNotification',
          parameters: [
            {
              name: 'id',
              in: 'query',
              description: 'notification id',
              required: false,
              style: 'form',
              explode: true,
              schema: {
                type: 'string',
              },
            },
          ],
          responses: {
            200: {
              description: 'Delete notification successfully',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/inline_response_200_2',
                  },
                },
              },
            },
            400: {
              description: 'Invalid input',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/inline_response_400',
                  },
                },
              },
            },
            401: {
              description: 'No channel Id or Key',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/inline_response_401',
                  },
                },
              },
            },
            403: {
              description: 'Wrong channel Key',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/inline_response_403',
                  },
                },
              },
            },
            404: {
              description: 'Notification not found',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/inline_response_404',
                  },
                },
              },
            },
          },
          security: [
            {
              channelKey: [],
              channelId: [],
            },
          ],
        },
      },
      '/notifications/{scheduledType}': {
        post: {
          tags: [
            'notification',
          ],
          summary: 'Send a new notification to clients',
          operationId: 'pushNotification',
          parameters: [
            {
              name: 'scheduledType',
              in: 'path',
              description: 'ID of pet to return',
              required: true,
              style: 'simple',
              explode: false,
              schema: {
                type: 'integer',
                format: 'int64',
              },
            },
          ],
          responses: {
            200: {
              description: 'Create notification succssfully',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/inline_response_200_1',
                  },
                },
              },
            },
            400: {
              description: 'Invalid input',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/inline_response_400',
                  },
                },
              },
            },
            401: {
              description: 'No channel Id or Key',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/inline_response_401',
                  },
                },
              },
            },
            403: {
              description: 'Wrong channel Key',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/inline_response_403',
                  },
                },
              },
            },
            404: {
              description: 'Notification not found',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/inline_response_404',
                  },
                },
              },
            },
          },
          security: [
            {
              channelKey: [],
              channelId: [],
            },
          ],
        },
      },
    },
    components: {
      schemas: {
        ScheduledType: {
          type: 'string',
          description: 'The way to send the notification',
          enum: [
            'websocket',
            'webpush',
          ],
        },
        Notification: {
          required: [
            'body',
            'name',
            'sendType',
            'title',
          ],
          type: 'object',
          properties: {
            name: {
              type: 'string',
              example: 'activity-1101',
            },
            title: {
              type: 'string',
              example: 'Black Friday',
            },
            body: {
              type: 'string',
              example: 'Join the activity to get more discount!',
            },
            sendType: {
              $ref: '#/components/schemas/ScheduledType',
            },
            sendTime: {
              type: 'string',
              description: 'Scheduled Time (Null for realtime notification)',
              format: 'date-time',
            },
            icon: {
              type: 'string',
              description: 'Null to use default icon',
              format: 'url',
            },
            config: {
              type: 'string',
              example: '{"type":"sweetalert","tatus":"success"}',
            },
          },
          xml: {
            name: 'Notification',
          },
        },
        NotificationDetail: {
          required: [
            'channel_id',
            'content',
            'created_dt',
            'id',
            'name',
            'scheduled_dt',
            'status',
            'type',
            'updated_dt',
          ],
          type: 'object',
          properties: {
            id: {
              type: 'string',
              example: '626bfd4f0518afbd87d83247',
            },
            channel_id: {
              type: 'string',
              example: 'UX9OA6a6MxF_Nx0GVVhzH',
            },
            name: {
              type: 'string',
              example: 'activity-1101',
            },
            type: {
              $ref: '#/components/schemas/ScheduledType',
            },
            sendTime: {
              type: 'string',
              description: 'Scheduled Time (Null for realtime notification)',
              format: 'date-time',
            },
            title: {
              type: 'string',
              example: 'Black Friday',
            },
            body: {
              type: 'string',
              example: 'Join the activity to get more discount!',
            },
            icon: {
              type: 'string',
              description: 'Null to use default icon',
              format: 'url',
            },
            config: {
              type: 'string',
              example: '{"type":"sweetalert","atus":"success"}',
            },
          },
          xml: {
            name: 'Notification',
          },
        },
        NotificationArray: {
          type: 'array',
          items: {
            $ref: '#/components/schemas/NotificationDetail',
          },
        },
        NotificationData: {
          type: 'object',
          properties: {
            data: {
              $ref: '#/components/schemas/NotificationDetail',
            },
          },
        },
        NotificationArrayData: {
          type: 'object',
          properties: {
            data: {
              $ref: '#/components/schemas/NotificationArray',
            },
          },
        },
        inline_response_200: {
          type: 'object',
          oneOf: [
            {
              $ref: '#/components/schemas/NotificationArrayData',
            },
            {
              $ref: '#/components/schemas/NotificationData',
            },
          ],
        },
        inline_response_400: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              example: 'Invalid Input',
            },
          },
        },
        inline_response_401: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              example: 'No channel key',
            },
          },
        },
        inline_response_403: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              example: 'Wrong channel key',
            },
          },
        },
        inline_response_404: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              example: 'Notification not found',
            },
          },
        },
        inline_response_200_1: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
            },
            status: {
              type: 'string',
              example: 'success',
            },
          },
        },
        inline_response_200_2: {
          type: 'object',
          properties: {
            status: {
              type: 'string',
              example: 'success',
            },
          },
        },
      },
      requestBodies: {
        Notification: {
          description: 'Notification object that would be sent to the clients',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Notification',
              },
            },
          },
          required: true,
        },
      },
      securitySchemes: {
        channelKey: {
          type: 'apiKey',
          name: 'X-API-KEY',
          in: 'header',
        },
        channelId: {
          type: 'apiKey',
          name: 'X-CHANNEL-ID',
          in: 'header',
        },
      },
    },
  },
  {
    openapi: '3.0.0',
    info: {
      title: 'DocuBloom',
      description: 'DocuBloom developing',
      contact: {
        email: 'you@your-company.com',
      },
      license: {
        name: 'Apache 2.0',
        url: 'http://www.apache.org/licenses/LICENSE-2.0.html',
      },
      version: '1.0.0',
    },
    servers: [
      {
        url: 'https://www.vivaformosean.com',
        description: 'docubloom website',
      },
      {
        url: 'https://virtserver.swaggerhub.com/formosean/DocuBloom/1.0.0',
        description: 'SwaggerHub API Auto Mocking',
      },
    ],
    tags: [
      {
        name: 'Users',
        description: 'Operations available to regular users',
      },
      {
        name: 'Documents Management',
        description: 'CRUD on documents',
      },
      {
        name: 'Documents Authorization Management',
        description: "Management about others' authorization on documents",
      },
    ],
    paths: {
      '/api/1.0/user/signin': {
        post: {
          tags: [
            'Users',
          ],
          summary: 'users signing in',
          description: 'Users sign in with email and password\n',
          operationId: 'searchInventory',
          requestBody: {
            description: 'User Object',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                },
                examples: {
                  native: {
                    value: {
                      provider: 'native',
                      email: 'test@test.com',
                      password: 'test',
                    },
                  },
                },
              },
            },
            required: true,
          },
          responses: {
            200: {
              description: 'OK',
              content: {
                'application/json': {
                  example: {
                    data: {
                      access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm92aWRlciI6Imdvb2dsZSIsIm5hbWUiOiLokYnmib_lvaUiLCJlbWFpbCI6InIwODEyNDAwOUBnLm50dS5lZHUudHciLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUFUWEFKeHZ6bEM0NmFPOWtlcHpKSUtMdkFvVHhqRkFxX3h6N2JLUmh3RHE9czk2LWMiLCJpYXQiOjE2NDc1ODk0OTR9.oxkog5IvVVsmgTnyT7-fV7GNhvKz3j_nFR2hMt1osSU',
                      access_expired: '2592000,',
                      user: {
                        id: 10252,
                        name: 'abc',
                        email: 'abc@abc.com',
                        provider: 'native',
                      },
                    },
                  },
                },
              },
            },
            400: {
              description: 'sign-in fails',
              content: {
                'application/json': {
                  examples: {
                    'no-required-content': {
                      value: {
                        error: {
                          code: 32201,
                          title: 'native sign in fails',
                          message: 'email and password are required',
                        },
                      },
                    },
                    'wrong-value': {
                      value: {
                        error: {
                          code: 32202,
                          title: 'native sign in fails',
                          message: 'email or password incorrect',
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/api/1.0/user/signup': {
        post: {
          tags: [
            'Users',
          ],
          summary: 'users signing up',
          description: 'Users sign up with email, name, and password',
          operationId: 'addInventory',
          requestBody: {
            description: 'email, name, and password',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                },
                example: {
                  email: 'test@test.com',
                  name: 'test',
                  password: 'test',
                },
              },
            },
          },
          responses: {
            200: {
              description: 'OK',
              content: {
                'application/json': {
                  example: {
                    data: {
                      access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm92aWRlciI6Imdvb2dsZSIsIm5hbWUiOiLokYnmib_lvaUiLCJlbWFpbCI6InIwODEyNDAwOUBnLm50dS5lZHUudHciLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUFUWEFKeHZ6bEM0NmFPOWtlcHpKSUtMdkFvVHhqRkFxX3h6N2JLUmh3RHE9czk2LWMiLCJpYXQiOjE2NDc1ODk0OTR9.oxkog5IvVVsmgTnyT7-fV7GNhvKz3j_nFR2hMt1osSU',
                      access_expired: '2592000,',
                      user: {
                        id: 10252,
                        name: 'abc',
                        email: 'abc@abc.com',
                      },
                    },
                  },
                },
              },
            },
            400: {
              description: 'sign up fails',
              content: {
                'application/json': {
                  examples: {
                    'email-value': {
                      value: {
                        error: {
                          code: 31001,
                          title: 'sign up fails',
                          message: 'please enter proper email value',
                        },
                      },
                    },
                    'password-length': {
                      value: {
                        error: {
                          code: 31001,
                          title: 'sign up fails',
                          message: 'password length cannot be less than four',
                        },
                      },
                    },
                  },
                },
              },
            },
            409: {
              description: 'sign up fails',
              content: {
                'application/json': {
                  example: {
                    error: {
                      code: 31002,
                      title: 'sign up fails',
                      message: 'user already exists',
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/api/1.0/user/profile': {
        get: {
          tags: [
            'Users',
          ],
          summary: 'users profiles',
          description: 'Users enter profiles with json web tokens',
          responses: {
            201: {
              description: 'item created',
              content: {
                'application/json': {
                  example: {
                    data: {
                      id: 10252,
                      name: 'abc',
                      email: 'abc@abc.com',
                      docs: [
                        {
                          id: '6259003336c9c4a9bdbfcceb',
                          role: 'editor',
                          openapi: '3.0.0',
                          info: {
                            version: '1.0.0',
                            title: 'DocuBloom',
                            description: 'DocuBloom developing',
                          },
                        },
                        {
                          id: '6259003336c9c4a9bdbfc123',
                          role: 'viewer',
                          openapi: '3.0.0',
                          info: {
                            version: '1.0.0',
                            title: 'User',
                            description: 'User API description',
                          },
                        },
                        {
                          id: '6259003336c9c4a9bdbfc456',
                          role: 'owner',
                          openapi: '3.0.0',
                          info: {
                            version: '1.0.0',
                            title: 'Stylish',
                            description: 'Stylish good',
                          },
                        },
                      ],
                    },
                  },
                },
              },
            },
          },
          security: [
            {
              bearerAuth: [],
            },
          ],
        },
      },
      '/api/1.0/user/self/docs/{docId}': {
        delete: {
          tags: [
            'Users',
          ],
          summary: 'user leaves a document',
          description: 'A user enters profile, select leave button to leave a document, and send this request with a jwt token.',
          parameters: [
            {
              name: 'docId',
              in: 'path',
              description: 'the id of document',
              required: true,
              style: 'simple',
              explode: false,
              schema: {
                type: 'string',
              },
            },
          ],
          responses: {
            200: {
              description: 'OK',
              content: {
                'application/json': {
                  example: {
                    message: 'Successfully left the document.',
                    data: {
                      userId: '6259003336c9c4a9bdbfcceb',
                      docId: '6259003336c9c4a9bdbfcceb',
                    },
                  },
                },
              },
            },
            401: {
              description: 'not sign in',
              content: {
                'application/json': {
                  example: {
                    error: 'Unauthorizaed',
                  },
                },
              },
            },
          },
          security: [
            {
              bearerAuth: [],
            },
          ],
        },
      },
      '/api/1.0/docs': {
        post: {
          tags: [
            'Documents Management',
          ],
          summary: 'users add a new document',
          description: 'Users edited a new document in the editor page and send this request with a jwt token.',
          requestBody: {
            description: 'Document-related object',
            content: {
              'application/json': {
                schema: {
                  type: 'string',
                },
                example: '{"data":"doc data, supposed to be a huge JSON file"}',
              },
            },
            required: true,
          },
          responses: {
            200: {
              description: 'OK',
              content: {
                'application/json': {
                  example: {
                    data: {
                      id: '6259003336c9c4a9bdbfcceb',
                    },
                  },
                },
              },
            },
            401: {
              description: 'not sign in',
              content: {
                'application/json': {
                  example: {
                    error: 'Unauthorizaed',
                  },
                },
              },
            },
          },
          security: [
            {
              bearerAuth: [],
            },
          ],
        },
      },
      '/api/1.0/docs/{docId}': {
        get: {
          tags: [
            'Documents Management',
          ],
          summary: 'users read a document',
          description: 'Users enter the editor or viewer page by clicking the view button in the profile page, and will send jwt tokens to back-end for authentication verification.',
          parameters: [
            {
              name: 'docId',
              in: 'path',
              description: 'the id of document',
              required: true,
              style: 'simple',
              explode: false,
              schema: {
                type: 'string',
              },
            },
          ],
          responses: {
            200: {
              description: 'OK',
              content: {
                'application/json': {
                  example: {
                    data: 'doc data, supposed to be a huge JSON file',
                  },
                },
              },
            },
            401: {
              description: 'not sign in',
              content: {
                'application/json': {
                  example: {
                    error: 'Unauthorizaed',
                  },
                },
              },
            },
            403: {
              description: 'no authentication to edit',
              content: {
                'application/json': {
                  example: {
                    error: 'Forbidden',
                  },
                },
              },
            },
          },
          security: [
            {
              bearerAuth: [],
            },
          ],
        },
        put: {
          tags: [
            'Documents Management',
          ],
          summary: 'users edit a document',
          description: 'Users edited the document in the editor page and send this request with a jwt token.',
          parameters: [
            {
              name: 'docId',
              in: 'path',
              description: 'the id of document',
              required: true,
              style: 'simple',
              explode: false,
              schema: {
                type: 'string',
              },
            },
          ],
          requestBody: {
            description: 'Document-related object',
            content: {
              'application/json': {
                schema: {
                  type: 'string',
                },
                example: '{"data":"doc object, supposed to be a huge JSON file"}',
              },
            },
            required: true,
          },
          responses: {
            200: {
              description: 'OK',
              content: {
                'application/json': {
                  example: {
                    data: {
                      id: '6259003336c9c4a9bdbfcceb',
                    },
                  },
                },
              },
            },
            401: {
              description: 'not sign in',
              content: {
                'application/json': {
                  example: {
                    error: 'Unauthorizaed',
                  },
                },
              },
            },
            403: {
              description: 'no authentication to edit',
              content: {
                'application/json': {
                  example: {
                    error: 'Forbidden',
                  },
                },
              },
            },
          },
          security: [
            {
              bearerAuth: [],
            },
          ],
        },
        delete: {
          tags: [
            'Documents Management',
          ],
          summary: 'users delete a document',
          description: 'Users delete a document in the profile page and send a jwt token to back-end for authentication verification.',
          parameters: [
            {
              name: 'docId',
              in: 'path',
              description: 'the id of document',
              required: true,
              style: 'simple',
              explode: false,
              schema: {
                type: 'number',
              },
            },
          ],
          responses: {
            200: {
              description: 'OK',
              content: {
                'application/json': {
                  example: {
                    data: {
                      id: '6259003336c9c4a9bdbfcceb',
                    },
                  },
                },
              },
            },
            401: {
              description: 'not sign in',
              content: {
                'application/json': {
                  example: {
                    error: 'Unauthorizaed',
                  },
                },
              },
            },
            403: {
              description: 'no authentication to edit',
              content: {
                'application/json': {
                  example: {
                    error: 'Forbidden',
                  },
                },
              },
            },
          },
          security: [
            {
              bearerAuth: [],
            },
          ],
        },
      },
      '/api/1.0/docs/{docId}/users': {
        get: {
          tags: [
            'Documents Authorization Management',
          ],
          summary: 'users see the authorization situation of a document',
          description: "Users click the situation button of the document and see its authorization situation, with a jwt tokwn containing the user's information.",
          parameters: [
            {
              name: 'docId',
              in: 'path',
              description: 'the id of document',
              required: true,
              style: 'simple',
              explode: false,
              schema: {
                type: 'string',
              },
            },
          ],
          responses: {
            200: {
              description: 'OK',
              content: {
                'application/json': {
                  example: {
                    data: {
                      owners: [
                        {
                          id: '625f74a91e550e315f324116',
                          name: 'test',
                          email: 'test@test.com',
                        },
                      ],
                      editors: [
                        {
                          id: '625f74ba6eae2f206972a2c6',
                          name: 'Eric',
                          email: 'eric@gmail.com',
                        },
                        {
                          id: '625f9e7e3d3592c731482b42',
                          name: 'Kevin',
                          email: 'kevin@gmail.com',
                        },
                      ],
                      viewers: [
                        {
                          id: '625f7f85b07959eecafc7815',
                          name: 'Lara',
                          email: 'lara@gmail.com',
                        },
                      ],
                    },
                  },
                },
              },
            },
            401: {
              description: 'not sign in',
              content: {
                'application/json': {
                  example: {
                    error: 'Unauthorizaed',
                  },
                },
              },
            },
          },
          security: [
            {
              bearerAuth: [],
            },
          ],
        },
        post: {
          tags: [
            'Documents Authorization Management',
          ],
          summary: 'users add another user to the document as either editor or viewer',
          description: "Users click the share button in the profile page, select the user with email, and choose the authorization as editor or viewer, and send this request with a jwt token containing the user's information. Only the owner and editor can share.",
          parameters: [
            {
              name: 'docId',
              in: 'path',
              description: 'the id of document',
              required: true,
              style: 'simple',
              explode: false,
              schema: {
                type: 'number',
              },
            },
          ],
          requestBody: {
            description: 'Document-related object',
            content: {
              'application/json': {
                schema: {
                  type: 'string',
                },
                examples: {
                  editor: {
                    value: {
                      email: 'test@test.com',
                      role: 'editor',
                    },
                  },
                  viewer: {
                    value: {
                      email: 'test@test.com',
                      role: 'viewer',
                    },
                  },
                },
              },
            },
            required: true,
          },
          responses: {
            200: {
              description: 'OK',
              content: {
                'application/json': {
                  example: {
                    message: 'update success',
                    data: {
                      docId: '625f7fa6b07959eecafc7816',
                      user: {
                        email: 'test@test.com',
                        name: 'test',
                        id: '625f9e7e3d3592c731482b42',
                      },
                    },
                  },
                },
              },
            },
            400: {
              description: 'bad request',
              content: {
                'application/json': {
                  examples: {
                    'no user id': {
                      value: {
                        error: 'Request Error: user id is required.',
                      },
                    },
                    'no user role': {
                      value: {
                        error: 'Request Error: user role is required.',
                      },
                    },
                    'invalid role': {
                      value: {
                        error: 'invalid role',
                      },
                    },
                    'add owner': {
                      value: {
                        error: 'cannot add owner to document',
                      },
                    },
                  },
                },
              },
            },
            401: {
              description: 'not sign in',
              content: {
                'application/json': {
                  example: {
                    error: 'Unauthorizaed',
                  },
                },
              },
            },
            403: {
              description: 'no authentication to manage doc auth',
              content: {
                'application/json': {
                  example: {
                    error: 'Forbidden',
                  },
                },
              },
            },
          },
          security: [
            {
              bearerAuth: [],
            },
          ],
        },
      },
      '/api/1.0/docs/{docId}/users/{userId}': {
        put: {
          tags: [
            'Documents Authorization Management',
          ],
          summary: 'users adjust the authentication of a user to a document as either editor or viewer',
          description: "Users click the control-auth button in the profile page, select the user with his email, choose a new authorization as editor or viewer, and send this request with a jwt token containing the user's information. Only the owner and editor can do this.",
          parameters: [
            {
              name: 'docId',
              in: 'path',
              description: 'the id of document',
              required: true,
              style: 'simple',
              explode: false,
              schema: {
                type: 'number',
              },
            },
            {
              name: 'userId',
              in: 'path',
              description: "the user's id",
              required: true,
              style: 'simple',
              explode: false,
              schema: {
                type: 'string',
              },
            },
          ],
          requestBody: {
            description: 'Document-related object',
            content: {
              'application/json': {
                schema: {
                  type: 'string',
                },
                examples: {
                  editor: {
                    value: {
                      role: 'editor',
                    },
                  },
                  viewer: {
                    value: {
                      role: 'viewer',
                    },
                  },
                },
              },
            },
            required: true,
          },
          responses: {
            200: {
              description: 'OK',
              content: {
                'application/json': {
                  example: {
                    message: 'update success,',
                    data: {
                      docId: '625f7fa6b07959eecafc7816',
                      user: {
                        email: 'test@test.com',
                        name: 'test',
                        id: '625f9e7e3d3592c731482b42',
                      },
                    },
                  },
                },
              },
            },
            400: {
              description: 'bad request',
              content: {
                'application/json': {
                  examples: {
                    'no user role': {
                      value: {
                        error: 'Request Error: user role is required.',
                      },
                    },
                    'invalid role': {
                      value: {
                        error: 'invalid role',
                      },
                    },
                    'add owner': {
                      value: {
                        error: 'cannot add owner to document',
                      },
                    },
                  },
                },
              },
            },
            401: {
              description: 'not sign in',
              content: {
                'application/json': {
                  example: {
                    error: 'Unauthorizaed',
                  },
                },
              },
            },
            403: {
              description: 'no authentication to manage doc auth',
              content: {
                'application/json': {
                  example: {
                    error: 'Forbidden',
                  },
                },
              },
            },
          },
          security: [
            {
              bearerAuth: [],
            },
          ],
        },
        delete: {
          tags: [
            'Documents Authorization Management',
          ],
          summary: 'users delete a user from accessing a document',
          description: "Users click the remove-auth button in the profile page, select the user with his email, and send this request with a jwt token containing the user's information. Only the owner and editor can do this.",
          parameters: [
            {
              name: 'docId',
              in: 'path',
              description: 'the id of document',
              required: true,
              style: 'simple',
              explode: false,
              schema: {
                type: 'number',
              },
            },
            {
              name: 'userId',
              in: 'path',
              description: "the user's id",
              required: true,
              style: 'simple',
              explode: false,
              schema: {
                type: 'string',
              },
            },
          ],
          responses: {
            200: {
              description: 'OK',
              content: {
                'application/json': {
                  example: {
                    message: 'update success',
                    data: {
                      docId: '625f7fa6b07959eecafc7816',
                      userId: '625f9e7e3d3592c731482b42',
                    },
                  },
                },
              },
            },
            401: {
              description: 'not sign in',
              content: {
                'application/json': {
                  example: {
                    error: 'Unauthorizaed',
                  },
                },
              },
            },
            403: {
              description: 'no authentication to manage doc auth',
              content: {
                'application/json': {
                  example: {
                    error: 'Forbidden',
                  },
                },
              },
            },
          },
          security: [
            {
              bearerAuth: [],
            },
          ],
        },
      },
      '/api/1.0/mock-server/docs/{docId}/example': {
        get: {
          tags: [
            'Mock Server',
          ],
          summary: 'mock server for user to get fake response',
          description: 'While the back-end is busy building or testing API, front-end engineers can get choose what fake responses they want from this mock server',
          operationId: 'mockserver example',
          parameters: [
            {
              name: 'docId',
              in: 'path',
              description: 'the id of document',
              required: true,
              style: 'simple',
              explode: false,
              schema: {
                type: 'string',
              },
              example: '6259003336c9c4a9bdbfcceb',
            },
            {
              name: 'path',
              in: 'query',
              description: 'the path of request',
              required: true,
              style: 'form',
              explode: true,
              schema: {
                type: 'string',
              },
              example: '/api/1.0/user/signin',
            },
            {
              name: 'method',
              in: 'query',
              description: 'the method of request',
              required: true,
              style: 'form',
              explode: true,
              schema: {
                type: 'string',
              },
              example: 'post',
            },
            {
              name: 'statusCode',
              in: 'query',
              description: 'the status code of request',
              required: true,
              style: 'form',
              explode: true,
              schema: {
                type: 'number',
              },
              example: 200,
            },
            {
              name: 'contentType',
              in: 'query',
              description: 'the contentype of request',
              required: true,
              style: 'form',
              explode: true,
              schema: {
                type: 'string',
              },
              example: 'application/json',
            },
          ],
          responses: {
            200: {
              description: 'OK',
              content: {
                'application/json': {
                  examples: {
                    signIn: {
                      value: {
                        data: {
                          access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm92aWRlciI6Imdvb2dsZSIsIm5hbWUiOiLokYnmib_lvaUiLCJlbWFpbCI6InIwODEyNDAwOUBnLm50dS5lZHUudHciLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUFUWEFKeHZ6bEM0NmFPOWtlcHpKSUtMdkFvVHhqRkFxX3h6N2JLUmh3RHE9czk2LWMiLCJpYXQiOjE2NDc1ODk0OTR9.oxkog5IvVVsmgTnyT7-fV7GNhvKz3j_nFR2hMt1osSU',
                          access_expired: '2592000,',
                          user: {
                            id: 10252,
                            name: 'abc',
                            email: 'abc@abc.com',
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            401: {
              description: 'not sign in',
              content: {
                'application/json': {
                  example: {
                    error: 'Unauthorizaed',
                  },
                },
              },
            },
            403: {
              description: 'no authentication to edit',
              content: {
                'application/json': {
                  example: {
                    error: 'Forbidden',
                  },
                },
              },
            },
          },
        },
      },
      '/api/1.0/mock-server/docs/{docId}/examples': {
        get: {
          tags: [
            'Mock Server',
          ],
          summary: 'mock server for user to get fake response',
          description: 'While the back-end is busy building or testing API, front-end engineers can get choose what fake responses they want from this mock server',
          operationId: 'mockserver examples',
          parameters: [
            {
              name: 'docId',
              in: 'path',
              description: 'the id of document',
              required: true,
              style: 'simple',
              explode: false,
              schema: {
                type: 'string',
              },
              example: '6259003336c9c4a9bdbfcceb',
            },
            {
              name: 'path',
              in: 'query',
              description: 'the path of request',
              required: true,
              style: 'form',
              explode: true,
              schema: {
                type: 'string',
              },
              example: '/api/1.0/user/signin',
            },
            {
              name: 'method',
              in: 'query',
              description: 'the method of request',
              required: true,
              style: 'form',
              explode: true,
              schema: {
                type: 'string',
              },
              example: 'post',
            },
            {
              name: 'statusCode',
              in: 'query',
              description: 'the status code of request',
              required: true,
              style: 'form',
              explode: true,
              schema: {
                type: 'number',
              },
              example: 200,
            },
            {
              name: 'contentType',
              in: 'query',
              description: 'the contentype of request',
              required: true,
              style: 'form',
              explode: true,
              schema: {
                type: 'string',
              },
              example: 'application/json',
            },
            {
              name: 'exampleName',
              in: 'query',
              description: 'the example name of examples',
              required: true,
              style: 'form',
              explode: true,
              schema: {
                type: 'string',
              },
              example: 'native',
            },
          ],
          responses: {
            200: {
              description: 'OK',
              content: {
                'application/json': {
                  example: {
                    data: {
                      id: '6259003336c9c4a9bdbfcceb',
                    },
                  },
                },
              },
            },
            401: {
              description: 'not sign in',
              content: {
                'application/json': {
                  example: {
                    error: 'Unauthorizaed',
                  },
                },
              },
            },
          },
        },
      },
    },
    components: {
      schemas: {},
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          description: 'JWT Authorization header using the Bearer scheme.',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
];

export {
  users,
  docs,
};
