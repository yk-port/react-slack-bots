import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

// adminを初期化する
admin.initializeApp();

// admin権限でFirestoreを操作したい時はadminにfirestore()メソッドを使う
const db = admin.firestore();

// cloudFunctions内で使う、レスポンスを返す関数
const sendResponse = (response: functions.Response, statusCode: number, body: any) => {
  response.send({
    statusCode,
    body: JSON.stringify(body),
  });
};

// https.onRequestメソッドで関数を作成
// cloudFunctionsでfunctionをデプロイする時はexportをつけて、外部からfunctionを使えるようにする
export const addDataset = functions.https.onRequest(async (req: any, res: any) => {
  if (req.method !== 'POST') {
    sendResponse(res, 405, {error: 'invalid Request!'})
  } else {
    const dataset = req.body;
    for (const key of Object.keys(dataset)) {
      const data = dataset[key];
      await db.collection('questions').doc(key).set(data);
    }
    sendResponse(res, 200, {message: 'Successfully added dataset! WooHoo!'});
  }
});
