# 技術選擇
## 選jwt而非session來做使用者登入
- 之後壓力測試的時候，會讓伺服器自動擴展
- jwt裡面只會有信箱等資料，遺失的話還好
- 為了自動擴展，願意承擔管理較麻煩的結果
[認識Cookie、Session、Token與JWT | Yang Yang (yyisyou.tw)](https://blog.yyisyou.tw/5d272c64/)
[淺談 Session 與 JWT 差異. 介紹 Session 與 JWT 的使用時機等等 | by 集點送紅利 / Hiro | Medium](https://medium.com/@jedy05097952/%E6%B7%BA%E8%AB%87-session-%E8%88%87-jwt-%E5%B7%AE%E7%95%B0-8d00b2396115)
## 使用mongoDB來處理JSON檔
- MongoDB比較適合處理JSON檔案，其中最重要的在於可以只存取該JSON檔案的片段內容
- 餘下的內容仍使用MySQL，盡量以關聯式資料庫保持資料的嚴僅
## 選argon2而非bcrypt
- 贏得大賽
- 效率比較好
https://ithelp.ithome.com.tw/articles/10213964
- p.s. BCrypt長度固定為60，Argon2長度固定為95

# 學習筆記
## general
- 可以用```.constructor```來確認東西是否為array，比如
```js
let { tags } = paths[pathsArr[i]][requestsArr[j]];
if (tags.constructor !== Array) {
  tags = [];
  showErrorAlert(`${pathsArr[i]}/${requestsArr[j]} has no tags or the value is wrong`);
}
tagArr.push(...tags);
```
## redis
- 在使用redis npm的時候，在伺服器設定redis連線時，需要使用```.connect()```，比如
```js
import { createClient } from 'redis';
const redisClient = createClient();
redisClient.connect().catch(error => console.error('redis connect fail'));
```
但是ioRedis就不會需要做這件事情，比如
```js
import Redis from 'ioredis';
const redis = new Redis();
```
## 伺服器
- 在設計API的時候，如果是自己無法掌握內容的值，就不要放在path parameter裡面，因為可能使用者填入的值包含特殊符號(比如```/```)，導致404 not found
- 在map結合async await的時候，因為我們要await一個array裡面的所有promise，因此要使用Promise.all，比如
```js
const getUserDocs = async (userId) => {
    try {
        const [rawDocs] = await pool.query('SELECT doc_id, role FROM user_doc WHERE user_id = ?', [userId]);
        const docs = await Promise.all(rawDocs.map(async (doc) => {
            const [[{user_id: ownerId}]] = await pool.query('SELECT user_id FROM user_doc WHERE doc_id = ? AND role = ?', [doc.doc_id, DocRole.Owner]);
            const [[{name: ownerName}]] = await pool.query('SELECT name FROM user WHERE id = ?', [ownerId]);
            doc.owner = ownerName
            return doc;
        }));
        return docs;
    } catch (e) {
        return null;
    }
};
return docs;
```
## MongoDB
- 拿到資料ID的時候，可以用```.toHexString()```來把ID轉成文字。因為編碼的關係，不需要用到```toString()```
- 想要透過Object key來找資料的時候，可以用```{"$exists": true}```來處理，比如
```js
onst results = await collection.find({[`users.${userId}`]: {"$exists": true}}).project({data: 0}).toArray();
```
- 如果只想要找到一部份的值，可以用```projection```或是```distinct```，比如
```js
const users = await collection.distinct("users", {"_id": ObjectId(docId)});
const targetUser = await collection.find({"_id": ObjectId(docId)}).project({users: 1}).toArray();
const doc = await collection.findOne({"_id": ObjectId(doc_id)}, {projection: {data: 1, _id: 0}});
```
此外，如果想要在nested object裡面找到想要對value，可以用在projection裡面使用key.key來方式來找到值，比如
```js
const userRole = await collection.findOne({"_id": ObjectId(docId)}, {projection: {[`users.${userId}`]: 1, _id: 0}});
// 把[]放在obj key，就可以用parameter來命名obj key
```
- 想要做write lock(```SELECT FOR UPDATE```)的話，用```findOneAndUpdate()```，比如
```js
await collection.findOneAndUpdate(
    {"_id": ObjectId(docId)},
    {$set: {data: doc}},
);
```
https://www.mongodb.com/blog/post/how-to-select--for-update-inside-mongodb-transactions
https://www.mongodb.com/docs/drivers/node/current/fundamentals/crud/compound-operations/

- local replicas
想要使用transaction時一定要有replica，否則會跳```Transaction numbers are only allowed on a replica set member or mongos```   
在local端想要使用replica的話，可以直接使用 run-rs 套件   
1. ```npm install run-rs -g```
2. 已經安裝好mongoDB的話，就```run-rs --mongod```   
會看到```Started replica set on "mongodb://DESKTOP-<電腦名字>:27017,DESKTOP-<電腦名字>:27018,DESKTOP-<電腦名字>:27019?replicaSet=rs"```
3. 上面那一串代表開啟了三個新的mongo伺服器，因此   
   - .env中的mongoDB url要重新設定為```"mongodb://DESKTOP-<電腦名字>:27017,DESKTOP-<電腦名字>:27018,DESKTOP-<電腦名字>:27019?replicaSet=rs```
   - 進入mongoDB的GUI介面，連上```mongodb://DESKTOP-<電腦名字>:27017```之後，重新增加新的DB和collection，就如同第一次使用mongoDB那樣
4. 之後每次想要使用replica的時候，都需要```run-rs --mongod```
https://www.npmjs.com/package/run-rs
https://stackoverflow.com/questions/51461952/mongodb-v4-0-transaction-mongoerror-transaction-numbers-are-only-allowed-on-a
http://thecodebarbarian.com/introducing-run-rs-zero-config-mongodb-runner
- error handling
```js
const { MongoError, MongoClient } = require('mongodb');
catch (error) {
    if (error instanceof MongoError && error.hasErrorLabel('UnknownTransactionCommitResult')) {
      // add your logic to retry or handle the error
    }
    else if (error instanceof MongoError && error.hasErrorLabel('TransientTransactionError')) {
      // add your logic to retry or handle the error
    } else {
      console.log('An error occured in the transaction, performing a data rollback:' + error);
    }
```
- transaction做法範例
1. ```client.startSession();```
2. 定義好```transactionOptions```
3. ```session.startTransaction(transactionOptions)``` (也可以用```session.withTransaction()```做callback)
4. 每個行動都要有```{ session }```做為第二個parameter
5. ```await session.commitTransaction();``` 或是 ```await session.abortTransaction();```
6. (finally) ```await session.endSession();```
範例：
```js
async function placeOrder(client, cart, payment) {
  const transactionOptions = {
    readConcern: { level: 'snapshot' },
    writeConcern: { w: 'majority' },
    readPreference: 'primary'
  };

  const session = client.startSession();
  try {
    session.startTransaction(transactionOptions);

    const ordersCollection = client.db('testdb').collection('orders');
    const orderResult = await ordersCollection.insertOne(
      {
        customer: payment.customer,
        items: cart,
        total: payment.total,
      },
      { session }
    );

    const inventoryCollection = client.db('testdb').collection('inventory');
    for (let i=0; i<cart.length; i++) {
      const item = cart[i];

      // Cancel the transaction when you have insufficient inventory
      const checkInventory = await inventoryCollection.findOne(
        {
          sku: item.sku,
          qty: { $gte: item.qty }
        },
        { session }
      )
      if (checkInventory === null) {
        throw new Error('Insufficient quantity or SKU not found.');
      }

      await inventoryCollection.updateOne(
        { sku: item.sku },
        { $inc: { 'qty': -item.qty }},
        { session }
      );
    }

    const customerCollection = client.db('testdb').collection('customers');
    await customerCollection.updateOne(
      { _id: payment.customer },
      { $push:  { orders: orderResult.insertedId }},
      { session }
    );
    await session.commitTransaction();
    console.log('Transaction successfully committed.');

  } catch (error) {
    if (error instanceof MongoError && error.hasErrorLabel('UnknownTransactionCommitResult')) {
      // add your logic to retry or handle the error
    }
    else if (error instanceof MongoError && error.hasErrorLabel('TransientTransactionError')) {
      // add your logic to retry or handle the error
    } else {
      console.log('An error occured in the transaction, performing a data rollback:' + error);
    }
    await session.abortTransaction();
  } finally {
    await session.endSession();
  }
}
```
https://www.mongodb.com/docs/drivers/node/current/fundamentals/transactions/#std-label-nodejs-transaction-core-api-example
https://hevodata.com/learn/mongodb-transactions-on-nodejs/#Step2
https://www.mongodb.com/docs/drivers/node/current/fundamentals/transactions/
https://www.mongodb.com/docs/manual/reference/method/Mongo.startSession/
- 如果MongoDB使用mongodb extended json，如
```json
{
  "_id": {
    "$oid": "6258ffdf36c9c4a9bdbfccea"
  }
}
```
從nodeJS裡面撈的時候就會需要用ObjectId，如
```js
import { collection } from './mongodb.js';
import { ObjectId } from 'mongodb';

const getDoc = async (doc_id) => {
  try {
    const [doc] = await collection.find ({"_id": ObjectId(doc_id)}).toArray();
    return doc;
  } catch (err) {
    console.error(err.message);
  }
}
```
- 撈東西出來的時候，不要用太細節的方式去抓，如
```js
const [{data: doc}] = await collection.find ({"_id": ObjectId(doc_id)}).toArray();
```
這種抓法會導致沒有資料(撈出來是空值)的時候，出現```data is undefined```的錯誤，改用```const [doc] ```比較好
## MySQL
- varchar的長度不影響效能，因此信箱還是可以用varchar(255)
- 讓 mysql 自動記錄資料建立和更新的時間
```sql
CREATE TABLE
  create_dt DATETIME DEFAULT CURRENT_TIMESTAMP,
  update_dt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
-- 在mysql workbench裡面修改的話，直接在Default/Expression裡面貼上即可
```
要記得注意時區的一致性，比如ec2/rds上面會是預設UTC+0。
- 在使用權限的設計上，可以在DB裡面用role: CHAR(1)，其值只有O、E、V，在伺服器中則是
```js
let roleMap = {
	"O": "owner",
	"E": "editor",
	"V": "viewer"
}
```
- 多對多的表格可以有兩個以上的primary key，比如三個表格，teacher、profession、teacher-profession，在teacher-profession表格中，可以用PK(teacher-id, profession-id)
- 常常使用where搜尋的對象，可以設定index。可以使用Explain來協助處理
- DB是1對1還是1對多，在需求訪談時就要問清楚
```
blob存binary string
blob 可以儲存圖片,text不行
blob跟text都沒有預設值 (不像varchar可以自訂最大值)
text最大長度是2的16次方-1 (跟varchar一樣)
MEDIUMTEXT最多可存16 MB，而LONGTEXT最多可存4 GB字串
```
```
1. 經常變化的字段用varchar
2. 知道固定長度的用char
3. 盡量用varchar
4. 超過255字符的只能用varchar或者text
5. 能用varchar的地方不用text
```
## React
- 同樣跟據不同狀況改變，如果是網頁載入時就已經決定的，用prop；如果是載入後，會跟據使用者行為而改變，或是打API後拿到的資料，就用state；
- 如果想要引用圖片並做成component，使用```ReactComponent```，比如
```js
import { ReactComponent as NoDocImg } from '../img/no-document.svg';
const Profile = () => {
  /*...*/
  return (
    <NoDocImg style={{ width: '30rem' }} />
  )
}
```
- 如果要刪除清單列表中的某一個清單，要使用```setXXX((prev) => prev.filter(item => item.id !== id ))```，比如
```js
const App = () => {
  const [data, setData] = useState([]);

  data.map((item) => {
    const { id } = item;
    return {
      <Item key={id} id={id} deleteItem={setData}/>
    }
  })
}

const Item = ({ id, deleteItem }) => {

  function deleteItem() {
    deleteData(function(prev) {
      return prev.filter(item => item.id !== id)
    })
  }

  return (
    <div>
      <button onClick={deleteItem} className="remove">刪除</button>
    </div>
  );
}
```
- 如果是網頁載入時就要發ajax請求，就一定要用useState搭配useEffect，比如
```js
async function fetchUserData(setUserData) {
  const res = await axios.get('url');
  setUserData(res.data.data);
}
const [userData, setUserData] = useState(null);
useEffect(() => {
  fetchUserData(setUserData);
}, []);
```
- 用className取代class
- 如果不要一層一層傳props，可以使用useContext，比如
```js
// App.js
import { createContext } from 'react';
export const SwitchContainerFunc = createContext(null);

const App = () => {
  return (
    function switchToContainer() {
      // ...
    }
    <SwitchContainerFunc.Provider value={switchToContainer}>
      <Sign />
    </SwitchContainerFunc.Provider>
  )
}
// 接下來在Sign以及Sign的所有child components都可以存取switchToContainer這個function(也可以是任何其它東西)

// Sign.js
import { SwitchContainerFunc } from '../containers/App';
const Sign = () => {
    const switchToContainer = useContext(SwitchContainerFunc);
    // 接下來，switchToContainer就會完全等同於App component裡面的switchToContainer function
}
```
https://medium.com/hannah-lin/react-hook-%E7%AD%86%E8%A8%98-usecontext-4bc289976847
- 可以一次傳很多個context value，比如用在全網站上都會用到的東西，像是theme，或是docu-bloom裡面的userId、documentID等等。比如
```js
export const GlobalContext = createContext(null);
const App = () => {

  /*...*/

  const [ docValue, setDocValue] = useState(initialValue);
  const [ userName, setUserName ] = useState('Guest');
  const [ docId, setDocId ] = useState(null);
  const [ currentUserRole, setCurrentUserRole ] = useState(null);

  /*...*/

  return (
    <div>
      <GlobalContext.Provider value = {{ userName, currentUserRole, setUserName, setCurrentUserRole, docId, docValue, setDocId, setDocValue, switchToContainer }}>
        <Header/>
        { isSignShown ? <Sign /> : null }
        { isProfileShown ? <Profile/> : null }
        { isDocumentShown ? <Document /> : null }
        { isEditorShown ? <Editor initDoc = {JSON.parse(initialValue)} /> : null }
        { isUpdaterShown ? <Updater/> : null }
        { isViewerShown ? <Viewer/> : null }
      </GlobalContext.Provider>
    </div>
  );
};

}
```
- 如果發現有引用component，但畫面上沒有東西，可能是沒有return，如
```js
const Title = ( { path, requestType, summary, security } ) => {
  //沒有return，畫面就不會顯示
  <div className="card-header">
    <h3 className="card-title"></h3>
    <div className="card-tools">
      <button type="button" className="btn btn-tool" data-card-widget="collapse"><i className="fas fa-plus"></i>      
      </button>
    </div>
  </div>
}
```
- 在使用component接上一層傳下來的props的時候，可以用{}來接個別的prop，但要記得包在{}裡面，如
```js
const Title = ( { path, requestType, summary, security } ) => {
  return (
    <div className="card-header">
      <h3 className="card-title"></h3>
      <div className="card-tools">
        <button type="button" className="btn btn-tool" data-card-widget="collapse"><i className="fas fa-plus"></i>      
        </button>
      </div>
    </div>
    );
}
```
- 將prop往下傳的時候，如果prop可能存在或不存在，可以使用``` ? : ```來做為簡單的判斷式，如
```js
  {
    parameters 
    ? 
    parameters.map(parameter => 
      return (              
        <ParamBody 
        detail = {parameter}
        key = {index}
        /> 
      )
    ) 
    : 
    "no parameters"
  }
  //parameter為array，但可能存在或undefined
```
- 在使用map的時候，如果換行要記得寫return，比如下面就是錯的
```js
{
  parameters 
  ? 
  parameters.map((parameter, index) => {
      <ParamBody 
      detail = {parameter}
      key = {index}
      /> 
  }) 
  : 
  "no parameters"
}
```
- 只要透過map之類的迴圈重複創造的item，都要有key，比如
```js
<div>
  <select onChange={e => setExamples(e.target.value)}>
    {Object.keys(examples).map((example, i) => <option key={i}>{example}</option>)}
  </select>
</div> 
```
另外，key不要用index來命名，參考https://youtu.be/zqV7NIFGDrQ?t=4499
- 使用 state 去改變 input value的時候，記得定義 onChange，比如
```js
const [value, setValue] = useState(JSON.stringify(exampleValue));

function changeValue(e) {
  setValue(e.target.value);
}

<div className="card-body p-0">
  <textarea className="codeMirrorDemo p-3" value={value} onChange={changeValue}>
  </textarea>
</div>
```
- 在搬component的時候，child component如果已經寫好引入的prop，那在parent component處也要記得把prop寫好，至少要是假資料。
以下就是會報錯的寫法   
```js
const Title = ( { color } ) => {
  return (
    <div>
      <Parameter
        color = {color}        
      />
    </div>
    );
};
const Parameter = ( { parameters, color } ) => {
  return (
    <div>
    </div>
  );
};
```
- 要怎麼知道什麼時使用會用到state？如果是跟據使用者行為而改變的東西才會使用到state，而非所有條件句都會使用state。如
```js
const ParamBody = ({ detail }) => {
  const { name, schema, required, description, example, examples } = detail;

  // 不需要寫成以下這樣。此外寫成這樣也會有re-render太多次而報錯的問題
  // const [ isParamInputShown, setParamInputShown ] = useState(false);
  // if (!example && !examples) isParamInputShown = true;

  return (
    <div>
      {
        !example && !examples
        ?
        <ParamInput />
        :
        null
      }
    </div>
  );
};
```
- 在改變array和object的state時，如果直接修改其中的值，會讓React認定東西沒有改變，而導致state沒有更新（shallow copy），因此要用deep copy來解決這個問題
```js
  function setParam(e) {
    const paramInfo = {
      in: location,
      name: name,
      value: e.target.value,
    };
    setParamInfos(paramInfoArr => {
      let newParamInfoArr = [...paramInfoArr]; //prevent shallow copy
      for (let i = 0; i < paramInfoArr.length; i++) {
        if (newParamInfoArr[i].in === paramInfo.in & newParamInfoArr[i].name === paramInfo.name) {
          newParamInfoArr[i].value = paramInfo.value;
          return newParamInfoArr;
        }
      }
      return [...paramInfoArr, paramInfo];
    });
  }
```

## code mirror
- 透過code mirror處理過後的textarea，其value會永遠維持成網頁開啟時的樣子。   
如果想要拿到使用者改變後的value，不能透過```document.querySelector("textarea").value```來取值。   
要透過```CodeMirror.fromTextArea(document.querySelector("textarea").getValue()```來取值。   
比如
```js
const viewButton = document.getElementById('view');

const input = CodeMirror.fromTextArea(document.getElementById("codeMirrorDemo"), {
  mode: {
    name: "javascript", 
    jsonld: true
  },
  theme: "monokai"
});

viewButton.addEventListener('click', () => {
  let docValue = input.getValue();
  const viewerWindow = window.open('./viewer.html');
  viewerWindow.doc = docValue;
})
```
- 一開始寫在CodeMirror textarea裡面的東西是string，要讓string變得比較好看的話，可以使用```js_beautify```這樣子的套件，比如
```js
import { js_beautify } from 'js-beautify';

<CodeMirror
  value={js_beautify(exampleValue, { indent_size: 2 })}
  height="80vh"
  minHeight="200px"
  theme={oneDark}
  extensions={extensions}
  onChange={(value, viewUpdate) => {
    setDoc(value);
  }}
/>

```